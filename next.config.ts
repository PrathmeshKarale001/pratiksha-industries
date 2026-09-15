import type { NextConfig } from "next";

// Baseline security headers. Note: style-src and script-src allow
// 'unsafe-inline' because the site's component styling and the JSON-LD
// blocks in app/layout.tsx / app/*/page.tsx rely on inline style objects
// and inline <script type="application/ld+json"> tags — a stricter,
// nonce-based CSP would need a proxy.ts change to mint and thread a nonce
// through every render and is a reasonable follow-up, not a blocker here.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
];

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist for any `quality` value used
    // with next/image. 75 is the default; 72/78/80 are used to trade a
    // little extra compression for the larger hero/card photos.
    qualities: [72, 75, 78, 80]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
