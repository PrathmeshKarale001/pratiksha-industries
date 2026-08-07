'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { EnquiryModal } from './EnquiryModal';

interface EnquiryModalState {
  isOpen: boolean;
  tag: string;
  title: string;
  subject: string;
}

interface EnquiryModalContextValue {
  openEnquiry: (opts?: { tag?: string; title?: string; subject?: string }) => void;
  closeEnquiry: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) throw new Error('useEnquiryModal must be used within EnquiryModalProvider');
  return ctx;
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EnquiryModalState>({
    isOpen: false,
    tag: 'SEND AN ENQUIRY',
    title: 'Request a quotation',
    subject: '',
  });

  const openEnquiry = useCallback(
    (opts?: { tag?: string; title?: string; subject?: string }) => {
      document.documentElement.style.overflow = 'hidden';
      setState({
        isOpen: true,
        tag: opts?.tag ?? 'SEND AN ENQUIRY',
        title: opts?.title ?? 'Request a quotation',
        subject: opts?.subject ?? '',
      });
    },
    []
  );

  const closeEnquiry = useCallback(() => {
    document.documentElement.style.overflow = '';
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  return (
    <EnquiryModalContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      <EnquiryModal
        isOpen={state.isOpen}
        tag={state.tag}
        title={state.title}
        subject={state.subject}
        onClose={closeEnquiry}
      />
    </EnquiryModalContext.Provider>
  );
}
