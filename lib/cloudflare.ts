/**
 * Cloudflare R2 Integration Utilities
 * Handles image listing, caching, and CDN URLs
 */

export interface R2Object {
  name: string;
  size: number;
  etag: string;
  uploaded: string;
  storageClass: string;
  checksum_value?: string;
  checksum_algorithm?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: number;
  eventName: string;
  image: string;
  imageUrl: string;
  thumbnail: string;
  type: 'image' | 'video';
}

export interface GalleryCategory {
  year: number;
  events: {
    [eventName: string]: GalleryItem[];
  };
}

const R2_PUBLIC_URL = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://cdn.vidhyalakshmi.cus.firrham.com').replace(/\/$/, '');
const R2_ROOT_FOLDER = (process.env.NEXT_PUBLIC_R2_ROOT_FOLDER || 'CBSE').replace(/^\/|\/$/g, '');

function getR2ObjectPath(path: string): string {
  const normalizedPath = path.replace(/^\/+/, '');

  if (!R2_ROOT_FOLDER || normalizedPath === R2_ROOT_FOLDER || normalizedPath.startsWith(`${R2_ROOT_FOLDER}/`)) {
    return normalizedPath;
  }

  return `${R2_ROOT_FOLDER}/${normalizedPath}`;
}

export function getR2Url(path: string): string {
  const encodedPath = getR2ObjectPath(path)
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/');

  return `${R2_PUBLIC_URL}/${encodedPath}`;
}

/**
 * Get R2 URL with development proxy support
 * In development (NODE_ENV='development'), routes through /api/image to bypass ORB restrictions
 * In production, returns direct CDN URL
 * 
 * @param path - Path to image
 * @returns URL (direct CDN in production, proxied in development)
 */
export function getR2UrlWithDevProxy(path: string): string {
  const cdnUrl = getR2Url(path);
  
  // In development, use proxy to bypass CORS/ORB restrictions
  if (process.env.NODE_ENV === 'development') {
    return `/api/image?url=${encodeURIComponent(cdnUrl)}`;
  }
  
  // In production, use direct CDN URL
  return cdnUrl;
}

/**
 * List all objects in an R2 folder
 */
export async function listR2Objects(
  folderPath: string,
  token: string
): Promise<R2Object[]> {
  try {
    if (!token) {
      console.warn('Cloudflare API token not configured');
      return [];
    }

    // Note: R2 API would need to be called from a backend service
    // For now, return mock data
    return getMockGalleryData(folderPath);
  } catch (error) {
    console.error('Error listing R2 objects:', error);
    return [];
  }
}

/**
 * Get mock gallery data (replace with real API when backend is ready)
 */
