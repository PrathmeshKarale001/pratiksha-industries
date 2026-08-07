'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLockScroll, useEscape, useFocusTrap } from '@/lib/hooks';
import EnquiryForm from '@/components/EnquiryForm';

type Props = {
  open: boolean;
  tag: string;
  title: string;
  onClose: () => void;
  /** Which page/CTA opened it — travels through to the enquiry email. */
  source?: string;
  subject?: string;
};

export default function EnquiryModal({ open, tag, title, onClose, source, subject }: Props) {
  useLockScroll(open);
  useEscape(open, onClose);
  const trapRef = useFocusTrap(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClose}
          data-modalscrim="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 320,
            background: 'rgba(4,30,37,0.76)',
            backdropFilter: 'blur(7px)',
            WebkitBackdropFilter: 'blur(7px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '26px 18px',
            overflowY: 'auto'
          }}
        >
          <motion.div
            ref={trapRef}
            onClick={(e) => e.stopPropagation()}
            data-modalcard="1"
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '840px',
              margin: 'auto',
              background: '#FFFFFF',
              borderRadius: '22px',
              padding: 'clamp(24px, 3vw, 40px)'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-x="modalclose"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                border: '1px solid rgba(10,62,72,0.14)',
                background: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 220ms, border-color 220ms'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A3E48" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>

            <div style={{ maxWidth: '30em', paddingBottom: '24px', marginBottom: '26px', borderBottom: '1px solid rgba(10,62,72,0.1)' }}>
              <div
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(10,62,72,0.28)',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#0A3E48'
                }}
              >
                {tag}
              </div>
              <h2 style={{ margin: '18px 0 0', fontSize: 'clamp(26px, 2.8vw, 36px)', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.032em', color: '#16211F' }}>
                {title}
              </h2>
              <p style={{ margin: '12px 0 0', fontSize: '15px', lineHeight: 1.62, color: '#4A524E' }}>
                Tell us what the run needs and we will come back with sizes, finish options and a delivery date
                &mdash; typically within two working days.
              </p>
            </div>

            <EnquiryForm source={source} subject={subject} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
