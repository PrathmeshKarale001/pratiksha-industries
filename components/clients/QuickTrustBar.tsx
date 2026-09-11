'use client';

import React from 'react';
import { trustBarClients } from '@/content/clients';
import ClientLogo from './ClientLogo';

interface QuickTrustBarProps {
  onOpenDirectory?: () => void;
}

export default function QuickTrustBar({ onOpenDirectory }: QuickTrustBarProps) {
  // Duplicate for seamless infinite loop
  const marqueeItems = [...trustBarClients, ...trustBarClients];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0 14px 20px',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #062B32 0%, #0A3E48 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(240, 222, 156, 0.16)',
          boxShadow: '0 18px 40px -10px rgba(4, 26, 32, 0.35)',
          overflow: 'hidden',
          padding: '24px 0 20px',
          position: 'relative',
        }}
      >
        {/* Header Ribbon / Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#F0DE9C',
                boxShadow: '0 0 10px #F0DE9C',
                display: 'inline-block',
                animation: 'pi-pulse 2s infinite',
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.18em',
                color: '#F0DE9C',
                textTransform: 'uppercase',
              }}
            >
              Enterprise Clientele &amp; Industrial Footprint
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500',
              }}
            >
              Supplying critical routing &amp; containment to 40+ facilities
            </span>
            {onOpenDirectory && (
              <button
                type="button"
                onClick={onOpenDirectory}
                style={{
                  background: 'rgba(240, 222, 156, 0.12)',
                  border: '1px solid rgba(240, 222, 156, 0.3)',
                  color: '#F0DE9C',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 240ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F0DE9C';
                  e.currentTarget.style.color = '#0A3E48';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(240, 222, 156, 0.12)';
                  e.currentTarget.style.color = '#F0DE9C';
                }}
              >
                <span>View All 40+</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>
        </div>

        {/* Gradient edge masks for smooth fade */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '55px',
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(90deg, #062B32 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '55px',
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(270deg, #062B32 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling Ticker Track */}
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            paddingTop: '16px',
            cursor: 'pointer',
          }}
          onClick={onOpenDirectory}
        >
          <div
            className="quick-trust-ticker"
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'max-content',
              animation: 'pi-trust-marquee 36s linear infinite',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {marqueeItems.map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 28px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'transform 260ms ease, opacity 260ms ease',
                }}
                onMouseEnter={(e) => {
                  const logo = e.currentTarget.querySelector('.client-logo-wrapper') as HTMLElement;
                  if (logo) {
                    logo.style.filter = 'none';
                    logo.style.transform = 'scale(1.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  const logo = e.currentTarget.querySelector('.client-logo-wrapper') as HTMLElement;
                  if (logo) {
                    logo.style.filter = 'grayscale(1) brightness(1.2) opacity(0.82)';
                    logo.style.transform = 'scale(1)';
                  }
                }}
              >
                <ClientLogo client={client} height={38} maxWidth={160} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pi-trust-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes pi-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}
