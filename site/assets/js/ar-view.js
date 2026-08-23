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

  function param(name) { return new URLSearchParams(window.location.search).get(name); }
  function language() { var value = param("lang") || document.documentElement.lang; return SUPPORTED_LANGUAGES.indexOf(value) !== -1 ? value : "tr"; }
  function configuratorPath(lang) { return lang === "tr" ? "/konfigurator.html" : "/" + lang + "/konfigurator.html"; }
  function realRender(model, color) {
    var family = { "solo-lounge": "lounge", solo: "oslo", duo: "duo", "duo-plus": "duo", "quad-cube": "milan", nexus: "nexus" }[model];
    var approved = ["mat-siyah", "sampanya", "bronz", "grafit", "antrasit", "gece-laciverti", "bordo", "zumrut"];
    if (model === "solo" && color === "bej") return "/assets/img/models/real/dubai-real.webp";
    if (model === "solo" && color === "adacayi-yesili") return "/assets/img/models/real/oslo-green.webp";
    if (model === "quad-cube") { var special = { turkuaz: "milan-teal", "nane-yesili": "milan-mint", "tas-grisi": "milan-sage", fildisi: "milan-cream" }; if (special[color]) return "/assets/img/models/real/" + special[color] + ".webp"; }
    if (family && approved.indexOf(color) !== -1) return "/assets/img/models/real/" + family + "-" + color + ".webp";
    var fallback = { "solo-lounge": "oslo-real", solo: "dubai-real", duo: "tokyo-real", "duo-plus": "tokyo-plus-real", "quad-cube": "milano-config", nexus: "geneva-real" };
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
  });
})();
