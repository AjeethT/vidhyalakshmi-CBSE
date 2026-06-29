# Website Content Management

## Website Structure

This is a Next.js app-router website for Vidhyalakshmi Senior Secondary School.

### Pages

- `/` - Homepage with hero, school statistics, welcome content, feature highlights, leadership, and admission CTA.
- `/about/` - School profile, mission, vision, CBSE recognition, and school journey.
- `/management/` - Management and leadership messages.
- `/facilities/` - Campus facilities and infrastructure highlights.
- `/academics/` - Academic and co-scholastic program overview.
- `/gallery/` - Cloudflare R2-backed gallery view.
- `/videos/` - Video gallery page.
- `/events/` - School events page.
- `/admission/` - Admission process and enquiry form.
- `/careers/` - Careers page.
- `/contact/` - Campus address, phone numbers, email contacts, and enquiry form.
- `/mandatory-disclosure/` - CBSE mandatory disclosure information, results, staff, and infrastructure data.
- `/privacy/` - Privacy policy.
- `/terms/` - Terms and conditions.

### Navigation Structure

Navigation is configured in `lib/config.ts` through `NAVIGATION`.

- Home
- About
  - About School
  - Management Messages
  - Facilities
- Academics
  - Scholastic
  - Co-Scholastic
- Students
  - Gallery
  - Videos
  - Events
- Admission
- Careers
- Contact

### Important Components

- `components/Navbar.tsx` - Desktop and mobile navigation.
- `components/Footer.tsx` - Footer links, contact information, and developer credit.
- `components/DynamicGallery.tsx` - Dynamic gallery display.
- `lib/config.ts` - School profile, contact details, navigation, and R2 folder configuration.
- `lib/cloudflare.ts` - R2 URL helpers and gallery object utilities.
- `lib/gallery.ts` - Gallery data helpers.

## Content Update Guide

### Update Company/School Information

Edit `SCHOOL_INFO` in `lib/config.ts`.

Important fields:

- `name`
- `fullName`
- `trust`
- `established`
- `affiliation`
- `affiliationNo`
- `schoolCode`
- `homepageIntro`
- `address`
- `addressWithPin`

### Update Services/Programs

Academic and co-scholastic content is currently page-based:

- Edit `app/academics/page.tsx` for academic programs.
- Edit `app/facilities/page.tsx` for campus services and facilities.
- Edit `app/admission/page.tsx` for admission process and offered classes.

### Update Contact Information

Use `lib/config.ts` as the source of truth.

Update:

- `email`
- `admissionEmail`
- `contactPageEmails`
- `phone`
- `phoneNumbers`
- `landline`
- `address`
- `addressWithPin`
- `website`
- `displayWebsite`

The footer and contact page read from this shared config.

### Add New Pages

Create a new folder under `app`, then add `page.tsx`.

Example:

```text
app/new-page/page.tsx
```

Then add the page to `NAVIGATION` in `lib/config.ts` and to `app/sitemap.ts` if it should be indexed.

### Modify Homepage Content

Edit `app/page.tsx`.

Reusable school profile text is stored in `SCHOOL_INFO.homepageIntro` in `lib/config.ts`.

### Update Footer Content

Edit `components/Footer.tsx` for structure and link changes. Update school contact values in `lib/config.ts`.

## Cloudflare Asset Management

### Service Used

The project uses Cloudflare R2 for media and document storage. R2 is exposed through the Cloudflare custom domain:

```text
NEXT_PUBLIC_R2_PUBLIC_URL
```

Default public URL:

```text
https://cdn.vidhyalakshmi.cus.firrham.com
```

All public school assets live inside the R2 root folder:

```text
NEXT_PUBLIC_R2_ROOT_FOLDER=CBSE
```

### Storage Folders

Configured in `R2_CONFIG.FOLDER_STRUCTURE` in `lib/config.ts`. In Cloudflare R2, each path sits under the top-level `CBSE/` folder.

- `CBSE/site/` - Site images such as `logo.png`, hero image, and leadership photos.
- `CBSE/gallery/` - Gallery root.
- `CBSE/gallery/2026/` - Gallery media for 2026.
- `CBSE/gallery/2025/` - Gallery media for 2025.
- `CBSE/documents/` - General documents.
- `CBSE/documents/mandatory-disclosure/` - CBSE disclosure PDFs and certificates.

### Images

