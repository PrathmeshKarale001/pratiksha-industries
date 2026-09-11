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
        margin: '0 auto',
        padding: '0 14px 20px',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #062B32 0%, #0A3E48 100%)',
          borderRadius: '18px',
          border: '1px solid rgba(240, 222, 156, 0.22)',
          boxShadow: '0 18px 40px -10px rgba(4, 26, 32, 0.45)',
          overflow: 'hidden',
          padding: '22px 0 20px',
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
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.72)',
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
                  background: 'rgba(240, 222, 156, 0.15)',
                  border: '1px solid rgba(240, 222, 156, 0.4)',
                  color: '#F0DE9C',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  padding: '6px 14px',
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
                  e.currentTarget.style.background = 'rgba(240, 222, 156, 0.15)';
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
            width: '90px',
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
            width: '90px',
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
              animation: 'pi-trust-marquee 38s linear infinite',
              gap: '16px',
              paddingLeft: '16px',
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
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(240, 222, 156, 0.45)',
                  padding: '8px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '56px',
                  minWidth: '150px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
                  transition: 'all 240ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
                  e.currentTarget.style.borderColor = '#C4A24F';
                  e.currentTarget.style.boxShadow =
                    '0 8px 22px rgba(0,0,0,0.3), 0 0 16px rgba(240,222,156,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(240, 222, 156, 0.45)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.18)';
                }}
              >
                <ClientLogo client={client} height={38} maxWidth={130} />
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
