// ============================================================
// MEMORIES DATA FILE
// Automatically generated with visual metrics:
// - Balanced orientation (portrait, landscape, wide-portrait, tall)
// - Balanced lighting contrast and tone
// - Editorial layout sizing and organic subtle rotations
// ============================================================

export interface Memory {
  id: string;
  type: 'photo';
  src: string;
  image: string; // backward-compatibility alias
  title: string;
  caption: string;
  orientation: 'portrait' | 'landscape';
  aspect: number;
  width: number;
  height: number;
  size: 'sm' | 'md' | 'lg' | 'wide';
  rotation: number;
  brightness: number;
}

// Dedicated black-and-white transition photo between Scene 02 and Scene 03
// Not used as a random photo in the general Memories section
export const transitionBridgePhoto: Memory = {
  id: "transition-bridge-photo",
  type: "photo",
  src: "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.51 AM (1).jpeg",
  image: "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.51 AM (1).jpeg",
  title: "The beginning of a friendship",
  caption: "",
  orientation: "portrait",
  aspect: 0.75,
  width: 960,
  height: 1280,
  size: "lg",
  rotation: 0,
  brightness: 75,
};

// General memory archive photos (30 moments)
export const memories: Memory[] = [
  {
    "id": "memory-01",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.46 AM.jpeg",
    "title": "A little memory",
    "caption": "A little memory.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 900,
    "height": 1600,
    "size": "lg",
    "rotation": -1.5,
    "brightness": 201,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.46 AM.jpeg"
  },
  {
    "id": "memory-02",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.51 AM (1).jpeg",
    "title": "A quiet moment",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.75,
    "width": 960,
    "height": 1280,
    "size": "lg",
    "rotation": 0,
    "brightness": 75,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.51 AM (1).jpeg"
  },
  {
    "id": "memory-03",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.00 AM (1).jpeg",
    "title": "One of those moments",
    "caption": "One of those moments.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "sm",
    "rotation": -0.8,
    "brightness": 124,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.00 AM (1).jpeg"
  },
  {
    "id": "memory-04",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.46 AM (2).jpeg",
    "title": "Wider perspective",
    "caption": "",
    "orientation": "landscape",
    "aspect": 1.78,
    "width": 1280,
    "height": 720,
    "size": "wide",
    "rotation": 0,
    "brightness": 110,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.46 AM (2).jpeg"
  },
  {
    "id": "memory-05",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.59 AM (1).jpeg",
    "title": "Another page",
    "caption": "Another page of the story.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": 1.8,
    "brightness": 163,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.59 AM (1).jpeg"
  },
  {
    "id": "memory-06",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.56 AM (1).jpeg",
    "title": "Passing by",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 899,
    "height": 1599,
    "size": "lg",
    "rotation": -1.2,
    "brightness": 123,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.56 AM (1).jpeg"
  },
  {
    "id": "memory-07",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.47 AM (2).jpeg",
    "title": "Quiet scene",
    "caption": "Quietly kept.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "sm",
    "rotation": 0.9,
    "brightness": 147,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.47 AM (2).jpeg"
  },
  {
    "id": "memory-08",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.50 AM (1).jpeg",
    "title": "In between",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.45,
    "width": 720,
    "height": 1600,
    "size": "md",
    "rotation": -2,
    "brightness": 144,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.50 AM (1).jpeg"
  },
  {
    "id": "memory-09",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.48 AM (1).jpeg",
    "title": "Ordinary day",
    "caption": "A random Tuesday.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": 1.4,
    "brightness": 121,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.48 AM (1).jpeg"
  },
  {
    "id": "memory-10",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.49 AM.jpeg",
    "title": "Unspoken",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": -0.5,
    "brightness": 146,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.49 AM.jpeg"
  },
  {
    "id": "memory-11",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.54 AM.jpeg",
    "title": "Campus lights",
    "caption": "Unrehearsed.",
    "orientation": "landscape",
    "aspect": 1.33,
    "width": 1280,
    "height": 960,
    "size": "wide",
    "rotation": 0,
    "brightness": 122,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.54 AM.jpeg"
  },
  {
    "id": "memory-12",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.58 AM.jpeg",
    "title": "Unrehearsed",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": 1.6,
    "brightness": 120,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.58 AM.jpeg"
  },
  {
    "id": "memory-13",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.55 AM.jpeg",
    "title": "Simple afternoon",
    "caption": "Between classes.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": -1,
    "brightness": 146,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.55 AM.jpeg"
  },
  {
    "id": "memory-14",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.50 AM.jpeg",
    "title": "Between moments",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": 2.1,
    "brightness": 119,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.50 AM.jpeg"
  },
  {
    "id": "memory-15",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.53 AM.jpeg",
    "title": "A quiet pause",
    "caption": "A familiar afternoon.",
    "orientation": "portrait",
    "aspect": 0.75,
    "width": 960,
    "height": 1280,
    "size": "sm",
    "rotation": -1.7,
    "brightness": 102,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.53 AM.jpeg"
  },
  {
    "id": "memory-16",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.47 AM.jpeg",
    "title": "Unplanned memory",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "lg",
    "rotation": 0.8,
    "brightness": 141,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.47 AM.jpeg"
  },
  {
    "id": "memory-17",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.46 AM (1).jpeg",
    "title": "A shared frame",
    "caption": "Without planning to remember.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": -1.3,
    "brightness": 115,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.46 AM (1).jpeg"
  },
  {
    "id": "memory-18",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.57 AM (1).jpeg",
    "title": "Farther view",
    "caption": "",
    "orientation": "landscape",
    "aspect": 1.78,
    "width": 1280,
    "height": 720,
    "size": "wide",
    "rotation": 0,
    "brightness": 125,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.57 AM (1).jpeg"
  },
  {
    "id": "memory-19",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.48 AM.jpeg",
    "title": "Still here",
    "caption": "Just as it was.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "sm",
    "rotation": 1.5,
    "brightness": 128,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.48 AM.jpeg"
  },
  {
    "id": "memory-20",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.01 AM (1).jpeg",
    "title": "Gentle light",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": -0.9,
    "brightness": 115,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.01 AM (1).jpeg"
  },
  {
    "id": "memory-21",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.47 AM (1).jpeg",
    "title": "Familiar hour",
    "caption": "Ordinary and real.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "lg",
    "rotation": 1.1,
    "brightness": 127,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.47 AM (1).jpeg"
  },
  {
    "id": "memory-22",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.57 AM.jpeg",
    "title": "Another angle",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.76,
    "width": 970,
    "height": 1280,
    "size": "md",
    "rotation": -1.8,
    "brightness": 123,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.57 AM.jpeg"
  },
  {
    "id": "memory-23",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.49 AM (1).jpeg",
    "title": "Moments like this",
    "caption": "Time taking its time.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "sm",
    "rotation": 0.7,
    "brightness": 114,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.49 AM (1).jpeg"
  },
  {
    "id": "memory-24",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.59 AM.jpeg",
    "title": "Along the way",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": -1.4,
    "brightness": 107,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.59 AM.jpeg"
  },
  {
    "id": "memory-25",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.01 AM.jpeg",
    "title": "Open frame",
    "caption": "Still clear.",
    "orientation": "landscape",
    "aspect": 1.78,
    "width": 1280,
    "height": 720,
    "size": "wide",
    "rotation": 0,
    "brightness": 132,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.01 AM.jpeg"
  },
  {
    "id": "memory-26",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.56 AM.jpeg",
    "title": "Slow minutes",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 1080,
    "height": 1920,
    "size": "lg",
    "rotation": 1.9,
    "brightness": 106,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.56 AM.jpeg"
  },
  {
    "id": "memory-27",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.59 AM (2).jpeg",
    "title": "Remembered",
    "caption": "A pause in the day.",
    "orientation": "portrait",
    "aspect": 0.52,
    "width": 826,
    "height": 1600,
    "size": "sm",
    "rotation": -1.1,
    "brightness": 108,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.59 AM (2).jpeg"
  },
  {
    "id": "memory-28",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.51 AM.jpeg",
    "title": "Just yesterday",
    "caption": "",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": 1.3,
    "brightness": 104,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.51 AM.jpeg"
  },
  {
    "id": "memory-29",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.00 AM.jpeg",
    "title": "Late light",
    "caption": "Looking back.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "md",
    "rotation": -0.6,
    "brightness": 104,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.00 AM.jpeg"
  },
  {
    "id": "memory-30",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.02 AM.jpeg",
    "title": "Wide horizon",
    "caption": "",
    "orientation": "landscape",
    "aspect": 1.78,
    "width": 1280,
    "height": 720,
    "size": "wide",
    "rotation": 0,
    "brightness": 113,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.54.02 AM.jpeg"
  },
  {
    "id": "memory-31",
    "type": "photo",
    "src": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.50 AM (2).jpeg",
    "title": "Part of the story",
    "caption": "One of thirty-one.",
    "orientation": "portrait",
    "aspect": 0.56,
    "width": 720,
    "height": 1280,
    "size": "lg",
    "rotation": 1,
    "brightness": 77,
    "image": "/media/photos/samiksha-memories/WhatsApp Image 2026-09-28 at 2.53.50 AM (2).jpeg"
  }
];

export const TOTAL_MEMORIES = memories.length;

// Curated diverse subset for the cinematic Memory Film
export const filmMemories = [
  memories[0],  // Portrait — warm luminous
  memories[2],  // Landscape — wide perspective
  memories[5],  // Moodier portrait
  memories[9],  // Landscape — campus architecture / scene
  memories[13], // 3:4 Wide portrait
  memories[16], // Wide landscape
  memories[20], // Balanced portrait
  memories[27], // Late light portrait
];
