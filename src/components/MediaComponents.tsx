import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Memory } from '../data/memories'

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <motion.button
          className="absolute top-6 right-6 text-white opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white p-2"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          aria-label="Close image viewer"
        >
          <X size={28} />
        </motion.button>
        <motion.img
          src={src}
          alt={alt}
          className="lightbox-img"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Enhanced Memory Lightbox supporting full 31-photo navigation,
 * keyboard controls, mobile swipe gestures, preloading, and index counter.
 */
interface MemoryLightboxProps {
  photos: Memory[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function MemoryLightbox({ photos, currentIndex, onClose, onNavigate }: MemoryLightboxProps) {
  const current = photos[currentIndex]
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    } else {
      onNavigate(photos.length - 1)
    }
  }, [currentIndex, onNavigate, photos.length])

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1)
    } else {
      onNavigate(0)
    }
  }, [currentIndex, onNavigate, photos.length])

  // Preload adjacent images
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % photos.length
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length
    const preloadNext = new Image()
    preloadNext.src = photos[nextIdx]?.src || photos[nextIdx]?.image
    const preloadPrev = new Image()
    preloadPrev.src = photos[prevIdx]?.src || photos[prevIdx]?.image
  }, [currentIndex, photos])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, handlePrev, handleNext])

  // Mobile swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 45
    const isRightSwipe = distance < -45

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()

    touchStartX.current = null
    touchEndX.current = null
  }

  if (!current) return null

  const displayIndex = String(currentIndex + 1).padStart(2, '0')
  const totalCount = String(photos.length).padStart(2, '0')
  const imgSrc = current.src || current.image

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo viewer: moment ${displayIndex} of ${totalCount}`}
      >
        {/* Top Header: Index Counter & Close Button */}
        <div
          className="absolute top-0 inset-x-0 p-5 flex items-center justify-between z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
        >
          {/* Index Counter */}
          <div className="pointer-events-auto px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            <span
              className="text-xs font-mono tracking-widest text-white/80"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {displayIndex} / {totalCount}
            </span>
          </div>

          {/* Close button */}
          <button
            className="pointer-events-auto p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none"
            onClick={onClose}
            aria-label="Close viewer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Previous Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/5 focus-visible:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/5 focus-visible:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight size={28} />
        </button>

        {/* Image & Caption Container */}
        <div
          className="flex flex-col items-center justify-center max-w-[95vw] max-h-[85vh] p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3"
            >
              <img
                src={imgSrc}
                alt={current.title || `Memory moment ${displayIndex}`}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
                style={{
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              />

              {/* Optional Subtle Generic Caption */}
              {current.caption && (
                <div className="text-center px-4 max-w-lg mt-1">
                  <p
                    className="font-serif text-sm italic text-white/70"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    "{current.caption}"
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swipe Hint */}
        <div
          className="sm:hidden absolute bottom-3 inset-x-0 text-center pointer-events-none text-[10px] text-white/40 tracking-wider"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          ‹ Swipe left / right to navigate ›
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * PlaceholderImage — shows a styled placeholder when image hasn't been added yet.
 */
interface PlaceholderImageProps {
  src: string
  alt: string
  className?: string
  label?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export function PlaceholderImage({ src, alt, className, label, onClick, style }: PlaceholderImageProps) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-stone-900 border border-stone-800 ${className}`}
        style={{ aspectRatio: '4/3', ...style }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        aria-label={alt}
      >
        <span className="text-2xl mb-2">📷</span>
        <span className="text-xs text-center px-2" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}>
          {label || alt}
        </span>
        <span className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
          Add to /media/photos/
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  )
}
