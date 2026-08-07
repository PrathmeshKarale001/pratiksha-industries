'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/content/navigation';
import { useEnquiryModal } from './EnquiryModalProvider';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const { openEnquiry } = useEnquiryModal();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  /* ── glass / solid mode + compress on scroll ───────────────────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const pill = pillRef.current;
    if (!wrap || !pill) return;

    const mq = window.matchMedia('(max-width: 760px)');

    const onScroll = () => {
      const glassRef = document.querySelector('[data-glassref]');
      const mode = glassRef && glassRef.getBoundingClientRect().bottom > 86 ? 'glass' : 'solid';
      pill.setAttribute('data-mode', mode);

      const scrolled = (window.scrollY || 0) > 46;
      const sm = mq.matches;
      wrap.style.padding = scrolled
        ? sm ? '8px 8px 0' : '8px 10px 0'
        : sm ? '10px 10px 0' : '14px 14px 0';
      pill.style.padding = scrolled
        ? sm ? '7px 7px 7px 13px' : '7px 8px 7px 16px'
        : sm ? '8px 8px 8px 14px' : '10px 10px 10px 20px';
      pill.style.boxShadow = scrolled
        ? '0 16px 38px rgba(4,30,37,0.2)'
        : '0 8px 26px rgba(4,30,37,0.09)';
      pill.style.background = scrolled
        ? 'rgba(255,255,255,0.97)'
        : 'rgba(255,255,255,0.94)';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    mq.addEventListener?.('change', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener?.('change', onScroll);
    };
  }, []);

  /* ── mobile menu open/close ────────────────────────────────────────── */
  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      setClosing(true);
      setTimeout(() => {
        document.documentElement.style.overflow = '';
        setMenuOpen(false);
        setClosing(false);
      }, 220);
    } else {
      document.documentElement.style.overflow = 'hidden';
      setMenuOpen(true);
      setClosing(false);
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    if (!menuOpen) return;
    setClosing(true);
    setTimeout(() => {
      document.documentElement.style.overflow = '';
      setMenuOpen(false);
      setClosing(false);
    }, 220);
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <div
        ref={wrapRef}
        className="fixed top-0 left-0 right-0 z-[220] pointer-events-none"
        style={{ padding: '14px 14px 0', transition: 'padding 320ms cubic-bezier(0.22,1,0.36,1)' }}
      >
        <div
          ref={pillRef}
          data-navpill=""
          data-mode="solid"
          data-open={menuOpen}
          role="navigation"
          aria-label="Primary"
          className="pointer-events-auto mx-auto flex items-center border rounded-card"
          style={{
            maxWidth: '1520px',
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(18px) saturate(150%)',
            WebkitBackdropFilter: 'blur(18px) saturate(150%)',
            borderColor: 'rgba(10,62,72,0.07)',
            padding: '10px 10px 10px 20px',
            gap: 'clamp(10px, 1.5vw, 26px)',
            boxShadow: '0 8px 26px rgba(4,30,37,0.09)',
            transition: 'padding 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms, background 320ms',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 pr-[clamp(12px,1.6vw,22px)] border-r border-[rgba(10,62,72,0.12)] lg:border-r lg:pr-[clamp(12px,1.6vw,22px)] max-lg:border-r-0 max-lg:pr-0">
            <Image src="/images/logo.jpg" alt="Pratiksha Industries" width={38} height={38} className="rounded-full object-cover" priority />
            <span className="leading-[1.05]">
              <span data-logoname="" className="block text-[15px] font-extrabold tracking-[-0.01em] text-teal transition-colors duration-300">Pratiksha</span>
              <span data-logosub="" className="block text-[9.5px] font-semibold tracking-[0.22em] text-bronze-dark transition-colors duration-300">INDUSTRIES</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div data-navlinks="" className="flex-1 flex items-center justify-center gap-0.5 min-w-0 max-lg:hidden">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(active ? { 'aria-current': 'page' as const } : {})}
                  className="whitespace-nowrap rounded-pill text-sm font-medium transition-colors duration-[260ms]"
                  style={{
                    padding: '10px clamp(9px, 1.1vw, 16px)',
                    color: active ? '#FFFFFF' : '#16211F',
                    background: active ? '#0A3E48' : 'transparent',
                    fontWeight: active ? 600 : 500,
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = '#0A3E48'; e.currentTarget.style.color = '#FFFFFF'; }}}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16211F'; }}}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div data-navcta="" className="flex items-center gap-3.5 shrink-0 max-lg:hidden">
            <span data-iso="" className="flex items-center gap-2 text-[13px] font-medium text-mute whitespace-nowrap max-xl:hidden">
              <span className="w-[7px] h-[7px] rounded-full bg-bronze block" style={{ animation: 'pi-pulse 2.4s ease-in-out infinite' }} />
              ISO 9001:2015
            </span>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="cursor-pointer border-none bg-gold text-teal font-bold text-sm rounded-btn whitespace-nowrap shrink-0 transition-all hover:bg-teal hover:text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(4,30,37,0.24)]"
              style={{ padding: '14px 24px' }}
            >
              Get in Touch
            </button>
          </div>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="hidden max-lg:inline-flex ml-auto items-center justify-center w-[54px] h-[50px] rounded-btn border cursor-pointer shrink-0 transition-colors"
            style={{
              borderColor: menuOpen ? '#0A3E48' : 'rgba(10,62,72,0.18)',
              background: menuOpen ? '#0A3E48' : '#FFFFFF',
            }}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round">
                <path d="M3 3l14 14M17 3L3 17" />
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="#0A3E48" strokeWidth="1.9" strokeLinecap="round">
                <path d="M1 1h18M1 7h18M1 13h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <MobileMenu closing={closing} onClose={closeMenu} onEnquiry={() => { closeMenu(); setTimeout(() => openEnquiry(), 240); }} />
      )}
    </>
  );
}
