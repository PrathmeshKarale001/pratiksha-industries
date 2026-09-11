// Pratiksha Industries — Client Directory & Logo Assets
// 40 Enterprise Clients across India, Indonesia, Belize & Global Markets

export interface ClientItem {
  id: string;
  name: string;
  legalName: string;
  category: ClientCategory;
  tier: 'featured' | 'standard';
  location: string;
  country: 'India' | 'Indonesia' | 'Belize' | 'International';
  highlight?: string;
  logoPath: string; // Direct path to verified SVG/PNG asset in /public/logos/
}

export type ClientCategory =
  | 'Automotive & Heavy Industry'
  | 'Engineering & EPC'
  | 'Sugar, Biofuels & Process'
  | 'Chemicals & Materials'
  | 'Power, Water & Infrastructure'
  | 'Automation & Technology';

export const CLIENT_CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Clients (40)' },
  { id: 'Automotive & Heavy Industry', label: 'Automotive & Heavy' },
  { id: 'Engineering & EPC', label: 'Engineering & EPC' },
  { id: 'Sugar, Biofuels & Process', label: 'Sugar & Biofuels' },
  { id: 'Chemicals & Materials', label: 'Chemicals & Materials' },
  { id: 'Power, Water & Infrastructure', label: 'Power & Water' },
  { id: 'Automation & Technology', label: 'Automation & Controls' },
  { id: 'international', label: 'Global Footprint (3 Countries)' },
];

