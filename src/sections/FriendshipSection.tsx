import { motion } from 'framer-motion'

const lines = [
  {
    text: 'There was a time when I wanted our story to be something different.',
    delay: 0.2,
    style: { color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' },
  },
  {
    text: 'You didn\'t feel the same way.',
    delay: 1,
    style: { color: 'var(--cream-muted)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' },
  },
  {
    text: 'I respected that.',
    delay: 1.8,
    style: { color: 'var(--cream)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 400 },
  },
  {
    text: 'Because caring about someone also means\nrespecting what they choose.',
    delay: 2.8,
    style: { color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' },
  },
  {
    text: 'So I stayed.',
    delay: 4,
    style: { color: 'var(--gold)', fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontWeight: 300 },
  },
  {
    text: 'Not because friendship was a second choice.',
    delay: 5,
    style: { color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' },
  },
  {
    text: 'But because you were still worth having in my life.',
    delay: 5.8,
    style: { color: 'var(--cream)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' },
  },
]

export default function FriendshipSection() {
  return (
    <section
      id="friendship"
      className="section-base"
      style={{ background: '#080808' }}
      aria-label="The friendship — honest reflection"
    >
      <div className="max-w-2xl mx-auto w-full">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="tracking-[0.4em] text-xs text-center mb-16"
          style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
        >
          SCENE 09 — FRIENDSHIP
        </motion.p>

        <div className="flex flex-col gap-10 text-center" role="article" aria-label="A reflection on friendship">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif leading-relaxed whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                lineHeight: 1.9,
                ...line.style,
              }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="gold-line-h mt-16 mb-8"
          style={{ maxWidth: '120px', margin: '4rem auto 0' }}
          aria-hidden="true"
        />

      </div>
    </section>
  )
}
