// Extracted verbatim from the approved design prototype.

export const stats = [
        { display: "15,000", to: 15000, suffix: "", label: "SQ. FT. FACILITY", bg: "#0A3E48", fg: "#F0DE9C", sub: "rgba(255,255,255,0.6)", delay: 0 },
        { display: "30", to: 30, suffix: "", label: "SKILLED WORKFORCE", bg: "#FFFFFF", fg: "#0A3E48", sub: "#6E756F", delay: 90 },
        { display: "7", to: 7, suffix: "", label: "MATERIAL FINISHES", bg: "#FFFFFF", fg: "#0A3E48", sub: "#6E756F", delay: 180 },
        { display: "50", to: 50, suffix: "+", label: "PRODUCTS IN RANGE", bg: "#F0DE9C", fg: "#0A3E48", sub: "rgba(10,62,72,0.65)", delay: 270 }
      ] as const;

export const solutions = [
        { no: "01", name: "Cable Trays", desc: "Perforated, ladder, raceway and wire mesh trays in every standard width and gauge.", img: "assets/prod-tray.png", delay: 0 },
        { no: "02", name: "Earthing Systems", desc: "Strips, rods, plates and electrodes for reliable electrical safety and continuity.", img: "assets/prod-earthing.png", delay: 90 },
        { no: "03", name: "Tray Accessories", desc: "Bends, tees, crosses, reducers, risers and couplers — every fitting a run needs.", img: "assets/prod-accessories.png", delay: 180 },
        { no: "04", name: "Instrumentation", desc: "Precision manifolds, cable glands, bushings and unions for process and instrument lines.", img: "assets/prod-manifold.png", delay: 270 }
      ] as const;

export const marks = [
        { name: "ISO 9001:2015", sub: "QUALITY MANAGEMENT", delay: 0 },
        { name: "Udyam", sub: "REGISTERED MSME", delay: 70 },
        { name: "GST", sub: "CERTIFIED", delay: 140 },
        { name: "IS 2629", sub: "GALVANIZING", delay: 210 },
        { name: "Since 2013", sub: "PUNE, INDIA", delay: 280 }
      ] as const;

export const projects = [
        { name: "Plant Cable Routing", tagA: "TRAY", tagB: "INSTALL", img: "assets/proj-plant.png", delay: 0 },
        { name: "Warehouse Distribution", tagA: "MESH", tagB: "SUPPLY", img: "assets/proj-warehouse.png", delay: 110 },
        { name: "Substation Earthing", tagA: "EARTHING", tagB: "SITE", img: "assets/proj-substation.png", delay: 220 }
      ] as const;

export const inspection = [
        { no: "STAGE 01", tag: "INCOMING", name: "Raw Material Check", body: "Mill test certificates verified against the grade ordered; sheet thickness and zinc coating spot-checked before it enters the shop." },
        { no: "STAGE 02", tag: "FORMING", name: "First-Piece Approval", body: "Every setup is proven on a first piece — width, rail height, hole pitch and squareness signed off before the batch runs." },
        { no: "STAGE 03", tag: "IN-PROCESS", name: "Dimensional Audit", body: "Random pieces pulled through the run and measured, so drift in the press or drilling line is caught inside the batch, not after it." },
        { no: "STAGE 04", tag: "WELDING", name: "Weld Inspection", body: "CO2 welds visually inspected for penetration and spatter; rung-to-rail joints load-checked on sample pieces." },
        { no: "STAGE 05", tag: "FINISHING", name: "Coating Thickness", body: "Galvanizing and powder coat measured with an elcometer against the IS 4759 coating grade for that gauge; adhesion and finish uniformity recorded." },
        { no: "STAGE 06", tag: "DISPATCH", name: "Pack & Tag", body: "Items counted, tagged to the layout reference and bundled with fittings so the crew unloads a kit, not a pile." }
      ].map((q, i) => ({ no: q.no, tag: q.tag, name: q.name, body: q.body, delay: i * 70 }));

export const tolerances = [
        { value: "340 – 610 g/m²", label: "ZINC COATING BY GAUGE, IS 4759" },
        { value: "IEC 61537", label: "LOAD CLASS STATED PER SPAN" },
        { value: "06 stages", label: "INSPECTED, MATERIAL TO DISPATCH" },
        { value: "100%", label: "BATCHES WITH RECORDS" }
      ].map((t, i) => ({ value: t.value, label: t.label, delay: i * 70 }));

export const industries = [
        { name: "Power & Utilities", note: "Substations, switchyards, generation." },
        { name: "Oil, Gas & Chemical", note: "Process plants and tank farms." },
        { name: "Pharmaceutical", note: "Clean areas and utility blocks." },
        { name: "Automotive & Heavy", note: "Press shops, paint lines, assembly." },
        { name: "Data & Telecom", note: "Server halls and structured cabling." },
        { name: "Infrastructure", note: "Metro, tunnels, water treatment." },
        { name: "Food & Beverage", note: "Washdown areas needing stainless." },
        { name: "Commercial Build", note: "Malls, hospitals, campuses." }
      ].map((ind, i) => ({ name: ind.name, note: ind.note, no: String(i + 1).padStart(2, "0"), delay: i * 60 }));

