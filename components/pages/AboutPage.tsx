'use client';

/*
 * About page.
 *
 * The section markup below is a mechanical port of the approved design
 * prototype (Pratiksha About.dc.html) — inline style objects are intentional
 * and carry the exact approved values. Content comes from @/content/about.
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';
import EnquiryModal from '@/components/EnquiryModal';
import { useReveal, useNavChrome } from '@/lib/hooks';
import {
  headline,
  note as noteRaw,
  beliefs as beliefsRaw,
  journey as journeyRaw,
  machines as machinesRaw,
  principles as principlesRaw,
  credentials
} from '@/content/about';

/* Presentation decorations that lived in the prototype's renderVals(). */
const idx = (i: number) => String(i + 1).padStart(2, '0');
const note = noteRaw.map((n, i) => ({ ...n, delay: i * 110 }));
const beliefs = beliefsRaw.map((b, i) => ({ ...b, no: idx(i), delay: i * 90 }));
const journey = journeyRaw.map((j, i) => ({ ...j, delay: i * 90 }));
const machines = machinesRaw.map((m, i) => ({ ...m, no: idx(i) }));
const principles = principlesRaw.map((p, i) => ({ ...p, no: idx(i), delay: i * 90 }));

export default function AboutPage() {
  useReveal();
  // About's hero is light (paper), so the navbar is solid from the top.
  const { mode, compact } = useNavChrome();

  const [quote, setQuote] = useState<{ tag: string; title: string } | null>(null);
  const openQuote = useCallback(() => setQuote({ tag: 'SEND AN ENQUIRY', title: 'Request a quotation' }), []);
  const openQuoteVisit = useCallback(() => setQuote({ tag: 'PLANT VISIT', title: 'Request a plant visit' }), []);
  const closeQuote = useCallback(() => setQuote(null), []);

  const railRef = useRef<HTMLDivElement>(null);
  const scrollRail = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.7), behavior: 'smooth' });
  };
  const railPrev = () => scrollRail(-1);
  const railNext = () => scrollRail(1);

  // Timeline rail fill & dot scroll animations
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const tl = document.querySelector('[data-timeline]');
          const fill = document.querySelector('[data-tl-fill]') as HTMLElement;
          if (tl && fill) {
            const r = tl.getBoundingClientRect();
            const span = r.height - 16;
            const passed = window.innerHeight * 0.58 - r.top;
            const h = Math.max(0, Math.min(span, passed));
            fill.style.height = h.toFixed(1) + 'px';
            Array.from(tl.querySelectorAll('[data-tl-item]')).forEach((item) => {
              const dot = item.querySelector('[data-tl-dot]') as HTMLElement;
              if (!dot) return;
              const on = item.getBoundingClientRect().top < window.innerHeight * 0.62;
              dot.style.background = on ? '#C4A24F' : '#F6F4EF';
              dot.style.borderColor = on ? '#C4A24F' : 'rgba(10,62,72,0.2)';
              dot.style.transform = on ? 'scale(1.12)' : 'none';
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Helvetica, sans-serif", color: '#16211F', background: '#F6F4EF', overflowX: 'clip' }}>
      <a data-skip="1" href="#story">
        Skip to main content
      </a>

      <Navbar mode={mode} compact={compact} onQuote={openQuote} />

      <main id="main">
      <div id="story" data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "128px 32px 0" }}>
          <div data-storygrid="1" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(200px, 290px)", gap: "clamp(28px, 4vw, 56px)", alignItems: "end" }}>
            <div>
              <div data-reveal="1" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.16em", color: "#8A6A1F" }}>
                <span style={{ width: "34px", height: "1px", background: "#C4A24F", display: "block" }}></span>
                WHO WE ARE
              </div>
              <h1 style={{ margin: "24px 0 0", maxWidth: "16em" }}>
                <span data-reveal="1" data-reveal-delay="70" style={{ display: "block", fontSize: "clamp(42px, 6.6vw, 104px)", lineHeight: "0.9", fontWeight: "700", letterSpacing: "-0.048em", color: "#16211F" }}>We make the</span>
                <span data-reveal="1" data-reveal-delay="150" style={{ display: "block", fontSize: "clamp(42px, 6.6vw, 104px)", lineHeight: "0.9", fontWeight: "700", letterSpacing: "-0.048em", color: "#16211F" }}>parts nobody</span>
                <span data-reveal="1" data-reveal-delay="230" style={{ display: "block", fontSize: "clamp(42px, 6.6vw, 104px)", lineHeight: "0.9", fontWeight: "700", letterSpacing: "-0.048em", color: "#8AA7AC" }}>looks at twice.</span>
              </h1>
              <p data-reveal="1" data-reveal-delay="320" style={{ margin: "34px 0 0", maxWidth: "560px", fontSize: "17px", lineHeight: "1.68", color: "#4A524E" }}>A cable tray only gets noticed when it fails. That is the whole reason Pratiksha Industries exists &mdash; to build the routing, support and earthing hardware that an industrial plant can stop thinking about the day it is installed.</p>
            </div>
            <div data-reveal="1" data-reveal-delay="380" style={{ display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "8px" }}>
              {(headline ?? []).map((h, $index) => (
                <React.Fragment key={$index}>
                  <div style={{ borderTop: "1px solid rgba(10,62,72,0.18)", paddingTop: "14px" }}>
                    <div style={{ fontSize: "30px", lineHeight: "1", fontWeight: "700", letterSpacing: "-0.035em", color: "#0A3E48" }}><span data-count-to={h.to} data-count-suffix={h.suffix} data-count-plain={h.plain}>{h.display}</span></div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.12em", color: "#6E756F", marginTop: "9px" }}>{h.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div data-reveal="1" data-reveal-delay="120" style={{ position: "relative", marginTop: "54px", borderRadius: "20px", overflow: "hidden", height: "clamp(280px, 34vw, 460px)", background: "#0A3E48" }}>
            <div data-par="1" style={{ position: "absolute", top: "-8%", left: "0", width: "100%", height: "116%" }}>
              <Image src="/images/process.png" alt="Fabrication floor at Khed Shivapur" fill sizes="(max-width: 900px) 100vw, 50vw" quality={78} style={{ objectFit: "cover", willChange: "transform" }} />
            </div>
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(4,30,37,0.72), rgba(4,30,37,0.08) 62%)" }}></div>
            <div style={{ position: "absolute", left: "34px", bottom: "30px", right: "34px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.82)" }}>SHED NO. 01, KHEDEKAR INDUSTRIAL ESTATE / KHED SHIVAPUR, PUNE</div>
              <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>SCROLL</span>
                <span style={{ position: "relative", width: "21px", height: "36px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "999px", display: "block" }}>
                  <span style={{ position: "absolute", left: "50%", top: "8px", width: "3px", height: "7px", marginLeft: "-1.5px", borderRadius: "2px", background: "#F0DE9C", display: "block", animation: "pi-cue 1.9s ease-in-out infinite" }}></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "96px 32px 0" }}>
          <div data-foundergrid="1" style={{ display: "grid", gridTemplateColumns: "minmax(240px, 340px) minmax(0, 1fr)", gap: "clamp(32px, 4vw, 64px)", alignItems: "start" }}>
            <div data-reveal="1">
              <div data-founderimg="1" style={{ position: "relative", borderRadius: "20px", overflow: "hidden", background: "#EFEDE6", aspectRatio: "0.82" }}>
                <Image src="/images/founder.jpg" alt="Mr. Pradeep Hatte — Founder & Proprietor, Pratiksha Industries" fill sizes="(max-width: 860px) 340px, 290px" quality={78} style={{ objectFit: 'cover', objectPosition: 'center 15%' }} />
              </div>
              <div style={{ marginTop: "18px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.02em", color: "#16211F" }}>Mr. Pradeep Hatte</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#6E756F", marginTop: "6px" }}>FOUNDER &amp; PROPRIETOR</div>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#8A6A1F" }}>2013 &mdash;</div>
              </div>
            </div>

            <div>
              <div data-reveal="1" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.16em", color: "#8A6A1F" }}>FOUNDER&apos;S NOTE</div>
              <blockquote data-reveal="1" data-reveal-delay="80" style={{ margin: "24px 0 0", fontSize: "clamp(24px, 2.7vw, 38px)", lineHeight: "1.24", fontWeight: "600", letterSpacing: "-0.03em", color: "#16211F" }}>&ldquo;We started with one press and a promise on delivery dates. The machines multiplied. The promise did not change.&rdquo;</blockquote>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "30px", maxWidth: "660px" }}>
                {(note ?? []).map((n, $index) => (
      <React.Fragment key={$index}>
                  <p data-reveal="1" data-reveal-delay={n.delay} style={{ margin: "0", fontSize: "16px", lineHeight: "1.74", color: "#4A524E" }}>{n.text}</p>
                </React.Fragment>
      ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(238px, 1fr))", gap: "14px", marginTop: "38px" }}>
                {(beliefs ?? []).map((b, $index) => (
      <React.Fragment key={$index}>
                  <div data-reveal="1" data-reveal-delay={b.delay} style={{ background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.09)", borderRadius: "16px", padding: "24px 26px", transition: "transform 320ms cubic-bezier(0.34,1.4,0.64,1), border-color 320ms, box-shadow 320ms" }} data-x="x16">
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.14em", color: "#8A6A1F" }}>{b.no}</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.022em", color: "#16211F", marginTop: "14px" }}>{b.name}</div>
                    <p style={{ margin: "8px 0 0", fontSize: "14.5px", lineHeight: "1.6", color: "#4A524E" }}>{b.body}</p>
                  </div>
                </React.Fragment>
      ))}
              </div>
            </div>
          </div>
        </div>

        <div id="journey" data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "104px 32px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
            <h2 data-reveal="1" style={{ margin: "0", fontSize: "clamp(30px, 4vw, 56px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.04em", color: "#16211F" }}>Thirteen years,<br />one direction</h2>
            <div data-reveal="1" data-reveal-delay="90" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.12em", color: "#6E756F" }}>2013 &rarr; 2026</div>
          </div>

          <div data-timeline="1" style={{ position: "relative", marginTop: "54px", paddingLeft: "74px" }}>
            <div data-tl-track="1" style={{ position: "absolute", left: "27px", top: "8px", bottom: "8px", width: "2px", background: "rgba(10,62,72,0.13)", borderRadius: "2px" }}></div>
            <div data-tl-fill="1" style={{ position: "absolute", left: "27px", top: "8px", width: "2px", height: "0px", background: "#C4A24F", borderRadius: "2px", transition: "height 160ms linear" }}></div>
            {(journey ?? []).map((j, $index) => (
      <React.Fragment key={$index}>
              <div data-tl-item="1" data-reveal="1" data-reveal-delay={j.delay} style={{ position: "relative", padding: "0 0 42px" }}>
                <span data-tl-dot="1" style={{ position: "absolute", left: "-54px", top: "4px", width: "16px", height: "16px", borderRadius: "50%", background: "#F6F4EF", border: "2px solid rgba(10,62,72,0.2)", display: "block", transition: "border-color 420ms, background 420ms, transform 420ms cubic-bezier(0.34,1.5,0.64,1)" }}></span>
                <div data-tlrow="1" style={{ display: "grid", gridTemplateColumns: "108px minmax(0, 1fr)", gap: "26px", alignItems: "start" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", letterSpacing: "0.04em", color: "#8A6A1F", paddingTop: "2px" }}>{j.year}</div>
                  <div>
                    <h3 style={{ margin: "0", fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: "700", letterSpacing: "-0.028em", color: "#16211F" }}>{j.name}</h3>
                    <p style={{ margin: "10px 0 0", maxWidth: "640px", fontSize: "15.5px", lineHeight: "1.68", color: "#4A524E" }}>{j.body}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
      ))}
          </div>
        </div>

        <div id="floor" data-band2="1" style={{ marginTop: "104px", background: "#0A3E48", padding: "88px 0 92px", overflow: "hidden" }}>
          <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
              <div>
                <div data-reveal="1" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.16em", color: "#C4A24F" }}>ON THE FLOOR</div>
                <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "22px 0 0", fontSize: "clamp(30px, 4vw, 56px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.04em", color: "#FFFFFF" }}>The machines behind<br />the tolerance</h2>
              </div>
              <div data-reveal="1" data-reveal-delay="160" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button type="button" onClick={railPrev} aria-label="Scroll machinery list back" style={{ width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.32)", background: "transparent", color: "#FFFFFF", fontSize: "16px", cursor: "pointer", transition: "background 240ms, color 240ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x17">&#8592;</button>
                <button type="button" onClick={railNext} aria-label="Scroll machinery list forward" style={{ width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.32)", background: "transparent", color: "#FFFFFF", fontSize: "16px", cursor: "pointer", transition: "background 240ms, color 240ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x18">&#8594;</button>
              </div>
            </div>

            <div ref={railRef} data-rail="1" style={{ display: "flex", gap: "16px", marginTop: "44px", overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingBottom: "18px" }}>
              {(machines ?? []).map((m, $index) => (
      <React.Fragment key={$index}>
                <div style={{ flex: "0 0 clamp(258px, 74vw, 320px)", scrollSnapAlign: "start", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "18px", padding: "26px 26px 24px", display: "flex", flexDirection: "column", gap: "14px", minHeight: "250px", transition: "background 320ms, border-color 320ms, transform 320ms cubic-bezier(0.34,1.4,0.64,1)" }} data-x="x19">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.14em", color: "#C4A24F" }}>{m.no}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>{m.qty}</span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "700", letterSpacing: "-0.024em", color: "#FFFFFF" }}>{m.name}</h3>
                  <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "rgba(255,255,255,0.8)" }}>{m.body}</p>
                  <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.16)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.08em", color: "#F0DE9C" }}>{m.spec}</div>
                </div>
              </React.Fragment>
      ))}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)" }}>DRAG OR SCROLL THE RAIL &rarr;</div>
          </div>
        </div>

        <div id="principles" style={{ background: "#F6F4EF", padding: "96px 0 0" }}>
          <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.16em", color: "#C4A24F" }}>HOW WE WORK</div>
            <div style={{ marginTop: "34px", borderTop: "1px solid rgba(10,62,72,0.14)" }}>
              {(principles ?? []).map((p, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={p.delay} data-prin="1" style={{ display: "grid", gridTemplateColumns: "58px minmax(0, 1fr)", gap: "clamp(14px, 1.6vw, 24px)", alignItems: "start", padding: "30px 12px 30px 0", borderBottom: "1px solid rgba(10,62,72,0.14)", transition: "background 320ms, padding-left 340ms" }} data-x="x20">
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.14em", color: "#8A6A1F", paddingTop: "6px" }}>{p.no}</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(14px, 2.4vw, 34px)", alignItems: "baseline" }}>
                    <h3 style={{ margin: "0", fontSize: "clamp(21px, 2.4vw, 32px)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.032em", color: "#16211F" }}>{p.name}</h3>
                    <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.68", color: "#4A524E" }}>{p.body}</p>
                  </div>
                </div>
              </React.Fragment>
      ))}
            </div>
          </div>
        </div>

        <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "90px 32px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", alignItems: "stretch" }}>
            <div data-reveal="1" data-credcard="1" style={{ background: "#8AA7AC", borderRadius: "22px", padding: "44px 44px 40px", color: "#FFFFFF" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11.5px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.72)" }}>CREDENTIALS</div>
              <div style={{ display: "flex", flexDirection: "column", marginTop: "26px" }}>
                {(credentials ?? []).map((c, $index) => (
      <React.Fragment key={$index}>
                  <div data-credrow="1" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px 22px", flexWrap: "wrap", padding: "17px 0", borderBottom: "1px solid rgba(255,255,255,0.26)" }}>
                    <span style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{c.name}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)", textAlign: "right" }}>{c.detail}</span>
                  </div>
                </React.Fragment>
      ))}
              </div>
            </div>

            <div data-reveal="1" data-reveal-delay="100" style={{ position: "relative", borderRadius: "22px", overflow: "hidden", background: "#0A3E48", minHeight: "420px" }}>
              <div data-par="1" style={{ position: "absolute", top: "-8%", left: "0", width: "100%", height: "116%" }}>
                <Image src="/images/factory-dusk.png" alt="Pratiksha Industries facility" fill sizes="(max-width: 900px) 100vw, 50vw" quality={72} style={{ objectFit: "cover", willChange: "transform" }} />
              </div>
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(4,30,37,0.28), rgba(4,30,37,0.9))" }}></div>
              <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "18px", padding: "40px 40px 36px" }}>
                <div style={{ fontSize: "clamp(26px, 2.8vw, 38px)", lineHeight: "1.06", fontWeight: "700", letterSpacing: "-0.035em", color: "#FFFFFF" }}>Come and see the floor</div>
                <p style={{ margin: "0", maxWidth: "380px", fontSize: "15px", lineHeight: "1.64", color: "rgba(255,255,255,0.82)" }}>Shed No. 01, Gat No. 313, Khedekar Industrial Estate, Goud Dhara Road, Khed Shivapur, Tal. Bhor, Dist. Pune &ndash; 412205</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href="tel:+919850845054" style={{ background: "#F0DE9C", color: "#0A3E48", fontWeight: "700", fontSize: "14.5px", padding: "16px 24px", borderRadius: "13px", transition: "background 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x21">+91 98508 45054</a>
                  <button type="button" onClick={openQuoteVisit} style={{ fontFamily: "inherit", cursor: "pointer", background: "transparent", border: "1px solid rgba(255,255,255,0.34)", color: "#FFFFFF", fontWeight: "600", fontSize: "14.5px", padding: "16px 24px", borderRadius: "13px", transition: "border-color 260ms, color 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x22">Request a plant visit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-wrap="1" style={{ maxWidth: "1320px", margin: "0 auto", padding: "80px 32px 40px" }}>
          <div data-reveal="1" style={{ background: "#0A3E48", borderRadius: "22px", padding: "clamp(40px, 5vw, 68px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
            <h2 style={{ margin: "0", maxWidth: "18em", fontSize: "clamp(28px, 3.6vw, 50px)", lineHeight: "1.04", fontWeight: "700", letterSpacing: "-0.04em", color: "#FFFFFF" }}>Ready to spec your run?<br /><span style={{ color: "#F0DE9C" }}>Start with the product index.</span></h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/products" style={{ background: "#F0DE9C", color: "#0A3E48", fontWeight: "700", fontSize: "15px", padding: "20px 30px", borderRadius: "14px", transition: "background 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x23">Browse products &#8594;</Link>
              <Link href="/" style={{ border: "1px solid rgba(255,255,255,0.32)", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", padding: "20px 30px", borderRadius: "14px", transition: "border-color 260ms, color 260ms, transform 260ms cubic-bezier(0.34,1.5,0.64,1)" }} data-x="x24">Back to home</Link>
            </div>
          </div>
        </div>

      </main>

      <SiteFooter onQuote={openQuote} />
      <MobileActionBar onQuote={openQuote} />

      <EnquiryModal
        open={!!quote}
        tag={quote?.tag ?? ''}
        title={quote?.title ?? ''}
        onClose={closeQuote}
        source="about"
      />
    </div>
  );
}
