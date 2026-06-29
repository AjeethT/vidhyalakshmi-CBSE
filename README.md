# Vidhyalakshmi Senior Secondary School Website

Next.js website for Vidhyalakshmi Senior Secondary School.

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Key Files

- `app/` - Website pages and routes.
- `components/` - Shared UI components.
- `lib/config.ts` - School information, navigation, and Cloudflare R2 folders.
- `lib/cloudflare.ts` - Cloudflare R2 media URL helpers.
- `DOCUMENTATION/WEBSITE_CONTENT_MANAGEMENT.md` - Content and asset management guide.

## Media

Large images, PDFs, certificates, and gallery assets should be stored in Cloudflare R2, not committed into the project.
