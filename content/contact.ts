// Extracted verbatim from the approved design prototype.

export const channels = [
        { tag: "EMAIL", value: "pratikshaindustries2@gmail.com", note: "Drawings, BOQs and specifications", href: "mailto:pratikshaindustries2@gmail.com", size: "17px", bg: "#0A3E48", fg: "#F0DE9C", noteFg: "rgba(255,255,255,0.72)", tagFg: "rgba(255,255,255,0.6)", border: "#0A3E48", delay: 0 },
        { tag: "PHONE", value: "+91 98508 45054", note: "Mon–Sat, 9:30 am to 6:30 pm IST", href: "tel:+919850845054", size: "21px", bg: "#FFFFFF", fg: "#0A3E48", noteFg: "#4A524E", tagFg: "#6E756F", border: "rgba(10,62,72,0.1)", delay: 90 },
        { tag: "WHATSAPP", value: "Message the works", note: "Quick sizes, photos and site queries", href: "https://wa.me/919850845054", size: "21px", bg: "#FFFFFF", fg: "#0A3E48", noteFg: "#4A524E", tagFg: "#6E756F", border: "rgba(10,62,72,0.1)", delay: 180 },
        { tag: "VISIT", value: "Khed Shivapur, Pune", note: "15,000 sq. ft. facility — by appointment", href: "https://www.google.com/maps/search/?api=1&query=Khedekar+Industrial+Estate+Khed+Shivapur+Pune", size: "21px", bg: "#F0DE9C", fg: "#0A3E48", noteFg: "rgba(10,62,72,0.72)", tagFg: "rgba(10,62,72,0.6)", border: "#F0DE9C", delay: 270 }
      ] as const;

export const hours = [
        { day: "Monday – Friday", time: "9:30 am – 6:30 pm", fg: "#FFFFFF" },
        { day: "Saturday", time: "9:30 am – 2:00 pm", fg: "#FFFFFF" },
        { day: "Sunday & public holidays", time: "Closed", fg: "#F0DE9C" }
      ] as const;

export const people = [
        { name: "Mr. Pradeep Hatte", role: "FOUNDER", note: "Specifications, material choices and commercial terms." },
        { name: "Works office", role: "PRODUCTION", note: "Order status, dispatch schedules and inspection records." },
        { name: "Sales desk", role: "QUOTATIONS", note: "Pricing against BOQ, alternatives and repeat supply." }
      ] as const;

export const credentials = ["ISO 9001:2015", "Udyam MSME", "GST Certified", "IS 2629 Galvanizing", "Since 2013"] as const;

export const checklist = [
        { no: "01", name: "Widths & lengths", note: "Tray width, rail height and run length — or the section from the drawing." },
        { no: "02", name: "Material & finish", note: "Pre-GI, HDG, MS, SS, aluminium, powder coat or FRP. We advise if unsure." },
        { no: "03", name: "Quantity", note: "Running metres or piece count, plus the fittings the run needs." },
        { no: "04", name: "Site & date", note: "Delivery location and the date it is needed on site." }
      ].map((c, i) => ({ no: c.no, name: c.name, note: c.note, delay: i * 80 }));
