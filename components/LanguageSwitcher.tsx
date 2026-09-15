'use client';

/*
 * LanguageSwitcher — cross-browser i18n widget for Pratiksha Industries.
 *
 * Translation strategy:
 *  - Chrome / Edge / Firefox → Google Translate Element API (native widget, seamless)
 *  - Safari / all others     → /api/translate proxy (server-side GTX call, no CORS)
 *
 * The /api/translate route calls translate.googleapis.com from the Next.js server,
 * completely bypassing Safari's ITP and all browser CORS restrictions.
 * Result: consistent multi-language experience on every browser and device.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'EN', name: 'English',   flag: '🇬🇧' },
  { code: 'hi', label: 'HI', name: 'हिन्दी',    flag: '🇮🇳' },
  { code: 'mr', label: 'MR', name: 'मराठी',     flag: '🇮🇳' },
  { code: 'ar', label: 'AR', name: 'العربية',   flag: '🇸🇦' },
  { code: 'ja', label: 'JA', name: '日本語',     flag: '🇯🇵' },
  { code: 'de', label: 'DE', name: 'Deutsch',   flag: '🇩🇪' },
  { code: 'es', label: 'ES', name: 'Español',   flag: '🇪🇸' },
  { code: 'id', label: 'ID', name: 'Bahasa',    flag: '🇮🇩' },
] as const;

type LangCode = (typeof languages)[number]['code'];

// ─── Detect Safari ──────────────────────────────────────────────────────────
function isSafariBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

// ─── DOM text-node helpers ────────────────────────────────────────────────────
// Stores originals so we can fully restore on switch back to English
const originals = new Map<Text, string>();

function collectTextNodes(): Text[] {
  const skipTags = new Set([
    'script', 'style', 'noscript', 'code', 'pre',
    'input', 'textarea', 'select', 'button',
  ]);

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (skipTags.has(parent.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
        // Skip anything inside the language switcher widget itself
        if (parent.closest('[data-langswitcher]')) return NodeFilter.FILTER_REJECT;
        // Skip hidden elements
        const style = window.getComputedStyle(parent);
        if (style.display === 'none' || style.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const nodes: Text[] = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n as Text);
  return nodes;
}

// ─── Proxy-based translation (all browsers in Safari mode) ───────────────────
const translationCache = new Map<string, string>();

async function translateBatch(texts: string[], lang: string): Promise<string[]> {
  // Deduplicate for efficiency
  const unique = [...new Set(texts)];
  const toFetch = unique.filter((t) => !translationCache.has(`${lang}::${t}`));

  if (toFetch.length > 0) {
    // Chunk into groups of 50 to avoid oversized requests
    const chunkSize = 50;
    for (let i = 0; i < toFetch.length; i += chunkSize) {
      const chunk = toFetch.slice(i, i + chunkSize);
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts: chunk, lang }),
        });
        if (res.ok) {
          const data = await res.json() as { translated: string[] };
          chunk.forEach((text, idx) => {
            translationCache.set(`${lang}::${text}`, data.translated[idx] ?? text);
          });
        }
      } catch {
        // Silently fall back to original on network error
      }
    }
  }

  return texts.map((t) => translationCache.get(`${lang}::${t}`) ?? t);
}

async function applyTranslation(lang: string): Promise<void> {
  const nodes = collectTextNodes();

  // Save originals before first translation
  nodes.forEach((node) => {
    if (!originals.has(node)) originals.set(node, node.nodeValue ?? '');
  });

  const texts = nodes.map((n) => originals.get(n) ?? n.nodeValue ?? '');
  const translated = await translateBatch(texts, lang);

  nodes.forEach((node, i) => {
    if (node.isConnected) node.nodeValue = translated[i];
  });
}

function restoreOriginal(): void {
  originals.forEach((original, node) => {
    if (node.isConnected) node.nodeValue = original;
  });
  originals.clear();
}

// ─── Google Translate Element (Chrome/Edge/Firefox) ──────────────────────────
function useGoogleTranslate() {
  const readyRef = useRef(false);

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;

    const container = document.createElement('div');
    container.id = 'google_translate_element';
    container.style.display = 'none';
    document.body.appendChild(container);

    (window as unknown as Record<string, unknown>).googleTranslateElementInit = () => {
      // @ts-expect-error google.translate is loaded dynamically
      new google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const translate = useCallback((langCode: LangCode) => {
    if (langCode === 'en') {
      const iframe = document.querySelector<HTMLIFrameElement>('.goog-te-banner-frame');
      if (iframe) {
        const btn = iframe.contentDocument?.querySelector<HTMLButtonElement>('.goog-close-link');
        btn?.click();
      }
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' +
        window.location.hostname;
      window.location.reload();
      return;
    }
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname};`;
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  }, []);

  return translate;
}

// ─── Component ────────────────────────────────────────────────────────────────
interface LanguageSwitcherProps {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LangCode>('en');
  const [loading, setLoading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const googleTranslate = useGoogleTranslate();
  const useSafariMode = useRef<boolean>(false);

  // Detect Safari on client mount
  useEffect(() => {
    useSafariMode.current = isSafariBrowser();
    if (!useSafariMode.current) {
      // Read cookie state for Google Translate
      const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
      if (match?.[1]) {
        const found = languages.find((l) => l.code === match[1]);
        if (found) setCurrent(found.code);
      }
    }
  }, []);

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

  const handleSelect = useCallback(
    async (code: LangCode) => {
      if (code === current) { setOpen(false); return; }
      setCurrent(code);
      setOpen(false);

      if (useSafariMode.current) {
        // Safari path: /api/translate proxy
        if (code === 'en') {
          restoreOriginal();
        } else {
          setLoading(true);
          try {
            await applyTranslation(code);
          } finally {
            setLoading(false);
          }
        }
      } else {
        // Chrome/Edge/Firefox path: Google Translate Element
        googleTranslate(code);
      }
    },
    [current, googleTranslate]
  );

  const currentLang = languages.find((l) => l.code === current) ?? languages[0];

  return (
    <div
      ref={dropRef}
      data-langswitcher="1"
      style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Language: ${currentLang.name}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={loading}
        style={{
          fontFamily: 'inherit',
          cursor: loading ? 'wait' : 'pointer',
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
          opacity: loading ? 0.65 : 1,
          transition: 'background 200ms, border-color 200ms, opacity 200ms',
        }}
      >
        <span style={{ fontSize: '15px', lineHeight: 1 }}>
          {loading ? '⏳' : currentLang.flag}
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
            minWidth: '190px',
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
                <span style={{ flex: 1, textAlign: 'left' }}>
                  {lang.name}
                </span>
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
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
