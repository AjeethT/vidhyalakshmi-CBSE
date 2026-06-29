# Cloudflare R2 Setup & Integration Guide

## Overview

This guide walks you through setting up Cloudflare R2 storage and integrating it with your Vidhyalakshmi School website.

## Prerequisites

- Cloudflare account with R2 enabled
- Cloudflare API token with R2 permissions
- Website deployed and accessible

## Step 1: Create Cloudflare R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 → Buckets**
3. Click **Create Bucket**
4. Enter bucket name: `vidhyalakshmi-content`
5. Choose region closest to your location
6. Click **Create Bucket**

## Step 2: Generate API Token

### For Development/Deployment:

1. Go to **Account Settings → API Tokens**
2. Click **Create Token**
3. Use template: **Edit Cloudflare Workers**
4. Permissions needed:
   - Account → Cloudflare R2 → Edit
   - Account → Cloudflare R2 → List
   - Account → Cloudflare R2 → Read

### For Production (Restrictive):

Create a token with **only R2 read** permissions:
- Account → Cloudflare R2 → Read

Save the token securely.

## Step 3: Upload Folder Structure

Create the following folder structure in your R2 bucket:

```
vidhyalakshmi-content/
├── site/
│   ├── logo.png
│   ├── hero-banner.jpg
│   ├── principal.jpg
│   ├── md.jpg
│   └── correspondent.jpg
├── gallery/
│   ├── 2026/
│   │   ├── Annual Day/
│   │   │   ├── image1.jpg
│   │   │   ├── image2.jpg
│   │   │   └── ...
│   │   ├── Sports Day/
│   │   └── Science Expo/
│   ├── 2025/
│   │   ├── Annual Day/
│   │   ├── Sports/
│   │   └── Independence Day/
│   └── 2024/
│       └── ...
└── videos/
    ├── 2026/
    └── 2025/
```

## Step 4: Update Environment Variables

Update `.env.local` with your credentials:

```bash
# R2 Public URL (from R2 settings)
NEXT_PUBLIC_R2_PUBLIC_URL=https://cdn.vidhyalakshmi.cus.firrham.com
NEXT_PUBLIC_R2_ROOT_FOLDER=CBSE

# API Token (keep secret!)
CLOUDFLARE_API_TOKEN=cfat_XXXXXXXXXXXXXXXXXXXXX

# Account ID
CLOUDFLARE_ACCOUNT_ID=XXXXXXXXXXXXXXXX
```

## Step 5: Upload Images

### Method 1: Cloudflare Dashboard (Manual)
1. Go to R2 → Your Bucket
2. Click **Upload** and select files
3. Drag & drop into folders

### Method 2: AWS CLI (Automated)

Install AWS CLI, then configure:

```bash
aws configure
# AWS Access Key ID: [R2 Access Key]
# AWS Secret Access Key: [R2 Secret Key]
# Default region: auto
# Default output: json
```

Upload files:
```bash
aws s3 cp ./images s3://vidhyalakshmi-content/gallery/2026/ \
  --recursive \
  --endpoint-url https://XXXXXXXX.r2.cloudflarestorage.com
```

### Method 3: Cloudflare Workers Script

Create a worker to handle bulk uploads from web form.

## Step 6: Configure Public Access

1. Go to R2 → Your Bucket → Settings
2. **Public Access** section:
   - Enable "Allow public read access"
   - Note your **R2.dev subdomain URL**
   - Use this as `NEXT_PUBLIC_R2_PUBLIC_URL`

## Step 7: Generate Public URL Format

Your public URLs will follow this pattern:

```
https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/path/to/image.jpg
```

Used in gallery:
```
https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/gallery/2026/Annual Day/image1.jpg
```

## Step 8: Update Gallery Data

In `lib/gallery.ts`, update image URLs to match your folder structure:

```typescript
export const GALLERY_DATA: GalleryYear[] = [
  {
    year: 2026,
    events: {
      'Annual Day': [
        { 
          id: '1', 
          name: 'event1.jpg', 
          url: `${BASE_URL}/gallery/2026/Annual Day/event1.jpg` 
        },
        // ... more images
      ],
    },
  },
];
```

## Dynamic Gallery Loading

For **automatic gallery generation** from R2 folders (future enhancement):

1. Create a Cloudflare Worker
2. Fetch R2 list using R2 API
3. Generate gallery structure dynamically
4. Cache results in KV storage
5. Return as JSON to frontend

Example Worker (advanced):

```typescript
export default {
  async fetch(request) {
    const bucket = 'vidhyalakshmi-content';
    const token = env.CLOUDFLARE_API_TOKEN;
    
    // List R2 objects
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/r2/buckets/${bucket}/objects`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    return new Response(response.body);
  }
};
```

## Troubleshooting

### Images Not Loading
- Check public access is enabled
- Verify correct R2 public URL in `.env.local`
- Inspect browser console for CORS errors

### CORS Issues
Add CORS headers in R2 bucket settings:
```json
{
  "AllowedOrigins": ["https://yourdomain.com"],
  "AllowedMethods": ["GET", "HEAD"],
  "AllowedHeaders": ["*"]
}
```

### Performance Optimization
- Use image optimization: `?format=webp&quality=85`
- Enable Cloudflare caching
- Compress images before upload
- Use appropriate image sizes

## Security Best Practices

1. **Never commit API tokens** to version control
2. **Use environment variables** for all secrets
3. **Create restricted tokens** for production
4. **Enable bucket versioning** for backup
5. **Set expiration** on public URLs if needed
6. **Monitor R2 usage** to avoid unexpected costs

## Testing

After setup, test:

1. **Home Page**: Management photos display correctly
2. **Gallery Page**: Year-wise gallery loads
3. **Images Load**: No 404 or CORS errors
4. **Performance**: WebP format working

```bash
# Test image loading
curl -I https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/site/logo.png

# Test with optimization
curl -I "https://cdn.vidhyalakshmi.cus.firrham.com/CBSE/site/logo.png?format=webp&quality=85"
```

## Cost Estimation

R2 Pricing (as of 2026):
- **Storage**: $0.015 per GB/month
- **Class A Requests** (PUT/POST): $4.50 per million
- **Class B Requests** (GET/HEAD): $0.36 per million

Example for 100GB of images:
- Storage: $1.50/month
- 1M reads/month: $0.36

## Maintenance

### Monthly Tasks
- Monitor storage usage
- Check for broken image links
- Review API token expiration
- Backup critical images

### Quarterly Tasks
- Archive old galleries to cold storage
- Update folder structure if needed
- Review access logs
- Optimize image sizes

## Support

For more information:
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [R2 API Reference](https://developers.cloudflare.com/r2/api/s3/api/)