Store school images in R2 under `CBSE/site/` or an appropriate `CBSE/gallery/year/event/` folder. In code, pass paths without `CBSE`; the helper adds the root folder automatically and URL-encodes path segments such as spaces in event names. Use optimized URLs through `getR2ImageUrl()` or `getR2ThumbnailUrl()` in `lib/cloudflare.ts`.

Example:

```ts
getR2ImageUrl('site/hero-banner.jpg')
// https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/site/hero-banner.jpg?format=webp&quality=85
```

### Gallery Updates

The gallery is currently driven by `lib/gallery.ts` for static export. Add only files that actually exist in Cloudflare R2.

Example:

```ts
{ id: '1', name: 'event1.jpg', url: getR2ImageUrl('gallery/2026/Annual Day/event1.jpg') }
```

This maps to:

```text
CBSE/gallery/2026/Annual Day/event1.jpg
```

### PDFs and Documents

Upload PDFs and certificates to:

```text
CBSE/documents/mandatory-disclosure/
```

Generate public URLs by combining the public base URL, root folder, and object key:

```text
https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/documents/mandatory-disclosure/file-name.pdf
```

Use the helper function for documents:

```ts
import { getR2DocumentUrl } from '@/lib/cloudflare';

getR2DocumentUrl('documents/mandatory-disclosure/affiliation-certificate.pdf')
// https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/documents/mandatory-disclosure/affiliation-certificate.pdf
```

### Videos

Videos should be stored in the videos folder:

```text
CBSE/videos/
```

Use the helper function for video URLs:

```ts
import { getR2VideoUrl } from '@/lib/cloudflare';

getR2VideoUrl('videos/school-tour.mp4')
// https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/videos/school-tour.mp4
```

### Asset Helper Functions Reference

All asset URLs are generated using helper functions from `lib/cloudflare.ts`. These functions automatically:
- Prepend the CDN base URL
- Prepend the root folder (CBSE)
- URL-encode special characters (e.g., spaces become `%20`)
- Apply optimization parameters for images

#### Image Helpers

**`getR2ImageUrl(path, format)`** - Images with optimization
```ts
// Returns WebP-optimized image (default)
getR2ImageUrl('site/logo.png')
// Returns original format image
getR2ImageUrl('site/hero-banner.jpg', 'original')
```

**`getR2ThumbnailUrl(path)`** - Gallery thumbnail images (max width 300px, optimized)
```ts
getR2ThumbnailUrl('gallery/2026/Annual Day/event1.jpg')
```

#### Document & Video Helpers

**`getR2DocumentUrl(path)`** - PDFs and documents (no optimization)
```ts
getR2DocumentUrl('documents/mandatory-disclosure/certificate.pdf')
```

**`getR2VideoUrl(path)`** - Video files
```ts
getR2VideoUrl('videos/school-tour.mp4')
```

**`getAssetUrl(path, options)`** - Generic asset helper
```ts
// Without options
getAssetUrl('documents/handbook.pdf')
// With image optimization options
getAssetUrl('gallery/event.jpg', { format: 'webp', quality: 80 })
```

#### Utility Functions

**`validateAssetPath(path)`** - Validate naming conventions
```ts
const result = validateAssetPath('site/my-image.png');
// { isValid: true, message: 'Valid path format' }
```

**`getImageFilename(path)`** - Extract filename from path
```ts
getImageFilename('gallery/2026/Annual Day/event1.jpg')
// Returns: 'event1.jpg'
```

**`isImage(filename)`** - Check if filename is image format
```ts
isImage('logo.png') // true
isImage('document.pdf') // false
```

### Asset Naming Conventions

Follow these conventions for all assets stored in Cloudflare R2:

#### Image Files
- **Allowed characters:** a-z, 0-9, hyphens (-), underscores (_)
- **Spaces:** Replace with hyphens or keep single spaces (will be URL-encoded as `%20`)
- **Format:** Use lowercase for consistency
- **Examples:**
  - ✅ `logo.png` or `logo-icon.png`
  - ✅ `Annual Day` (spaces allowed, auto-encoded as `Annual%20Day`)
  - ❌ `Logo.png` (avoid mixed case)
  - ❌ `logo@2x.png` (special characters not allowed)

#### Document Files
- **Format:** Lowercase with hyphens for multi-word names
- **Examples:**
  - ✅ `affiliation-certificate.pdf`
  - ✅ `school-handbook.docx`
  - ❌ `Affiliation Certificate.pdf`

### Complete Asset Inventory

