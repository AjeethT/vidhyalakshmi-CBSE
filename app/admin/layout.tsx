import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Vidhyalakshmi School',
  description: 'Admin dashboard for content and media management.',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>{children}</body>
    </html>
  );
}