export const clients: ClientItem[] = [
  // ==========================================
  // TOP MARQUEE TITANS (FEATURED TIER)
  // ==========================================
  {
    id: 'mahindra',
    name: 'Mahindra & Mahindra',
    legalName: 'Mahindra & Mahindra Ltd',
    category: 'Automotive & Heavy Industry',
    tier: 'featured',
    location: 'Mumbai, Maharashtra',
    country: 'India',
    highlight: 'Automotive & Farm Equipment Leader',
    logoPath: '/logos/mahindra.svg'
  },
  {
    id: 'pepsico',
    name: 'PepsiCo India',
    legalName: 'PepsiCo India Holdings Pvt. Ltd.',
    category: 'Automotive & Heavy Industry',
    tier: 'featured',
    location: 'Gurugram / Multi-Plant Pan India',
    country: 'India',
    highlight: 'Global Food & Beverage Conglomerate',
    logoPath: '/logos/pepsico.svg'
  },
  {
    id: 'ltts',
    name: 'L&T Technology Services',
    legalName: 'L&T Technology Services (LTTS)',
    category: 'Engineering & EPC',
    tier: 'featured',
    location: 'Vadodara / Mumbai',
    country: 'India',
    highlight: 'Engineering R&D & Plant Solutions',
    logoPath: '/logos/ltts.svg'
  },
  {
    id: 'godrej-boyce',
    name: 'Godrej & Boyce',
    legalName: 'Godrej & Boyce Mfg. Co. Ltd.',
    category: 'Automotive & Heavy Industry',
    tier: 'featured',
    location: 'Mumbai, Maharashtra',
    country: 'India',
    highlight: 'Advanced Heavy Engineering & Aerospace',
    logoPath: '/logos/godrej-boyce.svg'
  },
  {
    id: 'basf',
    name: 'BASF India',
    legalName: 'BASF INDIA LIMITED',
    category: 'Chemicals & Materials',
    tier: 'featured',
    location: 'Navi Mumbai / Mangalore',
    country: 'India',
    highlight: 'World Leading Chemical Enterprise',
    logoPath: '/logos/basf.svg'
  },
  {
    id: 'thermax',
    name: 'Thermax Limited',
    legalName: 'Thermax Limited',
    category: 'Power, Water & Infrastructure',
    tier: 'featured',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Energy & Environment Solutions Leader',
    logoPath: '/logos/thermax.svg'
  },
  {
    id: 'amns',
    name: 'AM/NS India',
    legalName: 'AMNS INDIA PRIVATE LIMITED',
    category: 'Automotive & Heavy Industry',
    tier: 'featured',
    location: 'Hazira, Gujarat',
    country: 'India',
    highlight: 'ArcelorMittal Nippon Steel Joint Venture',
    logoPath: '/logos/amns.svg'
  },
  {
    id: 'praj',
    name: 'Praj Industries',
    legalName: 'PRAJ INDUSTRIES LIMITED',
    category: 'Sugar, Biofuels & Process',
    tier: 'featured',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Global Bioenergy & Process Technology',
    logoPath: '/logos/praj.svg'
  },
  {
    id: 'ksb',
    name: 'KSB Limited',
    legalName: 'KSB Limited',
    category: 'Engineering & EPC',
    tier: 'featured',
    location: 'Pune / International HQ Germany',
    country: 'India',
    highlight: 'Pumps & Industrial Valve Technology',
    logoPath: '/logos/ksb.svg'
  },
  {
    id: 'finolex',
    name: 'Finolex Cables',
    legalName: 'Finolex Cables Ltd.',
    category: 'Power, Water & Infrastructure',
    tier: 'featured',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Electrical & Telecom Cable Manufacturer',
    logoPath: '/logos/finolex.svg'
  },
  {
    id: 'ion-exchange',
    name: 'Ion Exchange',
    legalName: 'ION EXCHANGE (INDIA) PVT LTD',
    category: 'Power, Water & Infrastructure',
    tier: 'featured',
    location: 'Mumbai / Pan India',
    country: 'India',
    highlight: 'Water & Environment Management Pioneer',
    logoPath: '/logos/ion-exchange.svg'
  },
  {
    id: 'pcbl',
    name: 'PCBL Limited',
    legalName: 'Phillips Carbon Black Limited',
    category: 'Chemicals & Materials',
    tier: 'featured',
    location: 'Kolkata / Kochi / Palej',
    country: 'India',
    highlight: "India's Largest Carbon Black Manufacturer",
    logoPath: '/logos/pcbl.svg'
  },
  {
    id: 'isgec',
    name: 'Isgec Heavy Engineering',
    legalName: 'Isgec Heavy Engineering Ltd.',
    category: 'Engineering & EPC',
    tier: 'featured',
    location: 'Noida / Yamunanagar',
    country: 'India',
    highlight: 'Diversified Global Heavy Engineering & Boilers',
    logoPath: '/logos/isgec.png'
  },
  {
    id: 'bkt',
    name: 'Balkrishna Industries',
    legalName: 'BALKRISHNA INDUSTRIES LIMITED (BKT)',
    category: 'Automotive & Heavy Industry',
    tier: 'featured',
    location: 'Mumbai / Bhuj / Waluj',
    country: 'India',
    highlight: 'Global Off-Highway Tire Titan (BKT)',
    logoPath: '/logos/bkt.svg'
  },
  {
    id: 'itd-cementation',
    name: 'ITD Cementation',
    legalName: 'ITD Cementation India Ltd',
    category: 'Engineering & EPC',
    tier: 'featured',
    location: 'Mumbai / Pan India',
    country: 'India',
    highlight: 'Premier Civil & Marine Infrastructure EPC',
    logoPath: '/logos/itd-cementation.svg'
  },
  {
    id: 'godrej-properties',
    name: 'Godrej Properties',
    legalName: 'GODREJ PROPERTIES LIMITED',
    category: 'Engineering & EPC',
    tier: 'featured',
    location: 'Mumbai / Pune / NCR',
    country: 'India',
    highlight: 'Sustainable Infrastructure & Urban Projects',
    logoPath: '/logos/godrej-properties.svg'
  },

  // ==========================================
  // INTERNATIONAL CLIENTS
  // ==========================================
  {
    id: 'pt-wahana-gula',
    name: 'PT Wahana Gula Investama',
    legalName: 'PT Wahana Gula Investama - Indonesia',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Jakarta / Sumatra',
    country: 'Indonesia',
    highlight: 'Integrated Modern Sugar Milling Complex',
    logoPath: '/logos/pt-wahana-gula.svg'
  },
  {
    id: 'caribbean-sugar',
    name: 'Caribbean Sugar Refining',
    legalName: 'CARIBBEAN SUGAR REFINING LTD - BELIZE',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Belize, Central America',
    country: 'Belize',
    highlight: 'Central American Sugar Refinery & Co-Gen Plant',
    logoPath: '/logos/caribbean-sugar.svg'
  },
  {
    id: 'bharat-international',
    name: 'Bharat International',
    legalName: 'Bharat International',
    category: 'Engineering & EPC',
    tier: 'standard',
    location: 'Mumbai / Global Exports',
    country: 'International',
    highlight: 'Cross-Border Engineering & Trading',
    logoPath: '/logos/bharat-international.svg'
  },

  // ==========================================
  // SUGAR, BIOFUELS & PROCESS ENGINEERING
  // ==========================================
  {
    id: 'dalmia-sugar',
    name: 'Dalmia Sugar',
    legalName: 'DALMIA SUGAR INDIA PVT LTD',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Uttar Pradesh / New Delhi',
    country: 'India',
    highlight: 'Pioneer in Sugar, Distillery & Green Energy',
    logoPath: '/logos/dalmia-sugar.svg'
  },
  {
    id: 'alpine-ethanol',
    name: 'Alpine Ethanol',
    legalName: 'Alpine Ethanol Private Limited',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Maharashtra',
    country: 'India',
    highlight: 'Advanced Biofuel & Grain Ethanol Distilleries',
    logoPath: '/logos/alpine-ethanol.svg'
  },
  {
    id: 'sri-sarvaraya',
    name: 'Sri Sarvaraya Sugars',
    legalName: 'SRI SARVARAYA SUGARS LIMITED',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Chelluru / Andhra Pradesh',
    country: 'India',
    highlight: 'Sugar Milling, Distilleries & Power',
    logoPath: '/logos/sri-sarvaraya.svg'
  },
  {
    id: 'regreen-excel',
    name: 'Regreen Excel EPC',
    legalName: 'Regreen Excel EPC India Limited',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Pune / Pan India',
    country: 'India',
    highlight: 'Global EPC for Distillery & Ethanol Projects',
    logoPath: '/logos/regreen-excel.svg'
  },
  {
    id: 'shrijee',
    name: 'Shrijee Process Engineering',
    legalName: 'Shrijee process engineering works ltd',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Mumbai / Pune',
    country: 'India',
    highlight: 'Sugar Equipment & Turnkey Solutions',
    logoPath: '/logos/shrijee.svg'
  },
  {
    id: 'neelshri-sugar',
    name: 'Neelshri Sugar',
    legalName: 'NEELSHRI SUGAR PRIVATE LIMITED',
    category: 'Sugar, Biofuels & Process',
    tier: 'standard',
    location: 'Maharashtra',
    country: 'India',
    highlight: 'Cane Processing & Co-Generation Sugar Plant',
    logoPath: '/logos/neelshri-sugar.svg'
  },

  // ==========================================
  // POWER, COOLING & ENVIRONMENTAL SOLUTIONS
  // ==========================================
  {
    id: 'cleanmax',
    name: 'CleanMax Enviro',
    legalName: 'Clean Max Enviro Solutions pvt ltd',
    category: 'Power, Water & Infrastructure',
    tier: 'standard',
    location: 'Mumbai / Bangalore',
    country: 'India',
    highlight: "Asia's Leading Renewable Energy Provider",
    logoPath: '/logos/cleanmax.svg'
  },
  {
    id: 'enexio',
    name: 'ENEXIO Power Cooling',
    legalName: 'ENEXIO Power Cooling Solutions India Pvt Ltd',
    category: 'Power, Water & Infrastructure',
    tier: 'standard',
    location: 'Chennai / Pune',
    country: 'India',
    highlight: 'Advanced Power Plant Wet & Dry Cooling',
    logoPath: '/logos/enexio.svg'
  },
  {
    id: 'aryan-boilers',
    name: 'Aryan Boilers',
    legalName: 'Aryan boilers pvt ltd',
    category: 'Power, Water & Infrastructure',
    tier: 'standard',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Industrial Boilers & Thermal Energy Plants',
    logoPath: '/logos/aryan-boilers.svg'
  },
  {
    id: 'sagar-cement',
    name: 'Sagar Cements',
    legalName: 'SAGAR CEMENT PVT L TD',
    category: 'Engineering & EPC',
    tier: 'standard',
    location: 'Hyderabad, Telangana',
    country: 'India',
    highlight: 'Heavy Industrial Cement & Clinker Plants',
    logoPath: '/logos/sagar-cement.svg'
  },

  // ==========================================
  // AUTOMATION, CONTROLS & SPECIALIZED ENGINEERING
  // ==========================================
  {
    id: 'durr-cts',
    name: 'Dürr CTS',
    legalName: 'Dürr CTS Private Limited',
    category: 'Automation & Technology',
    tier: 'standard',
    location: 'Chennai / Pune',
    country: 'India',
    highlight: 'Clean Technology Systems & Environmental Control',
    logoPath: '/logos/durr.svg'
  },
  {
    id: 'jendamark',
    name: 'Jendamark India',
    legalName: 'JENDAMARK INDIA PVT L TD',
    category: 'Automation & Technology',
    tier: 'standard',
    location: 'Pune / Global HQ South Africa',
    country: 'India',
    highlight: 'Industry 4.0 Automotive Assembly Automation',
    logoPath: '/logos/jendamark.svg'
  },
  {
    id: 'hason-automation',
    name: 'Hason Automation',
    legalName: 'HASON AUTOMATION',
    category: 'Automation & Technology',
    tier: 'standard',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Industrial Robotic & Special Purpose Systems',
    logoPath: '/logos/hason-automation.svg'
  },
  {
    id: 'victoria-automation',
    name: 'Victoria Automation',
    legalName: 'Victoria Automation & Controls',
    category: 'Automation & Technology',
    tier: 'standard',
    location: 'Pune / Mumbai',
    country: 'India',
    highlight: 'Instrumentation & Process Control Panels',
    logoPath: '/logos/victoria-automation.svg'
  },
  {
    id: 'interlux-electronics',
    name: 'Interlux Electronics',
    legalName: 'INTERLUX ELECTRONICS PVT L TD',
    category: 'Automation & Technology',
    tier: 'standard',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Industrial Electronic Hardware & Systems',
    logoPath: '/logos/interlux-electronics.svg'
  },

  // ==========================================
  // HEAVY ENGINEERING, SERVICES & EPC
  // ==========================================
  {
    id: 'miraj-engineering',
    name: 'Miraj Engineering',
    legalName: 'Miraj engineering services pvt. ltd',
    category: 'Engineering & EPC',
    tier: 'standard',
    location: 'Navi Mumbai, Maharashtra',
    country: 'India',
    highlight: 'Plant Piping & Mechanical EPC Contractors',
    logoPath: '/logos/miraj-engineering.svg'
  },
  {
    id: 'oilfields-services',
    name: 'Oilfields Services & Supplies',
    legalName: 'Oilfields Services & Supplies (India) Pvt Ltd',
    category: 'Chemicals & Materials',
    tier: 'standard',
    location: 'Mumbai, Maharashtra',
    country: 'India',
    highlight: 'Upstream Oil & Gas Drilling Infrastructure',
    logoPath: '/logos/oilfields-services.svg'
  },
  {
    id: 'scon-projects',
    name: 'Scon Projects',
    legalName: 'SCON PROJECTS PVT L TD',
    category: 'Engineering & EPC',
    tier: 'standard',
    location: 'Pune, Maharashtra',
    country: 'India',
    highlight: 'Industrial Construction & Infrastructure Projects',
    logoPath: '/logos/scon-projects.svg'
  },
  {
    id: 'avion-engineers',
    name: 'Avion Engineers',
    legalName: 'Avion Engineers Private Limited',
    category: 'Engineering & EPC',
    tier: 'standard',
    location: 'Pune / Mumbai',
    country: 'India',
    highlight: 'Precision Heavy Machining & Fabrication',
    logoPath: '/logos/avion-engineers.svg'
  },
  {
    id: 'maa-mangala',
    name: 'Maa Mangala Industries',
    legalName: 'MAA MANGALA INDUSTRIES PRIVATE LIMITED',
    category: 'Automotive & Heavy Industry',
    tier: 'standard',
    location: 'Odisha / Eastern India',
    country: 'India',
    highlight: 'Heavy Metal & Mineral Processing Facilities',
    logoPath: '/logos/maa-mangala.svg'
  },
  {
    id: 'basf-materials',
    name: 'BASF Polyurethanes',
    legalName: 'BASF Coatings & Performance Materials India',
    category: 'Chemicals & Materials',
    tier: 'standard',
    location: 'Thane / Chennai',
    country: 'India',
    highlight: 'High Performance Industrial Polymers & Coatings',
    logoPath: '/logos/basf-materials.svg'
  }
];

// Marquee sets for the Quick Trust Bar (top 14 titans)
export const trustBarClients = clients.filter(c => c.tier === 'featured').slice(0, 14);

// Dual Marquee Sets for Concept B Showcase Section
export const marqueeRow1 = clients.slice(0, 20);
export const marqueeRow2 = clients.slice(20, 40);
