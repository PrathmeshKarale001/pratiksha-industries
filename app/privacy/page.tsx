import type { Metadata } from 'next';
import Link from 'next/link';
import ProductChrome from '@/components/pages/ProductChrome';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How Pratiksha Industries handles the information you send through the website enquiry form.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true }
};

const h2: React.CSSProperties = {
  margin: '44px 0 12px',
  fontSize: 'clamp(22px, 2.4vw, 28px)',
  fontWeight: 700,
  letterSpacing: '-0.028em',
  color: '#16211F'
};

const p: React.CSSProperties = {
  margin: '0 0 14px',
  fontSize: '16px',
  lineHeight: 1.72,
  color: '#4A524E',
  maxWidth: '38em'
};

export default function PrivacyPage() {
  return (
    <ProductChrome>
      <div data-wrap="1" style={{ maxWidth: '1240px', margin: '0 auto', padding: '132px 32px 40px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11.5px',
            letterSpacing: '0.16em',
            color: '#8A6A1F'
          }}
        >
          PRIVACY
        </div>
        <h1
          style={{
            margin: '18px 0 0',
            maxWidth: '16em',
            fontSize: 'clamp(34px, 4.4vw, 62px)',
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: '-0.042em',
            color: '#16211F'
          }}
        >
          What we do with what you send us
        </h1>
        <p style={{ ...p, marginTop: '20px', fontSize: '17.5px' }}>
          Short version: we use your details to answer your enquiry, and nothing else. We do not
          sell them, and we do not add you to a mailing list.
        </p>

        <h2 style={h2}>What we collect</h2>
        <p style={p}>
          Only what you type into the enquiry form: your name, company, email address, phone
          number, the product family and quantity you are asking about, your message, and any
          drawing or bill of quantities you choose to attach. Our server also records the IP
          address a submission came from, briefly, to stop automated spam.
        </p>

        <h2 style={h2}>Why we hold it</h2>
        <p style={p}>
          To quote your enquiry and to follow it through fabrication and dispatch if it becomes an
          order. Quotations and their correspondence are kept as business records; if you would
          rather we deleted yours, write to{' '}
          <a href={site.emailHref} style={{ color: '#0A3E48', textDecoration: 'underline' }}>
            {site.email}
          </a>{' '}
          and we will.
        </p>

        <h2 style={h2}>Who else sees it</h2>
        <p style={p}>
          Enquiries are delivered to our own inbox through an email service provider. Nobody else
          receives your details, and we do not share them with third parties for marketing.
        </p>

        <h2 style={h2}>Cookies and analytics</h2>
        <p style={p}>
          This site does not use advertising or tracking cookies. If page analytics are enabled,
          they are aggregate and cookieless &mdash; we can see that a page was visited, not who
          visited it.
        </p>

        <h2 style={h2}>Your choices</h2>
        <p style={p}>
          You can ask us what we hold about you, ask for it to be corrected, or ask for it to be
          deleted. Email{' '}
          <a href={site.emailHref} style={{ color: '#0A3E48', textDecoration: 'underline' }}>
            {site.email}
          </a>{' '}
          or call{' '}
          <a href={site.phoneHref} style={{ color: '#0A3E48', textDecoration: 'underline' }}>
            {site.phone}
          </a>
          .
        </p>

        <h2 style={h2}>Contact</h2>
        <p style={p}>
          {site.name}, {site.address.street}, Dist. {site.address.locality} &ndash;{' '}
          {site.address.postalCode}, {site.address.region}, India.
        </p>

        <p style={{ ...p, marginTop: '34px', fontSize: '13.5px', color: '#6E756F' }}>
          {/* TODO(client): have this reviewed against India's DPDP Act before launch. */}
          Last updated {new Date().getFullYear()}. Questions about this note?{' '}
          <Link href="/contact" style={{ color: '#0A3E48', textDecoration: 'underline' }}>
            Get in touch
          </Link>
          .
        </p>
      </div>
    </ProductChrome>
  );
}
