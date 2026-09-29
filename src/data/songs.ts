// ============================================================
// SOUNDTRACK DATA FILE — SINGLE SOURCE OF TRUTH
// Official Spotify tracks for Scene 07 — Soundtrack
// No downloaded songs, no MP3 copies, no tracking parameters.
// ============================================================

export interface SoundtrackTrack {
  id: string;
  trackId: string;
  number: string;
  title: string;
  artist: string;
  embedUrl: string;
}

export const soundtrackTracks: SoundtrackTrack[] = [
  {
    id: 'track-01',
    trackId: '0tgVpDi06FyKpA1z0VMD4v',
    number: '01',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    embedUrl: 'https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v',
  },
  {
    id: 'track-02',
    trackId: '4HiQt4ehQpZEbNFuVzxfvi',
    number: '02',
    title: 'Kadhi Tu (From Mumbai Pune Mumbai)',
    artist: 'Hrishikesh Ranade',
    embedUrl: 'https://open.spotify.com/embed/track/4HiQt4ehQpZEbNFuVzxfvi',
  },
];
