'use client';

import Link from 'next/link';
import Image from 'next/image';
import { COMPANY } from '@/lib/constants';
import { useEnquiryModal } from './EnquiryModalProvider';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Capability', href: '/#process' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Catalogue', href: '/#catalogue' },
  { label: 'Quality Control', href: '/#quality' },
  { label: 'How to Order', href: '/#ordering' },
  { label: 'Contact', href: '/contact' },
];

export function SiteFooter() {
  const { openEnquiry } = useEnquiryModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <footer id="contact" style={{ position: 'relative', paddingTop: '96px', background: '#0A3E48', overflow: 'hidden' }}>
      {/* Background image */}
      <Image
        src="/images/factory-dusk.png"
        alt=""
        aria-hidden
        fill
        style={{ objectFit: 'cover', opacity: 0.42 }}
      />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,62,72,0.62) 0%, rgba(10,62,72,0.94) 65%)',
        pointerEvents: 'none',
      }} />

      <div data-footwrap="" style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '0 32px 34px' }}>
        {/* Giant wordmark */}
        <div data-bigword="" style={{
          fontSize: 'clamp(78px, 12.5vw, 178px)',
          lineHeight: 0.8, fontWeight: 700,
          letterSpacing: '-0.045em', color: '#F0DE9C',
          textAlign: 'center', whiteSpace: 'nowrap',
          userSelect: 'none', pointerEvents: 'none',
        }}>
          Pratiksha
        </div>

        {/* Glass card — 3 columns */}
        <div data-foot="" style={{
          position: 'relative', marginTop: '-34px',
          background: 'rgba(10,62,72,0.6)',
          backdropFilter: 'blur(22px) saturate(140%)',
          WebkitBackdropFilter: 'blur(22px) saturate(140%)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '20px', padding: '44px 48px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.75fr) minmax(0, 1.1fr)',
          gap: '48px', color: '#FFFFFF',
        }}>
          {/* Column 1: Tagline + Contact + Socials */}
          <div data-footcol="" style={{ paddingRight: '40px', borderRight: '1px solid rgba(255,255,255,0.16)' }}>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '250px' }}>
              Precision in fabrication. Control at every stage. Delivery you can plan around.
            </p>
            <div style={{ marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
              <a
                href={`mailto:${COMPANY.email}`}
                data-mail=""
                className="hover:text-white"
                style={{ overflowWrap: 'anywhere', fontSize: '23px', fontWeight: 700, letterSpacing: '-0.02em', color: '#F0DE9C', transition: 'color 240ms' }}
              >
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.phoneHref}
                data-mail=""
                className="hover:text-white"
                style={{ fontSize: '23px', fontWeight: 700, letterSpacing: '-0.02em', color: '#F0DE9C', transition: 'color 240ms' }}
              >
                {COMPANY.phone}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
                { label: 'IndiaMART', href: 'https://www.indiamart.com/' },
                { label: 'WhatsApp', href: COMPANY.whatsapp },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:border-gold hover:text-gold"
                  style={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px', padding: '10px 14px',
                    fontSize: '12.5px', color: 'rgba(255,255,255,0.85)',
                    transition: 'border-color 240ms, color 240ms',
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <div style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '18px' }}>
              Useful Links
            </div>
            <div data-footlinks="" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '11px', fontSize: '14.5px' }}>
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-gold"
                  style={{ color: 'rgba(255,255,255,0.8)', padding: '2px 0', transition: 'color 240ms' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Send an Enquiry + Address */}
          <div>
            <div style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '18px' }}>
              Send an Enquiry
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              <span style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)' }}>
                Drawings, sizes or bill of quantities &mdash; send them through the form and we will price them.
              </span>
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="cursor-pointer border-none hover:bg-white hover:-translate-y-0.5 active:scale-[0.97]"
                style={{
                  fontFamily: 'inherit', alignSelf: 'flex-start',
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: '#F0DE9C', color: '#0A3E48',
                  fontWeight: 700, fontSize: '14.5px',
                  padding: '16px 24px', borderRadius: '13px',
                  transition: 'transform 240ms cubic-bezier(0.34,1.5,0.64,1), background 240ms',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0A3E48', display: 'block' }} />
                Open the enquiry form
              </button>
            </div>
            <p style={{ margin: '18px 0 0', fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)' }}>
              {COMPANY.address.full}
            </p>
            <a
              href={COMPANY.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white"
              style={{ display: 'inline-block', marginTop: '12px', fontSize: '13.5px', fontWeight: 600, color: '#F0DE9C', transition: 'color 240ms' }}
            >
              Open in Maps →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div data-footbottom="" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '24px',
          marginTop: '24px', fontSize: '12.5px',
          lineHeight: 1.6, color: 'rgba(255,255,255,0.55)',
        }}>
          <span>© {new Date().getFullYear()} Pratiksha Industries. An ISO 9001:2015 certified manufacturer. All rights reserved.</span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="cursor-pointer hover:border-gold hover:text-gold hover:-translate-y-[3px]"
            style={{
              fontFamily: 'inherit', background: 'transparent',
              flexShrink: 0, width: '44px', height: '44px',
              borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.8)', fontSize: '15px',
              transition: 'border-color 240ms, color 240ms, transform 300ms',
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
