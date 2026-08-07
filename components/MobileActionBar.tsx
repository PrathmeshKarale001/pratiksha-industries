'use client';

import Link from 'next/link';
import { site } from '@/content/site';

const outline: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50px',
  borderRadius: '14px',
  border: '1px solid rgba(10,62,72,0.18)',
  fontSize: '14.5px',
  fontWeight: 600,
  color: '#0A3E48',
  transition: 'transform 200ms cubic-bezier(0.34,1.5,0.64,1), background 200ms'
};

const solid: React.CSSProperties = {
  fontFamily: 'inherit',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50px',
  borderRadius: '14px',
  background: '#0A3E48',
  color: '#FFFFFF',
  fontSize: '14.5px',
  fontWeight: 700,
  transition: 'transform 200ms cubic-bezier(0.34,1.5,0.64,1)'
};

/** Fixed Call / WhatsApp / Enquiry bar. Visible below 980px only (see globals.css). */
export default function MobileActionBar({ onQuote }: { onQuote?: () => void }) {
  return (
    <div
      data-mobilebar="1"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        gridTemplateColumns: '1fr 1fr 1.3fr',
        gap: '8px',
        padding: '9px 12px calc(9px + env(safe-area-inset-bottom))',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(10,62,72,0.14)'
      }}
    >
      <a href={site.phoneHref} data-x="barbtn" style={outline}>
        Call
      </a>
      <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" data-x="barbtn" style={outline}>
        WhatsApp
      </a>
      {onQuote ? (
        <button type="button" onClick={onQuote} data-x="barcta" style={solid}>
          Send enquiry
        </button>
      ) : (
        <Link href="/contact#enquiry" data-x="barcta" style={solid}>
          Send enquiry
        </Link>
      )}
    </div>
  );
}
