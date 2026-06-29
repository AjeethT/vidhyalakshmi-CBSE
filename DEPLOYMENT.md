# Vidhyalakshmi School Website - Deployment & Admin Guide

## Project Overview

This is a modern, premium Next.js website for Vidhyalakshmi Senior Secondary School built with:
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for responsive design
- **Framer Motion** for animations
- **Static Export** (output: 'export') for shared hosting deployment
- **Cloudflare R2** for all media storage
- **Cloudflare Workers** for admin APIs and form handling
- **Turnstile CAPTCHA** for form security

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Shared Hosting (Static)                   │
│              (out/ folder - Pure HTML/CSS/JS)                │
│  • All pages prerendered at build time                       │
│  • No server-side rendering required                         │
│  • Direct file serving via HTTP/HTTPS                        │
│  • Trailingslash: true (SEO optimized)                       │
└─────────────────────────────────────────────────────────────┘
                              ↑
                    ┌─────────┴──────────┐
                    ↓                    ↓
        ┌──────────────────┐   ┌──────────────────┐
        │ Cloudflare R2    │   │ Cloudflare       │
        │ (Media Storage)  │   │ Worker (APIs)    │
        │ • Gallery Images │   │ • Admin Login    │
        │ • Videos         │   │ • Content Update │
        │ • Documents      │   │ • Form Handler   │
        │ • Backups        │   │ • Media Upload   │
        └──────────────────┘   └──────────────────┘
```

## Build & Deploy Steps

### 1. Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production (creates out/ folder)
npm run build

# Check build output
ls -la out/
```

### 2. Static Export Verification

The `next.config.js` is configured with:
```javascript
output: 'export',           // Static export only
trailingSlash: true,       // URLs end with /
distDir: 'out',            // Output directory
images: { unoptimized: true }, // No image optimization
```

All pages are prerendered at build time in the `out/` directory:
- `out/index.html` → Home page
- `out/about/index.html` → About page
- `out/gallery/index.html` → Gallery page
- `out/api/...` → NOT included (needs external APIs)

### 3. Upload to Shared Hosting

**Option A: FTP/SFTP**
```bash
# Copy out/ folder to server root
scp -r out/* user@hosting.com:/public_html/
```

**Option B: File Manager**
1. Log into hosting control panel
2. Upload all files from `out/` to public_html root
3. Set permissions: 755 for folders, 644 for files

**Ensure:**
- .htaccess is present (for URL rewriting if needed)
- robots.txt is deployed
- sitemap.xml is accessible

## Environment Configuration

### 1. Create `.env.local` from `.env.example`

```bash
# Copy template
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

### 2. Required Environment Variables

```
# Cloudflare R2
NEXT_PUBLIC_R2_PUBLIC_URL=https://cdn.vidhyalakshmi.cus.firrham.com
NEXT_PUBLIC_R2_ROOT_FOLDER=CBSE
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key

# Turnstile CAPTCHA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key

# Worker API
NEXT_PUBLIC_WORKER_URL=https://your-worker.workers.dev

# School Info
NEXT_PUBLIC_SCHOOL_EMAIL=info@vidhyalakshmi.edu.in
NEXT_PUBLIC_SCHOOL_PHONE=+91-XXXXXXXXXX
```

## Cloudflare R2 Setup

### 1. Create R2 Bucket

- Navigate to Cloudflare Dashboard → R2
- Create bucket: `vidhyalakshmi-content`
- Enable public access for assets
- Set public URL: `https://cdn.vidhyalakshmi.cus.firrham.com`

### 2. Create API Token

- Go to R2 Settings → API Tokens
- Create new API token for Worker
- Grant permissions: Read, Write, List, Delete
- Note Account ID, Access Key ID, Secret Access Key

### 3. Folder Structure

```
vidhyalakshmi-content/
├── gallery/
│   ├── 2024/
│   │   ├── annual-day/
│   │   │   ├── cultural/
│   │   │   ├── sports/
│   │   │   └── academics/
│   │   └── founder-day/
│   └── backups/
├── videos/
│   ├── 2024/
│   │   ├── annual-day/
│   │   └── events/
├── newsletters/
│   ├── 2024/
│   └── 2023/
├── management/
│   ├── director.webp
│   ├── correspondent.webp
│   └── principal.webp
├── facilities/
├── content/
│   ├── site.json
│   ├── navigation.json
│   ├── announcements.json
│   ├── events.json
│   ├── newsletters.json
│   ├── gallery-index.json
│   └── homepage.json
└── backups/
    └── content/
        └── 2024-05-18T14-30-00/
            └── site.json
```

## Cloudflare Worker Setup

### 1. Create Worker

```bash
# Install Wrangler CLI
npm install -g wrangler

# Create new worker
wrangler init vidhyalakshmi-worker

# CD into worker directory
cd vidhyalakshmi-worker
```

### 2. Worker Code Structure

Create `src/index.ts`:

```typescript
import { Router } from 'itty-router';

const router = Router();

// Admin endpoints
router.post('/admin/login', handleLogin);
router.post('/admin/logout', handleLogout);
router.get('/content/:name', getContent);
router.put('/content/:name', updateContent);

// Form endpoints
router.post('/forms/contact', handleContactForm);
router.post('/forms/admission', handleAdmissionForm);
router.post('/forms/career', handleCareerForm);
router.post('/forms/newsletter', handleNewsletterForm);

// Media endpoints
router.post('/media/upload', handleUpload);
router.delete('/media', handleDelete);
router.get('/gallery', getGallery);

router.all('*', () => new Response('Not Found', { status: 404 }));

export default router;
```

