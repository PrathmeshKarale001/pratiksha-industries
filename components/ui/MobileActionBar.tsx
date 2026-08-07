'use client';

import { COMPANY } from '@/lib/constants';
import { useEnquiryModal } from './EnquiryModalProvider';

export function MobileActionBar() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-[200] hidden max-lg:grid gap-2 bg-[rgba(255,255,255,0.95)] backdrop-blur-[16px] border-t border-[rgba(10,62,72,0.14)]"
      style={{
        gridTemplateColumns: '1fr 1fr 1.3fr',
        padding: '9px 12px calc(9px + env(safe-area-inset-bottom))',
        animation: 'pi-bar-up 560ms cubic-bezier(0.22,1,0.36,1) 500ms both',
      }}
    >
      <a
        href={COMPANY.phoneHref}
        className="flex items-center justify-center min-h-[50px] rounded-btn border border-[rgba(10,62,72,0.18)] text-[14.5px] font-semibold text-teal active:scale-[0.97] active:bg-paper transition-transform"
      >
        Call
      </a>
      <a
        href={COMPANY.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center justify-center min-h-[50px] rounded-btn border border-[rgba(10,62,72,0.18)] text-[14.5px] font-semibold text-teal active:scale-[0.97] active:bg-paper transition-transform"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={() => openEnquiry()}
        className="cursor-pointer border-none flex items-center justify-center min-h-[50px] rounded-btn bg-teal text-white text-[14.5px] font-bold active:scale-[0.97] transition-transform"
      >
        Send enquiry
      </button>
    </div>
  );
}
