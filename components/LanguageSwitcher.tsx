'use client';

/*
 * LanguageSwitcher — lightweight i18n widget for Pratiksha Industries.
 *
 * Integrates Google Translate's Element API to translate the page on-the-fly.
 * This keeps the bundle light (no server-side i18n framework needed) while
 * giving visitors a working multi-language experience.
 *
 * Sits beside the ISO certification badge in the Navbar.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'HI', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', label: 'MR', name: 'मराठी', flag: '🇮🇳' },
  { code: 'ja', label: 'JA', name: '日本語', flag: '🇯🇵' },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'id', label: 'ID', name: 'Bahasa', flag: '🇮🇩' },
] as const;

type LangCode = (typeof languages)[number]['code'];

/**
 * Injects the Google Translate Element JS once and initializes the hidden
 * widget.  We drive it programmatically via the undocumented `doTranslate`
 * helper (standard practice — the public Element API has no setter).
 */
function useGoogleTranslate() {
  const readyRef = useRef(false);

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;

    // 1. Insert hidden container for the Google widget
    const container = document.createElement('div');
    container.id = 'google_translate_element';
    container.style.display = 'none';
    document.body.appendChild(container);

    // 2. Init callback
    (window as unknown as Record<string, unknown>).googleTranslateElementInit = () => {
      // @ts-expect-error google.translate is loaded dynamically
      new google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    // 3. Inject the script
    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const translate = useCallback((langCode: LangCode) => {
    if (langCode === 'en') {
      // Reset to original language
      const iframe = document.querySelector<HTMLIFrameElement>(
        '.goog-te-banner-frame'
      );
      if (iframe) {
        const btn =
          iframe.contentDocument?.querySelector<HTMLButtonElement>(
            '.goog-close-link'
          );
        btn?.click();
      }
      // Also try cookie reset
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' +
        window.location.hostname;
      window.location.reload();
      return;
    }
    // Set the translate cookie and trigger
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname};`;
    // Try to use the select element Google injects
    const select = document.querySelector<HTMLSelectElement>(
      '.goog-te-combo'
    );
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // If widget not ready yet, reload with cookie set
      window.location.reload();
    }
  }, []);

  return translate;
}

interface LanguageSwitcherProps {
  /** Whether to render the compact (icon-only) version for tight spaces */
  compact?: boolean;
}

export default function LanguageSwitcher({ compact }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LangCode>('en');
  const dropRef = useRef<HTMLDivElement>(null);
  const translate = useGoogleTranslate();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Detect current language from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    if (match && match[1]) {
      const found = languages.find((l) => l.code === match[1]);
      if (found) setCurrent(found.code);
    }
  }, []);

  const handleSelect = (code: LangCode) => {
    setCurrent(code);
    setOpen(false);
    translate(code);
  };

  const currentLang = languages.find((l) => l.code === current) ?? languages[0];

  return (
    <div
      ref={dropRef}
      data-langswitcher="1"
      style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Language: ${currentLang.name}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          fontFamily: 'inherit',
          cursor: 'pointer',
          border: '1px solid rgba(10, 62, 72, 0.15)',
          borderRadius: '10px',
          background: open ? 'rgba(10, 62, 72, 0.06)' : 'transparent',
          padding: compact ? '6px 8px' : '7px 12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          fontWeight: 600,
          color: '#0A3E48',
          whiteSpace: 'nowrap',
          transition: 'background 200ms, border-color 200ms',
        }}
      >
        <span style={{ fontSize: '15px', lineHeight: 1 }}>
          {currentLang.flag}
        </span>
        <span>{currentLang.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 240ms ease',
          }}
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: '180px',
            background: '#FFFFFF',
            border: '1px solid rgba(10, 62, 72, 0.12)',
            borderRadius: '14px',
            boxShadow: '0 12px 36px rgba(4, 30, 37, 0.18)',
            padding: '6px',
            zIndex: 300,
            animation: 'pi-lang-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          {languages.map((lang) => {
            const active = lang.code === current;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => handleSelect(lang.code)}
                style={{
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  border: 'none',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#0A3E48' : '#4A524E',
                  background: active ? 'rgba(240, 222, 156, 0.22)' : 'transparent',
                  transition: 'background 180ms, color 180ms',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'rgba(10, 62, 72, 0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '17px', lineHeight: 1 }}>{lang.flag}</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{lang.name}</span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    color: active ? '#8A6A1F' : '#8AA7AC',
                  }}
                >
                  {lang.label}
                </span>
                {active && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#8A6A1F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes pi-lang-in {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
