import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Pratiksha Industries — Cable Trays, Earthing & Instrumentation, Pune',
  description:
    'ISO 9001:2015 certified manufacturer of cable tray systems, tray fittings, earthing products and instrumentation manifolds. 15,000 sq. ft. facility at Khed Shivapur, Pune — made to drawing, inspected at every stage.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pratiksha Industries — Delivering Quality',
    description:
      'Cable tray systems, tray fittings, earthing products and instrumentation manifolds, fabricated at Khed Shivapur, Pune. ISO 9001:2015 certified.',
    url: site.url,
    images: [{ url: '/assets/og-image.jpg', width: 1408, height: 768, alt: 'Pratiksha Industries — Delivering Quality' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratiksha Industries — Delivering Quality',
    description: 'Cable trays, earthing & instrumentation — ISO 9001:2015 certified, Khed Shivapur, Pune.',
    images: [{ url: '/assets/og-image.jpg', alt: 'Pratiksha Industries' }]
  }
};

export default function Page() {
  return <HomePage />;
}
