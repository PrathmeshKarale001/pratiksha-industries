'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';
import EnquiryModal from '@/components/EnquiryModal';
import { type Product } from '@/content/products';
import { useReveal } from '@/lib/hooks';

interface ClientProps {
  p: Product;
  categoryName: string;
  categoryShort: string;
}

export default function ProductDetailClient({ p, categoryName, categoryShort }: ClientProps) {
  useReveal();

  const [quote, setQuote] = useState<{ tag: string; title: string; subject?: string } | null>(null);
  const openQuote = useCallback(() => setQuote({ tag: 'ITEM ENQUIRY', title: p.name, subject: p.name }), [p.name]);
  const closeQuote = useCallback(() => setQuote(null), []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Helvetica, sans-serif", color: '#16211F', background: '#F6F4EF', overflowX: 'clip' }}>
      
      <a data-skip="1" href="#details">Skip to product specifications</a>

      <Navbar mode="solid" compact={true} onQuote={openQuote} />

      <div id="details" data-wrap="1" style={{ maxWidth: '1240px', margin: '96px auto 0', padding: '40px 32px 96px' }}>
        
        {/* Back navigation link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#0A3E48',
              transition: 'transform 200ms ease'
            }}
            data-x="x15"
          >
            &larr; BACK TO ALL PRODUCTS
          </Link>
        </div>

        {/* Two-column visual layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
            borderRadius: '26px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(4,30,37,0.08)',
            background: '#FFFFFF',
            border: '1px solid rgba(10,62,72,0.08)'
          }}
        >
          {/* Left Column: Image plate & dimension ruler */}
          <div
            data-plate="1"
            style={{
              position: 'relative',
              backgroundColor: '#EFEDE6',
              backgroundImage:
                'linear-gradient(rgba(10,62,72,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(10,62,72,0.07) 1px, transparent 1px)',
              backgroundSize: '30px 30px, 30px 30px',
              overflow: 'hidden',
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-plate-img="1"
              src={`/${p.img}`}
              alt={p.name}
              style={{
                width: '74%',
                height: '74%',
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }}
            />

            {/* Dimension ruler drawing */}
            <div style={{ position: 'absolute', left: '10%', right: '10%', bottom: '56px', height: '1px', background: 'rgba(196,162,79,0.85)' }} />
            <div style={{ position: 'absolute', left: '10%', bottom: '50px', width: '1px', height: '13px', background: 'rgba(196,162,79,0.85)' }} />
            <div style={{ position: 'absolute', right: '10%', bottom: '50px', width: '1px', height: '13px', background: 'rgba(196,162,79,0.85)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '26px', textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11.5px', letterSpacing: '0.12em', color: '#0A3E48' }}>
              {p.dimW}
            </div>

            <div style={{ position: 'absolute', top: '26px', left: '26px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ background: '#0A3E48', color: '#F0DE9C', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', letterSpacing: '0.1em', padding: '7px 11px', borderRadius: '7px', width: 'fit-content' }}>
                {p.code}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.92)', color: '#0A3E48', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.15em', padding: '7px 11px', borderRadius: '7px', width: 'fit-content' }}>
                {categoryShort}
              </span>
            </div>

            <div style={{ position: 'absolute', right: '26px', top: '26px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11.5px', letterSpacing: '0.1em', color: '#6E756F' }}>
              {p.dimH}
            </div>
          </div>

          {/* Right Column: Spec sheet */}
          <div
            style={{
              background: '#0A3E48',
              color: '#FFFFFF',
              padding: '44px 44px 38px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '999px', padding: '6px 14px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', letterSpacing: '0.12em', color: '#F0DE9C', width: 'fit-content' }}>
              SPECIFICATIONS
            </div>

            <h1 style={{ margin: '18px 0 10px', fontSize: 'clamp(26px, 2.8vw, 36px)', lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.025em', color: '#FFFFFF' }}>
              {p.name}
            </h1>

            <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.62, color: 'rgba(255,255,255,0.85)' }}>
              {p.desc}
            </p>

            {/* Specifications parameters table */}
            <div style={{ marginTop: '28px' }}>
              {p.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '20px',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13.5px'
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}>{spec[0]}</span>
                  <span style={{ color: '#F0DE9C', fontWeight: 500, textAlign: 'right' }}>{spec[1]}</span>
                </div>
              ))}
            </div>

            {/* Finishes & Standards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px', marginTop: '26px' }}>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.48)' }}>
                  AVAILABLE IN
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                  {p.materials.map((mat) => (
                    <div key={mat} style={{ display: 'flex', alignItems: 'baseline', gap: '9px', fontSize: '13.5px', color: 'rgba(255,255,255,0.92)' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F0DE9C', flexShrink: 0, transform: 'translateY(-3px)' }} />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.48)' }}>
                  STANDARDS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                  {p.standards.map((std) => (
                    <div key={std} style={{ display: 'flex', alignItems: 'baseline', gap: '9px', fontSize: '13.5px', color: 'rgba(255,255,255,0.92)' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C4A24F', flexShrink: 0, transform: 'translateY(-3px)' }} />
                      <span>{std}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quotation CTA */}
            <button
              type="button"
              onClick={openQuote}
              style={{
                marginTop: '38px',
                fontFamily: 'inherit',
                cursor: 'pointer',
                border: 'none',
                background: '#F0DE9C',
                color: '#0A3E48',
                fontWeight: 700,
                fontSize: '14.5px',
                padding: '17px 24px',
                borderRadius: '13px',
                textAlign: 'center',
                transition: 'background 220ms, transform 220ms'
              }}
              data-x="x23"
            >
              Request a quotation for this item
            </button>
          </div>
        </div>
      </div>

      <SiteFooter onQuote={openQuote} />
      <MobileActionBar onQuote={openQuote} />

      <EnquiryModal
        open={!!quote}
        tag={quote?.tag ?? ''}
        title={quote?.title ?? ''}
        onClose={closeQuote}
        source={`product-detail:${p.id}`}
        subject={quote?.subject}
      />
    </div>
  );
}
