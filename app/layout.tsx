import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const display = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html lang="nl" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
