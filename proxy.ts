import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporary client-preview gate. While SITE_PREVIEW_LOCK="true" is set (in
// Vercel project env vars, not committed here), every route except the
// homepage 307s back to "/" so only the single-page experience is visible.
// Unset (or any other value) and the full multi-page site — /about,
// /products, /products/[slug], /contact, /privacy — is reachable normally.
// Remove this file entirely once the preview period is over; until then,
// flip the env var rather than editing this logic.
const PREVIEW_LOCKED = process.env.SITE_PREVIEW_LOCK === 'true';

export function proxy(request: NextRequest) {
  if (!PREVIEW_LOCKED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow home page, Next.js internal files, static assets, images, pdfs, robots, sitemap, api
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/pdfs') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Redirect any other route (e.g. /about, /products, /contact, /privacy) to home page
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
