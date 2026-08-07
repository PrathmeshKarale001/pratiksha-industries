'use client';

import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll reveal.
 *
 * Ported from the prototype's observer + rect-sweep pair. The contract that
 * matters: content is visible by default (CSS only hides it once this hook has
 * confirmed it is running), so a failure mode is "no animation", never
 * "no content". Do not change that.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const root = document.documentElement;
    root.setAttribute('data-reveal-ready', '1');

    const runCount = (el: HTMLElement) => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const to = parseFloat(el.getAttribute('data-count-to') || '0');
      const suffix = el.getAttribute('data-count-suffix') || '';
      const plain = el.getAttribute('data-count-plain') === '1';
      if (isNaN(to)) return;
      const duration = 1400;
      const start = performance.now();
      const fmt = (n: number) =>
        to >= 1000 && !plain
          ? Math.round(n).toLocaleString('en-IN')
          : Math.round(n).toString();

      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(to * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const show = (el: Element) => {
      const node = el as HTMLElement;
      if (node.dataset.shown) return;
      node.dataset.shown = '1';
      const delay = Number(node.dataset.revealDelay ?? 0);
      node.style.transitionDelay = reduce ? '0ms' : `${delay}ms`;
      node.style.opacity = '1';
      node.style.transform = 'none';

      // Animate child count elements when parent is revealed
      if (node.getAttribute('data-count-to')) {
        runCount(node);
      }
      node.querySelectorAll('[data-count-to]').forEach((c) => runCount(c as HTMLElement));
    };

    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (reduce) {
      nodes.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    nodes.forEach((n) => io.observe(n));

    // Safety sweep — catches anchor jumps, restored scroll and observer misses.
    const sweep = () => {
      const h = window.innerHeight;
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < h * 1.15 && r.bottom > -200) show(el);
      });
    };
    const t = window.setTimeout(sweep, 900);
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
    };
  }, []);
}

/**
 * Navbar chrome: glass while a dark hero is behind the pill, solid once it has
 * scrolled past, plus the compressed state after 46px of scroll.
 * `heroRef` is the hero element; omit it on pages with a light hero.
 */
export function useNavChrome(
  hero?: React.RefObject<HTMLElement | null> | number
) {
  const [mode, setMode] = useState<'glass' | 'solid'>(hero ? 'glass' : 'solid');
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setCompact(y > 46);
      if (typeof hero === 'number') {
        setMode(hero - y > 86 ? 'glass' : 'solid');
        return;
      }
      const el = hero?.current;
      setMode(el && el.getBoundingClientRect().bottom > 86 ? 'glass' : 'solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hero]);

  return { mode, compact };
}

/** Locks page scroll while a dialog or the menu sheet is open. */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);
}

/** Escape-to-close for dialogs and the menu sheet. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, onEscape]);
}

/**
 * Focus trap + restore for dialogs. The prototype could not do this;
 * it is required for WCAG 2.2 AA.
 */
export function useFocusTrap(active: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    const restore = document.activeElement as HTMLElement | null;
    const selector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(container?.querySelectorAll<HTMLElement>(selector) ?? []).filter(
        (el) => el.offsetParent !== null
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      restore?.focus?.();
    };
  }, [active]);

  return ref;
}

/** Counts a number up when it scrolls into view (hero stat figures). */
export function useCountUp(target: number, suffix = '') {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    let done = false;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || done) return;
      done = true;
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return ref;
}
