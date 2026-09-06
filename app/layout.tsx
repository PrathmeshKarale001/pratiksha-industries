import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { site } from '@/content/site';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans'
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono'
});

export const viewport: Viewport = {
  themeColor: '#0A3E48',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  /* ── Core ────────────────────────────────────────────────────────────── */
  title: {
    default: 'Pratiksha Industries — Cable Trays, Earthing & Instrumentation, Pune',
    template: '%s | Pratiksha Industries'
  },
  description:
    'ISO 9001:2015 certified manufacturer of cable tray systems, tray fittings, earthing products and instrumentation manifolds. 15,000 sq. ft. facility at Khed Shivapur, Pune — made to drawing, inspected at every stage.',
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  generator: 'Next.js',
  keywords: [
    'cable tray manufacturer Pune',
    'cable tray systems',
    'ladder cable tray',
    'perforated cable tray',
    'wire mesh cable tray',
    'raceway cable tray',
    'cable tray fittings',
    'cable tray accessories',
    'earthing products',
    'earthing strips',
    'earthing electrodes',
    'instrumentation manifolds',
    'cable glands',
    'Pratiksha Industries',
    'Khed Shivapur',
    'Pune manufacturer',
    'ISO 9001 cable tray',
    'industrial cable management',
    'cable tray supplier India',
    'hot dip galvanized cable tray'
  ],
  category: 'Industrial Manufacturing',
  classification: 'Cable Tray Systems & Electrical Components',

  /* ── Favicons ────────────────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: { url: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { rel: 'icon', url: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp) ──────────────────────── */
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
    url: site.url,
    title: 'Pratiksha Industries — Delivering Quality',
    description:
      'ISO 9001:2015 certified cable tray manufacturer in Pune. Cable trays, earthing, instrumentation — made to drawing, inspected at every stage.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1408,
        height: 768,
        alt: 'Pratiksha Industries — Cable Trays, Earthing & Instrumentation',
        type: 'image/jpeg'
      }
    ]
  },

  /* ── Twitter / X Card ───────────────────────────────────────────────── */
  twitter: {
    card: 'summary_large_image',
    title: 'Pratiksha Industries — Delivering Quality',
    description:
      'Cable tray systems, earthing products & instrumentation manifolds — ISO 9001:2015 certified, fabricated at Khed Shivapur, Pune.',
    images: [
      {
        url: '/assets/og-image.jpg',
        alt: 'Pratiksha Industries — Cable Trays, Earthing & Instrumentation'
      }
    ]
  },

  /* ── Robots / Crawl directives ──────────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  /* ── Verification (add IDs when available) ──────────────────────────── */
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_ID',
  // },

  /* ── Alternates ─────────────────────────────────────────────────────── */
  alternates: {
    canonical: '/'
  },

  /* ── Other ──────────────────────────────────────────────────────────── */
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Pune',
    'geo.position': '18.3814;73.7646',
    'ICBM': '18.3814, 73.7646'
  }
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/og-image.jpg`,
  logo: {
    '@type': 'ImageObject',
    url: `${site.url}/assets/icon-512.png`,
    width: 512,
    height: 512
  },
  description:
    'ISO 9001:2015 certified manufacturer of cable tray systems, cable tray fittings, earthing products and instrumentation manifolds at Khed Shivapur, Pune.',
  telephone: '+91-98508-45054',
  email: site.email,
  foundingDate: String(site.founded),
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '18.3814',
    longitude: '73.7646'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '18:30'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:30',
      closes: '14:00'
    }
  ],
  sameAs: [site.whatsapp],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cable Tray Systems & Industrial Products',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Cable Tray Systems' },
      { '@type': 'OfferCatalog', name: 'Cable Tray Fittings' },
      { '@type': 'OfferCatalog', name: 'Couplers & Supports' },
      { '@type': 'OfferCatalog', name: 'Earthing & Instrumentation' }
    ]
  }
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  description:
    'Official website of Pratiksha Industries — cable tray systems, earthing products and instrumentation manifolds manufacturer in Pune, India.',
  publisher: { '@id': `${site.url}/#organization` }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
