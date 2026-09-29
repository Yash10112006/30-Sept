import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number with commas: 10000 → "10,000"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/**
 * Returns image src or a placeholder SVG data URI if no real image exists.
 */
export function imgOrPlaceholder(src: string, label = 'Photo'): string {
  // In development, if the file doesn't exist the browser will show broken image.
  // We return the src as-is; the PlaceholderImage component handles the fallback.
  return src || `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect fill="#1a1917" width="400" height="400"/>
      <text x="50%" y="50%" fill="#5a5347" font-family="Georgia" font-size="14" text-anchor="middle" dy=".3em">${label}</text>
    </svg>`
  )}`
}
