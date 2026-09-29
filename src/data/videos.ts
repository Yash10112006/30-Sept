// ============================================================
// VIDEOS DATA FILE — SINGLE SOURCE OF TRUTH
// Real video memories uploaded in: public/media/videos/
// Dimensions and duration automatically inspected from source files.
// No invented captions, events, dates, or romantic context.
// ============================================================

export interface VideoItem {
  id: string;
  number: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  durationSeconds: number;
  label: string;
}

export const videoMemories: VideoItem[] = [
  {
    id: 'video-01',
    number: '01',
    src: '/media/videos/video-01.mp4',
    width: 478,
    height: 850,
    aspectRatio: 478 / 850, // ~9:16 portrait
    durationSeconds: 8,
    label: 'Moving Memory 01',
  },
  {
    id: 'video-02',
    number: '02',
    src: '/media/videos/video-02.mp4',
    width: 540,
    height: 960,
    aspectRatio: 540 / 960, // 9:16 portrait
    durationSeconds: 7,
    label: 'Moving Memory 02',
  },
  {
    id: 'video-03',
    number: '03',
    src: '/media/videos/video-03.mp4',
    width: 480,
    height: 848,
    aspectRatio: 480 / 848, // ~9:16 portrait
    durationSeconds: 4,
    label: 'Moving Memory 03',
  },
  {
    id: 'video-04',
    number: '04',
    src: '/media/videos/video-04.mp4',
    width: 360,
    height: 636,
    aspectRatio: 360 / 636, // ~9:16 portrait
    durationSeconds: 3,
    label: 'Moving Memory 04',
  },
];
