'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export function RevealOnScroll({
  children,
  delay = 0,
  className = '',
  style,
  as: Tag = 'div',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';

    const show = () => {
      setTimeout(() => {
        el.style.transition = 'opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show();
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    io.observe(el);

    // Fallback rect sweep for elements already in view
    const sweep = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.96) {
        show();
        io.unobserve(el);
      }
    }, 200);

    return () => {
      io.disconnect();
      clearTimeout(sweep);
    };
  }, [delay]);

  return (
    // Dynamic tag element
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
