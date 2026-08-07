'use client';

/*
 * Product index — mechanical port of Pratiksha Products.dc.html.
 * Filter, search, view toggle and the specification dialog are rewritten as hooks.
 */

import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';
import EnquiryModal from '@/components/EnquiryModal';
import { AnimatePresence, motion } from 'framer-motion';
import { useReveal, useNavChrome, useLockScroll, useEscape, useFocusTrap } from '@/lib/hooks';
import { PRODUCTS, CATS, type ProductCategory } from '@/content/products';

const asset = (p: string) => (p.startsWith('/') ? p : '/' + p);

export default function ProductsPage() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const { mode, compact } = useNavChrome(heroRef);

  const [cat, setCat] = useState<'all' | ProductCategory>('all');
  const [q, setQ] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [openId, setOpenId] = useState<string | null>(null);
  const [quote, setQuote] = useState<{ tag: string; title: string; subject?: string } | null>(null);

  const openQuote = useCallback(
    () => setQuote({ tag: 'SEND AN ENQUIRY', title: 'Request a quotation' }),
    []
  );
  const closeQuote = useCallback(() => setQuote(null), []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (cat !== 'all' && p.cat !== cat) return false;
      if (!needle) return true;
      const hay = [
        p.name,
        p.code,
        p.short,
        p.desc,
        CATS[p.cat].name,
        p.materials.join(' '),
        p.specs.map((s) => s[0] + ' ' + s[1]).join(' ')
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [cat, q]);

  const cats = (['all', ...Object.keys(CATS)] as const).map((id) => {
    const active = cat === id;
    const count = id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === id).length;
    return {
      name: id === 'all' ? 'All products' : CATS[id as ProductCategory].name,
      count: String(count).padStart(2, '0'),
      bg: active ? '#0A3E48' : '#FFFFFF',
      fg: active ? '#FFFFFF' : '#16211F',
      border: active ? '#0A3E48' : 'rgba(10,62,72,0.14)',
      select: () => setCat(id as 'all' | ProductCategory)
    };
  });

  const items = list.map((p, i) => ({
    no: String(i + 1).padStart(2, '0'),
    name: p.name,
    short: p.short,
    img: asset(p.img),
    code: p.code,
    catShort: CATS[p.cat].short,
    kLabelA: p.specs[0][0].toUpperCase(),
    kValA: p.specs[0][1],
    kLabelB: p.specs[1][0].toUpperCase(),
    kValB: p.specs[1][1],
    delay: Math.min(i, 11) * 55 + 'ms',
    open: () => setOpenId(p.id),
    key: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpenId(p.id);
      }
    }
  }));

  const openIdx = PRODUCTS.findIndex((p) => p.id === openId);
  const cur = openIdx >= 0 ? PRODUCTS[openIdx] : null;
  const sel = cur
    ? {
        name: cur.name,
        cat: CATS[cur.cat].name,
        catShort: CATS[cur.cat].short,
        code: cur.code,
        desc: cur.desc,
        img: asset(cur.img),
        dimW: cur.dimW,
        dimH: cur.dimH,
        specs: cur.specs.map((s, i) => ({ k: s[0], v: s[1], delay: 120 + i * 65 + 'ms' })),
        materials: cur.materials.map((m) => ({ name: m })),
        standards: cur.standards.map((s) => ({ name: s })),
        prevName: PRODUCTS[(openIdx - 1 + PRODUCTS.length) % PRODUCTS.length].name,
        nextName: PRODUCTS[(openIdx + 1) % PRODUCTS.length].name
      }
    : null;

  const step = (dir: number) => {
    if (openIdx < 0) return;
    setOpenId(PRODUCTS[(openIdx + dir + PRODUCTS.length) % PRODUCTS.length].id);
  };

  const hasOpen = !!sel;
  const onClose = useCallback(() => setOpenId(null), []);
  useLockScroll(hasOpen);
  useEscape(hasOpen, onClose);
  const overlayRef = useFocusTrap(hasOpen);

  // Arrow keys step through the catalogue while the dialog is open.
  useEffect(() => {
    if (!hasOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const totalSpecs = PRODUCTS.reduce((n, p) => n + p.specs.length, 0);

  const heroStats = [
    { display: '20', to: PRODUCTS.length, suffix: '', label: 'CATALOGUE ITEMS', delay: 0 },
    { display: '04', to: 4, suffix: '', label: 'PRODUCT FAMILIES', delay: 80 },
    { display: '1000', to: 1000, suffix: 'mm', label: 'MAX TRAY WIDTH', delay: 160 },
    { display: '7', to: 7, suffix: '', label: 'MATERIAL FINISHES', delay: 240 }
  ];

  const ticker = [
    { text: 'WIDTHS 50 – 1000 mm' },
    { text: 'THICKNESS 1.0 – 2.5 mm' },
    { text: 'HOT-DIP GALVANIZED TO IS 2629' },
    { text: 'IEC 61537 LOAD CLASSES' },
    { text: 'SS 304 / 316 ON REQUEST' },
    { text: 'MANIFOLDS TO 414 bar' },
    { text: totalSpecs + ' PUBLISHED SPECIFICATIONS' },
    { text: 'MADE TO DRAWING' }
  ];

  const empty = list.length === 0;
  const viewGrid = view === 'grid' && !empty;
  const viewList = view === 'list' && !empty;
  const gridBg = view === 'grid' ? '#0A3E48' : 'transparent';
  const gridFg = view === 'grid' ? '#FFFFFF' : '#6E756F';
  const listBg = view === 'list' ? '#0A3E48' : 'transparent';
  const listFg = view === 'list' ? '#FFFFFF' : '#6E756F';
  const query = q;
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value);
  const onClear = () => {
    setQ('');
    setCat('all');
  };
  const onGrid = () => setView('grid');
  const onList = () => setView('list');
  const onPrev = () => step(-1);
  const onNext = () => step(1);
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const resultLabel = String(list.length).padStart(2, '0') + ' OF ' + PRODUCTS.length + ' ITEMS SHOWN';
  const openQuoteItem = () =>
    setQuote({ tag: 'ITEM ENQUIRY', title: cur ? cur.name : 'Request a quotation', subject: cur?.name });

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Helvetica, sans-serif", color: '#16211F', background: '#F6F4EF', overflowX: 'clip' }}>
      <a data-skip="1" href="#index">
        Skip to the product index
      </a>

      <Navbar mode={mode} compact={compact} onQuote={openQuote} />

      <div ref={progressRef} data-progress="1" style={{ position: "fixed", top: "0", left: "0", height: "3px", width: "0%", background: "#F0DE9C", zIndex: "190", transition: "width 90ms linear" }}></div>

        <div id="main" style={{ padding: "14px 14px 0" }}>
          <div ref={heroRef} data-glassref="1" style={{ position: "relative", overflow: "hidden", borderRadius: "22px", background: "#072B33", backgroundImage: "linear-gradient(rgba(240,222,156,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(240,222,156,0.055) 1px, transparent 1px)", backgroundSize: "46px 46px, 46px 46px" }}>

            <div style={{ position: "absolute", right: "-220px", top: "-200px", width: "760px", height: "760px", borderRadius: "50%", border: "1px dashed rgba(240,222,156,0.18)", pointerEvents: "none", animation: "pi-spin 80s linear infinite" }}></div>
            <div style={{ position: "absolute", right: "-80px", top: "-60px", width: "480px", height: "480px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none", animation: "pi-spin-rev 120s linear infinite" }}></div>

            <div data-heroinner="1" style={{ position: "relative", zIndex: "3", padding: "130px 48px 46px" }}>
              <div data-reveal="1" style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "999px", padding: "9px 18px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", fontWeight: "500", letterSpacing: "0.14em", color: "#FFFFFF" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F0DE9C", display: "block" }}></span>
                PRODUCT INDEX / 2026
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginTop: "30px" }}>
                <h1 style={{ margin: "0", maxWidth: "15em" }}>
                  <span data-reveal="1" data-reveal-delay="90" style={{ display: "block", fontSize: "clamp(44px, 6vw, 98px)", lineHeight: "0.92", fontWeight: "700", letterSpacing: "-0.045em", color: "#FFFFFF" }}>Every Part of</span>
                  <span data-reveal="1" data-reveal-delay="180" style={{ display: "block", fontSize: "clamp(44px, 6vw, 98px)", lineHeight: "0.92", fontWeight: "700", letterSpacing: "-0.045em", color: "#F0DE9C" }}>the Run</span>
                </h1>
                <p data-reveal="1" data-reveal-delay="260" style={{ margin: "0", maxWidth: "400px", fontSize: "16.5px", lineHeight: "1.66", color: "rgba(255,255,255,0.86)" }}>Trays, fittings, supports, earthing and instrumentation &mdash; drawn to your widths, gauges and finishes. Open any item for its full specification.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "14px", marginTop: "54px" }}>
                {(heroStats ?? []).map((h, $index) => (
      <React.Fragment key={$index}>
                  <div data-reveal="1" data-reveal-delay={h.delay} style={{ borderTop: "1px solid rgba(255,255,255,0.22)", paddingTop: "18px" }}>
                    <div style={{ fontSize: "clamp(30px, 3.2vw, 44px)", lineHeight: "1", fontWeight: "700", letterSpacing: "-0.04em", color: "#F0DE9C" }}><span data-count-to={h.to} data-count-suffix={h.suffix}>{h.display}</span></div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.12em", color: "rgba(255,255,255,0.62)", marginTop: "12px" }}>{h.label}</div>
                  </div>
                </React.Fragment>
      ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "40px" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.16em", color: "rgba(255,255,255,0.55)" }}>BROWSE</span>
                <span style={{ position: "relative", width: "21px", height: "36px", border: "1px solid rgba(255,255,255,0.38)", borderRadius: "999px", display: "block" }}>
                  <span style={{ position: "absolute", left: "50%", top: "8px", width: "3px", height: "7px", marginLeft: "-1.5px", borderRadius: "2px", background: "#F0DE9C", display: "block", animation: "pi-cue 1.9s ease-in-out infinite" }}></span>
                </span>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: "3", borderTop: "1px solid rgba(255,255,255,0.14)", padding: "16px 0", overflow: "hidden" }}>
              <div style={{ display: "flex", width: "max-content", animation: "pi-marquee 52s linear infinite" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "26px", paddingRight: "26px" }}>
                  {(ticker ?? []).map((t, $index) => (
      <React.Fragment key={$index}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: "500", letterSpacing: "0.1em", color: "rgba(255,255,255,0.62)", whiteSpace: "nowrap" }}>{t.text}</span>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C4A24F", display: "block", flexShrink: "0" }}></span>
                  </React.Fragment>
      ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "26px", paddingRight: "26px" }}>
                  {(ticker ?? []).map((t, $index) => (
      <React.Fragment key={$index}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: "500", letterSpacing: "0.1em", color: "rgba(255,255,255,0.62)", whiteSpace: "nowrap" }}>{t.text}</span>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C4A24F", display: "block", flexShrink: "0" }}></span>
                  </React.Fragment>
      ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="index" style={{ position: "sticky", top: "94px", zIndex: "150", background: "rgba(246,244,239,0.9)", backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)", borderBottom: "1px solid rgba(10,62,72,0.1)" }}>
          <div data-filterwrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            <div data-chips="1" role="group" aria-label="Filter by product family" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", flex: "1", minWidth: "0" }}>
              {(cats ?? []).map((c, $index) => (
      <React.Fragment key={$index}>
                <button onClick={c.select} style={{ border: `1px solid ${c.border}`, background: `${c.bg}`, color: `${c.fg}`, borderRadius: "999px", padding: "11px 18px", fontSize: "13.5px", fontWeight: "600", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "9px", whiteSpace: "nowrap", transition: "background 260ms, color 260ms, border-color 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x15">
                  {c.name}
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "500", opacity: "0.72" }}>{c.count}</span>
                </button>
              </React.Fragment>
      ))}
            </div>
            <div data-tools="1" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: "0" }}>
              <div data-search="1" style={{ display: "flex", alignItems: "center", gap: "9px", background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.14)", borderRadius: "999px", padding: "10px 16px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8AA7AC" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4.2-4.2" /></svg>
                <input type="search" aria-label="Search the product index" placeholder="Search widths, fittings, finishes" value={query} onChange={onSearch} style={{ border: "none", outline: "none", background: "transparent", fontSize: "13.5px", color: "#16211F", width: "210px" }} />
              </div>
              <div data-viewtoggle="1" style={{ display: "flex", background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.14)", borderRadius: "999px", padding: "4px" }}>
                <button type="button" onClick={onGrid} aria-label="Grid view" style={{ border: "none", cursor: "pointer", borderRadius: "999px", padding: "8px 14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.1em", background: `${gridBg}`, color: `${gridFg}`, transition: "background 240ms, color 240ms" }}>GRID</button>
                <button type="button" onClick={onList} aria-label="List view" style={{ border: "none", cursor: "pointer", borderRadius: "999px", padding: "8px 14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "500", letterSpacing: "0.1em", background: `${listBg}`, color: `${listFg}`, transition: "background 240ms, color 240ms" }}>LIST</button>
              </div>
            </div>
          </div>
        </div>

        <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "40px 32px 96px" }}>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "24px", paddingBottom: "22px", borderBottom: "1px solid rgba(10,62,72,0.12)" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: "500", letterSpacing: "0.12em", color: "#6E756F" }}>{resultLabel}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: "500", letterSpacing: "0.12em", color: "#8A6A1F" }}>SPECIFICATIONS ON REQUEST</div>
          </div>

          {viewGrid ? (<>
            <div data-grid="1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 310px), 1fr))", gap: "18px", marginTop: "26px" }}>
              {(items ?? []).map((p, $index) => (
      <React.Fragment key={$index}>
                <div data-pcard="1" style={{ position: "relative", background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.09)", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", animation: "pi-card-in 620ms cubic-bezier(0.22,1,0.36,1) both", animationDelay: `${p.delay}`, transition: "box-shadow 420ms cubic-bezier(0.22,1,0.36,1), border-color 420ms", willChange: "transform" }} data-x="x16">
                  <div style={{ position: "relative", height: "258px", backgroundColor: "#F1EFE8", backgroundImage: "linear-gradient(rgba(10,62,72,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,62,72,0.06) 1px, transparent 1px)", backgroundSize: "26px 26px, 26px 26px", overflow: "hidden" }}>
                    <img data-pimg="1" src={p.img} alt={p.name} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "contain", padding: "26px", mixBlendMode: "multiply", transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }} />
                    <div style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(10,62,72,0.9)", color: "#F0DE9C", fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", fontWeight: "500", letterSpacing: "0.1em", padding: "6px 10px", borderRadius: "7px" }}>{p.code}</div>
                    <div style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.92)", color: "#0A3E48", fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", padding: "6px 10px", borderRadius: "7px" }}>{p.catShort}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "13px", padding: "24px 24px 22px", flex: "1" }}>
                    <h3 style={{ margin: "0", fontSize: "21px", lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.025em", color: "#16211F" }}>{p.name}</h3>
                    <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.6", color: "#4A524E" }}>{p.short}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginTop: "2px", paddingTop: "14px", borderTop: "1px solid rgba(10,62,72,0.1)" }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", color: "#6E756F" }}>
                        <span style={{ letterSpacing: "0.08em" }}>{p.kLabelA}</span>
                        <span style={{ color: "#0A3E48", fontWeight: "500", textAlign: "right" }}>{p.kValA}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", color: "#6E756F" }}>
                        <span style={{ letterSpacing: "0.08em" }}>{p.kLabelB}</span>
                        <span style={{ color: "#0A3E48", fontWeight: "500", textAlign: "right" }}>{p.kValB}</span>
                      </div>
                    </div>
                    <button onClick={p.open} style={{ marginTop: "auto", border: "none", cursor: "pointer", background: "#0A3E48", color: "#FFFFFF", borderRadius: "13px", padding: "15px 20px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", transition: "background 280ms, transform 280ms cubic-bezier(0.34,1.5,0.64,1), color 280ms" }} data-x="x17">
                      See Specifications
                      <span style={{ fontSize: "17px" }}>&#8594;</span>
                    </button>
                  </div>
                </div>
              </React.Fragment>
      ))}
            </div>
          </>) : null}

          {viewList ? (<>
            <div style={{ marginTop: "26px", borderTop: "1px solid rgba(10,62,72,0.12)" }}>
              {(items ?? []).map((p, $index) => (
      <React.Fragment key={$index}>
                <div data-prow="1" role="button" tabIndex={0} aria-label={`${p.name} — see specifications`} onClick={p.open} onKeyDown={p.key} style={{ display: "grid", gridTemplateColumns: "62px 84px minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr) 46px", alignItems: "center", gap: "20px", padding: "16px 14px", borderBottom: "1px solid rgba(10,62,72,0.1)", cursor: "pointer", animation: "pi-card-in 520ms cubic-bezier(0.22,1,0.36,1) both", animationDelay: `${p.delay}`, transition: "background 260ms, padding-left 300ms" }} data-x="x18">
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.1em", color: "#8A6A1F" }}>{p.no}</span>
                  <div style={{ height: "62px", borderRadius: "11px", backgroundColor: "#F1EFE8", backgroundImage: "linear-gradient(rgba(10,62,72,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,62,72,0.06) 1px, transparent 1px)", backgroundSize: "16px 16px, 16px 16px", overflow: "hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "7px", mixBlendMode: "multiply", display: "block" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "-0.02em", color: "#16211F" }}>{p.name}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", color: "#6E756F", marginTop: "5px" }}>{p.code} / {p.catShort}</div>
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#4A524E" }}>{p.kValA}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#4A524E" }}>{p.kValB}</div>
                  <span style={{ width: "38px", height: "38px", borderRadius: "10px", border: "1px solid rgba(10,62,72,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A3E48", fontSize: "15px" }}>&#8594;</span>
                </div>
              </React.Fragment>
      ))}
            </div>
          </>) : null}

          {empty ? (<>
            <div style={{ marginTop: "60px", textAlign: "center", padding: "60px 24px", border: "1px dashed rgba(10,62,72,0.25)", borderRadius: "20px" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em", color: "#16211F" }}>Nothing matches that yet</div>
              <p style={{ margin: "12px auto 22px", maxWidth: "420px", fontSize: "15px", lineHeight: "1.6", color: "#6E756F" }}>We fabricate to drawing as well &mdash; if it is not in the index, send us the section and we will quote it.</p>
              <button type="button" onClick={onClear} style={{ border: "none", cursor: "pointer", background: "#F0DE9C", color: "#0A3E48", fontWeight: "700", fontSize: "14px", padding: "14px 24px", borderRadius: "13px" }}>Clear filters</button>
            </div>
          </>) : null}
        </div>

        <div data-band2="1" style={{ background: "#0A3E48", padding: "76px 0 80px" }}>
          <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "clamp(32px, 4vw, 56px)", alignItems: "center" }}>
            <div>
              <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "999px", padding: "9px 18px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.14em", color: "#FFFFFF" }}>MADE TO DRAWING</div>
              <h2 data-reveal="1" data-reveal-delay="90" style={{ margin: "26px 0 18px", fontSize: "clamp(30px, 3.8vw, 54px)", lineHeight: "1.03", fontWeight: "700", letterSpacing: "-0.038em", color: "#FFFFFF" }}>Send us the section.<br /><span style={{ color: "#F0DE9C" }}>We will hold the tolerance.</span></h2>
              <p data-reveal="1" data-reveal-delay="170" style={{ margin: "0", maxWidth: "520px", fontSize: "16px", lineHeight: "1.7", color: "rgba(255,255,255,0.82)" }}>Non-standard widths, special rung pitches, custom bends and finishes &mdash; fabrication, galvanizing and inspection all happen in our own 15,000 sq. ft. facility at Khed Shivapur.</p>
            </div>
            <div data-reveal="1" data-reveal-delay="240" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button type="button" onClick={openQuote} style={{ fontFamily: "inherit", cursor: "pointer", border: "none", width: "100%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", background: "#F0DE9C", color: "#0A3E48", borderRadius: "16px", padding: "22px 26px", fontSize: "17px", fontWeight: "700", transition: "transform 280ms cubic-bezier(0.34,1.5,0.64,1), background 280ms" }} data-x="x19">
                Request a quotation
                <span style={{ fontSize: "19px" }}>&#8594;</span>
              </button>
              <a href="tel:+919850845054" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF", borderRadius: "16px", padding: "22px 26px", fontSize: "17px", fontWeight: "600", transition: "transform 280ms cubic-bezier(0.34,1.5,0.64,1), border-color 280ms, color 280ms" }} data-x="x20">
                +91 98508 45054
                <span style={{ fontSize: "19px" }}>&#9742;</span>
              </a>
              <a href="Pratiksha%20Industries%20v4.dc.html#catalogue" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF", borderRadius: "16px", padding: "22px 26px", fontSize: "17px", fontWeight: "600", transition: "transform 280ms cubic-bezier(0.34,1.5,0.64,1), border-color 280ms, color 280ms" }} data-x="x21">
                Full catalogue PDF
                <span style={{ fontSize: "19px" }}>&#8595;</span>
              </a>
            </div>
          </div>
        </div>

      <SiteFooter onQuote={openQuote} />
      <MobileActionBar onQuote={openQuote} />

      <AnimatePresence>
        {hasOpen && sel && (
          <motion.div
            onClick={onClose}
            data-modalscrim="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 1, 1] }}
            style={{ position: "fixed", inset: "0", zIndex: "280", background: "rgba(5,26,32,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px, 3vw, 44px)" }}
          >
            <motion.div
              ref={overlayRef}
              onClick={stop}
              data-overlay="1"
              role="dialog"
              aria-modal="true"
              aria-label={`${sel.name} specifications`}
              initial={{ opacity: 0, y: 30, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, y: 20, scale: 0.985, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
              style={{ position: "relative", width: "100%", maxWidth: "1180px", maxHeight: "90vh", background: "#F6F4EF", borderRadius: "26px", overflow: "hidden", display: "grid", gridTemplateColumns: "1.02fr 1fr", boxShadow: "0 44px 100px rgba(0,0,0,0.5)" }}
            >
              <div data-plate="1" style={{ position: "relative", backgroundColor: "#EFEDE6", backgroundImage: "linear-gradient(rgba(10,62,72,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(10,62,72,0.07) 1px, transparent 1px)", backgroundSize: "30px 30px, 30px 30px", overflow: "hidden", minHeight: "420px" }}>
                <img
                  key={sel.code}
                  data-plate-img="1"
                  src={sel.img}
                  alt={sel.name}
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "contain", padding: "12% 14% 16%", mixBlendMode: "multiply", transition: "transform 300ms ease-out", willChange: "transform" }}
                />

                <div style={{ position: "absolute", left: "8%", right: "8%", bottom: "46px", height: "1px", background: "rgba(196,162,79,0.85)", transformOrigin: "left", animation: "pi-line 700ms cubic-bezier(0.22,1,0.36,1) 260ms both" }}></div>
                <div style={{ position: "absolute", left: "8%", bottom: "40px", width: "1px", height: "13px", background: "rgba(196,162,79,0.85)" }}></div>
                <div style={{ position: "absolute", right: "8%", bottom: "40px", width: "1px", height: "13px", background: "rgba(196,162,79,0.85)" }}></div>
                <div style={{ position: "absolute", left: "0", right: "0", bottom: "18px", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.12em", color: "#0A3E48" }}>{sel.dimW}</div>

                <div style={{ position: "absolute", top: "26px", left: "26px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ background: "#0A3E48", color: "#F0DE9C", fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.1em", padding: "7px 11px", borderRadius: "7px" }}>{sel.code}</span>
                  <span style={{ background: "rgba(255,255,255,0.92)", color: "#0A3E48", fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", padding: "7px 11px", borderRadius: "7px" }}>{sel.catShort}</span>
                </div>

                <div style={{ position: "absolute", right: "26px", top: "26px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.1em", color: "#6E756F" }}>{sel.dimH}</div>
              </div>

              <div data-panel="1" style={{ background: "#0A3E48", color: "#FFFFFF", padding: "40px 42px 36px", overflowY: "auto", maxHeight: "90vh" }}>
                <div key={sel.code + '-panel'}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.14em", color: "#C4A24F" }}>{sel.cat}</div>
                      <h2 style={{ margin: "12px 0 0", fontSize: "clamp(28px, 3vw, 40px)", lineHeight: "1.04", fontWeight: "700", letterSpacing: "-0.035em", color: "#FFFFFF" }}>{sel.name}</h2>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close specifications" style={{ flexShrink: "0", width: "42px", height: "42px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#FFFFFF", fontSize: "17px", cursor: "pointer", transition: "background 240ms, color 240ms, transform 300ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x23">&#10005;</button>
                  </div>

                  <p style={{ margin: "20px 0 0", fontSize: "15.5px", lineHeight: "1.72", color: "rgba(255,255,255,0.85)" }}>{sel.desc}</p>

                  <div style={{ marginTop: "30px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>SPECIFICATION</div>
                    {(sel.specs ?? []).map((s, $index) => (
                      <React.Fragment key={$index}>
                        <div
                          style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "24px", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}
                        >
                          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.66)" }}>{s.k}</span>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13.5px", fontWeight: "500", color: "#F0DE9C", textAlign: "right" }}>{s.v}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <div style={{ marginTop: "28px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)" }}>MATERIALS &amp; FINISHES</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                      {(sel.materials ?? []).map((m, $index) => (
                        <React.Fragment key={$index}>
                          <span style={{ border: "1px solid rgba(255,255,255,0.26)", borderRadius: "8px", padding: "8px 13px", fontSize: "12.5px", color: "rgba(255,255,255,0.88)", transition: "border-color 240ms, background 240ms, color 240ms" }} data-x="x24">{m.name}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "26px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)" }}>STANDARDS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                      {(sel.standards ?? []).map((st, $index) => (
                        <React.Fragment key={$index}>
                          <span style={{ background: "rgba(240,222,156,0.14)", borderRadius: "8px", padding: "8px 13px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.06em", color: "#F0DE9C" }}>{st.name}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "32px", flexWrap: "wrap" }}>
                    <button type="button" onClick={openQuoteItem} style={{ fontFamily: "inherit", cursor: "pointer", border: "none", textAlign: "left", flex: "1", minWidth: "180px", background: "#F0DE9C", color: "#0A3E48", borderRadius: "14px", padding: "18px 22px", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", transition: "background 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x25">
                      Enquire about this item
                      <span style={{ fontSize: "17px" }}>&#8594;</span>
                    </button>
                    <a href="Pratiksha%20Industries%20v4.dc.html#catalogue" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF", borderRadius: "14px", padding: "18px 22px", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px", transition: "border-color 260ms, color 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x26">
                      Spec sheet
                      <span style={{ fontSize: "16px" }}>&#8595;</span>
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginTop: "30px", paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                    <button type="button" onClick={onPrev} aria-label="Previous product" style={{ border: "none", background: "transparent", cursor: "pointer", textAlign: "left", color: "rgba(255,255,255,0.7)", padding: "0", transition: "color 240ms" }} data-x="x27">
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.14em" }}>&#8592; PREVIOUS</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "6px" }}>{sel.prevName}</div>
                    </button>
                    <button type="button" onClick={onNext} aria-label="Next product" style={{ border: "none", background: "transparent", cursor: "pointer", textAlign: "right", color: "rgba(255,255,255,0.7)", padding: "0", transition: "color 240ms" }} data-x="x28">
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.14em" }}>NEXT &#8594;</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "6px" }}>{sel.nextName}</div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EnquiryModal
        open={!!quote}
        tag={quote?.tag ?? ''}
        title={quote?.title ?? ''}
        subject={quote?.subject}
        onClose={closeQuote}
        source="products"
      />
    </div>
  );
}
