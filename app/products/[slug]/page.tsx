import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATS, productBySlug } from '@/content/products';
import { site } from '@/content/site';
import ProductChrome from '@/components/pages/ProductChrome';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  const imgUrl = product.img.replace(/^assets\//, '/assets/');

  return {
    title: `${product.name} — ${CATS[product.cat].name}`,
    description: product.short,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} | Pratiksha Industries`,
      description: product.short,
      url: `${site.url}/products/${product.id}`,
      images: [{ url: imgUrl, alt: product.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Pratiksha Industries`,
      description: product.short,
      images: [{ url: imgUrl, alt: product.name }]
    }
  };
}

const asset = (p: string) => (p.startsWith('/') ? p : '/' + p);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const idx = PRODUCTS.findIndex((p) => p.id === product.id);
  const prev = PRODUCTS[(idx - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.code,
    description: product.desc,
    image: `${site.url}${asset(product.img)}`,
    category: CATS[product.cat].name,
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: site.name, url: site.url },
    material: product.materials.join(', '),
    additionalProperty: product.specs.map(([k, v]) => ({
      '@type': 'PropertyValue',
      name: k,
      value: v
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      url: `${site.url}/products/${product.id}`,
      seller: { '@type': 'Organization', name: site.name }
    }
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${site.url}/products` },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${site.url}/products/${product.id}`
      }
    ]
  };

  return (
    <ProductChrome heroHeight={560}>
      <div style={{ padding: '14px 14px 0' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '22px',
            background: '#072B33',
            backgroundImage:
              'linear-gradient(rgba(240,222,156,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(240,222,156,0.055) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        >
          <div data-heroinner="1" style={{ position: 'relative', zIndex: 3, padding: '130px 48px 48px' }}>
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11.5px',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.62)',
                flexWrap: 'wrap'
              }}
            >
              <Link href="/products" style={{ color: '#F0DE9C' }}>
                PRODUCT INDEX
              </Link>
              <span>/</span>
              <span>{CATS[product.cat].short}</span>
              <span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>{product.code}</span>
            </nav>

            <div
              data-detailgrid="1"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
                gap: 'clamp(28px, 4vw, 64px)',
                alignItems: 'center',
                marginTop: '34px'
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 'clamp(38px, 5.2vw, 76px)',
                    lineHeight: 0.95,
                    fontWeight: 700,
                    letterSpacing: '-0.045em',
                    color: '#FFFFFF'
                  }}
                >
                  {product.name}
                </h1>
                <p
                  style={{
                    margin: '22px 0 0',
                    maxWidth: '34em',
                    fontSize: '16.5px',
                    lineHeight: 1.62,
                    color: 'rgba(255,255,255,0.86)'
                  }}
                >
                  {product.desc}
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '30px' }}>
                  <Link
                    href="/contact#enquiry"
                    data-x="detailcta"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '11px',
                      background: '#F0DE9C',
                      color: '#0A3E48',
                      fontWeight: 700,
                      fontSize: '15px',
                      padding: '19px 30px',
                      borderRadius: '14px',
                      transition: 'transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms'
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0A3E48', display: 'block' }} />
                    Enquire about this item
                  </Link>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-x="detailghost"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.32)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '15px',
                      padding: '19px 30px',
                      borderRadius: '14px',
                      transition: 'border-color 260ms, color 260ms'
                    }}
                  >
                    WhatsApp the works
                  </a>
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  aspectRatio: '1.24'
                }}
              >
                <Image
                  src={asset(product.img)}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 560px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-wrap="1" style={{ maxWidth: '1240px', margin: '0 auto', padding: '72px 32px 0' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '12px',
            letterSpacing: '0.14em',
            color: '#8A6A1F'
          }}
        >
          SPECIFICATIONS
        </div>
        <dl
          data-specgrid="1"
          style={{
            margin: '22px 0 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '0 40px'
          }}
        >
          {product.specs.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '18px',
                padding: '17px 0',
                borderBottom: '1px solid rgba(10,62,72,0.12)'
              }}
            >
              <dt style={{ fontSize: '13.5px', fontWeight: 600, letterSpacing: '0.06em', color: '#6E756F' }}>{k}</dt>
              <dd style={{ margin: 0, fontSize: '15.5px', fontWeight: 600, color: '#16211F', textAlign: 'right' }}>{v}</dd>
            </div>
          ))}
        </dl>

        <p style={{ margin: '20px 0 0', maxWidth: '60em', fontSize: '13.5px', lineHeight: 1.62, color: '#5B6167' }}>
          Coating grade, load class and dimensional tolerance are confirmed per order against the
          applicable standard and the drawing supplied &mdash; the test and inspection records travel
          with the batch.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '16px',
            marginTop: '44px'
          }}
        >
          <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '28px 30px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', color: '#8A6A1F' }}>FINISHES</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '18px' }}>
              {product.materials.map((m) => (
                <span
                  key={m}
                  style={{
                    border: '1px solid rgba(10,62,72,0.16)',
                    borderRadius: '999px',
                    padding: '9px 15px',
                    fontSize: '13.5px',
                    color: '#16211F'
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#0A3E48', borderRadius: '18px', padding: '28px 30px', color: '#FFFFFF' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', color: '#F0DE9C' }}>STANDARDS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '18px' }}>
              {product.standards.map((s) => (
                <span key={s} style={{ fontSize: '15.5px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {s}
                </span>
              ))}
            </div>
            <p style={{ margin: '18px 0 0', fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
              {product.dimW} &nbsp;·&nbsp; {product.dimH}
            </p>
          </div>
        </div>

        <nav
          data-detailnav="1"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '14px',
            margin: '56px 0 0',
            paddingTop: '28px',
            borderTop: '1px solid rgba(10,62,72,0.12)'
          }}
        >
          <Link href={`/products/${prev.id}`} data-x="detailnav" style={navCard}>
            <span style={navLabel}>&#8592; PREVIOUS</span>
            <span style={navName}>{prev.name}</span>
          </Link>
          <Link href={`/products/${next.id}`} data-x="detailnav" style={{ ...navCard, textAlign: 'right', alignItems: 'flex-end' }}>
            <span style={navLabel}>NEXT &#8594;</span>
            <span style={navName}>{next.name}</span>
          </Link>
        </nav>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </ProductChrome>
  );
}

const navCard: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: '1 1 0',
  minWidth: 0,
  padding: '20px 22px',
  borderRadius: '16px',
  border: '1px solid rgba(10,62,72,0.12)',
  transition: 'border-color 240ms, transform 240ms cubic-bezier(0.34,1.5,0.64,1)'
};

const navLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono), monospace',
  fontSize: '11.5px',
  letterSpacing: '0.14em',
  color: '#8A6A1F'
};

const navName: React.CSSProperties = {
  fontSize: '17px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#16211F'
};
