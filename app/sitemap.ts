import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { PRODUCTS } from '@/content/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 }
  ];

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${site.url}/products/${p.id}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6
  }));

  return [...pages, ...products];
}
