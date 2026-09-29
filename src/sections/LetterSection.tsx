import { motion } from 'framer-motion'

const letterLines = [
  { text: '30 September 2024', style: { color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.25em' }, delay: 0.2 },
  { text: '4:50 PM', style: { color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.2em', fontStyle: 'italic' }, delay: 0.6 },
  { text: '', delay: 1.0 }, // spacer
  { text: '"You probably don\'t remember that moment."', style: { color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)' }, delay: 1.4 },
  { text: '"I do."', style: { color: 'var(--cream)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 400 }, delay: 2.0 },
  { text: '', delay: 2.6 },
  {
    text: '"Because it was the beginning of a friendship\nthat became really important to me."',
    style: { color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 1.9 },
    delay: 2.8,
  },
  { text: '', delay: 3.4 },
  {
    text: '"I don\'t know what the future will look like."',
    style: { color: 'var(--text-dim)', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' },
    delay: 3.6,
  },
  {
    text: '"Maybe life takes us in completely different directions."',
    style: { color: 'var(--text-dim)', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' },
    delay: 4.0,
  },
  { text: '', delay: 4.4 },
  {
    text: '"But I\'m genuinely grateful that our paths crossed."',
    style: { color: 'var(--cream-muted)', fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)' },
    delay: 4.6,
  },
  { text: '', delay: 5.0 },
  {
    text: '"Thank you for being you, Samiksha."',
    style: { color: 'var(--cream)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 400 },
    delay: 5.2,
  },
  { text: '', delay: 5.6 },
  {
    text: '— Yash',
    style: { color: 'var(--gold)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontStyle: 'italic' },
    delay: 5.8,
  },
]

export default function LetterSection() {
  return (
    <section
      id="letter"
      className="section-base pb-32"
      style={{ background: '#050505' }}
      aria-label="Scene 12 — Final Letter and Story Conclusion"
    >
      <div className="max-w-xl mx-auto w-full px-4">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="tracking-[0.4em] text-xs text-center mb-16 uppercase"
          style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
        >
          SCENE 12 — FINAL LETTER
        </motion.p>

        {/* Letter body */}
        <div className="flex flex-col gap-4 text-center" role="article" aria-label="Letter to Samiksha">
          {letterLines.map((line, i) => {
            if (!line.text) return <div key={i} className="h-3" />
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="font-serif whitespace-pre-line leading-relaxed"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  ...line.style,
                }}
              >
                {line.text}
              </motion.p>
            )
          })}
        </div>

        {/* ======================================================== */}
        {/* FINAL SCREEN: Circular Return to the Beginning          */}
        {/* "Heyy" -> "That's where it started." No buttons, no CTA */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="mt-32 pt-16 flex flex-col items-center gap-6 text-center"
        >
          <div className="gold-line mx-auto mb-8" aria-hidden="true" />

          {/* Date and time stamp */}
          <div className="space-y-1">
            <p
              className="tracking-[0.4em] text-xs uppercase"
              style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
            >
              30 September 2024
            </p>
            <p
              className="font-serif italic text-sm"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}
            >
              4:50 PM
            </p>
          </div>

          {/* The Solitary "Heyy" Chat Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="my-3"
          >
            <div
              className="chat-bubble-in text-left px-4 py-2.5 rounded-2xl shadow-xl"
              style={{
                background: '#16281e',
                border: '1px solid rgba(37, 211, 102, 0.15)',
              }}
            >
              <p
                className="text-xs font-medium text-emerald-400/80 mb-0.5 select-none"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Samikshaa
              </p>
              <p
                className="text-base text-white font-normal"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Heyy
              </p>
              <p className="text-[10px] text-white/40 text-right mt-1 select-none">
                4:50 PM
              </p>
            </div>
          </motion.div>

          {/* Final closing words */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="font-serif italic text-base sm:text-lg text-cream-muted mt-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            That's where it started.
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
