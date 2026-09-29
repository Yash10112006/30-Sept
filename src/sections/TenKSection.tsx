import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const words = ['TIME', 'EFFORT', 'SUPPORT', 'PATIENCE', 'LAUGHTER', 'PRESENCE', 'CARE']

const stages = [
  { value: '10%',     size: 'text-3xl md:text-5xl', color: 'var(--text-dim)' },
  { value: '100%',    size: 'text-4xl md:text-6xl', color: 'var(--text-secondary)' },
  { value: '1,000%',  size: 'text-5xl md:text-7xl', color: 'var(--cream-muted)' },
  { value: '10,000%', size: 'text-6xl md:text-9xl', color: 'var(--cream)' },
]

export default function TenKSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(sectionRef as any, { once: true, amount: 0.3 })
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const delays = [500, 1300, 2200, 3200]
    const timers = delays.map((d, i) => setTimeout(() => setStage(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  const textDone = stage >= stages.length

  return (
    <section
      id="tenk"
      ref={sectionRef}
      className="section-base"
      style={{ background: '#080808' }}
      aria-label="10,000 percent — what I gave to this friendship"
    >
      <div className="max-w-3xl mx-auto w-full text-center">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="tracking-[0.4em] text-xs mb-10"
          style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
        >
          SCENE 08 — 10,000%
        </motion.p>

        {/* Escalating counter — each stage fades the previous */}
        <div
          className="mb-10 flex flex-col items-center justify-center"
          style={{ minHeight: '16rem' }}
          aria-live="polite"
          aria-label="Counter animation"
        >
          {stages.map((s, i) => (
            <AnimatePresence key={s.value}>
              {stage > i && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: i === stage - 1 ? 1 : 0.15,
                    y: 0,
                    scale: i === stage - 1 ? 1 : 0.88,
                  }}
                  transition={{ duration: 0.55, ease: 'easeOut' as const }}
                  className="absolute font-serif leading-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize:
                      i === stages.length - 1
                        ? 'clamp(4rem, 16vw, 10rem)'
                        : 'clamp(1.5rem, 4vw, 2.5rem)',
                    color: s.color,
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    pointerEvents: 'none',
                  }}
                  aria-label={s.value}
                >
                  {s.value}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Text that appears after counter finishes */}
        <AnimatePresence>
          {textDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' as const }}
                className="font-serif"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.9,
                  maxWidth: '560px',
                }}
              >
                From the beginning, I gave this friendship my best.
              </motion.p>

              {/* Word tags */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg" role="list" aria-label="What I gave">
                {words.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.5, ease: 'easeOut' as const }}
                    className="px-4 py-1.5 text-xs tracking-[0.18em]"
                    style={{
                      border: '1px solid var(--border-strong)',
                      color: 'var(--cream-muted)',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(184,150,90,0.04)',
                      borderRadius: '2px',
                    }}
                    role="listitem"
                  >
                    {w}
                  </motion.span>
                ))}
              </div>

              <div className="gold-line" aria-hidden="true" />

              {/* The three honest lines — the most important part */}
              {[
                { text: '"Not because I expected anything."', delay: 2.2 },
                { text: '"Not because you owed me anything."', delay: 3.0 },
              ].map(({ text, delay }) => (
                <motion.p
                  key={text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay, duration: 1.1 }}
                  className="font-serif"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                  }}
                >
                  {text}
                </motion.p>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8, duration: 1.2 }}
                className="font-serif"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                  color: 'var(--cream)',
                  lineHeight: 1.8,
                  maxWidth: '460px',
                }}
              >
                "Simply because you became{' '}
                <em style={{ color: 'var(--gold)' }}>important to me.</em>"
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
