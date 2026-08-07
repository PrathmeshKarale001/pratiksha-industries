'use client';

import { useState, useCallback, useRef } from 'react';
import { COMPANY } from '@/lib/constants';

const PURPOSES = [
  'Request a quotation',
  'Technical / spec help',
  'Bulk or repeat supply',
  'Become a distributor',
] as const;

const PRODUCT_OPTIONS = [
  'Select a product family',
  'Cable Tray Systems',
  'Ladder Type Cable Tray',
  'Perforated Cable Tray',
  'Wire Mesh Cable Tray',
  'Raceway Cable Tray',
  'Earthing Products',
  'Cable Tray Accessories',
  'Cable Glands & Fittings',
  'Instrumentation Manifolds',
  'Custom fabrication',
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
}

interface EnquiryFormProps {
  subject?: string;
  submitLabel?: string;
  formNote?: string;
}

export function EnquiryForm({
  subject = '',
  submitLabel = 'Send enquiry',
  formNote = 'We reply within two working days. Your details are used only to prepare this quotation.',
}: EnquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '', company: '', email: '', phone: '', city: '',
  });
  const [product, setProduct] = useState(subject || '');
  const [qty, setQty] = useState('');
  const [msg, setMsg] = useState('');
  const [purpose, setPurpose] = useState<string>('Request a quotation');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [ref, setRef] = useState('');
  const [sentName, setSentName] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = useCallback((v: FormData, message: string) => {
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = 'Please tell us your name.';
    if (!v.email.trim()) e.email = 'We need an email to reply to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'That email does not look right.';
    const digits = v.phone.replace(/\D/g, '');
    if (!v.phone.trim()) e.phone = 'A phone number helps us clarify quickly.';
    else if (digits.length < 10) e.phone = 'Enter at least 10 digits.';
    if (!message.trim()) e.msg = 'A line or two about the requirement, please.';
    else if (message.trim().length < 12) e.msg = 'A little more detail helps us quote accurately.';
    return e;
  }, []);

  const setField = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const blurField = (key: string) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const all = validate(formData, msg);
    setErrors((prev) => {
      const n = { ...prev };
      if (all[key]) n[key] = all[key]; else delete n[key];
      return n;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData, msg);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ name: true, email: true, phone: true, msg: true });
      return;
    }
    setStatus('sending');
    setErrors({});

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('company', formData.company);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('city', formData.city);
      form.append('product', product);
      form.append('qty', qty);
      form.append('msg', msg);
      form.append('purpose', purpose);
      if (fileRef.current?.files?.[0]) {
        form.append('file', fileRef.current.files[0]);
      }

      const res = await fetch('/api/enquiry', { method: 'POST', body: form });
      const data = await res.json();

      if (res.ok) {
        setRef(data.ref);
        setSentName(formData.name.trim().split(' ')[0]);
        setStatus('sent');
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch {
      // Failure UX — show error with phone/WhatsApp fallback, don't lose form data
      setStatus('idle');
      setErrors({
        _form: `We could not send the enquiry. Please try again, or call us at ${COMPANY.phone} / WhatsApp.`,
      });
    }
  };

  const reset = () => {
    setFormData({ name: '', company: '', email: '', phone: '', city: '' });
    setProduct(subject || '');
    setQty('');
    setMsg('');
    setPurpose('Request a quotation');
    setTouched({});
    setErrors({});
    setStatus('idle');
    setRef('');
    setSentName('');
    setFileName('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const err = (key: string) => touched[key] ? errors[key] : undefined;

  /* ── Success Screen ────────────────────────────────────────────────── */
  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start gap-[18px] py-2" style={{ animation: 'pi-modal-in 520ms cubic-bezier(0.22,1,0.36,1) both' }}>
        <span
          className="w-[58px] h-[58px] rounded-full bg-gold flex items-center justify-center shrink-0"
          style={{ animation: 'pi-pop 640ms cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0A3E48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
        <div>
          <h3 className="text-[clamp(24px,2.4vw,32px)] leading-[1.1] font-bold tracking-[-0.03em] text-ink">
            Enquiry received
          </h3>
          <p className="mt-3 max-w-[34em] text-[15.5px] leading-[1.66] text-body">
            Thank you {sentName}. Our team will review the details and respond with sizes, finish options and a delivery date — typically within two working days.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 p-4 bg-paper rounded-btn">
          <div className="flex flex-col gap-1 pr-[22px] border-r border-[rgba(10,62,72,0.14)]">
            <span className="text-[10.5px] font-semibold tracking-[0.14em] text-mute">REFERENCE</span>
            <span className="text-[15px] font-bold tracking-[-0.01em] text-teal">{ref}</span>
          </div>
          <div className="flex flex-col gap-1 pl-1">
            <span className="text-[10.5px] font-semibold tracking-[0.14em] text-mute">SENT TO</span>
            <span className="text-[15px] font-bold tracking-[-0.01em] text-teal">{COMPANY.email}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={reset} className="cursor-pointer border-none bg-teal text-white font-semibold text-[14.5px] px-6 py-4 rounded-btn transition-all hover:bg-gold hover:text-teal hover:-translate-y-0.5">
            Send another enquiry
          </button>
          <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2.5 border border-[rgba(10,62,72,0.2)] rounded-btn px-6 py-4 text-[14.5px] font-semibold text-teal transition-colors hover:border-teal hover:bg-paper">
            Or call {COMPANY.phone}
          </a>
        </div>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────────────────── */
  const productOptions = product && !PRODUCT_OPTIONS.includes(product)
    ? ['Select a product family', product, ...PRODUCT_OPTIONS.slice(1)]
    : PRODUCT_OPTIONS;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[22px]">
      {/* Global error */}
      {errors._form && (
        <div className="p-4 bg-[#FEF2F0] border border-[#D98A73] rounded-chip text-[14px] text-[#B3452F] leading-[1.55]" role="alert">
          {errors._form}
        </div>
      )}

      {/* Purpose chips */}
      <div>
        <div className="text-[11px] font-semibold tracking-[0.14em] text-mute">WHAT DO YOU NEED?</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {PURPOSES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPurpose(p)}
              className="cursor-pointer rounded-pill px-[18px] py-[11px] text-[13.5px] font-semibold tracking-[-0.01em] border transition-all hover:border-teal hover:-translate-y-0.5 active:scale-[0.97]"
              style={{
                background: purpose === p ? '#0A3E48' : '#FFFFFF',
                color: purpose === p ? '#FFFFFF' : '#16211F',
                borderColor: purpose === p ? '#0A3E48' : 'rgba(10,62,72,0.18)',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <label className="flex flex-col gap-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            Your name <span className="text-[11px] font-medium" style={{ color: err('name') ? '#B3452F' : '#6E756F' }}>required</span>
          </span>
          <input type="text" value={formData.name} onChange={setField('name')} onBlur={blurField('name')} placeholder="Pradeep Hatte"
            className="w-full bg-white border rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
            style={{ borderColor: err('name') ? '#D98A73' : 'rgba(10,62,72,0.16)' }}
          />
          {err('name') && <span className="text-[12px] font-medium text-[#B3452F]" style={{ animation: 'pi-item-in 260ms ease both' }}>{err('name')}</span>}
        </label>

        {/* Company */}
        <label className="flex flex-col gap-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            Company <span className="text-[11px] font-medium text-mute">optional</span>
          </span>
          <input type="text" value={formData.company} onChange={setField('company')} placeholder="Company or project name"
            className="w-full bg-white border border-[rgba(10,62,72,0.16)] rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col gap-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            Email <span className="text-[11px] font-medium" style={{ color: err('email') ? '#B3452F' : '#6E756F' }}>required</span>
          </span>
          <input type="email" value={formData.email} onChange={setField('email')} onBlur={blurField('email')} placeholder="you@company.com"
            className="w-full bg-white border rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
            style={{ borderColor: err('email') ? '#D98A73' : 'rgba(10,62,72,0.16)' }}
          />
          {err('email') && <span className="text-[12px] font-medium text-[#B3452F]" style={{ animation: 'pi-item-in 260ms ease both' }}>{err('email')}</span>}
        </label>

        {/* Phone */}
        <label className="flex flex-col gap-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            Phone <span className="text-[11px] font-medium" style={{ color: err('phone') ? '#B3452F' : '#6E756F' }}>required</span>
          </span>
          <input type="tel" value={formData.phone} onChange={setField('phone')} onBlur={blurField('phone')} placeholder="+91 00000 00000"
            className="w-full bg-white border rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
            style={{ borderColor: err('phone') ? '#D98A73' : 'rgba(10,62,72,0.16)' }}
          />
          {err('phone') && <span className="text-[12px] font-medium text-[#B3452F]" style={{ animation: 'pi-item-in 260ms ease both' }}>{err('phone')}</span>}
        </label>

        {/* City — spans 2 cols */}
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            City / site location <span className="text-[11px] font-medium text-mute">optional</span>
          </span>
          <input type="text" value={formData.city} onChange={setField('city')} placeholder="Pune, Maharashtra"
            className="w-full bg-white border border-[rgba(10,62,72,0.16)] rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
          />
        </label>

        {/* Product family */}
        <label className="flex flex-col gap-2">
          <span className="text-[12.5px] font-semibold text-ink">Product family</span>
          <select value={product} onChange={(e) => setProduct(e.target.value)}
            className="w-full bg-white border border-[rgba(10,62,72,0.16)] rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none appearance-none cursor-pointer transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
          >
            {productOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>

        {/* Quantity */}
        <label className="flex flex-col gap-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            Quantity / size <span className="text-[11px] font-medium text-mute">optional</span>
          </span>
          <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 300 mm x 2.0 mm, 400 running metres"
            className="w-full bg-white border border-[rgba(10,62,72,0.16)] rounded-chip px-4 py-3.5 text-[15px] text-ink outline-none transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
          />
        </label>

        {/* Message — spans 2 cols */}
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="flex items-baseline gap-[7px] text-[12.5px] font-semibold text-ink">
            Details of the requirement
            <span className="text-[11px] font-medium" style={{ color: err('msg') ? '#B3452F' : '#6E756F' }}>required</span>
          </span>
          <textarea
            value={msg}
            onChange={(e) => { setMsg(e.target.value); setErrors((prev) => { const n = { ...prev }; delete n.msg; return n; }); }}
            onBlur={blurField('msg')}
            rows={4}
            placeholder="Material and finish, drawing reference, delivery location, target date — anything that helps us quote accurately."
            className="w-full bg-white border rounded-chip px-4 py-3.5 text-[15px] leading-[1.6] text-ink outline-none resize-y min-h-[118px] transition-all focus:border-teal focus:shadow-[0_0_0_3px_rgba(10,62,72,0.1)]"
            style={{ borderColor: err('msg') ? '#D98A73' : 'rgba(10,62,72,0.16)' }}
          />
          {err('msg') && <span className="text-[12px] font-medium text-[#B3452F]" style={{ animation: 'pi-item-in 260ms ease both' }}>{err('msg')}</span>}
        </label>

        {/* File upload — spans 2 cols */}
        <label className="sm:col-span-2 relative flex items-center gap-3.5 border border-dashed border-[rgba(10,62,72,0.3)] rounded-btn p-[18px_20px] cursor-pointer bg-white transition-all hover:border-teal hover:bg-paper">
          <span className="w-10 h-10 rounded-[11px] bg-paper flex items-center justify-center shrink-0">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0A3E48" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 17V5M7.5 9.5L12 5l4.5 4.5M4 19h16" />
            </svg>
          </span>
          <span className="flex flex-col gap-[3px] min-w-0">
            <span className="text-sm font-semibold text-ink">
              {fileName || 'Attach a drawing, BOQ or reference'}
            </span>
            <span className="text-[12.5px] text-mute">
              {fileName ? 'Attached — click to replace' : 'PDF, DWG, XLS or an image. Up to 10 MB.'}
            </span>
          </span>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.xls,.xlsx"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-[18px] flex-wrap">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="cursor-pointer border-none inline-flex items-center gap-[11px] bg-teal text-white font-bold text-[15px] px-[30px] py-[18px] rounded-btn transition-all hover:bg-gold hover:text-teal hover:-translate-y-0.5 disabled:opacity-65 disabled:cursor-wait w-full sm:w-auto justify-center sm:justify-start"
        >
          {status === 'sending' ? (
            <span className="w-[15px] h-[15px] rounded-full border-2 border-[rgba(240,222,156,0.3)] border-t-gold shrink-0" style={{ animation: 'pi-ring 700ms linear infinite' }} />
          ) : (
            <span className="w-[7px] h-[7px] rounded-full bg-gold block shrink-0" />
          )}
          {status === 'sending' ? 'Sending enquiry…' : submitLabel}
        </button>
        <span className="max-w-[26em] text-[12.5px] leading-[1.55] text-mute">
          {formNote}
        </span>
      </div>
    </form>
  );
}
