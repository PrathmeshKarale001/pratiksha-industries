'use client';

/*
 * LanguageSwitcher — Pre-translated static dictionary approach.
 *
 * How it works:
 *  1. All translations are pre-built at build time in /public/locales/{lang}.json
 *  2. On language change, fetch the JSON (tiny, cached by browser forever)
 *  3. Walk the DOM and swap text nodes using dictionary lookup (~5ms)
 *  4. MutationObserver catches dynamic content (modals, route changes)
 *
 * Result:
 *  - Instant translation (< 50ms, zero API calls at runtime)
 *  - All browsers work identically (no Google widget, no CORS, no Safari issues)
 *  - Cached by browser after first load
 *  - Arabic RTL handled automatically
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
type Dictionary = Record<string, string>;

// ─── Translation Engine ──────────────────────────────────────────────────────

// Cache loaded dictionaries in memory
const dictionaryCache = new Map<string, Dictionary>();

// Store original English text for every translated node
const originalTextMap = new WeakMap<Text, string>();

// Current language state (shared across all instances)
let currentLang: LangCode = 'en';
let currentDict: Dictionary | null = null;
let observer: MutationObserver | null = null;
let isTranslating = false;

const SKIP_TAGS = new Set([
  'script', 'style', 'noscript', 'code', 'pre',
  'input', 'textarea', 'select', 'svg', 'math',
]);

async function loadDictionary(lang: LangCode): Promise<Dictionary> {
  if (lang === 'en') return {};

  const cached = dictionaryCache.get(lang);
  if (cached) return cached;

  try {
    const res = await fetch(`/locales/${lang}.json`, {
      cache: 'force-cache',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dict: Dictionary = await res.json();
    dictionaryCache.set(lang, dict);
    return dict;
  } catch (err) {
    console.warn(`[i18n] Failed to load ${lang}.json:`, err);
    return {};
  }
}

function translateTextNode(node: Text, dict: Dictionary): void {
  const original = originalTextMap.get(node) ?? node.nodeValue ?? '';
  if (!original.trim()) return;

  // Save original if not already saved
  if (!originalTextMap.has(node)) {
    originalTextMap.set(node, original);
  }

  // Look up the trimmed text in dictionary
  const trimmed = original.trim();
  const translated = dict[trimmed];

  if (translated && translated !== trimmed) {
    // Preserve leading/trailing whitespace from original
    const leadingSpace = original.match(/^\s*/)?.[0] ?? '';
    const trailingSpace = original.match(/\s*$/)?.[0] ?? '';
    node.nodeValue = leadingSpace + translated + trailingSpace;
  }
}

function restoreTextNode(node: Text): void {
  const original = originalTextMap.get(node);
  if (original !== undefined && node.isConnected) {
    node.nodeValue = original;
  }
}

function collectTextNodes(root: Node = document.body): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-langswitcher]')) return NodeFilter.FILTER_REJECT;
      if (parent.isContentEditable) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);
  return nodes;
}

function translateDOM(dict: Dictionary): void {
  if (isTranslating) return;
  isTranslating = true;

  const nodes = collectTextNodes();
  for (const node of nodes) {
    translateTextNode(node, dict);
  }

  // Also translate placeholder attributes on inputs
  document.querySelectorAll<HTMLInputElement>('input[placeholder], textarea[placeholder]').forEach(el => {
    const original = el.dataset.originalPlaceholder ?? el.placeholder;
    if (!el.dataset.originalPlaceholder) {
      el.dataset.originalPlaceholder = original;
    }
    const translated = dict[original.trim()];
    if (translated) el.placeholder = translated;
  });

  // Also translate title/alt attributes on images
  document.querySelectorAll<HTMLElement>('[title], [alt]').forEach(el => {
    if (el.closest('[data-langswitcher]')) return;
    const titleAttr = el.getAttribute('title');
    const altAttr = el.getAttribute('alt');
    if (titleAttr) {
      if (!el.dataset.originalTitle) el.dataset.originalTitle = titleAttr;
      const t = dict[(el.dataset.originalTitle ?? titleAttr).trim()];
      if (t) el.setAttribute('title', t);
    }
    if (altAttr) {
      if (!el.dataset.originalAlt) el.dataset.originalAlt = altAttr;
      const t = dict[(el.dataset.originalAlt ?? altAttr).trim()];
      if (t) el.setAttribute('alt', t);
    }
  });

  isTranslating = false;
}

