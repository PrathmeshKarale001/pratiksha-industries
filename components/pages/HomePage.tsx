'use client';

/*
 * Home page — mechanical port of Pratiksha Industries v4.dc.html.
 * Inline style objects carry the approved design values verbatim.
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';
import EnquiryModal from '@/components/EnquiryModal';
import QuickTrustBar from '@/components/clients/QuickTrustBar';
import ClientShowcaseSection from '@/components/clients/ClientShowcaseSection';
import ClientDirectoryModal from '@/components/clients/ClientDirectoryModal';
import { useReveal, useNavChrome, prefersReducedMotion } from '@/lib/hooks';
import {
  stats,
  solutions,
  marks,
  projects,
  inspection,
  tolerances,
  industries,
  steps,
  materials,
  capabilitiesRaw,
  familiesRaw,
  marqueeRaw
} from '@/content/home';

/* content/*.ts stores image paths without a leading slash; normalize once here
   (mirrors the same `asset()` helper used in ProductsPage.tsx and product/[slug]/page.tsx). */
const asset = (p: string) => (p.startsWith('/') ? p : '/' + p);

/* Presentation decorations that lived in the prototype's renderVals(). */
const marquee = marqueeRaw.map((m, i) => ({
  label: m.label,
  img: asset(m.img),
  bg: i % 2 === 0 ? '#F0DE9C' : '#0A3E48',
  fg: i % 2 === 0 ? '#0A3E48' : '#FFFFFF'
}));

const families = familiesRaw.map((f, i) => ({
  name: f.name,
  items: f.items as readonly string[],
  count: String(f.items.length).padStart(2, '0') + ' ITEMS',
  cols: 'repeat(' + (('cols' in f ? f.cols : 1) || 1) + ', minmax(0, 1fr))',
  span: 'span' in f ? f.span : 'span 1',
  delay: i * 70
}));