export const steps = [
        { no: "01", eta: "DAY 0", name: "Share the Drawing", body: "Send a GA drawing, BOQ or even a sketch with widths and lengths — we will read the section and confirm what is standard." },
        { no: "02", eta: "48 HOURS", name: "Quotation & Finish", body: "Priced against material, gauge and finish options, with alternatives where a different spec saves cost or lead time." },
        { no: "03", eta: "IN-HOUSE", name: "Fabrication & Finish", body: "Cutting, pressing, drilling, welding, galvanizing and coating all happen under our roof, with inspection at each stage." },
        { no: "04", eta: "ON DATE", name: "Tagged Dispatch", body: "Bundled by run reference with fittings and fasteners, loaded and delivered on the date quoted." }
      ].map((s, i) => ({ no: s.no, eta: s.eta, name: s.name, body: s.body, delay: i * 90 }));

export const materials = [
        { name: "Pre-Galvanized", note: "Corrosion resistance for outdoor runs." },
        { name: "Hot-Dip Galvanized", note: "Superior protection in harsh duty." },
        { name: "Mild Steel", note: "Cost-effective and versatile." },
        { name: "Stainless Steel", note: "Corrosive and hygienic environments." },
        { name: "Aluminium", note: "Lightweight, corrosion-resistant." },
        { name: "Powder Coated", note: "Any colour to specification." },
        { name: "FRP", note: "Non-conductive, chemical-resistant." },
        { name: "Custom Fabrication", note: "Non-standard profiles to drawing." }
      ].map((m, i) => ({ name: m.name, note: m.note, delay: i * 55 }));


/* Raw sources for the decorated lists (see components/pages/HomePage.tsx). */

export const capabilitiesRaw = [
      { name: "Precision Fabrication", body: "Bending, cutting, drilling, punching, pressing and CO2 welding under one roof — press brake, plasma and laser cutting, multi-spindle drilling and four power presses hold tolerance across every batch." },
      { name: "Material Options", body: "Pre-GI, hot-dip galvanized, MS, SS, aluminium, powder coated and FRP — specified to the environment the tray will live in, from coastal outdoors to hazardous process areas." },
      { name: "On-Time Delivery", body: "Because fabrication, finishing and inspection are all in-house, lead times stay ours to control — and the date we quote is the date we ship." }
    ] as const;

export const familiesRaw = [
      { name: "Cable Tray Systems", items: ["Perforated Cable Tray", "Ladder Type Cable Tray", "Raceway Type Cable Tray", "Wire Mesh Cable Tray", "Junction Box", "Cable Tray Cover"] },
      { name: "Earthing Products", items: ["Earthing Strips", "Earthing Rods", "Earthing Plates", "Earthing Electrodes"] },
      { name: "Wire Mesh Tray Variants", items: ["Light Duty Wire Mesh Tray", "Medium Duty Wire Mesh Tray", "Heavy Duty Wire Mesh Tray"] },
      { name: "Cable Tray Accessories", items: ["Male Connector", "Couplers", "Reducer Center", "Reducer Left", "Reducer Right", "Horizontal Bend", "Horizontal Cross", "Tee Bend", "Inner Riser", "Outer Riser"], cols: 2, span: "span 2" },
      { name: "Cable Glands & Accessories", items: ["Cable Glands", "Bushing", "3 Piece Union"] },
      { name: "Instrumentation Fittings / Manifolds", items: ["2 CPL Manifold", "2 DM 1 Manifold", "2 FL 1 Manifold", "2 GIV", "2 MNV Manifold", "2 PTM 1 Manifold", "2 PTM 2 Manifold", "2 PTM 4 Manifold", "2 PTM 5 Manifold", "3 DM 1 Manifold", "3 DM 2 Manifold", "3 DM 5 Manifold", "3 HM 1 Manifold", "3 TM 1 Manifold", "4 DM 1 Manifold", "5 CPL 1 Manifold", "5 DM 1 Manifold", "5 HM 1 Manifold", "5 RM 3 Manifold", "5b TM 1 Manifold"], cols: 3, span: "span 3" }
    ] as const;

export const marqueeRaw = [
      { label: "Perforated Trays", img: "assets/prod-tray.png" },
      { label: "Ladder Trays", img: "assets/proj-plant.png" },
      { label: "Wire Mesh Trays", img: "assets/proj-warehouse.png" },
      { label: "Earthing Strips", img: "assets/prod-earthing.png" },
      { label: "Cable Glands", img: "assets/prod-accessories.png" },
      { label: "Manifolds", img: "assets/prod-manifold.png" },
      { label: "Junction Boxes", img: "assets/process.png" },
      { label: "Bends & Risers", img: "assets/proj-substation.png" }
    ] as const;
