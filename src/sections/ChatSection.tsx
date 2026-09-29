import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scene02Messages, type Scene02Message } from '../data/chats'

// Timing settings for realistic chat playback
const MSG_DELAY = 580
const TYPING_DELAY = 650

// Blue double tick for WhatsApp outgoing read messages
function BlueTicks() {
  return (
    <span className="inline-flex items-center ml-1 text-[11px] leading-none" style={{ color: '#53bdeb' }} aria-label="Read">
      ✓✓
    </span>
  )
}

// WhatsApp attachment 1 (Screenshot 1): Blurred document preview with 98 kB download button
function SheetDownloadAttachment({
  time,
  onOpenModal,
}: {
  time: string
  onOpenModal: () => void
}) {
  return (
    <div
      onClick={onOpenModal}
      className="relative rounded-lg overflow-hidden cursor-pointer group select-none transition-transform active:scale-[0.99]"
      style={{
        width: '100%',
        maxWidth: '260px',
        height: '240px',
        background: '#16231c',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpenModal() }}
      aria-label="Document attachment: College roll list sheet, 98 kB. Click to open modal."
    >
      {/* Blurred simulated spreadsheet background with yellow-green columns */}
      <div className="absolute inset-0 filter blur-[3px] scale-105 p-3 flex flex-col gap-1.5 opacity-80 pointer-events-none">
        <div className="h-4 bg-emerald-500/30 rounded w-full mb-1" />
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="h-3 w-7 bg-yellow-400/40 rounded-sm" />
            <div className="h-3 flex-1 bg-white/20 rounded-sm" />
            <div className="h-3 w-16 bg-white/10 rounded-sm" />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

      {/* Center Download Pill */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-white text-xs font-medium shadow-lg backdrop-blur-md transition-transform group-hover:scale-105"
          style={{ background: 'rgba(32, 44, 51, 0.85)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {/* Download icon */}
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>98 kB</span>
        </div>
      </div>

      {/* Timestamp overlay at bottom right */}
      <div className="absolute bottom-1.5 right-2 text-[11px] font-sans text-white/80 drop-shadow">
        {time}
      </div>
    </div>
  )
}

// WhatsApp attachment 2 (Screenshot 2): OneDrive link and Excel sheet preview table with redacted PRNs
function SpreadsheetPreviewAttachment({
  time,
  linkUrl,
  onOpenModal,
}: {
  time: string
  linkUrl: string
  onOpenModal: () => void
}) {
  // Real row data from Screenshot 2 (PRNs strictly redacted)
  const rows = [
    { row: 34, roll: 34, name: 'JODPE VYANKATESH SUNIL', prn: '' },
    { row: 35, roll: 35, name: 'GADADE ROHIT DARYAPPA', prn: '' },
    { row: 36, roll: 36, name: 'SHIVALE PIYUSH ANKUSH', prn: '' },
    { row: 37, roll: 37, name: 'MANDLIK ADITYA SADASHIV', prn: '' },
    { row: 38, roll: 38, name: 'KADAM SAMARTH SUBHASH', prn: '' },
    { row: 39, roll: 39, name: 'DEVANSH AGRAWAL', prn: '' },
    { row: 40, roll: 40, name: 'DHOLE SNEHA MANOJ', prn: '' },
    { row: 41, roll: 41, name: 'PATIL SAMRUDDHI SHARAD', prn: '' },
    { row: 42, roll: 42, name: 'ANDHALE AMRUT BABAN', prn: '' },
    { row: 43, roll: 43, name: 'SATPUTE PARAS DEELIP', prn: '' },
    { row: 44, roll: 44, name: 'PAWAR PRANALI SUNIL', prn: '' },
    { row: 45, roll: 45, name: 'PATIL RASIKA MILIND', prn: '' },
    { row: 46, roll: 46, name: 'KALE SHUBHANGI SANJAY', prn: '2024████████' },
    { row: 47, roll: 47, name: 'ATIRKAR SAMIKSHA SAMBHAJI', prn: '2024████████', highlight: true },
    { row: 48, roll: 48, name: 'LONKAR SHIVAM HANUMANT', prn: '' },
    { row: 49, roll: 49, name: 'DESHMUKH SHRAVANI PRAKASH', prn: '' },
    { row: 50, roll: 50, name: 'RASVE TEJASVINI VIKRAM', prn: '' },
    { row: 51, roll: 51, name: 'ATOLE YASH SURESH', prn: '' },
    { row: 52, roll: 52, name: 'SHIRODE VEDANSHU PRAMOD', prn: '' },
    { row: 53, roll: 53, name: 'JAMBHALEKAR KRUSHNA VISHAL', prn: '' },
    { row: 54, roll: 54, name: 'DEVAR OM RAJESH', prn: '' },
    { row: 55, roll: 55, name: 'KONGARE SANKET KANHAIYA', prn: '' },
    { row: 56, roll: 56, name: 'KOTWAL CHANCHAL MARTAND', prn: '' },
    { row: 57, roll: 57, name: 'PATIL DISHA SHRIKRISHNA', prn: '' },
    { row: 58, roll: 58, name: 'DEORE ADITYA VISHAL', prn: '' },
    { row: 59, roll: 59, name: 'AVADHUT DHANANJAY DHOTRE', prn: '' },
    { row: 60, roll: 60, name: 'LOHKARE PRACHI GANESH', prn: '2024████████' },
  ]

  return (
    <div className="flex flex-col gap-1 w-full max-w-[280px] sm:max-w-[310px]">
      {/* OneDrive Link Text */}
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] text-[#53bdeb] hover:underline break-all block leading-tight px-1 pt-1"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {linkUrl}
      </a>

      {/* Spreadsheet preview card */}
      <div
        onClick={onOpenModal}
        className="relative rounded-lg overflow-hidden border border-[#2a3942] bg-[#111b21] cursor-pointer group mt-1"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpenModal() }}
        aria-label="Spreadsheet preview. Click to inspect."
      >
        {/* Top header row: A, B, C */}
        <div className="grid grid-cols-12 bg-[#202c33] text-[9px] text-[#8696a0] font-mono border-b border-[#2a3942] text-center select-none">
          <div className="col-span-1 border-r border-[#2a3942] py-0.5"> </div>
          <div className="col-span-2 border-r border-[#2a3942] py-0.5">B</div>
          <div className="col-span-5 border-r border-[#2a3942] py-0.5">C</div>
          <div className="col-span-4 py-0.5">D</div>
        </div>

        {/* Scrollable table rows container matching screenshot proportions */}
        <div className="max-h-[220px] overflow-y-auto overflow-x-hidden text-[9px] font-mono select-none bg-white">
          {rows.map((r) => (
            <div
              key={r.row}
              className={`grid grid-cols-12 border-b border-gray-200 leading-tight ${
                r.highlight ? 'bg-amber-100 font-semibold' : ''
              }`}
            >
              {/* Row index */}
              <div className="col-span-1 bg-[#f0f2f5] text-[#667781] text-center border-r border-gray-300 py-0.5 text-[8px]">
                {r.row}
              </div>
              {/* Roll number column with yellow-green background */}
              <div className="col-span-2 bg-[#d9ead3] text-[#274e13] font-bold text-center border-r border-gray-300 py-0.5">
                {r.roll}
              </div>
              {/* Student Name */}
              <div className="col-span-5 bg-[#e2f0d9] text-[#1c1e21] px-1 border-r border-gray-300 py-0.5 truncate text-[8.5px]">
                {r.name}
              </div>
              {/* PRN (Redacted) */}
              <div className="col-span-4 px-1 py-0.5 text-[8px] text-[#1c1e21] font-mono truncate">
                {r.prn ? (
                  <span className="text-[#005c4b] font-medium tracking-tight">
                    {r.prn}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar inside preview card: Forward shortcut button and privacy notice */}
        <div className="p-1.5 bg-[#182229] border-t border-[#2a3942] flex items-center justify-between text-[10px] text-[#8696a0]">
          {/* Forward icon */}
          <div
            className="w-5 h-5 rounded-full bg-[#202c33] flex items-center justify-center text-white/80 group-hover:text-white transition-colors"
            title="Share"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <span className="text-[9px] text-white/50 font-sans">PRN Redacted for privacy</span>
        </div>
      </div>

      {/* Timestamp and ticks at bottom right */}
      <div className="flex items-center justify-end gap-1 text-[11px] text-[#8696a0] px-1 font-sans">
        <span>{time}</span>
        <BlueTicks />
      </div>
    </div>
  )
}

// Single WhatsApp Message Component
function WhatsAppMessageRow({
  msg,
  visible,
  onOpenModal,
}: {
  msg: Scene02Message
  visible: boolean
  onOpenModal: () => void
}) {
  const isMe = msg.sender === 'me'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' as const }}
        >
          <div
            className={`relative max-w-[85%] sm:max-w-[78%] px-2.5 py-1.5 shadow-sm text-[13.5px] leading-relaxed break-words ${
              isMe
                ? 'bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs'
                : 'bg-[#202c33] text-[#e9edef] rounded-2xl rounded-tl-xs'
            }`}
            style={{
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 1px 0.5px rgba(0, 0, 0, 0.15)',
            }}
          >
            {/* Quoted Message Preview if present */}
            {msg.quotedMessage && (
              <div
                className={`mb-1.5 rounded-md overflow-hidden text-xs select-none border-l-[3.5px] px-2 py-1 ${
                  isMe ? 'bg-[#025144]/80 text-[#e9edef]' : 'bg-[#111b21]/90 text-[#8696a0]'
                }`}
                style={{
                  borderLeftColor: msg.quotedMessage.color || (isMe ? '#00a884' : '#b388ff'),
                }}
              >
                <p
                  className="font-medium text-[11px] leading-tight"
                  style={{ color: msg.quotedMessage.color || (isMe ? '#00a884' : '#b388ff') }}
                >
                  {msg.quotedMessage.sender}
                </p>
                <p className="text-[11.5px] truncate text-white/80 leading-normal mt-0.5">
                  {msg.quotedMessage.text}
                </p>
              </div>
            )}

            {/* Type 1: Image attachment (Screenshot 1 blurred sheet) */}
            {msg.type === 'image-attachment' && (
              <SheetDownloadAttachment time={msg.time} onOpenModal={onOpenModal} />
            )}

            {/* Type 2: Link attachment (Screenshot 2 OneDrive spreadsheet preview) */}
            {msg.type === 'link-attachment' && (
              <SpreadsheetPreviewAttachment
                time={msg.time}
                linkUrl={msg.text || ''}
                onOpenModal={onOpenModal}
              />
            )}

            {/* Type 3: Regular Text Message */}
            {msg.type === 'text' && (
              <div className="flex flex-wrap items-end justify-between gap-x-2.5 gap-y-0.5">
                <span
                  className={`whitespace-pre-line ${
                    msg.isHighlight
                      ? 'text-[#25d366] font-mono tracking-wide underline select-none'
                      : 'text-[#e9edef]'
                  }`}
                >
                  {msg.text}
                </span>

                {/* Timestamp & read status indicators */}
                <span
                  className="ml-auto flex items-center text-[10.5px] select-none shrink-0"
                  style={{ color: '#8696a0' }}
                >
                  {msg.isEdited && <span className="mr-1 text-[10px]">Edited</span>}
                  <span>{msg.time}</span>
                  {isMe && <BlueTicks />}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Typing bubble for Samikshaa
function TypingIndicator({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="flex justify-start w-full"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
        >
          <div className="bg-[#202c33] rounded-2xl rounded-tl-xs px-3 py-2 flex items-center gap-1 shadow-sm">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#8696a0]"
                animate={{ y: [0, -3.5, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.65, delay: i * 0.16, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ChatSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  // Intersection observer to trigger playback once user scrolls to Scene 02
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-reveal sequence of real messages
  useEffect(() => {
    if (!hasEntered || !isPlaying) return
    if (visibleCount >= scene02Messages.length) return

    let timer: ReturnType<typeof setTimeout>
    const nextMsg = scene02Messages[visibleCount]

    if (nextMsg.sender === 'samiksha') {
      setShowTyping(true)
      timer = setTimeout(() => {
        setShowTyping(false)
        setVisibleCount((prev) => prev + 1)
      }, TYPING_DELAY)
    } else {
      timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1)
      }, MSG_DELAY)
    }

    return () => clearTimeout(timer)
  }, [hasEntered, visibleCount, isPlaying])

  // Keep chat scrolled to bottom as messages appear
  useEffect(() => {
    const el = chatScrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [visibleCount, showTyping])

  const showAll = () => {
    setIsPlaying(false)
    setShowTyping(false)
    setVisibleCount(scene02Messages.length)
  }

  const restart = () => {
    setVisibleCount(0)
    setShowTyping(false)
    setIsPlaying(true)
  }

  const allRevealed = visibleCount >= scene02Messages.length

  return (
    <section
      id="chat"
      className="section-base relative w-full flex flex-col items-center justify-center py-20 px-3 sm:px-6"
      style={{ background: '#090909' }}
      ref={containerRef}
      aria-label="Scene 02 — The First Conversation"
    >
      {/* Centered Main Wrapper — desktop max-w-[620px], margin-inline: auto */}
      <div className="w-full max-w-[600px] mx-auto flex flex-col items-center justify-center">

        {/* Scene header tag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="tracking-[0.4em] text-xs text-center mb-8 uppercase"
          style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)' }}
        >
          SCENE 02 — THE FIRST CONVERSATION
        </motion.p>

        {/* WhatsApp Phone Mockup Container — Exactly centered */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-[#222d34]"
          style={{
            background: '#0b141a',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* 1. Authentic WhatsApp Dark Header (matching screenshots) */}
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 select-none shrink-0"
            style={{
              background: '#1f2c34',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Back arrow */}
            <button
              type="button"
              className="text-[#aebac1] hover:text-white p-1 rounded-full focus-visible:outline-none transition-colors"
              aria-label="Back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Profile Avatar Circle ("SM") */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm shrink-0"
              style={{
                background: '#1d3b58',
                color: '#7ea4cc',
                border: '1px solid rgba(126, 164, 204, 0.25)',
              }}
            >
              SM
            </div>

            {/* Contact Name & Subtitle */}
            <div className="flex-1 min-w-0">
              <h2
                className="text-[15px] font-medium leading-tight truncate text-[#e9edef]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Samikshaa MIT
              </h2>
              <p
                className="text-[11px] truncate text-[#8696a0]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {showTyping ? (
                  <span className="text-[#25d366]">typing...</span>
                ) : (
                  'MIT College of Engineering'
                )}
              </p>
            </div>

            {/* Header Action Icons: Video, Phone, Menu */}
            <div className="flex items-center gap-3.5 text-[#aebac1]">
              {/* Video call icon */}
              <button type="button" className="hover:text-white transition-colors" aria-label="Video call">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z" />
                </svg>
              </button>

              {/* Phone call icon */}
              <button type="button" className="hover:text-white transition-colors" aria-label="Audio call">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-.99-1.11z" />
                </svg>
              </button>

              {/* Three dots icon */}
              <button type="button" className="hover:text-white transition-colors" aria-label="More options">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="1.75" />
                  <circle cx="12" cy="12" r="1.75" />
                  <circle cx="12" cy="18" r="1.75" />
                </svg>
              </button>
            </div>
          </div>

          {/* 2. Messages Scroll Area */}
          <div
            ref={chatScrollRef}
            className="flex flex-col gap-2.5 px-3 py-4 overflow-y-auto"
            style={{
              background: '#0b141a',
              height: '520px',
              maxHeight: '62vh',
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            role="log"
            aria-label="Chronological WhatsApp conversation transcript from 30 September 2024"
            aria-live="polite"
          >
            {/* Authentic Date Pill: 30 September 2024 */}
            <div className="flex justify-center my-1 select-none">
              <span
                className="text-[11.5px] px-3 py-1 rounded-lg font-medium shadow-sm"
                style={{
                  background: '#182229',
                  color: '#8696a0',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: '0 1px 0.5px rgba(0,0,0,0.2)',
                }}
              >
                30 September 2024
              </span>
            </div>

            {/* List of Messages */}
            {scene02Messages.map((msg, i) => (
              <WhatsAppMessageRow
                key={msg.id}
                msg={msg}
                visible={i < visibleCount}
                onOpenModal={() => setModalOpen(true)}
              />
            ))}

            {/* Real-time typing indicator */}
            <TypingIndicator show={showTyping} />
          </div>

          {/* 3. WhatsApp Bottom Input Bar (from Screenshots 1 & 2) */}
          <div
            className="flex items-center gap-2 px-2.5 py-2 select-none shrink-0"
            style={{ background: '#0b141a' }}
          >
            {/* Pill input container */}
            <div
              className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-full text-[#8696a0]"
              style={{ background: '#1f2c34' }}
            >
              {/* Smiley icon */}
              <svg className="w-5 h-5 text-[#8696a0] hover:text-[#e9edef] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                <path strokeLinecap="round" strokeWidth="1.8" d="M8 14s1.5 2 4 2 4-2 4-2" />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
                <circle cx="15" cy="9" r="1" fill="currentColor" />
              </svg>

              <span className="flex-1 text-[14px] text-[#8696a0]" style={{ fontFamily: 'var(--font-sans)' }}>
                Message
              </span>

              {/* Attachment paperclip */}
              <svg className="w-4.5 h-4.5 text-[#8696a0] hover:text-[#e9edef] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>

              {/* Rupee icon */}
              <span className="text-[14px] font-bold text-[#8696a0] hover:text-[#e9edef] cursor-pointer">
                ₹
              </span>

              {/* Camera icon */}
              <svg className="w-4.5 h-4.5 text-[#8696a0] hover:text-[#e9edef] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>

            {/* Green Circular Mic Button */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer shadow-md transition-transform active:scale-95"
              style={{ background: '#00a884' }}
              aria-label="Voice message"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
          </div>

          {/* 4. Playback Controls Bar */}
          <div
            className="px-4 py-2 flex items-center justify-between text-[11px] border-t border-[#222d34]"
            style={{ background: '#111b21', color: '#8696a0', fontFamily: 'var(--font-sans)' }}
          >
            <span className="text-[11px]">
              {visibleCount} of {scene02Messages.length} messages
            </span>

            <div className="flex items-center gap-3">
              {!allRevealed && (
                <button
                  type="button"
                  onClick={showAll}
                  className="hover:text-[#e9edef] transition-colors focus-visible:outline-none"
                >
                  Show all
                </button>
              )}

              {allRevealed && (
                <button
                  type="button"
                  onClick={restart}
                  className="hover:text-gold transition-colors focus-visible:outline-none flex items-center gap-1.5"
                >
                  <span>Replay</span>
                  <span aria-hidden="true">↻</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Narrative Reflection — Strictly follows the real beginning */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' as const }}
              className="w-full max-w-lg mx-auto text-center mt-12 flex flex-col items-center gap-4"
            >
              <div className="gold-line mx-auto" aria-hidden="true" />

              <p
                className="font-serif"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.15rem, 3.2vw, 1.45rem)',
                  color: 'var(--cream)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                "That's how it started."
              </p>

              <div className="space-y-1">
                <p
                  className="font-serif text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                  }}
                >
                  No dramatic beginning.
                </p>
                <p
                  className="font-serif text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                  }}
                >
                  No perfectly written first conversation.
                </p>
                <p
                  className="font-serif text-base md:text-lg"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--gold)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  Just a "Heyy".
                </p>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.9 }}
                className="font-serif text-sm md:text-base max-w-sm mx-auto mt-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--cream-muted)',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                }}
              >
                "Somehow, that little conversation became a friendship I would come to value deeply."
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Redacted College Portal Roll List Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="College Portal Roll List Attachment (Redacted for privacy)"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111b21] border border-[#2a3942] rounded-2xl max-w-lg w-full p-5 text-left shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-[#8696a0] hover:text-white p-1 focus-visible:outline-none transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#00a884] text-lg" aria-hidden="true">🔒</span>
                <h3 className="text-base font-medium text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  College Portal Roll List Attachment
                </h3>
              </div>

              <p className="text-xs text-[#8696a0] mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                30 September 2024 at 4:51 PM. Private PRNs and identification numbers are strictly redacted.
              </p>

              {/* Modal Spreadsheet View */}
              <div className="bg-white rounded-lg overflow-hidden border border-[#2a3942] select-none text-[11px] font-mono">
                <div className="grid grid-cols-12 bg-[#202c33] text-white/70 text-[10px] text-center border-b border-[#2a3942] py-1 font-semibold">
                  <div className="col-span-2 border-r border-[#2a3942]">ROLL</div>
                  <div className="col-span-6 border-r border-[#2a3942]">STUDENT NAME</div>
                  <div className="col-span-4">PRN NUMBER</div>
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                  <div className="grid grid-cols-12 border-b border-gray-200 py-1.5 px-1 items-center bg-[#f9fafb]">
                    <div className="col-span-2 text-center font-bold text-gray-700">46</div>
                    <div className="col-span-6 text-gray-800 truncate px-1">KALE SHUBHANGI SANJAY</div>
                    <div className="col-span-4 text-center font-mono text-[#005c4b] font-semibold">2024████████</div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-amber-300 py-1.5 px-1 items-center bg-amber-50">
                    <div className="col-span-2 text-center font-bold text-amber-900">47</div>
                    <div className="col-span-6 text-amber-950 font-bold truncate px-1">ATIRKAR SAMIKSHA SAMBHAJI</div>
                    <div className="col-span-4 text-center font-mono text-[#005c4b] font-semibold">2024████████</div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-200 py-1.5 px-1 items-center bg-[#f9fafb]">
                    <div className="col-span-2 text-center font-bold text-gray-700">48</div>
                    <div className="col-span-6 text-gray-800 truncate px-1">LONKAR SHIVAM HANUMANT</div>
                    <div className="col-span-4 text-center text-gray-400 italic text-[10px]">—</div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-200 py-1.5 px-1 items-center bg-[#f9fafb]">
                    <div className="col-span-2 text-center font-bold text-gray-700">49</div>
                    <div className="col-span-6 text-gray-800 truncate px-1">DESHMUKH SHRAVANI PRAKASH</div>
                    <div className="col-span-4 text-center text-gray-400 italic text-[10px]">—</div>
                  </div>

                  <div className="grid grid-cols-12 py-1.5 px-1 items-center bg-[#f9fafb]">
                    <div className="col-span-2 text-center font-bold text-gray-700">60</div>
                    <div className="col-span-6 text-gray-800 truncate px-1">LOHKARE PRACHI GANESH</div>
                    <div className="col-span-4 text-center font-mono text-[#005c4b] font-semibold">2024████████</div>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[#25d366]/80 mt-3 font-sans italic text-center">
                "Why is my prn no. Visible on other roll numbers 😭😭"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
