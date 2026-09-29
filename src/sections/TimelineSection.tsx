import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'

interface TimelineStage {
  id: string
  title: string
  description: string
  metadata?: string
  isFights?: boolean
  isStillHere?: boolean
  isFriendship?: boolean
}

const stages: TimelineStage[] = [
  {
    id: 'first-message',
    title: 'FIRST MESSAGE',
    description: "It started with a 'Heyy.'",
    metadata: '30 Sep 2024',
  },
  {
    id: 'college',
    title: 'COLLEGE',
    description: 'Same campus. Different days.',
  },
  {
    id: 'assignments',
    title: 'ASSIGNMENTS',
    description: 'Deadlines came and went.',
  },
  {
    id: 'bitching-sessions',
    title: 'BITCHING SESSIONS',
    description: 'There was always something to complain about.',
  },
  {
    id: 'sharing-things',
    title: 'SHARING THINGS',
    description: "Then came the things we didn't tell everyone.",
  },
  {
    id: 'random-conversations',
    title: 'RANDOM CONVERSATIONS',
    description: 'Somehow, talking became normal.',
  },
  {
    id: 'fights',
    title: 'FIGHTS',
    description: "We didn't always agree.",
    isFights: true,
  },
  {
    id: 'still-here',
    title: 'STILL HERE',
    description: 'But somehow, neither of us left.',
    isStillHere: true,
  },
  {
    id: 'inside-jokes',
    title: 'INSIDE JOKES',
    description: 'Things only we found funny.',
  },
  {
    id: 'friendship',
    title: 'FRIENDSHIP',
    description: 'Somewhere between all of it, it became friendship.',
    isFriendship: true,
  },
]

