import Navigation from './components/Navigation'
import GlobalAudio from './components/GlobalAudio'
import HeroSection from './sections/HeroSection'
import ChatSection from './sections/ChatSection'
import TimelineSection from './sections/TimelineSection'
import PhotoSection from './sections/PhotoSection'
import VideoSection from './sections/VideoSection'
import SoundtrackSection from './sections/SoundtrackSection'
import TenKSection from './sections/TenKSection'
import FriendshipSection from './sections/FriendshipSection'
import MemoryFilmSection from './sections/MemoryFilmSection'
import LetterSection from './sections/LetterSection'

export default function App() {
  return (
    <>
      {/* Persistent film-grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Persistent global background audio controller */}
      <GlobalAudio />

      {/* Navigation + scroll progress */}
      <Navigation />

      {/* Main story flow */}
      <main id="main-content">
        {/* SCENE 01 — THE BEGINNING */}
        <HeroSection />

        {/* SCENE 02 — THE FIRST MESSAGE */}
        <ChatSection />

        {/* SCENE 03 — ORDINARY DAYS */}
        <TimelineSection />

        {/* SCENE 05 — PHOTOGRAPHS */}
        <PhotoSection />

        {/* SCENE 06 — MOVING MEMORIES */}
        <VideoSection />

        {/* SCENE 07 — SOUNDTRACK */}
        <SoundtrackSection />

        {/* SCENE 08 — 10,000% */}
        <TenKSection />

        {/* SCENE 09 — FRIENDSHIP */}
        <FriendshipSection />

        {/* SCENE 11 — MEMORY FILM */}
        <MemoryFilmSection />

        {/* SCENE 12 — FINAL LETTER */}
        <LetterSection />
      </main>

      {/* Skip to main for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
    </>
  )
}
