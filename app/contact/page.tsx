import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact — Send a Drawing, Get a Real Date',
  description:
    'Send a GA drawing, BOQ or your widths and lengths — we reply with sizes, finish options and a delivery date, typically within two working days. Khed Shivapur, Pune. +91 98508 45054.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Pratiksha Industries — Send the Drawing, Get a Real Date',
    description:
      'Share your GA drawing or BOQ. We reply with sizes, finish options and a delivery date within two working days. Khed Shivapur, Pune.',
    url: `${site.url}/contact`,
    images: [{ url: '/assets/og-image.jpg', width: 1408, height: 768, alt: 'Contact Pratiksha Industries' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Pratiksha Industries',
    description: 'Send the drawing. Get a real date. Cable trays, earthing & instrumentation, Pune. +91 98508 45054.',
    images: [{ url: '/assets/og-image.jpg', alt: 'Contact Pratiksha Industries' }]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${site.url}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: site.name,
    telephone: '+91-98508-45054',
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country
    }
  }
};

export default function Page() {
  return (
    <>
      <ContactPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
