'use client';

import { useState, useTransition } from 'react';
import { submitEnquiry } from '@/app/actions/enquiry';
import { PURPOSES, PRODUCT_FAMILIES, type EnquiryInput } from '@/lib/enquiry-schema';
import { site } from '@/content/site';

type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

const label: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  color: '#6E756F',
  marginBottom: '9px'
};

const control = (invalid: boolean): React.CSSProperties => ({
  width: '100%',
  background: '#FFFFFF',
  border: `1px solid ${invalid ? '#B3452F' : 'rgba(10,62,72,0.16)'}`,
  borderRadius: '13px',
  padding: '15px 16px',
  fontSize: '15px',
  color: '#16211F',
  outline: 'none',
  transition: 'border-color 220ms'
});

export default function EnquiryForm({ source, subject }: { source?: string; subject?: string }) {
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number]>('Request a quotation');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    formData.set('purpose', purpose);
    formData.set('source', source ?? 'website');
    if (subject) formData.set('qty', String(formData.get('qty') ?? ''));
    setErrors({});
    setFormError(null);
    setName(String(formData.get('name') ?? ''));

    startTransition(async () => {
      const res = await submitEnquiry(formData);
      if (res.ok) {
        setReference(res.reference);
      } else {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
      }
    });
  }

  if (reference) {
    return (
      <div data-sent="1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px', padding: '8px 0' }} aria-live="polite">
        <span
          data-sent-icon="1"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: '#0A3E48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F0DE9C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
        <div>
          <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 700, letterSpacing: '-0.03em', color: '#16211F' }}>
            Thank you{name ? `, ${name.split(' ')[0]}` : ''}.
          </h3>
          <p style={{ margin: '10px 0 0', fontSize: '15px', lineHeight: 1.62, color: '#4A524E', maxWidth: '38em' }}>
            Your enquiry is with the works. We reply with sizes, finish options and a delivery date &mdash;
            typically within two working days.
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '13px', letterSpacing: '0.1em', color: '#8A6A1F' }}>
          REFERENCE {reference}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={site.phoneHref} style={{ ...ghost }}>
            Call the works
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" style={{ ...ghost }}>
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={onSubmit} noValidate>
      {/* Honeypot — hidden from users, catches naive bots. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset style={{ border: 'none', margin: '0 0 26px', padding: 0 }}>
        <legend style={{ ...label, padding: 0 }}>WHAT IS THIS ABOUT?</legend>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {PURPOSES.map((p) => {
            const active = p === purpose;
            return (
              <button
                key={p}
                type="button"
                data-purpose="1"
                data-x="purposechip"
                aria-pressed={active}
                onClick={() => setPurpose(p)}
                style={{
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  background: active ? '#0A3E48' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#16211F',
                  border: `1px solid ${active ? '#0A3E48' : 'rgba(10,62,72,0.16)'}`,
                  borderRadius: '999px',
                  padding: '11px 18px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  transition: 'background 220ms, color 220ms, border-color 220ms, transform 220ms cubic-bezier(0.34,1.5,0.64,1)'
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div data-formgrid="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
        <Field id="name" name="name" label="YOUR NAME" placeholder="Full name" required error={errors.name} />
        <Field id="company" name="company" label="COMPANY" placeholder="Organisation (optional)" />
        <Field id="email" name="email" type="email" label="EMAIL" placeholder="name@company.com" required error={errors.email} />
        <Field id="phone" name="phone" type="tel" label="PHONE" placeholder="+91 …" required error={errors.phone} />

        <div>
          <label htmlFor="product" style={label}>
            PRODUCT FAMILY
          </label>
          <select id="product" name="product" defaultValue="" style={control(false)}>
            <option value="">Select a family</option>
            {PRODUCT_FAMILIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <Field id="qty" name="qty" label="QUANTITY / LENGTH" placeholder="e.g. 600 m of 300 mm ladder tray" />
      </div>

      <div style={{ marginTop: '16px' }}>
        <label htmlFor="message" style={label}>
          WHAT DO YOU NEED?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Sizes, lengths, finish, site location and the date you need it on."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          style={{ ...control(!!errors.message), resize: 'vertical', lineHeight: 1.6 }}
        />
        {errors.message ? (
          <span id="message-error" data-err="1" style={errText} role="alert">
            {errors.message}
          </span>
        ) : null}
      </div>

      {formError ? (
        <p data-err="1" role="alert" style={{ ...errText, display: 'block', marginTop: '16px', fontSize: '14px' }}>
          {formError}
        </p>
      ) : null}

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', marginTop: '24px' }}>
        <button
          type="submit"
          data-formsubmit="1"
          data-sending={pending ? 'true' : 'false'}
          disabled={pending}
          style={{
            fontFamily: 'inherit',
            cursor: pending ? 'wait' : 'pointer',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '11px',
            background: '#0A3E48',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '15px',
            padding: '19px 30px',
            borderRadius: '14px',
            opacity: pending ? 0.7 : 1,
            transition: 'transform 240ms cubic-bezier(0.34,1.5,0.64,1), background 240ms, opacity 240ms'
          }}
        >
          <span data-dot="1" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F0DE9C', display: 'block', flexShrink: 0 }} />
          <span data-ring="1" style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid rgba(240,222,156,0.3)', borderTopColor: '#F0DE9C', flexShrink: 0 }} />
          {pending ? 'Sending…' : 'Send enquiry'}
        </button>
        <span style={{ fontSize: '13px', lineHeight: 1.55, color: '#6E756F', maxWidth: '32em' }}>
          We reply within two working days. By sending this you agree to us contacting you about this
          enquiry &mdash; see our <a href="/privacy" style={{ color: '#0A3E48', textDecoration: 'underline' }}>privacy note</a>.
        </span>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label: text,
  placeholder,
  type = 'text',
  required,
  error
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={label}>
        {text}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={control(!!error)}
      />
      {error ? (
        <span id={`${id}-error`} data-err="1" style={errText} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

const errText: React.CSSProperties = {
  display: 'block',
  marginTop: '7px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#B3452F'
};

const ghost: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '48px',
  padding: '0 20px',
  borderRadius: '13px',
  border: '1px solid rgba(10,62,72,0.18)',
  fontSize: '14.5px',
  fontWeight: 600,
  color: '#0A3E48'
};
