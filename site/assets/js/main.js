(function () {
  "use strict";

  // Ürün fotoğrafları (assets/img/models/**) değiştiğinde bump edilir — tarayıcı
  // eski görseli sonsuza dek cache'lemesin diye (bkz. kullanıcı raporu: yeni Dubai
  // fotoğrafı ve watermark temizliği canlıda "değişmemiş" görünüyordu, sebep buydu).
  const IMG_V = "2";
  const LANG_KEY = "hbot_lang";
  const SUPPORTED = ["en", "tr", "ar", "ru", "es", "pt", "de"];
  const PDF_DATE_LOCALE = { tr: "tr-TR", en: "en-GB", ru: "ru-RU", ar: "ar", es: "es-ES", pt: "pt-PT", de: "de-DE" };

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
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4"/><path d="m8 9 -2 4h3l-2 4"/></svg>',
    pulseOx: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>',
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

  const MODEL_ICON = { "solo-lounge": "lying", solo: "oneSeat", duo: "twoSeat", "quad-cube": "fourSeat", nexus: "nexus" };
  const ADDON_ICON = { massage: "massage", leather: "leather", entertainment: "entertainment", finish: "finish", uvc: "uvc", "backup-o2": "backupO2", warranty: "warranty", install: "install" };
  const PILLAR_ICON = { connect: "connect", os: "os", ai: "ai", sync: "sync", guard: "guard", battery: "battery", pulseOx: "pulseOx" };

  /* Apex Duo Plus konfigüratöre özel kurumsal varyanttır — kendi tanıtım
     sayfası/nav girişi yok, bu yüzden site geneli MODEL_ORDER'a dahil değil. */
  const MODEL_ORDER = ["solo-lounge", "solo", "duo", "quad-cube", "nexus"];
  const MODEL_KEY_MAP = { "solo-lounge": "soloLounge", solo: "solo", duo: "duo", "quad-cube": "quadCube", nexus: "nexus" };
  const MODEL_PAGES = {
    "solo-lounge": "model-oslo.html",
    solo: "model-dubai.html",
    duo: "model-tokyo.html",
    "duo-plus": "model-tokyo-plus.html",
    "quad-cube": "model-milano.html",
    nexus: "model-geneva.html"
  };

  /* ---------------- Pricing data (EUR bazlı — illustrative, update with real figures) ---------------- */
  /* v13 fiyat revizyonu: Ev tipi modellerde basınç sadece 1.5/2.0 ATA (ücretsiz);
     kurumsal modellerde 2.5/3.0/6.0 ATA (ücretsiz) — basınç kademelerine artık fiyat
     eklenmiyor. Apex Quad kaldırıldı (Quad-Cube tek 4 kişilik model). */
  const MODEL_PRICING = {
    "solo-lounge": { base: 29900, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 0 }] },
    solo: { base: 69900, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 0 }] },
    duo: { base: 119900, tiers: [{ ata: "1.5 ATA", price: 0 }, { ata: "2.0 ATA", price: 0 }] },
    "duo-plus": { base: 119900, tiers: [{ ata: "2.5 ATA", price: 0 }, { ata: "3.0 ATA", price: 0 }, { ata: "6.0 ATA", price: 0 }] },
    "quad-cube": { base: 224900, tiers: [{ ata: "2.5 ATA", price: 0 }, { ata: "3.0 ATA", price: 0 }, { ata: "6.0 ATA", price: 0 }] },
    nexus: { base: 259900, tiers: [{ ata: "2.5 ATA", price: 0 }, { ata: "3.0 ATA", price: 0 }, { ata: "6.0 ATA", price: 0 }] }
  };
  const ADDON_PRICING = { massage: 2900, leather: 2100, entertainment: 1650, finish: 900, warranty: 2500, playstation: 1900 };
  const STYLE_PRICING = { solid: 0, glass: 3500, premium: 7500 };
  /* Panoramik camlı seri geçici olarak kapatıldı — henüz gerçek fotoğrafı yok
     (bkz. kullanıcı talebi: fotoğraflar gelince tekrar açılacak). */
  const GLASS_STYLE_MODELS = [];
  function styleAllowedFor(modelId, styleId) {
    return styleId !== "glass" || GLASS_STYLE_MODELS.includes(modelId);
  }
  const PRESSURE_RANGE = { "solo-lounge": "1.5 – 2.0 ATA", solo: "1.5 – 2.0 ATA", duo: "1.5 – 2.0 ATA", "duo-plus": "2.5 – 6.0 ATA", "quad-cube": "2.5 – 6.0 ATA", nexus: "2.5 – 6.0 ATA" };

  /* Kademeli koltuk fiyatlaması: Nexus ve Duo Plus için taban fiyat koltuk sayısına göre
     değişir (eklenen her koltuk için ayrı ücret yerine sabit fiyat kademeleri). */
  const SEAT_TIERS = {
    nexus: [{ seats: 6, price: 259900 }, { seats: 8, price: 280000 }, { seats: 10, price: 300000 }, { seats: 12, price: 330000 }],
    "duo-plus": [{ seats: 2, price: 119900 }, { seats: 4, price: 170000 }]
  };
  const NEXUS_BASE_SEATS = SEAT_TIERS.nexus[0].seats;
  const NEXUS_MAX_SEATS = SEAT_TIERS.nexus[SEAT_TIERS.nexus.length - 1].seats;

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

  /* v16: dil artik URL'nin bir parcasi (/en/, /ru/ ...) — sayfanin kendi
     <html lang> degeri her zaman otoritedir (o dilde baked HTML iceriyor).
     localStorage/tarayici dili artik icerigi EZMIYOR, sadece dil onerisi
     serididi icin kullaniliyor (bkz. initLangSuggestion). */
  function currentPageLang() {
    const htmlLang = document.documentElement.getAttribute("lang");
    return (htmlLang && SUPPORTED.includes(htmlLang)) ? htmlLang : "en";
  }

  function preferredBrowserLang() {
    const browserLangs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
    for (let i = 0; i < browserLangs.length; i++) {
      const code = String(browserLangs[i]).slice(0, 2).toLowerCase();
      if (SUPPORTED.includes(code)) return code;
    }
    return null;
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
      "model-solo-lounge": "soloLounge", "model-solo": "solo", "model-duo": "duo", "model-duo-plus": "duoPlus", "model-quad": "quad", "model-quad-cube": "quadCube", "model-nexus": "nexus",
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
          ? `<img class="nav-model-thumb" src="/assets/img/models/${MODEL_CARD_IMG[key] || "real/apex-lounge-real"}.webp?v=${IMG_V}" alt="" loading="lazy">`
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
          <img class="sector-card-img" src="/assets/img/models/${MODEL_CARD_IMG[key] || "real/apex-lounge-real"}.webp?v=${IMG_V}" alt="${s.title}" loading="lazy">
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
        ${item.source ? `<a class="celeb-source" href="${item.source}" target="_blank" rel="noopener">${dict.home.celebs.source_label} →</a>` : ""}
      </article>
    `).join("");
  }

  function renderTargetMarkets(dict) {
    const c = document.getElementById("market-grid");
    if (!c || !dict.home || !dict.home.targetMarkets) return;
    const tm = dict.home.targetMarkets;
    c.innerHTML = tm.items.map((item) => `
      <div class="market-card">
        <span class="market-flag">${item.flag}</span>
        <span class="market-name">${item.name}</span>
        <span class="market-badge">${tm.badge}</span>
      </div>
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

  function renderCertifications(dict) {
    const c = document.getElementById("cert-grid");
    if (!c || !dict.technology || !dict.technology.certifications) return;
    c.innerHTML = dict.technology.certifications.items.map((item) => `
      <div class="cert-card">
        <div class="cert-code">${item.code}</div>
        <p>${item.name}</p>
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
      const priceLabel = SEAT_TIERS[key] ? formatPrice(MODEL_PRICING[key].base) + "+" : formatPrice(MODEL_PRICING[key].base);
      return `
        <div class="compare-card">
          <div class="compare-card-icon">${ICONS[MODEL_ICON[key]]}</div>
          <h3>${m ? m.name : ""}</h3>
          <div class="compare-row"><span>${t.col_capacity}</span><strong>${capacity}</strong></div>
          <div class="compare-row"><span>${t.col_position}</span><strong>${position}</strong></div>
          <div class="compare-row"><span>${t.col_pressure}</span><strong>${PRESSURE_RANGE[key]}</strong></div>
          <div class="compare-row"><span>${t.col_noise}</span><strong>&lt;60 dB</strong></div>
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
          ${post.author ? `<p class="blog-post-author">${post.author}</p>` : ""}
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

  /* Model sayfalarındaki modele özel SSS: dict.modelsFaq[modelKey] varsa
     #model-faq-list konteynerine, sitenin genel FAQ akordeonuyla aynı
     görsel/etkileşim mantığıyla (soru/cevap açılır-kapanır) render edilir. */
  function renderModelFaq(dict, modelKey) {
    const c = document.getElementById("model-faq-list");
    if (!c || !dict.modelsFaq || !dict.modelsFaq[modelKey]) return;
    c.innerHTML = dict.modelsFaq[modelKey].map((item, i) => `
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
        btn.closest(".faq-item").classList.toggle("is-open");
      });
    });
  }

  /* FAQ: dict.contact.faq.sections varsa gruplu (başlıklı) gösterilir;
     yoksa geriye dönük uyumluluk için düz dict.contact.faq.items listelenir. */
  function renderFaq(dict) {
    const c = document.getElementById("faq-list");
    if (!c || !dict.contact || !dict.contact.faq) return;
    const faqAnswerHtml = (item) => {
      const paras = item.a.split("\n\n").map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
      const list = item.list ? `<ul>${item.list.map((li) => `<li>${li}</li>`).join("")}</ul>` : "";
      const after = item.aAfter ? `<p>${item.aAfter}</p>` : "";
      return paras + list + after;
    };
    const faqItemHtml = (item, key) => `
      <div class="faq-item">
        <button type="button" class="faq-question" data-faq-index="${key}">
          <span>${item.q}</span>
          ${ICONS.chevronDown}
        </button>
        <div class="faq-answer">${faqAnswerHtml(item)}</div>
      </div>
    `;
    if (dict.contact.faq.sections) {
      c.innerHTML = dict.contact.faq.sections.map((section, si) => `
        <div class="faq-section">
          <h3 class="faq-section-title">${section.title}</h3>
          ${section.items.map((item, ii) => faqItemHtml(item, `${si}-${ii}`)).join("")}
        </div>
      `).join("");
    } else {
      c.innerHTML = dict.contact.faq.items.map((item, i) => faqItemHtml(item, i)).join("");
    }

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
  const configState = { usageType: "home", model: "solo-lounge", tierIndex: 0, addons: new Set(), nexusSeats: NEXUS_BASE_SEATS, color: "pearl-white", chamberStyle: "solid", interiorColor: "cream", seatColor: "konyak", seatTouched: false, stageView: "exterior", spinIdx: 0, discountPct: 0, refCode: "" };
  /* Kullanım alanı -> izinli model id'leri. Yüksek basınç (3.0/6.0 ATA) yalnızca
     Nexus'ta mevcut olduğu için kurumsal kategori tek modelle sınırlı. */
  const USAGE_MODELS = {
    home: ["solo-lounge", "solo", "duo"],
    institutional: ["duo-plus", "quad-cube", "nexus"]
  };

  /* Showcase stage: model -> gerçek fotoğraf / 360° spin seti.
     Dış görünüm = gerçek fotoğraf (REAL_STAGE) veya 360° spin seti (SPIN_MODELS).
     Renk seçimi: maskeli tint katmanı (STAGE_TINT_MASKS + multiply blend) kabin/döşeme/koltuk
     bölgesine uygulanır — sahne ve arka plan renklenmez; renk adı ayrıca özet panelinde gösterilir. */
  const REAL_STAGE = {
    "solo-lounge": "real/apex-lounge-real",
    solo: "real/oslo-beige",             // Artık tüm renkler icin REAL_STAGE_BY_COLOR altinda gercek fotograf var
    duo: "real/apex-duo-real",
    "duo-plus": "real/apex-duo-real",    // Duo Plus için ayrı fotoğraf yok — Duo görseli paylaşılır
    "quad-cube": "real/apex-quad-cube",
    nexus: "real/apex-nexus"
  };
  /* İç mekân: her modelin artık kendi gerçek iç fotoğrafı var. Duo/Duo Plus
     için ayrı bir iç çekim hiç yapılmamıştı — kod bu ikisini Milano'nun
     (Quad-Cube) 4 kişilik küp kabinine düşürüyordu, ki bu Duo'nun kendi 2
     kişilik pod gövdesiyle hiç uyuşmuyordu (dış görünüm sekmesinde doğru
     pod'u, iç görünümde bambaşka bir kabini gösteriyordu). apex-duo-real.webp
     (dış görünüm fotoğrafı) aslında pencereden koltuğu net gösteriyor —
     o bölgeyi kırpıp Duo'nun kendi iç fotoğrafı (duo-interior.webp) olarak
     kullanıyoruz. */
  const REAL_INTERIOR = {
    "solo-lounge": "real/apex-lounge-ic",
    solo: "real/oslo-interior",
    duo: "real/duo-interior",
    "duo-plus": "real/duo-interior",
    "quad-cube": "real/apex-quad-cube-ic",
    nexus: "real/apex-nexus-ic"
  };
  /* 360° spin: seti TAMAMLANMIŞ modeller (yarım sette spin AKTİF EDİLMEZ — galeri görünümü kalır).
     Frame adı: spin/<model>/frame-00.webp .. frame-23.webp (24 kare, 15° adım). */
  const SPIN_FRAME_COUNT = 24;
  // duo (Tokyo) buradan çıkarıldı: spin kareleri maskesiz eşik-tabanlı profil
  // kullanıyordu (koltuk rengi gövdeyle aynı ton aralığına düşünce dış renk
  // seçince koltuk da boyanıyordu — bkz. kullanıcı bug raporu). Statik foto +
  // maskeli profile (masks/ext-duo, Tokyo Plus ile paylaşılan) düşerek düzeldi;
  // 24 spin karesinin her biri için ayrı maske gerektirmemek adına spin bilinçli
  // olarak kapatıldı.
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
  /* Sahne tek doğruluk kaynağı: aktif katmanın GÖSTERMESİ GEREKEN görsel anahtarı.
     Flip kararı asla img.src'den çıkarımlanmaz — spin momentum'u (setFrame, rAF) src'yi
     sürekli yeniden yazar; src karşılaştırmalı eski heuristic sahte flip'ler üretip
     iki katmanı üst üste bindiriyor / opacity'yi ters gösteriyordu. */
  let stageCurrentKey = "real/apex-lounge-real";
  let stageCurrentSrc = "";
  /* Spin momentum'unu dışarıdan durdurma kancası — initSpin içinde atanır.
     Görsel hedefi değişirken (model/görünüm geçişi) yarım frame yazılmasını önler. */
  let stopSpinMomentum = () => {};

  /* Gerçek renk fotoğrafları: bazı model+renk kombinasyonları için, boyanmış
     (canvas recolor) görsel yerine GERÇEK ürün fotoğrafı gösterilir. Eşleşme
     yoksa mevcut davranış (spin seti / recolor) devam eder. */
  const PAINTED_COLOR_KEYS = {
    "mat-siyah": "mat-siyah", sampanya: "sampanya", bronz: "bronz", grafit: "grafit",
    antrasit: "antrasit", "gece-laciverti": "gece-laciverti", bordo: "bordo", zumrut: "zumrut"
  };
  function paintedStageMap(prefix) {
    const out = {};
    Object.keys(PAINTED_COLOR_KEYS).forEach((id) => { out[id] = `real/${prefix}-${id}`; });
    return out;
  }
  const REAL_STAGE_BY_COLOR = {
    "solo-lounge": paintedStageMap("lounge"),
    solo: Object.assign({ bej: "real/oslo-beige", "adacayi-yesili": "real/oslo-green" }, paintedStageMap("oslo")),
    duo: paintedStageMap("duo"),
    "duo-plus": paintedStageMap("duo"),
    "quad-cube": Object.assign({
      turkuaz: "real/milan-teal",
      "nane-yesili": "real/milan-mint",
      "tas-grisi": "real/milan-sage",
      fildisi: "real/milan-cream"
    }, paintedStageMap("milan")),
    nexus: paintedStageMap("nexus")
  };

  /* İç mekan/koltuk için gerçek fotoğraf ailesi: hangi model hangi baz fotoğrafı paylaşıyor
     (REAL_INTERIOR ile ayni aile eşlemesi). Koltuk rengi dokunulduysa (seatTouched) koltuk
     fotoğrafı öncelikli — sahne zaten iç görünüme geçiyor; aksi halde duvar/döşeme rengi. */
  const INTERIOR_FAMILY = {
    "solo-lounge": "lounge", solo: "milan",
    "quad-cube": "milan", nexus: "nexus"
  };
  function realInteriorMatch() {
    /* Dubai/Tokyo/Tokyo Plus'ın kendi duvar+koltuk renk varyantı fotoğrafları
       yok — "milan" ailesine eşlenmiş olmaları, renk dokunulunca Milano'nun
       (4 kişilik küp) fotoğrafına düşmelerine yol açıyordu: kullanıcı hiç
       renk seçmemişken kendi kabinini görüyor, TEK bir renk dokununca aniden
       başka bir modelin kabinine sıçrıyordu. Yanlış ürün göstermektense her
       zaman kendi varsayılan iç görsellerinde (REAL_INTERIOR) sabit kalıp
       renklendirmeyi canvas boyama sistemine (stagePaintSpec + kendi
       maskeleri) bırakıyoruz — tutarlı kabin, her renk kombinasyonunda. */
    if (configState.model === "solo" || configState.model === "duo" || configState.model === "duo-plus") return null;
    const family = INTERIOR_FAMILY[configState.model];
    if (!family) return null;
    const seatReady = configState.seatTouched && configState.seatColor;
    const wallReady = configState.interiorColor && configState.interiorColor !== "cream";
    /* Duvar VE koltuk rengi aynı anda seçiliyse ikisini birden gösteren tek
       bir gerçek fotoğraf yok (fotoğraflar tek eksenli: ya duvar ya koltuk
       değişir, öbürü sabit kalır) — biri seçilirse öbürü sessizce
       görmezden geliniyordu. null dönüp varsayılan iç fotoğrafına düşerek
       canvas boyama sistemine (stagePaintSpec) HER İKİ rengi birden
       uygulatıyoruz. */
    if (seatReady && wallReady) return null;
    if (seatReady) return `real/${family}-seat-${configState.seatColor}`;
    if (wallReady) return `real/${family}-wall-${configState.interiorColor}`;
    return null;
  }

  function currentStageTarget() {
    if (configState.stageView === "interior") {
      const realColorMatch = realInteriorMatch();
      if (realColorMatch) return { key: realColorMatch, filter: "none", interior: true, photo: true };
      const realIc = REAL_INTERIOR[configState.model];
      if (realIc) return { key: realIc, filter: "none", interior: true, photo: true };
    } else {
      const realColorMatch = (REAL_STAGE_BY_COLOR[configState.model] || {})[configState.color];
      if (realColorMatch) return { key: realColorMatch, filter: "none", interior: false, photo: true };
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
    // v11: boya aktifse akıllı-profil ile işlenmiş kare (canvas recolor) — yoksa ham kare
    const src = resolveStageSrc(target);

    const active = stageActiveImg === "a" ? imgA : imgB;
    const passive = stageActiveImg === "a" ? imgB : imgA;

    const applyMode = (img) => {
      img.classList.toggle("stage-img--interior", target.interior);
      img.classList.toggle("stage-img--photo", !!target.photo);
    };

    if (target.key !== stageCurrentKey || stageCurrentSrc !== src) {
      // Görsel veya boya değişti: pasif karta yenisini yükle, cross-fade.
      // Momentum durdurma sadece görsel ANAHTARI değiştiğinde (yeni katmana
      // yarım frame yazılmasın) — salt renk değişiminde spin devam edebilir.
      if (target.key !== stageCurrentKey) stopSpinMomentum();
      passive.src = src;
      passive.style.filter = target.filter;
      applyMode(passive);
      passive.classList.add("is-active");
      active.classList.remove("is-active");
      stageActiveImg = stageActiveImg === "a" ? "b" : "a";
      stageCurrentKey = target.key;
      stageCurrentSrc = src;
    } else {
      active.style.filter = target.filter;
      applyMode(active);
      // Güvenlik: sınıf invariant'ını her çağrıda zorla (tam bir katman aktif olsun)
      active.classList.add("is-active");
      passive.classList.remove("is-active");
    }

    const nameEl = document.getElementById("stage-model-name");
    if (nameEl && dict && dict.configurator) {
      const modelInfo = dict.configurator.models.find((m) => m.id === configState.model);
      const base = modelInfo ? modelInfo.name : "";
      const viewLabel = configState.stageView === "interior" && dict.configurator.stage ? ` · ${dict.configurator.stage.view_interior}` : "";
      nameEl.textContent = base + viewLabel;
    }

    // Oslo (solo-lounge): iç mekan fotoğrafı (aşırı geniş, mor LED'li soyut yakın
    // çekim) katalog kalitesinde değil — "İç Görünüm" sekmesini tamamen gizle ve
    // yalnızca dış görünüm göster. İç dekor tercihi ayrı bir notla toplanır
    // (bkz. lounge-decor-note). Diğer modeller etkilenmez.
    const hideInterior = configState.model === "solo-lounge";
    if (hideInterior && configState.stageView === "interior") configState.stageView = "exterior";
    const interiorViewBtn = document.querySelector('.stage-view-btn[data-view="interior"]');
    if (interiorViewBtn) interiorViewBtn.hidden = hideInterior;
    const loungeNote = document.getElementById("lounge-decor-note");
    if (loungeNote) loungeNote.hidden = !hideInterior;

    // Görünüm toggle butonlarının durumu
    document.querySelectorAll(".stage-view-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-view") === configState.stageView);
    });

    // İmleç: sadece dış görünümde ve spin seti olan modelde (metin ipucu kaldırıldı —
    // sürükle-döndür bazı cihazlarda güvenilir hissettirmiyordu, bkz. kullanıcı geri bildirimi)
    const canSpin = spinAvailableFor() && configState.stageView === "exterior";
    stage.classList.toggle("spinnable", canSpin);

    // Boya aktifse ve spin modeli gösteriliyorsa kalan kareleri boşta önceden işle
    prewalkRecolor(target);
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
      setTimeout(() => { const im = new Image(); im.src = `/assets/img/models/spin/${tag}/frame-${String(i).padStart(2, "0")}.webp?v=${IMG_V}`; }, 140 * i);
    }
  }

  function initSpin() {
    const stage = document.getElementById("config-stage");
    if (!stage) return;
    let acc = 0, lastX = 0, lastT = 0, vel = 0, momentumId = null;

    /* Momentum durdurma kancası: updateConfigStage görsel hedefi değiştirirken çağırır.
       Bu olmadan rAF tick'leri model/görünüm değişiminden SONRA da aktif katmana
       frame yazmaya devam ediyor (iç mekân fotoğrafının üstüne spin frame'i,
       hatta var olmayan spin/<model>/frame-XX 404'ü basıyordu). */
    stopSpinMomentum = () => {
      if (momentumId) { cancelAnimationFrame(momentumId); momentumId = null; }
    };

    const setFrame = (idx) => {
      // Korumalar: spin seti olmayan modelde veya iç görünümde ASLA frame yazma
      if (!spinAvailableFor() || configState.stageView !== "exterior") return;
      configState.spinIdx = spinNormIdx(idx);
      // Aktif katmanı DOM sorgusuyla tahmin etme — tek doğruluk kaynağı stageActiveImg
      const active = stageActiveImg === "a"
        ? document.getElementById("stage-img-a")
        : document.getElementById("stage-img-b");
      if (!active) return;
      const key = spinFrameKey(configState.spinIdx);
      // v10: boya aktifse işlenmiş frame (cache hit), yoksa ham frame; miss'te
      // üretim arka planda başlar ve bitince sahne güncellenir
      const src = resolveStageSrc({ key, interior: false });
      if (stageCurrentSrc !== src) { active.src = src; stageCurrentSrc = src; }
      stageCurrentKey = key; // yazan burası — flip heuristic'i ile çakışma olmaz
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


  /* Kullanım alanı seçimi: model listesini (Model Seçin adımı) filtreler.
     Kurumsal = yalnızca yüksek basınçlı (3.0/6.0 ATA) Nexus; Ev Tipi = diğer 5 model. */
  function renderUsageType(dict) {
    const c = document.getElementById("config-usage-grid");
    if (!c || !dict.configurator.usage) return;
    const opts = [
      { id: "home", info: dict.configurator.usage.home },
      { id: "institutional", info: dict.configurator.usage.institutional }
    ];
    c.innerHTML = opts.map((o) => {
      const selected = configState.usageType === o.id ? " is-selected" : "";
      return `
        <button type="button" class="config-style-card${selected}" data-usage-id="${o.id}">
          <span class="config-check">${ICONS.check}</span>
          <h4>${o.info.title}</h4>
          <p>${o.info.desc}</p>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-style-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const usageId = btn.getAttribute("data-usage-id");
        if (usageId === configState.usageType) return;
        configState.usageType = usageId;
        const allowedIds = USAGE_MODELS[usageId] || USAGE_MODELS.home;
        if (!allowedIds.includes(configState.model)) {
          configState.model = allowedIds[0];
          configState.tierIndex = 0;
          const seatTiers0 = SEAT_TIERS[configState.model];
          configState.nexusSeats = seatTiers0 ? seatTiers0[0].seats : NEXUS_BASE_SEATS;
        }
        if (!styleAllowedFor(configState.model, configState.chamberStyle)) configState.chamberStyle = "solid";
        const dict2 = TRANSLATIONS[currentLang];
        renderUsageType(dict2);
        renderConfigModels(dict2);
        renderConfigStyles(dict2);
        renderConfigPressure(dict2);
        renderNexusSeatSection(dict2);
        renderConfigSummary(dict2);
        updateConfigStage(dict2);
      });
    });
  }

  /* "Hangi Kabini Seçmeliyim?" rehber modalı: senaryo listesi -> tek tıkla
     doğru kullanım alanı + modeli ayarlayıp konfigüratörü günceller. */
  function renderGuideModal(dict) {
    const list = document.getElementById("guide-modal-list");
    if (!list || !dict.configurator.guide) return;
    const items = dict.configurator.guide.items || [];
    list.innerHTML = items.map((it, i) => `
      <div class="guide-modal-item">
        <div class="guide-modal-item-text">
          <div class="guide-modal-item-scenario">${it.scenario}</div>
          <div class="guide-modal-item-model">${it.model}</div>
        </div>
        <button type="button" class="guide-modal-item-btn" data-guide-index="${i}">${dict.configurator.guide.select_button}</button>
      </div>
    `).join("");

    list.querySelectorAll(".guide-modal-item-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-guide-index"), 10);
        const item = items[idx];
        if (!item) return;
        configState.usageType = item.usage;
        configState.model = item.modelId;
        configState.tierIndex = 0;
        if (!styleAllowedFor(configState.model, configState.chamberStyle)) configState.chamberStyle = "solid";
        const seatTiers1 = SEAT_TIERS[configState.model];
        configState.nexusSeats = seatTiers1 ? seatTiers1[0].seats : NEXUS_BASE_SEATS;
        const dict2 = TRANSLATIONS[currentLang];
        renderUsageType(dict2);
        renderConfigModels(dict2);
        renderConfigStyles(dict2);
        renderConfigPressure(dict2);
        renderNexusSeatSection(dict2);
        renderConfigAddons(dict2);
        renderConfigSummary(dict2);
        updateConfigStage(dict2);
        closeGuideModal();
        document.getElementById("config-usage-grid").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function openGuideModal() {
    const modal = document.getElementById("guide-modal");
    if (modal) modal.hidden = false;
  }
  function closeGuideModal() {
    const modal = document.getElementById("guide-modal");
    if (modal) modal.hidden = true;
  }
  function initGuideModal() {
    const openBtn = document.getElementById("config-guide-open");
    const closeBtn = document.getElementById("guide-modal-close");
    const backdrop = document.getElementById("guide-modal-backdrop");
    if (openBtn) openBtn.addEventListener("click", openGuideModal);
    if (closeBtn) closeBtn.addEventListener("click", closeGuideModal);
    if (backdrop) backdrop.addEventListener("click", closeGuideModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeGuideModal();
    });
  }

  function renderConfigStyles(dict) {
    const styleSection = document.getElementById("style-step-section");
    if (styleSection) styleSection.hidden = configState.model === "solo-lounge";
    const c = document.getElementById("config-style-grid");
    if (!c || !dict.configurator.styles) return;
    const visibleStyles = dict.configurator.styles.filter((st) => styleAllowedFor(configState.model, st.id));
    c.innerHTML = visibleStyles.map((st) => {
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
        /* Premium Seri: paketin "hepsi dahil" hissini yansıtmak için tüm
           uygun ek özellikler otomatik işaretlenir. */
        if (configState.chamberStyle === "premium") {
          visibleAddonsFor(dict).forEach((a) => configState.addons.add(a.id));
        }
        renderConfigStyles(dict);
        renderConfigAddons(dict);
        renderConfigSummary(dict);
        updateConfigStage(dict);
      });
    });
  }

  /* Geneva (nexus): medikal cihaz olduğu için dış renk sabit İnci Beyazı —
     seçici yerine kilitli gösterge + neden notu; renk kartı PDF linki (statik
     HTML'de, koşulsuz) yine de görünür kalır — talep gelirse özel renk teklif
     aşamasında değerlendirilebilir. */
  function renderConfigColors(dict) {
    const c = document.getElementById("config-color-grid");
    if (!c || !dict.configurator.colors) return;
    if (configState.model === "nexus") {
      configState.color = "pearl-white";
      const pearl = dict.configurator.colors.find((col) => col.id === "pearl-white");
      const note = dict.configurator.ext_color_locked_note || "";
      c.innerHTML = `
        <div class="config-color-locked">
          <span class="swatch-dot" style="background:${pearl ? pearl.hex : "#f4f4f2"}"></span>
          <div>
            <strong>${pearl ? pearl.name : "İnci Beyazı"}</strong>
            <p>${note}</p>
          </div>
        </div>
      `;
      return;
    }
    const availableColors = dict.configurator.colors.filter((col) => colorWorksFor(configState.model, col.id));
    c.innerHTML = availableColors.map((col) => {
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
        updateConfigStage(dict);
      });
    });
  }

  function renderConfigInteriorColors(dict) {
    /* Oslo (solo-lounge): iç mekan fotoğraflarının açısı iyi değil — bu adım
       tamamen gizlenir, varsayılan iç görsel (REAL_INTERIOR.solo-lounge) sabit kalır.
       Geneva (nexus): kurumsal/klinik standart iç donanım, özelleştirme sunulmuyor. */
    const interiorSection = document.getElementById("interior-color-step-section");
    if (interiorSection) interiorSection.hidden = !interiorColorCustomizable(configState.model);
    const c = document.getElementById("config-interior-color-grid");
    if (!c || !dict.configurator.interior_colors) return;
    const visibleInteriorColors = visibleColorList(dict.configurator.interior_colors, INTERIOR_COLOR_ALLOWLIST);
    // Model değişince (ör. Milano'nun kısıtlı paletine geçince) state'te kalan
    // artık-gösterilmeyen bir renk varsa sessizce ilk seçeneğe düş — aksi halde
    // sahne, swatch grid'de "seçili" görünmeyen bir renkle boyanmaya devam eder.
    if (visibleInteriorColors.length && !visibleInteriorColors.some((c2) => c2.id === configState.interiorColor)) {
      configState.interiorColor = visibleInteriorColors[0].id;
    }
    c.innerHTML = visibleInteriorColors.map((col) => {
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
        if (configState.stageView !== "interior") configState.stageView = "interior";
        const dict = TRANSLATIONS[currentLang];
        renderConfigInteriorColors(dict);
        renderConfigSummary(dict);
        updateConfigStage(dict);
      });
    });
  }

  /* v11: model-profili tabanlı akıllı boya (canvas recolor, assets/js/recolor.js).
     CSS tint katmanı terk edildi — "ışık hüzmesi" görünümüne yol açıyordu.
     Yeni motor piksel piksel "boyanma ağırlığı" hesaplar: gövde tam boyanır,
     koltuk/LED/cam/arka plan korunur. Boya MODU tabloları:
     "paint" = hue+sat uygula | "metal" = düşük sat + lightness ölçekle
     null = varsayılan renk, ham kare gösterilir. */
  const EXT_PAINT_MODE = {
    "pearl-white": null,
    "sampanya": "paint", "bronz": "paint",
    "grafit": "metal", "antrasit": "metal", "mat-siyah": "metal",
    "gece-laciverti": "paint", "bordo": "paint", "zumrut": "paint",
    // Genişletilmiş palet: bu 6 renk için yalnızca birkaç modele özel gerçek
    // fotoğraf vardı (oslo: bej+adaçayı, milan: turkuaz/nane/taş-grisi/fildişi),
    // diğer modellerde colorWorksFor false döndürüp SEÇİCİDEN GİZLİYORDU — palet
    // modelden modele 9–13 renk arası tutarsız görünüyordu. Canvas boyama moduna
    // ekleyerek (profili olan her modelde) tüm 15 rengi seçilebilir yapıyoruz;
    // gerçek fotoğrafı olan model+renk kombinasyonları yine gerçek fotoğrafı
    // kullanır (currentStageTarget önce onu kontrol eder).
    "bej": "paint", "adacayi-yesili": "paint", "turkuaz": "paint",
    "nane-yesili": "paint", "fildisi": "paint", "tas-grisi": "metal"
  };

  /* Bir renk, seçili modelde GERÇEKTEN görsel bir değişikliğe yol açıyor mu?
     Ya modele özel gerçek fotoğrafı olmalı (REAL_STAGE_BY_COLOR) ya da boya
     modu + o modelin gösterdiği ham görsel için bir STAGE_EXT_PROFILE olmalı.
     İkisi de yoksa renk seçilse bile sahne değişmez — böyle renkler seçiciden
     gizlenir (bkz. renderConfigColors). */
  function colorWorksFor(modelId, colorId) {
    if ((REAL_STAGE_BY_COLOR[modelId] || {})[colorId]) return true;
    if (!(colorId in EXT_PAINT_MODE)) return false;
    if (EXT_PAINT_MODE[colorId] === null) return true;
    const key = SPIN_MODELS[modelId] ? `spin:${modelId}` : REAL_STAGE[modelId];
    return !!STAGE_EXT_PROFILE[key];
  }
  const INT_PAINT_MODE = {
    "cream": null,
    "kum-beji": "paint", "konyak": "paint", "anthracite": "metal",
    "burgundy": "paint", "navy": "paint"
  };
  const SEAT_PAINT_MODE = {
    "konyak": "paint", "siyah": "metal", "lacivert": "paint",
    "krem": "paint", "bordo": "paint", "gri": "metal"
  };

  /* v11: dış görünüm boyama — model başına akıllı profil (spin setleri maskesiz,
     real fotoğraflar offline düzeltilmiş maske ile). Profil yoksa o görsel boyanmaz. */
  const STAGE_EXT_PROFILE = {
    "spin:duo": { profile: "ledlit-duo" },
    "spin:quad-cube": { profile: "ledlit-qc" },
    "spin:nexus": { profile: "plain" },
    "real/apex-lounge-real": { profile: "masked", mask: "masks/ext-lounge" },
    "real/apex-quad-cube-2": { profile: "masked", mask: "masks/ext-quadcube2" },
    // Dubai (solo) ve Tokyo Plus (duo-plus) spin seti olmayan, tek statik dış
    // fotoğraf gösteren modeller — genişletilmiş palet renklerinin bu modellerde
    // de canvas boyama ile uygulanabilmesi (ve seçiciden gizlenmemesi) için profil.
    // Dubai gövdesi bej/inci; Tokyo Plus, Duo ile aynı LED'li kabin.
    "real/oslo-beige": { profile: "masked", mask: "masks/ext-oslo" },
    // Eskiden maskesiz "ledlit-duo" (salt L/S eşiği) kullanıyordu — koltuk/ekran
    // görseldeki gövdeyle benzer ton aralığına düştüğü için dış renk değiştirince
    // koltuk/ekran da boyanıyordu (bkz. kullanıcı bug raporu). Artık koltuk+ekranı
    // açıkça dışlayan maskeyle (masks/ext-duo) sınırlı — Tokyo ve Tokyo Plus ikisi
    // de bu fotoğrafı paylaşıyor.
    "real/apex-duo-real": { profile: "masked", mask: "masks/ext-duo" }
  };

  /* Interior + koltuk renklendirmesi (maske-tabanlı v10 yolu) */
  const STAGE_TINT_MASKS = {
    "real/apex-lounge-ic": "masks/int-lounge",
    "real/apex-quad-cube-ic": "masks/int-quadcube",
    "real/apex-nexus-ic": "masks/int-nexus",
    "real/oslo-interior": "masks/int-oslo",
    "real/duo-interior": "masks/int-duo"
  };
  const STAGE_SEAT_MASKS = {
    "real/apex-lounge-ic": "masks/seat-lounge",
    "real/apex-quad-cube-ic": "masks/seat-quadcube",
    "real/apex-nexus-ic": "masks/seat-nexus",
    "real/oslo-interior": "masks/seat-oslo",
    "real/duo-interior": "masks/seat-duo"
  };

  /* v11: recolor motor tutkalı — işlenmiş kare cache'i + async üretim.
     İşlenmiş kareler data: URL olarak cache'lenir (CSP blob: engeller, data: izinli). */
  const recolorCache = new Map(); // ck -> dataUrl | "pending"
  const RECOLOR_CACHE_MAX = 40;
  let recolorOK = null;

  function recolorSupported() {
    if (recolorOK !== null) return recolorOK;
    try {
      const c = document.createElement("canvas");
      recolorOK = !!(window.HBOTRecolor && c && c.getContext && c.getContext("2d"));
    } catch (e) { recolorOK = false; }
    return recolorOK;
  }

  function paintSpecFor(modeMap, colorId, colorsList) {
    const mode = modeMap[colorId];
    if (!mode || !colorsList) return null;
    const col = colorsList.find((c) => c.id === colorId);
    if (!col) return null;
    const hsl = window.HBOTRecolor.hexToHsl(col.hex);
    if (!hsl) return null;
    return { h: hsl[0], s: hsl[1], l: hsl[2], metal: mode === "metal" };
  }

  /* Aktif sahne hedefi için boya spec'i: null = ham görsel (işlem yok).
     Dış görünüm: v11 akıllı profil ({ext, profile, mask, paint}).
     İç görünüm: v10 maske yolu ({passes}). */
  function stagePaintSpec(target) {
    if (!recolorSupported()) return null;
    const dict = TRANSLATIONS[currentLang];
    if (!dict || !dict.configurator) return null;
    const maskKey = target.key.indexOf("spin/") === 0 ? `spin:${configState.model}` : target.key;
    if (!target.interior) {
      const p = paintSpecFor(EXT_PAINT_MODE, configState.color, dict.configurator.colors);
      if (!p) return null;
      p.body = true; // dış gövde boyaması: açık renkler net okunsun (bkz. paintPixel)
      const prof = STAGE_EXT_PROFILE[maskKey];
      if (!prof) return null;
      return { ext: true, profile: prof.profile, mask: prof.mask || null, paint: p, tag: `v11b-${prof.profile}-${configState.color}` };
    }
    const bodyMask = STAGE_TINT_MASKS[maskKey];
    const passes = [];
    const p = paintSpecFor(INT_PAINT_MODE, configState.interiorColor, dict.configurator.interior_colors);
    if (p && bodyMask) passes.push({ mask: bodyMask, paint: p, id: configState.interiorColor });
    if (configState.seatTouched) {
      const seatMask = STAGE_SEAT_MASKS[target.key];
      const sp = paintSpecFor(SEAT_PAINT_MODE, configState.seatColor, dict.configurator.seat_colors);
      if (sp && seatMask) passes.push({ mask: seatMask, paint: sp, id: "seat-" + configState.seatColor });
    }
    if (!passes.length) return null;
    return { passes, tag: passes.map((x) => x.id).join("+") };
  }

  function loadRecolorImg(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = () => rej(new Error("img load: " + src));
      im.src = src;
    });
  }

  async function startRecolorJob(ck, imgKey, spec) {
    try {
      const base = await loadRecolorImg(`/assets/img/models/${imgKey}.webp?v=${IMG_V}`);
      const w = base.naturalWidth, h = base.naturalHeight;
      if (!w || !h) throw new Error("empty frame");
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(base, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      if (spec.ext) {
        // v11: akıllı profil — ağırlık haritası + ağırlıklı boya
        let maskData = null;
        if (spec.mask) {
          const mi = await loadRecolorImg(`/assets/img/models/${spec.mask}.png?v=32`);
          const mc = document.createElement("canvas");
          mc.width = w; mc.height = h;
          const mctx = mc.getContext("2d", { willReadFrequently: true });
          mctx.drawImage(mi, 0, 0, w, h);
          maskData = mctx.getImageData(0, 0, w, h).data;
        }
        const weight = window.HBOTRecolor.computeWeight(imgData.data, spec.profile, maskData);
        window.HBOTRecolor.applyWeightedPaint(imgData.data, weight, spec.paint);
      } else {
        // v10 yolu: maske-tabanlı passes (interior + koltuk)
        const masks = await Promise.all(spec.passes.map((p) => loadRecolorImg(`/assets/img/models/${p.mask}.png?v=32`)));
        const mc = document.createElement("canvas");
        mc.width = w; mc.height = h;
        const mctx = mc.getContext("2d", { willReadFrequently: true });
        const passes = spec.passes.map((p, i) => {
          mctx.clearRect(0, 0, w, h);
          mctx.drawImage(masks[i], 0, 0, w, h);
          return { data: mctx.getImageData(0, 0, w, h).data, paint: p.paint };
        });
        window.HBOTRecolor.recolorImageData(imgData.data, passes);
      }
      ctx.putImageData(imgData, 0, 0);
      try {
        const dataUrl = c.toDataURL("image/webp", 0.92);
        if (!dataUrl || dataUrl.length < 100) { recolorCache.delete(ck); return; }
        recolorCache.set(ck, dataUrl);
        if (recolorCache.size > RECOLOR_CACHE_MAX) {
          const k0 = recolorCache.keys().next().value;
          recolorCache.delete(k0);
        }
        // İşlenmiş kare hazır — sahne hâlâ aynı spec'teyse cross-fade ile devreye girer
        updateConfigStage(TRANSLATIONS[currentLang]);
      } catch (e2) {
        recolorCache.delete(ck);
      }
    } catch (e) {
      recolorCache.delete(ck);
    }
  }

  /* Sahne src çözümü: boya aktifse işlenmiş kare (cache hit) döner; miss'te ham
     kare gösterilir ve üretim arka planda başlar (bitince updateConfigStage tetiklenir). */
  function resolveStageSrc(target) {
    const raw = `/assets/img/models/${target.key}.webp?v=${IMG_V}`;
    const spec = stagePaintSpec(target);
    if (!spec) return raw;
    const ck = `${target.key}|${spec.tag}`;
    const hit = recolorCache.get(ck);
    if (hit && hit !== "pending") return hit;
    if (!hit) {
      recolorCache.set(ck, "pending");
      startRecolorJob(ck, target.key, spec);
    }
    return raw;
  }

  /* Spin modelinde dış görünümde boya aktifse kalan 23 kareyi boşta önceden işle */
  function prewalkRecolor(target) {
    const spec = stagePaintSpec(target);
    if (!spec || target.interior || !spinAvailableFor()) return;
    for (let i = 0; i < SPIN_FRAME_COUNT; i++) {
      const key = spinFrameKey(i);
      const ck = `${key}|${spec.tag}`;
      if (!recolorCache.has(ck)) {
        recolorCache.set(ck, "pending");
        setTimeout(() => startRecolorJob(ck, key, spec), 160 * i);
      }
    }
  }

  /* Kart görselleri: model -> gerçek fotoğraf (Duo Plus'ın kendi fotosu yok — Duo görseli paylaşılır) */
  const MODEL_CARD_IMG = {
    "solo-lounge": "real/apex-lounge-real",
    solo: "real/oslo-beige",
    duo: "real/apex-duo-real",
    "duo-plus": "real/apex-duo-real",
    "quad-cube": "real/milan-cream",
    nexus: "real/apex-nexus"
  };

  /* Koltuk rengi: fiyatsız görsel tercih — sahneyi değiştirmez, özette adıyla listelenir */
  function renderConfigSeatColors(dict) {
    const seatColorSection = document.getElementById("seat-color-step-section");
    if (seatColorSection) seatColorSection.hidden = !interiorColorCustomizable(configState.model);
    const c = document.getElementById("config-seat-color-grid");
    if (!c || !dict.configurator.seat_colors) return;
    const visibleSeatColors = visibleColorList(dict.configurator.seat_colors, SEAT_COLOR_ALLOWLIST);
    if (visibleSeatColors.length && !visibleSeatColors.some((c2) => c2.id === configState.seatColor)) {
      configState.seatColor = visibleSeatColors[0].id;
    }
    c.innerHTML = visibleSeatColors.map((col) => {
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
        updateConfigStage(dict);
      });
    });
  }

  function renderConfigModels(dict) {
    const c = document.getElementById("config-model-grid");
    if (!c) return;
    const allowedIds = USAGE_MODELS[configState.usageType] || USAGE_MODELS.home;
    const visibleModels = dict.configurator.models.filter((m) => allowedIds.includes(m.id));
    c.innerHTML = visibleModels.map((m) => {
      const selected = configState.model === m.id ? " is-selected" : "";
      const priceLabel = SEAT_TIERS[m.id] ? formatPrice(MODEL_PRICING[m.id].base) + "+" : formatPrice(MODEL_PRICING[m.id].base);
      return `
        <button type="button" class="config-model-card${selected}" data-model-id="${m.id}">
          <span class="config-check">${ICONS.check}</span>
          <img class="model-card-img" src="/assets/img/models/${MODEL_CARD_IMG[m.id] || "real/apex-lounge-real"}.webp?v=${IMG_V}" alt="${m.name}" loading="lazy">
          <h4>${m.name}</h4>
          <div class="model-tagline">${m.tagline}</div>
          <div class="model-price">${priceLabel}</div>
        </button>
      `;
    }).join("");

    c.querySelectorAll(".config-model-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        configState.model = btn.getAttribute("data-model-id");
        configState.tierIndex = 0;
        const seatTiers = SEAT_TIERS[configState.model];
        configState.nexusSeats = seatTiers ? seatTiers[0].seats : NEXUS_BASE_SEATS;
        if (!styleAllowedFor(configState.model, configState.chamberStyle)) configState.chamberStyle = "solid";
        if (!colorWorksFor(configState.model, configState.color)) configState.color = "pearl-white";
        const dict = TRANSLATIONS[currentLang];
        renderConfigModels(dict);
        renderConfigStyles(dict);
        renderConfigColors(dict);
        renderConfigInteriorColors(dict);
        renderConfigPressure(dict);
        renderNexusSeatSection(dict);
        renderConfigSeatColors(dict);
        renderConfigAddons(dict);
        renderConfigSummary(dict);
        updateConfigStage(dict);
      });
    });
  }

  /* Nexus ve Duo Plus için ortak kademeli koltuk seçici (SEAT_TIERS). */
  function renderNexusSeatSection(dict) {
    const section = document.getElementById("nexus-seat-section");
    if (!section) return;
    const tiers = SEAT_TIERS[configState.model];
    section.hidden = !tiers;
    if (!tiers) return;

    const valueEl = document.getElementById("seat-count-value");
    if (valueEl) valueEl.textContent = configState.nexusSeats;

    const idx = tiers.findIndex((t) => t.seats === configState.nexusSeats);
    const safeIdx = idx >= 0 ? idx : 0;
    const note = document.getElementById("seat-price-note");
    if (note) {
      note.textContent = safeIdx > 0
        ? "+" + formatPrice(tiers[safeIdx].price - tiers[0].price)
        : dict.common.included_badge;
    }

    const decBtn = document.getElementById("seat-decrease");
    const incBtn = document.getElementById("seat-increase");
    if (decBtn) decBtn.disabled = safeIdx <= 0;
    if (incBtn) incBtn.disabled = safeIdx >= tiers.length - 1;
  }

  function initSeatStepper() {
    const decBtn = document.getElementById("seat-decrease");
    const incBtn = document.getElementById("seat-increase");
    if (!decBtn || !incBtn) return;
    const step = (dir) => {
      const tiers = SEAT_TIERS[configState.model];
      if (!tiers) return;
      const idx = tiers.findIndex((t) => t.seats === configState.nexusSeats);
      const safeIdx = idx >= 0 ? idx : 0;
      const nextIdx = safeIdx + dir;
      if (nextIdx < 0 || nextIdx >= tiers.length) return;
      configState.nexusSeats = tiers[nextIdx].seats;
      const dict = TRANSLATIONS[currentLang];
      renderNexusSeatSection(dict);
      renderConfigAddons(dict); // Duo Plus: 2 koltuğu geçince masajlı koltuk seçeneği kalkar
      renderConfigSummary(dict);
    };
    decBtn.addEventListener("click", () => step(-1));
    incBtn.addEventListener("click", () => step(1));
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
     - Nexus dışı modelde nexusOnly kademe (3.0/6.0) seçiliyse -> 2.5 ATA'ya düş ("down")
     - Nexus'ta düşük kademe (1.5/2.0/2.5) seçiliyse -> 3.0 ATA'ya çıkar ("up")
     notify=true iken kullanıcıya bilgi notu gösterilir. */
  /* Basınç kademeleri artık modele göre tam listeleniyor (bkz. MODEL_PRICING);
     tek görevi tierIndex'in geçerli aralıkta kalmasını sağlamak. */
  function ensureTierCompatible() {
    const tiers = MODEL_PRICING[configState.model].tiers;
    if (!tiers[configState.tierIndex]) configState.tierIndex = 0;
    return false;
  }

  function renderConfigPressure(dict) {
    const pressureSection = document.getElementById("pressure-step-section");
    if (pressureSection) pressureSection.hidden = configState.model === "solo-lounge";
    const c = document.getElementById("config-pressure-grid");
    if (!c) return;
    const tiers = MODEL_PRICING[configState.model].tiers;
    const visible = tiers.map((t, i) => ({ t, i }));
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
      if (pressureAutoNote === "up") {
        note.textContent = dict.configurator.pressure_auto_note_up || "";
      } else if (pressureAutoNote) {
        note.textContent = dict.configurator.pressure_auto_note || "";
      }
    }
  }

  /* İç mekân + koltuk renk seçimi sunulmayan modeller: Oslo (iç fotoğraf kalitesi
     yetersiz — bkz. hideInterior), Geneva/Nexus (kurumsal/klinik standart iç donanım,
     özelleştirme sunulmuyor — bkz. visibleAddonsFor). */
  function interiorColorCustomizable(modelId) {
    return modelId !== "solo-lounge" && modelId !== "nexus";
  }

  /* Milano (quad-cube): iç mekân/koltuk renk paleti 6'dan 3'e indirildi — çok
     renk seçeneği gereksizdi (kullanıcı talebi). Krem (varsayılan/güvenli) +
     Lacivert + Bordo bırakıldı — bu ikisi yeni maskelerle test edilip iyi
     sonuç verdiği doğrulanan renkler. */
  const INTERIOR_COLOR_ALLOWLIST = { "quad-cube": ["cream", "navy", "burgundy"] };
  const SEAT_COLOR_ALLOWLIST = { "quad-cube": ["krem", "lacivert", "bordo"] };
  function visibleColorList(list, allowlistMap) {
    const allow = allowlistMap[configState.model];
    return allow ? list.filter((c) => allow.includes(c.id)) : list;
  }

  /* Solo Lounge: sadece garanti eklentisi sunulur (sade konfigürasyon).
     Nexus/Geneva: yalnızca eğlence & multimedya + garanti sunulur (masaj, birinci
     sınıf döşeme, özel kaplama kurumsal/klinik standart konfigürasyonda sunulmuyor —
     kaldırılmışsa state'ten de otomatik temizlenir).
     Duo Plus: 2 koltuğu geçince masajlı koltuk seçeneği kalkar (kaldırıldıysa da otomatik temizlenir). */
  function visibleAddonsFor(dict) {
    let list = dict.configurator.addons;
    if (configState.model === "solo-lounge") {
      list = list.filter((a) => a.id === "warranty" || a.id === "leather" || a.id === "entertainment");
    }
    if (configState.model === "nexus") {
      list = list.filter((a) => a.id === "entertainment" || a.id === "warranty");
      ["massage", "leather", "finish", "playstation"].forEach((id) => configState.addons.delete(id));
    }
    if (configState.model === "duo-plus" && configState.nexusSeats > 2) {
      list = list.filter((a) => a.id !== "massage");
      if (configState.addons.has("massage")) configState.addons.delete("massage");
    }
    return list;
  }

  /* Eğlence & Multimedya sistemi Geneva/Nexus'ta ekran koltuk başına verildiği için
     sabit değil, koltuk sayısına göre ölçeklenir (bkz. kullanıcı notu: 8" ekran,
     koltuk başına 450 USD). Taban değer gerçekten USD'dir (site fiyatlarının geri
     kalanı gibi EUR değil) — canlı kurdan (exchangeRates.USD) EUR karşılığına çevrilip
     formatPrice ile seçili para birimine basılır; böylece USD'de her zaman tam 450,
     diğer para birimlerinde güncel çapraz kur gösterilir. Diğer tüm modellerde ve
     eklentilerde ADDON_PRICING sabiti geçerli. */
  const NEXUS_ENTERTAINMENT_PER_SEAT_USD = 450;
  function nexusEntertainmentPerSeatEur() {
    return NEXUS_ENTERTAINMENT_PER_SEAT_USD / (exchangeRates.USD || 1.09);
  }
  function addonPriceFor(id) {
    if (id === "entertainment" && configState.model === "nexus") {
      return nexusEntertainmentPerSeatEur() * configState.nexusSeats;
    }
    return ADDON_PRICING[id] || 0;
  }

  function renderConfigAddons(dict) {
    const c = document.getElementById("config-addon-grid");
    if (!c) return;
    c.innerHTML = visibleAddonsFor(dict).map((a) => {
      const selected = configState.addons.has(a.id) ? " is-selected" : "";
      const isNexusEntertainment = a.id === "entertainment" && configState.model === "nexus";
      const note = isNexusEntertainment && dict.configurator.nexus_entertainment_note
        ? `<span class="addon-note">${dict.configurator.nexus_entertainment_note
            .replace("{seats}", configState.nexusSeats)
            .replace("{perSeat}", formatPrice(nexusEntertainmentPerSeatEur()))
            .replace("{total}", formatPrice(addonPriceFor(a.id)))}</span>`
        : "";
      return `
        <button type="button" class="config-addon-card${selected}" data-addon-id="${a.id}">
          <span class="config-check">${ICONS.check}</span>
          <h4>${a.name}</h4>
          <p>${a.desc}</p>
          ${note}
          <span class="addon-price">+${formatPrice(addonPriceFor(a.id))}${isNexusEntertainment ? `<small class="addon-price-per-seat">/${configState.nexusSeats} ${dict.configurator.seats_label || ""}</small>` : ""}</span>
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
    if (SEAT_TIERS[configState.model]) params.set("seats", String(configState.nexusSeats));
    if (configState.addons.size) params.set("addons", Array.from(configState.addons).join(","));
    if (configState.discountPct) params.set("discount", String(configState.discountPct));
    if (configState.refCode) params.set("ref", configState.refCode);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  function computeSubtotal() {
    const model = MODEL_PRICING[configState.model];
    const seatTiers = SEAT_TIERS[configState.model];
    const seatTier = seatTiers && seatTiers.find((t) => t.seats === configState.nexusSeats);
    let total = (seatTier ? seatTier.price : model.base) + model.tiers[configState.tierIndex].price;
    configState.addons.forEach((id) => (total += addonPriceFor(id)));
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
      ? addonNames.map((a) => `<div>${a.name} <span style="opacity:.6">(+${formatPrice(addonPriceFor(a.id))})</span></div>`).join("")
      : s.none_selected;

    const seatTiersForRow = SEAT_TIERS[configState.model];
    const seatTierForRow = seatTiersForRow && seatTiersForRow.find((t) => t.seats === configState.nexusSeats);
    const seatExtra = seatTierForRow && seatTiersForRow[0] ? seatTierForRow.price - seatTiersForRow[0].price : 0;
    const seatsRow = seatTiersForRow
      ? `<div class="config-summary-row"><span class="label">${s.seats_label}</span><span class="value">${configState.nexusSeats}${seatExtra > 0 ? " (+" + formatPrice(seatExtra) + ")" : ""}</span></div>`
      : "";
    const colorInfo = (dict.configurator.colors || []).find((col) => col.id === configState.color);
    const colorRow = colorInfo
      ? `<div class="config-summary-row"><span class="label">${s.color_label}</span><span class="value"><span class="summary-swatch" style="background:${colorInfo.hex}"></span>${colorInfo.name}</span></div>`
      : "";
    const interiorInfo = (dict.configurator.interior_colors || []).find((col) => col.id === configState.interiorColor);
    const interiorRow = interiorInfo && interiorColorCustomizable(configState.model)
      ? `<div class="config-summary-row"><span class="label">${s.interior_color_label}</span><span class="value"><span class="summary-swatch" style="background:${interiorInfo.hex}"></span>${interiorInfo.name}</span></div>`
      : "";
    const seatColorInfo = (dict.configurator.seat_colors || []).find((col) => col.id === configState.seatColor);
    const seatColorRow = seatColorInfo && s.seat_color_label && interiorColorCustomizable(configState.model)
      ? `<div class="config-summary-row"><span class="label">${s.seat_color_label}</span><span class="value"><span class="summary-swatch" style="background:${seatColorInfo.hex}"></span>${seatColorInfo.name}</span></div>`
      : "";
    const seatTypeRow = s.seat_type_label && interiorColorCustomizable(configState.model)
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

  function updateQuoteFormHiddenField(fieldId) {
    const field = document.getElementById(fieldId || "config-summary-text");
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
    if (SEAT_TIERS[configState.model]) lines.push(`${s.seats_label}: ${configState.nexusSeats}`);
    if (styleInfo) lines.push(`${s.style_label}: ${styleInfo.name}`);
    if (colorInfo) lines.push(`${s.color_label}: ${colorInfo.name}`);
    if (interiorInfo && interiorColorCustomizable(configState.model)) lines.push(`${s.interior_color_label}: ${interiorInfo.name}`);
    if (seatColorInfo && s.seat_color_label && interiorColorCustomizable(configState.model)) lines.push(`${s.seat_color_label}: ${seatColorInfo.name}`);
    if (s.seat_type_label && interiorColorCustomizable(configState.model)) lines.push(`${s.seat_type_label}: ${configState.addons.has("massage") ? s.seat_massage : s.seat_standard}`);
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

  /* Turkce karakterleri ASCII'ye indirger — jsPDF standart fontlari Turkce'yi bozar */
  function asciiSafe(str) {
    return String(str == null ? "" : str)
      .replace(/ğ/g, "g").replace(/Ğ/g, "G")
      .replace(/ı/g, "i").replace(/İ/g, "I")
      .replace(/ş/g, "s").replace(/Ş/g, "S")
      .replace(/ç/g, "c").replace(/Ç/g, "C")
      .replace(/ö/g, "o").replace(/Ö/g, "O")
      .replace(/ü/g, "u").replace(/Ü/g, "U");
  }

  function loadImageForPdf(src, opts) {
    const o = opts || {};
    const maxDim = o.maxDim || 0;
    const format = o.format || "png"; // "png" (seffaflik) veya "jpeg" (kucuk boyut, fotograf)
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          let w = img.naturalWidth, h = img.naturalHeight;
          if (maxDim && Math.max(w, h) > maxDim) {
            const scale = maxDim / Math.max(w, h);
            w = Math.round(w * scale);
            h = Math.round(h * scale);
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (format === "jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, w, h);
          }
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = format === "jpeg" ? canvas.toDataURL("image/jpeg", 0.78) : canvas.toDataURL("image/png");
          resolve({ dataUrl, ratio: h / w, format: format.toUpperCase() });
        } catch (e) { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }
  function loadLogoForPdf() {
    return loadImageForPdf("/assets/img/logo-full.png", { format: "png" });
  }
  /* Yapılandırılan modelin gercek urun fotografi (dis gorunum) — proformada gosterilir.
     JPEG + kucultme: PDF/e-posta boyutunu makul tutmak icin (PNG ile 10+ MB'a cikiyordu). */
  function loadProductPhotoForPdf() {
    const key = REAL_STAGE[configState.model] || "real/apex-lounge-real";
    return loadImageForPdf(`/assets/img/models/${key}.webp?v=${IMG_V}`, { format: "jpeg", maxDim: 900 });
  }

  /* Unicode PDF fontu (Turkce + Kiril destekli, subset NotoSans) — jsPDF'e bir kez kaydedilir. */
  let pdfFontStatus = null; // null=yuklenmedi, promise=yukleniyor, true/false=sonuc
  async function ensurePdfFont(doc) {
    if (pdfFontStatus === true) { registerPdfFont(doc); return true; }
    if (pdfFontStatus === false) return false;
    if (!pdfFontStatus) {
      pdfFontStatus = (async () => {
        try {
          const [reg, bold] = await Promise.all([
            fetch("/assets/fonts/NotoSans-Regular.ttf?v=3").then((r) => r.arrayBuffer()),
            fetch("/assets/fonts/NotoSans-Bold.ttf?v=3").then((r) => r.arrayBuffer()),
          ]);
          pdfFontRegBase64 = arrayBufferToBase64(reg);
          pdfFontBoldBase64 = arrayBufferToBase64(bold);
          return true;
        } catch (e) { return false; }
      })();
    }
    const ok = await pdfFontStatus;
    pdfFontStatus = ok;
    if (ok) registerPdfFont(doc);
    return ok;
  }
  let pdfFontRegBase64 = null, pdfFontBoldBase64 = null;
  function arrayBufferToBase64(buf) {
    let binary = "";
    const bytes = new Uint8Array(buf);
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }
  function registerPdfFont(doc) {
    doc.addFileToVFS("NotoSans-Regular.ttf", pdfFontRegBase64);
    doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
    doc.addFileToVFS("NotoSans-Bold.ttf", pdfFontBoldBase64);
    doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold");
  }

  /* Proforma PDF (jsPDF): gorsel kimlikli, formu doldurulan dilde uretilir.
     Arapca icin harf sekillendirme (shaping) desteklenmedigi icin Ingilizce icerikle uretilir.
     Donus: { base64, name, quoteNo } — gonderim webhook'una eklenir. */
  async function buildProformaPdf(formData, dict) {
    if (!window.jspdf || !window.jspdf.jsPDF) return null;
    const pdfDict = (dict && currentLang !== "ar") ? dict : (TRANSLATIONS.en || TRANSLATIONS.tr);
    const cfg = pdfDict.configurator;
    const s = cfg.summary;
    const qf = cfg.quote_form || {};
    const quoteNo = generateQuoteNo();
    const doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    const fontOk = await ensurePdfFont(doc);
    const FONT = fontOk ? "NotoSans" : "helvetica";
    const T = fontOk ? (v) => String(v == null ? "" : v) : asciiSafe;
    const NAVY = [27, 42, 74], GOLD = [201, 164, 92], GRAY = [110, 110, 110];
    const pageW = 210, mL = 16, mR = 194;

    // Logo + baslik
    const logo = await loadLogoForPdf();
    if (logo) {
      const w = 46, h = w * logo.ratio;
      doc.addImage(logo.dataUrl, "PNG", mL, 10, w, h);
    }
    doc.setFont(FONT, "bold");
    doc.setFontSize(19);
    doc.setTextColor(...NAVY);
    doc.text(T(s.pdf_title || "Proforma Quote").toUpperCase(), mR, 18, { align: "right" });
    doc.setFontSize(10);
    doc.setFont(FONT, "normal");
    doc.setTextColor(...GRAY);
    const dateStr = new Date().toLocaleDateString(PDF_DATE_LOCALE[currentLang] || "en-GB", { year: "numeric", month: "long", day: "numeric" });
    doc.text(`${T(s.pdf_quote_no || "Quote No")}: ${quoteNo}`, mR, 25, { align: "right" });
    doc.text(`${T(s.pdf_date || "Date")}: ${T(dateStr)}`, mR, 30, { align: "right" });
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(1.1);
    doc.line(mL, 36, mR, 36);

    // Secilen urunun gercek fotografi
    let y = 46;
    const productPhoto = await loadProductPhotoForPdf();
    if (productPhoto) {
      const maxW = mR - mL, maxH = 62;
      let pw = maxW, ph = pw * productPhoto.ratio;
      if (ph > maxH) { ph = maxH; pw = ph / productPhoto.ratio; }
      const px = mL + (maxW - pw) / 2;
      doc.addImage(productPhoto.dataUrl, productPhoto.format || "JPEG", px, y, pw, ph);
      y += ph + 10;
    }

    // Musteri blogu
    doc.setFont(FONT, "bold");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(T(s.pdf_customer_section || "Customer"), mL, y);
    doc.setFont(FONT, "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const custRows = [
      [qf.name || "Name", formData.get("name")],
      [qf.email || "E-mail", formData.get("email")],
      [qf.phone || "Phone", formData.get("phone") || "-"],
      [qf.company || "Company / Clinic", formData.get("company") || "-"],
    ];
    custRows.forEach(([k, v]) => {
      y += 6;
      doc.setTextColor(...GRAY);
      doc.text(T(k), mL, y);
      doc.setTextColor(40, 40, 40);
      doc.text(T(v), mL + 42, y);
    });

    // Konfigurasyon tablosu
    y += 12;
    doc.setFont(FONT, "bold");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(T(s.pdf_configuration_section || "Configuration"), mL, y);
    doc.setFontSize(10);
    const modelInfo = cfg.models.find((mm) => mm.id === configState.model);
    const tier = MODEL_PRICING[configState.model].tiers[configState.tierIndex];
    const styleInfo = (cfg.styles || []).find((st) => st.id === configState.chamberStyle);
    const colInfo = (cfg.colors || []).find((c2) => c2.id === configState.color);
    const intInfo = (cfg.interior_colors || []).find((c2) => c2.id === configState.interiorColor);
    const seatInfo = (cfg.seat_colors || []).find((c2) => c2.id === configState.seatColor);
    const addonNames = cfg.addons.filter((a) => configState.addons.has(a.id))
      .map((a) => `${a.name} (+${formatPrice(addonPriceFor(a.id))})`);
    const confRows = [
      [s.model_label || "Model", modelInfo ? modelInfo.name : ""],
      [s.style_label || "Cabin Style", styleInfo ? styleInfo.name : "-"],
      [s.pressure_label || "Pressure", tier.ata],
      [s.color_label || "Exterior Color", colInfo ? colInfo.name : "-"],
    ];
    if (interiorColorCustomizable(configState.model)) {
      confRows.push([s.interior_color_label || "Interior Color", intInfo ? intInfo.name : "-"]);
      confRows.push([s.seat_color_label || "Seat Color", seatInfo ? seatInfo.name : "-"]);
    }
    if (SEAT_TIERS[configState.model]) confRows.splice(2, 0, [s.seats_label || "Seats", String(configState.nexusSeats)]);
    confRows.push([s.addons_label || "Add-ons", addonNames.length ? addonNames.join(", ") : (s.none_selected || "None")]);
    if (configState.discountPct > 0) confRows.push([s.discount_label || "Discount", `%${configState.discountPct} (-${formatPrice(computeDiscountAmount())})`]);
    if (configState.refCode) confRows.push(["Ref", configState.refCode]);
    doc.setFont(FONT, "normal");
    confRows.forEach(([k, v], i) => {
      y += 7;
      if (i % 2 === 0) {
        doc.setFillColor(245, 246, 249);
        doc.rect(mL, y - 4.6, mR - mL, 7, "F");
      }
      doc.setTextColor(...GRAY);
      doc.text(T(k), mL + 2, y);
      doc.setTextColor(40, 40, 40);
      const lines = doc.splitTextToSize(T(v), 92);
      doc.text(lines, mR - 2, y, { align: "right" });
      if (lines.length > 1) y += (lines.length - 1) * 5;
    });

    // Fiyat kutusu
    y += 14;
    doc.setFillColor(...NAVY);
    doc.roundedRect(mL, y - 7, mR - mL, 16, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont(FONT, "bold");
    doc.setFontSize(11);
    doc.text(T((s.total_label || "Total") + ` (${currentCurrency})`).toUpperCase(), mL + 5, y + 3);
    doc.setFontSize(16);
    doc.setTextColor(...GOLD);
    doc.text(T(formatPrice(computeTotal())), mR - 5, y + 3, { align: "right" });

    // Not + tesekkur + footer
    y += 20;
    doc.setFont(FONT, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    const disclaimerTxt = s.disclaimer || "This proforma quote is not a binding contract. Final pricing and specifications are confirmed following consultation with our sales team.";
    doc.text(doc.splitTextToSize(T(disclaimerTxt), mR - mL), mL, y);
    y += 12;
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(T((pdfDict.common && pdfDict.common.thanks) || "Thank you for choosing us."), mL, y);
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.8);
    doc.line(mL, 282, mR, 282);
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text("www.hbotchambertech.com  ·  info@hbotchambertech.com", pageW / 2, 288, { align: "center" });

    const dataUri = doc.output("datauristring");
    return {
      base64: dataUri.slice(dataUri.indexOf("base64,") + 7),
      name: `proforma-${quoteNo}.pdf`,
      quoteNo,
    };
  }

  /* Biçimlendirilmiş teklif penceresi → yazdır/PDF */
  function openQuotePdf(dict) {
    updateQuoteFormHiddenField();
    const s = dict.configurator.summary;
    const summaryText = (document.getElementById("config-summary-text") || {}).value || "";
    const quoteNo = generateQuoteNo();
    const dictLangKey = Object.keys(TRANSLATIONS).find((k) => TRANSLATIONS[k] === dict);
    const dateStr = new Date().toLocaleDateString(PDF_DATE_LOCALE[dictLangKey] || "en-GB", { year: "numeric", month: "long", day: "numeric" });
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

  /* Sticky önizleme, adım listesinin (config-steps) TAMAMI kadar kayabilsin diye
     config-stage-col'un yüksekliğini steps yüksekliği + sticky içerik yüksekliği
     olacak şekilde JS ile senkron tutar (CSS tek başına: sticky, kısa içerikle
     içerme bloğunun ancak (blok yüksekliği - içerik yüksekliği) kadarlık kısmında
     kalabiliyor — steps her değiştiğinde (model/kullanım tipi vb.) yeniden ölçer). */
  function initStageColHeightSync() {
    const stepsEl = document.querySelector(".config-steps");
    const colEl = document.querySelector(".config-stage-col");
    const innerEl = document.querySelector(".config-stage-sticky-inner");
    if (!stepsEl || !colEl || !innerEl) return;
    const sync = () => {
      if (window.innerWidth <= 980) { colEl.style.minHeight = ""; return; }
      const stepsH = stepsEl.getBoundingClientRect().height;
      const innerH = innerEl.getBoundingClientRect().height;
      colEl.style.minHeight = Math.ceil(stepsH + innerH) + "px";
    };
    sync();
    if (window.ResizeObserver) {
      new ResizeObserver(sync).observe(stepsEl);
    }
    window.addEventListener("resize", sync);
  }

  let configuratorPreselected = false;
  let configuratorInitialized = false;
  function initConfigurator(dict) {
    if (!document.getElementById("config-model-grid")) return;
    if (!configuratorPreselected) {
      const params = new URLSearchParams(window.location.search);
      const preModel = params.get("model");
      if (preModel && MODEL_PRICING[preModel]) {
        configState.model = preModel;
        configState.usageType = USAGE_MODELS.institutional.includes(preModel) ? "institutional" : "home";
      }

      const preStyle = params.get("style");
      if (preStyle && STYLE_PRICING[preStyle] !== undefined) configState.chamberStyle = preStyle;

      const preColor = params.get("color");
      if (preColor && (TRANSLATIONS.tr.configurator.colors || []).some((col) => col.id === preColor) && colorWorksFor(configState.model, preColor)) {
        configState.color = preColor;
      }

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
      ensureTierCompatible(); // paylaşım linki geçersiz kademe içeriyorsa sessizce 0'a düş

      if (SEAT_TIERS[configState.model]) {
        const preSeats = params.get("seats");
        if (preSeats !== null) {
          const seats = parseInt(preSeats, 10);
          if (SEAT_TIERS[configState.model].some((t) => t.seats === seats)) configState.nexusSeats = seats;
        }
      }

      const preAddons = params.get("addons");
      if (preAddons) {
        preAddons.split(",").forEach((id) => {
          if (ADDON_PRICING[id] !== undefined) configState.addons.add(id);
        });
      }

      const preView = params.get("view");
      if (preView === "interior" || preView === "exterior") configState.stageView = preView;

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
    renderUsageType(dict);
    renderGuideModal(dict);
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
      initGuideModal();
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
      renderTargetMarkets(dict);
      renderIndicationsGrid(dict, "indications-teaser-grid", 6);
    } else if (page === "technology") {
      renderPillars(dict);
      renderExtraBadges(dict);
      renderComparisonTable(dict);
      renderRoadmap(dict);
      renderCertifications(dict);
    } else if (page === "models-overview") {
      renderModelsGrid(dict, "models-grid");
      renderModelCompareTable(dict);
    } else if (page && page.startsWith("model-") && page !== "models-overview") {
      const modelKey = document.body.getAttribute("data-model");
      if (modelKey) {
        renderSpecs(dict, modelKey);
        renderIncludedGrid(dict);
        renderModelCrosslinks(dict, modelKey);
        renderModelFaq(dict, modelKey);
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
  let currentLang = "en";

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = "en";
    const dict = TRANSLATIONS[lang];
    if (!dict) return;
    currentLang = lang;
    applyStaticLang(lang, dict);
    renderPage(lang, dict);
    updateWhatsAppLink(dict);
    localStorage.setItem(LANG_KEY, lang);
  }

  /* v16: dil butonlari artik gercek <a href="/xx/sayfa.html"> linkleri —
     tarayici dogal olarak o dilin baked sayfasina gider, client-side
     re-render'a gerek yok (mobil menuyu kapatmak disinda). */
  const LANG_MANUAL_KEY = "hbot_lang_manual";
  function markLangManual() {
    try { localStorage.setItem(LANG_MANUAL_KEY, "1"); } catch (e) {}
  }

  function initLangSwitch() {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        markLangManual();
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
    const toggle = item.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      item.classList.toggle("is-open");
    });
  }

  /* v17: mobil header'da her zaman görünen kompakt dil seçici (hamburger açmadan) */
  function initLangCompact() {
    const item = document.querySelector(".lang-item--dropdown");
    if (!item) return;
    const trigger = item.querySelector(".lang-compact-trigger");
    const current = item.querySelector(".lang-compact-current");
    if (current) current.textContent = (document.documentElement.lang || "tr").toUpperCase();
    if (!trigger) return;
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const open = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (e) => {
      if (!item.contains(e.target)) item.classList.remove("is-open");
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
      "models-overview": "models", "model-solo-lounge": "models", "model-solo": "models", "model-duo": "models", "model-duo-plus": "models", "model-quad": "models", "model-quad-cube": "models", "model-nexus": "models",
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

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (successEl) successEl.hidden = true;
      if (errorEl) errorEl.hidden = true;

      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.tr;
      const resetBtn = () => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getByPath(dict, submitKey) || "Send";
        }
      };
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getByPath(dict, sendingKey) || "...";
      }

      const formData = new FormData(form);

      // Honeypot: bot doldurduysa gönderme — sessizce başarılı gibi davran
      if (String(formData.get("website") || "").trim()) {
        form.reset();
        if (successEl) {
          successEl.hidden = false;
          setTimeout(() => (successEl.hidden = true), 8000);
        }
        resetBtn();
        return;
      }

      // Zorunlu alan doğrulaması (form novalidate — JS tarafında kontrol)
      let invalid = false;
      form.querySelectorAll("[required]").forEach((inp) => {
        const v = String(inp.value || "").trim();
        const bad = !v || (inp.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        inp.classList.toggle("is-invalid", bad);
        if (bad) invalid = true;
      });
      if (invalid) {
        if (errorEl) {
          errorEl.hidden = false;
          setTimeout(() => (errorEl.hidden = true), 8000);
        }
        resetBtn();
        return;
      }

      // Konfigurator: marka kimlikli proforma PDF uret + gercek urun fotografiyle
      // birlikte base64 olarak gonder (Google Apps Script backend'i cozup e-posta
      // ekine cevirir). Formspree dosya eki kabul etmedigi icin bu form artik
      // ayri bir Apps Script Web App endpoint'ine gidiyor (bkz. form action).
      if (formId === "vip-form") {
        updateQuoteFormHiddenField("vip-config-summary");
        formData.set("config_summary", (document.getElementById("vip-config-summary") || {}).value || "");
        formData.set("lang", currentLang);
      }

      if (formId === "quote-form") {
        updateQuoteFormHiddenField();
        formData.set("config_summary", (document.getElementById("config-summary-text") || {}).value || "");
        formData.set("lang", currentLang);
        formData.set("thanks", (dict.common && dict.common.thanks) || "Thank you for choosing us.");
        try {
          const pdf = await buildProformaPdf(formData, dict);
          if (pdf) {
            formData.set("pdf_base64", pdf.base64);
            formData.set("pdf_name", pdf.name);
            formData.set("quote_no", pdf.quoteNo);
          }
        } catch (pdfErr) { console.error("Proforma PDF üretilemedi, form yine de gönderilecek:", pdfErr); }
      }

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

      // Apps Script web app'i CORS yaniti dondurmuyor (opaque); no-cors ile
      // gonderiyoruz ve agdan atmadigi surece basarili sayiyoruz. Formspree
      // ise normal CORS + JSON yaniti destekliyor, onu okuyup dogruluyoruz.
      const isAppsScript = form.action.indexOf("script.google.com") !== -1;
      if (isAppsScript) {
        fetch(form.action, { method: "POST", body: formData, mode: "no-cors" })
          .then(() => {
            form.reset();
            if (successEl) {
              successEl.hidden = false;
              setTimeout(() => (successEl.hidden = true), 8000);
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
        return;
      }

      fetch(form.action, { method: "POST", body: formData, headers: { Accept: "application/json" } })
        .then((res) => res.json().catch(() => ({ success: res.ok })))
        .then((data) => {
          if (data && (data.ok || data.success)) {
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
    const year = new Date().getFullYear();
    document.querySelectorAll("#current-year").forEach((elm) => (elm.textContent = year));
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

  /* v16: kok (TR) sayfalarda, tarayici dili desteklenen baska bir dile
     denk geliyorsa kapatilabilir bir dil onerisi seridi gosterir.
     Sessiz otomatik yonlendirme YAPILMAZ (crawler/SEO riski) — sadece
     kullaniciya o dilin URL'sine giden bir link sunulur. */
  const LANG_SUGGESTION_DISMISSED_KEY = "hbot_lang_suggestion_dismissed";
  const LANG_SUGGESTION_TEXT = {
    en: { msg: "It looks like you browse in English. View this site in English?", cta: "View in English" },
    ru: { msg: "Похоже, вы используете русский язык. Открыть сайт на русском?", cta: "Открыть на русском" },
    ar: { msg: "يبدو أنك تتصفح بالعربية. هل تريد عرض الموقع بالعربية؟", cta: "عرض بالعربية" },
    es: { msg: "Parece que navegas en español. ¿Ver este sitio en español?", cta: "Ver en español" },
    pt: { msg: "Parece que você navega em português. Ver este site em português?", cta: "Ver em português" },
    de: { msg: "Es sieht so aus, als würden Sie auf Deutsch surfen. Diese Seite auf Deutsch ansehen?", cta: "Auf Deutsch ansehen" }
  };
  /* Kanka'nin ek istegi: VPN ile ABD'den girildiginde site hala TR aciliyordu —
     tarayici dili (preferredBrowserLang) VPN ile degismedigi icin oneri seridi
     tetiklenmiyordu. Bu fonksiyon GERCEK IP konumuna (Cloudflare'in ayni-origin
     /cdn-cgi/trace uc noktasi — CSP degisikligi gerektirmez) gore SESSIZCE
     yonlendirir. SEO riskini onlemek icin: bilinen bot/crawler User-Agent'lari
     ATLANIR (boylece Googlebot vb. hep TR kok sayfayi tarar/indexler), ve
     kullanici herhangi bir dil linkine bir kez manuel tikladiysa (markLangManual)
     bir daha asla zorla yonlendirilmez. */
  const GEO_REDIRECT_DONE_KEY = "hbot_geo_redirect_done";
  const COUNTRY_TO_LANG = {
    US: "en", GB: "en", CA: "en", AU: "en", NZ: "en", IE: "en", ZA: "en", IN: "en",
    SG: "en", MY: "en", PH: "en", NG: "en", KE: "en", GH: "en", PK: "en", HK: "en",
    RU: "ru", BY: "ru", KZ: "ru", KG: "ru", UZ: "ru", TJ: "ru", TM: "ru", AM: "ru",
    AZ: "ru", MD: "ru",
    SA: "ar", AE: "ar", QA: "ar", KW: "ar", BH: "ar", OM: "ar", EG: "ar", JO: "ar",
    LB: "ar", IQ: "ar", MA: "ar", DZ: "ar", TN: "ar", LY: "ar", SY: "ar", YE: "ar", SD: "ar",
    DE: "de", AT: "de", CH: "de", LI: "de",
    PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
    ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", EC: "es",
    GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es", SV: "es", NI: "es",
    CR: "es", PA: "es", UY: "es"
  };
  function isLikelyBot() {
    return /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|slackbot|discordbot|linkedinbot|twitterbot|googlebot|bingbot|yandex|baiduspider|duckduckbot|applebot|semrush|ahrefsbot|mj12bot|petalbot|pingdom|lighthouse|headlesschrome/i.test(navigator.userAgent || "");
  }
  async function initGeoRedirect() {
    if (currentPageLang() !== "tr") return;
    if (isLikelyBot()) return;
    let manual = null, done = null;
    try {
      manual = localStorage.getItem(LANG_MANUAL_KEY);
      done = sessionStorage.getItem(GEO_REDIRECT_DONE_KEY);
    } catch (e) {}
    if (manual || done) return;
    try {
      const res = await fetch("/cdn-cgi/trace", { cache: "no-store" });
      if (!res.ok) return;
      const text = await res.text();
      const m = text.match(/^loc=([A-Z]{2})$/m);
      if (!m) return;
      const country = m[1];
      const lang = COUNTRY_TO_LANG[country];
      if (!lang || lang === "tr") return;
      try { sessionStorage.setItem(GEO_REDIRECT_DONE_KEY, "1"); } catch (e) {}
      const path = window.location.pathname;
      const filename = (path === "/" || path === "") ? "" : path.replace(/^\//, "");
      window.location.replace("/" + lang + "/" + filename + window.location.search);
    } catch (e) {}
  }

  function initLangSuggestion() {
    if (currentPageLang() !== "tr") return;
    const preferred = preferredBrowserLang();
    if (!preferred || preferred === "tr") return;
    if (localStorage.getItem(LANG_SUGGESTION_DISMISSED_KEY) === preferred) return;
    const copy = LANG_SUGGESTION_TEXT[preferred];
    if (!copy) return;

    const path = window.location.pathname;
    const filename = (path === "/" || path === "") ? "" : path.replace(/^\//, "");
    const targetHref = "/" + preferred + "/" + filename;

    const bar = document.createElement("div");
    bar.className = "lang-suggestion-bar";
    bar.innerHTML = `
      <span>${copy.msg}</span>
      <a href="${targetHref}" class="lang-suggestion-cta">${copy.cta}</a>
      <button type="button" class="lang-suggestion-close" aria-label="Close">&times;</button>
    `;
    document.body.appendChild(bar);
    requestAnimationFrame(() => bar.classList.add("is-visible"));
    bar.querySelector(".lang-suggestion-close").addEventListener("click", () => {
      localStorage.setItem(LANG_SUGGESTION_DISMISSED_KEY, preferred);
      bar.classList.remove("is-visible");
      setTimeout(() => bar.remove(), 300);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initGeoRedirect();
    initLangSwitch();
    initMobileNav();
    initDropdown();
    initLangCompact();
    initHeaderScroll();
    initActiveNav();
    initForm("contact-form", "form-success", "form-error", "contact.form_submit", "contact.form_sending");
    initForm("quote-form", "quote-form-success", "quote-form-error", "configurator.quote_form.submit", "configurator.quote_form.sending");
    initForm("vip-form", "vip-form-success", "vip-form-error", "configurator.vip.submit", "configurator.vip.sending");
    initStageColHeightSync();
    initYear();
    initHeroSlider();
    initWhatsAppButton();
    initStickyCta();
    initReveal();
    applyLang(currentPageLang());
    initLangSuggestion();
  });
})();
