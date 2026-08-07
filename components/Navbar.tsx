'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, site } from '@/content/site';
import { useLockScroll, useEscape } from '@/lib/hooks';

type Props = {
  /** 'glass' over a dark hero, 'solid' once it has scrolled past. */
  mode: 'glass' | 'solid';
  compact: boolean;
  onQuote?: () => void;
};

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : href.startsWith('/') && !href.includes('#') && pathname.startsWith(href);

export default function Navbar({ mode, compact, onQuote }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useLockScroll(open);
  useEscape(open, close);

  const wrapPad = compact ? '10px 14px 0' : '14px 14px 0';
  const pillPad = compact ? '6px 10px 6px 16px' : '10px 10px 10px 20px';

  return (
    <>
      <div
        data-navwrap="1"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 220,
          padding: wrapPad,
          pointerEvents: 'none',
          transition: 'padding 320ms cubic-bezier(0.22,1,0.36,1)'
        }}
      >
        <div
          data-nav="1"
          data-navpill="1"
          data-mode={mode}
          data-open={open ? 'true' : 'false'}
          role="navigation"
          aria-label="Primary"
          style={{
            pointerEvents: 'auto',
            maxWidth: '1520px',
            margin: '0 auto',
            background: compact ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(18px) saturate(150%)',
            WebkitBackdropFilter: 'blur(18px) saturate(150%)',
            border: '1px solid rgba(10,62,72,0.07)',
            borderRadius: '18px',
            padding: pillPad,
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(10px, 1.5vw, 26px)',
            boxShadow: compact ? '0 16px 38px rgba(4,30,37,0.2)' : '0 8px 26px rgba(4,30,37,0.09)',
            transition: 'padding 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms, background 320ms'
          }}
        >
          <Link
            data-logo="1"
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingRight: 'clamp(12px, 1.6vw, 22px)',
              borderRight: '1px solid rgba(10,62,72,0.12)',
              flexShrink: 0
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.jpg"
              alt="Pratiksha Industries"
              width={38}
              height={38}
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
            <span style={{ lineHeight: 1.05 }}>
              <span
                data-logoname="1"
                style={{ display: 'block', fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em', color: '#0A3E48' }}
              >
                Pratiksha
              </span>
              <span
                data-logosub="1"
                style={{ display: 'block', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.22em', color: '#8A6A1F' }}
              >
                INDUSTRIES
              </span>
            </span>
          </Link>

          <div
            data-navlinks="1"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              minWidth: 0
            }}
          >
            {nav.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  style={{
                    padding: '10px clamp(9px, 1.1vw, 16px)',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#FFFFFF' : '#16211F',
                    background: active ? '#0A3E48' : 'transparent',
                    whiteSpace: 'nowrap',
                    transition: 'background 260ms, color 260ms'
                  }}
                  data-x={active ? undefined : 'navlink'}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div data-navcta="1" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <span
              data-iso="1"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#6E756F',
                whiteSpace: 'nowrap'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#C4A24F',
                  display: 'block',
                  animation: 'pi-pulse 2.4s ease-in-out infinite'
                }}
              />
              {site.certification}
            </span>
            {onQuote ? (
              <button
                type="button"
                onClick={onQuote}
                data-x="navcta"
                style={{
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  border: 'none',
                  background: '#F0DE9C',
                  color: '#0A3E48',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '14px 24px',
                  borderRadius: '14px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'transform 240ms cubic-bezier(0.34,1.56,0.64,1), background 240ms, box-shadow 240ms'
                }}
              >
                Get in Touch
              </button>
            ) : (
              <Link
                href="/contact#enquiry"
                data-x="navcta"
                style={{
                  background: '#F0DE9C',
                  color: '#0A3E48',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '14px 24px',
                  borderRadius: '14px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'transform 240ms cubic-bezier(0.34,1.56,0.64,1), background 240ms, color 240ms'
                }}
              >
                Get in Touch
              </Link>
            )}
          </div>

          <button
            type="button"
            data-navbtn="1"
            onClick={() => (open ? close() : setOpen(true))}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="primary-menu"
            style={{
              fontFamily: 'inherit',
              marginLeft: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              width: '54px',
              height: '50px',
              borderRadius: '14px',
              border: '1px solid rgba(10,62,72,0.18)',
              background: '#FFFFFF',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 260ms, border-color 260ms'
            }}
          >
            <svg data-navicon="bars" width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="#0A3E48" strokeWidth="1.9" strokeLinecap="round">
              <path d="M1 1h18M1 7h18M1 13h18" />
            </svg>
            <svg data-navicon="x" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round">
              <path d="M3 3l14 14M17 3L3 17" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div data-navsheet="1" style={{ position: 'fixed', inset: 0, zIndex: 210 }}>
            <motion.div
              data-navscrim="1"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(4,30,37,0.62)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)'
              }}
            />
            <motion.div
              id="primary-menu"
              data-navpanel="1"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                maxHeight: '100%',
                overflowY: 'auto',
                background: '#FFFFFF',
                borderRadius: '0 0 26px 26px',
                padding: '90px 14px 22px',
                boxShadow: '0 30px 70px rgba(4,30,37,0.34)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {nav.map((l, i) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.42, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={l.href}
                        data-navitem="1"
                        data-x="navitem"
                        onClick={close}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '14px',
                          minHeight: '58px',
                          padding: '0 16px',
                          borderRadius: '14px',
                          fontSize: '17px',
                          fontWeight: 600,
                          letterSpacing: '-0.015em',
                          color: active ? '#0A3E48' : '#16211F',
                          background: active ? '#F6F4EF' : 'transparent'
                        }}
                      >
                        {l.label}
                        <span style={{ fontSize: '16px', color: active ? '#8A6A1F' : '#8AA7AC' }}>&#8594;</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                data-navcontact="1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.44, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(10,62,72,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <a
                    href={site.phoneHref}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '52px',
                      borderRadius: '14px',
                      border: '1px solid rgba(10,62,72,0.18)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#0A3E48'
                    }}
                  >
                    Call the works
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '52px',
                      borderRadius: '14px',
                      border: '1px solid rgba(10,62,72,0.18)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#0A3E48'
                    }}
                  >
                    WhatsApp
                  </a>
                </div>

                {onQuote ? (
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      onQuote();
                    }}
                    style={{
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '56px',
                      borderRadius: '14px',
                      background: '#0A3E48',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontWeight: 700
                    }}
                  >
                    Send an enquiry
                  </button>
                ) : (
                  <Link
                    href="/contact#enquiry"
                    onClick={close}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '56px',
                      borderRadius: '14px',
                      background: '#0A3E48',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontWeight: 700
                    }}
                  >
                    Send an enquiry
                  </Link>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', color: '#6E756F' }}>
                    {site.certification}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', color: '#8A6A1F' }}>
                    KHED SHIVAPUR, PUNE
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
