import { motion } from 'framer-motion'
import { soundtrackTracks } from '../data/songs'

export default function SoundtrackSection() {
  return (
    <section
      id="soundtrack"
      className="section-base relative w-full flex flex-col items-center justify-center pt-28 pb-36 sm:py-36"
      style={{ background: '#080807' }}
      aria-label="Scene 07 — Soundtrack"
    >
      {/* ── Main Centered Container ── */}
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center px-4 sm:px-6">

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
            SCENE 07
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
            SOUNDTRACK
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
            "Some memories have a soundtrack."
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
            "Some songs just stayed."
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            VERTICAL EDITORIAL SEQUENCE: 2 Spotify Embeds
            Spacious, centered, restrained, no flashy player UI
        ════════════════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center">

          {soundtrackTracks.map((track, index) => {
            const isLast = index === soundtrackTracks.length - 1

            return (
              <div
                key={track.id}
                className={`w-full flex flex-col items-center ${
                  isLast ? 'mb-36 sm:mb-44' : 'mb-40 sm:mb-48'
                }`}
              >
                {/* Track Number Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-4 text-center"
                >
                  <span
                    className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/40 border-b border-white/10 pb-1"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {track.number}
                  </span>
                </motion.div>

                {/* Spotify Embed Container */}
                <motion.div
                  initial={{ opacity: 0, y: 22, scale: 0.99 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[calc(100%-32px)] sm:w-full max-w-[660px] mx-auto rounded-2xl overflow-hidden p-2 sm:p-2.5 transition-all duration-500"
                  style={{
                    background: '#0c0b0a',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
                  }}
                >
                  <iframe
                    src={track.embedUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify Track: ${track.title} - ${track.artist}`}
                    className="rounded-xl w-full block"
                    style={{ border: 0 }}
                  />
                </motion.div>
              </div>
            )
          })}

        </div>

        {/* ── Closing Reflection: Quiet, Understated Ending ── */}
        <div className="w-full max-w-lg mx-auto text-center mt-12 sm:mt-16 pb-36 sm:pb-48 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="w-px bg-gradient-to-b from-[#b8965a]/35 to-transparent mb-10"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="font-serif text-lg sm:text-xl font-light"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--cream)',
              lineHeight: 1.6,
            }}
          >
            "Some songs remind you of a time."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1.0, ease: 'easeOut' }}
            className="font-serif text-lg sm:text-xl font-light mt-3"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--cream-muted)',
              lineHeight: 1.6,
            }}
          >
            "Some remind you of people."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 1.1, ease: 'easeOut' }}
            className="font-serif text-base sm:text-lg md:text-xl mt-4 font-light"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--gold)',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            "And some just stay."
          </motion.p>
        </div>

      </div>
    </section>
  )
}
