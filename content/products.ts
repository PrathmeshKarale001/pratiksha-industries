// Extracted verbatim from the approved design prototype.
// 20 catalogue items across 4 families. Specifications are standard-anchored —
// do not replace with invented figures (see HANDOVER.md §6).

export type ProductCategory = "tray" | "fittings" | "supports" | "earthing";

export type Product = {
  id: string;
  cat: ProductCategory;
  code: string;
  name: string;
  img: string;
  short: string;
  desc: string;
  specs: [string, string][];
  dimW: string;
  dimH: string;
  materials: string[];
  standards: string[];
};

export const CATS: Record<ProductCategory, { name: string; short: string }> = {
  tray: { name: "Cable Tray Systems", short: "CABLE TRAY" },
  fittings: { name: "Cable Tray Fittings", short: "FITTINGS" },
  supports: { name: "Couplers & Supports", short: "SUPPORTS" },
  earthing: { name: "Earthing & Instrumentation", short: "EARTHING / INST." }
};

export const PRODUCTS: Product[] = [
  {
    id: "ladder", cat: "tray", code: "PI-CT-LD", name: "Ladder Type Cable Tray",
    img: "images/products/ladder-tray.png",
    short: "Rung-and-rail tray for heavy power runs where ventilation and cable dressing matter most.",
    desc: "Two formed side rails joined by punched rungs at a fixed pitch — the workhorse for heavy power cable in plants and substations. Open construction keeps cables cool, lets dust fall through, and allows cables to be dropped out at any point along the run.",
    specs: [["Widths", "50 – 1000 mm"], ["Rail Height", "25 / 40 / 50 / 75 / 100 mm"], ["Sheet Thickness", "1.2 – 2.5 mm"], ["Standard Length", "2500 / 3000 mm"], ["Rung Pitch", "250 / 300 mm"], ["Load Class", "to IEC 61537, stated per span"]],
    dimW: "W = 50 – 1000 mm", dimH: "H = 25 – 100 mm",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304 / 316", "Aluminium", "Powder Coated", "FRP"],
    standards: ["IS 2629", "IEC 61537", "NEMA VE-1"]
  },
  {
    id: "perforated", cat: "tray", code: "PI-CT-PF", name: "Perforated Type Cable Tray",
    img: "images/products/perforated-tray.png",
    short: "Slotted base tray for control and instrument cabling with continuous support.",
    desc: "A folded channel with a slotted base — continuous support for smaller control, signal and instrument cables while the perforations keep ventilation and tie-down points along the whole length.",
    specs: [["Widths", "50 – 900 mm"], ["Height", "25 / 40 / 50 / 75 mm"], ["Sheet Thickness", "1.0 – 2.0 mm"], ["Standard Length", "2500 / 3000 mm"], ["Slot Pattern", "Staggered, 17 × 62 mm"], ["Cover", "Optional snap-on / bolted"]],
    dimW: "W = 50 – 900 mm", dimH: "H = 25 – 75 mm",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304 / 316", "Powder Coated"],
    standards: ["IS 2629", "IEC 61537"]
  },
  {
    id: "raceway", cat: "tray", code: "PI-CT-RW", name: "Raceway Type Cable Tray",
    img: "images/products/raceway-tray.png",
    short: "Fully enclosed trunking for clean, protected routing in exposed areas.",
    desc: "Closed box section with a removable cover — used where cabling has to be protected from dust, water spray or mechanical damage, and where a tidy finished appearance is part of the specification.",
    specs: [["Widths", "50 – 600 mm"], ["Height", "50 / 75 / 100 mm"], ["Sheet Thickness", "1.2 – 2.0 mm"], ["Standard Length", "2500 mm"], ["Cover Fixing", "Snap-fit or screwed"], ["Divider", "Optional segregation barrier"]],
    dimW: "W = 50 – 600 mm", dimH: "H = 50 – 100 mm",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304", "Powder Coated"],
    standards: ["IS 2629", "IEC 61537"]
  },
  {
    id: "wiremesh", cat: "tray", code: "PI-CT-WM", name: "Wire Mesh Type Cable Tray",
    img: "images/products/wiremesh-tray.png",
    short: "Welded wire basket for data and light power — fast to cut, bend and route on site.",
    desc: "Welded steel wire basket with a flat safety edge. Light, quick to install and easy to modify on site with a bolt cutter, which makes it the default choice for data centre and office structured cabling.",
    specs: [["Widths", "50 – 600 mm"], ["Height", "30 / 50 / 100 mm"], ["Wire Diameter", "3.5 / 4.0 / 5.0 mm"], ["Mesh Pitch", "50 × 100 mm"], ["Standard Length", "3000 mm"], ["Duty Classes", "Light / Medium / Heavy"]],
    dimW: "W = 50 – 600 mm", dimH: "H = 30 – 100 mm",
    materials: ["Electro-Galvanized", "Hot-Dip Galvanized", "SS 304", "Powder Coated"],
    standards: ["IEC 61537", "IS 2629"]
  },
  {
    id: "raceway-cover", cat: "tray", code: "PI-CT-CV", name: "Tray Cover & Raceway Lid",
    img: "images/products/raceway-alt.png",
    short: "Peaked or flat covers that shed water and keep dust off open tray runs.",
    desc: "Covers pressed to match every tray width we make — flat for indoor runs, peaked for outdoor, with clip or bolt fixing and optional stainless clamps for high-wind locations.",
    specs: [["Widths", "Matched to tray, 50 – 1000 mm"], ["Profile", "Flat / Peaked"], ["Sheet Thickness", "0.8 – 1.6 mm"], ["Standard Length", "2500 mm"], ["Fixing", "Spring clip / bolted clamp"]],
    dimW: "W = matched to tray", dimH: "PROFILE: FLAT / PEAKED",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "SS 304", "Powder Coated"],
    standards: ["IS 2629"]
  },
  {
    id: "bend", cat: "fittings", code: "PI-FT-HB", name: "Horizontal Bend",
    img: "images/products/bend.png",
    short: "Factory-formed 45° and 90° bends that keep the cable bending radius safe.",
    desc: "Pressed and welded bends in matching width and height, supplied with coupler plates and fasteners. Radii are set so the installed cable never drops below its minimum bending radius at the turn.",
    specs: [["Angles", "30° / 45° / 60° / 90°"], ["Widths", "50 – 1000 mm"], ["Inside Radius", "150 / 300 / 600 mm"], ["Thickness", "Matched to tray gauge"], ["Supplied With", "Coupler plates + hardware"]],
    dimW: "R = 150 / 300 / 600 mm", dimH: "ANGLE: 30° – 90°",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304", "Powder Coated"],
    standards: ["IEC 61537", "IS 2629"]
  },
  {
    id: "bends", cat: "fittings", code: "PI-FT-RB", name: "Inner & Outer Riser Bends",
    img: "images/products/bends.png",
    short: "Vertical inside and outside risers for level changes along a run.",
    desc: "Inner and outer risers take the tray up and over obstructions without site fabrication. Both are formed on the same tooling as the tray, so rail height, hole pattern and finish stay continuous through the change of level.",
    specs: [["Type", "Inner riser / Outer riser"], ["Angles", "45° / 90°"], ["Widths", "50 – 1000 mm"], ["Inside Radius", "150 / 300 mm"], ["Supplied With", "Coupler plates + hardware"]],
    dimW: "R = 150 / 300 mm", dimH: "INNER / OUTER RISER",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IEC 61537", "IS 2629"]
  },
  {
    id: "cross", cat: "fittings", code: "PI-FT-CR", name: "Horizontal Cross",
    img: "images/products/crosses.png",
    short: "Four-way junction for distributing a main run into two branches.",
    desc: "A four-way intersection that lets a main tray run split in both directions at one point — used at distribution nodes where cables leave the spine towards equipment on either side.",
    specs: [["Ways", "4-way, 90° branches"], ["Main Width", "100 – 1000 mm"], ["Branch Width", "Equal or reduced"], ["Inside Radius", "150 / 300 mm"], ["Supplied With", "Coupler plates + hardware"]],
    dimW: "MAIN W = 100 – 1000 mm", dimH: "4-WAY / 90°",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IEC 61537"]
  },
  {
    id: "tee", cat: "fittings", code: "PI-FT-TE", name: "Equal & Unequal Tee",
    img: "images/products/tee.png",
    short: "Three-way branch fitting in equal or reduced branch widths.",
    desc: "Takes a branch off a main run at 90°. Available with the branch equal to the main width or reduced, so a single fitting handles both the spine and the drop to a smaller distribution tray.",
    specs: [["Ways", "3-way, 90° branch"], ["Main Width", "50 – 1000 mm"], ["Branch", "Equal or reduced width"], ["Inside Radius", "150 / 300 mm"], ["Supplied With", "Coupler plates + hardware"]],
    dimW: "MAIN W = 50 – 1000 mm", dimH: "3-WAY / 90°",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IEC 61537"]
  },
  {
    id: "reducer", cat: "fittings", code: "PI-FT-RD", name: "Reducer — Centre",
    img: "images/products/reducer.png",
    short: "Symmetrical transition between two tray widths on a straight run.",
    desc: "A straight-line taper from a wider tray to a narrower one, centred on the run axis. Used where cable count drops off after a distribution point and the tray width can step down.",
    specs: [["Type", "Centre reducer"], ["From Width", "100 – 1000 mm"], ["To Width", "50 – 900 mm"], ["Taper Length", "300 / 450 mm"], ["Supplied With", "Coupler plates + hardware"]],
    dimW: "W1 → W2, TAPER 300 / 450 mm", dimH: "CENTRE REDUCER",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IEC 61537"]
  },
  {
    id: "reducers", cat: "fittings", code: "PI-FT-RS", name: "Reducer Set — Left & Right",
    img: "images/products/reducers.png",
    short: "Offset reducers that keep one rail in line while the width steps down.",
    desc: "Left- and right-hand reducers hold one side rail straight through the transition, which matters when the tray run is aligned to a wall, a beam or a cable entry face.",
    specs: [["Type", "Left-hand / Right-hand"], ["From Width", "100 – 1000 mm"], ["To Width", "50 – 900 mm"], ["Taper Length", "300 / 450 mm"], ["Supplied With", "Coupler plates + hardware"]],
    dimW: "W1 → W2, ONE RAIL IN LINE", dimH: "LH / RH REDUCER",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IEC 61537"]
  },
  {
    id: "coupler", cat: "supports", code: "PI-CP-SP", name: "Coupler & Splice Plate",
    img: "images/products/coupler-plate.png",
    short: "Joint plates that keep runs mechanically and electrically continuous.",
    desc: "Flat and angled splice plates joining tray lengths end to end. Serrated washers bite through the coating to keep the run electrically continuous for earthing purposes without a separate bonding jumper.",
    specs: [["Types", "Straight / Expansion / Adjustable"], ["Thickness", "2.0 – 3.0 mm"], ["Hole Pattern", "Matched to tray"], ["Fasteners", "M6 / M8 with serrated flange nut"], ["Pack", "Supplied per joint set"]],
    dimW: "T = 2.0 – 3.0 mm", dimH: "M6 / M8 FASTENERS",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IEC 61537", "IS 2629"]
  },
  {
    id: "clamps", cat: "supports", code: "PI-CP-CL", name: "Clamps & Hold-Down Brackets",
    img: "images/products/clamps-brackets.png",
    short: "Hold-down clamps that fix tray to support steel without site drilling.",
    desc: "Pressed clamps and hold-downs that lock the tray to channel, angle or beam supports. Slotted so the installer can adjust position on site, and available with a slide fixing where thermal movement has to be allowed.",
    specs: [["Types", "Hold-down / Slide / Beam clamp"], ["Thickness", "2.0 – 4.0 mm"], ["Fasteners", "M8 / M10"], ["Adjustment", "Slotted, ±15 mm"], ["Pack", "Sets of 10 / 25"]],
    dimW: "T = 2.0 – 4.0 mm", dimH: "M8 / M10",
    materials: ["Pre-GI", "Hot-Dip Galvanized", "Mild Steel", "SS 304"],
    standards: ["IS 2629"]
  },
  {
    id: "wall-bracket", cat: "supports", code: "PI-CP-WB", name: "Wall Support Bracket",
    img: "images/products/wall-bracket.png",
    short: "Cantilever wall brackets in matched lengths for every tray width.",
    desc: "Formed cantilever brackets that carry the tray off a wall or column. Pressed from heavier gauge with a returned edge for stiffness, and slotted along the arm so the tray can be positioned exactly.",
    specs: [["Arm Lengths", "100 – 750 mm"], ["Thickness", "2.0 – 4.0 mm"], ["Load Rating", "to bracket load table, per arm length"], ["Fixing", "2 / 4 hole base, M10 – M12"], ["Slotting", "Continuous along arm"]],
    dimW: "ARM = 100 – 750 mm", dimH: "T = 2.0 – 4.0 mm",
    materials: ["Hot-Dip Galvanized", "Pre-GI", "Mild Steel", "SS 304", "Powder Coated"],
    standards: ["IS 2629", "IEC 61537"]
  },
  {
    id: "bracket", cat: "supports", code: "PI-CP-CB", name: "Cantilever & Channel Bracket",
    img: "images/products/bracket.png",
    short: "Channel-mounted arms for multi-tier tray stacks on a single upright.",
    desc: "Bolt-on arms for strut channel uprights, letting several tiers of tray share one support line. Tier spacing is set on site, so trays can be added later without disturbing the installed run.",
    specs: [["Arm Lengths", "150 – 600 mm"], ["Channel Sizes", "41 × 41 / 41 × 21 mm"], ["Thickness", "2.5 – 4.0 mm"], ["Load Rating", "to bracket load table, per arm length"], ["Tiers", "Unlimited, field set"]],
    dimW: "ARM = 150 – 600 mm", dimH: "CHANNEL 41 × 41 mm",
    materials: ["Hot-Dip Galvanized", "Pre-GI", "Mild Steel", "SS 304"],
    standards: ["IS 2629"]
  },
  {
    id: "bolts", cat: "supports", code: "PI-CP-FB", name: "Foundation Bolts & Fasteners",
    img: "images/products/foundation-bolts.png",
    short: "J, L and anchor bolts with nuts, washers and templates.",
    desc: "Threaded foundation bolts for anchoring support steel to concrete, made to length with matching nuts, plate washers and setting templates so the layout is right before the pour.",
    specs: [["Types", "J bolt / L bolt / Anchor"], ["Diameters", "M10 – M36"], ["Lengths", "150 – 1200 mm"], ["Thread", "Metric coarse, rolled"], ["Supplied With", "Nuts, washers, template"]],
    dimW: "L = 150 – 1200 mm", dimH: "M10 – M36",
    materials: ["Hot-Dip Galvanized", "Mild Steel", "SS 304 / 316", "Zinc Plated"],
    standards: ["IS 5624", "IS 2629"]
  },
  {
    id: "earthing-strips", cat: "earthing", code: "PI-EA-ST", name: "Earthing Strips & Flats",
    img: "images/products/earthing-strips.png",
    short: "Copper and GI earth flats cut, drilled and bent to your earthing layout.",
    desc: "Earth flats supplied straight or bent to your grid drawing, drilled for bolted joints and tagged per layout reference — so the site crew is laying out a kit rather than fabricating on the ground.",
    specs: [["Sections", "25 × 3 up to 75 × 12 mm"], ["Materials", "Copper / GI / Aluminium"], ["Lengths", "Cut to 6000 mm"], ["Drilling", "To layout drawing"], ["Bending", "Formed offsets and legs"]],
    dimW: "SECTION 25 × 3 – 75 × 12 mm", dimH: "L = up to 6000 mm",
    materials: ["Electrolytic Copper", "Hot-Dip Galvanized", "Tinned Copper", "Aluminium"],
    standards: ["IS 3043", "IEC 62561"]
  },
  {
    id: "earthing-solutions", cat: "earthing", code: "PI-EA-EL", name: "Earthing Electrodes & Plates",
    img: "images/products/earthing-solutions.png",
    short: "Pipe, rod and plate electrodes with backfill and inspection chambers.",
    desc: "Complete earth pit assemblies — electrode, backfill compound, watering funnel and inspection chamber — sized to the resistance target and the soil resistivity of the site.",
    specs: [["Electrode Types", "Pipe / Rod / Plate"], ["Rod Diameter", "17.2 / 20 / 25 mm"], ["Plate Size", "600 × 600 mm, 3 – 6 mm"], ["Burial Depth", "3000 mm standard"], ["Kit", "Backfill, funnel, chamber"]],
    dimW: "DEPTH = 3000 mm STANDARD", dimH: "ROD Ø 17.2 – 25 mm",
    materials: ["Copper Bonded", "Hot-Dip Galvanized", "Electrolytic Copper", "SS 304"],
    standards: ["IS 3043", "IEC 62561", "IS 2629"]
  },
  {
    id: "manifolds", cat: "earthing", code: "PI-IN-MF", name: "Instrumentation Manifolds",
    img: "images/products/manifolds.png",
    short: "2, 3 and 5 valve manifolds for pressure and DP transmitter hook-ups.",
    desc: "Machined valve manifolds for pressure, differential pressure and level transmitters — 2, 3 and 5 valve configurations with direct, remote and pipe-mounted patterns, pressure tested before dispatch.",
    specs: [["Configurations", "2 / 3 / 5 valve"], ["Patterns", "Direct, remote, pipe mount"], ["Rating", "up to 6000 psi / 414 bar"], ["Connections", "1/4\" – 1/2\" NPT / BSP"], ["Temperature", "-40 to 200 °C"], ["Testing", "100% hydro tested"]],
    dimW: "RATING up to 414 bar", dimH: "1/4\" – 1/2\" NPT",
    materials: ["SS 316", "SS 304", "Carbon Steel", "Monel"],
    standards: ["ASME B16.34", "BS 6755", "API 598"]
  },
  {
    id: "inst-fittings", cat: "earthing", code: "PI-IN-FT", name: "Instrumentation Fittings",
    img: "images/products/instrumentation-fittings.png",
    short: "Tube fittings, glands, bushings and unions for instrument lines.",
    desc: "Double-ferrule tube fittings, cable glands, bushings and three-piece unions for impulse and instrument air lines — machined to consistent ferrule geometry so joints seal reliably on re-make.",
    specs: [["Fitting Types", "Union, elbow, tee, adapter"], ["Tube Sizes", "1/8\" – 1\" / 3 – 25 mm"], ["Rating", "up to 6000 psi"], ["Ferrule", "Twin ferrule, hardened"], ["Glands", "Single / double compression"]],
    dimW: "TUBE 1/8\" – 1\" (3 – 25 mm)", dimH: "TWIN FERRULE",
    materials: ["SS 316", "SS 304", "Brass", "Carbon Steel"],
    standards: ["ASTM A479", "IS 12943", "ATEX (glands)"]
  }
];

export const CATEGORY_IDS = ["all", ...Object.keys(CATS)] as const;

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.id === slug);
