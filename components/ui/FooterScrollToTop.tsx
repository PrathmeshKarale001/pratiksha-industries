'use client';

export function FooterScrollToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="cursor-pointer w-9 h-9 rounded-full border border-[rgba(255,255,255,0.2)] bg-transparent text-[rgba(255,255,255,0.5)] flex items-center justify-center transition-all hover:border-gold hover:text-gold hover:-translate-y-0.5"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
