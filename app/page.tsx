import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Pratiksha Industries — Cable Trays, Earthing & Instrumentation, Pune',
  description:
    'ISO 9001:2015 manufacturer of cable tray systems, tray fittings, earthing products and instrumentation manifolds. 15,000 sq. ft. facility at Khed Shivapur, Pune — made to drawing, inspected at every stage.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pratiksha Industries — Delivering Quality',
    description:
      'Cable tray systems, tray fittings, earthing products and instrumentation manifolds, fabricated at Khed Shivapur, Pune.',
    url: site.url
  }
};

export default function Page() {
  return <HomePage />;
}
