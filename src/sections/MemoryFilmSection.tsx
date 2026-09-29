import { useRef, useState, useEffect } from 'react'
import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { memories } from '../data/memories'

interface FilmFrame {
  id: string
  type: 'text' | 'photo' | 'quote' | 'video-placeholder'
  headline?: string
  subtext?: string
  date?: string
  src?: string
  alt?: string
}

// Visually diverse cinematic sequence:
// photo -> text -> portrait -> photo -> video placeholder -> landscape -> photo -> text -> final photo
const frames: FilmFrame[] = [
  {
    id: 'f0',
    type: 'text',
    date: '30 September 2024',
    headline: '4:50 PM',
    subtext: 'The beginning.',
  },
  {
    id: 'f1',
    type: 'quote',
    headline: '"Heyy"',
    subtext: 'It started with a simple "Heyy".',
  },
  {
    id: 'f2',
    type: 'photo',
    src: memories[0]?.src,
    alt: 'One of those ordinary days',
    subtext: 'One of those ordinary days.',
    date: '30 September 2024',
  },
  {
    id: 'f3',
    type: 'text',
    headline: 'Ordinary college days.',
    subtext: 'Assignments. Deadlines. Passing moments.',
  },
  {
    id: 'f4',
    type: 'photo',
    src: memories[3]?.src, // Landscape 16:9
    alt: 'Wider perspectives',
    subtext: 'Wider perspectives.',
  },
  {
    id: 'f5',
    type: 'photo',
    src: memories[6]?.src, // Portrait
    alt: 'A quiet scene',
    subtext: 'A quiet scene.',
  },
  {
    id: 'f6',
    type: 'video-placeholder',
    headline: 'Moving memories.',
    subtext: 'Captured seconds that stayed.',
  },
  {
    id: 'f7',
    type: 'photo',
    src: memories[10]?.src, // Landscape 4:3
    alt: 'Some moments were never planned',
    subtext: 'Some moments were never planned.',
  },
  {
    id: 'f8',
    type: 'photo',
    src: memories[14]?.src, // Wide 3:4 portrait
    alt: 'Unrehearsed',
    subtext: 'Unrehearsed.',
  },
  {
    id: 'f9',
    type: 'quote',
    headline: '"Thankyuuu 🫂"',
    subtext: 'The 🫂 emoji carried a lot of weight.',
  },
  {
    id: 'f10',
    type: 'photo',
    src: memories[17]?.src, // Landscape 16:9
    alt: 'Another chapter',
    subtext: 'Another chapter.',
  },
  {
    id: 'f11',
    type: 'text',
    headline: '10,000%',
    subtext: 'Every single day.',
  },
  {
    id: 'f12',
    type: 'photo',
    src: memories[28]?.src, // Warm portrait
    alt: 'Part of the story',
    subtext: 'Part of the story.',
  },
  {
    id: 'f13',
    type: 'text',
    headline: 'Still here.',
    subtext: 'Still grateful.',
  },
]

function PhotoFrame({ src, alt, subtext, date }: FilmFrame) {
  const [err, setErr] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center gap-5 max-w-3xl w-full mx-auto px-4 select-none">
      {date && (
        <p className="text-[10px] sm:text-xs tracking-widest uppercase text-white/40 font-mono">
          {date}
        </p>
      )}
      {!err && src ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1.01 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{
            opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 1.8, ease: 'easeOut' },
          }}
          className="relative overflow-hidden rounded-md"
          style={{
            boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <img
            src={src}
            alt={alt ?? 'A memory moment'}
            onError={() => setErr(true)}
            loading="lazy"
            decoding="async"
            className="max-h-[62vh] max-w-[88vw] w-auto h-auto object-contain rounded-sm"
          />
        </motion.div>
      ) : (
        <div
          className="w-full max-w-sm rounded-md flex flex-col items-center justify-center gap-2 p-12 bg-stone-950 border border-white/5"
        >
          <span className="text-3xl" aria-hidden="true">📷</span>
          <span className="text-xs text-white/40">Memory moment</span>
        </div>
      )}
      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center font-serif italic text-sm sm:text-base text-cream-muted"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          "{subtext}"
        </motion.p>
      )}
    </div>
  )
}