function getMockGalleryData(folderPath: string): R2Object[] {
  const mockData: { [key: string]: R2Object[] } = {
    'site/': [
      {
        name: 'logo.png',
        size: 45000,
        etag: '"abc123"',
        uploaded: new Date().toISOString(),
        storageClass: 'STANDARD',
      },
      {
        name: 'hero-banner.jpg',
        size: 250000,
        etag: '"abc124"',
        uploaded: new Date().toISOString(),
        storageClass: 'STANDARD',
      },
      {
        name: 'principal.jpg',
        size: 180000,
        etag: '"abc125"',
        uploaded: new Date().toISOString(),
        storageClass: 'STANDARD',
      },
      {
        name: 'md.jpg',
        size: 180000,
        etag: '"abc126"',
        uploaded: new Date().toISOString(),
        storageClass: 'STANDARD',
      },
      {
        name: 'correspondent.jpg',
        size: 180000,
        etag: '"abc127"',
        uploaded: new Date().toISOString(),
        storageClass: 'STANDARD',
      },
    ],
    'gallery/2026/': [
      { name: 'Annual Day/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
      { name: 'Sports Day/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
      { name: 'Science Expo/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
      { name: 'Cultural Fest/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
    ],
    'gallery/2025/': [
      { name: 'Annual Day/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
      { name: 'Sports/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
      { name: 'Independence Day/', size: 0, etag: '', uploaded: '', storageClass: 'STANDARD' },
    ],
  };

  return mockData[folderPath] || [];
}

/**
 * Get CDN URL for an R2 image object with optional format conversion
 * 
 * @param path - Relative path to image (without CBSE root folder). Examples: 'site/logo.png', 'gallery/2026/Annual Day/event.jpg'
 * @param format - Image format: 'original' returns native format, 'webp' (default) returns optimized WebP at quality 85
 * @returns Full CDN URL with Cloudflare Image Optimization parameters
 * 
 * @example
 * // WebP optimized (default)
 * getR2ImageUrl('site/logo.png')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/site/logo.png?format=webp&quality=85
 * 
 * @example
 * // Original format
 * getR2ImageUrl('site/hero-banner.jpg', 'original')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/site/hero-banner.jpg
 * 
 * @example
 * // Gallery image with spaces in folder name (auto URL-encoded)
 * getR2ImageUrl('gallery/2026/Annual Day/event1.jpg')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/gallery/2026/Annual%20Day/event1.jpg?format=webp&quality=85
 */
export function getR2ImageUrl(path: string, format: 'original' | 'webp' = 'webp'): string {
  if (format === 'webp') {
    return `${getR2Url(path)}?format=webp&quality=85`;
  }
  
  return getR2Url(path);
}

/**
 * Get thumbnail URL for gallery preview images (optimized for performance)
 * 
 * @param path - Relative path to image (without CBSE root folder)
 * @returns Full CDN URL with Cloudflare Image Optimization for thumbnails (WebP, quality 75, max width 300px)
 * 
 * @example
 * getR2ThumbnailUrl('gallery/2026/Annual Day/event1.jpg')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/gallery/2026/Annual%20Day/event1.jpg?format=webp&quality=75&width=300
 */
export function getR2ThumbnailUrl(path: string): string {
  return `${getR2Url(path)}?format=webp&quality=75&width=300`;
}

/**
 * Get CDN URL for a document (PDF, Word, etc.)
 * 
 * @param path - Relative path to document (without CBSE root folder). Examples: 'documents/mandatory-disclosure/affiliation-certificate.pdf'
 * @returns Full CDN URL for document download/preview
 * 
 * @example
 * getR2DocumentUrl('documents/mandatory-disclosure/affiliation-certificate.pdf')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/documents/mandatory-disclosure/affiliation-certificate.pdf
 * 
 * @example
 * // Use in <a> tag for download
 * <a href={getR2DocumentUrl('documents/school-handbook.pdf')} download>
 *   Download Handbook
 * </a>
 */
export function getR2DocumentUrl(path: string): string {
  return getR2Url(path);
}

/**
 * Get CDN URL for a video file
 * 
 * @param path - Relative path to video (without CBSE root folder). Examples: 'videos/school-tour.mp4'
 * @returns Full CDN URL for video streaming
 * 
 * @example
 * getR2VideoUrl('videos/school-tour.mp4')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/videos/school-tour.mp4
 * 
 * @example
 * // Use in <video> tag
 * <video controls>
 *   <source src={getR2VideoUrl('videos/school-tour.mp4')} type="video/mp4" />
 * </video>
 */
export function getR2VideoUrl(path: string): string {
  return getR2Url(path);
}

/**
 * Generic asset URL helper - works for any file type
 * 
 * @param path - Relative path to asset (without CBSE root folder)
 * @param options - Optional configuration for special handling
 * @param options.quality - Image quality (1-100). Only used for image-like formats
 * @param options.format - Desired format conversion (e.g., 'webp'). Only used for image-like formats
 * @returns Full CDN URL
 * 
 * @example
 * // Generic usage
 * getAssetUrl('documents/handbook.pdf')
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/documents/handbook.pdf
 * 
 * @example
 * // With image optimization
 * getAssetUrl('gallery/event.jpg', { format: 'webp', quality: 80 })
 * // https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/gallery/event.jpg?format=webp&quality=80
 */
export function getAssetUrl(path: string, options?: { quality?: number; format?: string }): string {
  const baseUrl = getR2Url(path);
  
  if (options?.format && (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif'))) {
    const quality = options.quality || 85;
    return `${baseUrl}?format=${options.format}&quality=${quality}`;
  }
  
  return baseUrl;
}

/**
 * Get full path for R2 object (helper for building paths)
 * 
 * @param segments - Path segments to join (empty segments are filtered out)
 * @returns Joined path with forward slashes
 * 
 * @example
 * getR2Path('gallery', '2026', 'Annual Day', 'event.jpg')
 * // 'gallery/2026/Annual Day/event.jpg'
 */
export function getR2Path(...segments: string[]): string {
  return segments.filter(Boolean).join('/');
}

/**
 * Validate if a path follows the project's naming conventions
 * 
 * @param path - Path to validate
 * @returns Object with isValid boolean and message describing any issues
 * 
 * @example
 * validateAssetPath('site/my image.png')
 * // { isValid: false, message: 'Spaces in path should be replaced with hyphens or underscores' }
 * 
 * @example
 * validateAssetPath('site/my-image.png')
 * // { isValid: true, message: 'Valid path format' }
 */
export function validateAssetPath(path: string): { isValid: boolean; message: string } {
  // Check for multiple consecutive spaces
  if (/\s{2,}/.test(path)) {
    return { isValid: false, message: 'Avoid multiple spaces in path; use single space for readability' };
  }
  
  // Check for leading/trailing spaces
  if (path !== path.trim()) {
    return { isValid: false, message: 'Path should not have leading or trailing spaces' };
  }
  
  // Check for special characters (allow only alphanumeric, hyphens, underscores, slashes, spaces)
  if (!/^[a-zA-Z0-9\-_\/\s.]+$/.test(path)) {
    return { isValid: false, message: 'Path contains invalid characters; use only alphanumeric, hyphens, underscores, slashes, spaces, and dots' };
  }
  
  return { isValid: true, message: 'Valid path format' };
}

/**
 * Get the filename from a full R2 path
 * 
 * @param path - Full or relative path
 * @returns Filename with extension
 * 
 * @example
 * getImageFilename('gallery/2026/Annual Day/event1.jpg')
 * // 'event1.jpg'
 */
export function getImageFilename(path: string): string {
  return path.split('/').pop() || '';
}

/**
 * Check if a filename is an image format
 * 
 * @param filename - Filename with extension
 * @returns True if file is a recognized image format
 * 
 * @example
 * isImage('logo.png') // true
 * isImage('document.pdf') // false
 */
export function isImage(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'];
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return imageExtensions.includes(ext);
}

/**
 * Parse R2 folder structure to generate gallery
 */
export function parseGalleryStructure(folders: R2Object[]): GalleryCategory[] {
  const categories: { [key: number]: GalleryCategory } = {};

  folders.forEach((folder) => {
    // Extract year from folder path (e.g., "gallery/2026/Annual Day/")
    const pathParts = folder.name.split('/').filter(Boolean);
    
    if (pathParts.length >= 2) {
      const year = parseInt(pathParts[0], 10);
      const eventName = pathParts[1];

      if (!isNaN(year)) {
        if (!categories[year]) {
          categories[year] = { year, events: {} };
        }

        if (!categories[year].events[eventName]) {
          categories[year].events[eventName] = [];
        }
      }
    }
  });

  return Object.values(categories).sort((a, b) => b.year - a.year);
}

/**
 * Check if file is video
 */
export function isVideo(filename: string): boolean {
  const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv'];
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return videoExtensions.includes(ext);
}
