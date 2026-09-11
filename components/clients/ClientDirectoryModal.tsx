'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { clients, CLIENT_CATEGORIES } from '@/content/clients';
import ClientLogo from './ClientLogo';

interface ClientDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote?: () => void;
}

export default function ClientDirectoryModal({
  isOpen,
  onClose,
  onRequestQuote,
}: ClientDirectoryModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter logic
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      // Category filter
      if (selectedCategory === 'international') {
        if (client.country === 'India') return false;
      } else if (selectedCategory !== 'all') {
        if (client.category !== selectedCategory) return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        client.name.toLowerCase().includes(q) ||
        client.legalName.toLowerCase().includes(q) ||
        client.category.toLowerCase().includes(q) ||
        client.location.toLowerCase().includes(q) ||
        client.country.toLowerCase().includes(q) ||
        (client.highlight && client.highlight.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Client Directory"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(6, 28, 33, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'pi-modal-fade 280ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1180px',
          maxHeight: '92vh',
          backgroundColor: '#0A3E48',
          borderRadius: '24px',
          border: '1px solid rgba(240, 222, 156, 0.25)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '28px 36px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(180deg, #072F37 0%, #0A3E48 100%)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(240, 222, 156, 0.12)',
                border: '1px solid rgba(240, 222, 156, 0.28)',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.14em',
                color: '#F0DE9C',
                textTransform: 'uppercase',
                marginBottom: '10px',
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
              Enterprise Client Directory (40 Partners)
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(24px, 3vw, 34px)',
                fontWeight: '700',
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
              }}
            >
              Supplying Industry Leaders Across 3 Countries
            </h2>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.72)',
                maxWidth: '640px',
                lineHeight: '1.5',
              }}
            >
              From automotive assembly plants to sugar mills, thermal power blocks, and refineries — explore the full spectrum of industrial organizations that rely on Pratiksha Industries.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close directory"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FFFFFF',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(240, 222, 156, 0.25)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            &times;
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            padding: '18px 36px',
            background: 'rgba(4, 26, 32, 0.45)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%' }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(240, 222, 156, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, sector, or location (e.g., Mahindra, Sugar, Belize, L&T)..."
              style={{
                width: '100%',
                padding: '13px 44px 13px 46px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                background: 'rgba(255, 255, 255, 0.07)',
                color: '#FFFFFF',
                fontSize: '14.5px',
                outline: 'none',
                transition: 'border-color 200ms ease, background 200ms ease',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#F0DE9C';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none',
            }}
          >
            {CLIENT_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: active ? '700' : '500',
                    border: active
                      ? '1px solid #F0DE9C'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    background: active ? '#F0DE9C' : 'rgba(255, 255, 255, 0.05)',
                    color: active ? '#0A3E48' : '#FFFFFF',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    fontFamily: 'inherit',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clients Grid Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 36px 36px',
          }}
        >
          {/* Results Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              fontSize: '12.5px',
              color: 'rgba(255, 255, 255, 0.65)',
            }}
          >
            <span>
              Showing <strong style={{ color: '#F0DE9C' }}>{filteredClients.length}</strong> of{' '}
              {clients.length} enterprise partners
            </span>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F0DE9C',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredClients.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
                No clients match your filter
              </div>
              <p style={{ fontSize: '14px', marginTop: '6px' }}>
                Try adjusting your search query or switching category tabs.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                style={{
                  marginTop: '16px',
                  background: '#F0DE9C',
                  color: '#0A3E48',
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Show All Clients
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {filteredClients.map((client) => {
                const isInternational = client.country !== 'India';
                return (
                  <div
                    key={client.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '16px',
                      border: isInternational
                        ? '1px solid rgba(240, 222, 156, 0.45)'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '20px 18px 18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.borderColor = '#F0DE9C';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow =
                        '0 12px 28px -6px rgba(0, 0, 0, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.borderColor = isInternational
                        ? 'rgba(240, 222, 156, 0.45)'
                        : 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Country Badge */}
                    {isInternational && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(240, 222, 156, 0.2)',
                          border: '1px solid #F0DE9C',
                          color: '#F0DE9C',
                          fontSize: '9px',
                          fontWeight: '800',
                          letterSpacing: '0.08em',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {client.country === 'Indonesia'
                          ? '🇮🇩 Indonesia'
                          : client.country === 'Belize'
                          ? '🇧🇿 Belize'
                          : 'Global'}
                      </div>
                    )}

                    {/* Logo Section: Crisp white container */}
                    <div
                      style={{
                        height: '66px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 14px',
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        marginBottom: '14px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
                      }}
                    >
                      <ClientLogo client={client} height={46} maxWidth={200} />
                    </div>

                    {/* Details */}
                    <div>
                      <div
                        style={{
                          fontSize: '14.5px',
                          fontWeight: '700',
                          color: '#FFFFFF',
                          lineHeight: '1.3',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {client.name}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'rgba(255, 255, 255, 0.55)',
                          marginTop: '3px',
                          lineHeight: '1.3',
                        }}
                      >
                        {client.legalName}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '10px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#F0DE9C',
                        }}
                      >
                        <span
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#F0DE9C',
                          }}
                        />
                        {client.category}
                      </div>

                      {client.highlight && (
                        <div
                          style={{
                            marginTop: '6px',
                            fontSize: '11.5px',
                            color: 'rgba(255, 255, 255, 0.75)',
                            lineHeight: '1.4',
                          }}
                        >
                          {client.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Inquiry CTA */}
        <div
          style={{
            padding: '18px 36px',
            background: 'linear-gradient(180deg, #0A3E48 0%, #062329 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11.5px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Need references for your specific industry sector?
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                padding: '10px 18px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Close
            </button>
            {onRequestQuote && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote();
                }}
                style={{
                  background: '#F0DE9C',
                  border: 'none',
                  color: '#0A3E48',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 200ms ease, background 200ms ease',
                  fontFamily: 'inherit',
                }}
              >
                <span>Request Project References</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pi-modal-fade {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
