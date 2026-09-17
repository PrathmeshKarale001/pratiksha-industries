'use client';

import Link from 'next/link';
import Image from 'next/image';
import { site, footerLinks } from '@/content/site';
import { prefersReducedMotion } from '@/lib/hooks';

const mailLink: React.CSSProperties = {
  fontSize: '23px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#F0DE9C',
  overflowWrap: 'anywhere',
  transition: 'color 240ms'
};

const chip: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '12.5px',
  color: 'rgba(255,255,255,0.85)',
  transition: 'border-color 240ms, color 240ms'
};

export default function SiteFooter({ onQuote }: { onQuote?: () => void }) {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  return (
    <div
      data-footroot="1"
      data-mobilepad="1"
      style={{ position: 'relative', padding: '96px 0 0', background: '#0A3E48', overflow: 'hidden' }}
    >
      <Image
        src="/images/factory-dusk.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', opacity: 0.42 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,62,72,0.62) 0%, rgba(10,62,72,0.94) 65%)',
          pointerEvents: 'none'
        }}
      />

      <div data-footwrap="1" style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '0 32px 34px' }}>
        <div
          data-bigword="1"
          style={{
            fontSize: 'clamp(78px, 12.5vw, 178px)',
            lineHeight: 0.8,
            fontWeight: 700,
            letterSpacing: '-0.045em',
            color: '#F0DE9C',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          Pratiksha
        </div>

        <div
          data-foot="1"
          style={{
            position: 'relative',
            marginTop: '-34px',
            background: 'rgba(10,62,72,0.6)',
            backdropFilter: 'blur(22px) saturate(140%)',
            WebkitBackdropFilter: 'blur(22px) saturate(140%)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '20px',
            padding: '44px 48px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.75fr) minmax(0, 1.1fr)',
            gap: '48px',
            color: '#FFFFFF'
          }}
        >
          <div data-footcol="1" style={{ paddingRight: '40px', borderRight: '1px solid rgba(255,255,255,0.16)' }}>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '250px' }}>
              Precision in fabrication. Control at every stage. Delivery you can plan around.
            </p>
            <div style={{ marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
              <a href={site.emailHref} data-mail="1" data-x="footmail" style={mailLink}>
                {site.email}
              </a>
              <a href={site.phoneHref} data-mail="1" data-x="footmail" style={mailLink}>
                {site.phone}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
              {/* TODO(client): replace with the company's real profile URLs. */}
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener" data-x="footchip" style={chip}>
                LinkedIn
              </a>
              <a href="https://www.indiamart.com/" target="_blank" rel="noreferrer noopener" data-x="footchip" style={chip}>
                IndiaMART
              </a>
              <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" data-x="footchip" style={chip}>
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '18px' }}>Useful Links</div>
            <div data-footlinks="1" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '11px', fontSize: '14.5px' }}>
              {footerLinks.map((l) => (
                <Link key={l.href} href={l.href} data-x="footlink" style={{ color: 'rgba(255,255,255,0.8)', padding: '2px 0', transition: 'color 240ms' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '18px' }}>Send an Enquiry</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              <span style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)' }}>
                Drawings, sizes or bill of quantities &mdash; send them through the form and we will price them.
              </span>
              {onQuote ? (
                <button type="button" onClick={onQuote} data-x="footcta" style={ctaStyle}>
                  <span style={dot} />
                  Open the enquiry form
                </button>
              ) : (
                <Link href="/contact#enquiry" data-x="footcta" style={ctaStyle}>
                  <span style={dot} />
                  Open the enquiry form
                </Link>
              )}
            </div>
            <p style={{ margin: '18px 0 0', fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)' }}>
              {site.address.street}, Dist. {site.address.locality} &ndash; {site.address.postalCode}
            </p>
            <a
              href={site.maps}
              target="_blank"
              rel="noreferrer noopener"
              data-x="footmaps"
              style={{ display: 'inline-block', marginTop: '12px', fontSize: '13.5px', fontWeight: 600, color: '#F0DE9C', transition: 'color 240ms' }}
            >
              Open in Maps &#8594;
            </a>
          </div>
        </div>

        <div
          data-footbottom="1"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            marginTop: '24px',
            fontSize: '12.5px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)'
          }}
        >
          <span>
            &copy; {new Date().getFullYear()} {site.name}. An {site.certification} certified manufacturer. All rights reserved.
          </span>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            data-x="foottop"
            style={{
              fontFamily: 'inherit',
              cursor: 'pointer',
              background: 'transparent',
              flexShrink: 0,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '15px',
              transition: 'border-color 240ms, color 240ms, transform 300ms'
            }}
          >
            &#8593;
          </button>
        </div>
      </div>
    </div>
  );
}

const ctaStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  cursor: 'pointer',
  border: 'none',
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  background: '#F0DE9C',
  color: '#0A3E48',
  fontWeight: 700,
  fontSize: '14.5px',
  padding: '16px 24px',
  borderRadius: '13px',
  transition: 'transform 240ms cubic-bezier(0.34,1.5,0.64,1), background 240ms'
};

const dot: React.CSSProperties = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: '#0A3E48',
  display: 'block'
};
