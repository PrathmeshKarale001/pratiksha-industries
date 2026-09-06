import type { Metadata } from 'next';
import ProductsPage from '@/components/pages/ProductsPage';
import { site } from '@/content/site';
import { PRODUCTS } from '@/content/products';

export const metadata: Metadata = {
  title: 'Product Index — Cable Trays, Fittings, Supports & Earthing',
  description:
    'Twenty catalogue items with full specifications: ladder, perforated, raceway and wire mesh cable trays, bends, tees, reducers, brackets, earthing electrodes and instrumentation manifolds. Widths 50–1000 mm, seven finishes.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Product Index — Every Part of the Run | Pratiksha Industries',
    description:
      'Cable trays, fittings, supports, earthing and instrumentation — drawn to your widths, gauges and finishes. 20+ catalogue items with full specifications.',
    url: `${site.url}/products`,
    images: [{ url: '/assets/og-image.jpg', width: 1408, height: 768, alt: 'Pratiksha Industries Product Index' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Index — Pratiksha Industries',
    description: 'Cable trays, fittings, earthing & instrumentation — 20+ items, widths 50–1000 mm, seven finishes.',
    images: [{ url: '/assets/og-image.jpg', alt: 'Pratiksha Industries Products' }]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${site.url}/products` }
  ]
};

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `${site.url}/products/${p.id}`
  }))
};

export default function Page() {
  return (
    <>
      <ProductsPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
