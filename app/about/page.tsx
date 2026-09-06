import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Pratiksha Industries — Cable Tray Manufacturer in Pune Since 2013',
  description:
    'Founded in 2013 by Mr. Pradeep Hatte, Pratiksha Industries fabricates cable trays, earthing hardware and instrumentation fittings in a 15,000 sq. ft. facility at Khed Shivapur, Pune. ISO 9001:2015 certified.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Pratiksha Industries — Thirteen Years, One Direction',
    description:
      'From one power press in 2013 to a 15,000 sq. ft. fabrication facility at Khed Shivapur, Pune. ISO 9001:2015 certified cable tray manufacturer.',
    url: `${site.url}/about`,
    images: [{ url: '/assets/og-image.jpg', width: 1408, height: 768, alt: 'About Pratiksha Industries' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Pratiksha Industries — Since 2013',
    description: 'From one power press to a 15,000 sq. ft. fabrication facility at Khed Shivapur, Pune.',
    images: [{ url: '/assets/og-image.jpg', alt: 'About Pratiksha Industries' }]
  }
};

export default function Page() {
  return <AboutPage />;
}
