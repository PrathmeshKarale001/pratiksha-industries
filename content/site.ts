export const site = {
  name: 'Pratiksha Industries',
  tagline: 'Delivering Quality',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pratikshaindustries.in',
  phone: '+91 98508 45054',
  phoneHref: 'tel:+919850845054',
  whatsapp: 'https://wa.me/919850845054',
  email: 'pratikshaindustries2@gmail.com',
  emailHref: 'mailto:pratikshaindustries2@gmail.com',
  founded: 2013,
  certification: 'ISO 9001:2015',
  address: {
    street: 'Shed No. 01, Gat No. 313, Khedekar Industrial Estate, Goud Dhara Road, Khed Shivapur, Tal. Bhor',
    locality: 'Pune',
    region: 'Maharashtra',
    postalCode: '412205',
    country: 'IN'
  },
  maps: 'https://maps.google.com/?q=Khedekar+Industrial+Estate+Khed+Shivapur+Pune'
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Capability', href: '/#process' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Catalogue', href: '/#catalogue' },
  { label: 'Contact', href: '/contact' }
] as const;

export const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Capability', href: '/#process' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Catalogue', href: '/#catalogue' },
  { label: 'Quality Control', href: '/#quality' },
  { label: 'How to Order', href: '/#ordering' },
  { label: 'Contact', href: '/contact' }
] as const;
