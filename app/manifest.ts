import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pratiksha Industries',
    short_name: 'Pratiksha',
    description:
      'ISO 9001:2015 certified manufacturer of cable tray systems, earthing products and instrumentation manifolds — Khed Shivapur, Pune.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F4EF',
    theme_color: '#0A3E48',
    icons: [
      { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
