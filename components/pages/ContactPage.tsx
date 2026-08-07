'use client';

/*
 * Contact page — mechanical port of Pratiksha Contact.dc.html.
 * The enquiry form is the shared component, wired to the server action.
 */

import React, { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';
import EnquiryForm from '@/components/EnquiryForm';
import { useReveal, useNavChrome } from '@/lib/hooks';
import { channels, hours, people, credentials, checklist } from '@/content/contact';

export default function ContactPage() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const { mode, compact } = useNavChrome(heroRef);

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

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Helvetica, sans-serif", color: '#16211F', background: '#F6F4EF', overflowX: 'clip' }}>
      <a data-skip="1" href="#enquiry">
        Skip to the enquiry form
      </a>

      <Navbar mode={mode} compact={compact} />

      <div ref={progressRef} data-progress="1" style={{ position: "fixed", top: "0", left: "0", height: "3px", width: "0%", background: "#F0DE9C", zIndex: "150", transition: "width 90ms linear" }}></div>

        <div id="main" data-heropad="1" style={{ padding: "14px" }}>
          <div ref={heroRef} data-glassref="1" style={{ position: "relative", overflow: "hidden", borderRadius: "22px", background: "#0A3E48", display: "flex", flexDirection: "column" }}>
            <img loading="lazy" decoding="async" src="/assets/factory-dusk.png" alt="Pratiksha Industries facility" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", opacity: "0.5" }} />
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(178deg, rgba(4,30,37,0.8) 0%, rgba(4,30,37,0.5) 45%, rgba(4,26,32,0.9) 100%)" }}></div>
            <div style={{ position: "absolute", left: "50%", top: "-180px", width: "1240px", height: "1240px", marginLeft: "-620px", border: "1px dashed rgba(240,222,156,0.16)", borderRadius: "50%", pointerEvents: "none", animation: "pi-spin 70s linear infinite" }}></div>

            <div data-heroinner="1" style={{ position: "relative", zIndex: "3", padding: "clamp(118px, 11vw, 152px) clamp(28px, 4vw, 48px) clamp(44px, 5vw, 64px)" }}>
              <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#FFFFFF" }}>CONTACT US</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "clamp(32px, 5vw, 72px)", alignItems: "end", marginTop: "30px" }}>
                <h1 data-reveal="1" data-reveal-delay="90" style={{ margin: "0", fontSize: "clamp(40px, 5.6vw, 88px)", lineHeight: "0.95", fontWeight: "700", letterSpacing: "-0.04em", color: "#FFFFFF" }}>Send the drawing.<br /><span style={{ color: "#F0DE9C" }}>Get a real date.</span></h1>
                <div data-reveal="1" data-reveal-delay="200">
                  <p style={{ margin: "0 0 24px", maxWidth: "34em", fontSize: "16.5px", lineHeight: "1.62", color: "rgba(255,255,255,0.88)" }}>Share a GA drawing, a bill of quantities, or simply the widths and lengths you need. We come back with sizes, finish options and a delivery date &mdash; typically within two working days.</p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a href="#enquiry" style={{ display: "inline-flex", alignItems: "center", gap: "11px", background: "#F0DE9C", color: "#0A3E48", fontWeight: "700", fontSize: "15px", padding: "18px 28px", borderRadius: "14px", transition: "transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms" }} data-x="x13">
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0A3E48", display: "block" }}></span>
                      Start an enquiry
                    </a>
                    <a href="tel:+919850845054" style={{ display: "inline-flex", alignItems: "center", gap: "11px", border: "1px solid rgba(255,255,255,0.36)", borderRadius: "14px", padding: "18px 26px", fontSize: "15px", fontWeight: "600", color: "#FFFFFF", transition: "border-color 240ms, background 240ms" }} data-x="x14">Call the works</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px 32px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 228px), 1fr))", gap: "16px" }}>
            {(channels ?? []).map((c, $index) => (
      <React.Fragment key={$index}>
              <a href={c.href} data-reveal="1" data-reveal-delay={c.delay} style={{ display: "flex", flexDirection: "column", gap: "14px", background: `${c.bg}`, border: `1px solid ${c.border}`, borderRadius: "18px", padding: "26px 26px 24px", minHeight: "176px", transition: "transform 340ms cubic-bezier(0.34,1.4,0.64,1), box-shadow 340ms" }} data-x="x15">
                <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: `${c.tagFg}` }}>{c.tag}</span>
                <span style={{ flex: "1" }}></span>
                <span style={{ fontSize: `${c.size}`, fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", color: `${c.fg}`, overflowWrap: "anywhere" }}>{c.value}</span>
                <span style={{ fontSize: "13px", lineHeight: "1.5", color: `${c.noteFg}` }}>{c.note}</span>
              </a>
            </React.Fragment>
      ))}
          </div>
        </div>

        <div id="enquiry" data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "72px 32px 88px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "24px", alignItems: "start" }}>
            <div data-reveal="1" data-formcard="1" style={{ background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.08)", borderRadius: "22px", padding: "clamp(28px, 3vw, 42px)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", paddingBottom: "26px", marginBottom: "28px", borderBottom: "1px solid rgba(10,62,72,0.1)" }}>
                <div>
                  <h2 style={{ margin: "0", fontSize: "clamp(26px, 2.8vw, 38px)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.032em", color: "#16211F" }}>Enquiry form</h2>
                  <p style={{ margin: "10px 0 0", maxWidth: "30em", fontSize: "15px", lineHeight: "1.62", color: "#4A524E" }}>Fields marked required are all we need to start. The more you tell us, the tighter the quotation.</p>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", background: "#F6F4EF", borderRadius: "999px", padding: "10px 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", color: "#0A3E48", whiteSpace: "nowrap" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C4A24F", display: "block", animation: "pi-pulse 2.4s ease-in-out infinite" }}></span>
                  REPLY IN 48 HRS
                </span>
              </div>
              <EnquiryForm source="contact" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div data-reveal="1" data-reveal-delay="90" style={{ background: "#0A3E48", borderRadius: "22px", padding: "32px 30px" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>THE WORKS</div>
                <p style={{ margin: "16px 0 0", fontSize: "16px", lineHeight: "1.66", color: "#FFFFFF" }}>Shed No. 01, Gat No. 313, Khedekar Industrial Estate, Goud Dhara Road, Khed Shivapur, Tal. Bhor, Dist. Pune &ndash; 412205</p>
                <a href="https://www.google.com/maps/search/?api=1&amp;query=Khedekar+Industrial+Estate+Khed+Shivapur+Pune" target="_blank" rel="noreferrer noopener" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "22px", background: "#F0DE9C", color: "#0A3E48", fontWeight: "700", fontSize: "14px", padding: "15px 22px", borderRadius: "13px", transition: "transform 240ms cubic-bezier(0.34,1.5,0.64,1), background 240ms" }} data-x="x16">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A3E48" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: "0" }}><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
                  Open in Google Maps
                </a>
                <div style={{ marginTop: "26px", paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {(hours ?? []).map((h, $index) => (
      <React.Fragment key={$index}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "18px" }}>
                      <span style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.82)" }}>{h.day}</span>
                      <span style={{ fontSize: "14.5px", fontWeight: "600", color: `${h.fg}`, textAlign: "right" }}>{h.time}</span>
                    </div>
                  </React.Fragment>
      ))}
                </div>
              </div>

              <div data-reveal="1" data-reveal-delay="150" style={{ background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.08)", borderRadius: "22px", padding: "30px" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#6E756F" }}>WHO TO ASK FOR</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "20px" }}>
                  {(people ?? []).map((p, $index) => (
      <React.Fragment key={$index}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", paddingBottom: "18px", borderBottom: "1px solid rgba(10,62,72,0.1)" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "-0.02em", color: "#16211F" }}>{p.name}</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.06em", color: "#8A6A1F" }}>{p.role}</span>
                      <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#4A524E" }}>{p.note}</span>
                    </div>
                  </React.Fragment>
      ))}
                </div>
                <a href="mailto:pratikshaindustries2@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "4px", fontSize: "14.5px", fontWeight: "600", color: "#0A3E48" }} data-x="x17">Email the office directly &#8594;</a>
              </div>

              <div data-reveal="1" data-reveal-delay="210" style={{ background: "#F1EFEA", borderRadius: "22px", padding: "28px 30px" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#6E756F" }}>CREDENTIALS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "18px" }}>
                  {(credentials ?? []).map((cr, $index) => (
      <React.Fragment key={$index}>
                    <span style={{ background: "#FFFFFF", border: "1px solid rgba(10,62,72,0.12)", borderRadius: "999px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", color: "#0A3E48" }}>{cr}</span>
                  </React.Fragment>
      ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-band2="1" style={{ background: "#8AA7AC", padding: "84px 0 88px" }}>
          <div data-wrap="1" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
            <div data-reveal="1" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.55)", borderRadius: "999px", padding: "9px 18px", fontSize: "11.5px", fontWeight: "600", letterSpacing: "0.14em", color: "#FFFFFF" }}>BEFORE YOU WRITE</div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginTop: "30px" }}>
              <h2 data-reveal="1" data-reveal-delay="80" style={{ margin: "0", fontSize: "clamp(30px, 4vw, 54px)", lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.035em", color: "#FFFFFF" }}>What speeds up a quotation</h2>
              <p data-reveal="1" data-reveal-delay="160" style={{ margin: "0", maxWidth: "330px", fontSize: "15.5px", lineHeight: "1.66", color: "rgba(255,255,255,0.9)" }}>None of it is mandatory &mdash; but each one removes a round of back-and-forth.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "14px", marginTop: "46px" }}>
              {(checklist ?? []).map((q, $index) => (
      <React.Fragment key={$index}>
                <div data-reveal="1" data-reveal-delay={q.delay} style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "16px", padding: "26px 24px 24px", minHeight: "190px", display: "flex", flexDirection: "column", gap: "14px", transition: "transform 320ms cubic-bezier(0.34,1.4,0.64,1), background 320ms, border-color 320ms" }} data-x="x18">
                  <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)" }}>{q.no}</span>
                  <span style={{ flex: "1" }}></span>
                  <span style={{ fontSize: "19px", fontWeight: "700", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{q.name}</span>
                  <span style={{ fontSize: "13.5px", lineHeight: "1.55", color: "rgba(255,255,255,0.82)" }}>{q.note}</span>
                </div>
              </React.Fragment>
      ))}
            </div>
          </div>
        </div>

      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}
