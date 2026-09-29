import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { videoMemories, type VideoItem } from '../data/videos'

// Single Video Card Component with Intelligent Viewport Playback
function CinematicVideoCard({
  video,
  isActive,
  onActivate,
  layoutClass,
}: {
  video: VideoItem
  isActive: boolean
  onActivate: () => void
  layoutClass: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)

  // Sync playback with active state
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (isActive && !isManuallyPaused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback if browser blocks unmuted playback
          el.muted = true
          setIsMuted(true)
          el.play().then(() => setIsPlaying(true)).catch(() => {})
        })
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }, [isActive, isManuallyPaused])

  // Track playback progress
  const handleTimeUpdate = () => {
    const el = videoRef.current
    if (!el || !el.duration) return
    setProgress((el.currentTime / el.duration) * 100)
  }

  // Toggle manual Play/Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return

    if (isPlaying) {
      el.pause()
      setIsPlaying(false)
      setIsManuallyPaused(true)
    } else {
      setIsManuallyPaused(false)
      onActivate()
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }
  }

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    const nextMuted = !isMuted
    el.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full flex flex-col ${layoutClass}`}
    >
      {/* Outer Editorial Video Frame */}
      <div
        className="group relative w-full overflow-hidden rounded-2xl transition-all duration-700 select-none"
        style={{
          background: '#0c0b0a',
          border: isActive
            ? '1px solid rgba(184, 150, 90, 0.28)'
            : '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: isActive
            ? '0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(184, 150, 90, 0.08)'
            : '0 20px 50px rgba(0, 0, 0, 0.75)',
        }}
        onClick={togglePlay}
      >
        {/* Video Player */}
        <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src={video.src}
            muted={isMuted}
            playsInline
            loop
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-contain"
            aria-label={`Moving memory ${video.number}`}
          />

          {/* Gentle vignette gradient for cinematic depth */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: isPlaying
                ? 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 80%, rgba(0,0,0,0.4) 100%)'
                : 'rgba(0, 0, 0, 0.35)',
            }}
            aria-hidden="true"
          />

          {/* Top Label: Video Number Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10"
              style={{
                background: 'rgba(12, 11, 10, 0.7)',
                color: isActive ? 'var(--gold)' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              MEM • {video.number}
            </span>
          </div>

          {/* Top Right: Mute/Unmute Audio Control */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            style={{ background: 'rgba(12, 11, 10, 0.75)' }}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Center Play/Pause Indicator (Fades out when actively playing) */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-transform group-hover:scale-105"
                  style={{ background: 'rgba(14, 13, 11, 0.8)' }}
                >
                  <svg className="w-6 h-6 text-gold ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Audio/Playback Indicator Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden z-10">
            <div
              className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0)
  const [currentViewIndex, setCurrentViewIndex] = useState<number>(1)
  const [isSectionActive, setIsSectionActive] = useState<boolean>(false)

  // Manage viewport presence of Section 06
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionActive(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Viewport tracking: Automatically play the video most visible in view, and pause others
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    videoItemRefs.current.forEach((el, index) => {
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
              setActiveVideoIndex(index)
              setCurrentViewIndex(index + 1)
            }
          })
        },
        { threshold: [0.45, 0.75] }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const handleManualActivate = useCallback((index: number) => {
    setActiveVideoIndex(index)
    setCurrentViewIndex(index + 1)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="section-base relative w-full flex flex-col items-center justify-center pt-28 pb-32 sm:py-36"
      style={{ background: '#080807' }}
      aria-label="Scene 06 — Moving Memories"
    >
      {/* ── Fixed Centered Counter: [ 01 / 04 ] ── */}
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
          [ {String(currentViewIndex).padStart(2, '0')} / {String(videoMemories.length).padStart(2, '0')} ]
        </div>
      </div>

      {/* ── Main Centered Container (max-w-[1150px]) ── */}
      <div className="w-full max-w-[1150px] mx-auto flex flex-col items-center px-6 sm:px-8">

        {/* ── Editorial Header ── */}
        <div className="text-center max-w-xl mx-auto pb-24 sm:pb-32">
          {/* Scene Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="tracking-[0.4em] text-xs uppercase mb-6"
            style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
          >
            SCENE 06
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl font-light mb-6"
            style={{ color: 'var(--cream)', fontFamily: 'var(--font-serif)', lineHeight: 1.2 }}
          >
            MOVING MEMORIES
          </motion.h2>

          {/* Opening Statement */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 1.0 }}
            className="font-serif text-lg sm:text-xl font-light leading-relaxed"
            style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-serif)' }}
          >
            "Photos remember a moment."
          </motion.p>

          {/* Noticeable Pause & Second Line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, duration: 1.1 }}
            className="font-serif text-lg sm:text-xl font-light leading-relaxed mt-2"
            style={{ color: 'var(--gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}
          >
            "Videos remember how it felt to be there."
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            EDITORIAL CINEMATIC SEQUENCE: 4 Real Videos
            Varied scale, natural 9:16 portrait preservation, generous breathing room
        ════════════════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center">

          {/* ── VIDEO 01: Medium/Large Cinematic Frame (Centered) ── */}
          <div
            ref={(el) => { videoItemRefs.current[0] = el }}
            className="w-full flex justify-center mb-44 sm:mb-56"
          >
            <CinematicVideoCard
              video={videoMemories[0]}
              isActive={activeVideoIndex === 0}
              onActivate={() => handleManualActivate(0)}
              layoutClass="max-w-[420px] mx-auto"
            />
          </div>

          {/* ── VIDEO 02: Smaller Offset Frame (Asymmetrically positioned on desktop) ── */}
          <div
            ref={(el) => { videoItemRefs.current[1] = el }}
            className="w-full flex justify-center md:justify-end mb-44 sm:mb-56 md:pr-12 lg:pr-24"
          >
            <CinematicVideoCard
              video={videoMemories[1]}
              isActive={activeVideoIndex === 1}
              onActivate={() => handleManualActivate(1)}
              layoutClass="max-w-[340px] w-full"
            />
          </div>

          {/* ── VIDEO 03: Large Cinematic Frame (Prominent scale, offset left on desktop) ── */}
          <div
            ref={(el) => { videoItemRefs.current[2] = el }}
            className="w-full flex justify-center md:justify-start mb-48 sm:mb-60 md:pl-8 lg:pl-16"
          >
            <CinematicVideoCard
              video={videoMemories[2]}
              isActive={activeVideoIndex === 2}
              onActivate={() => handleManualActivate(2)}
              layoutClass="max-w-[460px] w-full"
            />
          </div>

          {/* ── VIDEO 04: Final Large Cinematic Frame (Centered climax) ── */}
          <div
            ref={(el) => { videoItemRefs.current[3] = el }}
            className="w-full flex justify-center mb-36 sm:mb-48"
          >
            <CinematicVideoCard
              video={videoMemories[3]}
              isActive={activeVideoIndex === 3}
              onActivate={() => handleManualActivate(3)}
              layoutClass="max-w-[440px] mx-auto"
            />
          </div>

        </div>

        {/* ── Final Video Reflection: Understated Ending of Scene 06 ── */}
        <div className="w-full max-w-lg mx-auto text-center mt-20 sm:mt-28 pb-36 sm:pb-48 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="w-px bg-gradient-to-b from-[#b8965a]/35 to-transparent mb-10"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="font-serif text-lg sm:text-xl md:text-2xl font-light"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--cream)',
              lineHeight: 1.6,
            }}
          >
            "Some memories don't need explaining."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, duration: 1.1 }}
            className="font-serif text-base sm:text-lg md:text-xl mt-3 font-light"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--gold)',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            "They just stay."
          </motion.p>
        </div>

      </div>
    </section>
  )
}
