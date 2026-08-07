import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = form.get('name') as string;
    const company = form.get('company') as string;
    const email = form.get('email') as string;
    const phone = form.get('phone') as string;
    const city = form.get('city') as string;
    const product = form.get('product') as string;
    const qty = form.get('qty') as string;
    const msg = form.get('msg') as string;
    const purpose = form.get('purpose') as string;
    const file = form.get('file') as File | null;

    // Basic validation
    if (!name || !email || !phone || !msg) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate reference number
    const ref = `PI-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    // TODO: Phase 4 — Resend email, Vercel Blob file upload, Upstash rate limiting
    // For now, log the enquiry and return success
    console.log('[Enquiry]', {
      ref,
      name,
      company,
      email,
      phone,
      city,
      product,
      qty,
      msg,
      purpose,
      hasFile: !!file,
      fileName: file?.name,
    });

    return NextResponse.json({ ref, ok: true });
  } catch (error) {
    console.error('[Enquiry Error]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try calling us directly.' },
      { status: 500 }
    );
  }
}