| Type | Location | Current Assets | Helper Function |
|------|----------|-----------------|-----------------|
| **Logo** | `site/logo.png` | 1 image | `getR2ImageUrl()` |
| **Hero Banner** | `site/hero-banner.jpg` | 1 image | `getR2ImageUrl()` |
| **Management Photos** | `site/principal.jpg`, `site/md.jpg`, `site/correspondent.jpg` | 3 images | `getR2ImageUrl()` |
| **Gallery** | `gallery/2026/`, `gallery/2025/` | Event-based | `getR2ImageUrl()` or `getR2ThumbnailUrl()` |
| **Mandatory Disclosure** | `documents/mandatory-disclosure/` | Multiple PDFs | `getR2DocumentUrl()` |
| **General Documents** | `documents/` | As needed | `getR2DocumentUrl()` |
| **Videos** | `videos/` | As needed | `getR2VideoUrl()` |

### Image Upload Guide

#### Step 1: Prepare Image
1. Optimize image size (reduce file size without quality loss)
   - Use tools: TinyPNG, ImageOptim, or online compressors
   - Target: < 500KB for most images, < 1MB for hero images
2. Check dimensions:
   - Logo: 200x200px or square
   - Hero banner: 1920x500px or wider aspect ratio
   - Management photos: 400x500px or portrait
   - Gallery images: 800x600px or landscape
3. Use appropriate format:
   - JPG for photos (better compression)
   - PNG for graphics/logos (transparency support)
   - WebP for modern browsers (smallest size)

#### Step 2: Upload to Cloudflare R2
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** → **Buckets** → `vidhyalakshmi` (or your bucket name)
3. Navigate to the appropriate folder:
   - `CBSE/site/` for logo, hero images, management photos
   - `CBSE/gallery/YYYY/EventName/` for gallery images
   - `CBSE/documents/` for general documents
   - `CBSE/documents/mandatory-disclosure/` for CBSE certificates
4. Click **Upload** → select file
5. Verify upload succeeded (file appears in folder list)

#### Step 3: Reference in Code
1. Open the relevant component or page file
2. Import the helper function:
   ```ts
   import { getR2ImageUrl } from '@/lib/cloudflare';
   ```
3. Use the path (without `CBSE/` prefix):
   ```ts
   src={getR2ImageUrl('site/logo.png', 'original')}
   // or
   src={getR2ImageUrl('gallery/2026/Annual Day/event1.jpg')}
   ```
4. Test locally: `npm run dev` and verify image loads
5. Build and deploy: `npm run build` and verify in production

### Replace Existing Files

#### Option A: Keep Same Filename (URL Stays Unchanged)
1. Upload the replacement with the **exact same filename** to the same folder
2. Cloudflare R2 will overwrite the old file
3. The CDN URL remains the same
4. **No code changes needed**
5. Wait 5-10 minutes for CDN cache to clear, or manually purge cache

#### Option B: New Filename (URL Changes)
1. Upload the new file with a different filename
2. Update all references in source code with the new path
3. Example:
   ```ts
   // Before
   getR2ImageUrl('site/logo.png')
   // After
   getR2ImageUrl('site/logo-v2.png')
   ```
4. Build, test, and deploy
5. Optional: Delete old file from R2 to save storage

### Troubleshooting Broken Images

#### Image Returns 404 or "Image Not Found"

**Cause 1: File doesn't exist in R2**
1. Check the file path in code
2. Log in to Cloudflare dashboard
3. Navigate to R2 bucket → CBSE folder
4. Search for the filename
5. **Solution:** Upload the file to correct folder in R2

**Cause 2: Path mismatch (case sensitivity)**
1. R2 path: `CBSE/gallery/2026/Annual Day/event1.jpg`
2. Code path: `gallery/2026/Annual Day/event1.jpg` (correct)
3. Code path: `gallery/2026/annual day/event1.jpg` (incorrect - case mismatch)
4. **Solution:** Verify exact path case matches

**Cause 3: Spaces not handled correctly**
1. Folder names with spaces must be URL-encoded as `%20`
2. The helper functions handle this automatically
3. Code: `'gallery/2026/Annual Day/event.jpg'` → URL: `/Annual%20Day/`
4. **Solution:** Use helper functions (they auto-encode)

**Cause 4: Browser cache**
1. Image URL changes but browser serves cached version
2. CDN may also cache for 24 hours
3. **Solution:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) or clear browser cache

#### Gallery Images Not Loading

1. Check `lib/gallery.ts` - verify image paths exist in R2
2. Each entry in `GALLERY_DATA` must reference a real file
3. Example (BROKEN):
   ```ts
   { id: '1', name: 'event1.jpg', url: getR2ImageUrl('gallery/2026/NonExistent/event.jpg') }
   ```
