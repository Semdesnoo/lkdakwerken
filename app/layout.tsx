import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { WhatsappFloat } from '@/components/WhatsappFloat';

// Body font: Inter
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

// Display font: Inter (zelfde family, andere variable zodat we hem makkelijk kunnen targeten).
// Wanneer Gilroy beschikbaar is kan deze variable naar Gilroy verwijzen zonder classNames aan te passen.
const display = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lkdakwerken.nl'),
  title: {
    default: 'LK Dakwerken | Erkende Dakdekker in Zuid-Holland',
    template: '%s | LK Dakwerken',
  },
  description:
    'LK Dakwerken is uw specialist voor bitumen daken, renovatie, nieuwbouw, onderhoud en lekkage in heel Zuid-Holland. Dakmerk Erkend, 25+ jaar ervaring, 10 jaar garantie.',
  keywords: [
    'dakdekker',
    'Zuid-Holland',
    'bitumen daken',
    'dakrenovatie',
    'dakonderhoud',
    'lekkage',
    'dakbedekking',
    'dakdekker Rotterdam',
    'dakdekker Den Haag',
    'Dakmerk',
  ],
  authors: [{ name: 'LK Dakwerken' }],
  creator: 'LK Dakwerken',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://lkdakwerken.nl',
    siteName: 'LK Dakwerken',
    title: 'LK Dakwerken | Erkende Dakdekker in Zuid-Holland',
    description:
      'Specialist in bitumen daken, renovatie, nieuwbouw, onderhoud en lekkage. 25+ jaar ervaring. Werkzaam in heel Zuid-Holland.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'LK Dakwerken' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LK Dakwerken | Erkende Dakdekker in Zuid-Holland',
    description: 'Specialist in bitumen daken, renovatie, nieuwbouw, onderhoud en lekkage.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': 'https://lkdakwerken.nl/#organization',
  name: 'LK Dakwerken',
  url: 'https://lkdakwerken.nl',
  telephone: '+31 6 12345678',
  email: 'info@lkdakwerken.nl',
  description: 'Dakmerk erkend dakdekkersbedrijf in Zuid-Holland.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bedrijvenpark 12',
    addressLocality: 'Rotterdam',
    postalCode: '3000 AB',
    addressRegion: 'Zuid-Holland',
    addressCountry: 'NL',
  },
  areaServed: { '@type': 'State', name: 'Zuid-Holland' },
  priceRange: '€€',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${display.variable}`}>
      <head>
        <link rel="icon" href="/lkdakwerken/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
        <WhatsappFloat />
      </body>
    </html>
  );
}
