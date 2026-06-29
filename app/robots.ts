import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/*.json$'],
    },
    sitemap: 'https://www.vidhyalakshmi.edu.in/sitemap.xml',
  };
}
