import { z } from 'zod';

export const PURPOSES = [
  'Request a quotation',
  'Technical specification',
  'Plant visit',
  'Something else'
] as const;

export const PRODUCT_FAMILIES = [
  'Cable Tray Systems',
  'Cable Tray Fittings',
  'Couplers & Supports',
  'Earthing & Instrumentation',
  'Mixed / not sure yet'
] as const;

/** Shared by the client form and the server action. Never trust the client. */
export const enquirySchema = z.object({
  purpose: z.enum(PURPOSES).default('Request a quotation'),
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{8,20}$/, 'Please enter a valid phone number.'),
  product: z.enum(PRODUCT_FAMILIES).optional(),
  qty: z.string().trim().max(80).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little more — sizes, lengths or the drawing reference.')
    .max(4000),
  source: z.string().max(120).optional(),
  // Honeypot: real users never fill this.
  website: z.string().max(0).optional().or(z.literal(''))
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof EnquiryInput, string>> };

/** PI-YYMMDD-XXXX, quoted back to the enquirer and used in the email subject. */
export function makeReference(date = new Date()) {
  const stamp = date
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PI-${stamp}-${rand}`;
}
