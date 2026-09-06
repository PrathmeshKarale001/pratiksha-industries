'use client';

import { useEffect, useRef } from 'react';
import { EnquiryForm } from './EnquiryForm';

interface EnquiryModalProps {
  isOpen: boolean;
  tag: string;
  title: string;
  subject: string;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, tag, title, subject, onClose }: EnquiryModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  // Focus trap + restore
  useEffect(() => {
    if (!isOpen) return;
    prevFocus.current = document.activeElement as HTMLElement;
    // Focus the close button after render
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      prevFocus.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[320] bg-[rgba(4,30,37,0.74)] backdrop-blur-[7px] flex items-start justify-center p-5 md:p-6 overflow-y-auto"
      style={{ animation: 'pi-scrim-in 240ms ease both' }}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry form"
        className="relative w-full max-w-[840px] my-auto bg-white rounded-hero p-6 md:p-10"
        style={{ animation: 'pi-modal-in 480ms cubic-bezier(0.22,1,0.36,1) both' }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[18px] right-[18px] w-[42px] h-[42px] rounded-chip border border-[rgba(10,62,72,0.14)] bg-white text-teal flex items-center justify-center cursor-pointer transition-colors hover:bg-paper hover:border-teal"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        {/* Header */}
        <div className="max-w-[30em] pb-6 mb-6 border-b border-[rgba(10,62,72,0.1)]">
          <div className="inline-block border border-[rgba(10,62,72,0.28)] rounded-pill px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-teal">
            {tag}
          </div>
          <h2 className="mt-[18px] text-[clamp(26px,2.8vw,36px)] leading-[1.05] font-bold tracking-[-0.032em] text-ink">
            {title}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.62] text-body">
            Tell us what the run needs and we will come back with sizes, finish options and a delivery date — typically within two working days.
          </p>
        </div>

        <EnquiryForm subject={subject} />
      </div>
    </div>
  );
}
