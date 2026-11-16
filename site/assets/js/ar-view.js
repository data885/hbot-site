(function () {
  "use strict";

  var MODEL_NAMES = { "solo-lounge": "Oslo", solo: "Dubai", duo: "Tokyo", "duo-plus": "Tokyo Plus", "quad-cube": "Milano", nexus: "Geneva" };
  var SUPPORTED_LANGUAGES = ["tr", "en", "ru", "ar", "es", "pt", "de"];
  var SHOWROOM_COPY = {
    tr: { back: "← Konfigüratöre dön", label: "SEÇİLEN KONFİGÜRASYON", badge: "SHOWROOM ÖNİZLEMESİ", subtitle: "Seçtiğiniz konfigürasyona ait doğrulanmış ürün renderı.", note: "Doğrulanmış 3D ürün modeli hazırlandığında iPhone ve Android için AR açılışı burada etkinleşecek." },
    en: { back: "← Back to configurator", label: "SELECTED CONFIGURATION", badge: "SHOWROOM PREVIEW", subtitle: "Verified product render for your selected configuration.", note: "AR for iPhone and Android will be enabled here once the verified 3D product model is ready." },
    ru: { back: "← Вернуться к конфигуратору", label: "ВЫБРАННАЯ КОНФИГУРАЦИЯ", badge: "ПРЕДПРОСМОТР ШОУРУМА", subtitle: "Проверенный рендер изделия для выбранной конфигурации.", note: "Запуск AR на iPhone и Android будет включён здесь после подготовки подтверждённой 3D-модели изделия." },
    ar: { back: "← العودة إلى أداة التكوين", label: "التكوين المختار", badge: "معاينة صالة العرض", subtitle: "عرض منتج موثّق للتكوين الذي اخترته.", note: "سيتم تفعيل الواقع المعزز على iPhone وAndroid هنا بعد تجهيز نموذج المنتج ثلاثي الأبعاد المعتمد." },
    es: { back: "← Volver al configurador", label: "CONFIGURACIÓN SELECCIONADA", badge: "VISTA PREVIA DEL SHOWROOM", subtitle: "Render de producto verificado para la configuración seleccionada.", note: "La experiencia AR para iPhone y Android se activará aquí cuando esté listo el modelo 3D de producto verificado." },
    pt: { back: "← Voltar ao configurador", label: "CONFIGURAÇÃO SELECIONADA", badge: "PRÉVIA DO SHOWROOM", subtitle: "Render de produto validado para a configuração selecionada.", note: "A experiência AR para iPhone e Android será ativada aqui quando o modelo 3D validado estiver pronto." },
    de: { back: "← Zurück zum Konfigurator", label: "AUSGEWÄHLTE KONFIGURATION", badge: "SHOWROOM-VORSCHAU", subtitle: "Verifiziertes Produktrendering für Ihre ausgewählte Konfiguration.", note: "AR für iPhone und Android wird hier aktiviert, sobald das verifizierte 3D-Produktmodell bereitsteht." }
  };

  var AR_MODELS = ["solo-lounge", "solo", "duo", "quad-cube", "nexus"];
  var AR_FILE = "-v3";   /* model güncellenince dosya adını değiştir (sorgu parametresi kullanma: iOS Quick Look uzantıya bakar, CDN de sorguyu yok sayar) */
  /* Kamera başlangıç açısı: Dubai ve Tokyo'da koltukların baktığı yan cam görünsün. */
  var AR_ORBIT = { "solo-lounge": "-55deg 74deg 105%", solo: "-55deg 80deg 105%", duo: "-55deg 78deg 105%", "quad-cube": "-32deg 80deg 105%", nexus: "-42deg 78deg 105%" };
  var AR_COPY = {
    tr: { label: "GERÇEK ÖLÇEKLİ 3D MODEL", badge: "3D / AR", subtitle: "Modeli parmağınızla döndürün. Odanızda gerçek ölçüde görmek için aşağıdaki düğmeye dokunun ve telefonu zemine doğrultun.", desktop: "Odanızda görmek için bu sayfayı iPhone, iPad veya Android telefonunuzda açın.", noAr: "Bu cihazda AR açılamadı. Kabini yukarıdaki 3D modelde döndürerek inceleyebilirsiniz." },
    en: { label: "TRUE-SCALE 3D MODEL", badge: "3D / AR", subtitle: "Rotate the model with your finger. To see it at true scale in your room, tap the button below and point your phone at the floor.", desktop: "To see it in your room, open this page on your iPhone, iPad or Android phone.", noAr: "AR could not be opened on this device. You can still rotate the 3D model above." },
    ru: { label: "3D-МОДЕЛЬ В РЕАЛЬНОМ МАСШТАБЕ", badge: "3D / AR", subtitle: "Поворачивайте модель пальцем. Чтобы увидеть её в реальном масштабе у себя в помещении, нажмите кнопку ниже и наведите телефон на пол.", desktop: "Чтобы увидеть модель у себя в помещении, откройте эту страницу на iPhone, iPad или телефоне Android.", noAr: "На этом устройстве не удалось открыть AR. Модель можно рассмотреть в 3D выше." },
    ar: { label: "نموذج ثلاثي الأبعاد بالحجم الحقيقي", badge: "3D / AR", subtitle: "أدر النموذج بإصبعك. لرؤيته بالحجم الحقيقي في غرفتك، اضغط الزر أدناه ووجّه هاتفك نحو الأرض.", desktop: "لرؤيته في غرفتك، افتح هذه الصفحة على iPhone أو iPad أو هاتف Android.", noAr: "تعذّر فتح الواقع المعزز على هذا الجهاز. يمكنك تدوير النموذج ثلاثي الأبعاد أعلاه." },
    es: { label: "MODELO 3D A ESCALA REAL", badge: "3D / AR", subtitle: "Gire el modelo con el dedo. Para verlo a escala real en su espacio, pulse el botón de abajo y apunte el teléfono al suelo.", desktop: "Para verlo en su espacio, abra esta página en su iPhone, iPad o teléfono Android.", noAr: "No se pudo abrir la RA en este dispositivo. Puede girar el modelo 3D de arriba." },
    pt: { label: "MODELO 3D EM ESCALA REAL", badge: "3D / AR", subtitle: "Gire o modelo com o dedo. Para vê-lo em escala real no seu espaço, toque no botão abaixo e aponte o telefone para o chão.", desktop: "Para vê-lo no seu espaço, abra esta página no seu iPhone, iPad ou telefone Android.", noAr: "Não foi possível abrir a RA neste dispositivo. Você pode girar o modelo 3D acima." },
    de: { label: "3D-MODELL IN ORIGINALGRÖSSE", badge: "3D / AR", subtitle: "Drehen Sie das Modell mit dem Finger. Um es in Originalgröße in Ihrem Raum zu sehen, tippen Sie auf die Schaltfläche unten und richten Sie das Telefon auf den Boden.", desktop: "Um es in Ihrem Raum zu sehen, öffnen Sie diese Seite auf Ihrem iPhone, iPad oder Android-Telefon.", noAr: "AR konnte auf diesem Gerät nicht geöffnet werden. Sie können das 3D-Modell oben drehen." }
  };

  function isIOS() { return /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }
  function isAndroid() { return /Android/i.test(navigator.userAgent); }

  /* model-viewer yüklenmediyse (ağ/CSP) yerel açılış: iOS'ta AR Quick Look, Android'de Scene Viewer. */
  function launchNative(model, name) {
    var base = window.location.origin + "/assets/ar/" + model;
    if (isIOS()) {
      var a = document.createElement("a");
      a.setAttribute("rel", "ar");
      a.appendChild(document.createElement("img"));
      a.href = base + AR_FILE + ".usdz#allowsContentScaling=0";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      return;
    }
    var file = encodeURIComponent(base + AR_FILE + ".glb");
    window.location.href = "intent://arvr.google.com/scene-viewer/1.0?file=" + file + "&mode=ar_preferred&resizable=false&title=" + encodeURIComponent("HBOT " + name) +
      "#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=" +
      encodeURIComponent(window.location.href) + ";end;";
  }

  function setupAr(model, lang, dict) {
    var copy = AR_COPY[lang], arText = dict && dict.configurator && dict.configurator.ar || {};
    var mv = document.getElementById("ar-model"), img = document.getElementById("showroom-render");
    var btn = document.getElementById("ar-launch"), hint = document.getElementById("ar-device-hint");
    var src = "/assets/ar/" + model;
    mv.setAttribute("poster", img.getAttribute("src"));
    mv.setAttribute("camera-orbit", AR_ORBIT[model] || "-35deg 75deg auto");
    mv.setAttribute("alt", MODEL_NAMES[model] + " — 3D");
    mv.setAttribute("ios-src", src + AR_FILE + ".usdz");
    mv.setAttribute("src", src + AR_FILE + ".glb");
    /* 3D görünüm yalnız kitaplık yüklenince fotoğrafın yerini alır; yüklenmezse fotoğraf kalır. */
    if (window.customElements && customElements.whenDefined) {
      customElements.whenDefined("model-viewer").then(function () { mv.hidden = false; img.hidden = true; });
    }
    document.getElementById("showroom-label").textContent = copy.label;
    document.getElementById("showroom-badge").textContent = copy.badge;
    document.getElementById("showroom-subtitle").textContent = copy.subtitle;
    document.getElementById("ar-fallback-note").textContent = arText.disclaimer || "";
    var showNoAr = function () { hint.textContent = copy.noAr; hint.hidden = false; };
    mv.addEventListener("ar-status", function (e) { if (e.detail && e.detail.status === "failed") showNoAr(); });
    if (isIOS() || isAndroid()) {
      btn.textContent = arText.button || "3D / AR";
      btn.hidden = false;
      /* Scene Viewer açılamazsa Chrome bu sayfaya şu işaretle döner. */
      if (window.location.hash.indexOf("no-ar-fallback") !== -1) showNoAr();
      btn.addEventListener("click", function () {
        if (mv.activateAR && mv.canActivateAR) mv.activateAR(); else launchNative(model, MODEL_NAMES[model]);
      });
    } else {
      hint.textContent = copy.desktop;
      hint.hidden = false;
    }
  }

  function param(name) { return new URLSearchParams(window.location.search).get(name); }
  function language() { var value = param("lang") || document.documentElement.lang; return SUPPORTED_LANGUAGES.indexOf(value) !== -1 ? value : "tr"; }
  function configuratorPath(lang) { return lang === "tr" ? "/konfigurator.html" : "/" + lang + "/konfigurator.html"; }
  function realRender(model, color) {
    var family = { "solo-lounge": "lounge", solo: "oslo", duo: "duo", "duo-plus": "duo", nexus: "nexus" }[model];
    var approved = ["mat-siyah", "sampanya", "bronz", "grafit", "antrasit", "gece-laciverti", "bordo", "zumrut"];
    var milanoColors = ["pearl-white", "mat-siyah", "antrasit", "gece-laciverti", "bordo", "sampanya", "grafit", "bronz", "zumrut", "bej", "adacayi-yesili", "turkuaz", "nane-yesili", "tas-grisi", "fildisi"];
    if (model === "quad-cube") {
      var ext = milanoColors.indexOf(color) !== -1 ? color : "pearl-white";
      return "/assets/img/models/colors/milano/milano__ext-" + ext + "__int-cream__seat-krem.webp";
    }
    if (model === "solo" && color === "bej") return "/assets/img/models/real/dubai-real.webp";
    if (model === "solo" && color === "adacayi-yesili") return "/assets/img/models/real/oslo-green.webp";
    if (family && approved.indexOf(color) !== -1) return "/assets/img/models/real/" + family + "-" + color + ".webp";
    var fallback = { "solo-lounge": "oslo-real", solo: "dubai-real", duo: "tokyo-real", "duo-plus": "tokyo-plus-real", nexus: "geneva-real" };
    return "/assets/img/models/real/" + fallback[model] + ".webp";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var model = param("model"); if (!MODEL_NAMES[model]) model = "solo-lounge";
    var lang = language(), copy = SHOWROOM_COPY[lang];
    var dict = typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[lang];
    var color = param("color"), style = param("style");
    var img = document.getElementById("showroom-render");
    img.src = realRender(model, color); img.alt = MODEL_NAMES[model] + " product render";
    document.getElementById("ar-model-name").textContent = MODEL_NAMES[model];
    document.getElementById("ar-back-link").href = configuratorPath(lang);
    document.getElementById("ar-back-link").textContent = copy.back;
    document.getElementById("showroom-label").textContent = copy.label;
    document.getElementById("showroom-badge").textContent = copy.badge;
    document.getElementById("showroom-subtitle").textContent = copy.subtitle;
    document.getElementById("ar-fallback-note").textContent = copy.note;
    document.documentElement.lang = lang; document.documentElement.dir = dict && dict.dir || "ltr";
    var selection = document.getElementById("ar-selection");
    if (dict && dict.configurator) {
      var values = [], selectedColor = (dict.configurator.colors || []).find(function (c) { return c.id === color; });
      var selectedStyle = (dict.configurator.styles || []).find(function (s) { return s.id === style; });
      if (selectedColor) values.push(selectedColor.name); if (selectedStyle) values.push(selectedStyle.name);
      selection.textContent = values.join(" · "); selection.hidden = !values.length;
    }
    if (AR_MODELS.indexOf(model) !== -1) setupAr(model, lang, dict);
  });
})();
