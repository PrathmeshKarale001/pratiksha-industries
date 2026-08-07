'use server';

import { headers } from 'next/headers';
import {
  enquirySchema,
  makeReference,
  type EnquiryResult
} from '@/lib/enquiry-schema';

/** Naive in-memory limiter. Swap for Upstash Redis before scaling past one instance. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: 'Please check the highlighted fields.', fieldErrors };
  }

  const data = parsed.data;

  // Honeypot — silently succeed so bots do not learn anything.
  if (data.website) return { ok: true, reference: makeReference() };

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return {
      ok: false,
      error: 'Too many enquiries from this connection. Please call +91 98508 45054 instead.'
    };
  }

  const reference = makeReference();
  const submittedAt = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  }).format(new Date());

  const lines = [
    `Reference:  ${reference}`,
    `Received:   ${submittedAt} IST`,
    `Purpose:    ${data.purpose}`,
    '',
    `Name:       ${data.name}`,
    `Company:    ${data.company || '—'}`,
    `Email:      ${data.email}`,
    `Phone:      ${data.phone}`,
    `Product:    ${data.product ?? '—'}`,
    `Quantity:   ${data.qty || '—'}`,
    `Source:     ${data.source ?? 'website'}`,
    '',
    'Message:',
    data.message
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;

  // Development / unconfigured: log rather than fail, so the flow stays testable.
  if (!apiKey) {
    console.info('[enquiry] RESEND_API_KEY not set — logging instead of sending:\n' + lines);
    return { ok: true, reference };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? 'website@pratikshaindustries.in',
        to: process.env.ENQUIRY_TO_EMAIL ?? 'pratikshaindustries2@gmail.com',
        reply_to: data.email,
        subject: `[${reference}] ${data.purpose} — ${data.name}`,
        text: lines
      })
    });

    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error('[enquiry] delivery failed', err);
    return {
      ok: false,
      error:
        'We could not send that just now. Please call +91 98508 45054 or WhatsApp us — your details are still in the form.'
    };
  }

  // TODO(client): also persist to a durable store so leads survive an email outage.
  return { ok: true, reference };
}