### 3. Environment Variables in Worker

In `wrangler.toml`:

```toml
[env.production]
vars = { R2_BUCKET = "vidhyalakshmi-content" }
```

Set in Cloudflare Dashboard:
```
ADMIN_PASSWORD_HASH=bcrypt_hash
TURNSTILE_SECRET=your_secret
SMTP_API_KEY=your_key
```

### 4. Deploy Worker

```bash
wrangler publish
```

## Admin Operations

### Content Management (JSON in R2)

**Example: Update Homepage Content**

1. Get current JSON:
```bash
curl https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/content/homepage.json
```

2. Modify in admin dashboard
3. Create backup before update
4. Upload new JSON via Worker API:
```bash
curl -X PUT https://your-worker.workers.dev/content/homepage \
  -H "Authorization: Bearer admin_token" \
  -H "Content-Type: application/json" \
  -d @homepage.json
```

### Media Upload Flow

1. Admin logs in → receives HTTP-only session cookie
2. Admin selects images/videos from local drive
3. Client-side:
   - Validates MIME type (image/jpeg, image/png, video/mp4, etc.)
   - Generates WebP thumbnails
   - Creates metadata JSON
4. Upload to Worker:
   - Validates file again server-side
   - Checks admin session
   - Uploads to R2 with proper folder structure
   - Returns public URL

### Form Submission Flow

1. User fills form (Contact, Admission, Career, Newsletter)
2. Turnstile CAPTCHA appears
3. User completes CAPTCHA
4. Form submits to Worker with token
5. Worker validates Turnstile server-side
6. If valid: Email sent via PHP bridge or SMTP
7. User sees success toast notification

## Security Considerations

### 1. CORS Headers
```javascript
// Set in Worker
headers: {
  'Access-Control-Allow-Origin': 'https://www.vidhyalakshmi.edu.in',
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
}
```

### 2. Admin Authentication
- Password hashed with bcrypt
- Session stored in HTTP-only cookies
- CSRF tokens for state-changing operations
- Rate limiting on login attempts

### 3. File Uploads
- MIME type validation
- File size limits (10MB for images, 100MB for video)
- Virus scanning (optional, via third-party API)
- Filename sanitization

### 4. Forms
- Mandatory Turnstile validation
- Input sanitization (HTML tags removed)
- Rate limiting per IP
- CAPTCHA expires after 5 minutes

## Development Workflow

### Add a New Page

1. Create page file:
```typescript
// app/new-page/page.tsx
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page Title - Vidhyalakshmi',
  description: 'Page description for SEO',
};

export default function NewPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Content */}
      </main>
      <Footer />
    </>
  );
}
```

2. Update navigation config:
```typescript
// lib/config.ts
export const NAVIGATION = [
  // ... existing items
  { label: 'New Page', href: '/new-page/', submenu: [] },
];
```

3. Add to sitemap (auto-generated)

### Update School Information

```typescript
// lib/config.ts
export const SCHOOL_INFO = {
  name: 'Vidhyalakshmi Senior Secondary School',
  email: 'info@vidhyalakshmi.edu.in',
  phone: '+91-XXXXXXXXXX',
  // ... update values
};
```

### Styling with TailwindCSS

```tsx
// Example component
export function Card() {
  return (
    <div className="card p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Title</h3>
      <p className="text-gray-600">Description</p>
    </div>
  );
}
```

## Performance & SEO

### Lighthouse Targets
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: 100

### Optimization Done
- ✓ Prerendered static HTML (no JavaScript required for content)
- ✓ TailwindCSS optimized build
- ✓ Image optimization (PNG→WebP) on upload
- ✓ Lazy loading for images and videos
- ✓ JSON-LD schema markup for school
- ✓ Meta tags and OpenGraph
- ✓ Mobile-first responsive design

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## Maintenance

### Regular Backups
- Before every content update: Backup to R2 `backups/` folder
- Automated weekly backup of `content/` JSON files
- Keep 12 months of historical backups

### Monitoring
- Monitor R2 bandwidth usage
- Check Worker request logs
- Monitor form submission errors
- Track 404 errors from shared hosting

### Updates
- Keep Next.js and dependencies updated quarterly
- Review security advisories in npm
- Test changes locally before deploying
- Use separate staging environment if possible

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next out
npm run build
```

### Pages Not Updating
- Ensure static export is enabled
- Check `out/` folder timestamp
- Clear shared hosting cache (if applicable)
- Verify files uploaded correctly

### Forms Not Working
- Check Worker deployment
- Verify Turnstile keys in env
- Check SMTP/email configuration
- Review Worker logs in Cloudflare dashboard

### Images Not Displaying
- Verify R2 bucket is public
- Check R2 URL is correct
- Verify CORS headers are set
- Check image path format

## Additional Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/app/guides/static-exports)
- [Cloudflare R2 API](https://developers.cloudflare.com/r2/api/workers/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Turnstile Validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Support

For issues or questions:
- Email: devs@vidhyalakshmi.edu.in
- Create GitHub issue if applicable
- Check deployment logs in Cloudflare Dashboard
