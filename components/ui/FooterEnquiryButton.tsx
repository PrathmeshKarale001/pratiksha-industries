'use client';

import { useEnquiryModal } from './EnquiryModalProvider';

export function FooterEnquiryButton() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <button
      type="button"
      onClick={() => openEnquiry()}
      className="cursor-pointer border-none w-full flex items-center justify-center min-h-[50px] rounded-btn bg-gold text-teal text-[14.5px] font-bold transition-all hover:bg-white hover:-translate-y-0.5"
    >
      Send an enquiry
    </button>
  );
}
