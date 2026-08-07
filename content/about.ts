// Extracted verbatim from the approved design prototype.

export const headline = [
        { display: "2013", to: 2013, suffix: "", plain: "1", label: "FOUNDED IN PUNE" },
        { display: "15,000", to: 15000, suffix: "", plain: "0", label: "SQ. FT. UNDER ROOF" },
        { display: "30", to: 30, suffix: "", plain: "0", label: "PEOPLE ON THE FLOOR" }
      ] as const;

export const note = [
        { text: "Pratiksha Industries began in 2013 as a small fabrication shop in Khed Shivapur with a single ambition — to supply cable management hardware that did not need to be re-worked on site. In the early years that meant standing next to the press and measuring every piece." },
        { text: "As orders grew from plants across Maharashtra, the shop grew with them: plasma and laser cutting, a heavier press brake, multi-spindle drilling, four power presses and in-house CO2 welding. Bringing each process under our own roof was never about capacity alone — it was the only way to keep control of tolerance and of the delivery date." },
        { text: "Today the same drawings that arrive by email in the morning can be forming on the shop floor the same week, inspected by the people who cut them, and dispatched tagged and bundled to the run they belong to." }
      ].map((n, i) => ({ text: n.text, delay: 160 + i * 90 }));

export const beliefs = [
        { name: "Say the real date", body: "A quoted delivery date is a commitment to somebody else's project schedule, not a guess." },
        { name: "Measure, don't assume", body: "Every setup is proven on a first piece and audited mid-run, because drift is cheaper to catch early." },
        { name: "Own the process", body: "Cutting, forming, welding, finishing and inspection all in-house — no waiting on a third party." },
        { name: "Build the relationship", body: "Most of our work is repeat work. That only happens when the last order went right." }
      ].map((b, i) => ({ name: b.name, body: b.body, no: String(i + 1).padStart(2, "0"), delay: i * 80 }));

export const journey = [
        { year: "2013", name: "The first shop", body: "Founded by Mr. Pradeep Hatte with a single power press and a handful of local orders for perforated tray and simple fittings." },
        { year: "2015", name: "Fabrication brought in-house", body: "Press brake, drilling and cutting added so trays no longer had to be sent out for forming — the beginning of end-to-end control." },
        { year: "2018", name: "Earthing and instrumentation", body: "Range widened beyond tray into earthing strips, electrodes, glands and machined instrumentation manifolds for process plants." },
        { year: "2021", name: "ISO 9001:2015", body: "Quality management formalised: documented inspection stages, batch records and calibrated measurement across the floor." },
        { year: "2023", name: "15,000 sq. ft. facility", body: "Moved into the current shed at Khedekar Industrial Estate with plasma and laser cutting, four power presses and CO2 welding bays." },
        { year: "2026", name: "50+ items, made to drawing", body: "A published catalogue of more than fifty standard items, plus custom sections fabricated to customer drawings every week." }
      ].map((j, i) => ({ year: j.year, name: j.name, body: j.body, delay: i * 70 }));

export const machines = [
        { name: "Press Brake", qty: "×2", body: "Forms tray side rails and covers to consistent flange angles across full sheet length.", spec: "3200 mm BED / 100 T" },
        { name: "Power Presses", qty: "×4", body: "Punching and blanking of rungs, slots and fitting profiles with dedicated tooling per width.", spec: "30 – 100 T" },
        { name: "Plasma Cutting", qty: "×1", body: "Profile cutting of heavier plate for brackets, base plates and custom sections.", spec: "up to 20 mm PLATE" },
        { name: "Laser Cutting", qty: "×1", body: "Clean, tight-tolerance cutting for fittings, coupler plates and instrument brackets.", spec: "±0.1 mm ACCURACY" },
        { name: "Multi-Spindle Drilling", qty: "×2", body: "Repeatable hole patterns so coupler and splice plates line up first time on site.", spec: "GANG DRILL SETUP" },
        { name: "CO2 Welding Bays", qty: "×3", body: "Rung-to-rail and fitting welds by qualified welders, visually inspected each batch.", spec: "MIG / CO2 SHIELDED" },
        { name: "Finishing & Coating", qty: "—", body: "Hot-dip galvanizing coordination, powder coating and elcometer thickness checks.", spec: "IS 2629 / IS 4759 GRADES" }
      ].map((m, i) => ({ name: m.name, qty: m.qty, body: m.body, spec: m.spec, no: String(i + 1).padStart(2, "0") }));

export const principles = [
        { name: "Quote what we can actually make", body: "If a section is better solved a different way, we say so at quotation stage rather than discovering it in production." },
        { name: "One team from cut to dispatch", body: "The people who form a batch also inspect and pack it, so nobody hands a problem down the line." },
        { name: "Records for every batch", body: "Material certificates, dimensional checks and coating readings are filed against the order, available on request." },
        { name: "Custom is normal", body: "Non-standard widths, rung pitches, bends and finishes are routine work here, not an exception to be discouraged." }
      ].map((p, i) => ({ name: p.name, body: p.body, no: String(i + 1).padStart(2, "0"), delay: i * 80 }));

export const credentials = [
        { name: "ISO 9001:2015", detail: "QUALITY MANAGEMENT SYSTEM" },
        { name: "Udyam Registered", detail: "MSME, GOVERNMENT OF INDIA" },
        { name: "GST Registered", detail: "PAN-INDIA SUPPLY" },
        { name: "IS 2629", detail: "HOT-DIP GALVANIZING PRACTICE" },
        { name: "IS 3043", detail: "EARTHING PRACTICE" },
        { name: "IEC 61537", detail: "CABLE TRAY LOAD CLASSES" }
      ] as const;
