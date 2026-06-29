import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vidhyalakshmi Senior Secondary School',
  description:
    'Vidhyalakshmi Senior Secondary School, a CBSE senior secondary school managed by Paakeezaa Educational Trust in Keelpudur, Vellore.',
  keywords: [
    'Vidhyalakshmi Senior Secondary School',
    'Vidhyalakshmi School',
    'CBSE school Vellore',
    'Keelpudur school',
    'Paakeezaa Educational Trust',
  ],
  metadataBase: new URL('https://www.vidhyalakshmi.edu.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.vidhyalakshmi.edu.in',
    siteName: 'Vidhyalakshmi Senior Secondary School',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0369a1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
