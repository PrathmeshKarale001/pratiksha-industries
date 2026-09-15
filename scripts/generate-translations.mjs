#!/usr/bin/env node

/**
 * generate-translations.mjs
 *
 * Extracts all translatable strings from content/*.ts + hardcoded UI strings,
 * translates via Google's GTX endpoint (one-time build step), and saves to
 * /public/locales/{lang}.json.
 *
 * These static JSONs are loaded at runtime — zero API calls in production.
 *
 * Run: node scripts/generate-translations.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'public', 'locales');

const LANGS = ['hi', 'mr', 'ar', 'ja', 'de', 'es', 'id'];

// ─── Extract all translatable strings ────────────────────────────────────────

function extractStrings() {
  const strings = new Set();
  const contentDir = path.join(ROOT, 'content');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const regex = /(?:name|label|tagline|desc|body|note|text|tag|sub|detail|highlight|category|legalName|value|role|eta|certification|day|time|spec|qty)\s*:\s*["'`]([^"'`]+)["'`]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const str = match[1].trim();
      if (!str) continue;
      if (str.startsWith('#') || str.startsWith('http') || str.startsWith('mailto:') || str.startsWith('tel:')) continue;
      if (str.startsWith('rgba') || str.startsWith('rgb(')) continue;
      if (str.startsWith('/') || str.startsWith('assets/')) continue;
      if (/^\d+(\.\d+)?\s*(px|em|rem|%|T|mm)/.test(str)) continue;
      if (/^[A-Z]{2,5}$/.test(str)) continue;
      if (/^\+?\d[\d\s-]+$/.test(str)) continue;
      if (/^[\d,]+$/.test(str)) continue;
      if (/^span \d/.test(str)) continue;
      if (str.includes('@') && str.includes('.')) continue;
      strings.add(str);
    }
  }

  // Hardcoded UI strings from components
  const uiStrings = [
    'Get in Touch', 'Skip to main content', 'Send enquiry', 'WhatsApp',
    'Built for', 'the Long Run', 'Engineered to Specification',
    'Manufacturing facility in Khed Shivapur, Pune',
    'What We Make', 'Explore', 'How It Gets Made', 'Quality Control',
    'Six-Stage Inspection', 'Inspection & Quality', 'Sectors We Serve',
    'Materials & Finishes', 'From Drawing to Dispatch', 'How to Order',
    'Download Product Catalogue', 'Download PDF', 'Product Catalogue',
    'Browse the full range of cable trays, earthing products, fittings and instrumentation — with dimensions, specifications and finish options.',
    'SCROLL', 'View more', 'View all products',
    'Enterprise Clientele & Industrial Footprint',
    'Supplying critical routing & containment to 40+ facilities',
    'View All 40+', 'Hover to illuminate & view specialization',
    'Spotlight: Key Enterprise Deployments',
    'Enterprise Client Directory (40 Partners)',
    'Supplying Industry Leaders Across 3 Countries',
    'From automotive assembly plants to sugar mills, thermal power blocks, and refineries — explore the full spectrum of industrial organizations that rely on Pratiksha Industries.',
    'All Clients', 'Automotive & Heavy', 'Engineering & EPC',
    'Sugar & Biofuels', 'Chemicals & Materials', 'Power, Water & Infrastructure',
    'Global Footprint', 'Showing', 'of', 'enterprise partners',
    'Need references for your specific industry sector?',
    'Request Project References', 'Close',
    'Our Story', 'How We Work', 'What We Believe', 'Our Journey',
    'Our Equipment', 'Our Principles', 'Credentials',
    'Let\u2019s Build Together', 'How to Reach Us', 'Business Hours',
    'Key Contacts', 'What to Include in Your Enquiry', 'Send an Enquiry',
    'Your name', 'Company name', 'Email address', 'Phone number',
    'Your message — include widths, lengths, material and quantity if possible',
    'Send Enquiry', 'Sending...',
    'We will reply within 24 hours on working days.',
    'Our Products', 'Explore our range',
    'Cable Tray Systems', 'Earthing & Instrumentation',
    'All Categories', 'View Details', 'Request Quote',
    'Quick Links', 'Contact Info', 'Pratiksha Industries', 'Delivering Quality',
    'All rights reserved.', 'Privacy Policy',
    'Thank you!', 'Your enquiry has been sent successfully.',
    'We will get back to you within 24 hours.',
    'Home', 'About', 'Products', 'Capability', 'Projects',
    'Clients', 'Catalogue', 'Contact', 'Privacy',
    'Quality Control', 'How to Order',
    'Search by company name, sector, or location',
    // JSX paragraph strings with em-dashes (rendered from &mdash;)
    'We manufacture more than cable trays \u2014 we build the routing, earthing and instrumentation systems that industrial plants depend on every day.',
    'Pratiksha Industries manufactures cable trays, earthing materials and instrumentation fittings for industrial, commercial and infrastructure projects \u2014 combining advanced machinery with rigorous quality control.',
    'Founded by Mr. Pradeep Hatte, we believe manufacturing is about more than output \u2014 it is about building partnerships, holding tolerances, and delivering on the date we promised.',
    'Every batch carries an inspection record \u2014 raw material to dispatch \u2014 so what reaches your site matches the drawing it was quoted against.',
    'Coating grade, load class and dimensional tolerance are confirmed per order against the applicable standard and the drawing supplied \u2014 the test and inspection records travel with the batch.',
    'Mail the BOQ or GA drawing and we will come back with sizes, finish options and a delivery date \u2014 typically within two working days.',
    'A cable tray only gets noticed when it fails. That is the whole reason Pratiksha Industries exists \u2014 to build the routing, support and earthing hardware that an industrial plant can stop thinking about the day it is installed.',
    'Share a GA drawing, a bill of quantities, or simply the widths and lengths you need. We come back with sizes, finish options and a delivery date \u2014 typically within two working days.',
    'None of it is mandatory \u2014 but each one removes a round of back-and-forth.',
    'Trays, fittings, supports, earthing and instrumentation \u2014 drawn to your widths, gauges and finishes. Open any item for its full specification.',
    'We fabricate to drawing as well \u2014 if it is not in the index, send us the section and we will quote it.',
    'Non-standard widths, special rung pitches, custom bends and finishes \u2014 fabrication, galvanizing and inspection all happen in our own 15,000 sq. ft. facility at Khed Shivapur.',
    'Drawings, sizes or bill of quantities \u2014 send them through the form and we will price them.',
    'Need references or supplier credentials for your sector?',
    'Explore our full directory of 40+ enterprises with active installations across sugar mills, EPCs, automotive lines, and export plants.',
    'Explore All 40+ Clients',
    'Request Reference Dossier',
    'Engineered to Specification',
    // Split text fragments that appear as individual nodes
    'Engineered to',
    'Specification',
    'Built for',
    'the Long Run',
  ];


  for (const s of uiStrings) strings.add(s);
  return [...strings].sort();
}

// ─── Translate via Google GTX ────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatch(texts, lang) {
  const results = {};
  let done = 0;

  for (const text of texts) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
      });

      if (res.status === 429) {
        console.log(`    ⏳ Rate limited at ${done}/${texts.length}, waiting 30s...`);
        await sleep(30000);
        // Retry
        const retry = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
        });
        if (retry.ok) {
          const data = await retry.json();
          results[text] = data[0].map(c => c[0]).join('');
        } else {
          results[text] = text;
        }
      } else if (res.ok) {
        const data = await res.json();
        results[text] = data[0].map(c => c[0]).join('');
      } else {
        results[text] = text;
      }
    } catch {
      results[text] = text;
    }

    done++;
    if (done % 20 === 0) console.log(`    ${done}/${texts.length}`);
    // 500ms between requests to avoid rate limiting
    await sleep(500);
  }

  return results;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Extracting translatable strings...');
  const strings = extractStrings();
  console.log(`   Found ${strings.length} unique strings\n`);

  if (!fs.existsSync(LOCALES_DIR)) fs.mkdirSync(LOCALES_DIR, { recursive: true });

  // Save English (identity map)
  const enDict = {};
  for (const s of strings) enDict[s] = s;
  fs.writeFileSync(path.join(LOCALES_DIR, 'en.json'), JSON.stringify(enDict, null, 2));
  console.log('✅ en.json saved\n');

  for (const lang of LANGS) {
    const outPath = path.join(LOCALES_DIR, `${lang}.json`);

    // Incremental: only translate missing keys
    let existing = {};
    if (fs.existsSync(outPath)) {
      existing = JSON.parse(fs.readFileSync(outPath, 'utf-8'));
    }

    const missing = strings.filter(s => !(s in existing));
    if (missing.length === 0) {
      console.log(`⏭️  ${lang}.json complete (${Object.keys(existing).length} strings)`);
      continue;
    }

    console.log(`🌐 ${lang}: translating ${missing.length} strings...`);
    const newTranslations = await translateBatch(missing, lang);
    const merged = { ...existing, ...newTranslations };
    fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));
    console.log(`✅ ${lang}.json saved (${Object.keys(merged).length} strings)\n`);
  }

  console.log('\n🎉 Done! Static locale files in /public/locales/');
}

main().catch(console.error);
