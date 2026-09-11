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
  logoSvg: string; // Self-contained inline SVG string for crisp, zero-latency vector rendering
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 38L38 18L48 38H41L38 31L35 38H28Z" fill="#E31837"/>
      <path d="M18 38L32 12L46 38H39L32 23L25 38H18Z" fill="#E31837" fill-opacity="0.85"/>
      <text x="58" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="22" letter-spacing="1.5" fill="#FFFFFF">Mahindra</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" fill="#004B93"/>
      <path d="M12 28C16 23 23 20 30 20C38 20 45 24 49 30C43 31 35 27 27 27C19 27 15 31 12 28Z" fill="#E32934"/>
      <path d="M11 32C14 36 21 40 30 40C39 40 46 36 49 30C44 29 35 33 27 33C19 33 14 30 11 32Z" fill="#FFFFFF"/>
      <text x="60" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="21" letter-spacing="1" fill="#FFFFFF">PEPSICO</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="32" height="32" rx="6" fill="#005A9C"/>
      <text x="14" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">L&amp;T</text>
      <text x="50" y="30" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14" letter-spacing="0.5" fill="#FFFFFF">L&amp;T Technology Services</text>
      <text x="50" y="44" font-family="'IBM Plex Mono', monospace" font-weight="600" font-size="9" letter-spacing="1.5" fill="#F0DE9C">ENGINEERING PARTNER</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 36C18 36 24 33 28 26C31 21 30 16 25 16C19 16 14 22 14 30C14 38 21 44 31 44C40 44 46 38 48 31H38" stroke="#E31837" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="54" y="31" font-family="Georgia, serif" font-weight="700" font-style="italic" font-size="19" fill="#FFFFFF">Godrej</text>
      <text x="116" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="13" letter-spacing="0.5" fill="#FFFFFF">&amp; Boyce</text>
      <text x="54" y="45" font-family="'IBM Plex Mono', monospace" font-weight="600" font-size="9" letter-spacing="1.2" fill="#F0DE9C">MANUFACTURING</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="32" height="32" rx="4" fill="#004A96"/>
      <rect x="18" y="20" width="9" height="9" fill="#FFFFFF"/>
      <text x="52" y="34" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="22" letter-spacing="2" fill="#FFFFFF">-BASF</text>
      <text x="52" y="46" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="9" letter-spacing="0.8" fill="#F0DE9C">We create chemistry</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 14L40 38H16L28 14Z" fill="#D32F2F"/>
      <path d="M28 22L36 38H20L28 22Z" fill="#FF8A80"/>
      <text x="50" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="20" letter-spacing="1.5" fill="#FFFFFF">THERMAX</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 36L24 16L34 36H28L24 26L20 36H14Z" fill="#E05206"/>
      <path d="M26 36L36 16L46 36H40L36 26L32 36H26Z" fill="#F0DE9C"/>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="18" letter-spacing="1" fill="#FFFFFF">AM/NS</text>
      <text x="114" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="14" letter-spacing="0.5" fill="#F0DE9C">INDIA</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1.2" fill="rgba(255,255,255,0.7)">STEEL &amp; METALLURGY</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="16" stroke="#2E7D32" stroke-width="3"/>
      <path d="M22 30C22 24 28 20 34 24C34 30 28 36 22 30Z" fill="#4CAF50"/>
      <text x="52" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="21" letter-spacing="1.5" fill="#FFFFFF">PRAJ</text>
      <text x="112" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="400" font-size="13" letter-spacing="0.5" fill="#F0DE9C">INDUSTRIES</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="34" height="28" rx="4" fill="#005A9C"/>
      <text x="16" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" letter-spacing="1" fill="#FFFFFF">KSB</text>
      <text x="54" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="20" letter-spacing="1.5" fill="#FFFFFF">KSB</text>
      <text x="102" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="14" letter-spacing="0.5" fill="#F0DE9C">Pumps &amp; Valves</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="30" r="14" fill="#E31837"/>
      <circle cx="34" cy="30" r="10" fill="#F0DE9C" fill-opacity="0.85"/>
      <text x="54" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="20" letter-spacing="1" fill="#FFFFFF">Finolex</text>
      <text x="132" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="12" letter-spacing="0.5" fill="#F0DE9C">Cables</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="30" r="15" fill="#0288D1"/>
      <path d="M26 18V42M14 30H38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">ION EXCHANGE</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#F0DE9C">WATER &amp; ENVIRONMENT</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="15" width="30" height="30" rx="6" fill="#212121" stroke="#F0DE9C" stroke-width="1.5"/>
      <circle cx="27" cy="30" r="8" fill="#F0DE9C"/>
      <text x="50" y="33" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="20" letter-spacing="1.5" fill="#FFFFFF">PCBL</text>
      <text x="50" y="45" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="9" letter-spacing="0.8" fill="rgba(255,255,255,0.75)">Phillips Carbon Black</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18H42L36 42H8L14 18Z" fill="#1565C0"/>
      <text x="16" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="14" fill="#FFFFFF">ISGEC</text>
      <text x="50" y="33" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="17" letter-spacing="1" fill="#FFFFFF">ISGEC</text>
      <text x="50" y="46" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#F0DE9C">HEAVY ENGINEERING</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="38" height="28" rx="6" fill="#FBC02D"/>
      <text x="16" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" fill="#16211F">BKT</text>
      <text x="58" y="33" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="1" fill="#FFFFFF">BALKRISHNA</text>
      <text x="58" y="46" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#F0DE9C">INDUSTRIES (BKT)</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="34" height="28" rx="4" fill="#C62828"/>
      <text x="16" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#FFFFFF">ITD</text>
      <text x="52" y="33" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">ITD Cementation</text>
      <text x="52" y="46" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#F0DE9C">INFRASTRUCTURE EPC</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 36C18 36 24 33 28 26C31 21 30 16 25 16C19 16 14 22 14 30C14 38 21 44 31 44C40 44 46 38 48 31H38" stroke="#E31837" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="54" y="31" font-family="Georgia, serif" font-weight="700" font-style="italic" font-size="19" fill="#FFFFFF">Godrej</text>
      <text x="54" y="46" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="11" letter-spacing="1.5" fill="#F0DE9C">PROPERTIES</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="16" fill="#00796B"/>
      <path d="M22 34L28 22L34 34H22Z" fill="#F0DE9C"/>
      <text x="52" y="30" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14" letter-spacing="0.5" fill="#FFFFFF">PT WAHANA GULA</text>
      <text x="52" y="44" font-family="'IBM Plex Mono', monospace" font-weight="600" font-size="9.5" letter-spacing="1.5" fill="#4DB6AC">INDONESIA 🇮🇩</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="16" fill="#0D47A1"/>
      <path d="M20 28C24 22 32 22 36 28C32 34 24 34 20 28Z" fill="#F0DE9C"/>
      <text x="52" y="29" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="13" letter-spacing="0.5" fill="#FFFFFF">CARIBBEAN SUGAR</text>
      <text x="52" y="43" font-family="'IBM Plex Mono', monospace" font-weight="600" font-size="9" letter-spacing="1.5" fill="#90CAF9">BELIZE, CENTRAL AMERICA 🇧🇿</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="16" stroke="#F0DE9C" stroke-width="2"/>
      <ellipse cx="28" cy="30" rx="8" ry="16" stroke="#F0DE9C" stroke-width="1.5"/>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14.5" letter-spacing="0.8" fill="#FFFFFF">BHARAT INTL</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1.2" fill="#F0DE9C">GLOBAL EXPORTS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 36L28 16L42 36H14Z" fill="#1B5E20"/>
      <circle cx="28" cy="28" r="6" fill="#F0DE9C"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">DALMIA SUGAR</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#81C784">SUGAR &amp; GREEN ENERGY</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 38L28 20L40 38H16Z" stroke="#00ACC1" stroke-width="2.5" fill="none"/>
      <path d="M22 38L28 28L34 38H22Z" fill="#00ACC1"/>
      <text x="48" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">ALPINE ETHANOL</text>
      <text x="48" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#80DEEA">BIOFUELS &amp; REFINING</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="15" fill="#388E3C"/>
      <text x="21" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#FFFFFF">S</text>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" letter-spacing="0.5" fill="#FFFFFF">SRI SARVARAYA</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#F0DE9C">SUGARS &amp; POWER LTD</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="32" height="28" rx="6" fill="#2E7D32"/>
      <path d="M20 30L26 36L36 24" stroke="#F0DE9C" stroke-width="2.5" stroke-linecap="round"/>
      <text x="52" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" letter-spacing="0.5" fill="#FFFFFF">REGREEN EXCEL</text>
      <text x="52" y="44" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1.2" fill="#A5D6A7">EPC INDIA LIMITED</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="15" fill="#D84315"/>
      <text x="21" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#FFFFFF">S</text>
      <text x="50" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" letter-spacing="0.5" fill="#FFFFFF">SHRIJEE PROCESS</text>
      <text x="50" y="44" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#FFAB91">ENGINEERING WORKS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 36C18 24 38 24 38 36Z" fill="#1565C0"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15.5" letter-spacing="0.8" fill="#FFFFFF">NEELSHRI SUGAR</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#90CAF9">SUGAR &amp; ALLIED PRODUCTS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="14" fill="#2E7D32"/>
      <circle cx="28" cy="30" r="8" fill="#FBC02D"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">CleanMax</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1.2" fill="#C8E6C9">ENVIRO SOLUTIONS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="15" width="34" height="30" rx="6" fill="#0277BD"/>
      <path d="M22 23L34 37M34 23L22 37" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="17" letter-spacing="1.5" fill="#FFFFFF">ENEXIO</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#81D4FA">POWER COOLING</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="15" fill="#E65100"/>
      <path d="M28 18C28 24 33 26 33 32C33 35 30 38 28 38C26 38 23 35 23 32C23 26 28 24 28 18Z" fill="#FFF3E0"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">ARYAN BOILERS</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#FFCC80">THERMAL SYSTEMS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="16" fill="#C2185B"/>
      <rect x="22" y="24" width="12" height="12" fill="#F0DE9C"/>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">SAGAR CEMENT</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1.2" fill="#F48FB1">BUILDING MATERIALS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="34" height="28" rx="4" fill="#D32F2F"/>
      <text x="14" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="14" fill="#FFFFFF">DÜRR</text>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">DÜRR CTS</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#FFCDD2">CLEAN TECH SYSTEMS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="32" height="28" rx="6" fill="#1565C0"/>
      <path d="M22 22H34L28 38H22Z" fill="#F0DE9C"/>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="1" fill="#FFFFFF">JENDAMARK</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#90CAF9">AUTOMATION SOLUTIONS</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="14" stroke="#00B0FF" stroke-width="2.5"/>
      <circle cx="28" cy="30" r="5" fill="#00B0FF"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15.5" letter-spacing="0.8" fill="#FFFFFF">HASON</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1.2" fill="#80D8FF">AUTOMATION</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 18L28 42L40 18H16Z" fill="#00897B"/>
      <text x="48" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" letter-spacing="0.5" fill="#FFFFFF">VICTORIA</text>
      <text x="48" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#80CBC4">CONTROLS &amp; DRIVES</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="32" height="28" rx="6" fill="#5E35B1"/>
      <path d="M18 30H38M28 20V40" stroke="#F0DE9C" stroke-width="2"/>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" letter-spacing="0.8" fill="#FFFFFF">INTERLUX</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#D1C4E9">ELECTRONICS PVT LTD</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="16" width="30" height="28" rx="4" fill="#3949AB"/>
      <text x="18" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#FFFFFF">M</text>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15.5" letter-spacing="0.8" fill="#FFFFFF">MIRAJ</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#C5CAE9">ENGINEERING SERVICES</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="15" fill="#37474F"/>
      <path d="M28 20L34 36H22L28 20Z" fill="#F0DE9C"/>
      <text x="50" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14.5" letter-spacing="0.5" fill="#FFFFFF">OILFIELDS SERVICES</text>
      <text x="50" y="44" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#CFD8DC">&amp; SUPPLIES (INDIA)</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="32" height="28" rx="6" fill="#00838F"/>
      <text x="16" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#FFFFFF">S</text>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">SCON PROJECTS</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#B2EBF2">INFRASTRUCTURE EPC</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 38L28 16L42 38L28 32L14 38Z" fill="#0288D1"/>
      <text x="50" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" letter-spacing="0.8" fill="#FFFFFF">AVION</text>
      <text x="50" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#B3E5FC">ENGINEERS PVT LTD</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="30" r="15" fill="#E64A19"/>
      <path d="M22 34L28 22L34 34H22Z" fill="#FFFFFF"/>
      <text x="50" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14.5" letter-spacing="0.5" fill="#FFFFFF">MAA MANGALA</text>
      <text x="50" y="44" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="1" fill="#FFCCBC">INDUSTRIES PVT LTD</text>
    </svg>`
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
    logoSvg: `<svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="32" height="32" rx="4" fill="#004A96"/>
      <text x="14" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="13" fill="#FFFFFF">BASF</text>
      <text x="52" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15" letter-spacing="1" fill="#FFFFFF">BASF COATINGS</text>
      <text x="52" y="45" font-family="'IBM Plex Mono', monospace" font-size="8.5" letter-spacing="0.8" fill="#F0DE9C">&amp; MATERIALS</text>
    </svg>`
  }
];

// Marquee sets for the Quick Trust Bar (top 14 titans)
export const trustBarClients = clients.filter(c => c.tier === 'featured').slice(0, 14);

// Dual Marquee Sets for Concept B Showcase Section
export const marqueeRow1 = clients.slice(0, 20);
export const marqueeRow2 = clients.slice(20, 40);
