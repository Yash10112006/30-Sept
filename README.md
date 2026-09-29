# 30.09.2024 — Samiksha's Memory Website

## Project Overview

A cinematic, personal memory website dedicated to the friendship with Samiksha.
Built with **React + Vite + TypeScript + Tailwind CSS + Framer Motion**.

---

## How to Run

```bash
npm install     # Install dependencies (already done)
npm run dev     # Start dev server at http://localhost:5173
npm run build   # Build for production
```

---

## How to Add Your Content

All personal content lives in data files. You never need to touch component code.

### Photos → `src/data/memories.ts`

Place photos in `public/media/photos/` named: `photo-01.jpg`, `photo-02.jpg`, etc.

```ts
{
  id: 'mem-01',
  title: 'That Day',
  date: '30 September 2024',
  caption: 'The day it all started.',
  image: '/media/photos/photo-01.jpg',
  rotation: -2,      // Polaroid tilt (-5 to 5)
  size: 'lg',        // 'sm' | 'md' | 'lg'
}
```

### Chat Screenshots → `src/data/chats.ts`

Place screenshots in `public/media/screenshots/` named: `chat-01.png`, etc.

```ts
{
  id: 'chat-01',
  src: '/media/screenshots/chat-01.png',
  alt: 'A WhatsApp conversation',
  category: ['ALL', 'FUNNY'],   // Pick from: ALL CHATS FUNNY COLLEGE RANDOM SPECIAL
  caption: 'The one where...',
  date: 'Oct 2024',
}
```

### Videos → `src/data/videos.ts`

Place videos in `public/media/videos/` named: `video-01.mp4`, etc.

```ts
{
  id: 'vid-01',
  title: 'A Moment',
  caption: 'Short description',
  src: '/media/videos/video-01.mp4',
  poster: '/media/photos/photo-01.jpg',
  autoplay: true,
  duration: '0:32',
}
```

### Music → `src/data/songs.ts`

Place audio in `public/media/music/` named: `song-01.mp3`, etc.

```ts
{
  id: 'song-01',
  title: 'Song Name',
  artist: 'Artist Name',
  src: '/media/music/song-01.mp3',
  description: 'This reminds me of that phase.',
}
```

### Little Things → `src/data/littleThings.ts`

```ts
{
  id: 'lt-01',
  text: 'Your PRN?',
  context: 'Where it all started.',
  linkedScreenshot: '/media/screenshots/chat-01.png',
  emoji: '📋',
}
```

---

## File Structure

```
d:/30_Sept/
├── public/media/
│   ├── photos/         <- Add photos here
│   ├── videos/         <- Add videos here
│   ├── screenshots/    <- Add WhatsApp screenshots here
│   └── music/          <- Add audio files here
└── src/
    ├── data/           <- EDIT THESE to update all content
    │   ├── memories.ts
    │   ├── videos.ts
    │   ├── chats.ts
    │   ├── songs.ts
    │   └── littleThings.ts
    └── sections/       <- 12 cinematic scenes
```

## Privacy Notes

- `noindex, nofollow` meta tags — search engines will not index the site.
- PRN numbers are redacted in the chat recreation.
- Designed for private/direct sharing only.
