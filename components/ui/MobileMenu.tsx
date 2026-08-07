'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/content/navigation';
import { COMPANY } from '@/lib/constants';

interface MobileMenuProps {
  closing: boolean;
  onClose: () => void;
  onEnquiry: () => void;
}

export function MobileMenu({ closing, onClose, onEnquiry }: MobileMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div data-navsheet="" data-closing={closing} className="fixed inset-0 z-[210]">
      {/* Scrim */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(4,30,37,0.62)] backdrop-blur-[6px]"
        style={{ animation: closing ? 'pi-scrim-in 210ms ease both reverse' : 'pi-scrim-in 260ms ease both' }}
      />

      {/* Panel */}
      <div
        className="absolute top-0 left-0 right-0 max-h-full overflow-y-auto bg-white rounded-b-[26px] shadow-[0_30px_70px_rgba(4,30,37,0.34)]"
        style={{
          padding: '90px 14px 22px',
          animation: closing ? 'pi-panel-up 220ms cubic-bezier(0.4,0,1,1) both' : 'pi-panel-down 360ms cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        <div className="flex flex-col gap-0.5">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between gap-3.5 min-h-[58px] px-4 rounded-btn text-[17px] font-semibold tracking-[-0.015em] active:bg-paper-2"
                style={{
                  color: active ? '#0A3E48' : '#16211F',
                  background: active ? '#F6F4EF' : 'transparent',
                  animation: `pi-item-in 420ms cubic-bezier(0.22,1,0.36,1) ${40 + i * 40}ms both`,
                }}
              >
                {link.label}
                <span className="text-base" style={{ color: active ? '#8A6A1F' : '#8AA7AC' }}>→</span>
              </Link>
            );
          })}
        </div>

        {/* Contact block */}
        <div
          className="mt-4 pt-4 border-t border-[rgba(10,62,72,0.1)] flex flex-col gap-2.5"
          style={{ animation: 'pi-item-in 440ms cubic-bezier(0.22,1,0.36,1) 300ms both' }}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center justify-center min-h-[52px] rounded-btn border border-[rgba(10,62,72,0.18)] text-[15px] font-semibold text-teal"
            >
              Call the works
            </a>
            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center min-h-[52px] rounded-btn border border-[rgba(10,62,72,0.18)] text-[15px] font-semibold text-teal"
            >
              WhatsApp
            </a>
          </div>
          <button
            type="button"
            onClick={onEnquiry}
            className="cursor-pointer border-none flex items-center justify-center min-h-[56px] rounded-btn bg-teal text-white text-base font-bold"
          >
            Send an enquiry
          </button>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-xs font-semibold tracking-[0.12em] text-mute">ISO 9001:2015</span>
            <span className="text-xs font-semibold tracking-[0.12em] text-bronze-dark">KHED SHIVAPUR, PUNE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