4. **Solution:** Remove entries for non-existent events

#### CDN Domain Not Responding

1. Check `NEXT_PUBLIC_R2_PUBLIC_URL` in environment variables
2. Verify it's set to: `https://cdn.vidhyalakshmi.cus.firrham.com`
3. Test manually: Visit `https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/site/logo.png` in browser
4. If it returns 403 or 404:
   - Check R2 bucket permissions
   - Verify custom domain is configured in Cloudflare
   - Contact Cloudflare support
5. **Solution:** Verify environment variables and domain configuration

## Local Development Image Loading

### Overview

Images are hosted on Cloudflare R2 CDN at `https://cdn.vidhyalakshmi.cus.firrham.com`. In production (static export), images load directly from the CDN. In local development (`localhost:3001`), browsers block cross-origin image requests via **ORB (Opaque Response Blocking)** for security reasons.

### How It Works

**Development Mode (localhost:3001):**
- Images route through `/api/image` proxy
- Proxy validates all URLs are from our CDN
- Server fetches image from CDN and returns to client
- Bypasses browser CORS/ORB restrictions
- Example: `http://localhost:3001/api/image?url=https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/Site%20Photos/School%20logo.png`

**Production Mode (built static export):**
- Images load directly from CDN
- No proxy overhead
- Maximum performance
- Example: `https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/Site%20Photos/School%20logo.png`

### Using the Dev-Proxy Helper

Always use `getR2UrlWithDevProxy()` for images that should appear in local dev:

```typescript
// In components using 'use client'
import { getR2UrlWithDevProxy } from '@/lib/cloudflare';

export function MyComponent() {
  return (
    <img
      src={getR2UrlWithDevProxy('Site Photos/School logo.png')}
      alt="School logo"
    />
  );
}
```

The helper automatically:
- Routes through proxy in development (`NODE_ENV='development'`)
- Uses direct CDN URL in production
- Handles URL encoding
- Manages query parameters

### Implementation Details

**File: `/app/api/image/route.ts`**
- Handles GET requests at `/api/image` endpoint
- Validates `url` query parameter is from CDN
- Proxies request to Cloudflare R2
- Returns image with proper headers:
  - `Content-Type` matching image type
  - `Cache-Control: public, max-age=31536000, immutable` (1-year cache)
  - `Access-Control-Allow-Origin: *` (CORS headers)

**Security:**
- Only accepts URLs from `cdn.vidhyalakshmi.cus.firrham.com`
- Rejects requests for external URLs
- Returns 403 Forbidden for invalid sources

### Testing the Proxy

To verify the proxy works:

1. Start dev server: `npm run dev`
2. Visit proxy URL directly in browser:
   ```
   http://localhost:3001/api/image?url=https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/Site%20Photos/School%20logo.png
   ```
3. Image should display (no error)
4. Check Network tab - shows 200 response with image data

### Pages Using Dev-Proxy Images

- **Homepage** (`/`): Logo, hero banner, management photos
- **Management** (`/management/`): Leadership photos and messages
- **Navbar** (`/components/Navbar.tsx`): School logo

### Adding New Images

When adding new images to pages:

```typescript
// ✅ CORRECT: Use dev-proxy helper
<img src={getR2UrlWithDevProxy('Site Photos/new-image.jpg')} alt="..." />

// ❌ WRONG: Direct CDN URL won't work in local dev
<img src={getR2ImageUrl('Site Photos/new-image.jpg')} alt="..." />

// ❌ WRONG: getR2ImageUrl returns direct CDN URL
```

### Build Process

When running `npm run build`:

1. Compiles components with helper functions
2. Pages with `getR2UrlWithDevProxy()` generate static HTML
3. Since `NODE_ENV='production'` during build:
   - Helper returns direct CDN URLs
   - Static HTML contains CDN URLs
   - No proxy URLs in production build
4. Result: `/out/` folder contains static HTML with direct CDN URLs
5. Production is fast - no proxy overhead!

### Troubleshooting Dev Images

**Problem: Images show broken icon in dev**
- Verify proxy is running: Visit `http://localhost:3001/` (page should load)
- Check browser console for errors
- Verify image URL: `http://localhost:3001/api/image?url=...`
- Ensure `NODE_ENV` is set correctly (should be 'development' when running `npm run dev`)

