import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { memories, type Memory } from '../data/memories'
import { MemoryLightbox, PlaceholderImage } from '../components/MediaComponents'

export default function PhotoSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [currentViewIndex, setCurrentViewIndex] = useState<number>(1)
  const [isSectionActive, setIsSectionActive] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Track the currently viewed photo to update the centered counter [ 01 / 31 ]
  useEffect(() => {
    const secEl = sectionRef.current
    if (!secEl) return

    const secObserver = new IntersectionObserver(
      ([entry]) => setIsSectionActive(entry.isIntersecting),
      { threshold: 0.05 }
    )
    secObserver.observe(secEl)

    const observers: IntersectionObserver[] = []
    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setCurrentViewIndex(index + 1)
          }
        },
        { threshold: [0.3] }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      secObserver.disconnect()
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Two Chapter Structure:
  // Chapter 01: Moments 01–16 (16 photos)
  // Chapter 02: Moments 17–31 (15 photos)
  const chapter1Memories = memories.slice(0, 16)
  const chapter2Memories = memories.slice(16, 31)

  // Render individual editorial photo card
  const renderCard = (mem: Memory, globalIndex: number) => {
    const isLandscape = mem.orientation === 'landscape'

    // Desktop: landscape photos span 2 columns when appropriate; mobile: strictly 1 column
    const colSpanClass = isLandscape
      ? 'col-span-1 md:col-span-2'
      : 'col-span-1'

    return (
      <motion.div
        key={mem.id}
        ref={(el) => { itemRefs.current[globalIndex] = el }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay: (globalIndex % 3) * 0.08,
          ease: 'easeOut',
        }}
        className={`group relative ${colSpanClass} flex flex-col w-full`}
      >
        <div
          onClick={() => setLightboxIndex(globalIndex)}
          onKeyDown={(e) => { if (e.key === 'Enter') setLightboxIndex(globalIndex) }}
          tabIndex={0}
          role="button"
          aria-label={`View photo ${globalIndex + 1} of ${memories.length}`}
          className="cursor-pointer w-full rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.015] group-hover:brightness-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 p-2 sm:p-2.5"
          style={{
            background: '#0e0d0b',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
          }}
        >
          {/* Photo container respecting natural proportions */}
          <div
            className="relative w-full overflow-hidden rounded-md bg-black/60"
            style={{
              aspectRatio: isLandscape
                ? '16/9'
                : mem.aspect
                ? `${mem.aspect}`
                : '3/4',
              maxHeight: isLandscape ? '440px' : '500px',
            }}
          >
            <PlaceholderImage
              src={mem.src}
              alt={mem.title || 'A memory moment'}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Subtle dark film gradient on hover */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="photos"
      className="section-base relative w-full flex flex-col items-center justify-center py-28 sm:py-36"
      style={{ background: '#080807' }}
      aria-label="Scene 05 — Photographic Memories"
    >
      {/* ── Fixed Centered Scroll Counter: [ 01 / 31 ] ── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500 ${
          isSectionActive ? 'opacity-90' : 'opacity-0'
        }`}
        aria-live="polite"
      >
        <div
          className="px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-gold/90 shadow-xl"
          style={{ background: 'rgba(14, 13, 11, 0.88)' }}
        >
          [ {String(currentViewIndex).padStart(2, '0')} / {String(memories.length).padStart(2, '0')} ]
        </div>
      </div>

      {/* ── Centered Outer Container: max-width 1200px, margin-inline auto ── */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 sm:px-6">

        {/* ── Section Header (Centered with 80–110px padding bottom) ── */}
        <div className="text-center max-w-xl mx-auto pb-20 sm:pb-28">
          {/* Scene Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="tracking-[0.4em] text-xs uppercase mb-6"
            style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
          >
            SCENE 05 — PHOTOGRAPHS
          </motion.p>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl font-light mb-4"
            style={{ color: 'var(--cream)', fontFamily: 'var(--font-serif)', lineHeight: 1.2 }}
          >
            MEMORIES
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs font-mono tracking-widest uppercase mb-4"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-sans)' }}
          >
            MEMORIES • {memories.length} MOMENTS
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-serif italic text-base sm:text-lg"
            style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-serif)' }}
          >
            "Then came the little things."
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            CHAPTER 01: Moments 01–16
        ════════════════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center">
          {/* Centered Chapter 01 Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="text-[10.5px] font-mono tracking-[0.3em] uppercase text-white/40 border-b border-white/10 pb-1"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              CHAPTER 01 • MOMENTS 01–16
            </span>
          </motion.div>

          {/* Centered 3-Column Editorial Grid for Chapter 01 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-start w-full"
            role="list"
            aria-label="First chapter of memories"
          >
            {chapter1Memories.map((mem, idx) => renderCard(mem, idx))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            INTERMISSION: Quiet Cinematic Pause
            "Some moments were never planned."
        ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0 }}
          className="my-28 sm:my-36 py-8 text-center flex flex-col items-center gap-4 max-w-lg mx-auto"
        >
          <div className="w-10 h-px bg-white/10 mx-auto" aria-hidden="true" />
          <p
            className="font-serif text-lg sm:text-xl md:text-2xl italic font-light tracking-wide leading-relaxed"
            style={{ color: 'var(--cream)', fontFamily: 'var(--font-serif)' }}
          >
            "Some moments were never planned."
          </p>
          <div className="w-10 h-px bg-white/10 mx-auto" aria-hidden="true" />
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            CHAPTER 02: Moments 17–31
        ════════════════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center">
          {/* Centered Chapter 02 Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="text-[10.5px] font-mono tracking-[0.3em] uppercase text-white/40 border-b border-white/10 pb-1"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              CHAPTER 02 • MOMENTS 17–31
            </span>
          </motion.div>

          {/* Centered 3-Column Editorial Grid for Chapter 02 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-start w-full"
            role="list"
            aria-label="Second chapter of memories"
          >
            {chapter2Memories.map((mem, idx) => renderCard(mem, 16 + idx))}
          </div>
        </div>

        {/* ── Section Closing Reflection ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="mt-32 sm:mt-40 text-center flex flex-col items-center gap-4"
        >
          <div className="gold-line mx-auto" aria-hidden="true" />
          <p
            className="font-serif italic text-lg sm:text-xl font-light"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}
          >
            "Somehow, they became memories."
          </p>
        </motion.div>

      </div>

      {/* ── Fullscreen Lightbox for all 31 Photos ── */}
      {lightboxIndex !== null && (
        <MemoryLightbox
          photos={memories}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  )
}
