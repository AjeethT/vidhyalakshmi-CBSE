// Gallery data structure - generated at build time
// This replaces the API route for static export
import { getR2ImageUrl, getR2UrlWithDevProxy } from './cloudflare';

export interface GalleryImage {
  id: string;
  name: string;
  url: string;
}

export interface GalleryEvent {
  [eventName: string]: GalleryImage[];
}

export interface GalleryYear {
  year: number;
  events: GalleryEvent;
}

/**
 * Gallery structure - mock data for now
 * Replace with real R2 API calls when Cloudflare integration is complete
 */
export const GALLERY_DATA: GalleryYear[] = [
  {
    year: 2026,
    events: {
      'Annual Day': [
        { id: '1', name: 'event1.jpg', url: getR2UrlWithDevProxy('gallery/2026/Annual Day/event1.jpg') },
      ],
    },
  },
  {
    year: 2025,
    events: {},
  },
];

/**
 * Get gallery data for a specific year or all years
 */
export function getGalleryByYear(year?: number | null): GalleryYear[] {
  if (!year) return GALLERY_DATA;
  return GALLERY_DATA.filter(g => g.year === year);
}

/**
 * Get all unique years in gallery
 */
export function getGalleryYears(): number[] {
  return GALLERY_DATA.map(g => g.year).sort((a, b) => b - a);
}