// Desktop Node Component: Alternating 50/50, active/past state tracking, exact 32-40px center gap
function DesktopTimelineNode({
  stage,
  isLeft,
  marginBottomClass,
}: {
  stage: TimelineStage
  isLeft: boolean
  marginBottomClass: string
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, {
    amount: 0.45,
    margin: '-15% 0px -20% 0px',
  })
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (isInView && !hasEntered) {
      setHasEntered(true)
    }
  }, [isInView, hasEntered])

  const isFights = stage.isFights
  const isStillHere = stage.isStillHere
  const isFriendship = stage.isFriendship

  return (
    <div
      ref={nodeRef}
      className={`relative flex items-center justify-between w-full ${marginBottomClass}`}
      role="listitem"
    >
      {/* Left Column (50% container width) — Cards align to the right, ending with 36px gap from center line */}
      <div className="w-1/2 pr-9 flex justify-end">
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 18 }}
            animate={{
              opacity: hasEntered ? (isInView ? 1 : 0.45) : 0,
              x: hasEntered ? 0 : -20,
              y: hasEntered ? (isInView ? 0 : 4) : 18,
              scale: isInView ? 1.01 : 1,
            }}
            transition={{
              duration: isFights ? 1.1 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`w-[370px] max-w-[380px] min-h-[96px] text-right rounded-xl px-7 py-6 transition-all duration-700 ${
              isFights
                ? 'bg-[#111110] border border-white/[0.04]'
                : isFriendship
                ? isInView
                  ? 'bg-[#151412] border border-[#b8965a]/35 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                  : 'bg-[#131211] border border-[#b8965a]/15'
                : isInView
                ? 'bg-[#141312] border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.55)]'
                : 'bg-[#121110] border border-white/[0.05]'
            }`}
          >
            {/* Optional Metadata */}
            {stage.metadata && (
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-1.5 transition-colors"
                style={{
                  color: isInView ? 'var(--gold)' : 'rgba(184, 150, 90, 0.5)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {stage.metadata}
              </p>
            )}

            {/* Title */}
            <h3
              className="font-serif text-[17px] tracking-wide uppercase mb-1.5 transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-serif)',
                color: isFights
                  ? (isInView ? '#b0aba5' : '#6e6964')
                  : isFriendship
                  ? (isInView ? 'var(--gold)' : '#9e8557')
                  : (isInView ? 'var(--cream)' : '#8c867e'),
                fontWeight: 400,
              }}
            >
              {stage.title}
            </h3>

            {/* Description */}
            <p
              className="text-[13px] leading-relaxed transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-sans)',
                color: isFights
                  ? (isInView ? '#7d7670' : '#4d4945')
                  : (isInView ? 'var(--text-secondary)' : '#66615b'),
              }}
            >
              {stage.description}
            </p>
          </motion.div>
        ) : (
          <div className="w-full" aria-hidden="true" />
        )}
      </div>

      {/* Central Connector Node (Dot on the Line) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale: isInView ? (isFriendship ? 1.15 : 1.08) : 1,
            opacity: hasEntered ? 1 : 0.35,
          }}
          transition={{ duration: 0.6 }}
          className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: isInView
              ? (isFights ? '#2a2825' : isFriendship ? '#b8965a' : '#26221b')
              : '#161514',
            border: `1.5px solid ${
              isInView
                ? (isFights ? '#5a544c' : isFriendship ? '#e6c88b' : '#a88950')
                : '#3a362f'
            }`,
            boxShadow: isInView
              ? (isFriendship
                  ? '0 0 12px rgba(184, 150, 90, 0.6)'
                  : isFights
                  ? '0 0 4px rgba(0, 0, 0, 0.7)'
                  : '0 0 8px rgba(184, 150, 90, 0.35)')
              : 'none',
          }}
        >
          <div
            className="w-1 h-1 rounded-full transition-colors duration-500"
            style={{
              background: isInView
                ? (isFriendship ? '#ffffff' : isFights ? '#827a72' : '#e6c88b')
                : '#423e37',
            }}
          />
        </motion.div>
      </div>

      {/* Right Column (50% container width) — Cards align to the left, starting with 36px gap from center line */}
      <div className="w-1/2 pl-9 flex justify-start">
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 18 }}
            animate={{
              opacity: hasEntered ? (isInView ? 1 : 0.45) : 0,
              x: hasEntered ? 0 : 20,
              y: hasEntered ? (isInView ? 0 : 4) : 18,
              scale: isInView ? 1.01 : 1,
            }}
            transition={{
              duration: isFights ? 1.1 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`w-[370px] max-w-[380px] min-h-[96px] text-left rounded-xl px-7 py-6 transition-all duration-700 ${
              isFights
                ? 'bg-[#111110] border border-white/[0.04]'
                : isFriendship
                ? isInView
                  ? 'bg-[#151412] border border-[#b8965a]/35 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                  : 'bg-[#131211] border border-[#b8965a]/15'
                : isInView
                ? 'bg-[#141312] border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.55)]'
                : 'bg-[#121110] border border-white/[0.05]'
            }`}
          >
            {/* Optional Metadata */}
            {stage.metadata && (
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-1.5 transition-colors"
                style={{
                  color: isInView ? 'var(--gold)' : 'rgba(184, 150, 90, 0.5)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {stage.metadata}
              </p>
            )}

            {/* Title */}
            <h3
              className="font-serif text-[17px] tracking-wide uppercase mb-1.5 transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-serif)',
                color: isFights
                  ? (isInView ? '#b0aba5' : '#6e6964')
                  : isFriendship
                  ? (isInView ? 'var(--gold)' : '#9e8557')
                  : (isInView ? 'var(--cream)' : '#8c867e'),
                fontWeight: 400,
              }}
            >
              {stage.title}
            </h3>

            {/* Description */}
            <p
              className="text-[13px] leading-relaxed transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-sans)',
                color: isFights
                  ? (isInView ? '#7d7670' : '#4d4945')
                  : (isInView ? 'var(--text-secondary)' : '#66615b'),
              }}
            >
              {stage.description}
            </p>

            {/* Special Grounded Secondary Text for STILL HERE */}
            {isStillHere && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0.5 }}
                transition={{ delay: 0.35, duration: 0.9 }}
                className="mt-4 pt-3.5 border-t border-white/[0.06] space-y-2"
              >
                <p
                  className="text-[12.5px] leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: '#c4bcb1',
                    fontStyle: 'italic',
                  }}
                >
                  "Not because everything was always easy."
                </p>
                <p
                  className="text-[12.5px] leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: '#9e968b',
                    fontStyle: 'italic',
                  }}
                >
                  "Because somehow, it was worth staying through the difficult parts."
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="w-full" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}