export default function HomePage() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const { mode, compact } = useNavChrome(heroRef);

  const [loading, setLoading] = useState(() => !prefersReducedMotion());
  const [open, setOpen] = useState(0);
  const [quote, setQuote] = useState<{ tag: string; title: string; subject?: string } | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);

  const openQuote = useCallback(
    () => setQuote({ tag: 'SEND AN ENQUIRY', title: 'Request a quotation' }),
    []
  );
  const openQuoteRefs = useCallback(
    () => setQuote({ tag: 'PROJECT REFERENCES', title: 'Request project references' }),
    []
  );
  const closeQuote = useCallback(() => setQuote(null), []);

  const openDirectory = useCallback(() => setDirectoryOpen(true), []);
  const closeDirectory = useCallback(() => setDirectoryOpen(false), []);

  // Intro curtain — one beat, then out. Skipped entirely under reduced motion
  // (loading starts as false via the lazy initializer above).
  useEffect(() => {
    if (!loading) return;
    const t = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(t);
  }, [loading]);

  // Hero image parallax (0.18x scroll distance)
  const heroImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = heroImgRef.current;
          if (el) {
            const y = window.scrollY || 0;
            if (y < 1200) {
              el.style.transform = `translateY(${y * 0.18}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll progress rule.
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

  const accordion = capabilitiesRaw.map((a, i) => ({
    name: a.name,
    body: a.body,
    rows: open === i ? '1fr' : '0fr',
    color: open === i ? '#F0DE9C' : '#FFFFFF',
    rot: open === i ? '180deg' : '0deg',
    delay: i * 90,
    expanded: open === i,
    toggle: () => setOpen(open === i ? -1 : i),
    key: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(open === i ? -1 : i);
      }
    }
  }));

  const showProjects = true;
  const catalogueHeadline = 'Every Item We Make, in One Place';

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Helvetica, sans-serif", color: '#16211F', background: '#F6F4EF', overflowX: 'clip' }}>
      <a data-skip="1" href="#main">
        Skip to main content
      </a>

      <Navbar mode={mode} compact={compact} onQuote={openQuote} />

      <div data-loader="1" data-loading={loading ? 'true' : 'false'} style={{ position: "fixed", inset: "0", zIndex: "300", background: "#0A3E48", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "26px", transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1), visibility 700ms" }}>
          <div style={{ position: "relative", width: "118px", height: "118px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: "0", borderRadius: "50%", border: "1px dashed rgba(240,222,156,0.4)", animation: "pi-spin 9s linear infinite" }}></div>
            <div style={{ position: "absolute", inset: "14px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)", animation: "pi-spin-rev 14s linear infinite" }}></div>
            <img src="/assets/logo.jpg" alt="Pratiksha Industries" style={{ width: "62px", height: "62px", borderRadius: "50%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em", color: "#FFFFFF" }}>Pratiksha Industries</div>
            <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.3em", color: "#C4A24F", marginTop: "7px" }}>DELIVERING QUALITY</div>
          </div>
          <div style={{ width: "190px", height: "2px", background: "rgba(255,255,255,0.16)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: "#F0DE9C", animation: "pi-load 1100ms cubic-bezier(0.65,0,0.35,1) forwards" }}></div>
          </div>
        </div>

        <div ref={progressRef} data-progress="1" style={{ position: "fixed", top: "0", left: "0", height: "3px", width: "0%", background: "#F0DE9C", zIndex: "150", transition: "width 90ms linear" }}></div>

        <main id="main">
        <div data-heropad="1" style={{ padding: "14px" }}>
          <div ref={heroRef} data-hero="1" data-glassref="1" data-hero-open="1" style={{ position: "relative", overflow: "hidden", borderRadius: "22px", background: "#0A3E48", minHeight: "880px", display: "flex", flexDirection: "column", clipPath: "inset(0% 0% 0% 0% round 22px)", animation: "pi-hero-open 1300ms cubic-bezier(0.72,0,0.18,1) 1120ms both", willChange: "clip-path" }}>

            <div data-hero-zoom="1" style={{ position: "absolute", inset: "0", overflow: "hidden", animation: "pi-hero-zoom 2400ms cubic-bezier(0.22,1,0.36,1) 1120ms both" }}>
              <Image
                ref={heroImgRef}
                data-hero-img="1"
                src="/assets/hero.png"
                alt="Cable tray installation"
                width={1376}
                height={768}
                preload
                sizes="100vw"
                quality={80}
                style={{ position: "absolute", top: "-7%", left: "0", width: "100%", height: "114%", objectFit: "cover", willChange: "transform" }}
              />
            </div>
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(178deg, rgba(4,30,37,0.74) 0%, rgba(4,30,37,0.34) 36%, rgba(5,34,41,0.6) 68%, rgba(4,26,32,0.92) 100%)" }}></div>
            <div style={{ position: "absolute", left: "50%", top: "140px", width: "1120px", height: "1120px", marginLeft: "-560px", border: "1px dashed rgba(240,222,156,0.16)", borderRadius: "50%", pointerEvents: "none", animation: "pi-spin 70s linear infinite" }}></div>
            <div style={{ position: "absolute", left: "50%", top: "-110px", width: "1520px", height: "1520px", marginLeft: "-760px", border: "1px dashed rgba(255,255,255,0.09)", borderRadius: "50%", pointerEvents: "none", animation: "pi-spin-rev 110s linear infinite" }}></div>

            <div data-heroinner="1" style={{ position: "relative", zIndex: "3", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "122px 48px 46px" }}>
              <div data-herotop="1" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "40px" }}>
                <h1 style={{ margin: "0" }}>
                  <span data-reveal="1" data-reveal-delay="900" style={{ display: "block", fontSize: "clamp(46px, 6.4vw, 104px)", lineHeight: "0.93", fontWeight: "700", letterSpacing: "-0.04em", color: "#F0DE9C" }}>Built for</span>
                  <span data-reveal="1" data-reveal-delay="1020" style={{ display: "block", fontSize: "clamp(46px, 6.4vw, 104px)", lineHeight: "0.93", fontWeight: "700", letterSpacing: "-0.04em", color: "#FFFFFF" }}>the Long Run</span>
                </h1>
                <div data-reveal="1" data-reveal-delay="1160" style={{ textAlign: "left", flexShrink: "0" }}>
                  <div style={{ fontSize: "clamp(44px, 5vw, 82px)", lineHeight: "0.9", fontWeight: "700", letterSpacing: "-0.04em", color: "#F0DE9C" }}><span data-count-to="15" data-count-suffix="k">15k</span><span style={{ fontSize: "0.42em", letterSpacing: "0" }}>sq.ft</span></div>
                  <div data-herostat="1" style={{ marginTop: "12px", fontSize: "15px", lineHeight: "1.45", color: "rgba(255,255,255,0.86)", maxWidth: "210px" }}>Manufacturing facility in Khed Shivapur, Pune</div>
                </div>
              </div>

              <div data-herobot="1" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", marginTop: "60px" }}>
                <div data-reveal="1" data-reveal-delay="1280" style={{ maxWidth: "440px" }}>
                  <p data-herolong="1" style={{ margin: "0 0 26px", fontSize: "16.5px", lineHeight: "1.6", color: "rgba(255,255,255,0.9)" }}>We manufacture more than cable trays &mdash; we build the routing, earthing and instrumentation systems that industrial plants depend on every day.</p>
                  <p data-heroshort="1" style={{ display: "none", margin: "0 0 20px", fontSize: "15.5px", lineHeight: "1.55", color: "rgba(255,255,255,0.88)" }}>Routing, earthing and instrumentation systems for industrial plants.</p>
                  <div data-herochips="1" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div data-chip="1" style={{ display: "flex", alignItems: "center", gap: "18px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "14px", padding: "18px 22px", transition: "transform 320ms cubic-bezier(0.34,1.36,0.64,1), background 320ms, border-color 320ms" }} data-x="x16">
                      <svg data-chipicon="1" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F0DE9C" strokeWidth="1.4" style={{ flexShrink: "0" }}>
                        <path d="M2 7h20M2 12h20M2 17h20" />
                        <path d="M6 4v16M18 4v16" />
                      </svg>
                      <div data-chipdiv="1" style={{ width: "1px", height: "34px", background: "rgba(255,255,255,0.22)" }}></div>
                      <div data-chiptext="1" style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.35", color: "#FFFFFF" }}>Cable Tray<br />Systems</div>
                    </div>
                    <div data-chip="1" style={{ display: "flex", alignItems: "center", gap: "18px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "14px", padding: "18px 22px", transition: "transform 320ms cubic-bezier(0.34,1.36,0.64,1), background 320ms, border-color 320ms" }} data-x="x17">
                      <svg data-chipicon="1" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F0DE9C" strokeWidth="1.4" style={{ flexShrink: "0" }}>
                        <path d="M12 3v10M12 13l-5 8M12 13l5 8M7 7h10" />
                      </svg>
                      <div data-chipdiv="1" style={{ width: "1px", height: "34px", background: "rgba(255,255,255,0.22)" }}></div>
                      <div data-chiptext="1" style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.35", color: "#FFFFFF" }}>Earthing &amp;<br />Instrumentation</div>
                    </div>
                  </div>
                </div>
                <div data-reveal="1" data-reveal-delay="1380" data-heroeng="1" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "26px" }}>
                  <div style={{ fontSize: "clamp(40px, 5.6vw, 92px)", lineHeight: "0.92", fontWeight: "700", letterSpacing: "-0.04em", color: "#FFFFFF", textAlign: "right" }}>Engineered to<br />Specification</div>
                  <div data-cue="1" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)" }}>SCROLL</span>
                    <span style={{ position: "relative", width: "22px", height: "38px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "999px", display: "block" }}>
                      <span style={{ position: "absolute", left: "50%", top: "9px", width: "3px", height: "7px", marginLeft: "-1.5px", borderRadius: "2px", background: "#F0DE9C", display: "block", animation: "pi-cue 1.9s ease-in-out infinite" }}></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QuickTrustBar onOpenDirectory={openDirectory} />

        <div id="about" data-wrap="1" data-band2="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "96px 32px 80px" }}>
          <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(10,62,72,0.28)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#0A3E48" }}>ABOUT COMPANY</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "clamp(32px, 4vw, 64px)", marginTop: "34px", alignItems: "start" }}>
            <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "0", fontSize: "clamp(32px, 3.9vw, 56px)", lineHeight: "1.03", fontWeight: "700", letterSpacing: "-0.035em", color: "#16211F" }}>Modern Solutions for Industrial Cable Management</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", paddingTop: "8px" }}>
              <p data-reveal="1" data-reveal-delay="160" style={{ margin: "0", fontSize: "16px", lineHeight: "1.72", color: "#4A524E" }}>Pratiksha Industries manufactures cable trays, earthing materials and instrumentation fittings for industrial, commercial and infrastructure projects &mdash; combining advanced machinery with rigorous quality control.</p>
              <p data-reveal="1" data-reveal-delay="240" style={{ margin: "0", fontSize: "16px", lineHeight: "1.72", color: "#4A524E" }}>Founded by Mr. Pradeep Hatte, we believe manufacturing is about more than output &mdash; it is about building partnerships, holding tolerances, and delivering on the date we promised.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 228px), 1fr))", gap: "16px", marginTop: "56px" }}>
            {(stats ?? []).map((st, $index) => (
      <React.Fragment key={$index}>
              <div data-reveal="1" data-reveal-delay={st.delay} style={{ background: `${st.bg}`, borderRadius: "18px", padding: "30px 28px 26px", transition: "transform 340ms cubic-bezier(0.34,1.4,0.64,1), box-shadow 340ms" }} data-x="x18">
                <div style={{ fontSize: "clamp(34px, 3.4vw, 46px)", lineHeight: "1", fontWeight: "700", letterSpacing: "-0.035em", color: `${st.fg}` }}><span data-count-to={st.to} data-count-suffix={st.suffix}>{st.display}</span></div>
                <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: `${st.sub}`, marginTop: "14px" }}>{st.label}</div>
              </div>
            </React.Fragment>
      ))}
          </div>
        </div>

        <div style={{ paddingBottom: "84px", overflow: "hidden" }}>
          <div data-marquee="1" style={{ display: "flex", width: "max-content", animation: "pi-marquee 44s linear infinite" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingRight: "14px" }}>
              {(marquee ?? []).map((m, $index) => (
      <React.Fragment key={$index}>
                <div style={{ background: `${m.bg}`, color: `${m.fg}`, borderRadius: "14px", padding: "24px 34px", fontSize: "19px", fontWeight: "600", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{m.label}</div>
                <div style={{ width: "210px", height: "76px", borderRadius: "14px", overflow: "hidden", flexShrink: "0" }}>
                  <Image src={m.img} alt="" width={210} height={76} quality={72} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </React.Fragment>
      ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingRight: "14px" }}>
              {(marquee ?? []).map((m, $index) => (
      <React.Fragment key={$index}>
                <div style={{ background: `${m.bg}`, color: `${m.fg}`, borderRadius: "14px", padding: "24px 34px", fontSize: "19px", fontWeight: "600", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{m.label}</div>
                <div style={{ width: "210px", height: "76px", borderRadius: "14px", overflow: "hidden", flexShrink: "0" }}>
                  <Image src={m.img} alt="" width={210} height={76} quality={72} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </React.Fragment>
      ))}
            </div>
          </div>
        </div>

        <div id="products" data-band="range" data-band2="1" style={{ background: "#8AA7AC", padding: "92px 0 96px" }}>
          <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.55)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#FFFFFF" }}>PRODUCT RANGE</div>
            <div data-sechead="1" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", marginTop: "30px" }}>
              <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "0", fontSize: "clamp(32px, 4.2vw, 60px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#FFFFFF" }}>What Pratiksha<br />Industries Manufactures</h2>
              <a data-reveal="1" data-reveal-delay="180" href="#catalogue" style={{ display: "inline-flex", alignItems: "center", gap: "11px", background: "#F0DE9C", color: "#0A3E48", fontWeight: "600", fontSize: "15px", padding: "20px 30px", borderRadius: "14px", whiteSpace: "nowrap", transition: "transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms" }} data-x="x19">
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0A3E48", display: "block" }}></span>
                Full Catalogue
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 228px), 1fr))", gap: "16px", marginTop: "46px" }}>
              {(solutions ?? []).map((s, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={s.delay} data-tilt="1" style={{ position: "relative", borderRadius: "18px", overflow: "hidden", minHeight: "400px", background: "#0A3E48", display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "transform 420ms cubic-bezier(0.22,1,0.36,1), box-shadow 420ms" }} data-x="x20">
                  <Image
                    data-card-img="1"
                    src={asset(s.img)}
                    alt={s.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    quality={78}
                    style={{ objectFit: "cover", transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}
                  />
                  <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(10,62,72,0.1) 25%, rgba(10,62,72,0.9) 100%)", pointerEvents: "none" }}></div>
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "14px", padding: "26px", paddingTop: "100px" }}>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "rgba(255,255,255,0.85)" }}>{s.no}</div>
                    <h3 style={{ margin: "0", fontSize: "clamp(19px, 1.9vw, 25px)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.025em", color: "#FFFFFF", overflowWrap: "anywhere" }}>{s.name}</h3>
                    <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.55", color: "rgba(255,255,255,0.85)" }}>{s.desc}</p>
                    <a href="#catalogue" style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#F0DE9C", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A3E48", fontSize: "19px", flexShrink: "0", transition: "transform 300ms cubic-bezier(0.34,1.5,0.64,1), background 300ms" }} data-x="x21">&#8594;</a>
                  </div>
                </div>
              </React.Fragment>
      ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "24px", alignItems: "center", marginTop: "76px", paddingTop: "56px", borderTop: "1px solid rgba(255,255,255,0.28)" }}>
              {(marks ?? []).map((k, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={k.delay} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "21px", fontWeight: "700", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.92)" }}>{k.name}</div>
                  <div style={{ fontSize: "11.5px", fontWeight: "500", letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)", marginTop: "6px" }}>{k.sub}</div>
                </div>
              </React.Fragment>
      ))}
            </div>
          </div>
        </div>

        <div id="process" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", alignItems: "stretch" }}>
          <div style={{ position: "relative", background: "#0A3E48", minHeight: "620px", overflow: "hidden" }}>
            <Image
              data-hero-img="1"
              src="/assets/process.png"
              alt="Press brake fabrication"
              width={896}
              height={1200}
              sizes="(max-width: 900px) 100vw, 50vw"
              quality={80}
              style={{ position: "absolute", top: "-6%", left: "0", width: "100%", height: "112%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(10,62,72,0.5), rgba(10,62,72,0.05))" }}></div>
          </div>
          <div style={{ position: "relative", background: "#0E6B7C", display: "flex", alignItems: "center", padding: "clamp(48px, 5vw, 76px) clamp(28px, 4vw, 60px)", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "-180px", top: "-180px", width: "620px", height: "620px", borderRadius: "50%", border: "1px dashed rgba(240,222,156,0.22)", animation: "pi-spin 60s linear infinite", pointerEvents: "none" }}></div>
            <div style={{ position: "relative", width: "100%", maxWidth: "620px" }}>
              <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#FFFFFF" }}>IN-HOUSE CAPABILITY</div>
              <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "26px 0 40px", fontSize: "clamp(32px, 4vw, 56px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#FFFFFF" }}>From Sheet to Shipment</h2>
              <div>
                {(accordion ?? []).map((a, $index) => (
      <React.Fragment key={$index}>
                  <div data-reveal="1" data-reveal-delay={a.delay} style={{ borderBottom: "1px solid rgba(255,255,255,0.28)", padding: "22px 0" }}>
                    <div role="button" tabIndex={0} aria-expanded={a.expanded} aria-label={`${a.name} — ${a.expanded ? 'collapse' : 'expand'} details`} onClick={a.toggle} onKeyDown={a.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", cursor: "pointer" }}>
                      <h3 style={{ margin: "0", fontSize: "27px", fontWeight: "700", letterSpacing: "-0.025em", color: `${a.color}`, transition: "color 300ms" }}>{a.name}</h3>
                      <span style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", color: `${a.color}`, flexShrink: "0", transform: `rotate(${a.rot})`, transition: "transform 420ms cubic-bezier(0.34,1.4,0.64,1), color 300ms" }}>&#8595;</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateRows: `${a.rows}`, transition: "grid-template-rows 480ms cubic-bezier(0.22,1,0.36,1)" }}>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{ margin: "0", paddingTop: "16px", fontSize: "15.5px", lineHeight: "1.72", color: "rgba(255,255,255,0.86)" }}>{a.body}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
      ))}
              </div>
            </div>
          </div>
        </div>

        {showProjects ? (<>
          <div id="projects" data-band="projects" data-band2="1" style={{ background: "#0A3E48", padding: "88px 0 92px" }}>
            <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
              <div data-projhead="1" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "56px" }}>
                <h2 data-reveal="1" style={{ margin: "0", fontSize: "clamp(34px, 5vw, 74px)", lineHeight: "0.98", fontWeight: "700", letterSpacing: "-0.04em", color: "#FFFFFF" }}>From Steel<br /><span data-indent="1" style={{ color: "#F0DE9C", paddingLeft: "1.6em" }}>to Structure</span></h2>
                <p data-reveal="1" data-reveal-delay="120" style={{ margin: "6px 0 0", maxWidth: "280px", fontSize: "14.5px", lineHeight: "1.65", color: "rgba(255,255,255,0.88)" }}>Supplied and installed across plants, warehouses and infrastructure projects throughout Maharashtra.</p>
              </div>

              <div data-projgrid="1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 292px), 1fr))", gap: "26px", marginTop: "48px" }}>
                {(projects ?? []).map((p, $index) => (
      <React.Fragment key={$index}>
                  <div data-reveal="1" data-reveal-delay={p.delay} data-tilt="1" style={{ transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)" }}>
                    <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", aspectRatio: "1.28", background: "#0A3E48" }}>
                      <Image
                        data-card-img="1"
                        src={asset(p.img)}
                        alt={p.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        quality={78}
                        style={{ objectFit: "cover", transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
                      <span style={{ background: "#F0DE9C", color: "#0A3E48", fontSize: "10.5px", fontWeight: "600", letterSpacing: "0.1em", padding: "6px 11px", borderRadius: "6px" }}>{p.tagA}</span>
                      <span style={{ background: "#F0DE9C", color: "#0A3E48", fontSize: "10.5px", fontWeight: "600", letterSpacing: "0.1em", padding: "6px 11px", borderRadius: "6px" }}>{p.tagB}</span>
                    </div>
                    <h3 style={{ margin: "14px 0 0", fontSize: "22px", fontWeight: "600", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{p.name}</h3>
                  </div>
                </React.Fragment>
      ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "46px" }}>
                <button type="button" onClick={openQuoteRefs} style={{ fontFamily: "inherit", cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", gap: "11px", background: "#F0DE9C", color: "#0A3E48", fontWeight: "600", fontSize: "15px", padding: "19px 30px", borderRadius: "14px", transition: "transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms" }} data-x="x22">
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0A3E48", display: "block" }}></span>
                  Request Project References
                </button>
              </div>
            </div>
          </div>
        </>) : null}

        <ClientShowcaseSection
          onOpenDirectory={openDirectory}
          onOpenQuoteRefs={openQuoteRefs}
        />

        <div id="catalogue" data-band2="1" style={{ background: "#F1EFEA", padding: "90px 0 96px" }}>
          <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(10,62,72,0.28)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#0A3E48" }}>COMPLETE CATALOGUE</div>
            <div data-sechead="1" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", marginTop: "30px" }}>
              <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "0", fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#16211F" }}>{catalogueHeadline}</h2>
              <a data-reveal="1" data-reveal-delay="160" href="/pdfs/Product catalogue.pdf" download target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "11px", background: "#8AA7AC", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", padding: "19px 30px", borderRadius: "14px", whiteSpace: "nowrap", transition: "transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms" }} data-x="x23">
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F0DE9C", display: "block" }}></span>
                Download PDF
              </a>
            </div>

            <div data-catgrid="1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 292px), 1fr))", gap: "16px", marginTop: "46px" }}>
              {(families ?? []).map((f, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={f.delay} style={{ gridColumn: `${f.span}`, background: "#FFFFFF", borderRadius: "18px", padding: "30px 32px 32px", transition: "transform 340ms cubic-bezier(0.34,1.4,0.64,1), box-shadow 340ms" }} data-x="x24">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "18px", borderBottom: "1px solid rgba(10,62,72,0.12)" }}>
                    <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "700", letterSpacing: "-0.025em", color: "#16211F" }}>{f.name}</h3>
                    <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", color: "#8A6A1F", whiteSpace: "nowrap" }}>{f.count}</span>
                  </div>
                  <div data-catitems="1" style={{ display: "grid", gridTemplateColumns: `${f.cols}`, gap: "10px 26px", marginTop: "20px" }}>
                    {(f.items ?? []).map((item, $index) => (
      <React.Fragment key={$index}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", fontSize: "14.5px", color: "#4A524E" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C4A24F", flexShrink: "0", transform: "translateY(-3px)" }}></span>
                        <span>{item}</span>
                      </div>
                    </React.Fragment>
      ))}
                  </div>
                </div>
              </React.Fragment>
      ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 228px), 1fr))", gap: "16px", marginTop: "16px" }}>
              {(materials ?? []).map((mat, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={mat.delay} style={{ background: "#FFFFFF", borderRadius: "14px", padding: "22px 24px", transition: "transform 300ms cubic-bezier(0.34,1.4,0.64,1), background 300ms" }} data-x="x25">
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#0A3E48" }}>{mat.name}</div>
                  <div style={{ fontSize: "13px", lineHeight: "1.55", color: "#6E756F", marginTop: "6px" }}>{mat.note}</div>
                </div>
              </React.Fragment>
      ))}
            </div>
          </div>
        </div>

        <div id="quality" data-band2="1" style={{ background: "#F6F4EF", padding: "92px 0 96px" }}>
          <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(10,62,72,0.28)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#0A3E48" }}>QUALITY CONTROL</div>
            <div data-sechead="1" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginTop: "30px" }}>
              <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "0", fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#16211F" }}>Checked at Every Stage,<br />Not Just at the Gate</h2>
              <p data-reveal="1" data-reveal-delay="160" style={{ margin: "0", maxWidth: "330px", fontSize: "15.5px", lineHeight: "1.66", color: "#4A524E" }}>Every batch carries an inspection record &mdash; raw material to dispatch &mdash; so what reaches your site matches the drawing it was quoted against.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 292px), 1fr))", gap: "16px", marginTop: "48px" }}>
              {(inspection ?? []).map((q, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={q.delay} style={{ background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.08)", borderRadius: "18px", padding: "28px 28px 26px", display: "flex", flexDirection: "column", gap: "12px", transition: "transform 340ms cubic-bezier(0.34,1.4,0.64,1), box-shadow 340ms, border-color 340ms" }} data-x="x26">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.14em", color: "#8A6A1F" }}>{q.no}</span>
                    <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", color: "#8AA7AC" }}>{q.tag}</span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "700", letterSpacing: "-0.02em", color: "#16211F" }}>{q.name}</h3>
                  <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.62", color: "#4A524E" }}>{q.body}</p>
                </div>
              </React.Fragment>
      ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 228px), 1fr))", gap: "16px", marginTop: "16px" }}>
              {(tolerances ?? []).map((t, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={t.delay} style={{ background: "#0A3E48", borderRadius: "18px", padding: "28px 26px 24px" }}>
                  <div style={{ fontSize: "clamp(26px, 2.6vw, 34px)", lineHeight: "1", fontWeight: "700", letterSpacing: "-0.035em", color: "#F0DE9C" }}>{t.value}</div>
                  <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", marginTop: "13px" }}>{t.label}</div>
                </div>
              </React.Fragment>
      ))}
            </div>

            <p data-reveal="1" style={{ margin: "20px 0 0", maxWidth: "60em", fontSize: "13.5px", lineHeight: "1.62", color: "#5B6167" }}>Coating grade, load class and dimensional tolerance are confirmed per order against the applicable standard and the drawing supplied &mdash; the test and inspection records travel with the batch.</p>
          </div>
        </div>

        <div id="industries" data-band2="1" style={{ background: "#8AA7AC", padding: "90px 0 94px" }}>
          <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.55)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#FFFFFF" }}>WHERE IT GOES</div>
            <div data-sechead="1" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginTop: "30px" }}>
              <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "0", fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#FFFFFF" }}>Industries We Supply</h2>
              <a data-reveal="1" data-reveal-delay="160" href="#catalogue" style={{ display: "inline-flex", alignItems: "center", gap: "11px", background: "#F0DE9C", color: "#0A3E48", fontWeight: "600", fontSize: "15px", padding: "19px 30px", borderRadius: "14px", whiteSpace: "nowrap", transition: "transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms" }} data-x="x27">
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0A3E48", display: "block" }}></span>
                Browse the product index
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "14px", marginTop: "46px" }}>
              {(industries ?? []).map((ind, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={ind.delay} style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "16px", padding: "24px 24px 22px", minHeight: "148px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px", transition: "transform 320ms cubic-bezier(0.34,1.4,0.64,1), background 320ms, border-color 320ms" }} data-x="x28">
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)" }}>{ind.no}</div>
                  <div>
                    <div style={{ fontSize: "19px", fontWeight: "700", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{ind.name}</div>
                    <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "rgba(255,255,255,0.78)", marginTop: "7px" }}>{ind.note}</div>
                  </div>
                </div>
              </React.Fragment>
      ))}
            </div>
          </div>
        </div>

        <div id="ordering" data-band2="1" style={{ background: "#F1EFEA", padding: "90px 0 96px" }}>
          <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(10,62,72,0.28)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#0A3E48" }}>HOW TO ORDER</div>
            <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "30px 0 0", maxWidth: "20em", fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#16211F" }}>Send a Drawing Today, Track It to Dispatch</h2>

            <div style={{ position: "relative", marginTop: "52px" }}>
              <div data-reveal="1" data-steprail="1" style={{ position: "absolute", left: "0", right: "0", top: "34px", height: "1px", background: "rgba(10,62,72,0.16)" }}></div>
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 214px), 1fr))", gap: "18px" }}>
                {(steps ?? []).map((s, $index) => (
      <React.Fragment key={$index}>
                  <div data-reveal="1" data-reveal-delay={s.delay}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <span style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", color: "#0A3E48", flexShrink: "0", transition: "background 320ms, color 320ms, transform 320ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x29">{s.no}</span>
                      <span style={{ fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.12em", color: "#8A6A1F" }}>{s.eta}</span>
                    </div>
                    <h3 style={{ margin: "22px 0 10px", fontSize: "21px", fontWeight: "700", letterSpacing: "-0.022em", color: "#16211F" }}>{s.name}</h3>
                    <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.64", color: "#4A524E" }}>{s.body}</p>
                  </div>
                </React.Fragment>
      ))}
              </div>
            </div>

            <div data-reveal="1" data-reveal-delay="320" data-ordercta="1" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap", marginTop: "56px", background: "#FFFFFF", borderRadius: "20px", padding: "34px 38px" }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.025em", color: "#16211F" }}>Have a bill of quantities ready?</div>
                <p style={{ margin: "8px 0 0", maxWidth: "520px", fontSize: "15px", lineHeight: "1.62", color: "#4A524E" }}>Mail the BOQ or GA drawing and we will come back with sizes, finish options and a delivery date &mdash; typically within two working days.</p>
              </div>
              <button type="button" onClick={openQuote} style={{ fontFamily: "inherit", cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", gap: "11px", background: "#0A3E48", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", padding: "19px 30px", borderRadius: "14px", whiteSpace: "nowrap", transition: "transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms, color 260ms" }} data-x="x30">
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F0DE9C", display: "block" }}></span>
                Send an enquiry
              </button>
            </div>
          </div>
        </div>

      </main>

      <div id="contact">
        <SiteFooter onQuote={openQuote} />
      </div>

      <MobileActionBar onQuote={openQuote} />

      <EnquiryModal
        open={!!quote}
        tag={quote?.tag ?? ''}
        title={quote?.title ?? ''}
        onClose={closeQuote}
        source="home"
      />

      <ClientDirectoryModal
        isOpen={directoryOpen}
        onClose={closeDirectory}
        onRequestQuote={openQuoteRefs}
      />
    </div>
  );
}
