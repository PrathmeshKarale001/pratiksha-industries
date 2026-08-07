'use client';

import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import MobileActionBar from '@/components/MobileActionBar';
import { useReveal, useNavChrome } from '@/lib/hooks';

/**
 * Shell for the statically generated product detail pages: the page itself stays
 * a Server Component (so its content is in the initial HTML), and only the
 * chrome around it is client-side.
 */
export default function ProductChrome({
  children,
  heroHeight
}: {
  children: React.ReactNode;
  /** Height of a dark hero at the top of the page — keeps the navbar in glass mode over it. */
  heroHeight?: number;
}) {
  useReveal();
  const { mode, compact } = useNavChrome(heroHeight);

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', Helvetica, sans-serif",
        color: '#16211F',
        background: '#F6F4EF',
        overflowX: 'clip'
      }}
    >
      <a data-skip="1" href="#main">
        Skip to main content
      </a>

      <Navbar mode={mode} compact={compact} />

      <main id="main">
        {children}
      </main>

      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}
