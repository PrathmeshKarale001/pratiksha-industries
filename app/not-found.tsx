import Link from 'next/link';
import ProductChrome from '@/components/pages/ProductChrome';

export default function NotFound() {
  return (
    <ProductChrome>
      <div
        data-wrap="1"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '150px 32px 90px',
          minHeight: '62vh'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11.5px',
            letterSpacing: '0.16em',
            color: '#8A6A1F'
          }}
        >
          ERROR 404
        </div>
        <h1
          style={{
            margin: '18px 0 0',
            maxWidth: '14em',
            fontSize: 'clamp(38px, 5.4vw, 84px)',
            lineHeight: 0.98,
            fontWeight: 700,
            letterSpacing: '-0.045em',
            color: '#16211F'
          }}
        >
          That run doesn&rsquo;t go anywhere.
        </h1>
        <p style={{ margin: '20px 0 0', maxWidth: '34em', fontSize: '16.5px', lineHeight: 1.65, color: '#4A524E' }}>
          The page you asked for isn&rsquo;t here. The product index is the best place to pick up
          the thread &mdash; or call the works and we will find what you need.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '32px' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '11px',
              background: '#0A3E48',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              padding: '19px 30px',
              borderRadius: '14px'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F0DE9C', display: 'block' }} />
            Browse the product index
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid rgba(10,62,72,0.2)',
              color: '#0A3E48',
              fontWeight: 600,
              fontSize: '15px',
              padding: '19px 30px',
              borderRadius: '14px'
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </ProductChrome>
  );
}
