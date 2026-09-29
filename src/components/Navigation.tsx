import { motion, useScroll, useSpring } from 'framer-motion'
import { useScrollProgress } from '../hooks/useInView'
import { cn } from '../utils/helpers'

const sections = [
  { id: 'beginning',   label: 'BEGINNING' },
  { id: 'chat',        label: 'CHATS' },
  { id: 'timeline',    label: 'JOURNEY' },
  { id: 'photos',      label: 'MEMORIES' },
  { id: 'videos',      label: 'VIDEOS' },
  { id: 'soundtrack',  label: 'SOUNDTRACK' },
  { id: 'tenk',        label: '10,000%' },
  { id: 'friendship',  label: 'FRIENDSHIP' },
  { id: 'film',        label: 'FILM' },
  { id: 'letter',      label: 'LETTER' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const progress = useScrollProgress()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Floating Top Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none"
        aria-label="Site navigation"
      >
        {/* Logo / date mark */}
        <button
          onClick={() => scrollTo('beginning')}
          className="pointer-events-auto font-serif text-sm tracking-widest text-gold opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}
          aria-label="Go to beginning"
        >
          30.09.2024
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 pointer-events-auto" role="list">
          {sections.slice(0, 5).map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="text-xs tracking-widest transition-colors duration-300 focus-visible:outline-none"
                style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
                aria-label={`Go to ${s.label} section`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Vertical Side Progress Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
        role="navigation"
        aria-label="Section progress"
      >
        {sections.map((s, i) => {
          const sectionProgress = i / (sections.length - 1)
          const isActive = Math.abs(progress - sectionProgress) < 1 / (sections.length * 2)
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn('nav-dot', isActive && 'active')}
              title={s.label}
              aria-label={`Navigate to ${s.label}`}
            />
          )
        })}
      </motion.div>
    </>
  )
}
