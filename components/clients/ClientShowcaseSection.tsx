'use client';

import React from 'react';
import { clients } from '@/content/clients';
import ClientLogo from './ClientLogo';

interface ClientShowcaseSectionProps {
  onOpenDirectory: () => void;
  onOpenQuoteRefs: () => void;
}

export default function ClientShowcaseSection({
  onOpenDirectory,
  onOpenQuoteRefs,
}: ClientShowcaseSectionProps) {
  // Top 8 featured titans for the spotlight card grid
  const featuredTitans = clients.filter((c) => c.tier === 'featured').slice(0, 10);


  return (
    <section
      id="clients"
      data-band="clients"
      data-band2="1"
      style={{
        background: 'linear-gradient(180deg, #0D3D47 0%, #12545F 50%, #0A3640 100%)',
        padding: '104px 0 108px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient rings matching Hero & Projects */}
      <div
        style={{
          position: 'absolute',
          right: '-220px',
          top: '-120px',
          width: '740px',
          height: '740px',
          borderRadius: '50%',
          border: '1px dashed rgba(240, 222, 156, 0.12)',
          pointerEvents: 'none',
          animation: 'pi-spin 90s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '-260px',
          bottom: '-160px',
          width: '820px',
          height: '820px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none',
          animation: 'pi-spin-rev 120s linear infinite',
        }}
      />

      <div
        data-wrap="1"
        style={{
          maxWidth: '1492px',
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              data-reveal="1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(240, 222, 156, 0.35)',
                borderRadius: '999px',
                padding: '9px 18px',
                fontSize: '11.5px',
                fontWeight: '700',
                letterSpacing: '0.16em',
                color: '#F0DE9C',
                textTransform: 'uppercase',
                background: 'rgba(240, 222, 156, 0.08)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F0DE9C',
                }}
              />
              CLIENTELE &amp; GLOBAL FOOTPRINT
            </div>
            <h2
              data-reveal="1"
              data-reveal-delay="80"
              style={{
                margin: '24px 0 0',
                fontSize: 'clamp(34px, 4.6vw, 64px)',
                lineHeight: '1.02',
                fontWeight: '700',
                letterSpacing: '-0.035em',
                color: '#FFFFFF',
              }}
            >
              Trusted by 40+ Leaders<br />
              <span style={{ color: '#F0DE9C' }}>Across 3 Countries</span>
            </h2>
          </div>

          <div
            data-reveal="1"
            data-reveal-delay="140"
            style={{
              maxWidth: '380px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              paddingTop: '8px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '15.5px',
                lineHeight: '1.68',
                color: 'rgba(255, 255, 255, 0.84)',
              }}
            >
              From automotive giants and heavy chemical plants in India to modern sugar refineries in Indonesia and Belize — Pratiksha Industries manufactures routing, earthing and instrumentation containment engineered to endure.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginTop: '6px',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#F0DE9C',
                    letterSpacing: '-0.02em',
                  }}
                >
                  40+
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.65)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Enterprise Clients
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#F0DE9C',
                    letterSpacing: '-0.02em',
                  }}
                >
                  3
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.65)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Nations Served
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Tier Spotlight Cards: The Big 8 Titans */}
        <div style={{ marginTop: '54px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11.5px',
                fontWeight: '700',
                letterSpacing: '0.14em',
                color: '#F0DE9C',
                textTransform: 'uppercase',
              }}
            >
              Spotlight: Key Enterprise Deployments
            </span>
            <span
              className="pi-hover-hint"
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Hover to illuminate &amp; view specialization
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
              gap: '16px',
            }}
          >
            {featuredTitans.map((client, idx) => (
              <div
                key={client.id}
                data-reveal="1"
                data-reveal-delay={idx * 60}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '18px',
                  padding: '24px 22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '200px',
                  transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={onOpenDirectory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#F0DE9C';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow =
                    '0 18px 36px -8px rgba(0, 0, 0, 0.55), 0 0 20px rgba(240, 222, 156, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Logo Display Box: Crisp white container */}
                <div
                  style={{
                    height: '62px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    marginBottom: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                  }}
                >
                  <ClientLogo client={client} height={44} maxWidth={190} />
                </div>

                {/* Meta details */}
                <div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {client.name}
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'rgba(255, 255, 255, 0.55)',
                      marginTop: '2px',
                    }}
                  >
                    {client.legalName}
                  </div>

                  <div
                    style={{
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#F0DE9C',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {client.category}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: 'rgba(255, 255, 255, 0.45)',
                      }}
                    >
                      {client.location.split('/')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Action Center / CTA Bar */}
      <div
        data-wrap="1"
        style={{
          maxWidth: '1492px',
          margin: '56px auto 0',
          padding: '0 32px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          data-reveal="1"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(240, 222, 156, 0.28)',
            borderRadius: '22px',
            padding: '36px 42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '28px',
            boxShadow: '0 20px 48px -12px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Need references or supplier credentials for your sector?
            </div>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: '14.5px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.78)',
                maxWidth: '600px',
              }}
            >
              Explore our full directory of 40+ enterprises with active installations across sugar mills, EPCs, automotive lines, and export plants.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={onOpenDirectory}
              style={{
                fontFamily: 'inherit',
                cursor: 'pointer',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: '#F0DE9C',
                color: '#0A3E48',
                fontWeight: '700',
                fontSize: '15px',
                padding: '18px 30px',
                borderRadius: '14px',
                transition: 'transform 260ms cubic-bezier(0.34,1.5,0.64,1), background 260ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#0A3E48',
                  display: 'block',
                }}
              />
              <span>Explore All 40+ Clients</span>
              <span
                style={{
                  background: 'rgba(10, 62, 72, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '800',
                }}
              >
                40
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenQuoteRefs}
              style={{
                fontFamily: 'inherit',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '15px',
                padding: '17px 26px',
                borderRadius: '14px',
                transition: 'all 240ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.borderColor = '#F0DE9C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
              }}
            >
              Request Reference Dossier
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pi-marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes pi-marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}
