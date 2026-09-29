import { useState } from 'react'
import { motion } from 'framer-motion'

// Helper transition variants
const fade = (delay: number, duration = 1.0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration, ease: 'easeOut' as const },
})

const rise = (delay: number, duration = 0.9) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: 'easeOut' as const },
})

export default function HeroSection() {
  const [fastForward, setFastForward] = useState(false)

  const scrollToChat = () => {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  // If user clicks skip or taps early, render everything immediately
  const d = (normalDelay: number) => (fastForward ? 0.05 : normalDelay)

  return (
    <section
      id="beginning"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-4"
      style={{ background: '#050505' }}
      aria-label="Beginning — 30 September 2024"
    >
      {/* Deep cinematic vignette — heavy radial darkness around edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(201, 168, 76, 0.03) 0%, transparent 70%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
        }}
        aria-hidden="true"
      />

      <div className="text-center px-4 relative z-10 flex flex-col items-center gap-6 max-w-lg w-full">

        {/* Scene tag */}
        <motion.p
          {...fade(d(0.4), 0.8)}
          className="tracking-[0.45em] text-[10px] md:text-xs uppercase"
          style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)', letterSpacing: '0.45em' }}
        >
          SCENE 01 — 30 SEPTEMBER 2024
        </motion.p>

        {/* Date stamp — The first line of the website */}
        <motion.h1
          {...fade(d(1.0), 1.2)}
          className="tracking-[0.35em] text-xs md:text-sm uppercase font-normal text-center"
          style={{ color: 'var(--cream)', fontFamily: 'var(--font-sans)', letterSpacing: '0.35em' }}
        >
          30 September 2024
        </motion.h1>

        {/* Time — 4:50 PM */}
        <motion.p
          {...fade(d(2.0), 1.0)}
          className="text-center font-serif text-lg md:text-xl"
          style={{
            color: 'var(--gold)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            letterSpacing: '0.15em',
          }}
        >
          4:50 PM
        </motion.p>

        {/* Subtle WhatsApp Notification Banner */}
        <motion.div
          {...rise(d(3.2), 0.8)}
          className="wa-notification w-full max-w-sm"
          style={{
            background: 'rgba(17, 31, 24, 0.75)',
            border: '1px solid rgba(37, 211, 102, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          aria-label="WhatsApp notification from Samikshaa MIT: Heyy"
        >
          <div className="wa-avatar" style={{ width: 34, height: 34, fontSize: '0.85rem' }} aria-hidden="true">
            S
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium leading-none mb-1" style={{ color: '#86efac', fontFamily: 'var(--font-sans)' }}>
              Samikshaa MIT
            </p>
            <p className="text-xs truncate font-normal" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)' }}>
              Heyy
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)' }}>
              4:50 PM
            </p>
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#25d366' }}
              aria-label="New message"
            />
          </div>
        </motion.div>

        {/* Visual Focal Point: The Chat Bubble Exchange */}
        <motion.div
          {...rise(d(4.4), 0.9)}
          className="w-full max-w-sm rounded-2xl p-4 flex flex-col gap-3 my-2"
          style={{
            background: '#0d1a11',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Samikshaa: "Heyy" — The visual focal point */}
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: d(4.8), duration: 0.6, ease: 'easeOut' as const }}
            className="flex justify-start"
          >
            <div
              className="chat-bubble-in relative"
              style={{
                maxWidth: '80%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p
                className="text-base font-normal tracking-wide text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Heyy
              </p>
              <p className="chat-timestamp text-right mt-1 text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                4:50 PM
              </p>
            </div>
          </motion.div>

          {/* Pause, then: You: "Hello" */}
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: d(6.2), duration: 0.6, ease: 'easeOut' as const }}
            className="flex justify-end"
          >
            <div
              className="chat-bubble-out"
              style={{
                maxWidth: '80%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <p
                className="text-base font-normal tracking-wide text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Hello
              </p>
              <p className="chat-timestamp flex items-center justify-end gap-1 mt-1 text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span>4:50 PM</span>
                <span className="text-[10px]" style={{ color: '#53bdeb' }} aria-hidden="true">✓✓</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Narrative Reflection — Authentic, Minimal, Grounded */}
        <div className="flex flex-col items-center gap-3 mt-2">
          {/* "That's it. That's where the story begins." */}
          <motion.div
            {...fade(d(7.4), 0.9)}
            className="flex flex-col gap-1"
          >
            <p
              className="font-serif text-lg md:text-xl font-light"
              style={{ color: 'var(--cream)', fontFamily: 'var(--font-serif)' }}
            >
              That's it.
            </p>
            <p
              className="font-serif text-sm md:text-base italic"
              style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-serif)' }}
            >
              That's where the story begins.
            </p>
          </motion.div>

          <motion.div
            {...fade(d(8.4), 0.8)}
            className="gold-line my-1"
            aria-hidden="true"
          />

          {/* "Some beginnings are almost too ordinary to notice. This was one of them." */}
          <motion.div
            {...fade(d(9.2), 1.0)}
            className="flex flex-col gap-2 max-w-sm text-center"
          >
            <p
              className="font-serif text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              Some beginnings are almost too ordinary to notice.
            </p>
            <p
              className="font-serif text-sm md:text-base font-normal"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}
            >
              This was one of them.
            </p>
          </motion.div>
        </div>

        {/* CTA to transition into the rest of the conversation */}
        <motion.div {...fade(d(10.2), 0.9)} className="mt-4 flex flex-col items-center gap-3">
          <motion.button
            onClick={scrollToChat}
            className="px-7 py-3 text-xs tracking-[0.25em] uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-600 rounded-sm"
            style={{
              border: '1px solid rgba(184,150,90,0.3)',
              color: 'var(--cream)',
              fontFamily: 'var(--font-sans)',
              background: 'rgba(184,150,90,0.06)',
              cursor: 'pointer',
              letterSpacing: '0.25em',
              transition: 'all 0.4s ease',
            }}
            whileHover={{ borderColor: 'rgba(184,150,90,0.7)', background: 'rgba(184,150,90,0.12)' }}
            whileTap={{ scale: 0.97 }}
            aria-label="See the full conversation"
          >
            See how it unfolded ↓
          </motion.button>

          {!fastForward && (
            <button
              onClick={() => setFastForward(true)}
              className="text-[11px] tracking-wider transition-opacity hover:opacity-100 focus-visible:outline-none"
              style={{ color: 'var(--text-dim)', opacity: 0.5, fontFamily: 'var(--font-sans)' }}
            >
              Skip intro
            </button>
          )}
        </motion.div>

      </div>
    </section>
  )
}
