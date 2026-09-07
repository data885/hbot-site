(function () {
  "use strict";

  // Ürün fotoğrafları (assets/img/models/**) değiştiğinde bump edilir — tarayıcı
  // eski görseli sonsuza dek cache'lemesin diye (bkz. kullanıcı raporu: yeni Dubai
  // fotoğrafı ve watermark temizliği canlıda "değişmemiş" görünüyordu, sebep buydu).
  const IMG_V = "5";
  const LANG_KEY = "hbot_lang";
  const SUPPORTED = ["en", "tr", "ar", "ru", "es", "pt", "de"];
  const PDF_DATE_LOCALE = { tr: "tr-TR", en: "en-GB", ru: "ru-RU", ar: "ar", es: "es-ES", pt: "pt-PT", de: "de-DE" };

  /* İletişim ve WhatsApp hattı — numara ham metin olarak JS kaynağında durmasın diye
     ters çevrilmiş halde tutulup kullanılırken çözülüyor (basit kazıma botlarına karşı) */
  const _PHONE_DIGITS = "300705910509".split("").reverse().join("");
  const WHATSAPP_NUMBER = _PHONE_DIGITS;
  const CONTACT_PHONE_TEL = "+" + _PHONE_DIGITS;
  const CONTACT_PHONE_DISPLAY = "+90 501 950 7003";

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

  const MODEL_ICON = { "solo-lounge": "lying", solo: "oneSeat", duo: "twoSeat", "duo-plus": "fourSeat", "quad-cube": "fourSeat", nexus: "nexus" };
  const ADDON_ICON = { massage: "massage", leather: "leather", entertainment: "entertainment", finish: "finish", uvc: "uvc", "backup-o2": "backupO2", warranty: "warranty", install: "install" };
  const PILLAR_ICON = { connect: "connect", os: "os", ai: "ai", sync: "sync", guard: "guard", battery: "battery", pulseOx: "pulseOx" };

  /* Kullanım alanı bilgi pencereleri. Metinler tanı/tedavi vaadi kurmaz;
     yerleşik acil endikasyonlarla araştırma/wellness alanlarını açıkça ayırır. */
  const INDICATION_DETAILS = {
    tr: {
      antiaging: "HBOT, oksijenlenme ve doku yanıtı üzerindeki etkileri nedeniyle cilt görünümü ve sağlıklı yaş alma araştırmalarında incelenmektedir. Bulgular umut verici olsa da anti-aging amacıyla standart ve garanti edilmiş bir tedavi olarak kabul edilmez.",
      jetlag: "Uzun uçuşlar sonrasında hissedilen yorgunluk ve toparlanma amacıyla HBOT'a ilgi vardır. Jetlag için kanıtlar henüz sınırlıdır; uyku düzeni, sıvı alımı ve hekim değerlendirmesinin yerine geçmez.",
      wound: "HBOT, seçilmiş kronik veya iyileşmesi gecikmiş yaralarda doku oksijenlenmesini desteklemek amacıyla multidisipliner yara bakımına eklenebilir. Yara tipi, dolaşım, enfeksiyon ve diyabet kontrolü birlikte değerlendirilmelidir.",
      eye: "Ani görme kaybı acil değerlendirme gerektirir. HBOT'un yeri altta yatan nedene ve tedaviye başlama zamanına bağlıdır; göz ve hiperbarik tıp uzmanı kararı olmadan acil müdahale geciktirilmemelidir.",
      decompression: "Dekompresyon hastalığı, dalış veya basınç değişimi sonrasında oluşabilen ve acil hiperbarik değerlendirme gerektiren yerleşik kullanım alanlarından biridir. Gecikmeden acil servis ve hiperbarik merkezle iletişim kurulmalıdır.",
      embolism: "Arteriyel hava veya gaz embolisi yaşamı tehdit eden bir acildir. Uygun vakalarda hiperbarik oksijen, acil tıbbi müdahale zincirinin parçası olarak uzman merkezde uygulanabilir.",
      poisoning: "Karbon monoksit zehirlenmesinde HBOT; maruziyet düzeyi, belirtiler, gebelik ve nörolojik bulgular gibi ölçütlere göre değerlendirilebilir. Temiz havaya çıkmak yeterli kabul edilmemeli, acil tıbbi yardım alınmalıdır.",
      ear: "Ani sensörinöral işitme kaybında zaman kritik olabilir. HBOT, seçilmiş hastalarda KBB uzmanının planladığı standart tedaviye destek olarak değerlendirilebilir; işitme kaybında aynı gün uzman görüşü alınmalıdır.",
      bone: "Osteonekrozda HBOT bazı evre ve hasta gruplarında kemik oksijenlenmesini destekleyen yardımcı yaklaşım olarak değerlendirilebilir. Evreleme, görüntüleme ve ortopedi/hiperbarik tıp görüşü tedavi planını belirler.",
      burn: "Seçilmiş ciddi termal yanıklarda HBOT, ödem ve doku hasarı yönetimine destek amacıyla uzman merkezlerde düşünülebilir. İlk yardım, yanık merkezi değerlendirmesi ve standart cerrahi/medikal bakımın yerine geçmez.",
      gangrene: "Gazlı kangren hızla ilerleyen, yaşamı tehdit eden bir enfeksiyondur. HBOT yalnız acil cerrahi, antibiyotik ve yoğun bakım yaklaşımına ek olarak uzman merkezde uygulanır.",
      blood: "Ağır kan kaybı veya ciddi anemide HBOT, transfüzyonun mümkün olmadığı ya da yetersiz kaldığı çok seçilmiş durumlarda geçici oksijen desteği amacıyla değerlendirilebilir. Bu, yoğun bakım düzeyinde acil bir karardır.",
      brain: "Oksijensiz kalmaya bağlı beyin hasarında HBOT araştırılmaktadır; sonuçlar nedene, hasarın süresine ve müdahale zamanına göre değişir. Rutin ve kesinleşmiş bir kullanım olarak sunulamaz.",
      smoke: "Akut duman maruziyeti karbon monoksit ve bazen siyanür zehirlenmesi riski taşır. Kişi iyi görünse bile acil değerlendirme gerekir; HBOT kararı klinik bulgular ve uzman değerlendirmesiyle verilir."
    },
    en: {
      antiaging: "HBOT is being studied for skin appearance and healthy ageing because of its effects on oxygen delivery and tissue responses. Findings are promising but it is not an established or guaranteed anti-ageing treatment.",
      jetlag: "There is growing interest in HBOT for fatigue and recovery after long-distance travel. Evidence for jet lag remains limited and it does not replace sleep scheduling, hydration or medical assessment.",
      wound: "HBOT may be added to multidisciplinary wound care in selected chronic or difficult-to-heal wounds to support tissue oxygenation. Wound type, circulation, infection and diabetes control must be assessed together.",
      eye: "Sudden loss of vision requires emergency assessment. The role of HBOT depends on the underlying cause and treatment timing; urgent ophthalmology care must never be delayed.",
      decompression: "Decompression sickness is an established emergency indication for hyperbaric evaluation after diving or pressure exposure. Emergency services and a hyperbaric centre should be contacted without delay.",
      embolism: "Arterial air or gas embolism is a life-threatening emergency. In appropriate cases, HBOT can form part of the emergency treatment pathway at a specialist centre.",
      poisoning: "For carbon monoxide poisoning, HBOT may be considered according to exposure, symptoms, pregnancy and neurological findings. Moving to fresh air is not enough; urgent medical care is required.",
      ear: "Time may be critical in sudden sensorineural hearing loss. HBOT can be considered as an adjunct to specialist-directed standard care in selected patients; same-day ENT assessment is recommended.",
      bone: "In osteonecrosis, HBOT may be considered as an adjunct for selected stages and patient groups. Imaging, disease stage and orthopaedic/hyperbaric specialist review guide the plan.",
      burn: "In selected severe thermal burns, HBOT may be considered at specialist centres to support oedema and tissue-injury management. It never replaces first aid, burn-centre assessment or standard surgical and medical care.",
      gangrene: "Gas gangrene is a rapidly progressive, life-threatening infection. HBOT is used only as an adjunct to urgent surgery, antibiotics and intensive care at a specialist centre.",
      blood: "In severe blood loss or profound anaemia, HBOT may be considered in exceptional cases when transfusion is unavailable or insufficient. This is an intensive-care emergency decision.",
      brain: "HBOT is being researched in brain injury caused by oxygen deprivation; outcomes vary with the cause, duration and timing of intervention. It cannot be presented as a routine established use.",
      smoke: "Acute smoke exposure may involve carbon monoxide and sometimes cyanide poisoning. Emergency assessment is needed even if the person appears well; HBOT decisions are based on clinical findings and specialist review."
    }
  };
  const INDICATION_STATUS = {
    antiaging: "emerging", jetlag: "emerging", wound: "selected", eye: "urgent",
    decompression: "established", embolism: "established", poisoning: "established",
    ear: "selected", bone: "selected", burn: "selected", gangrene: "established",
    blood: "selected", brain: "emerging", smoke: "urgent"
  };
  const INDICATION_SOURCES = {
    antiaging: [
      { title: "Prospective healthy-ageing trial — PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/33206062/" }
    ],
    jetlag: [
      { title: "CDC Yellow Book — Jet Lag Disorder", url: "https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html" }
    ],
    wound: [
      { title: "CMS — Hyperbaric Oxygen Therapy (NCD 20.29)", url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=12" },
      { title: "UHMS — Accepted HBOT indications", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    eye: [
      { title: "UHMS — Central retinal artery occlusion", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    decompression: [
      { title: "UHMS — Decompression sickness", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    embolism: [
      { title: "UHMS — Air or gas embolism", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    poisoning: [
      { title: "CDC — Clinical guidance for carbon monoxide poisoning", url: "https://www.cdc.gov/carbon-monoxide/hcp/clinical-guidance/index.html" },
      { title: "UHMS — Carbon monoxide poisoning", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    ear: [
      { title: "Systematic review and meta-analysis — PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/34709348/" },
      { title: "UHMS — Sudden sensorineural hearing loss", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    bone: [
      { title: "UHMS — Avascular necrosis and refractory osteomyelitis", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    burn: [
      { title: "UHMS — Acute thermal burn injury", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    gangrene: [
      { title: "UHMS — Gas gangrene", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    blood: [
      { title: "UHMS — Severe anaemia", url: "https://www.uhms.org/resources/featured-resources/hbo-indications.html" }
    ],
    brain: [
      { title: "Systematic review of acute severe traumatic brain injury — PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/29132229/" }
    ],
    smoke: [
      { title: "CDC — Clinical guidance for carbon monoxide poisoning", url: "https://www.cdc.gov/carbon-monoxide/hcp/clinical-guidance/index.html" }
    ]
  };
  const INDICATION_MODAL_COPY = {
    tr: { eyebrow: "KULLANIM ALANI BİLGİSİ", status: "Klinik durum", sources: "Kaynaklar ve ilgili yayınlar", safety: "Önemli güvenlik notu", fallback: "HBOT'un bu alandaki rolü; altta yatan neden, belirtilerin süresi ve kişinin klinik durumuna göre değişir. Uygunluk, uzman değerlendirmesi sonrasında belirlenmelidir.", disclaimer: "Bu içerik genel bilgilendirme amaçlıdır; tanı, tedavi protokolü veya tıbbi tavsiye değildir. HBOT uygunluğu ve seans planı yetkili sağlık profesyoneli tarafından belirlenmelidir.", close: "Pencereyi kapat", cta: "Uzman ekibimizle görüşün", statuses: { established: "Yerleşik acil/klinik kullanım", selected: "Seçilmiş vakalarda yardımcı kullanım", emerging: "Araştırılan / sınırlı kanıt", urgent: "Acil uzman değerlendirmesi gerekir" } },
    en: { eyebrow: "USE-CASE INFORMATION", status: "Clinical context", sources: "Sources and related publications", safety: "Important safety note", fallback: "The role of HBOT in this area varies with the underlying cause, duration of symptoms and the person's clinical condition. Suitability should be determined after specialist assessment.", disclaimer: "This content is general information, not a diagnosis, treatment protocol or medical advice. HBOT suitability and session planning must be determined by a qualified healthcare professional.", close: "Close dialog", cta: "Talk to our specialist team", statuses: { established: "Established emergency/clinical use", selected: "Adjunct use in selected cases", emerging: "Emerging / limited evidence", urgent: "Urgent specialist assessment required" } },
    ru: { eyebrow: "ИНФОРМАЦИЯ О ПРИМЕНЕНИИ", status: "Клинический контекст", sources: "Источники и публикации", safety: "Важное примечание по безопасности", fallback: "Роль HBOT в этой области зависит от основной причины, длительности симптомов и клинического состояния человека. Целесообразность определяется после оценки специалистом.", disclaimer: "Материал носит общий информационный характер и не является диагнозом, протоколом лечения или медицинской консультацией. Решение о применении HBOT принимает квалифицированный медицинский специалист.", close: "Закрыть окно", cta: "Связаться с нашей командой", statuses: { established: "Признанное экстренное/клиническое применение", selected: "Дополнительное применение в отдельных случаях", emerging: "Исследуется / ограниченные данные", urgent: "Требуется срочная оценка специалиста" } },
    ar: { eyebrow: "معلومات مجال الاستخدام", status: "السياق السريري", sources: "المصادر والمنشورات ذات الصلة", safety: "ملاحظة سلامة مهمة", fallback: "يختلف دور العلاج بالأكسجين عالي الضغط في هذا المجال بحسب السبب الأساسي ومدة الأعراض والحالة السريرية للشخص. ويجب تحديد الملاءمة بعد تقييم مختص.", disclaimer: "هذا المحتوى للتوعية العامة ولا يعد تشخيصاً أو بروتوكول علاج أو نصيحة طبية. يجب أن يحدد مختص صحي مؤهل مدى ملاءمة العلاج وخطة الجلسة.", close: "إغلاق النافذة", cta: "تحدث مع فريقنا المختص", statuses: { established: "استخدام طارئ/سريري معتمد", selected: "استخدام مساعد في حالات مختارة", emerging: "قيد البحث / أدلة محدودة", urgent: "يتطلب تقييماً عاجلاً من مختص" } },
    es: { eyebrow: "INFORMACIÓN DEL ÁREA DE USO", status: "Contexto clínico", sources: "Fuentes y publicaciones relacionadas", safety: "Nota importante de seguridad", fallback: "El papel de la HBOT en esta área depende de la causa, la duración de los síntomas y la situación clínica de cada persona. La idoneidad debe determinarse tras una valoración especializada.", disclaimer: "Este contenido es información general y no constituye diagnóstico, protocolo terapéutico ni consejo médico. La idoneidad de la HBOT debe determinarla un profesional sanitario cualificado.", close: "Cerrar ventana", cta: "Hable con nuestro equipo", statuses: { established: "Uso de urgencia/clínico establecido", selected: "Uso complementario en casos seleccionados", emerging: "En investigación / evidencia limitada", urgent: "Requiere valoración urgente" } },
    pt: { eyebrow: "INFORMAÇÃO DA ÁREA DE UTILIZAÇÃO", status: "Contexto clínico", sources: "Fontes e publicações relacionadas", safety: "Nota de segurança importante", fallback: "O papel da HBOT nesta área varia conforme a causa, a duração dos sintomas e a condição clínica da pessoa. A adequação deve ser definida após avaliação especializada.", disclaimer: "Este conteúdo é informação geral e não constitui diagnóstico, protocolo de tratamento ou aconselhamento médico. A adequação da HBOT deve ser definida por um profissional de saúde qualificado.", close: "Fechar janela", cta: "Fale com a nossa equipa", statuses: { established: "Utilização de emergência/clínica estabelecida", selected: "Utilização adjuvante em casos selecionados", emerging: "Em investigação / evidência limitada", urgent: "Requer avaliação urgente" } },
    de: { eyebrow: "INFORMATION ZUM ANWENDUNGSBEREICH", status: "Klinischer Kontext", sources: "Quellen und weiterführende Publikationen", safety: "Wichtiger Sicherheitshinweis", fallback: "Die Rolle der HBOT in diesem Bereich hängt von der Ursache, der Dauer der Beschwerden und dem klinischen Zustand ab. Die Eignung sollte nach fachärztlicher Beurteilung festgestellt werden.", disclaimer: "Dieser Inhalt dient der allgemeinen Information und ist keine Diagnose, kein Behandlungsprotokoll und keine medizinische Beratung. Die Eignung für HBOT muss von qualifiziertem medizinischem Fachpersonal beurteilt werden.", close: "Fenster schließen", cta: "Mit unserem Expertenteam sprechen", statuses: { established: "Etablierte Notfall-/klinische Anwendung", selected: "Ergänzende Anwendung in ausgewählten Fällen", emerging: "In Erforschung / begrenzte Evidenz", urgent: "Dringende fachärztliche Beurteilung erforderlich" } }
  };

  /* Tokyo Plus ayrı ürün sayfası, teknik kapsamı ve filmi olan altıncı modeldir. */
  const MODEL_ORDER = ["solo-lounge", "solo", "duo", "duo-plus", "quad-cube", "nexus"];
  const MODEL_KEY_MAP = { "solo-lounge": "soloLounge", solo: "solo", duo: "duo", "duo-plus": "duoPlus", "quad-cube": "quadCube", nexus: "nexus" };
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
     eklenmiyor. Eski Quad varyantı kaldırıldı (Quad-Cube tek 4 kişilik model). */
  const MODEL_PRICING = {
    "solo-lounge": { base: 29900, tiers: [{ ata: "1.3 ATA", price: 0 }, { ata: "1.5 ATA", price: 0 }] },
    solo: { base: 69900, tiers: [{ ata: "1.3 ATA", price: 0 }, { ata: "1.5 ATA", price: 0 }] },
    duo: { base: 119900, tiers: [{ ata: "1.3 ATA", price: 0 }, { ata: "1.5 ATA", price: 0 }] },
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
  const PRESSURE_RANGE = { "solo-lounge": "1.3 – 1.5 ATA", solo: "1.3 – 1.5 ATA", duo: "1.3 – 1.5 ATA", "duo-plus": "2.5 – 6.0 ATA", "quad-cube": "2.5 – 6.0 ATA", nexus: "2.5 – 6.0 ATA" };

  /* Kademeli koltuk fiyatlaması: Nexus ve Duo Plus için taban fiyat koltuk sayısına göre
     değişir (eklenen her koltuk için ayrı ücret yerine sabit fiyat kademeleri). */
  const SEAT_TIERS = {
    nexus: [{ seats: 6, price: 259900 }, { seats: 8, price: 280000 }, { seats: 10, price: 300000 }, { seats: 12, price: 330000 }],
    "duo-plus": [{ seats: 2, price: 119900 }, { seats: 4, price: 170000 }]
  };
  const NEXUS_BASE_SEATS = SEAT_TIERS.nexus[0].seats;
  const NEXUS_MAX_SEATS = SEAT_TIERS.nexus[SEAT_TIERS.nexus.length - 1].seats;

  /* ---------------- Currency (live exchange rates, EUR base) ---------------- */
  const CURRENCIES = ["EUR", "USD", "GBP", "AED", "RUB", "TRY"];
  const CURRENCY_SYMBOLS = { USD: "$", GBP: "£", EUR: "€", AED: "AED", RUB: "₽", TRY: "₺" };
  const CURRENCY_LABELS = { TRY: "TL" };
  const FX_CACHE_KEY = "hbot_fx_rates_v3";
  const FX_CACHE_TTL = 6 * 60 * 60 * 1000;
  let currentCurrency = "EUR";
  let exchangeRates = { EUR: 1, USD: 1.09, GBP: 0.85, AED: 4.0, RUB: 98, TRY: 40 };

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
            RUB: data.rates.RUB || exchangeRates.RUB,
            TRY: data.rates.TRY || exchangeRates.TRY
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
      "hbot-info": "hbotInfo", "trust-safety": "trustSafety", blog: "blog", configurator: "configurator", contact: "contact"
    };
    /* Eskiden bilinmeyen data-page değerleri sessizce "home" a düşüyordu —
       bu da yeni/tekil SEO sayfalarının (manufacturer, legal, vb.) kendi
       <title>/description'ını çalışma zamanında ana sayfanınkiyle
       eziyordu. Eşleşme yoksa null dön: applyStaticLang o durumda sayfanın
       kendi statik meta etiketlerine dokunmadan bırakır. */
    return map[page] || null;
  }

  /* ---------------- Shared: models nav dropdown ---------------- */
  function renderModelsMenus(dict) {
    const menu = dict.common.models_menu;
    document.querySelectorAll("[data-models-menu]").forEach((container) => {
      const isNavPanel = container.classList.contains("nav-dropdown-panel");
      container.innerHTML = MODEL_ORDER.map((key) => {
        const label = menu[MODEL_KEY_MAP[key]];
        const media = isNavPanel
          ? `<img class="nav-model-thumb" src="/assets/img/models/${MODEL_CARD_IMG[key] || "real/oslo-real"}.webp?v=${IMG_V}" alt="" loading="lazy">`
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
          <img class="sector-card-img" src="/assets/img/models/${MODEL_CARD_IMG[key] || "real/oslo-real"}.webp?v=${IMG_V}" alt="${s.title}" loading="lazy">
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
      head.innerHTML = `<tr><th>${cmp.col_feature}</th><th>${cmp.col_competitor}</th><th>${cmp.col_city}</th></tr>`;
    }
    c.innerHTML = cmp.rows.map((row) => `
      <tr>
        <td>${row.feature}</td>
        <td><span class="compare-cell-no">${row.competitor}</span></td>
        <td><span class="compare-cell-yes">${row.city}</span></td>
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

  let lastIndicationTrigger = null;

  function ensureIndicationModal() {
    let modal = document.getElementById("indication-info-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "indication-info-modal";
    modal.className = "indication-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="indication-modal-backdrop" data-indication-close></div>
      <section class="indication-modal-panel" role="dialog" aria-modal="true" aria-labelledby="indication-modal-title" aria-describedby="indication-modal-summary">
        <button type="button" class="indication-modal-close" data-indication-close aria-label="Close">&times;</button>
        <div class="indication-modal-head">
          <div class="indication-modal-icon" data-indication-icon></div>
          <div><span class="indication-modal-eyebrow" data-indication-eyebrow></span><h2 id="indication-modal-title"></h2></div>
        </div>
        <p class="indication-modal-summary" id="indication-modal-summary"></p>
        <div class="indication-modal-status"><span data-indication-status-label></span><strong data-indication-status></strong></div>
        <div class="indication-modal-sources"><h3 data-indication-sources-title></h3><ul data-indication-sources></ul></div>
        <div class="indication-modal-safety"><h3 data-indication-safety-title></h3><p data-indication-disclaimer></p></div>
        <a href="iletisim.html#contact-form" class="btn btn-primary" data-indication-cta></a>
      </section>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-indication-close]").forEach((el) => el.addEventListener("click", closeIndicationModal));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) closeIndicationModal();
    });
    return modal;
  }

  function closeIndicationModal() {
    const modal = document.getElementById("indication-info-modal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("indication-modal-open");
    if (lastIndicationTrigger) lastIndicationTrigger.focus();
  }

  function openIndicationModal(item, trigger) {
    const modal = ensureIndicationModal();
    const copy = INDICATION_MODAL_COPY[currentLang] || INDICATION_MODAL_COPY.en;
    const localizedDetails = INDICATION_DETAILS[currentLang] || {};
    const summary = localizedDetails[item.icon] || copy.fallback || INDICATION_DETAILS.en[item.icon] || copy.disclaimer;
    const statusKey = INDICATION_STATUS[item.icon] || "selected";
    lastIndicationTrigger = trigger;
    modal.querySelector("[data-indication-icon]").innerHTML = ICONS[item.icon] || "";
    modal.querySelector("[data-indication-eyebrow]").textContent = copy.eyebrow;
    modal.querySelector("#indication-modal-title").textContent = item.label;
    modal.querySelector("#indication-modal-summary").textContent = summary;
    modal.querySelector("[data-indication-status-label]").textContent = copy.status;
    modal.querySelector("[data-indication-status]").textContent = copy.statuses[statusKey];
    modal.querySelector("[data-indication-sources-title]").textContent = copy.sources;
    const sourceList = modal.querySelector("[data-indication-sources]");
    sourceList.replaceChildren();
    (INDICATION_SOURCES[item.icon] || []).forEach((source) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = source.title;
      listItem.appendChild(link);
      sourceList.appendChild(listItem);
    });
    modal.querySelector("[data-indication-safety-title]").textContent = copy.safety;
    modal.querySelector("[data-indication-disclaimer]").textContent = copy.disclaimer;
    modal.querySelector("[data-indication-cta]").textContent = copy.cta;
    modal.querySelector(".indication-modal-close").setAttribute("aria-label", copy.close);
    modal.hidden = false;
    document.body.classList.add("indication-modal-open");
    requestAnimationFrame(() => modal.querySelector(".indication-modal-close").focus());
  }

  /* Ana sayfadaki grid artık tıbbi endikasyon listesi değil, ürün serisi anlatımı.
     Gerekçe: endikasyon listesini ana sayfada göstermek, ürünün o durumları
     tedavi ettiği izlenimi veriyordu. Endikasyonlar yalnız HBOT Nedir sayfasında,
     eğitim çerçevesinde kalıyor. */
  function renderSeriesGrid(dict, containerId) {
    const c = document.getElementById(containerId);
    const series = dict.home && dict.home.series;
    if (!c || !series || !series.items) return;
    c.innerHTML = series.items.map((it) => `
      <div class="indication-card">
        <div class="indication-icon">${ICONS[it.icon] || ""}</div>
        <span>${it.label}</span>
      </div>
    `).join("");
  }

  function renderIndicationsGrid(dict, containerId, limit) {
    const c = document.getElementById(containerId);
    if (!c || !dict.hbotInfo) return;
    let items = dict.hbotInfo.indications.items;
    if (limit) items = items.slice(0, limit);
    c.innerHTML = items.map((item, index) => `
      <button type="button" class="indication-card" data-indication-index="${index}" aria-haspopup="dialog">
        <div class="indication-icon">${ICONS[item.icon]}</div>
        <span>${item.label}</span>
        <span class="indication-card-arrow" aria-hidden="true">→</span>
      </button>
    `).join("");
    c.querySelectorAll("[data-indication-index]").forEach((button) => {
      button.addEventListener("click", () => openIndicationModal(items[Number(button.dataset.indicationIndex)], button));
    });
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
  const REF_CODES = ["HBOT-REF-2026", "CITYTECH-2026", "ALMITA-2026"];
  const REF_DISCOUNT_PCT = 5;
  const CRM_ENDPOINT = "https://crmalmita.com/api/leads"; // public lead API yoksa sessiz fallback
  const configState = { usageType: "home", model: "solo-lounge", tierIndex: 0, addons: new Set(), nexusSeats: NEXUS_BASE_SEATS, color: "pearl-white", chamberStyle: "solid", interiorColor: "cream", seatColor: "konyak", seatTouched: false, stageView: "exterior", spinIdx: 0, discountPct: 0, refCode: "" };
  /* Kullanım alanı -> izinli model id'leri. Ev tipi ve kurumsal modeller
     konfigüratörde birbirinden kesin olarak ayrılır. */
  const USAGE_MODELS = {
    home: ["solo-lounge", "solo", "duo"],
    institutional: ["duo-plus", "quad-cube", "nexus"]
  };

  function resetModelVisualState() {
    if (!colorWorksFor(configState.model, configState.color)) configState.color = "pearl-white";
    configState.interiorColor = "cream";
    configState.seatColor = configState.model === "solo"
      ? "cream"
      : (configState.model === "duo" || configState.model === "duo-plus" || configState.model === "quad-cube" ? "krem" : "konyak");
    configState.seatTouched = false;
    configState.stageView = "exterior";
  }

  function renderAllConfigControls(dict) {
    renderUsageType(dict);
    renderConfigModels(dict);
    renderConfigStyles(dict);
    renderConfigColors(dict);
    renderConfigInteriorColors(dict);
    renderConfigSeatColors(dict);
    renderConfigPressure(dict);
    renderNexusSeatSection(dict);
    renderConfigAddons(dict);
    renderConfigSummary(dict);
  }

  /* Tek doğruluk kaynağı: her model yalnız kendi sabit ana görseli ve o görsele
     tam oturan maskeleri kullanır. Renk seçimi hiçbir zaman başka bir modelin
     hazır fotoğrafına yönlenmez. */
  const STAGE_RENDER_MANIFEST = Object.freeze({
    "solo-lounge": { exterior: "real/oslo-real", exteriorMask: "masks/ext-lounge", interior: "real/oslo-lounge-interior", interiorMask: "masks/int-lounge", seatMask: "masks/seat-lounge" },
    solo: { exterior: "real/dubai-real", exteriorMask: "masks/ext-oslo", interior: "real/oslo-interior", interiorMask: "masks/int-oslo", seatMask: "masks/seat-oslo" },
    duo: { exterior: "real/tokyo-real", exteriorMask: "masks/ext-duo", interior: "real/duo-interior", interiorMask: "masks/int-duo", seatMask: "masks/seat-duo" },
    "duo-plus": { exterior: "real/tokyo-plus-real", exteriorMask: "masks/ext-duo", interior: "real/duo-interior", interiorMask: "masks/int-duo", seatMask: "masks/seat-duo" },
    "quad-cube": { exterior: "real/milano-config", exteriorMask: "masks/ext-quadcube2", interior: "real/milano-config", interiorMask: "masks/int-quadcube", seatMask: "masks/seat-quadcube" },
    nexus: { exterior: "real/geneva-real", exteriorMask: null, interior: "real/geneva-interior", interiorMask: "masks/int-nexus", seatMask: "masks/seat-nexus" }
  });
  const REAL_STAGE = Object.fromEntries(Object.entries(STAGE_RENDER_MANIFEST).map(([id, item]) => [id, item.exterior]));
  const REAL_INTERIOR = Object.fromEntries(Object.entries(STAGE_RENDER_MANIFEST).map(([id, item]) => [id, item.interior]));

  /* Dubai üç eksenli statik render sistemi. Bu veri dosyası üretim manifestinden
     otomatik oluşturulur; tarayıcıda boya/tint yapılmaz. Her anahtar
     dış|iç|koltuk sırasındadır ve yalnız doğrulanmış tam renderı gösterir. */
  const DUBAI_RENDER_MANIFEST = window.HBOT_DUBAI_RENDER_MANIFEST || Object.freeze({ combinations: Object.freeze({}) });
  const DUBAI_RENDER_COMBINATIONS = Object.freeze(DUBAI_RENDER_MANIFEST.combinations || {});
  function dubaiCombinationKey(exteriorId, interiorId, seatId) {
    return `${exteriorId}|${interiorId}|${seatId}`;
  }
  function dubaiRenderKey(exteriorId, interiorId, seatId) {
    return DUBAI_RENDER_COMBINATIONS[dubaiCombinationKey(exteriorId, interiorId, seatId)] || "";
  }
  function dubaiExteriorIds() {
    return new Set(Object.keys(DUBAI_RENDER_COMBINATIONS).map((key) => key.split("|")[0]));
  }
  function dubaiInteriorIds(exteriorId) {
    return new Set(Object.keys(DUBAI_RENDER_COMBINATIONS)
      .map((key) => key.split("|"))
      .filter((parts) => parts[0] === exteriorId)
      .map((parts) => parts[1]));
  }
  function dubaiSeatIds(exteriorId, interiorId) {
    return new Set(Object.keys(DUBAI_RENDER_COMBINATIONS)
      .map((key) => key.split("|"))
      .filter((parts) => parts[0] === exteriorId && parts[1] === interiorId)
      .map((parts) => parts[2]));
  }
  function normalizeDubaiSelection() {
    if (configState.model !== "solo") return;
    const interiors = dubaiInteriorIds(configState.color);
    if (!interiors.has(configState.interiorColor)) configState.interiorColor = interiors.values().next().value || "cream";
    const seats = dubaiSeatIds(configState.color, configState.interiorColor);
    if (!seats.has(configState.seatColor)) configState.seatColor = seats.values().next().value || configState.interiorColor;
  }

  /* Milano için hazırlanmış tam matris: 15 dış renk x 3 iç döşeme x 3 koltuk. */
  const MILANO_RENDER_MANIFEST = window.HBOT_MILANO_RENDER_MANIFEST || Object.freeze({ combinations: Object.freeze({}) });
  const MILANO_RENDER_COMBINATIONS = Object.freeze(MILANO_RENDER_MANIFEST.combinations || {});
  function milanoRenderKey(exteriorId, interiorId, seatId) {
    return MILANO_RENDER_COMBINATIONS[`${exteriorId}|${interiorId}|${seatId}`] || "";
  }
  function milanoExteriorIds() {
    return new Set(Object.keys(MILANO_RENDER_COMBINATIONS).map((key) => key.split("|")[0]));
  }
  function milanoInteriorIds(exteriorId) {
    return new Set(Object.keys(MILANO_RENDER_COMBINATIONS)
      .map((key) => key.split("|"))
      .filter((parts) => parts[0] === exteriorId)
      .map((parts) => parts[1]));
  }
  function milanoSeatIds(exteriorId, interiorId) {
    return new Set(Object.keys(MILANO_RENDER_COMBINATIONS)
      .map((key) => key.split("|"))
      .filter((parts) => parts[0] === exteriorId && parts[1] === interiorId)
      .map((parts) => parts[2]));
  }
  function normalizeMilanoSelection() {
    if (configState.model !== "quad-cube") return;
    const interiors = milanoInteriorIds(configState.color);
    if (!interiors.has(configState.interiorColor)) configState.interiorColor = interiors.values().next().value || "cream";
    const seats = milanoSeatIds(configState.color, configState.interiorColor);
    if (!seats.has(configState.seatColor)) configState.seatColor = seats.values().next().value || "krem";
  }

  /* Onaylanmış statik renk önizlemeleri. Yalnızca aynı ana referanstan,
     aynı kadraj ve sahneyle üretilen dosyalar bu manifest'e alınır. Bir renk
     burada yoksa modelin kanonik fotoğrafına güvenli biçimde geri dönülür. */
  const APPROVED_COLOR_RENDER_MANIFEST = Object.freeze({
    duo: Object.freeze({
      "pearl-white": "colors/tokyo/pearl-white-wall-logo-v2",
      "mat-siyah": "colors/tokyo/mat-siyah-wall-logo-v2",
      antrasit: "colors/tokyo/antrasit-wall-logo-v2",
      "gece-laciverti": "colors/tokyo/gece-laciverti-wall-logo-v2",
      bordo: "colors/tokyo/bordo-wall-logo-v2",
      sampanya: "colors/tokyo/sampanya-wall-logo-v2",
      grafit: "colors/tokyo/grafit-wall-logo-v2",
      bronz: "colors/tokyo/bronz-wall-logo-v2",
      zumrut: "colors/tokyo/zumrut-wall-logo-v2",
      bej: "colors/tokyo/bej-wall-logo-v2"
    }),
    "duo-plus": Object.freeze({
      "pearl-white": "colors/tokyo/pearl-white-wall-logo-v2",
      "mat-siyah": "colors/tokyo/mat-siyah-wall-logo-v2",
      antrasit: "colors/tokyo/antrasit-wall-logo-v2",
      "gece-laciverti": "colors/tokyo/gece-laciverti-wall-logo-v2",
      bordo: "colors/tokyo/bordo-wall-logo-v2",
      sampanya: "colors/tokyo/sampanya-wall-logo-v2",
      grafit: "colors/tokyo/grafit-wall-logo-v2",
      bronz: "colors/tokyo/bronz-wall-logo-v2",
      zumrut: "colors/tokyo/zumrut-wall-logo-v2",
      bej: "colors/tokyo/bej-wall-logo-v2"
    }),
    "solo-lounge": Object.freeze({
      "pearl-white": "colors/oslo/pearl-white",
      "mat-siyah": "colors/oslo/mat-siyah",
      antrasit: "colors/oslo/antrasit",
      "gece-laciverti": "colors/oslo/gece-laciverti",
      bordo: "colors/oslo/bordo",
      sampanya: "colors/oslo/sampanya",
      grafit: "colors/oslo/grafit",
      bronz: "colors/oslo/bronz",
      zumrut: "colors/oslo/zumrut",
      bej: "colors/oslo/bej",
      "adacayi-yesili": "colors/oslo/adacayi-yesili",
      turkuaz: "colors/oslo/turkuaz",
      "nane-yesili": "colors/oslo/nane-yesili",
      "tas-grisi": "colors/oslo/tas-grisi",
      fildisi: "colors/oslo/fildisi"
    })
  });

  /* Tokyo ve Tokyo Plus aynı onaylı kabin içi renk ailesini paylaşır.
     Bu dokuz dosya tarayıcıda boyanmaz; Tokyo iç fotoğrafına oturan ayrı
     iç döşeme ve koltuk maskeleriyle önceden hazırlanmıştır. */
  const TOKYO_INTERIOR_RENDER_MANIFEST = Object.freeze({
    "cream|krem": "colors/tokyo-interior/tokyo__int-cream__seat-krem__wall-logo-v1",
    "cream|lacivert": "colors/tokyo-interior/tokyo__int-cream__seat-lacivert__wall-logo-v1",
    "cream|bordo": "colors/tokyo-interior/tokyo__int-cream__seat-bordo__wall-logo-v1",
    "navy|krem": "colors/tokyo-interior/tokyo__int-navy__seat-krem__wall-logo-v1",
    "navy|lacivert": "colors/tokyo-interior/tokyo__int-navy__seat-lacivert__wall-logo-v1",
    "navy|bordo": "colors/tokyo-interior/tokyo__int-navy__seat-bordo__wall-logo-v1",
    "burgundy|krem": "colors/tokyo-interior/tokyo__int-burgundy__seat-krem__wall-logo-v1",
    "burgundy|lacivert": "colors/tokyo-interior/tokyo__int-burgundy__seat-lacivert__wall-logo-v1",
    "burgundy|bordo": "colors/tokyo-interior/tokyo__int-burgundy__seat-bordo__wall-logo-v1"
  });

  /* Tarayıcıda piksel boyama yapılmaz. Onaylı statik renk görseli varsa o,
     yoksa modelin kanonik fotoğrafı gösterilir. */
  /* 360° spin: seti TAMAMLANMIŞ modeller (yarım sette spin AKTİF EDİLMEZ — galeri görünümü kalır).
     Frame adı: spin/<model>/frame-00.webp .. frame-23.webp (24 kare, 15° adım). */
  const SPIN_FRAME_COUNT = 24;
  // duo (Tokyo) buradan çıkarıldı: spin kareleri maskesiz eşik-tabanlı profil
  // kullanıyordu (koltuk rengi gövdeyle aynı ton aralığına düşünce dış renk
  // seçince koltuk da boyanıyordu — bkz. kullanıcı bug raporu). Statik foto +
  // maskeli profile (masks/ext-duo, Tokyo Plus ile paylaşılan) düşerek düzeldi;
  // 24 spin karesinin her biri için ayrı maske gerektirmemek adına spin bilinçli
  // olarak kapatıldı.
  /* Konfigüratör renk önizlemesinde 24 tam çözünürlüklü karenin aynı anda
     boyanması arayüzü kilitliyordu. Model filmleri/galerileri yerinde kalır;
     burada güvenilir ve anlık statik renk önizlemesi kullanılır. */
  const SPIN_MODELS = Object.freeze({});
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
  let stageCurrentKey = "real/oslo-real";
  let stageCurrentSrc = "";
  let stageRequestedKey = "";
  let stageRequestedSrc = "";
  let stageRequestToken = 0;
  let stageDesiredVariant = "";
  /* Spin momentum'unu dışarıdan durdurma kancası — initSpin içinde atanır.
     Görsel hedefi değişirken (model/görünüm geçişi) yarım frame yazılmasını önler. */
  let stopSpinMomentum = () => {};

  function normalizeConfigStageView() {
    if (configState.model === "solo-lounge") configState.stageView = "exterior";
  }

  function currentStageTarget() {
    const manifest = STAGE_RENDER_MANIFEST[configState.model] || STAGE_RENDER_MANIFEST["solo-lounge"];
    if (configState.model === "solo") {
      normalizeDubaiSelection();
      const exactKey = dubaiRenderKey(configState.color, configState.interiorColor, configState.seatColor);
      if (exactKey) {
        /* Dubai exact kombinasyonları tam kabin ürün renderlarıdır. İç renk
           seçildiğinde bunları yakın plan iç mekân fotoğrafı gibi `cover`
           ile kırpmak duvar logosunu ve kabinin dış çerçevesini kesiyordu. */
        return { key: exactKey, filter: "none", interior: false, photo: true };
      }
    }
    if (configState.model === "quad-cube") {
      normalizeMilanoSelection();
      const exactKey = milanoRenderKey(configState.color, configState.interiorColor, configState.seatColor);
      if (exactKey) {
        return { key: exactKey, filter: "none", interior: false, photo: true };
      }
    }
    if ((configState.model === "duo" || configState.model === "duo-plus") && configState.stageView === "interior") {
      const exactKey = TOKYO_INTERIOR_RENDER_MANIFEST[`${configState.interiorColor}|${configState.seatColor}`];
      if (exactKey) return { key: exactKey, filter: "none", interior: true, photo: true };
    }
    if (configState.stageView === "interior") {
      return { key: manifest.interior, filter: "none", interior: true, photo: true };
    }
    const approvedByColor = APPROVED_COLOR_RENDER_MANIFEST[configState.model];
    const approvedKey = approvedByColor && approvedByColor[configState.color];
    return { key: approvedKey || manifest.exterior, filter: "none", interior: false, photo: true };
  }

  function updateConfigStage(dict) {
    const stage = document.getElementById("config-stage");
    if (!stage) return;
    const imgA = document.getElementById("stage-img-a");
    const imgB = document.getElementById("stage-img-b");
    if (!imgA || !imgB) return;

    /* Görünümü hedef çözülmeden ÖNCE normalleştir. Eski sırada Geneva bir kare
       dış görünüm, Oslo ise bir kare iç görünüm gösterebiliyordu. */
    normalizeConfigStageView();
    const target = currentStageTarget();
    const desiredVariant = target.interior
      ? `${target.key}|${configState.interiorColor}|${configState.seatTouched ? configState.seatColor : "seat-default"}`
      : `${target.key}|${configState.color}`;
    /* Boyanmış A görseli yüklenirken kullanıcı B rengini seçerse B'nin ham baz
       görseli mevcut src ile aynı olabilir. Variant token'ı yine de değişir ve
       geç kalan A yüklemesini iptal eder. */
    if (desiredVariant !== stageDesiredVariant) {
      stageDesiredVariant = desiredVariant;
      stageRequestToken++;
      stageRequestedKey = "";
      stageRequestedSrc = "";
    }
    // v12: modelin kendi baz görseli + tam maskesiyle üretilmiş renk önizlemesi
    const src = resolveStageSrc(target);

    const active = stageActiveImg === "a" ? imgA : imgB;
    const passive = stageActiveImg === "a" ? imgB : imgA;

    const applyMode = (img) => {
      img.classList.toggle("stage-img--interior", target.interior);
      img.classList.toggle("stage-img--photo", !!target.photo);
    };

    if (target.key !== stageCurrentKey || stageCurrentSrc !== src) {
      /* Cross-fade yalnız yeni görsel gerçekten yüklendikten sonra yapılır.
         Token, hızlı renk/model tıklamalarında geç biten eski isteğin güncel
         seçimin üstüne yazmasını engeller. */
      if (target.key !== stageRequestedKey || src !== stageRequestedSrc) {
        stageRequestedKey = target.key;
        stageRequestedSrc = src;
        const token = ++stageRequestToken;
        const loader = new Image();
        loader.onload = () => {
          if (token !== stageRequestToken) return;
          const liveActive = stageActiveImg === "a" ? imgA : imgB;
          const livePassive = stageActiveImg === "a" ? imgB : imgA;
          if (target.key !== stageCurrentKey) stopSpinMomentum();
          livePassive.src = src;
          livePassive.style.filter = target.filter;
          applyMode(livePassive);
          livePassive.classList.add("is-active");
          liveActive.classList.remove("is-active");
          stageActiveImg = stageActiveImg === "a" ? "b" : "a";
          stageCurrentKey = target.key;
          stageCurrentSrc = src;
        };
        loader.onerror = () => {
          if (token === stageRequestToken) {
            stageRequestedKey = "";
            stageRequestedSrc = "";
            console.warn("HBOT configurator image could not be loaded", target.key);
          }
        };
        loader.src = src;
      }
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
      const colorList = configState.stageView === "interior" ? dict.configurator.interior_colors : dict.configurator.colors;
      const colorId = configState.stageView === "interior" ? configState.interiorColor : configState.color;
      const colorInfo = (colorList || []).find((c) => c.id === colorId);
      const viewLabel = configState.stageView === "interior" && dict.configurator.stage ? ` · ${dict.configurator.stage.view_interior}` : "";
      nameEl.textContent = "";
      const modelLabel = document.createElement("span");
      modelLabel.className = "stage-model-label";
      modelLabel.textContent = base + viewLabel;
      nameEl.appendChild(modelLabel);
      if (colorInfo) {
        const finishLabel = document.createElement("span");
        finishLabel.className = "stage-finish-label";
        const dot = document.createElement("span");
        dot.className = "stage-finish-dot";
        dot.style.backgroundColor = colorInfo.hex;
        finishLabel.appendChild(dot);
        finishLabel.appendChild(document.createTextNode(colorInfo.name));
        nameEl.appendChild(finishLabel);
      }
    }

    // Oslo (solo-lounge): iç mekan fotoğrafı (aşırı geniş, mor LED'li soyut yakın
    // çekim) katalog kalitesinde değil — "İç Görünüm" sekmesini tamamen gizle ve
    // yalnızca dış görünüm göster. İç dekor tercihi ayrı bir notla toplanır
    // (bkz. lounge-decor-note). Diğer modeller etkilenmez.
    const hideInterior = configState.model === "solo-lounge";
    const interiorViewBtn = document.querySelector('.stage-view-btn[data-view="interior"]');
    if (interiorViewBtn) interiorViewBtn.hidden = hideInterior;
    const loungeNote = document.getElementById("lounge-decor-note");
    if (loungeNote) loungeNote.hidden = !hideInterior;

    // Geneva/Nexus için dış ve iç gerçek fotoğraflar arasında geçiş açıktır.
    const viewToggleGroup = document.querySelector(".stage-view-toggle");
    if (viewToggleGroup) viewToggleGroup.hidden = false;

    // Görünüm toggle butonlarının durumu
    document.querySelectorAll(".stage-view-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-view") === configState.stageView);
    });

    // İmleç: sadece dış görünümde ve spin seti olan modelde (metin ipucu kaldırıldı —
    // sürükle-döndür bazı cihazlarda güvenilir hissettirmiyordu, bkz. kullanıcı geri bildirimi)
    const canSpin = spinAvailableFor() && configState.stageView === "exterior";
    stage.classList.toggle("spinnable", canSpin);

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
          resetModelVisualState();
        }
        if (!styleAllowedFor(configState.model, configState.chamberStyle)) configState.chamberStyle = "solid";
        const dict2 = TRANSLATIONS[currentLang];
        renderAllConfigControls(dict2);
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
        resetModelVisualState();
        const dict2 = TRANSLATIONS[currentLang];
        renderAllConfigControls(dict2);
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
        normalizeDubaiSelection();
        normalizeMilanoSelection();
        if (configState.model === "duo" || configState.model === "duo-plus") configState.stageView = "exterior";
        const dict = TRANSLATIONS[currentLang];
        renderConfigColors(dict);
        renderConfigInteriorColors(dict);
        renderConfigSeatColors(dict);
        renderConfigSummary(dict);
        updateConfigStage(dict);
      });
    });
    if (dict.configurator.ext_color_preview_note) {
      const note = document.createElement("p");
      note.className = "config-color-preview-note";
      note.textContent = dict.configurator.ext_color_preview_note;
      c.appendChild(note);
    }
  }

  function renderConfigInteriorColors(dict) {
    /* Oslo (solo-lounge): iç mekan fotoğraflarının açısı iyi değil — bu adım
       tamamen gizlenir, varsayılan iç görsel (REAL_INTERIOR.solo-lounge) sabit kalır.
       Geneva (nexus): kurumsal/klinik standart iç donanım, özelleştirme sunulmuyor. */
    const interiorSection = document.getElementById("interior-color-step-section");
    if (interiorSection) interiorSection.hidden = !interiorColorCustomizable(configState.model);
    const c = document.getElementById("config-interior-color-grid");
    if (!c || !dict.configurator.interior_colors) return;
    let visibleInteriorColors = visibleColorList(dict.configurator.interior_colors, INTERIOR_COLOR_ALLOWLIST);
    if (configState.model === "solo") {
      const available = dubaiInteriorIds(configState.color);
      visibleInteriorColors = visibleInteriorColors.filter((color) => available.has(color.id));
    }
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
        normalizeDubaiSelection();
        if (configState.stageView !== "interior") configState.stageView = "interior";
        const dict = TRANSLATIONS[currentLang];
        renderConfigInteriorColors(dict);
        renderConfigSeatColors(dict);
        renderConfigSummary(dict);
        updateConfigStage(dict);
      });
    });
  }

  /* Dış renk kimlikleri. Tarayıcıda piksel boyama yapılmaz; yalnız onaylanmış
     statik renk renderı olan model/renk çiftleri görseli değiştirir. */
  const EXT_PAINT_MODE = {
    "pearl-white": null,
    "sampanya": "paint", "bronz": "paint",
    "grafit": "metal", "antrasit": "metal", "mat-siyah": "metal",
    "gece-laciverti": "paint", "bordo": "paint", "zumrut": "paint",
    "bej": "paint", "adacayi-yesili": "paint", "turkuaz": "paint",
    "nane-yesili": "paint", "fildisi": "paint", "tas-grisi": "metal"
  };

  /* Beş özelleştirilebilir model bütün 15 finish seçeneğini kabul eder. Geneva
     mevcut iş kuralı gereği İnci Beyazı'nda sabit kalır. */
  function colorWorksFor(modelId, colorId) {
    if (!(colorId in EXT_PAINT_MODE)) return false;
    if (modelId === "nexus") return colorId === "pearl-white";
    if (modelId === "solo") return dubaiExteriorIds().has(colorId);
    if (modelId === "duo" || modelId === "duo-plus") {
      const preparedRenders = APPROVED_COLOR_RENDER_MANIFEST[modelId];
      return !!(preparedRenders && preparedRenders[colorId]);
    }
    if (modelId === "quad-cube") return milanoExteriorIds().has(colorId);
    return !!STAGE_RENDER_MANIFEST[modelId];
  }
  /* Görsel kaynağı onaylı statik render veya modelin kanonik fotoğrafıdır. */
  function resolveStageSrc(target) {
    return `/assets/img/models/${target.key}.webp?v=${IMG_V}`;
  }

  /* Kart görselleri: model -> gerçek fotoğraf. Eski iç ürün kodları dış URL'lerde kullanılmaz. */
  const MODEL_CARD_IMG = {
    "solo-lounge": "real/oslo-real",
    solo: "real/dubai-real",
    duo: "real/tokyo-real",
    "duo-plus": "real/tokyo-plus-real",
    "quad-cube": "real/milano-real",
    nexus: "real/geneva-real"
  };

  /* Dubai'de koltuk rengi üç eksenli statik renderı değiştirir. Diğer modellerde
     mevcut fiyatsız görsel tercih davranışı korunur. */
  function renderConfigSeatColors(dict) {
    const seatColorSection = document.getElementById("seat-color-step-section");
    if (seatColorSection) seatColorSection.hidden = !interiorColorCustomizable(configState.model);
    const c = document.getElementById("config-seat-color-grid");
    if (!c || !dict.configurator.seat_colors) return;
    const seatPalette = configState.model === "solo" ? dict.configurator.interior_colors : dict.configurator.seat_colors;
    const seatAllowlist = configState.model === "solo" ? INTERIOR_COLOR_ALLOWLIST : SEAT_COLOR_ALLOWLIST;
    let visibleSeatColors = visibleColorList(seatPalette, seatAllowlist);
    let availableDubaiSeats = null;
    if (configState.model === "solo") {
      /* Bütün standart koltuk renklerini görünür tut. Önceki filtre yalnız hazır
         renderları gösterdiği için tamamlanmakta olan gruplarda kullanıcı tek bir
         renk var sanıyordu. Hazır olmayan seçenek görünür fakat seçilemez; render
         manifest'e eklendiği anda aynı kontrol otomatik olarak etkinleşir. */
      normalizeDubaiSelection();
      availableDubaiSeats = dubaiSeatIds(configState.color, configState.interiorColor);
    }
    if (visibleSeatColors.length && !visibleSeatColors.some((c2) => c2.id === configState.seatColor)) {
      configState.seatColor = visibleSeatColors[0].id;
    }
    c.innerHTML = visibleSeatColors.map((col) => {
      const renderReady = !availableDubaiSeats || availableDubaiSeats.has(col.id);
      const selected = configState.seatColor === col.id ? " is-selected" : "";
      const unavailable = renderReady ? "" : " is-unavailable";
      const disabled = renderReady ? "" : " disabled aria-disabled=\"true\"";
      const preparingLabel = dict.configurator.render_preparing_label || "Render preparing";
      return `
        <button type="button" class="config-color-swatch${selected}${unavailable}" data-seat-id="${col.id}" title="${col.name}${renderReady ? "" : ` · ${preparingLabel}`}"${disabled}>
          <span class="swatch-dot" style="background:${col.hex}"></span>
          <span class="swatch-name">${col.name}</span>
          ${renderReady ? "" : `<span class="swatch-status">${preparingLabel}</span>`}
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
          <img class="model-card-img" src="/assets/img/models/${MODEL_CARD_IMG[m.id] || "real/oslo-real"}.webp?v=${IMG_V}" alt="${m.name}" loading="lazy">
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
        resetModelVisualState();
        if (!styleAllowedFor(configState.model, configState.chamberStyle)) configState.chamberStyle = "solid";
        const dict = TRANSLATIONS[currentLang];
        renderAllConfigControls(dict);
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
    el.innerHTML = CURRENCIES.map((c) => `<button type="button" data-currency="${c}" class="${c === currentCurrency ? "is-active" : ""}">${CURRENCY_LABELS[c] || c}</button>`).join("");
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
  const INTERIOR_COLOR_ALLOWLIST = {
    duo: ["cream", "navy", "burgundy"],
    "duo-plus": ["cream", "navy", "burgundy"],
    "quad-cube": ["cream", "navy", "burgundy"]
  };
  const SEAT_COLOR_ALLOWLIST = {
    duo: ["krem", "lacivert", "bordo"],
    "duo-plus": ["krem", "lacivert", "bordo"],
    "quad-cube": ["krem", "lacivert", "bordo"]
  };
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

  /* Doğrulanmış ürün 3D dosyaları teslim edilene dek QR / native AR açılışı
     yerine, seçilen konfigürasyonun gerçek ürün renderını showroom modunda
     gösteriyoruz. Böylece müşteriye basitleştirilmiş placeholder model
     gösterilmez. */
  const SHOWROOM_UI = {
    tr: { button: "Showroom'da Görüntüle", comingSoon: "AR deneyimi yakında", qrTitle: "Telefonunla Görüntüle", qrSubtitle: "Seçtiğin ürün renderını telefonunda açmak için QR kodu okut." },
    en: { button: "View in showroom", comingSoon: "AR experience coming soon", qrTitle: "View on your phone", qrSubtitle: "Scan the QR code to open your selected product render on your phone." },
    ru: { button: "Посмотреть в шоуруме", comingSoon: "AR-режим скоро появится", qrTitle: "Открыть на телефоне", qrSubtitle: "Отсканируйте QR-код, чтобы открыть выбранный рендер изделия на телефоне." },
    ar: { button: "عرض في صالة العرض", comingSoon: "تجربة الواقع المعزز قريباً", qrTitle: "اعرضه على هاتفك", qrSubtitle: "امسح رمز QR لفتح عرض المنتج الذي اخترته على هاتفك." },
    es: { button: "Ver en showroom", comingSoon: "Experiencia AR próximamente", qrTitle: "Ver en tu teléfono", qrSubtitle: "Escanea el código QR para abrir el render del producto seleccionado en tu teléfono." },
    pt: { button: "Ver no showroom", comingSoon: "Experiência AR em breve", qrTitle: "Ver no seu telefone", qrSubtitle: "Leia o código QR para abrir o render do produto selecionado no seu telefone." },
    de: { button: "Im Showroom ansehen", comingSoon: "AR-Erlebnis in Kürze", qrTitle: "Auf dem Telefon ansehen", qrSubtitle: "Scannen Sie den QR-Code, um das ausgewählte Produktrendering auf Ihrem Telefon zu öffnen." }
  };

  function showroomUi() { return SHOWROOM_UI[currentPageLang()] || SHOWROOM_UI.tr; }

  function buildShowroomUrl() {
    const params = new URLSearchParams();
    params.set("model", configState.model);
    params.set("style", configState.chamberStyle);
    params.set("color", configState.color);
    const lang = currentPageLang();
    params.set("lang", lang);
    return window.location.origin + "/ar-view.html?" + params.toString();
  }

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function openShowroomView() {
    const url = buildShowroomUrl();
    if (isMobileDevice()) { window.location.href = url; return; }
    const overlay = document.getElementById("ar-qr-overlay");
    const canvasWrap = document.getElementById("ar-qr-canvas");
    if (!overlay || !canvasWrap || typeof QRCode === "undefined") { window.open(url, "_blank", "noopener"); return; }
    const ui = showroomUi();
    const title = overlay.querySelector("h3");
    const subtitle = overlay.querySelector("p");
    if (title) title.textContent = ui.qrTitle;
    if (subtitle) subtitle.textContent = ui.qrSubtitle;
    canvasWrap.innerHTML = "";
    new QRCode(canvasWrap, { text: url, width: 200, height: 200, colorDark: "#0a0f14", colorLight: "#ffffff" });
    overlay.hidden = false;
  }

  function initShowroomQrModal() {
    const overlay = document.getElementById("ar-qr-overlay");
    const closeBtn = document.getElementById("ar-qr-close");
    if (!overlay || overlay.dataset.showroomInitialized === "true") return;
    overlay.dataset.showroomInitialized = "true";
    const close = () => { overlay.hidden = true; };
    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
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

  /* Telefonlarda tam özet paneli bütün ekranı kaplamasın; seçilen kabin,
     dış renk ve güncel toplam, seçim adımları boyunca sabit kısa şeritte
     görünür kalsın. */
  function renderMobileConfigStatus(modelInfo, colorInfo, total) {
    const stage = document.getElementById("config-stage");
    if (!stage) return;
    let status = document.getElementById("mobile-config-status");
    if (!status) {
      status = document.createElement("div");
      status.id = "mobile-config-status";
      status.className = "mobile-config-status";
      stage.insertAdjacentElement("afterend", status);
    }
    const modelName = modelInfo ? modelInfo.name : "";
    const colorName = colorInfo ? colorInfo.name : "";
    const swatch = colorInfo ? `<span class="mobile-config-status-swatch" style="background:${colorInfo.hex}"></span>` : "";
    status.innerHTML = `
      <div class="mobile-config-status-selection">
        <strong>${modelName}</strong>
        <span>${swatch}${colorName}</span>
      </div>
      <strong class="mobile-config-status-total">${formatPrice(total)}</strong>
    `;
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
    const total = computeTotal();
    const colorRow = colorInfo
      ? `<div class="config-summary-row"><span class="label">${s.color_label}</span><span class="value"><span class="summary-swatch" style="background:${colorInfo.hex}"></span>${colorInfo.name}</span></div>`
      : "";
    const interiorInfo = (dict.configurator.interior_colors || []).find((col) => col.id === configState.interiorColor);
    const interiorRow = interiorInfo && interiorColorCustomizable(configState.model)
      ? `<div class="config-summary-row"><span class="label">${s.interior_color_label}</span><span class="value"><span class="summary-swatch" style="background:${interiorInfo.hex}"></span>${interiorInfo.name}</span></div>`
      : "";
    const seatColorInfo = ((configState.model === "solo" ? dict.configurator.interior_colors : dict.configurator.seat_colors) || [])
      .find((col) => col.id === configState.seatColor);
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

    const showroom = showroomUi();
    const showroomButton = `<button type="button" class="btn-ar" id="config-showroom-btn">${showroom.button}</button><span class="ar-coming-soon" role="status">${showroom.comingSoon}</span>`;

    c.innerHTML = `
      ${showroomButton}
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
      <div class="config-summary-total"><span class="label">${s.total_label}</span><span class="amount">${formatPrice(total)}</span></div>
      <p class="config-summary-disclaimer">${s.disclaimer}</p>
      <a href="#quote-form" class="btn btn-primary btn-block" id="config-cta">${s.cta}</a>
      <div class="config-summary-secondary-actions">
        <button type="button" class="btn btn-outline btn-block" id="config-print-btn">${s.print_button}</button>
        <button type="button" class="btn btn-outline btn-block" id="config-email-btn">${s.email_button}</button>
        <button type="button" class="btn btn-outline btn-block" id="config-share-btn">${s.share_button}</button>
        <button type="button" class="btn btn-outline btn-block" id="config-refer-btn">${s.refer_button}</button>
      </div>
    `;

    renderMobileConfigStatus(modelInfo, colorInfo, total);

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

    const showroomBtn = document.getElementById("config-showroom-btn");
    if (showroomBtn) showroomBtn.addEventListener("click", openShowroomView);

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
    const seatColorInfo = ((configState.model === "solo" ? dict.configurator.interior_colors : dict.configurator.seat_colors) || [])
      .find((col) => col.id === configState.seatColor);
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
    lines.push(`${s.total_label}: ${formatPrice(computeTotal())} (${CURRENCY_LABELS[currentCurrency] || currentCurrency})`);
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
  /* Proformaya girecek görsel(ler)i seçer. ÖNEMLİ: burada sabit model fotoğrafı
     (REAL_STAGE) kullanılmamalı — müşteri iç mekân ve koltuk rengini seçtiği hâlde
     PDF'te jenerik kabin fotoğrafı görüyordu. Konfigüratör sahnesiyle aynı
     çözümlemeyi kullanıyoruz; Dubai/Milano'da tek kare zaten dış+iç+koltuğu
     birlikte gösterir, Tokyo'da iç mekân ayrı bir render olduğu için ikinci
     görsel olarak eklenir. */
  function pdfPhotoKeys() {
    const model = configState.model;
    if (model === "solo") {
      normalizeDubaiSelection();
      const exact = dubaiRenderKey(configState.color, configState.interiorColor, configState.seatColor);
      if (exact) return [exact];
    }
    if (model === "quad-cube") {
      normalizeMilanoSelection();
      const exact = milanoRenderKey(configState.color, configState.interiorColor, configState.seatColor);
      if (exact) return [exact];
    }
    const approvedByColor = APPROVED_COLOR_RENDER_MANIFEST[model];
    const exterior = (approvedByColor && approvedByColor[configState.color]) || REAL_STAGE[model] || "real/oslo-real";
    if (model === "duo" || model === "duo-plus") {
      const interior = TOKYO_INTERIOR_RENDER_MANIFEST[`${configState.interiorColor}|${configState.seatColor}`];
      if (interior) return [exterior, interior];
    }
    return [exterior];
  }

  function loadProductPhotosForPdf() {
    return Promise.all(pdfPhotoKeys().map((key) =>
      loadImageForPdf(`/assets/img/models/${key}.webp?v=${IMG_V}`, { format: "jpeg", maxDim: 900 })
    )).then((list) => list.filter(Boolean));
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
      doc.addImage(logo.dataUrl, "PNG", mL, 10, w, h, undefined, "FAST");
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

    // Secilen yapilandirmanin gercek renderlari (tek kare, ya da dis + ic ikilisi)
    let y = 46;
    const productPhotos = await loadProductPhotosForPdf();
    if (productPhotos.length === 1) {
      const photo = productPhotos[0];
      const maxW = mR - mL, maxH = 62;
      let pw = maxW, ph = pw * photo.ratio;
      if (ph > maxH) { ph = maxH; pw = ph / photo.ratio; }
      const px = mL + (maxW - pw) / 2;
      doc.addImage(photo.dataUrl, photo.format || "JPEG", px, y, pw, ph, undefined, "FAST");
      y += ph + 10;
    } else if (productPhotos.length > 1) {
      const gap = 6, maxH = 52;
      const cellW = (mR - mL - gap) / 2;
      let rowH = 0;
      productPhotos.slice(0, 2).forEach((photo, i) => {
        let pw = cellW, ph = pw * photo.ratio;
        if (ph > maxH) { ph = maxH; pw = ph / photo.ratio; }
        const cellX = mL + i * (cellW + gap);
        doc.addImage(photo.dataUrl, photo.format || "JPEG", cellX + (cellW - pw) / 2, y, pw, ph, undefined, "FAST");
        rowH = Math.max(rowH, ph);
      });
      y += rowH + 10;
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
    const seatInfo = ((configState.model === "solo" ? cfg.interior_colors : cfg.seat_colors) || [])
      .find((c2) => c2.id === configState.seatColor);
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
    doc.text(T((s.total_label || "Total") + ` (${CURRENCY_LABELS[currentCurrency] || currentCurrency})`).toUpperCase(), mL + 5, y + 3);
    doc.setFontSize(16);
    doc.setTextColor(...GOLD);
    doc.text(T(formatPrice(computeTotal())), mR - 5, y + 3, { align: "right" });

    // Musterinin formda yazdigi not — proformada hic gorunmuyordu (kullanici bildirimi).
    const customerNote = String(formData.get("message") || "").trim();
    if (customerNote) {
      y += 18;
      doc.setFont(FONT, "bold");
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(T(qf.message || "Additional Notes"), mL, y);
      doc.setFont(FONT, "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(40, 40, 40);
      /* Cok uzun notun footer cizgisini (y=282) asmasini onle: sigmayan kismi
         yeni sayfaya tasi. */
      const noteLines = doc.splitTextToSize(T(customerNote), mR - mL - 6);
      doc.setFillColor(245, 246, 249);
      let ny = y + 5;
      const lineH = 4.6;
      noteLines.forEach((line) => {
        if (ny > 268) { doc.addPage(); ny = 24; }
        doc.text(line, mL + 3, ny);
        ny += lineH;
      });
      y = ny + 2;
    }

    // Not + tesekkur + footer
    y += 20;
    doc.setFont(FONT, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    const disclaimerTxt = s.disclaimer || "This proforma quote is not a binding contract. Final pricing and specifications are confirmed following consultation with our sales team.";
    const disclaimerLines = doc.splitTextToSize(T(disclaimerTxt), mR - mL);
    doc.text(disclaimerLines, mL, y);
    y += disclaimerLines.length * 3.6 + 6;
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
      <div style="color:#777;font-size:13px;margin-top:4px;">info@hbotchambertech.com · +90 501 950 7003 · hbotchambertech.com</div>
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
    initShowroomQrModal();
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
      const preSeatPalette = configState.model === "solo"
        ? TRANSLATIONS.tr.configurator.interior_colors
        : TRANSLATIONS.tr.configurator.seat_colors;
      if (preSeat && (preSeatPalette || []).some((col) => col.id === preSeat)) {
        configState.seatColor = preSeat;
        // Paylaşılan / QR ile açılan konfigürasyonlarda koltuk rengi de
        // iç sahneye uygulanmalı; aksi halde özet doğru olsa bile sahne
        // varsayılan koltuk rengini gösteriyordu.
        configState.seatTouched = true;
      }

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
    renderGuideModal(dict);
    renderAllConfigControls(dict);

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
      renderSeriesGrid(dict, "indications-teaser-grid");
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
    } else if (page === "trust-safety") {
      renderTrustModelDocs(lang, dict);
    } else if (page === "configurator") {
      initConfigurator(dict);
    }
  }

  const TRUST_MODEL_DOCS = [
    { slug: "oslo", dictKey: "modelSoloLounge" },
    { slug: "dubai", dictKey: "modelSolo" },
    { slug: "tokyo", dictKey: "modelDuo" },
    { slug: "tokyo-plus", dictKey: "modelDuoPlus" },
    { slug: "milano", dictKey: "modelQuadCube" },
    { slug: "geneva", dictKey: "modelNexus" }
  ];

  const TRUST_DOC_COPY = {
    tr: {
      open: "PDF'yi Aç", review: "Modeli incele",
      status: "Belge statüsü:",
      disclaimer: "Bu PDF'ler satış ve proje öncesi teknik bilgilendirmedir. Nihai, seri numarasına özel kullanım talimatı; uygunluk, test, kurulum ve eğitim belgeleri teslimat projesinde ayrıca sağlanır."
    },
    en: {
      open: "Open PDF", review: "Review model",
      status: "Document status:",
      disclaimer: "These PDFs provide pre-sales and pre-project technical information. Final serial-number-specific instructions for use and compliance, testing, installation and training documents are supplied separately for the delivery project."
    },
    ru: {
      open: "Открыть PDF", review: "О модели",
      status: "Статус документа:",
      disclaimer: "Эти PDF-файлы содержат техническую информацию до продажи и начала проекта. Окончательные инструкции по эксплуатации для конкретного серийного номера, а также документы по соответствию, испытаниям, монтажу и обучению предоставляются отдельно в рамках проекта поставки."
    },
    ar: {
      open: "فتح PDF", review: "استعرض الطراز",
      status: "حالة الوثيقة:",
      disclaimer: "تقدم ملفات PDF هذه معلومات تقنية لمرحلة ما قبل البيع والمشروع. وتُسلَّم تعليمات الاستخدام النهائية الخاصة بالرقم التسلسلي، ووثائق المطابقة والاختبار والتركيب والتدريب، بصورة منفصلة ضمن مشروع التوريد."
    },
    es: {
      open: "Abrir PDF", review: "Ver modelo",
      status: "Estado del documento:",
      disclaimer: "Estos PDF ofrecen información técnica previa a la venta y al proyecto. Las instrucciones de uso finales específicas para el número de serie y los documentos de conformidad, pruebas, instalación y formación se entregan por separado con el proyecto."
    },
    pt: {
      open: "Abrir PDF", review: "Ver modelo",
      status: "Estado do documento:",
      disclaimer: "Estes PDF fornecem informação técnica de pré-venda e pré-projeto. As instruções de utilização finais específicas do número de série e os documentos de conformidade, ensaios, instalação e formação são fornecidos separadamente no projeto de entrega."
    },
    de: {
      open: "PDF öffnen", review: "Modell ansehen",
      status: "Dokumentenstatus:",
      disclaimer: "Diese PDF-Dateien enthalten technische Informationen für die Vorverkaufs- und Vorprojektphase. Die endgültige seriennummernspezifische Gebrauchsanweisung sowie Konformitäts-, Prüf-, Installations- und Schulungsunterlagen werden im Lieferprojekt separat bereitgestellt."
    }
  };

  function renderTrustModelDocs(lang, dict) {
    const container = document.getElementById("trust-model-docs");
    if (!container) return;

    const copy = TRUST_DOC_COPY[lang] || TRUST_DOC_COPY.en;
    container.innerHTML = "";

    TRUST_MODEL_DOCS.forEach((item) => {
      const model = dict[item.dictKey];
      if (!model) return;

      const card = document.createElement("article");
      card.className = "trust-model-doc";

      const capacity = document.createElement("span");
      capacity.className = "trust-model-doc__capacity";
      capacity.textContent = model.specs && model.specs[0] ? model.specs[0].value : "";

      const title = document.createElement("h3");
      title.textContent = model.title;

      const summary = document.createElement("p");
      summary.textContent = model.overview_text;

      const actions = document.createElement("div");
      actions.className = "trust-model-doc__actions";

      const pdf = document.createElement("a");
      pdf.className = "btn btn-primary";
      pdf.target = "_blank";
      pdf.rel = "noopener";
      pdf.textContent = copy.open;
      pdf.href = lang === "tr"
        ? `/assets/docs/models/hbot-${item.slug}-kullanim-guvenlik-teknik-dosya-tr.pdf`
        : `/assets/docs/models/hbot-${item.slug}-usage-safety-technical-file-${lang}.pdf`;

      const review = document.createElement("a");
      review.className = "trust-model-doc__link";
      review.href = `model-${item.slug}.html`;
      review.textContent = `${copy.review} →`;

      actions.append(pdf, review);
      card.append(capacity, title, summary, actions);
      container.appendChild(card);
    });

    const disclaimer = document.getElementById("trust-doc-disclaimer");
    if (disclaimer) {
      disclaimer.replaceChildren();
      const label = document.createElement("strong");
      label.textContent = copy.status;
      disclaimer.append(label, document.createTextNode(` ${copy.disclaimer}`));
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

  /* Ürün filmlerine kendi tam ekran düğmemiz.
     Neden: tarayıcının kendi kontrol çubuğundaki tam ekran düğmesi videonun SAĞ
     ALTINDA duruyor ve sayfanın sabit WhatsApp / "Ücretsiz Teklif Al" düğmeleri
     de ekranın sağ altında sabit; mobilde video ekranın altına geldiğinde
     bunlar üst üste biniyor ve tam ekrana geçilemiyor. Ayrıca iPhone Safari'de
     inline oynatılan videoda Element.requestFullscreen desteklenmez —
     video.webkitEnterFullscreen gerekir. Düğmeyi sağ ÜSTE koyuyoruz. */
  function initVideoFullscreen() {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.tr;
    const label = (dict.common && dict.common.fullscreen) || "Tam ekran";
    document.querySelectorAll(".brand-film-media").forEach((wrap) => {
      const video = wrap.querySelector("video");
      if (!video) return;
      let btn = wrap.querySelector(".video-fs-btn");
      if (btn) { btn.setAttribute("aria-label", label); btn.title = label; return; }
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "video-fs-btn";
      btn.setAttribute("aria-label", label);
      btn.title = label;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';
      btn.addEventListener("click", () => {
        const active = document.fullscreenElement || document.webkitFullscreenElement;
        if (active) {
          const exit = document.exitFullscreen || document.webkitExitFullscreen;
          if (exit) exit.call(document);
          return;
        }
        // iPhone Safari: yalnız video elemanı tam ekrana alınabilir
        if (typeof video.webkitEnterFullscreen === "function") {
          try { video.webkitEnterFullscreen(); return; } catch (e) { /* aşağıdaki yola düş */ }
        }
        const req = wrap.requestFullscreen || wrap.webkitRequestFullscreen;
        if (req) { try { req.call(wrap); } catch (e) { /* yoksay */ } }
      });
      wrap.appendChild(btn);
    });
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
    if (WHATSAPP_NUMBER && !isLikelyBot()) {
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

  function updateContactPhone() {
    document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
      link.href = `tel:${CONTACT_PHONE_TEL}`;
      link.textContent = CONTACT_PHONE_DISPLAY;
    });
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

  function trackGoogleAdsLead() {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: "AW-18410338370/ZJoMCNTC5OccEMLw3cpE",
      value: 1.0,
      currency: "TRY"
    });
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

      // Google Apps Script Web App yanitina tarayicidan CORS ile erisilemiyor.
      // Teklif istegini normal bir form gonderimi gibi no-cors ile ilet; Formspree
      // ise CORS + JSON destegi verdigi icin asagidaki dogrulanmis yoldan devam eder.
      const isAppsScript = form.action.indexOf("script.google.com") !== -1;
      if (isAppsScript) {
        fetch(form.action, { method: "POST", body: formData, mode: "no-cors" })
          .then(() => {
            trackGoogleAdsLead();
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
            trackGoogleAdsLead();
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

  /* ---------------- Microsoft Clarity (davranış analizi / ısı haritası) ---------------- */
  const CLARITY_PROJECT_ID = "yamafw1sq8";
  function initClarity() {
    if (isLikelyBot() || document.getElementById("ms-clarity-script")) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.id = "ms-clarity-script";
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }

  /* ---------------- Product Assistant (rule-based FAQ chat) ----------------
     Kural-tabanlı, API anahtarı gerektirmeyen bir "ürün güçlü yanları" asistanı.
     Tam içerik TR ve EN'de; diğer diller (ar/ru/es/pt/de) şimdilik EN metnine
     düşer ama linkler her zaman ziyaretçinin bulunduğu dil klasörüne gider. */
  const ASSISTANT_I18N = {
    tr: {
      launcher: "Selin'e soru sor", title: "Selin",
      subtitle: "HBOT Chamber Tech Asistanı",
      greeting: "Merhaba, ben Selin! Modellerimiz, teknolojimiz ya da fiyat teklifi hakkında sorularınızı buradan sorabilirsiniz.",
      placeholder: "Sorunuzu yazın…", send: "Gönder", close: "Kapat",
      fallback: "Bu konuda hazır bir yanıtım yok. Ekibimizle doğrudan görüşmek ister misiniz?", fallbackCta: "İletişime Geç →",
      topics: [
        { label: "Hangi modeller var?", keywords: ["model", "hangi model", "kaç kişilik", "oslo", "dubai", "tokyo", "milano", "geneva", "kapasite", "boyut"],
          answer: "Altı farklı model sunuyoruz. Ev/bireysel kullanım için: Oslo (1 kişi, yatarak) ve Dubai (1 kişi, oturarak, kompakt ve tam donanımlı). Kurumsal/klinik kullanım için: Tokyo (2 kişi, panoramik pencere, 1.5–2.0 ATA çalışma aralığı, çift kontrol sistemi), Tokyo Plus (2-4 kişi), Milano (4 kişi, geniş iç hacim) ve Geneva (hastane sınıfı, 6+ kişi, en yüksek basınç seçenekleri yalnızca bu modelde). Her model kendi kullanım senaryosuna göre tasarlandı; ev tipi ve kurumsal modeller konfigüratörde birbirinden ayrı listelenir. Doğru modeli bulmak için kapasiteyi, kurulum alanınızı ve kullanım amacınızı (ev/klinik/hastane) birlikte değerlendirmek en sağlıklısı.",
          cta: "Modelleri Karşılaştır", slug: "modeller.html" },
        { label: "Teknolojiniz nedir?", keywords: ["teknoloji", "cityai", "city ai", "cityos", "cityconnect", "cityguard", "citysync", "yapay zeka", "iot", "akıllı", "uzaktan izleme"],
          answer: "Her HBOT City Tech modeli beş bileşenle birlikte gelir: CityConnect™ basınç, oksijen seviyesi, sıcaklık ve nem verilerini gerçek zamanlı uzaktan izler ve birden fazla kabini tek dashboard'dan yönetmenizi sağlar; CityOS™ kabinin işletim sistemidir; CityAI™ operasyonel verileri analiz ederek yetkili operatöre görünürlük ve raporlama desteği sunar (klinik kararın ya da operatörün yerine geçmez); CitySync™ hastane/işletme sistemleriyle entegrasyonu projeye özel kurar; CityGuard™ ise durum takibi, kayıtlı uyarılar ve planlı servis çalışmalarını destekler — örneğin bir basınç valfinde sapma olduğunda otomatik olarak servis talebi açılır. Somut rakamlarla: kabinlerimiz %94 oksijen saflığı, <60dB gürültü seviyesi (CitySilent™) ve 7/24 uzaktan izleme sunar.",
          cta: "Teknolojiyi İncele", slug: "teknoloji.html" },
        { label: "Güvenlik & uygunluk belgeleri", keywords: ["güvenlik", "sertifika", "uygunluk", "belge", "doküman", "standart", "ce", "iso"],
          answer: "Güvenlik & Uygunluk sayfamız; model ve hedef pazarınıza göre değişen ürün güvenliği, operatör eğitimi, bakım planı, kurulum gereksinimleri ve uygunluk dokümanlarının şeffaf bir özetini sunar. Tek bir genel sertifika iddiası yerine, tam olarak sizin modelinize, konfigürasyonunuza, kullanım amacınıza ve teslim edileceği ülkeye özgü belgeleri proje bazında netleştiriyoruz — çünkü gereklilikler ülkeden ülkeye ve kullanım ortamından (ev/klinik/hastane) kullanım ortamına değişir.",
          cta: "Güvenlik & Uygunluk", slug: "guvenlik-uygunluk.html" },
        { label: "Fiyat / teklif nasıl alırım?", keywords: ["fiyat", "teklif", "ücret", "ne kadar", "maliyet", "ödeme", "indirim", "referans"],
          answer: "Fiyat; seçtiğiniz model, çalışma basıncı seviyesi ve eklediğiniz opsiyonlara göre değişir. Online konfigüratörde model, kullanım amacı (ev/kurumsal), basınç ve ek özellikleri seçerek saniyeler içinde tahmini fiyatı görebilirsiniz — hiçbir kayıt gerekmez. Bir referans/indirim kodunuz varsa konfigüratörde uygulayabilirsiniz. Bu tahmini fiyat bağlayıcı değildir; nihai ve resmi teklif, projenizin detayları netleştikten sonra ekibimiz tarafından yazılı olarak hazırlanır.",
          cta: "Konfigüratörü Aç", slug: "konfigurator.html" },
        { label: "Şirket hakkında", keywords: ["kim", "şirket", "biz kimiz", "almita", "hakkında", "güven", "deneyim", "kaç yıl", "geçmiş", "tarihçe"],
          answer: "Almita Group kurucularının ticari yolculuğu 1999'da katı atık yönetimi alanında gerçek saha problemlerine çözüm üretmekle başladı. Bugün HBOT Chamber Tech'i geliştiren ekibin tasarım, üretim, otomasyon ve proje yönetimi deneyimi 2007'ye uzanıyor. Bu birikimi CityOS™, CityGuard™, CityConnect™, CityAI™, online konfigüratör + artırılmış gerçeklik (AR) önizleme ve model bazlı mühendislikle yeni nesil hiperbarik oksijen sistemlerine taşıyoruz. Marka yapılanmamızın bu döneminde Almita Group'un ticari ve operasyonel ekosistemi tarafından destekleniyoruz — yani arkamızda hem saha deneyimi hem kurumsal güç var. Genel vaatler yerine; her projede kapsamı, kurulum planını, eğitimi, bakımı ve hedef pazara göre uygunluk dokümanlarını yazılı olarak netleştiriyoruz.",
          cta: "İletişime Geç", slug: "iletisim.html" },
        { label: "Teslimat & uluslararası gönderim", keywords: ["teslimat", "kargo", "gönderim", "uluslararası", "ülke", "ihracat", "lojistik"],
          answer: "Teslimat süreci; hedef ülke, proje kapsamı ve seçilen modele göre proje bazında planlanır: önce kurulum alanı ve ön koşullar (elektrik, zemin, erişim) değerlendirilir, ardından lojistik ve gümrük süreci netleştirilir, teslimatla birlikte operatör eğitimi ve devreye alma (commissioning) planı uygulanır. Kesin süre ve lojistik detayları ülkeye göre değiştiği için, projenizin özelinde ekibimizle görüşmenizi öneririz.",
          cta: "İletişime Geç", slug: "iletisim.html" },
        { label: "İletişim / randevu", keywords: ["iletişim", "telefon", "email", "e-posta", "randevu", "görüşmek", "whatsapp", "ara"],
          answer: "Bize dört şekilde ulaşabilirsiniz: iletişim sayfasındaki formu doldurarak, WhatsApp'tan yazarak, info@hbotchambertech.com adresine e-posta göndererek ya da 0850 888 1679 numarasını arayarak. Proje danışmanlığı için ülke, kullanım amacı ve tahmini kapasiteyi belirtmeniz süreci hızlandırır.",
          cta: "İletişim Sayfası", slug: "iletisim.html" }
      ]
    },
    en: {
      launcher: "Ask Selin", title: "Selin",
      subtitle: "HBOT Chamber Tech Assistant",
      greeting: "Hi, I'm Selin! Ask me anything about our models, technology or getting a price estimate.",
      placeholder: "Type your question…", send: "Send", close: "Close",
      fallback: "I don't have a ready answer for that. Would you like to talk to our team directly?", fallbackCta: "Contact Us →",
      topics: [
        { label: "Which models do you offer?", keywords: ["model", "which model", "capacity", "people", "oslo", "dubai", "tokyo", "milano", "geneva", "size"],
          answer: "We offer six models. For home/individual use: Oslo (1 person, lying) and Dubai (1 person, seated, compact and fully equipped). For institutional/clinical use: Tokyo (2 person, panoramic window, 1.5–2.0 ATA operating range, dual control system), Tokyo Plus (2-4 person), Milano (4 person, spacious interior) and Geneva (hospital-grade, 6+ person, the only model offering the highest pressure options). Each model is built for a specific use case; home and institutional models are listed separately in the configurator. The right choice depends on capacity, installation space and intended use (home/clinic/hospital) together.",
          cta: "Compare Models", slug: "modeller.html" },
        { label: "What technology is included?", keywords: ["technology", "cityai", "city ai", "cityos", "cityconnect", "cityguard", "citysync", "ai", "iot", "smart", "remote monitoring"],
          answer: "Every HBOT City Tech model includes five platforms: CityConnect™ monitors pressure, oxygen level, temperature and humidity in real time and lets you manage multiple chambers from one dashboard; CityOS™ is the chamber's operating system; CityAI™ analyzes operational data to give the authorized operator visibility and reporting support (it does not replace clinical judgment or the operator); CitySync™ handles project-specific integration with hospital/business systems; CityGuard™ supports status tracking, logged alerts and scheduled service — for example, a service ticket opens automatically when a pressure valve deviates. In concrete numbers: our chambers deliver 94% oxygen purity, under 60dB noise (CitySilent™), and 24/7 remote monitoring.",
          cta: "Explore the Technology", slug: "teknoloji.html" },
        { label: "Safety & compliance documents", keywords: ["safety", "certificate", "certification", "compliance", "document", "standard", "ce", "iso"],
          answer: "Our Safety & Compliance page gives a transparent summary of product safety, operator training, maintenance planning, installation requirements and compliance documentation, all of which vary by model and target market. Rather than one blanket certification claim, we confirm the documentation specific to your exact model, configuration, intended use and destination country on a project basis — requirements genuinely differ by country and by setting (home/clinic/hospital).",
          cta: "Safety & Compliance", slug: "guvenlik-uygunluk.html" },
        { label: "How do I get pricing?", keywords: ["price", "pricing", "cost", "quote", "how much", "payment", "discount", "referral"],
          answer: "Price depends on the model you choose, the operating pressure level and any options you add. In the online configurator you pick a model, intended use (home/institutional), pressure and add-ons, and see an instant estimate within seconds — no sign-up required. If you have a referral/discount code you can apply it in the configurator. This estimate isn't binding; a final, official quotation is prepared in writing by our team once your project's details are confirmed.",
          cta: "Open the Configurator", slug: "konfigurator.html" },
        { label: "About the company", keywords: ["who are you", "company", "almita", "about", "history", "experience", "years", "trust", "background"],
          answer: "Almita Group's founders began their commercial journey in 1999, solving real field problems in solid waste management. The team behind HBOT Chamber Tech today carries design, manufacturing, automation and project-management experience dating back to 2007. We bring that experience into next-generation hyperbaric oxygen systems through CityOS™, CityGuard™, CityConnect™, CityAI™, an online configurator with AR preview, and model-based engineering. During this phase of building the brand, we are backed by Almita Group's commercial and operational ecosystem — real field experience combined with corporate strength. Rather than general promises, every project gets its scope, installation plan, training, maintenance and market-specific compliance documentation confirmed in writing.",
          cta: "Contact Us", slug: "iletisim.html" },
        { label: "Shipping & international delivery", keywords: ["shipping", "delivery", "logistics", "international", "export", "country"],
          answer: "Delivery is planned on a project basis around the destination country, project scope and selected model: first we assess the installation site and prerequisites (power, flooring, access), then logistics and customs are confirmed, and delivery is followed by operator training and a commissioning plan. Since exact timelines and logistics details vary by country, we recommend discussing the specifics of your project directly with our team.",
          cta: "Contact Us", slug: "iletisim.html" },
        { label: "Contact / book a call", keywords: ["contact", "phone", "email", "appointment", "talk", "whatsapp", "call"],
          answer: "You can reach us four ways: the contact form on our contact page, WhatsApp, emailing info@hbotchambertech.com, or calling +90 850 888 1679. Mentioning your country, intended use and expected capacity up front speeds up the process.",
          cta: "Contact Page", slug: "iletisim.html" }
      ]
    }
  };
  function getAssistantLangPrefix() {
    const m = /^\/(en|ru|ar|de|es|pt)\//.exec(window.location.pathname);
    return m ? "/" + m[1] + "/" : "/";
  }
  function getAssistantLocale() {
    const prefix = getAssistantLangPrefix();
    const code = prefix === "/" ? "tr" : prefix.replace(/\//g, "");
    return ASSISTANT_I18N[code] ? code : "en";
  }
  function matchAssistantTopic(dict, query) {
    const q = query.toLowerCase();
    let best = null, bestScore = 0;
    dict.topics.forEach((t) => {
      let score = 0;
      t.keywords.forEach((k) => { if (q.includes(k)) score += k.length; });
      if (score > bestScore) { bestScore = score; best = t; }
    });
    return bestScore > 0 ? best : null;
  }
  function initProductAssistant() {
    if (document.querySelector(".hbot-assistant-launcher")) return;
    const dict = ASSISTANT_I18N[getAssistantLocale()];
    const langPrefix = getAssistantLangPrefix();

    const style = document.createElement("style");
    style.textContent = ".hbot-assistant-launcher{position:fixed;z-index:150;bottom:24px;inset-inline-start:24px;display:flex;align-items:center;gap:8px;padding:12px 18px 12px 14px;border-radius:999px;border:none;cursor:pointer;background:linear-gradient(135deg,#1c2b38,#0a0f14);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.35);font-family:inherit;font-size:14px;font-weight:600;animation:hbotAssistantPulse 2.2s ease 3}" +
      ".hbot-assistant-launcher:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.45)}.hbot-assistant-launcher svg{width:20px;height:20px;flex-shrink:0}" +
      "@media (max-width:640px){.hbot-assistant-launcher{padding:12px;bottom:16px;inset-inline-start:16px}.hbot-assistant-launcher-label{display:none}}" +
      "@keyframes hbotAssistantPulse{0%,100%{box-shadow:0 8px 24px rgba(0,0,0,.35)}50%{box-shadow:0 8px 24px rgba(201,164,92,.55)}}" +
      ".hbot-assistant-panel{position:fixed;z-index:151;bottom:88px;inset-inline-start:24px;width:340px;max-width:calc(100vw - 32px);max-height:min(520px,70vh);display:flex;flex-direction:column;background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);overflow:hidden;font-family:inherit}.hbot-assistant-panel[hidden]{display:none}" +
      "@media (max-width:640px){.hbot-assistant-panel{inset-inline-start:16px;bottom:76px;width:calc(100vw - 32px)}}" +
      ".hbot-assistant-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#0a0f14;color:#fff}.hbot-assistant-header strong{display:block;font-size:14px}.hbot-assistant-header span{display:block;font-size:12px;color:#9aa5ad;margin-top:2px}" +
      ".hbot-assistant-close{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;padding:4px}" +
      ".hbot-assistant-body{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;background:#f6f7f8}" +
      ".hbot-assistant-msg{max-width:85%;padding:9px 13px;border-radius:12px;font-size:13.5px;line-height:1.45}" +
      ".hbot-assistant-msg--bot{align-self:flex-start;background:#fff;color:#1c2b38;border:1px solid #e5e7eb}" +
      ".hbot-assistant-msg--user{align-self:flex-end;background:#c9a45c;color:#0a0f14;font-weight:600}" +
      ".hbot-assistant-cta{align-self:flex-start;font-size:13px;font-weight:700;color:#a9853f;text-decoration:none;padding:0 2px 6px}.hbot-assistant-cta:hover{text-decoration:underline}" +
      ".hbot-assistant-quick{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}" +
      ".hbot-assistant-chip{border:1px solid #d8dce0;background:#fff;color:#1c2b38;border-radius:999px;padding:6px 12px;font-size:12.5px;cursor:pointer}.hbot-assistant-chip:hover{background:#f0f1f3}" +
      ".hbot-assistant-input-row{display:flex;gap:8px;padding:10px;border-top:1px solid #e5e7eb;background:#fff}" +
      ".hbot-assistant-input-row input{flex:1;border:1px solid #d8dce0;border-radius:999px;padding:9px 14px;font-size:13.5px;font-family:inherit;outline:none;min-width:0}.hbot-assistant-input-row input:focus{border-color:#a9853f}" +
      ".hbot-assistant-input-row button{border:none;background:#0a0f14;color:#fff;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:700;cursor:pointer}";
    document.head.appendChild(style);

    const launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "hbot-assistant-launcher";
    launcher.setAttribute("aria-label", dict.launcher);
    launcher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4A8.5 8.5 0 0 1 3 11.5a8.38 8.38 0 0 1 8.5-8.4A8.38 8.38 0 0 1 21 11.5Z"/></svg><span class="hbot-assistant-launcher-label">' + dict.launcher + "</span>";

    const panel = document.createElement("div");
    panel.className = "hbot-assistant-panel";
    panel.hidden = true;
    panel.innerHTML =
      '<div class="hbot-assistant-header"><div><strong>' + dict.title + "</strong><span>" + dict.subtitle + '</span></div><button type="button" class="hbot-assistant-close" aria-label="' + dict.close + '">&times;</button></div>' +
      '<div class="hbot-assistant-body"><div class="hbot-assistant-msg hbot-assistant-msg--bot">' + dict.greeting + '</div><div class="hbot-assistant-quick"></div></div>' +
      '<form class="hbot-assistant-input-row"><input type="text" autocomplete="off" placeholder="' + dict.placeholder + '" /><button type="submit">' + dict.send + "</button></form>";

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    const body = panel.querySelector(".hbot-assistant-body");
    const quick = panel.querySelector(".hbot-assistant-quick");

    function addMessage(text, who) {
      const div = document.createElement("div");
      div.className = "hbot-assistant-msg hbot-assistant-msg--" + who;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
    function addCta(label, slug) {
      const a = document.createElement("a");
      a.className = "hbot-assistant-cta";
      a.href = langPrefix + slug;
      a.textContent = label;
      body.appendChild(a);
      body.scrollTop = body.scrollHeight;
    }
    function ask(userText, forcedTopic) {
      addMessage(userText, "user");
      const topic = forcedTopic || matchAssistantTopic(dict, userText);
      if (topic) {
        addMessage(topic.answer, "bot");
        if (topic.cta && topic.slug) addCta(topic.cta, topic.slug);
      } else {
        addMessage(dict.fallback, "bot");
        addCta(dict.fallbackCta, "iletisim.html");
      }
    }

    dict.topics.forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hbot-assistant-chip";
      btn.textContent = t.label;
      btn.addEventListener("click", () => ask(t.label, t));
      quick.appendChild(btn);
    });

    launcher.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      launcher.classList.toggle("is-open", !panel.hidden);
    });
    panel.querySelector(".hbot-assistant-close").addEventListener("click", () => {
      panel.hidden = true;
      launcher.classList.remove("is-open");
    });
    panel.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = panel.querySelector("input");
      const val = input.value.trim();
      if (!val) return;
      ask(val, null);
      input.value = "";
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
    initYear();
    initHeroSlider();
    initWhatsAppButton();
    updateContactPhone();
    initStickyCta();
    initReveal();
    applyLang(currentPageLang());
    initLangSuggestion();
    initProductAssistant();
    initClarity();
    initVideoFullscreen();
  });
})();