function restoreDOM(): void {
  // Restore text nodes
  const nodes = collectTextNodes();
  for (const node of nodes) {
    restoreTextNode(node);
  }

  // Restore placeholders
  document.querySelectorAll<HTMLInputElement>('[data-original-placeholder]').forEach(el => {
    el.placeholder = el.dataset.originalPlaceholder ?? el.placeholder;
    delete el.dataset.originalPlaceholder;
  });

  // Restore title/alt
  document.querySelectorAll<HTMLElement>('[data-original-title], [data-original-alt]').forEach(el => {
    if (el.dataset.originalTitle) {
      el.setAttribute('title', el.dataset.originalTitle);
      delete el.dataset.originalTitle;
    }
    if (el.dataset.originalAlt) {
      el.setAttribute('alt', el.dataset.originalAlt);
      delete el.dataset.originalAlt;
    }
  });
}

function setupMutationObserver(dict: Dictionary): void {
  // Disconnect previous observer
  observer?.disconnect();

  observer = new MutationObserver((mutations) => {
    if (isTranslating || currentLang === 'en') return;

    for (const mutation of mutations) {
      for (const added of mutation.addedNodes) {
        if (added.nodeType === Node.TEXT_NODE) {
          translateTextNode(added as Text, dict);
        } else if (added.nodeType === Node.ELEMENT_NODE) {
          // New element added (modal opened, section loaded, etc.)
          const nodes = collectTextNodes(added);
          for (const node of nodes) {
            translateTextNode(node, dict);
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// ─── Public API ──────────────────────────────────────────────────────────────

async function switchLanguage(lang: LangCode): Promise<void> {
  if (lang === currentLang) return;

  // Always restore to English first
  if (currentLang !== 'en') {
    restoreDOM();
    observer?.disconnect();
    observer = null;
  }

  currentLang = lang;

  // Handle Arabic RTL
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  if (lang === 'en') {
    currentDict = null;
    localStorage.setItem('pi-lang', 'en');
    return;
  }

  const dict = await loadDictionary(lang);
  currentDict = dict;

  if (Object.keys(dict).length > 0) {
    translateDOM(dict);
    setupMutationObserver(dict);
  }

  localStorage.setItem('pi-lang', lang);
}

// ─── Component ────────────────────────────────────────────────────────────────

interface LanguageSwitcherProps {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<LangCode>('en');
  const [loading, setLoading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Restore saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem('pi-lang') as LangCode | null;
    if (saved && saved !== 'en' && languages.some(l => l.code === saved)) {
      setActiveLang(saved);
      // Auto-translate on page load
      switchLanguage(saved);
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleSelect = useCallback(async (code: LangCode) => {
    if (code === activeLang) { setOpen(false); return; }
    setOpen(false);
    setLoading(true);

    try {
      await switchLanguage(code);
      setActiveLang(code);
    } finally {
      setLoading(false);
    }
  }, [activeLang]);

  const currentLangObj = languages.find(l => l.code === activeLang) ?? languages[0];

  return (
    <div
      ref={dropRef}
      data-langswitcher="1"
      style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={`Language: ${currentLangObj.name}. Click to change.`}
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
          {loading ? '⏳' : currentLangObj.flag}
        </span>
        <span>{currentLangObj.label}</span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
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
          {languages.map(lang => {
            const active = lang.code === activeLang;
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
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(10, 62, 72, 0.05)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '17px', lineHeight: 1 }}>{lang.flag}</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{lang.name}</span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  color: active ? '#8A6A1F' : '#8AA7AC',
                }}>
                  {lang.label}
                </span>
                {active && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                    stroke="#8A6A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