**Problem: Proxy returns 403 Forbidden**
- URL doesn't start with `cdn.vidhyalakshmi.cus.firrham.com`
- Check the encoded URL in query parameter
- Try URL directly: `https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/...` (should load in browser)

**Problem: Image loads in production but not locally**
- Likely using direct CDN URL instead of proxy helper
- Change `getR2ImageUrl()` to `getR2UrlWithDevProxy()`
- Rebuild and refresh

**Problem: Proxy timeout or slow loading**
- Check internet connection to CDN
- Verify CDN domain responds: `ping cdn.vidhyalakshmi.cus.firrham.com`
- Check Cloudflare dashboard for any issues
- Proxy adds ~100-200ms latency (development only)

### Performance Notes

- **Development:** Proxy adds ~100-200ms latency per image (acceptable for dev)
- **Production:** Zero proxy overhead - direct CDN URLs
- **Caching:** Images cached for 1 year on clients (browser) and CDN
- **Compression:** Cloudflare CDN automatically optimizes images
- **WebP:** Use `?format=webp&quality=80` for further optimization (when needed)

### Future Improvements

If you need faster local development:
1. **Option 1:** Disable browser security (not recommended)
   ```bash
   # macOS/Linux: Open Chrome with disabled CORS
   open -a Google\ Chrome --args --disable-web-security
   ```

2. **Option 2:** Mirror images locally (complex setup)
   - Run local image server
   - Use local URLs in development
   - Switch to CDN URLs in production

Current proxy solution is the recommended approach - simple, secure, and maintainable.

#### Performance Issues (Slow Image Load)

1. Check image file sizes (should be < 500KB for most)
2. Use `getR2ImageUrl()` with default WebP format for optimization
3. Use `getR2ThumbnailUrl()` for gallery previews (max width 300px)
4. Enable lazy loading in components: `loading="lazy"`
5. **Solution:** Optimize images and use appropriate helper functions

### Asset Helper Implementation Examples

#### Homepage Hero Image
```tsx
import { getR2ImageUrl } from '@/lib/cloudflare';
import Image from 'next/image';

export default function Home() {
  const [heroError, setHeroError] = useState(false);
  
  return (
    <section>
      {!heroError && (
        <Image
          src={getR2ImageUrl('site/hero-banner.jpg')}
          alt="School campus"
          fill
          className="object-cover"
          onError={() => setHeroError(true)}
        />
      )}
      {heroError && <div className="bg-gray-200 h-96">Image not available</div>}
    </section>
  );
}
```

#### Gallery Image with Lazy Loading
```tsx
import { getR2ImageUrl } from '@/lib/cloudflare';

export function GalleryImage({ imagePath, eventName }) {
  return (
    <img
      src={getR2ImageUrl(imagePath)}
      alt={eventName}
      loading="lazy"
      className="w-full h-auto"
      onError={(e) => {
        e.currentTarget.src = '/placeholder-image.png'; // fallback
      }}
    />
  );
}
```

#### Document Link
```tsx
import { getR2DocumentUrl } from '@/lib/cloudflare';

export function DocumentDownload() {
  return (
    <a
      href={getR2DocumentUrl('documents/mandatory-disclosure/affiliation-certificate.pdf')}
      download
      target="_blank"
      rel="noopener noreferrer"
    >
      Download Affiliation Certificate
    </a>
  );
}
```

## Developer Notes

### Important Configuration Files

- `next.config.js` - Next.js export/build settings.
- `tailwind.config.js` - Tailwind theme configuration.
- `tsconfig.json` - TypeScript configuration.
- `.env.example` - Required environment variable template.
- `lib/config.ts` - Site-wide school and R2 configuration.

### Environment Variables

- `NEXT_PUBLIC_R2_PUBLIC_URL`
- `NEXT_PUBLIC_R2_ROOT_FOLDER`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `CLOUDFLARE_API_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SCHOOL_NAME`
- `NEXT_PUBLIC_SCHOOL_EMAIL`
- `NEXT_PUBLIC_SCHOOL_PHONE`
- `NEXT_PUBLIC_SCHOOL_ADDRESS`

Keep R2 secrets and Cloudflare tokens server-side only.

### Build Process

Install dependencies:

```bash
npm install
```

Run production build/static export:

```bash
npm run build
```

Run development server:

```bash
npm run dev
```

### Deployment Process

1. Update content and asset references.
2. Upload large media/documents to Cloudflare R2.
3. Run lint/build validation.
4. Deploy the exported Next.js output according to the hosting setup.
5. Verify navigation, images, documents, and mobile responsiveness after deployment.