function TextFrame({ frame }: { frame: FilmFrame }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center flex flex-col items-center gap-4 px-6 max-w-xl mx-auto select-none"
    >
      {frame.date && (
        <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase text-white/40 font-mono">
          {frame.date}
        </p>
      )}
      {frame.headline && (
        <p
          className="font-serif leading-tight"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: frame.type === 'quote'
              ? 'clamp(1.8rem, 5vw, 3.5rem)'
              : 'clamp(2.4rem, 7vw, 5.5rem)',
            color: 'var(--cream)',
            fontWeight: 300,
            fontStyle: frame.type === 'quote' ? 'italic' : 'normal',
          }}
        >
          {frame.headline}
        </p>
      )}
      {frame.subtext && (
        <p
          className="font-serif italic text-sm sm:text-base text-text-secondary"
          style={{
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.8,
          }}
        >
          {frame.subtext}
        </p>
      )}
    </motion.div>
  )
}

function VideoPlaceholderFrame({ frame }: { frame: FilmFrame }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.8 }}
      className="text-center flex flex-col items-center gap-4 px-6 max-w-xl mx-auto select-none"
    >
      <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-gold/80 mb-2">
        <span className="text-xl ml-0.5" aria-hidden="true">▶</span>
      </div>
      <p
        className="font-serif leading-tight text-3xl sm:text-4xl text-cream font-light"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {frame.headline}
      </p>
      <p
        className="font-serif italic text-sm sm:text-base text-text-secondary"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        "{frame.subtext}"
      </p>
    </motion.div>
  )
}

export default function MemoryFilmSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Generous height (165vh per frame) so each memory stays on screen long enough to actually look at
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        Math.floor(v * frames.length),
        frames.length - 1,
      )
      setActiveIdx(idx)
    })
  }, [scrollYProgress])

  const currentFrame = frames[activeIdx]

  return (
    <div
      ref={containerRef}
      id="film"
      style={{ height: `${frames.length * 165}vh` }}
      aria-label="Scene 11 — Memory Film"
    >
      <div
        className="sticky top-0 overflow-hidden flex flex-col justify-between"
        style={{ height: '100dvh', background: '#050505' }}
      >
        {/* Subtle letterbox vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 60%, rgba(0,0,0,0.85) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Film perforations — top bar */}
        <div
          className="shrink-0 flex items-center px-4 gap-2 relative z-10"
          style={{ height: 32, background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          aria-hidden="true"
        >
          {frames.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === activeIdx ? 24 : 8 }}
              transition={{ duration: 0.3 }}
              style={{
                height: 10,
                borderRadius: 2,
                background: i === activeIdx ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                flexShrink: 0,
              }}
            />
          ))}
          <span
            className="ml-auto font-mono text-[10px]"
            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
          >
            {String(activeIdx + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
          </span>
        </div>

        {/* Scene header tag */}
        <div className="text-center pt-3 pb-1 shrink-0 relative z-10">
          <p
            className="tracking-[0.4em] text-[10px] uppercase"
            style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
          >
            SCENE 11 — MEMORY FILM
          </p>
        </div>

        {/* Main active frame area with slow, calm cross-fade (fade -> slight scale -> hold -> fade) */}
        <div className="relative flex-1 flex items-center justify-center py-4 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full flex items-center justify-center"
            >
              {currentFrame.type === 'photo' ? (
                <PhotoFrame {...currentFrame} />
              ) : currentFrame.type === 'video-placeholder' ? (
                <VideoPlaceholderFrame frame={currentFrame} />
              ) : (
                <TextFrame frame={currentFrame} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom subtle progress hint */}
        <div className="text-center pb-3 text-[10px] text-white/20 tracking-widest shrink-0 uppercase font-mono relative z-10">
          Scroll to remember
        </div>
      </div>
    </div>
  )
}
