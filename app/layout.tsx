import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
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
  title: {
    default: 'Pratiksha Industries — Cable Trays, Earthing & Instrumentation, Pune',
    template: '%s | Pratiksha Industries'
  },
  description:
    'ISO 9001:2015 manufacturer of cable tray systems, tray fittings, earthing products and instrumentation manifolds. 15,000 sq. ft. facility at Khed Shivapur, Pune — made to drawing, inspected at every stage.',
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image', images: ['/assets/og-image.png'] },
  icons: { icon: '/assets/favicon.png', apple: '/assets/favicon.png' }
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/og-image.png`,
  logo: `${site.url}/assets/favicon.png`,
  description:
    'Manufacturer of cable tray systems, cable tray fittings, earthing products and instrumentation manifolds at Khed Shivapur, Pune.',
  telephone: '+91-98508-45054',
  email: site.email,
  foundingDate: String(site.founded),
  priceRange: '$$',
  areaServed: 'IN',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country
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
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
