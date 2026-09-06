# Pratiksha Industries — Website

Production website for **Pratiksha Industries**, an ISO 9001:2015 certified manufacturer of cable tray systems, tray fittings, earthing products and instrumentation manifolds at Khed Shivapur, Pune.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + inline style objects |
| Animations | Framer Motion 13 + custom scroll reveals |
| Forms | React Hook Form 7 + Zod 4 validation |
| Email | Resend API |
| Analytics | Vercel Analytics (cookieless) |
| Hosting | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

See [`.env.example`](.env.example) for all available configuration. Key variables:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production domain for canonical URLs and OG metadata |
| `RESEND_API_KEY` | Production | Resend API key for enquiry form emails |
| `ENQUIRY_FROM_EMAIL` | No | Sender address (has fallback) |
| `ENQUIRY_TO_EMAIL` | No | Recipient address (has fallback) |
| `SITE_PREVIEW_LOCK` | No | Set `true` to restrict to homepage only |

## Project Structure

```
app/                  # Next.js App Router pages
  actions/            # Server actions (enquiry form)
  api/                # API routes
  products/[slug]/    # Dynamic product detail pages
components/
  pages/              # Full page components
  ui/                 # Reusable UI components
content/              # Static content data (products, site config, etc.)
lib/                  # Utilities, hooks, schemas
public/
  assets/ → images/   # Symlink — all images served from /assets/
  pdfs/               # Downloadable catalogues and certificates
types/                # Shared TypeScript types
```

## Pages

- `/` — Homepage with hero, product overview, capabilities, quality control, projects, catalogue and contact
- `/about` — Company history, founder's note, machinery, principles and credentials
- `/products` — Full product index with family filtering
- `/products/[slug]` — Individual product detail (20 items, statically generated)
- `/contact` — Contact information with enquiry form
- `/privacy` — Privacy policy

## Production Build

```bash
npm run build
```

## License

All rights reserved © Pratiksha Industries.