// Mobile Node Component: Single Left Column with Comfortable Vertical Separation
function MobileTimelineNode({
  stage,
  marginBottomClass,
}: {
  stage: TimelineStage
  marginBottomClass: string
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, {
    amount: 0.4,
    margin: '-10% 0px -15% 0px',
  })
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (isInView && !hasEntered) {
      setHasEntered(true)
    }
  }, [isInView, hasEntered])

  const isFights = stage.isFights
  const isStillHere = stage.isStillHere
  const isFriendship = stage.isFriendship

  return (
    <div
      ref={nodeRef}
      className={`relative w-full ${marginBottomClass}`}
      role="listitem"
    >
      {/* Left Node Dot centered on mobile line */}
      <div
        className="absolute left-[-1.45rem] top-7 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale: isInView ? 1.08 : 1,
            opacity: hasEntered ? 1 : 0.4,
          }}
          transition={{ duration: 0.5 }}
          className="w-3 h-3 rounded-full flex items-center justify-center"
          style={{
            background: isInView
              ? (isFights ? '#2a2825' : isFriendship ? '#b8965a' : '#26221b')
              : '#161514',
            border: `1.5px solid ${
              isInView
                ? (isFights ? '#5a544c' : isFriendship ? '#e6c88b' : '#a88950')
                : '#3a362f'
            }`,
            boxShadow: isInView
              ? (isFriendship
                  ? '0 0 10px rgba(184, 150, 90, 0.55)'
                  : '0 0 6px rgba(184, 150, 90, 0.25)')
              : 'none',
          }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{
              background: isInView
                ? (isFriendship ? '#fff' : isFights ? '#827a72' : '#e6c88b')
                : '#423e37',
            }}
          />
        </motion.div>
      </div>

      {/* Card Body */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 15 }}
        animate={{
          opacity: hasEntered ? (isInView ? 1 : 0.45) : 0,
          x: hasEntered ? 0 : 12,
          y: hasEntered ? (isInView ? 0 : 3) : 15,
        }}
        transition={{
          duration: isFights ? 1.0 : 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`w-full max-w-[380px] rounded-xl px-5 py-4.5 transition-all duration-500 ${
          isFights
            ? 'bg-[#111110] border border-white/[0.04]'
            : isFriendship
            ? isInView
              ? 'bg-[#151412] border border-[#b8965a]/35 shadow-lg'
              : 'bg-[#131211] border border-[#b8965a]/15'
            : isInView
            ? 'bg-[#141312] border border-white/[0.12] shadow-md'
            : 'bg-[#121110] border border-white/[0.05]'
        }`}
      >
        {stage.metadata && (
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-1"
            style={{
              color: isInView ? 'var(--gold)' : 'rgba(184, 150, 90, 0.5)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {stage.metadata}
          </p>
        )}

        <h3
          className="font-serif text-base tracking-wide uppercase mb-1 transition-colors"
          style={{
            fontFamily: 'var(--font-serif)',
            color: isFights
              ? (isInView ? '#b0aba5' : '#6e6964')
              : isFriendship
              ? (isInView ? 'var(--gold)' : '#9e8557')
              : (isInView ? 'var(--cream)' : '#8c867e'),
            fontWeight: 400,
          }}
        >
          {stage.title}
        </h3>

        <p
          className="text-xs leading-relaxed transition-colors"
          style={{
            fontFamily: 'var(--font-sans)',
            color: isFights
              ? (isInView ? '#7d7670' : '#4d4945')
              : (isInView ? 'var(--text-secondary)' : '#66615b'),
          }}
        >
          {stage.description}
        </p>

        {isStillHere && (
          <div className="mt-3 pt-2.5 border-t border-white/[0.06] space-y-1.5">
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#c4bcb1',
                fontStyle: 'italic',
              }}
            >
              "Not because everything was always easy."
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#9e968b',
                fontStyle: 'italic',
              }}
            >
              "Because somehow, it was worth staying through the difficult parts."
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Progressive scroll-linked line revealing down the timeline
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 65%', 'end 75%'],
  })

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  })

  // Dynamic spacing classes based on requirements:
  // - Standard items: 240px–280px vertical separation
  // - FIGHTS -> STILL HERE: 340px–380px separation
  // - INSIDE JOKES -> FRIENDSHIP: ~300px separation
  const getMarginBottom = (stageId: string, isDesktop: boolean) => {
    if (stageId === 'fights') {
      return isDesktop ? 'mb-[340px] lg:mb-[380px]' : 'mb-52'
    }
    if (stageId === 'inside-jokes') {
      return isDesktop ? 'mb-[280px] lg:mb-[320px]' : 'mb-44'
    }
    if (stageId === 'friendship') {
      return isDesktop ? 'mb-0' : 'mb-0'
    }
    // Standard separation for items 1 through 6, and item 8
    return isDesktop ? 'mb-[230px] lg:mb-[270px]' : 'mb-36'
  }

  return (
    <section
      id="timeline"
      className="section-base relative w-full flex flex-col items-center justify-center"
      style={{ background: '#0a0a09' }}
      ref={containerRef}
      aria-label="Scene 03 — Ordinary Days Timeline"
    >
      <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center px-4 sm:px-6">

        {/* ── Separate Header Section: Generous vertical space before timeline begins ── */}
        <div className="text-center max-w-xl mx-auto pt-[140px] pb-[100px]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="tracking-[0.4em] text-xs text-center mb-6 uppercase"
            style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
          >
            SCENE 03 — ORDINARY DAYS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' as const }}
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--cream)',
              lineHeight: 1.35,
            }}
          >
            Most important stories
            <br />
            <span style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
              don't begin dramatically.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base font-serif"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            They grow through ordinary days.
          </motion.p>
        </div>

        {/* Visual pause between header and FIRST MESSAGE */}
        <div className="h-16 md:h-24 w-full" aria-hidden="true" />

        {/* ── Main Timeline Container ── */}
        <div ref={lineRef} className="w-full relative">

          {/* ════════════════════════════════════════════════════════════════════
              DESKTOP LAYOUT (md and up): Perfectly Centered 50/50 Alternating
              Each card maintains a strict 36px gap from the center line.
          ════════════════════════════════════════════════════════════════════ */}
          <div className="hidden md:block relative w-full" role="list" aria-label="Timeline of the friendship">
            {/* Inactive Central Line (Very dark warm gray) */}
            <div
              className="absolute left-1/2 top-3 bottom-6 w-[1.5px] -translate-x-1/2 pointer-events-none"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
              }}
              aria-hidden="true"
            />

            {/* Revealed Central Line (Subtle muted gold, progress-linked) */}
            <motion.div
              className="absolute left-1/2 top-3 bottom-6 w-[1.5px] -translate-x-1/2 pointer-events-none origin-top"
              style={{
                scaleY: smoothScaleY,
                background: 'linear-gradient(to bottom, #9d7f47 0%, #c5a66a 50%, #9d7f47 100%)',
                boxShadow: '0 0 6px rgba(184, 150, 90, 0.3)',
              }}
              aria-hidden="true"
            />

            {/* 10 Chronological Memory Stages */}
            {stages.map((stage, i) => (
              <DesktopTimelineNode
                key={stage.id}
                stage={stage}
                isLeft={i % 2 === 0}
                marginBottomClass={getMarginBottom(stage.id, true)}
              />
            ))}
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              MOBILE LAYOUT (below md): Clean Left-Aligned Column with Spacious Breathing Room
          ════════════════════════════════════════════════════════════════════ */}
          <div
            className="md:hidden relative w-full pl-7 sm:pl-9"
            role="list"
            aria-label="Timeline of the friendship"
          >
            {/* Inactive Left Line */}
            <div
              className="absolute left-[-1.45rem] top-3 bottom-6 w-[1.5px] pointer-events-none"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
              aria-hidden="true"
            />

            {/* Active Left Line */}
            <motion.div
              className="absolute left-[-1.45rem] top-3 bottom-6 w-[1.5px] pointer-events-none origin-top"
              style={{
                scaleY: smoothScaleY,
                background: 'linear-gradient(to bottom, #9d7f47 0%, #c5a66a 50%, #9d7f47 100%)',
                boxShadow: '0 0 5px rgba(184, 150, 90, 0.3)',
              }}
              aria-hidden="true"
            />

            {stages.map((stage) => (
              <MobileTimelineNode
                key={stage.id}
                stage={stage}
                marginBottomClass={getMarginBottom(stage.id, false)}
              />
            ))}
          </div>

        </div>

        {/* ── Final Quiet Chapter Ending Reflection ── */}
        <div className="w-full max-w-lg mx-auto text-center mt-36 lg:mt-48 pb-36 lg:pb-44 flex flex-col items-center">
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
            transition={{ duration: 1.0, ease: 'easeOut' as const }}
            className="font-serif text-lg sm:text-xl md:text-2xl font-light"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--cream)',
              lineHeight: 1.6,
            }}
          >
            "Nothing changed all at once."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 1.1 }}
            className="font-serif text-base sm:text-lg md:text-xl mt-3 font-light"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--gold)',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            "It just slowly became familiar."
          </motion.p>
        </div>

      </div>
    </section>
  )
}
