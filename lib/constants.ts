/* ── Site-wide constants ─────────────────────────────────────────────── */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pratikshaindustries.in';

export const COMPANY = {
  name: 'Pratiksha Industries',
  legalName: 'Pratiksha Industries',
  tagline: 'Built for the Long Run',
  founded: '2013',
  phone: '+91 98508 45054',
  phoneHref: 'tel:+919850845054',
  whatsapp: 'https://wa.me/919850845054',
  email: 'pratikshaindustries2@gmail.com',
  address: {
    street: 'Shed No. 01, Gat No. 313, Khedekar Industrial Estate, Goud Dhara Road, Khed Shivapur, Tal. Bhor',
    locality: 'Pune',
    region: 'Maharashtra',
    postalCode: '412205',
    country: 'IN',
    full: 'Shed No. 01, Gat No. 313, Khedekar Industrial Estate, Goud Dhara Road, Khed Shivapur, Tal. Bhor, Dist. Pune – 412205',
  },
  mapUrl: 'https://maps.google.com/?q=Khedekar+Industrial+Estate+Khed+Shivapur+Pune',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '18:30' },
    { days: ['Saturday'], opens: '09:30', closes: '14:00' },
  ],
  social: {
    // TODO: Replace with actual company profile URLs
    linkedin: 'https://www.linkedin.com/',
    indiamart: 'https://www.indiamart.com/',
  },
  certifications: ['ISO 9001:2015', 'Udyam MSME', 'GST Registered'],
} as const;
