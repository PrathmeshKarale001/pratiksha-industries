import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact — Send a Drawing, Get a Real Date',
  description:
    'Send a GA drawing, BOQ or your widths and lengths — we reply with sizes, finish options and a delivery date, typically within two working days. Khed Shivapur, Pune. +91 98508 45054.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Pratiksha Industries',
    description:
      'Send the drawing. Get a real date. Cable trays, earthing and instrumentation from Khed Shivapur, Pune.',
    url: `${site.url}/contact`
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
