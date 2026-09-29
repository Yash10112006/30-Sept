import { useState, useEffect, useRef, useCallback } from 'react'

const TARGET_VOLUME = 0.28
const RESTORE_VOLUME = 0.30
const DUCKED_VOLUME = 0.06
const FADE_DURATION_MS = 3800 // 3.8 seconds fade-in

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStartedOnce, setHasStartedOnce] = useState(false)
  const isSoundtrackActiveRef = useRef(false)
  const isNearEndRef = useRef(false)

  // Smooth volume transition helper
  const fadeVolumeTo = useCallback((targetVol: number, durationMs: number, onComplete?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }

    const steps = 30
    const stepDuration = durationMs / steps
    const initialVol = audio.volume
    const volDiff = targetVol - initialVol
    let currentStep = 0

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const newVol = Math.max(0, Math.min(1, initialVol + volDiff * progress))

      if (audio) {
        audio.volume = newVol
      }

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          window.clearInterval(fadeIntervalRef.current)
          fadeIntervalRef.current = null
        }
        if (audio) {
          audio.volume = targetVol
        }
        onComplete?.()
      }
    }, stepDuration)
  }, [])

  // Start background playback with gentle fade-in from 0
  const startBackgroundMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!hasStartedOnce) {
      audio.currentTime = 0
      setHasStartedOnce(true)
    }

    audio.volume = 0
    audio.muted = false
    setIsMuted(false)

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          const target = isSoundtrackActiveRef.current
            ? DUCKED_VOLUME
            : isNearEndRef.current
            ? 0.02
            : TARGET_VOLUME
          fadeVolumeTo(target, FADE_DURATION_MS)
        })
        .catch(() => {
          // Autoplay was prevented by browser policy; user gesture will start it
          setIsPlaying(false)
        })
    }
  }, [hasStartedOnce, fadeVolumeTo])

  // Setup first-interaction listeners for browser autoplay compliance
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let userStarted = false

    const handleFirstGesture = () => {
      if (userStarted) return
      userStarted = true

      // Clean up all one-time listeners immediately
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstGesture)
      })

      startBackgroundMusic()
    }

    const interactionEvents = ['click', 'touchstart', 'keydown', 'scroll', 'pointerdown']

    // Try starting immediately in case browser permissions allow it
    const directPlay = audio.play()
    if (directPlay !== undefined) {
      directPlay
        .then(() => {
          userStarted = true
          setHasStartedOnce(true)
          setIsPlaying(true)
          fadeVolumeTo(TARGET_VOLUME, FADE_DURATION_MS)
        })
        .catch(() => {
          // Register first-gesture listeners
          interactionEvents.forEach((event) => {
            window.addEventListener(event, handleFirstGesture, { passive: true })
          })
        })
    }

    return () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstGesture)
      })
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current)
      }
    }
  }, [startBackgroundMusic, fadeVolumeTo])

  // Monitor Scene 07 (Spotify section) to duck background music volume while in Scene 07
  useEffect(() => {
    const soundtrackEl = document.getElementById('soundtrack')
    if (!soundtrackEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSoundtrackActiveRef.current = entry.isIntersecting
        const audio = audioRef.current
        if (!audio || audio.paused || isMuted) return

        if (entry.isIntersecting) {
          // Gently lower volume when reaching Scene 07
          fadeVolumeTo(DUCKED_VOLUME, 1200)
        } else {
          // Restore volume when scrolling away from Scene 07
          const restoreVol = isNearEndRef.current ? 0.02 : RESTORE_VOLUME
          fadeVolumeTo(restoreVol, 1500)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(soundtrackEl)
    return () => observer.disconnect()
  }, [isMuted, fadeVolumeTo])

  // Monitor final scene / bottom of page for gentle fade-out near the very end
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const progress = window.scrollY / scrollHeight
      const isNearEnd = progress >= 0.95

      if (isNearEnd !== isNearEndRef.current) {
        isNearEndRef.current = isNearEnd
        const audio = audioRef.current
        if (!audio || audio.paused || isMuted) return

        if (isNearEnd) {
          fadeVolumeTo(0.02, 2000)
        } else {
          const target = isSoundtrackActiveRef.current ? DUCKED_VOLUME : RESTORE_VOLUME
          fadeVolumeTo(target, 1500)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMuted, fadeVolumeTo])

  // Toggle Play / Mute control
  const toggleSound = () => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }

    if (isPlaying && !isMuted) {
      // Fade out and mute
      fadeVolumeTo(0, 400, () => {
        audio.pause()
        setIsPlaying(false)
        setIsMuted(true)
      })
    } else {
      // Resume playback and fade in
      audio.muted = false
      setIsMuted(false)
      audio.play()
        .then(() => {
          setIsPlaying(true)
          const target = isSoundtrackActiveRef.current
            ? DUCKED_VOLUME
            : isNearEndRef.current
            ? 0.02
            : RESTORE_VOLUME
          fadeVolumeTo(target, 800)
        })
        .catch(() => {})
    }
  }

  return (
    <>
      {/* Persistent Audio Element — mounted once at root, never reloaded */}
      <audio
        ref={audioRef}
        src="/media/background/perfect.mp3"
        preload="auto"
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Minimal Fixed Soundtrack Control (Bottom-Left) */}
      <div className="fixed bottom-5 left-5 z-40 select-none">
        <button
          type="button"
          onClick={toggleSound}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold active:scale-95"
          style={{
            background: 'rgba(14, 13, 11, 0.85)',
            border: isPlaying && !isMuted
              ? '1px solid rgba(184, 150, 90, 0.35)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          }}
          title={isPlaying && !isMuted ? 'Mute background soundtrack' : 'Play background soundtrack'}
          aria-label={isPlaying && !isMuted ? 'Soundtrack is playing. Click to mute.' : 'Soundtrack is muted. Click to play.'}
        >
          {/* Note icon with subtle gold glow when playing */}
          <span
            className="text-xs transition-colors"
            style={{
              color: isPlaying && !isMuted ? 'var(--gold)' : 'var(--text-dim)',
            }}
          >
            ♪
          </span>

          {/* Text status */}
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase transition-colors"
            style={{
              color: isPlaying && !isMuted ? 'var(--cream)' : 'var(--text-dim)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {isPlaying && !isMuted ? 'MUSIC' : 'MUTED'}
          </span>
        </button>
      </div>
    </>
  )
}
