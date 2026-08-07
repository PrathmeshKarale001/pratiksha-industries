'use client';

import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const bar = barRef.current;

    const onScroll = () => {
      if (ticking || !bar) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const y = window.scrollY || 0;
        bar.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : '0%';
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[3px] w-0 bg-bronze z-[190]"
      style={{ transition: 'width 90ms linear' }}
      aria-hidden="true"
    />
  );
}
