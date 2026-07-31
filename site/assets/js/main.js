(function () {
  "use strict";

  const LANG_KEY = "hbot_lang";
  const SUPPORTED = ["tr", "en", "ar", "ru"];

  /* TODO: replace with the real WhatsApp Business number (country code, digits only, e.g. "905XXXXXXXXX") before launch.
     Bos birakilirsa WhatsApp butonu numara gelene kadar e-posta taslagina yonlendirir. */
  const WHATSAPP_NUMBER = "";

  /* ---------------- Icon library ---------------- */
  const ICONS = {
    connect: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    os: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.4 1.5 3.2C10 10 10 11 10 12v7a2 2 0 0 0 4 0v-7c0-1 0-2 .5-2.8.7-.8 1.5-1.7 1.5-3.2a4 4 0 0 0-4-4Z"/><path d="M9 21h6"/></svg>',
    sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M3 16v-4h4M21 8v4h-4"/></svg>',
    guard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    silent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>',
    care: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    glass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
    solid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/></svg>',
    premium: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 2.9 6.3L21 9l-5 4.4L17.4 21 12 17.6 6.6 21 8 13.4 3 9l6.1-.7Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    lying: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="20" height="8" rx="4"/><circle cx="7" cy="13" r="1.3"/></svg>',
    oneSeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="6"/><circle cx="12" cy="9" r="1.5"/></svg>',
    twoSeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="7"/><circle cx="9" cy="11" r="1.3"/><circle cx="15" cy="11" r="1.3"/></svg>',
    fourSeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="7"/><circle cx="8" cy="12" r="1.2"/><circle cx="12" cy="10" r="1.2"/><circle cx="16" cy="12" r="1.2"/><circle cx="12" cy="14" r="1.2"/></svg>',
    nexus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="7" cy="12" r="1.1"/><circle cx="11" cy="10.5" r="1.1"/><circle cx="15" cy="10.5" r="1.1"/><circle cx="19" cy="12" r="1.1"/><circle cx="11" cy="13.5" r="1.1"/><circle cx="15" cy="13.5" r="1.1"/></svg>',
    massage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><path d="M4 21h16"/></svg>',
    leather: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 4v16M15 4v16"/></svg>',
    entertainment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>',
    finish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="17" r="2.5"/><circle cx="6" cy="12" r="2.5"/><path d="M8.2 10.5 12 8M15.5 8l1.8 6.8M9 13l6.5 3.3"/></svg>',
    uvc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>',
    backupO2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2.5 3.5 6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 3.5-8.5 6-12Z"/><path d="M9 22h6"/></svg>',
    warranty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4.4-1.5 8-5.5 8-11V5l-8-3-8 3v6c0 5.5 3.6 9.5 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    playstation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="12" rx="4"/><circle cx="15" cy="11" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="17" cy="13" r="1"/><circle cx="13" cy="13" r="1"/><path d="M6 11v4M4 13h4"/></svg>',
    wound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5 12 5l3 3-2 2 2 2-2 2 2 2-3 3-7.5-7.5Z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    decompression: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M6 8l6-6 6 6M6 16l6 6 6-6"/></svg>',
    embolism: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="3"/><circle cx="16" cy="7" r="2"/><circle cx="12" cy="15" r="4"/></svg>',
    poisoning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1.3"/><circle cx="15" cy="9" r="1.3"/><path d="M8 16c1.3-1 2.7-1 4 0s2.7 1 4 0"/></svg>',
    ear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14a6 6 0 1 1 6 6c-1 0-2-.5-2-2v-2a2 2 0 0 1 2-2 2 2 0 0 0 0-4"/></svg>',
    bone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8a2.5 2.5 0 1 0-3.5 2.3L9 14.7A2.5 2.5 0 1 0 6.3 18a2.5 2.5 0 0 0 4.2-1.7l4.5-4.4A2.5 2.5 0 0 0 17 8Z"/></svg>',
    burn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2.5 3.5 6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 3.5-8.5 6-12Z"/></svg>',
    gangrene: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5c0 3 2 4 2 7a3 3 0 0 0 6 0c0-3 2-4 2-7a5 5 0 0 0-5-5Z"/><path d="M12 19v3"/></svg>',
    blood: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z"/></svg>',
    brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5V7a3 3 0 0 0-1 5.8V15a3.5 3.5 0 0 0 3.5 3.5A3.5 3.5 0 0 0 12 15V6.5A3.5 3.5 0 0 0 9.5 3Z"/><path d="M14.5 3A3.5 3.5 0 0 1 18 6.5V7a3 3 0 0 1 1 5.8V15a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 12 15"/></svg>',
    smoke: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21c2-2 2-4 0-6M9 21c2-2 2-4 0-6M14 21c2-2 2-4 0-6M19 21c2-2 2-4 0-6M6 9c0-4 3-6 3-6s-1 3 1 4 3-2 3-2 2 3 0 5 3 3 3 3"/></svg>',
    antiaging: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="2.2"/></svg>',
    jetlag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 16.5 21 8l-2 5.5-8 3-2 5-1.5-3-4-1z"/><circle cx="17.5" cy="6.5" r="1.3"/></svg>',
    mobileApp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>',
    healthSync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 8.6c0 4.2-4.2 7.4-8.8 11.4C7.4 16 3.2 12.8 3.2 8.6a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z"/><path d="M7 12h2l1.5-3 2 5 1.5-2H17"/></svg>',
    screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-9.84-10.01-9.84Zm0 18.16h-.01a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.28 8.28 0 0 1-1.27-4.4c0-4.59 3.74-8.32 8.33-8.32 2.22 0 4.31.87 5.88 2.44a8.26 8.26 0 0 1 2.44 5.89c0 4.59-3.75 8.26-8.34 8.26Zm4.56-6.2c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.78.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z"/></svg>'
  };

  const MODEL_ICON = { "solo-lounge": "lying", solo: "oneSeat", duo: "twoSeat", quad: "fourSeat", "quad-cube": "fourSeat", nexus: "nexus" };
  const ADDON_ICON = { massage: "massage", leather: "leather", entertainment: "entertainment", finish: "finish", uvc: "uvc", "backup-o2": "backupO2", warranty: "warranty", install: "install" };
  const PILLAR_ICON = { connect: "connect", os: "os", ai: "ai", sync: "sync", guard: "guard" };

  const MODEL_ORDER = ["solo-lounge", "solo", "duo", "quad", "quad-cube", "nexus"];
  const MODEL_KEY_MAP = { "solo-lounge": "soloLounge", solo: "solo", duo: "duo", quad: "quad", "quad-cube": "quadCube", nexus: "nexus" };
  const MODEL_PAGES = {
    "solo-lounge": "model-apex-solo-lounge.html",
    solo: "model-apex-solo.html",
    duo: "model-apex-duo.html",
    quad: "model-apex-quad.html",
    "quad-cube": "model-apex-quad-cube.html",
    nexus: "model-apex-nexus.html"
  };

  /* ---------------- Pricing data (EUR bazlı — illustrative, update with real figures) ---------------- */
  const MODEL_PRICING = {
    "solo-lounge": { base: 68000, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 5400 }, { ata: "2.5 ATA", price: 10200 }, { ata: "3.0 ATA", price: 17000, nexusOnly: true }, { ata: "6.0 ATA", price: 27200, nexusOnly: true }] },
    solo: { base: 55000, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 4400 }, { ata: "2.5 ATA", price: 8300 }, { ata: "3.0 ATA", price: 13800, nexusOnly: true }, { ata: "6.0 ATA", price: 22000, nexusOnly: true }] },
    duo: { base: 95000, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 7600 }, { ata: "2.5 ATA", price: 14300 }, { ata: "3.0 ATA", price: 23800, nexusOnly: true }, { ata: "6.0 ATA", price: 38000, nexusOnly: true }] },
    quad: { base: 145000, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 11600 }, { ata: "2.5 ATA", price: 21800 }, { ata: "3.0 ATA", price: 36300, nexusOnly: true }, { ata: "6.0 ATA", price: 58000, nexusOnly: true }] },
    "quad-cube": { base: 165000, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 13200 }, { ata: "2.5 ATA", price: 24800 }, { ata: "3.0 ATA", price: 41300, nexusOnly: true }, { ata: "6.0 ATA", price: 66000, nexusOnly: true }] },
    nexus: { base: 220000, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 17600 }, { ata: "2.5 ATA", price: 33000 }, { ata: "3.0 ATA", price: 55000, nexusOnly: true }, { ata: "6.0 ATA", price: 88000, nexusOnly: true }] }
  };
  /* Basınç kademe katsayıları (model base'ine göre): 1.5→taban, 2.0→+%8, 2.5→+%15, 3.0→+%25, 6.0→+%40 (100'e yuvarlı).
     3.0 ve 6.0 ATA yalnızca Apex Nexus'ta seçilebilir (nexusOnly). */
  const ADDON_PRICING = { massage: 2200, leather: 1800, entertainment: 1200, finish: 900, uvc: 1500, "backup-o2": 3000, warranty: 2500, install: 1000, playstation: 1900 };
  const STYLE_PRICING = { solid: 0, glass: 3500, premium: 7500 };
  const PRESSURE_RANGE = { "solo-lounge": "1.5 – 2.5 ATA", solo: "1.5 – 2.5 ATA", duo: "1.5 – 2.5 ATA", quad: "1.5 – 2.5 ATA", "quad-cube": "1.5 – 2.5 ATA", nexus: "3.0 – 6.0 ATA" };

  /* Apex Nexus: base price includes 6 seats; each additional seat adds SEAT_PRICE (illustrative — update with real figure) */
  const NEXUS_BASE_SEATS = 6;
  const NEXUS_MAX_SEATS = 16;
  const NEXUS_SEAT_PRICE = 12000;

  /* ---------------- Currency (live exchange rates, EUR base) ---------------- */
  const CURRENCIES = ["EUR", "USD", "GBP", "AED", "RUB"];
  const CURRENCY_SYMBOLS = { USD: "$", GBP: "£", EUR: "€", AED: "AED", RUB: "₽" };
  const FX_CACHE_KEY = "hbot_fx_rates_v3";
  const FX_CACHE_TTL = 6 * 60 * 60 * 1000;
  let currentCurrency = "EUR";
  let exchangeRates = { EUR: 1, USD: 1.09, GBP: 0.85, AED: 4.0, RUB: 98 };

  function loadCachedRates() {
    try {
      const raw = localStorage.getItem(FX_CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.rates || Date.now() - data.ts > FX_CACHE_TTL) return null;
      return data.rates;
    } catch (e) {
      return null;
    }
  }

  function saveCachedRates(rates) {
    try {
      localStorage.setItem(FX_CACHE_KEY, JSON.stringify({ ts: Date.now(), rates: rates }));
    } catch (e) {}
  }

  function fetchExchangeRates(onDone) {
    const cached = loadCachedRates();
    if (cached) {
      exchangeRates = Object.assign({}, exchangeRates, cached);
      if (onDone) onDone();
      return;
    }
    fetch("https://open.er-api.com/v6/latest/EUR")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.result === "success" && data.rates) {
          const picked = {
            EUR: 1,
            USD: data.rates.USD || exchangeRates.USD,
            GBP: data.rates.GBP || exchangeRates.GBP,
            AED: data.rates.AED || exchangeRates.AED,
            RUB: data.rates.RUB || exchangeRates.RUB
          };
          exchangeRates = Object.assign({}, exchangeRates, picked);
          saveCachedRates(picked);
        }
      })
      .catch(() => { /* keep fallback rates */ })
      .finally(() => { if (onDone) onDone(); });
  }

  function formatPrice(eurAmount) {
    const rate = exchangeRates[currentCurrency] || 1;
    const converted = Math.round(eurAmount * rate);
    const grouped = converted.toLocaleString("en-US");
    const symbol = CURRENCY_SYMBOLS[currentCurrency];
    return currentCurrency === "AED" ? symbol + " " + grouped : symbol + grouped;
  }

  function getByPath(obj, path) {
    return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
  }

  function detectLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const browser = (navigator.language || "tr").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : "tr";
  }

  /* ---------------- Static text i18n ---------------- */
  function applyStaticLang(lang, dict) {
    document.documentElement.lang = lang;
    document.documentElement.dir = dict.dir || "ltr";

    const page = document.body.getAttribute("data-page") || "home";
    const metaEntry = dict.meta && dict.meta[pageMetaKey(page)];
    if (metaEntry) {
      document.title = metaEntry.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", metaEntry.desc);
    }

    document.querySelectorAll("[data-i18n]").forEach((elm) => {
      const key = elm.getAttribute("data-i18n");
      const value = getByPath(dict, key);
      if (value !== undefined) {
        if (elm.hasAttribute("data-i18n-html")) {
          elm.innerHTML = String(value).replace(/\n/g, "<br>");
        } else {
          elm.textContent = value;
        }
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((elm) => {
      const key = elm.getAttribute("data-i18n-placeholder");
      const value = getByPath(dict, key);
      if (value !== undefined) elm.setAttribute("placeholder", value);
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
  }

  function pageMetaKey(page) {
    const map = {
      home: "home", technology: "technology", "models-overview": "models",
      "model-solo-lounge": "soloLounge", "model-solo": "solo", "model-duo": "duo", "model-quad": "quad", "model-quad-cube": "quadCube", "model-nexus": "nexus",
      "hbot-info": "hbotInfo", blog: "blog", configurator: "configurator", contact: "contact"
    };
    return map[page] || "home";
  }

  /* ---------------- Shared: models nav dropdown ---------------- */
  function renderModelsMenus(dict) {
    const menu = dict.common.models_menu;
    document.querySelectorAll("[data-models-menu]").forEach((container) => {
      const isNavPanel = container.classList.contains("nav-dropdown-panel");
      container.innerHTML = MODEL_ORDER.map((key) => {
        const label = menu[MODEL_KEY_MAP[key]];
        const media = isNavPanel
          ? `<img class="nav-model-thumb" src="assets/img/models/${MODEL_CARD_IMG[key] || "real/apex-lounge-real"}.webp" alt="" loading="lazy">`
          : `<span class="dropdown-link-icon">${ICONS[MODEL_ICON[key]]}</span>`;
        return `<a href="${MODEL_PAGES[key]}" class="dropdown-link" data-model-key="${key}">
          ${media}
          <span>${label}</span>
        </a>`;
      }).join("");
    });
  }

  /* ---------------- Page renderers ---------------- */
  function renderStats(dict) {
    const c = document.getElementById("stats-grid");
    if (!c || !dict.home) return;
    c.innerHTML = dict.home.stats.map((s) => `<div class="hero-stat"><strong>${s.value}</strong><span>${s.label}</span></div>`).join("");
  }

  function renderModelsGrid(dict, containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const short = dict.modelShort;
    c.innerHTML = MODEL_ORDER.map((key) => {
      const mKey = MODEL_KEY_MAP[key];
      const s = short[mKey];
      return `
        <article class="sector-card">
          <img class="sector-card-img" src="assets/img/models/${MODEL_CARD_IMG[key] || "real/apex-lounge-real"}.webp" alt="${s.title}" loading="lazy">
          <h3>${s.title}</h3>
          <span class="sector-tagline">${s.tagline}</span>
          <p>${s.desc}</p>
          <a href="${MODEL_PAGES[key]}" class="sector-link">
            <span>${dict.common.learn_more}</span>
            ${ICONS.arrow}
          </a>
        </article>
      `;
    }).join("");
  }

  function renderWhyGrid(dict) {
    const c = document.getElementById("why-grid");
    if (!c || !dict.home) return;
    const iconKeys = ["connect", "ai", "sync", "guard"];
    c.innerHTML = dict.home.why.items.map((item, i) => `
      <div class="value-card">
        <div class="value-icon">${ICONS[iconKeys[i % iconKeys.length]]}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `).join("");
  }

  function renderCelebsGrid(dict) {
    const c = document.getElementById("celebs-grid");
    if (!c || !dict.home || !dict.home.celebs) return;
    c.innerHTML = dict.home.celebs.items.map((item) => `
      <article class="sector-card">
        <h3>${item.name}</h3>
        <span class="sector-tagline">${item.role}</span>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  function renderPillars(dict) {
    const c = document.getElementById("pillars-list");
    if (!c || !dict.technology) return;
    const order = ["connect", "os", "ai", "sync", "guard"];
    c.innerHTML = order.map((key) => {
      const p = dict.technology.pillars[key];
      return `
        <div class="pillar-block">
          <div>
            <div class="pillar-icon-lg">${ICONS[PILLAR_ICON[key]]}</div>
            <h3>${p.title}</h3>
            <div class="pillar-subtitle">${p.subtitle}</div>
            <p class="pillar-desc">${p.desc}</p>
          </div>
          <div class="pillar-features">
            ${p.features.map((f) => `<div class="pillar-feature"><span class="check-icon">${ICONS.check}</span><span>${f}</span></div>`).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  function renderExtraBadges(dict) {
    const c = document.getElementById("extra-badges");
    if (!c || !dict.technology) return;
    const extra = dict.technology.extra;
    c.innerHTML = ["silent", "care"].map((key) => `
      <div class="extra-badge">
        <div class="extra-badge-icon">${ICONS[key]}</div>
        <div><h4>${extra[key].title}</h4><p>${extra[key].desc}</p></div>
      </div>
    `).join("");
  }

  function renderComparisonTable(dict) {
    const c = document.getElementById("compare-table-body");
    const head = document.getElementById("compare-table-head");
    if (!c || !dict.technology) return;
    const cmp = dict.technology.comparison;
    if (head) {
      head.innerHTML = `<tr><th>${cmp.col_feature}</th><th>${cmp.col_competitor}</th><th>${cmp.col_apex}</th></tr>`;
    }
    c.innerHTML = cmp.rows.map((row) => `
      <tr>
        <td>${row.feature}</td>
        <td><span class="compare-cell-no">${row.competitor}</span></td>
        <td><span class="compare-cell-yes">${row.apex}</span></td>
      </tr>
    `).join("");
  }

  function renderRoadmap(dict) {
    const c = document.getElementById("roadmap-grid");
    if (!c || !dict.technology || !dict.technology.roadmap) return;
    const roadmap = dict.technology.roadmap;
    c.innerHTML = roadmap.items.map((item) => `
      <div class="roadmap-card">
        <span class="roadmap-badge">${roadmap.badge}</span>
        <div class="roadmap-icon">${ICONS[item.icon] || ""}</div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `).join("");
  }

  function renderModelCompareTable(dict) {
    const c = document.getElementById("model-compare-grid");
    if (!c || !dict.modelsOverview || !dict.modelsOverview.compareTable) return;
    const t = dict.modelsOverview.compareTable;

    c.innerHTML = MODEL_ORDER.map((key) => {
      const m = dict.configurator.models.find((mm) => mm.id === key);
      const parts = (m ? m.tagline : "").split(" · ");
      const capacity = parts[0] || "";
      const position = parts[1] || "";
      const priceLabel = key === "nexus" ? formatPrice(MODEL_PRICING[key].base) + "+" : formatPrice(MODEL_PRICING[key].base);
      return `
        <div class="compare-card">
          <div class="compare-card-icon">${ICONS[MODEL_ICON[key]]}</div>
          <h3>${m ? m.name : ""}</h3>
          <div class="compare-row"><span>${t.col_capacity}</span><strong>${capacity}</strong></div>
          <div class="compare-row"><span>${t.col_position}</span><strong>${position}</strong></div>
          <div class="compare-row"><span>${t.col_pressure}</span><strong>${PRESSURE_RANGE[key]}</strong></div>
          <div class="compare-row"><span>${t.col_noise}</span><strong>&lt;55 dB</strong></div>
          <div class="compare-row compare-row-price"><span>${t.col_price}</span><strong>${priceLabel}</strong></div>
          <a href="konfigurator.html?model=${key}" class="btn btn-primary btn-block">${t.action_label}</a>
        </div>
      `;
    }).join("");
  }

  function renderIncludedGrid(dict) {
    const c = document.getElementById("included-grid");
    if (!c || !dict.includedItems) return;
    c.innerHTML = dict.includedItems.map((item) => `
      <div class="included-card">
        <div class="value-icon">${ICONS[PILLAR_ICON[item.icon]]}</div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `).join("");
  }

  function renderSpecs(dict, modelKey) {
    const c = document.getElementById("spec-list");
    const ns = dict["model" + capitalize(modelKey)];
    if (!c || !ns) return;
    c.innerHTML = ns.specs.map((s) => `<div class="spec-row"><span class="spec-label">${s.label}</span><span class="spec-value">${s.value}</span></div>`).join("");
  }

  function capitalize(s) { return s.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(""); }

  function renderModelCrosslinks(dict, currentKey) {
    const c = document.getElementById("model-crosslinks");
    if (!c) return;
    const short = dict.modelShort;
    const others = MODEL_ORDER.filter((k) => k !== currentKey);
    c.innerHTML = others.map((key) => `
      <a href="${MODEL_PAGES[key]}" class="crosslink-card">
        <span class="crosslink-icon">${ICONS[MODEL_ICON[key]]}</span>
        <span>${short[MODEL_KEY_MAP[key]].title}</span>
        ${ICONS.arrow}
      </a>
    `).join("");
  }

  function renderIndicationsGrid(dict, containerId, limit) {
    const c = document.getElementById(containerId);
    if (!c || !dict.hbotInfo) return;
    let items = dict.hbotInfo.indications.items;
    if (limit) items = items.slice(0, limit);
    c.innerHTML = items.map((item) => `
      <div class="indication-card">
        <div class="indication-icon">${ICONS[item.icon]}</div>
        <span>${item.label}</span>
      </div>
    `).join("");
  }

  function renderBlogPosts(dict) {
    const c = document.getElementById("blog-post-list");
    if (!c || !dict.blog) return;
    c.innerHTML = dict.blog.posts.map((post) => {
      const words = (post.paragraphs || []).join(" ").split(/\s+/).filter(Boolean).length;
      const mins = Math.max(1, Math.ceil(words / 200));
      const readtime = dict.blog.min_read ? `<span class="blog-post-readtime">~${mins} ${dict.blog.min_read}</span>` : "";
      return `
      <article class="blog-post-card">
        <div class="blog-post-icon">${ICONS[post.icon] || ""}</div>
        <div class="blog-post-body">
          <div class="blog-post-meta">
            <span class="blog-post-tag">${post.tag}</span>
            <span class="blog-post-date">${post.date}</span>
            ${readtime}
          </div>
          <h2>${post.title}</h2>
          ${post.paragraphs.map((p) => `<p>${p}</p>`).join("")}
          <div class="blog-post-source">
            <span>${dict.blog.source_label}</span>
            <a href="${post.source_url}" target="_blank" rel="noopener noreferrer">${post.source_name}</a>
          </div>
        </div>
      </article>
    `;
    }).join("");
  }

  function renderFaq(dict) {
    const c = document.getElementById("faq-list");
    if (!c || !dict.contact || !dict.contact.faq) return;
    c.innerHTML = dict.contact.faq.items.map((item, i) => `
      <div class="faq-item">
        <button type="button" class="faq-question" data-faq-index="${i}">
          <span>${item.q}</span>
          ${ICONS.chevronDown}
        </button>
        <div class="faq-answer"><p>${item.a}</p></div>
      </div>
    `).join("");

    c.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        item.classList.toggle("is-open");
      });
    });
  }

  function renderStylesTeaser(dict) {
    const c = document.getElementById("styles-grid");
    if (!c || !dict.home.styles_teaser) return;
    c.innerHTML = dict.home.styles_teaser.items.map((item) => `
      <a href="konfigurator.html" class="style-banner style-banner--${item.icon}">
        ${item.badge ? `<span class="style-banner-badge">${item.badge}</span>` : ""}
        <div class="style-banner-icon">${ICONS[item.icon]}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </a>
    `).join("");
  }

  /* ---------------- Configurator ---------------- */
  const REF_CODES = ["HBOT-REF-2026", "APEX-REF-2026", "ALMITA-2026"];
  const REF_DISCOUNT_PCT = 5;
  const CRM_ENDPOINT = "https://crmalmita.com/api/leads"; // public lead API yoksa sessiz fallback
  const configState = { model: "solo-lounge", tierIndex: 0, addons: new Set(), nexusSeats: NEXUS_BASE_SEATS, color: "pearl-white", chamberStyle: "solid", interiorColor: "cream", seatColor: "konyak", seatTouched: false, stageView: "exterior", spinIdx: 0, discountPct: 0, refCode: "" };

  /* Showcase stage: model -> görsel, renk -> görsel dosya soneki (filter yok) */
  /* v4: Tüm temsili/sentetik render'lar kaldırıldı.
     Dış görünüm = gerçek fotoğraf (REAL_STAGE) veya gerçek referanslı üretilmiş 360° spin seti (SPIN_MODELS).
     Renk seçimi görseli DEĞİŞTİRMEZ — sahte renklendirme yok; renk adı özet panelinde gösterilir. */
  const REAL_STAGE = {
    "solo-lounge": "real/apex-lounge-real",
    solo: "real/apex-lounge-real",       // Solo'nun kendi fotoğrafı yok — aile görseli (Lounge)
    duo: "real/apex-duo-real",
    quad: "real/apex-quad-cube-2",       // Quad'in kendi fotoğrafı yok — aile görseli (Quad-Cube yan açı)
    "quad-cube": "real/apex-quad-cube",
    nexus: "real/apex-nexus"
  };
  /* İç mekân: modelin kendi gerçek iç fotoğrafı; olmayan modeller aile iç mekânına düşer
     (solo/duo -> Lounge iç, quad -> Quad-Cube iç). */
  const REAL_INTERIOR = {
    "solo-lounge": "real/apex-lounge-ic",
    solo: "real/apex-lounge-ic",
    duo: "real/apex-lounge-ic",
    quad: "real/apex-quad-cube-ic",
    "quad-cube": "real/apex-quad-cube-ic",
    nexus: "real/apex-nexus-ic"
  };
  /* 360° spin: seti TAMAMLANMIŞ modeller (yarım sette spin AKTİF EDİLMEZ — galeri görünümü kalır).
     Frame adı: spin/<model>/frame-00.webp .. frame-23.webp (24 kare, 15° adım). */
  const SPIN_FRAME_COUNT = 24;
  const SPIN_MODELS = { "quad-cube": true, nexus: true };
  let spinDragging = false;
  function spinNormIdx(idx) {
    return ((idx % SPIN_FRAME_COUNT) + SPIN_FRAME_COUNT) % SPIN_FRAME_COUNT;
  }
  function spinFrameKey(idx) {
    return `spin/${configState.model}/frame-${String(spinNormIdx(idx)).padStart(2, "0")}`;
  }
  function spinAvailableFor() {
    return !!SPIN_MODELS[configState.model];
  }
  let stageActiveImg = "a";

  function currentStageTarget() {
    if (configState.stageView === "interior") {
      const realIc = REAL_INTERIOR[configState.model];
      if (realIc) return { key: realIc, filter: "none", interior: true, photo: true };
    }
    if (spinAvailableFor()) {
      return { key: spinFrameKey(configState.spinIdx), filter: "none", interior: false, photo: true };
    }
    const realExt = REAL_STAGE[configState.model];
    if (realExt) return { key: realExt, filter: "none", interior: false, photo: true };
    /* Hiç görseli olmayan model kalmamalı — güvenlik ağı: Lounge gerçek fotoğrafı */
    return { key: "real/apex-lounge-real", filter: "none", interior: false, photo: true };
  }

  function updateConfigStage(dict) {
    const stage = document.getElementById("config-stage");
    if (!stage) return;
    const imgA = document.getElementById("stage-img-a");
    const imgB = document.getElementById("stage-img-b");
    if (!imgA || !imgB) return;

    const target = currentStageTarget();
    const src = `assets/img/models/${target.key}.webp`;

    const active = stageActiveImg === "a" ? imgA : imgB;
    const passive = stageActiveImg === "a" ? imgB : imgA;

    const applyMode = (img) => {
      img.classList.toggle("stage-img--interior", target.interior);
      img.classList.toggle("stage-img--photo", !!target.photo);
    };

    if (!active.src.endsWith(`${target.key}.webp`)) {
      // Görsel değişti: pasif karta yenisini yükle, cross-fade
      passive.src = src;
      passive.style.filter = target.filter;
      applyMode(passive);
      passive.classList.add("is-active");
      active.classList.remove("is-active");
      stageActiveImg = stageActiveImg === "a" ? "b" : "a";
    } else {
      active.style.filter = target.filter;
      applyMode(active);
    }

    const nameEl = document.getElementById("stage-model-name");
    if (nameEl && dict && dict.configurator) {
      const modelInfo = dict.configurator.models.find((m) => m.id === configState.model);
      const base = modelInfo ? modelInfo.name : "";
      const viewLabel = configState.stageView === "interior" && dict.configurator.stage ? ` · ${dict.configurator.stage.view_interior}` : "";
      nameEl.textContent = base + viewLabel;
    }

    // Görünüm toggle butonlarının durumu
    document.querySelectorAll(".stage-view-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-view") === configState.stageView);
    });

    // 360° rozeti + imleç: sadece dış görünümde ve spin seti olan modelde
    const canSpin = spinAvailableFor() && configState.stageView === "exterior";
    stage.classList.toggle("spinnable", canSpin);
    const hint = document.getElementById("stage-spin-hint");
    if (hint) hint.hidden = !canSpin;

    // Renk tint katmanı: maskeli bölgeye uygulanır — sahne/arka plan asla renklenmez.
    // Dış görünümde dış renk + dış maske, iç görünümde iç renk + döşeme maskesi.
    const tintEl = document.getElementById("stage-tint");
    if (tintEl && dict && dict.configurator) {
      const maskKey = target.key.indexOf("spin/") === 0 ? `spin:${configState.model}` : target.key;
      const maskPath = STAGE_TINT_MASKS[maskKey];
      const clipDef = STAGE_TINT_CLIP[maskKey];
      const isInt = !!target.interior;
      tintEl.classList.toggle("stage-tint--interior", isInt);
      const maskUrl = maskPath ? `url("assets/img/models/${maskPath}.png?v=11")` : "none";
      tintEl.style.webkitMaskImage = maskUrl;
      tintEl.style.maskImage = maskUrl;
      // clip-path fallback: maske desteklenmese de tint bölge dışına taşmaz
      tintEl.style.clipPath = clipDef ? tiltClipPoly(clipDef.poly, clipDef.a, clipDef.fit) : "none";

      const list = isInt ? (dict.configurator.interior_colors || []) : (dict.configurator.colors || []);
      const selId = isInt ? configState.interiorColor : configState.color;
      const strength = isInt ? (INT_TINT_STRENGTH[selId] || 0) : (EXT_TINT_STRENGTH[selId] || 0);
      const colInfo = list.find((col) => col.id === selId);
      tintEl.style.backgroundColor = colInfo ? colInfo.hex : "transparent";
      tintEl.style.opacity = String((maskPath || clipDef) && colInfo ? strength : 0);
    }

    // Koltuk tint katmanı: sadece iç görünümde + kullanıcı koltuk rengini değiştirdiyse
    const seatTintEl = document.getElementById("stage-seat-tint");
    if (seatTintEl && dict && dict.configurator) {
      const seatMask = target.interior ? STAGE_SEAT_MASKS[target.key] : null;
      const seatClip = target.interior ? STAGE_SEAT_CLIP[target.key] : null;
      const seatInfo = (dict.configurator.seat_colors || []).find((col) => col.id === configState.seatColor);
      const seatStrength = SEAT_TINT_STRENGTH[configState.seatColor] || 0;
      const applySeat = !!(target.interior && (seatMask || seatClip) && seatInfo && configState.seatTouched);
      const seatMaskUrl = seatMask ? `url("assets/img/models/${seatMask}.png?v=11")` : "none";
      seatTintEl.classList.toggle("stage-tint--interior", !!target.interior);
      seatTintEl.style.webkitMaskImage = seatMaskUrl;
      seatTintEl.style.maskImage = seatMaskUrl;
      seatTintEl.style.clipPath = seatClip ? tiltClipPoly(seatClip.poly, seatClip.a, seatClip.fit) : "none";
      seatTintEl.style.backgroundColor = seatInfo ? seatInfo.hex : "transparent";
      seatTintEl.style.opacity = String(applySeat ? seatStrength : 0);
    }
  }

  function initStageViewToggle() {
    document.querySelectorAll(".stage-view-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        if (view === configState.stageView) return;
        configState.stageView = view;
        updateConfigStage(TRANSLATIONS[currentLang]);
      });
    });
  }

  function pulseStage() {
    const stage = document.getElementById("config-stage");
    if (!stage) return;
    stage.classList.remove("stage-pulse");
    void stage.offsetWidth; // animasyonu yeniden tetikle
    stage.classList.add("stage-pulse");
  }

  /* ---------------- 360° sürükle-döndür ---------------- */
  let spinPreloadedFor = "";
  function preloadSpinSet() {
    if (!spinAvailableFor()) return;
    const tag = configState.model;
    if (spinPreloadedFor === tag) return;
    spinPreloadedFor = tag;
    /* frame-00 zaten yüklü — kalan 23 kareyi sırayla önden yükle */
    for (let i = 1; i < SPIN_FRAME_COUNT; i++) {
      setTimeout(() => { const im = new Image(); im.src = `assets/img/models/spin/${tag}/frame-${String(i).padStart(2, "0")}.webp`; }, 140 * i);
    }
  }

  function initSpin() {
    const stage = document.getElementById("config-stage");
    if (!stage) return;
    let acc = 0, lastX = 0, lastT = 0, vel = 0, momentumId = null;

    const setFrame = (idx) => {
      configState.spinIdx = spinNormIdx(idx);
      const active = document.querySelector("#config-stage .stage-img.is-active");
      if (!active) return;
      const key = spinFrameKey(configState.spinIdx);
      if (!active.src.endsWith(`${key}.webp`)) active.src = `assets/img/models/${key}.webp`;
      active.classList.add("stage-img--photo");
      active.classList.remove("stage-img--interior");
    };
    const stepBy = (px) => {
      acc += px;
      const PX_PER_FRAME = 100;
      while (Math.abs(acc) >= PX_PER_FRAME) {
        setFrame(configState.spinIdx + (acc > 0 ? 1 : -1));
        acc += acc > 0 ? -PX_PER_FRAME : PX_PER_FRAME;
      }
    };

    stage.addEventListener("pointerdown", (e) => {
      if (!spinAvailableFor() || configState.stageView !== "exterior") return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest(".stage-view-toggle")) return;
      e.preventDefault(); // img üzerinde native drag-and-drop'u engelle (pointercancel'a yol açar)
      spinDragging = true;
      acc = 0; vel = 0; lastX = e.clientX; lastT = performance.now();
      if (momentumId) { cancelAnimationFrame(momentumId); momentumId = null; }
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
      stage.classList.add("is-spinning");
    });
    stage.addEventListener("pointermove", (e) => {
      if (!spinDragging) return;
      const dx = e.clientX - lastX;
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      vel = 0.7 * vel + 0.3 * (dx / dt); // px/ms
      lastX = e.clientX; lastT = now;
      stepBy(dx);
    });
    const end = () => {
      if (!spinDragging) return;
      spinDragging = false;
      stage.classList.remove("is-spinning");
      // hafif momentum: bırakış hızıyla birkaç frame daha
      let v = vel * 14; // px/frame-tick ölçeği
      if (Math.abs(v) < 6) return;
      const tick = () => {
        v *= 0.9;
        if (Math.abs(v) < 6) { momentumId = null; return; }
        stepBy(v);
        momentumId = requestAnimationFrame(tick);
      };
      momentumId = requestAnimationFrame(tick);
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
  }


  function initConfigStageTilt() {
    const stage = document.getElementById("config-stage");
    const tilt = document.getElementById("stage-tilt");
    if (!stage || !tilt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX = 8;
    let targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;

    const animate = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      tilt.style.transform = `rotateX(${curY.toFixed(2)}deg) rotateY(${curX.toFixed(2)}deg)`;
      if (Math.abs(targetX - curX) > 0.01 || Math.abs(targetY - curY) > 0.01) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };
    const kick = () => { if (rafId === null) rafId = requestAnimationFrame(animate); };

    stage.addEventListener("mousemove", (e) => {
      if (spinDragging) return; // sürükle-döndür aktifken tilt pasif
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetX = px * MAX * 2;
      targetY = -py * MAX * 2;
      kick();
    });
    stage.addEventListener("mouseleave", () => { targetX = 0; targetY = 0; kick(); });

    let lastTouch = null;
    stage.addEventListener("touchmove", (e) => {
      if (spinDragging) return; // sürükle-döndür aktifken tilt pasif
      const t = e.touches[0];
      if (!t) return;
      if (lastTouch) {
        targetX = Math.max(-MAX, Math.min(MAX, targetX + (t.clientX - lastTouch.x) * 0.15));
        targetY = Math.max(-MAX, Math.min(MAX, targetY - (t.clientY - lastTouch.y) * 0.15));
        kick();
      }
      lastTouch = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    stage.addEventListener("touchend", () => { lastTouch = null; targetX = 0; targetY = 0; kick(); });
  }


  function renderConfigStyles(dict) {
    const c = document.getElementById("config-style-grid");
    if (!c || !dict.configurator.styles) return;
    c.innerHTML = dict.configurator.styles.map((st) => {
      const selected = configState.chamberStyle === st.id ? " is-selected" : "";
      const featured = st.id === "premium" ? " is-featured" : "";
      const price = STYLE_PRICING[st.id] || 0;
      const priceLabel = price === 0 ? dict.common.included_badge : "+" + formatPrice(price);
      const badge = st.badge ? `<span class="style-card-badge">${st.badge}</span>` : "";
      return `
        <button type="button" class="config-style-card${selected}${featured}" data-style-id="${st.id}">
          <span class="config-check">${ICONS.check}</span>
          ${badge}
          <div class="style-card-icon">${ICONS[st.icon] || ""}</div>
          <h4>${st.name}</h4>
          <p>${st.desc}</p>
          <div class="style-card-price">${priceLabel}</div>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-style-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        configState.chamberStyle = btn.getAttribute("data-style-id");
        const dict = TRANSLATIONS[currentLang];
        renderConfigStyles(dict);
        renderConfigSummary(dict);
      });
    });
  }

  function renderConfigColors(dict) {
    const c = document.getElementById("config-color-grid");
    if (!c || !dict.configurator.colors) return;
    c.innerHTML = dict.configurator.colors.map((col) => {
      const selected = configState.color === col.id ? " is-selected" : "";
      return `
        <button type="button" class="config-color-swatch${selected}" data-color-id="${col.id}" title="${col.name}">
          <span class="swatch-dot" style="background:${col.hex}"></span>
          <span class="swatch-name">${col.name}</span>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        configState.color = btn.getAttribute("data-color-id");
        const dict = TRANSLATIONS[currentLang];
        renderConfigColors(dict);
        renderConfigSummary(dict);
      });
    });
  }

  function renderConfigInteriorColors(dict) {
    const c = document.getElementById("config-interior-color-grid");
    if (!c || !dict.configurator.interior_colors) return;
    c.innerHTML = dict.configurator.interior_colors.map((col) => {
      const selected = configState.interiorColor === col.id ? " is-selected" : "";
      return `
        <button type="button" class="config-color-swatch${selected}" data-interior-id="${col.id}" title="${col.name}">
          <span class="swatch-dot" style="background:${col.hex}"></span>
          <span class="swatch-name">${col.name}</span>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        configState.interiorColor = btn.getAttribute("data-interior-id");
        const dict = TRANSLATIONS[currentLang];
        renderConfigInteriorColors(dict);
        renderConfigSummary(dict);
      });
    });
  }

  /* Renk tint güçleri: blend-mode "color" — cihaz gövdesinin rengi değişir, parlaklık/doku korunur.
     pearl-white/cream = nötr (tint yok). */
  const EXT_TINT_STRENGTH = { "pearl-white": 0, sampanya: 0.4, bronz: 0.45, grafit: 0.5, antrasit: 0.5, "mat-siyah": 0.55, "gece-laciverti": 0.55, bordo: 0.55, zumrut: 0.55 };
  const INT_TINT_STRENGTH = { cream: 0, "kum-beji": 0.35, konyak: 0.45, anthracite: 0.5, burgundy: 0.55, navy: 0.55 };
  /* Koltuk tint'i: sadece kullanıcı koltuk rengini bilinçli değiştirdiyse uygulanır (fotoğraf sadeliği korunur) */
  const SEAT_TINT_STRENGTH = { konyak: 0.55, siyah: 0.65, lacivert: 0.6, krem: 0.45, bordo: 0.65, gri: 0.5 };

  /* v7: tint bölge maskeleri — sahne/arka plan asla renklenmez; sadece maskeli kabin/döşeme/koltuk alanı */
  const STAGE_TINT_MASKS = {
    "real/apex-lounge-real": "masks/ext-lounge",
    "real/apex-duo-real": "masks/ext-duo",
    "real/apex-quad-cube": "masks/ext-quadcube",
    "real/apex-quad-cube-2": "masks/ext-quadcube2",
    "real/apex-nexus": "masks/ext-nexus",
    "spin:quad-cube": "masks/spin-quadcube",
    "spin:nexus": "masks/spin-nexus",
    "real/apex-lounge-ic": "masks/int-lounge",
    "real/apex-quad-cube-ic": "masks/int-quadcube",
    "real/apex-nexus-ic": "masks/int-nexus"
  };
  const STAGE_SEAT_MASKS = {
    "real/apex-lounge-ic": "masks/seat-lounge",
    "real/apex-quad-cube-ic": "masks/seat-quadcube",
    "real/apex-nexus-ic": "masks/seat-nexus"
  };

  /* v7: clip-path fallback — maske hiç çalışmasa bile tint kabin/bölge dışına taşmaz.
     clip-path tüm modern tarayıcılarda (Safari dahil) prefixsiz çalışır.
     Poligonlar GÖRSEL uzayında tanımlı; tilt kutusu uzayına çevrilir. */
  const TILT_ASPECT = (4 * 0.88) / (3.4 * 0.76); // .config-stage 4/3.4 + .stage-tilt inset 8%/6%/16%
  function tiltClipPoly(poly, imgAspect, fit) {
    const T = TILT_ASPECT, A = imgAspect;
    let tf;
    if (fit === "cover") {
      if (A >= T) { const c = (1 - T / A) / 2; tf = (x, y) => [(x - c) * (A / T), y]; }
      else { const c = (1 - A / T) / 2; tf = (x, y) => [x, (y - c) * (T / A)]; }
    } else { // contain
      if (A >= T) { const o = (1 - T / A) / 2; tf = (x, y) => [x, o + y * (T / A)]; }
      else { const o = (1 - A / T) / 2; tf = (x, y) => [o + x * (A / T), y]; }
    }
    return "polygon(" + poly.map((pt) => {
      const r = tf(pt[0], pt[1]);
      return `${(r[0] * 100).toFixed(1)}% ${(r[1] * 100).toFixed(1)}%`;
    }).join(", ") + ")";
  }
  const STAGE_TINT_CLIP = {
    "real/apex-lounge-real": { a: 1600 / 1199, fit: "contain", poly: [[0.08,0.32],[0.22,0.22],[0.52,0.24],[0.78,0.26],[0.92,0.32],[0.96,0.48],[0.93,0.70],[0.82,0.80],[0.50,0.88],[0.22,0.88],[0.09,0.76],[0.05,0.52]] },
    "real/apex-duo-real": { a: 1600 / 1067, fit: "contain", poly: [[0.835,0.50],[0.790,0.72],[0.6675,0.881],[0.50,0.94],[0.3325,0.881],[0.210,0.72],[0.165,0.50],[0.210,0.28],[0.3325,0.119],[0.50,0.06],[0.6675,0.119],[0.790,0.28]] },
    "real/apex-quad-cube": { a: 1600 / 1065, fit: "contain", poly: [[0.25,0.08],[0.75,0.08],[0.75,0.85],[0.25,0.85]] },
    "real/apex-quad-cube-2": { a: 1600 / 1065, fit: "contain", poly: [[0.19,0.12],[0.60,0.05],[0.84,0.12],[0.85,0.86],[0.72,0.92],[0.20,0.86]] },
    "real/apex-nexus": { a: 1600 / 1199, fit: "contain", poly: [[0.22,0.28],[0.72,0.24],[0.80,0.30],[0.81,0.78],[0.74,0.87],[0.28,0.86],[0.21,0.72],[0.20,0.45]] },
    "spin:quad-cube": { a: 1536 / 960, fit: "contain", poly: [[0.22,0.07],[0.78,0.07],[0.78,0.92],[0.22,0.92]] },
    "spin:nexus": { a: 1536 / 960, fit: "contain", poly: [[0.86,0.52],[0.8118,0.72],[0.68,0.8664],[0.50,0.92],[0.32,0.8664],[0.1882,0.72],[0.14,0.52],[0.1882,0.32],[0.32,0.1736],[0.50,0.12],[0.68,0.1736],[0.8118,0.32]] },
    "real/apex-lounge-ic": { a: 1600 / 1200, fit: "cover", poly: [[0,0.40],[1,0.40],[1,1],[0,1]] },
    "real/apex-quad-cube-ic": { a: 1600 / 1065, fit: "cover", poly: [[0,0],[1,0],[1,0.62],[0.75,0.62],[0.32,1],[0,1]] },
    "real/apex-nexus-ic": { a: 823 / 1135, fit: "cover", poly: [[0,0.08],[0.64,0.16],[0.64,1],[0,1]] }
  };
  const STAGE_SEAT_CLIP = {
    "real/apex-lounge-ic": { a: 1600 / 1200, fit: "cover", poly: [[0.15,0.54],[0.85,0.56],[1,1],[0,1]] },
    "real/apex-quad-cube-ic": { a: 1600 / 1065, fit: "cover", poly: [[0.28,0.45],[0.58,0.38],[0.85,0.40],[1,0.50],[1,1],[0.40,1]] },
    "real/apex-nexus-ic": { a: 823 / 1135, fit: "cover", poly: [[0,0.40],[0.64,0.42],[0.64,1],[0,1]] }
  };

  /* Kart görselleri: model -> gerçek fotoğraf (Solo/Quad kendi fotosu yok — aile görseli) */
  const MODEL_CARD_IMG = {
    "solo-lounge": "real/apex-lounge-real",
    solo: "real/apex-lounge-real",
    duo: "real/apex-duo-real",
    quad: "real/apex-quad-cube-2",
    "quad-cube": "real/apex-quad-cube",
    nexus: "real/apex-nexus"
  };

  /* Koltuk rengi: fiyatsız görsel tercih — sahneyi değiştirmez, özette adıyla listelenir */
  function renderConfigSeatColors(dict) {
    const c = document.getElementById("config-seat-color-grid");
    if (!c || !dict.configurator.seat_colors) return;
    c.innerHTML = dict.configurator.seat_colors.map((col) => {
      const selected = configState.seatColor === col.id ? " is-selected" : "";
      return `
        <button type="button" class="config-color-swatch${selected}" data-seat-id="${col.id}" title="${col.name}">
          <span class="swatch-dot" style="background:${col.hex}"></span>
          <span class="swatch-name">${col.name}</span>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        configState.seatColor = btn.getAttribute("data-seat-id");
        configState.seatTouched = true;
        // Koltuk rengi geri bildirimi iç sahnede görünsün — iç görünüme geç
        if (configState.stageView !== "interior") configState.stageView = "interior";
        const dict = TRANSLATIONS[currentLang];
        renderConfigSeatColors(dict);
        renderConfigSummary(dict);
      });
    });
  }

  function renderConfigModels(dict) {
    const c = document.getElementById("config-model-grid");
    if (!c) return;
    c.innerHTML = dict.configurator.models.map((m) => {
      const selected = configState.model === m.id ? " is-selected" : "";
      const priceLabel = m.id === "nexus" ? formatPrice(MODEL_PRICING[m.id].base) + "+" : formatPrice(MODEL_PRICING[m.id].base);
      return `
        <button type="button" class="config-model-card${selected}" data-model-id="${m.id}">
          <span class="config-check">${ICONS.check}</span>
          <img class="model-card-img" src="assets/img/models/${MODEL_CARD_IMG[m.id] || "real/apex-lounge-real"}.webp" alt="${m.name}" loading="lazy">
          <h4>${m.name}</h4>
          <div class="model-tagline">${m.tagline}</div>
          <div class="model-price">${priceLabel}</div>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-model-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        configState.model = btn.getAttribute("data-model-id");
        pressureAutoNote = false;
        ensureTierCompatible(true); // Nexus-only kademe seçiliyse 2.0 ATA'ya düş + bilgi notu
        configState.nexusSeats = NEXUS_BASE_SEATS;
        const dict = TRANSLATIONS[currentLang];
        renderConfigModels(dict);
        renderConfigPressure(dict);
        renderNexusSeatSection(dict);
        renderConfigSummary(dict);
      });
    });
  }

  function renderNexusSeatSection(dict) {
    const section = document.getElementById("nexus-seat-section");
    if (!section) return;
    const isNexus = configState.model === "nexus";
    section.hidden = !isNexus;
    if (!isNexus) return;

    const valueEl = document.getElementById("seat-count-value");
    if (valueEl) valueEl.textContent = configState.nexusSeats;

    const extra = configState.nexusSeats - NEXUS_BASE_SEATS;
    const note = document.getElementById("seat-price-note");
    if (note) {
      note.textContent = extra > 0
        ? "+" + formatPrice(extra * NEXUS_SEAT_PRICE) + " (" + extra + " × " + formatPrice(NEXUS_SEAT_PRICE) + ")"
        : dict.common.included_badge;
    }

    const decBtn = document.getElementById("seat-decrease");
    const incBtn = document.getElementById("seat-increase");
    if (decBtn) decBtn.disabled = configState.nexusSeats <= NEXUS_BASE_SEATS;
    if (incBtn) incBtn.disabled = configState.nexusSeats >= NEXUS_MAX_SEATS;
  }

  function initSeatStepper() {
    const decBtn = document.getElementById("seat-decrease");
    const incBtn = document.getElementById("seat-increase");
    if (!decBtn || !incBtn) return;
    decBtn.addEventListener("click", () => {
      if (configState.nexusSeats > NEXUS_BASE_SEATS) configState.nexusSeats--;
      const dict = TRANSLATIONS[currentLang];
      renderNexusSeatSection(dict);
      renderConfigSummary(dict);
    });
    incBtn.addEventListener("click", () => {
      if (configState.nexusSeats < NEXUS_MAX_SEATS) configState.nexusSeats++;
      const dict = TRANSLATIONS[currentLang];
      renderNexusSeatSection(dict);
      renderConfigSummary(dict);
    });
  }

  function initCurrencySwitch() {
    const el = document.getElementById("currency-switch");
    if (!el) return;
    el.innerHTML = CURRENCIES.map((c) => `<button type="button" data-currency="${c}" class="${c === currentCurrency ? "is-active" : ""}">${c}</button>`).join("");
    el.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCurrency = btn.getAttribute("data-currency");
        el.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
        const dict = TRANSLATIONS[currentLang];
        renderConfigModels(dict);
        renderConfigStyles(dict);
        renderConfigPressure(dict);
        renderNexusSeatSection(dict);
        renderConfigAddons(dict);
        renderConfigSummary(dict);
      });
    });
  }

  let pressureAutoNote = false;
  /* Basınç kademesi uyumluluğu:
     - Nexus dışı modelde nexusOnly kademe (3.0/6.0) seçiliyse -> 2.0 ATA'ya düş
     - Nexus'da normal kademe (1.5/2.0/2.5) seçiliyse -> 3.0 ATA'ya çek
     notify=true iken kullanıcıya bilgi notu gösterilir ("down" | "up"). */
  function ensureTierCompatible(notify) {
    const tiers = MODEL_PRICING[configState.model].tiers;
    const cur = tiers[configState.tierIndex];
    if (!cur) { configState.tierIndex = 0; return false; }
    const isNexus = configState.model === "nexus";
    if (!isNexus && cur.nexusOnly) {
      const idx20 = tiers.findIndex((t) => t.ata === "2.0 ATA");
      configState.tierIndex = idx20 >= 0 ? idx20 : 0;
      pressureAutoNote = notify ? "down" : false;
      return true;
    }
    if (isNexus && !cur.nexusOnly) {
      const idx30 = tiers.findIndex((t) => t.ata === "3.0 ATA");
      configState.tierIndex = idx30 >= 0 ? idx30 : 0;
      pressureAutoNote = notify ? "up" : false;
      return true;
    }
    return false;
  }

  function renderConfigPressure(dict) {
    const c = document.getElementById("config-pressure-grid");
    if (!c) return;
    const isNexus = configState.model === "nexus";
    const tiers = MODEL_PRICING[configState.model].tiers;
    /* Kartlar modele göre filtrelenir: Nexus -> sadece 3.0/6.0; diğerleri -> sadece 1.5/2.0/2.5 */
    const visible = tiers.map((t, i) => ({ t, i })).filter(({ t }) => (isNexus ? !!t.nexusOnly : !t.nexusOnly));
    c.innerHTML = visible.map(({ t, i }) => {
      const selected = configState.tierIndex === i ? " is-selected" : "";
      const priceLabel = t.price === 0 ? dict.common.included_badge : "+" + formatPrice(t.price);
      return `
        <button type="button" class="config-pressure-card${selected}" data-tier-index="${i}">
          <div class="pressure-value">${t.ata}</div>
          <div class="pressure-price">${priceLabel}</div>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-pressure-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        pressureAutoNote = false;
        configState.tierIndex = parseInt(btn.getAttribute("data-tier-index"), 10);
        const dict = TRANSLATIONS[currentLang];
        renderConfigPressure(dict);
        renderConfigSummary(dict);
      });
    });

    const note = document.getElementById("pressure-auto-note");
    if (note) {
      note.hidden = !pressureAutoNote;
      if (pressureAutoNote) {
        note.textContent = (pressureAutoNote === "up" ? dict.configurator.pressure_auto_note_up : dict.configurator.pressure_auto_note) || "";
      }
    }
  }

  function renderConfigAddons(dict) {
    const c = document.getElementById("config-addon-grid");
    if (!c) return;
    c.innerHTML = dict.configurator.addons.map((a) => {
      const selected = configState.addons.has(a.id) ? " is-selected" : "";
      return `
        <button type="button" class="config-addon-card${selected}" data-addon-id="${a.id}">
          <span class="config-check">${ICONS.check}</span>
          <h4>${a.name}</h4>
          <p>${a.desc}</p>
          <span class="addon-price">+${formatPrice(ADDON_PRICING[a.id])}</span>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-addon-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-addon-id");
        if (configState.addons.has(id)) configState.addons.delete(id);
        else configState.addons.add(id);
        // Masajlı koltuk seçilince iç görünüme otomatik geç + dikkat animasyonu
        if (id === "massage" && configState.addons.has("massage")) {
          configState.stageView = "interior";
          pulseStage();
        }
        const dict = TRANSLATIONS[currentLang];
        renderConfigAddons(dict);
        renderConfigSummary(dict);
      });
    });
  }

  function buildShareUrl() {
    const params = new URLSearchParams();
    params.set("model", configState.model);
    params.set("style", configState.chamberStyle);
    params.set("color", configState.color);
    params.set("interior", configState.interiorColor);
    params.set("seat", configState.seatColor);
    params.set("tier", String(configState.tierIndex));
    if (configState.model === "nexus") params.set("seats", String(configState.nexusSeats));
    if (configState.addons.size) params.set("addons", Array.from(configState.addons).join(","));
    if (configState.discountPct) params.set("discount", String(configState.discountPct));
    if (configState.refCode) params.set("ref", configState.refCode);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  function computeSubtotal() {
    const model = MODEL_PRICING[configState.model];
    let total = model.base + model.tiers[configState.tierIndex].price;
    if (configState.model === "nexus") {
      total += (configState.nexusSeats - NEXUS_BASE_SEATS) * NEXUS_SEAT_PRICE;
    }
    configState.addons.forEach((id) => (total += ADDON_PRICING[id] || 0));
    total += STYLE_PRICING[configState.chamberStyle] || 0;
    return total;
  }

  function computeDiscountAmount() {
    return Math.round(computeSubtotal() * (configState.discountPct || 0) / 100);
  }

  function computeTotal() {
    return computeSubtotal() - computeDiscountAmount();
  }

  function renderConfigSummary(dict) {
    const c = document.getElementById("config-summary");
    if (!c || !dict.configurator) return;
    const s = dict.configurator.summary;
    const modelInfo = dict.configurator.models.find((m) => m.id === configState.model);
    const tier = MODEL_PRICING[configState.model].tiers[configState.tierIndex];
    const addonNames = dict.configurator.addons.filter((a) => configState.addons.has(a.id));

    const addonsHtml = addonNames.length
      ? addonNames.map((a) => `<div>${a.name} <span style="opacity:.6">(+${formatPrice(ADDON_PRICING[a.id])})</span></div>`).join("")
      : s.none_selected;

    const seatsRow = configState.model === "nexus"
      ? `<div class="config-summary-row"><span class="label">${s.seats_label}</span><span class="value">${configState.nexusSeats}${configState.nexusSeats > NEXUS_BASE_SEATS ? " (+" + formatPrice((configState.nexusSeats - NEXUS_BASE_SEATS) * NEXUS_SEAT_PRICE) + ")" : ""}</span></div>`
      : "";
    const colorInfo = (dict.configurator.colors || []).find((col) => col.id === configState.color);
    const colorRow = colorInfo
      ? `<div class="config-summary-row"><span class="label">${s.color_label}</span><span class="value"><span class="summary-swatch" style="background:${colorInfo.hex}"></span>${colorInfo.name}</span></div>`
      : "";
    const interiorInfo = (dict.configurator.interior_colors || []).find((col) => col.id === configState.interiorColor);
    const interiorRow = interiorInfo
      ? `<div class="config-summary-row"><span class="label">${s.interior_color_label}</span><span class="value"><span class="summary-swatch" style="background:${interiorInfo.hex}"></span>${interiorInfo.name}</span></div>`
      : "";
    const seatColorInfo = (dict.configurator.seat_colors || []).find((col) => col.id === configState.seatColor);
    const seatColorRow = seatColorInfo && s.seat_color_label
      ? `<div class="config-summary-row"><span class="label">${s.seat_color_label}</span><span class="value"><span class="summary-swatch" style="background:${seatColorInfo.hex}"></span>${seatColorInfo.name}</span></div>`
      : "";
    const seatTypeRow = s.seat_type_label
      ? `<div class="config-summary-row"><span class="label">${s.seat_type_label}</span><span class="value">${configState.addons.has("massage") ? s.seat_massage : s.seat_standard}</span></div>`
      : "";
    const styleInfo = (dict.configurator.styles || []).find((st) => st.id === configState.chamberStyle);
    const stylePrice = STYLE_PRICING[configState.chamberStyle] || 0;
    const styleRow = styleInfo
      ? `<div class="config-summary-row"><span class="label">${s.style_label}</span><span class="value">${styleInfo.name}${stylePrice ? " (+" + formatPrice(stylePrice) + ")" : ""}</span></div>`
      : "";

    const discountAmount = computeDiscountAmount();
    const discountAmountRow = configState.discountPct > 0
      ? `<div class="config-summary-row"><span class="label">${s.discount_label} (%${configState.discountPct})</span><span class="value" style="color:var(--accent,#c9a45c)">−${formatPrice(discountAmount)}</span></div>`
      : "";
    const refBadgeRow = configState.refCode
      ? `<div class="config-ref-badge">✓ ${s.ref_badge}: <strong>${configState.refCode}</strong></div>`
      : "";
    const discountControlRow = `
      <div class="config-summary-row"><span class="label">${s.discount_label}</span><span class="value">
        <select id="config-discount-select" class="config-discount-select" aria-label="${s.discount_label}">
          ${[0, 5, 10, 15, 20].map((p) => `<option value="${p}"${configState.discountPct === p ? " selected" : ""}>%${p}</option>`).join("")}
        </select>
        <input type="number" id="config-discount-custom" class="config-discount-custom" min="0" max="50" step="1" value="${configState.discountPct}" aria-label="${s.discount_label} %" />
      </span></div>`;

    c.innerHTML = `
      <h3>${s.title}</h3>
      <div class="config-summary-row"><span class="label">${s.model_label}</span><span class="value">${modelInfo ? modelInfo.name : ""}</span></div>
      ${seatsRow}
      ${styleRow}
      ${colorRow}
      ${interiorRow}
      ${seatColorRow}
      ${seatTypeRow}
      <div class="config-summary-row"><span class="label">${s.pressure_label}</span><span class="value">${tier.ata}${tier.price ? " (+" + formatPrice(tier.price) + ")" : ""}</span></div>
      <div class="config-summary-row"><span class="label">${s.addons_label}</span><span class="value config-summary-addons-list">${addonsHtml}</span></div>
      ${discountControlRow}
      ${discountAmountRow}
      ${refBadgeRow}
      <div class="config-summary-total"><span class="label">${s.total_label}</span><span class="amount">${formatPrice(computeTotal())}</span></div>
      <p class="config-summary-disclaimer">${s.disclaimer}</p>
      <a href="#quote-form" class="btn btn-primary btn-block" id="config-cta">${s.cta}</a>
      <div class="config-summary-secondary-actions">
        <button type="button" class="btn btn-outline btn-block" id="config-print-btn">${s.print_button}</button>
        <button type="button" class="btn btn-outline btn-block" id="config-email-btn">${s.email_button}</button>
        <button type="button" class="btn btn-outline btn-block" id="config-share-btn">${s.share_button}</button>
        <button type="button" class="btn btn-outline btn-block" id="config-refer-btn">${s.refer_button}</button>
      </div>
    `;

    const discountSelect = document.getElementById("config-discount-select");
    if (discountSelect) {
      discountSelect.addEventListener("change", () => {
        configState.discountPct = parseInt(discountSelect.value, 10) || 0;
        renderConfigSummary(TRANSLATIONS[currentLang]);
      });
    }
    const discountCustom = document.getElementById("config-discount-custom");
    if (discountCustom) {
      discountCustom.addEventListener("change", () => {
        let v = parseInt(discountCustom.value, 10);
        if (isNaN(v) || v < 0) v = 0;
        if (v > 50) v = 50;
        configState.discountPct = v;
        renderConfigSummary(TRANSLATIONS[currentLang]);
      });
    }

    const cta = document.getElementById("config-cta");
    if (cta) {
      cta.addEventListener("click", () => {
        setTimeout(updateQuoteFormHiddenField, 50);
      });
    }

    const printBtn = document.getElementById("config-print-btn");
    if (printBtn) printBtn.addEventListener("click", () => openQuotePdf(TRANSLATIONS[currentLang]));

    const emailBtn = document.getElementById("config-email-btn");
    if (emailBtn) emailBtn.addEventListener("click", () => sendQuoteEmail(TRANSLATIONS[currentLang]));

    const shareBtn = document.getElementById("config-share-btn");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        const url = buildShareUrl();
        const done = () => {
          const original = shareBtn.textContent;
          shareBtn.textContent = s.share_copied;
          setTimeout(() => { shareBtn.textContent = original; }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done).catch(() => window.prompt("", url));
        } else {
          window.prompt("", url);
        }
      });
    }

    const referBtn = document.getElementById("config-refer-btn");
    if (referBtn) {
      referBtn.addEventListener("click", () => {
        const savedRef = configState.refCode;
        if (!savedRef) configState.refCode = REF_CODES[0];
        const url = buildShareUrl();
        configState.refCode = savedRef;
        const done = () => {
          const original = referBtn.textContent;
          referBtn.textContent = s.refer_copied;
          setTimeout(() => { referBtn.textContent = original; }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done).catch(() => window.prompt("", url));
        } else {
          window.prompt("", url);
        }
      });
    }

    updateQuoteFormHiddenField();
    updateConfigStage(dict);
    preloadSpinSet();
  }

  function updateQuoteFormHiddenField() {
    const field = document.getElementById("config-summary-text");
    if (!field) return;
    const dict = TRANSLATIONS[currentLang];
    const s = dict.configurator.summary;
    const modelInfo = dict.configurator.models.find((m) => m.id === configState.model);
    const tier = MODEL_PRICING[configState.model].tiers[configState.tierIndex];
    const addonNames = dict.configurator.addons.filter((a) => configState.addons.has(a.id)).map((a) => a.name).join(", ") || s.none_selected;
    const colorInfo = (dict.configurator.colors || []).find((col) => col.id === configState.color);
    const interiorInfo = (dict.configurator.interior_colors || []).find((col) => col.id === configState.interiorColor);
    const seatColorInfo = (dict.configurator.seat_colors || []).find((col) => col.id === configState.seatColor);
    const styleInfo = (dict.configurator.styles || []).find((st) => st.id === configState.chamberStyle);
    const lines = [`${s.model_label}: ${modelInfo ? modelInfo.name : ""}`];
    if (configState.model === "nexus") lines.push(`${s.seats_label}: ${configState.nexusSeats}`);
    if (styleInfo) lines.push(`${s.style_label}: ${styleInfo.name}`);
    if (colorInfo) lines.push(`${s.color_label}: ${colorInfo.name}`);
    if (interiorInfo) lines.push(`${s.interior_color_label}: ${interiorInfo.name}`);
    if (seatColorInfo && s.seat_color_label) lines.push(`${s.seat_color_label}: ${seatColorInfo.name}`);
    if (s.seat_type_label) lines.push(`${s.seat_type_label}: ${configState.addons.has("massage") ? s.seat_massage : s.seat_standard}`);
    lines.push(`${s.pressure_label}: ${tier.ata}`);
    lines.push(`${s.addons_label}: ${addonNames}`);
    if (configState.discountPct > 0) lines.push(`${s.discount_label}: %${configState.discountPct} (−${formatPrice(computeDiscountAmount())})`);
    if (configState.refCode) lines.push(`Ref: ${configState.refCode}`);
    lines.push(`${s.total_label}: ${formatPrice(computeTotal())} (${currentCurrency})`);
    field.value = lines.join("\n");
  }

  /* Teklif numarası: HBOT-YYYYMMDD-XXXX */
  function generateQuoteNo() {
    const d = new Date();
    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `HBOT-${ymd}-${rand}`;
  }

  /* Biçimlendirilmiş teklif penceresi → yazdır/PDF */
  function openQuotePdf(dict) {
    updateQuoteFormHiddenField();
    const s = dict.configurator.summary;
    const summaryText = (document.getElementById("config-summary-text") || {}).value || "";
    const quoteNo = generateQuoteNo();
    const dateStr = new Date().toLocaleDateString(dict === TRANSLATIONS.ar ? "ar" : dict === TRANSLATIONS.ru ? "ru-RU" : dict === TRANSLATIONS.en ? "en-GB" : "tr-TR", { year: "numeric", month: "long", day: "numeric" });
    const rows = summaryText.split("\n").filter(Boolean).map((line) => {
      const idx = line.indexOf(":");
      const label = idx >= 0 ? line.slice(0, idx) : line;
      const value = idx >= 0 ? line.slice(idx + 1).trim() : "";
      return `<tr><td style="padding:8px 12px;color:#666;border-bottom:1px solid #eee;">${label}</td><td style="padding:8px 12px;font-weight:600;text-align:right;border-bottom:1px solid #eee;">${value}</td></tr>`;
    }).join("");
    const win = window.open("", "_blank");
    if (!win) { window.print(); return; }
    win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${s.pdf_title} — ${quoteNo}</title></head>
<body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:40px;color:#1a1a1a;">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #c9a45c;padding-bottom:18px;margin-bottom:24px;">
    <div>
      <div style="font-size:22px;font-weight:800;letter-spacing:.02em;">HBOT CHAMBER TECH</div>
      <div style="color:#777;font-size:13px;margin-top:4px;">info@hbotchambertech.com · 0850 888 1679 · hbotchambertech.com</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:18px;font-weight:700;">${s.pdf_title}</div>
      <div style="color:#777;font-size:13px;margin-top:4px;">${s.pdf_quote_no}: <strong>${quoteNo}</strong><br>${s.pdf_date}: ${dateStr}</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
  <p style="color:#888;font-size:12px;margin-top:28px;line-height:1.6;">${s.disclaimer}</p>
  <script>window.onload = function(){ window.print(); };<\/script>
</body></html>`);
    win.document.close();
  }

  /* Teklifi e-posta taslağı olarak aç */
  function sendQuoteEmail(dict) {
    updateQuoteFormHiddenField();
    const s = dict.configurator.summary;
    const summaryText = (document.getElementById("config-summary-text") || {}).value || "";
    const quoteNo = generateQuoteNo();
    const subject = `${s.pdf_title} — ${quoteNo}`;
    const body = `${summaryText}\n\n${s.pdf_quote_no}: ${quoteNo}`;
    window.location.href = `mailto:info@hbotchambertech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /* CRM'e en iyi çabayla lead gönder; public endpoint yoksa/CORS takılırsa sessiz geç */
  function pushLeadToCrm(payload) {
    try {
      fetch(CRM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) { /* sessiz fallback */ }
  }

  let configuratorPreselected = false;
  let configuratorInitialized = false;
  function initConfigurator(dict) {
    if (!document.getElementById("config-model-grid")) return;
    if (!configuratorPreselected) {
      const params = new URLSearchParams(window.location.search);
      const preModel = params.get("model");
      if (preModel && MODEL_PRICING[preModel]) configState.model = preModel;

      const preStyle = params.get("style");
      if (preStyle && STYLE_PRICING[preStyle] !== undefined) configState.chamberStyle = preStyle;

      const preColor = params.get("color");
      if (preColor && (TRANSLATIONS.tr.configurator.colors || []).some((col) => col.id === preColor)) configState.color = preColor;

      const preInterior = params.get("interior");
      if (preInterior && (TRANSLATIONS.tr.configurator.interior_colors || []).some((col) => col.id === preInterior)) configState.interiorColor = preInterior;

      const preSeat = params.get("seat");
      if (preSeat && (TRANSLATIONS.tr.configurator.seat_colors || []).some((col) => col.id === preSeat)) configState.seatColor = preSeat;

      const preTier = params.get("tier");
      if (preTier !== null) {
        const idx = parseInt(preTier, 10);
        const maxTiers = MODEL_PRICING[configState.model].tiers.length;
        if (!isNaN(idx) && idx >= 0 && idx < maxTiers) configState.tierIndex = idx;
      }
      ensureTierCompatible(false); // paylaşım linki Nexus-only kademe içeriyorsa sessizce 2.0 ATA'ya düş

      if (configState.model === "nexus") {
        const preSeats = params.get("seats");
        if (preSeats !== null) {
          const seats = parseInt(preSeats, 10);
          if (!isNaN(seats) && seats >= NEXUS_BASE_SEATS && seats <= NEXUS_MAX_SEATS) configState.nexusSeats = seats;
        }
      }

      const preAddons = params.get("addons");
      if (preAddons) {
        preAddons.split(",").forEach((id) => {
          if (ADDON_PRICING[id] !== undefined) configState.addons.add(id);
        });
      }

      const preRef = params.get("ref");
      if (preRef && REF_CODES.includes(preRef.trim().toUpperCase())) {
        configState.refCode = preRef.trim().toUpperCase();
        configState.discountPct = REF_DISCOUNT_PCT;
      }

      const preDiscount = params.get("discount");
      if (preDiscount !== null) {
        let pct = parseInt(preDiscount, 10);
        if (!isNaN(pct)) {
          if (pct < 0) pct = 0;
          if (pct > 50) pct = 50;
          configState.discountPct = pct; // açık discount parametresi ref varsayılanını ezer
        }
      }

      configuratorPreselected = true;
    }
    renderConfigModels(dict);
    renderConfigStyles(dict);
    renderConfigColors(dict);
    renderConfigInteriorColors(dict);
    renderConfigSeatColors(dict);
    renderConfigPressure(dict);
    renderNexusSeatSection(dict);
    renderConfigAddons(dict);
    renderConfigSummary(dict);

    if (!configuratorInitialized) {
      initSeatStepper();
      initCurrencySwitch();
      initConfigStageTilt();
      initStageViewToggle();
      initSpin();
      fetchExchangeRates(() => {
        const freshDict = TRANSLATIONS[currentLang];
        renderConfigModels(freshDict);
        renderConfigStyles(freshDict);
        renderConfigColors(freshDict);
        renderConfigSeatColors(freshDict);
        renderConfigPressure(freshDict);
        renderNexusSeatSection(freshDict);
        renderConfigAddons(freshDict);
        renderConfigSummary(freshDict);
      });
      configuratorInitialized = true;
    }
  }

  function renderPage(lang, dict) {
    const page = document.body.getAttribute("data-page") || "home";
    renderModelsMenus(dict);

    if (page === "home") {
      renderStats(dict);
      renderModelsGrid(dict, "models-grid");
      renderStylesTeaser(dict);
      renderWhyGrid(dict);
      renderCelebsGrid(dict);
      renderIndicationsGrid(dict, "indications-teaser-grid", 6);
    } else if (page === "technology") {
      renderPillars(dict);
      renderExtraBadges(dict);
      renderComparisonTable(dict);
      renderRoadmap(dict);
    } else if (page === "models-overview") {
      renderModelsGrid(dict, "models-grid");
      renderModelCompareTable(dict);
    } else if (page && page.startsWith("model-") && page !== "models-overview") {
      const modelKey = document.body.getAttribute("data-model");
      if (modelKey) {
        renderSpecs(dict, modelKey);
        renderIncludedGrid(dict);
        renderModelCrosslinks(dict, modelKey);
      }
    } else if (page === "hbot-info") {
      renderIndicationsGrid(dict, "indications-grid");
    } else if (page === "blog") {
      renderBlogPosts(dict);
    } else if (page === "contact") {
      renderFaq(dict);
    } else if (page === "configurator") {
      initConfigurator(dict);
    }
  }

  /* ---------------- Language application ---------------- */
  let currentLang = "tr";

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = "tr";
    const dict = TRANSLATIONS[lang];
    if (!dict) return;
    currentLang = lang;
    applyStaticLang(lang, dict);
    renderPage(lang, dict);
    updateWhatsAppLink(dict);
    localStorage.setItem(LANG_KEY, lang);
  }

  function initLangSwitch() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLang(btn.getAttribute("data-lang"));
        closeMobileNav();
      });
    });
  }

  /* ---------------- Header / nav behavior ---------------- */
  function closeMobileNav() {
    const nav = document.querySelector(".site-nav");
    const toggle = document.querySelector(".nav-toggle");
    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll(":scope > a").forEach((link) => link.addEventListener("click", closeMobileNav));
  }

  function initDropdown() {
    const item = document.querySelector(".nav-item--dropdown");
    if (!item) return;
    const trigger = item.querySelector(".nav-dropdown-trigger");
    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        item.classList.toggle("is-open");
      }
    });
  }

  function updateWhatsAppLink(dict) {
    const link = document.getElementById("whatsapp-float-btn");
    if (!link || !dict.common) return;
    if (WHATSAPP_NUMBER) {
      const message = encodeURIComponent(dict.common.whatsapp_message || "");
      link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      /* Numara henuz tanimli degil — buton e-posta taslagina gider */
      const subject = encodeURIComponent(dict.common.whatsapp_message || "HBOT Chamber Tech");
      link.href = `mailto:info@hbotchambertech.com?subject=${subject}`;
      link.removeAttribute("target");
    }
  }

  function initWhatsAppButton() {
    if (document.getElementById("whatsapp-float-btn")) return;
    const link = document.createElement("a");
    link.id = "whatsapp-float-btn";
    link.className = "whatsapp-float-btn";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "WhatsApp");
    link.innerHTML = ICONS.whatsapp;
    document.body.appendChild(link);
  }

  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initActiveNav() {
    const page = document.body.getAttribute("data-page");
    const navKeyMap = {
      home: "home", technology: "technology",
      "models-overview": "models", "model-solo-lounge": "models", "model-solo": "models", "model-duo": "models", "model-quad": "models", "model-quad-cube": "models", "model-nexus": "models",
      "hbot-info": "hbotInfo", blog: "blog", configurator: "configurator", contact: "contact"
    };
    const navKey = navKeyMap[page];
    if (!navKey) return;
    document.querySelectorAll(`.site-nav > a[data-nav="${navKey}"], .nav-dropdown-trigger[data-nav="${navKey}"]`).forEach((a) => a.classList.add("is-active"));
  }

  function initForm(formId, successId, errorId, submitKey, sendingKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    const successEl = document.getElementById(successId);
    const errorEl = document.getElementById(errorId);
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (successEl) successEl.hidden = true;
      if (errorEl) errorEl.hidden = true;

      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.tr;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getByPath(dict, sendingKey) || "...";
      }

      const formData = new FormData(form);
      pushLeadToCrm({
        source: formId,
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        company: formData.get("company") || "",
        message: formData.get("message") || "",
        config: formData.get("config_summary") || "",
        ref: configState.refCode || "",
        discountPct: configState.discountPct || 0,
        page: window.location.href,
        ts: new Date().toISOString()
      });

      fetch(form.action, { method: "POST", body: formData, headers: { Accept: "application/json" } })
        .then((res) => res.json().catch(() => ({ success: res.ok })))
        .then((data) => {
          if (data && data.success) {
            form.reset();
            if (successEl) {
              successEl.hidden = false;
              setTimeout(() => (successEl.hidden = true), 8000);
            }
          } else {
            throw new Error(data && data.error ? data.error : "send_failed");
          }
        })
        .catch(() => {
          if (errorEl) {
            errorEl.hidden = false;
            setTimeout(() => (errorEl.hidden = true), 8000);
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = getByPath(dict, submitKey) || "Send";
          }
        });
    });
  }

  function initYear() {
    document.querySelectorAll("#current-year").forEach((elm) => (elm.textContent = new Date().getFullYear()));
  }

  /* ---------------- Hero banner slider ---------------- */
  let heroSlideIndex = 0;
  let heroSlides = [];
  let heroDotEls = [];
  let heroTimer = null;
  const HERO_INTERVAL = 5500;

  function updateHeroCaption() {
    const captionEl = document.querySelector("#hero-caption span");
    const activeSlide = heroSlides[heroSlideIndex];
    if (!captionEl || !activeSlide) return;
    const key = activeSlide.getAttribute("data-caption");
    const dict = TRANSLATIONS[currentLang];
    const value = key && dict ? getByPath(dict, key) : null;
    if (value !== undefined && value !== null) captionEl.textContent = value;
  }

  function goToHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlideIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === heroSlideIndex));
    heroDotEls.forEach((dot, i) => dot.classList.toggle("is-active", i === heroSlideIndex));
    updateHeroCaption();
  }

  function restartHeroTimer() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(() => goToHeroSlide(heroSlideIndex + 1), HERO_INTERVAL);
  }

  function initHeroSlider() {
    const container = document.getElementById("hero-slides");
    const dotsContainer = document.getElementById("hero-dots");
    if (!container || !dotsContainer) return;
    heroSlides = Array.from(container.querySelectorAll(".hero-slide"));
    if (!heroSlides.length) return;

    dotsContainer.innerHTML = heroSlides.map((_, i) => `<button type="button" aria-label="Slide ${i + 1}"></button>`).join("");
    heroDotEls = Array.from(dotsContainer.querySelectorAll("button"));
    heroDotEls.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goToHeroSlide(i);
        restartHeroTimer();
      });
    });

    goToHeroSlide(0);
    restartHeroTimer();

    const deferredLoad = () => {
      heroSlides.forEach((slide) => {
        const bg = slide.getAttribute("data-bg");
        if (bg) {
          slide.style.backgroundImage = `url("${bg}")`;
          slide.removeAttribute("data-bg");
        }
      });
    };
    if ("requestIdleCallback" in window) requestIdleCallback(deferredLoad, { timeout: 3000 });
    else setTimeout(deferredLoad, 1500);
  }

  /* v6: sticky "Ücretsiz Teklif Al" CTA — WhatsApp butonunun üstünde */
  function initStickyCta() {
    if (document.querySelector(".sticky-quote-cta")) return;
    const page = document.body.getAttribute("data-page");
    const a = document.createElement("a");
    a.className = "sticky-quote-cta";
    a.href = page === "configurator" ? "#quote-form" : "konfigurator.html";
    a.setAttribute("data-i18n", "common.sticky_cta");
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.tr;
    a.textContent = getByPath(dict, "common.sticky_cta") || "Teklif Al";
    document.body.appendChild(a);
  }

  /* v6: scroll reveal — section başlıkları ve kart grid'leri yumuşak giriş */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll(".section-head, .sector-card, .value-card, .compare-card, .included-grid > *, .why-grid > *");
    if (!targets.length) return;
    targets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => io.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLangSwitch();
    initMobileNav();
    initDropdown();
    initHeaderScroll();
    initActiveNav();
    initForm("contact-form", "form-success", "form-error", "contact.form_submit", "contact.form_sending");
    initForm("quote-form", "quote-form-success", "quote-form-error", "configurator.quote_form.submit", "configurator.quote_form.sending");
    initYear();
    initHeroSlider();
    initWhatsAppButton();
    initStickyCta();
    initReveal();
    applyLang(detectLang());
  });
})();
