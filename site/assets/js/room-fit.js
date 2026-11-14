/* "Odama sığar mı?" — kabin yerleşim planlayıcısı (çözüm sayfaları).
   Kullanım: <div data-room-fit data-scene="home|spa|gym|hotel"></div>
   Kuşbakışı oda planı (SVG, birim cm): ortam seçilir, oda ölçüsü girilir,
   kabinler sürüklenip döndürülür, adet artırılarak ölçeklendirme denenir.
   Karar dürüst olsun diye yalnız DOĞRULANMIŞ dış ölçüsü olan modeller açık;
   diğerleri ölçü gelene kadar "yakında" görünür. Erişim payı varsayılandır,
   kesin yerleşim keşifte teyit edilir — arayüz bunu açıkça söyler. */
(function () {
  "use strict";

  /* Dış ölçüler (cm): w = en, d = boy (kuşbakışı), h = yükseklik.
     Kaynak: model teknik tabloları (translations.js "Dış Ölçüler").
     w: null = ölçü henüz doğrulanmadı, seçilemez. */
  var MODELS = [
    { id: "solo-lounge", name: "Oslo", cap: 1, w: 110, d: 240, h: 120 },
    { id: "solo", name: "Dubai", cap: 1, w: 110, d: 120, h: 180 },
    { id: "duo", name: "Tokyo", cap: 2, w: null },
    { id: "duo-plus", name: "Tokyo Plus", cap: 4, w: null },
    { id: "quad-cube", name: "Milano", cap: 4, w: null },
    { id: "nexus", name: "Geneva", cap: 6, w: null }
  ];
  var CLEAR = 60;   // varsayılan erişim payı (cm) — keşifte kesinleşir
  var SNAP = 5;     // sürüklemede cm adımı
  var MAX_UNITS = 6;

  /* Ortamlar: varsayılan oda (cm) ve bağlam için mobilya (x, y sol-üst köşe). */
  var SCENES = {
    home: { room: [460, 400], ceil: 260, furniture: [
      { k: "sofa", x: 0, y: 310, w: 220, d: 90 },
      { k: "table", x: 60, y: 220, w: 100, d: 55 },
      { k: "tv", x: 30, y: 0, w: 180, d: 40 }
    ] },
    spa: { room: [500, 420], ceil: 270, furniture: [
      { k: "massage", x: 30, y: 30, w: 70, d: 195 },
      { k: "counter", x: 330, y: 0, w: 170, d: 50 },
      { k: "lounger", x: 0, y: 300, w: 160, d: 70 }
    ] },
    gym: { room: [700, 520], ceil: 300, furniture: [
      { k: "treadmill", x: 0, y: 0, w: 85, d: 200 },
      { k: "treadmill", x: 110, y: 0, w: 85, d: 200 },
      { k: "rack", x: 0, y: 470, w: 180, d: 50 },
      { k: "bench", x: 260, y: 400, w: 50, d: 120 }
    ] },
    hotel: { room: [520, 440], ceil: 270, furniture: [
      { k: "bed", x: 0, y: 110, w: 210, d: 180 },
      { k: "nightstand", x: 0, y: 55, w: 50, d: 45 },
      { k: "nightstand", x: 0, y: 300, w: 50, d: 45 },
      { k: "armchair", x: 20, y: 350, w: 80, d: 80 }
    ] }
  };

  var T = {
    tr: {
      scene: "Ortam", scenes: { home: "Ev / salon", spa: "Spa & wellness", gym: "Spor salonu", hotel: "Otel odası" },
      model: "Model", soon: "ölçü yakında", units: "Kabin adedi", roomW: "Oda genişliği", roomD: "Oda derinliği", ceil: "Tavan yüksekliği",
      rotate: "Seçili kabini döndür", reset: "Yerleşimi sıfırla", hint: "Kabini sürükleyerek odada konumlandırın.",
      fit: "Rahat sığıyor", fitNote: "Kabinlerin çevresinde {c} cm erişim payı kalıyor.",
      tight: "Sığıyor, ama dar", tightNote: "Kabin sığıyor; erişim payı bazı kenarlarda {c} cm'nin altına düşüyor. Kabini kaydırmayı ya da daha geniş bir alanı deneyin.",
      clash: "Mobilyayla çakışıyor", clashNote: "Kabini boş bir alana sürükleyin.",
      no: "Sığmıyor", noNote: "Kabin bu oda ölçülerine sığmıyor. Odayı büyütmeyi, kabini döndürmeyi ya da adedi azaltmayı deneyin.",
      lowCeil: "Tavan, kabin yüksekliğinin ({h} m) altında.",
      roomArea: "Oda alanı", cabArea: "Kabin taban alanı", freeArea: "Kalan alan", people: "Aynı anda kullanıcı",
      access: "ERİŞİM", disclaimer: "Yaklaşık yerleşim: kabin çevresinde varsayılan {c} cm erişim payı ile. Kesin yerleşim, teslimat güzergâhı ve kapı geçişi keşifte teyit edilir.",
      ctaQuote: "Bu yerleşimle teklif iste", ctaConfig: "Konfigüratörde tasarla",
      f: { sofa: "Kanepe", table: "Sehpa", tv: "TV ünitesi", massage: "Masaj masası", counter: "Tezgâh", lounger: "Şezlong", treadmill: "Koşu bandı", rack: "Ağırlık rafı", bench: "Bench", bed: "Yatak", nightstand: "Komodin", armchair: "Berjer" }
    },
    en: {
      scene: "Setting", scenes: { home: "Home / living room", spa: "Spa & wellness", gym: "Gym", hotel: "Hotel room" },
      model: "Model", soon: "dimensions soon", units: "Number of chambers", roomW: "Room width", roomD: "Room depth", ceil: "Ceiling height",
      rotate: "Rotate selected chamber", reset: "Reset layout", hint: "Drag a chamber to position it in the room.",
      fit: "Fits comfortably", fitNote: "There is {c} cm of access space around the chambers.",
      tight: "Fits, but tight", tightNote: "The chamber fits, but the access space drops below {c} cm on some sides. Try moving it or a larger space.",
      clash: "Overlaps furniture", clashNote: "Drag the chamber to a free area.",
      no: "Does not fit", noNote: "The chamber does not fit these room dimensions. Try a larger room, rotating it or fewer chambers.",
      lowCeil: "The ceiling is lower than the chamber height ({h} m).",
      roomArea: "Room area", cabArea: "Chamber footprint", freeArea: "Remaining area", people: "Users at once",
      access: "ACCESS", disclaimer: "Approximate layout with a default {c} cm access space around each chamber. Final placement, delivery route and door clearance are confirmed in a site survey.",
      ctaQuote: "Request a quote for this layout", ctaConfig: "Design it in the configurator",
      f: { sofa: "Sofa", table: "Coffee table", tv: "TV unit", massage: "Massage table", counter: "Counter", lounger: "Lounger", treadmill: "Treadmill", rack: "Weight rack", bench: "Bench", bed: "Bed", nightstand: "Nightstand", armchair: "Armchair" }
    },
    ru: {
      scene: "Помещение", scenes: { home: "Дом / гостиная", spa: "Спа и велнес", gym: "Спортзал", hotel: "Номер отеля" },
      model: "Модель", soon: "размеры скоро", units: "Количество камер", roomW: "Ширина помещения", roomD: "Глубина помещения", ceil: "Высота потолка",
      rotate: "Повернуть выбранную камеру", reset: "Сбросить расстановку", hint: "Перетащите камеру, чтобы расположить её в помещении.",
      fit: "Помещается свободно", fitNote: "Вокруг камер остаётся {c} см для доступа.",
      tight: "Помещается, но тесно", tightNote: "Камера помещается, но зона доступа с некоторых сторон меньше {c} см. Сдвиньте камеру или выберите помещение больше.",
      clash: "Пересекается с мебелью", clashNote: "Перетащите камеру на свободное место.",
      no: "Не помещается", noNote: "Камера не помещается в эти размеры. Увеличьте помещение, поверните камеру или уменьшите количество.",
      lowCeil: "Потолок ниже высоты камеры ({h} м).",
      roomArea: "Площадь помещения", cabArea: "Площадь камер", freeArea: "Остаётся", people: "Пользователей одновременно",
      access: "ДОСТУП", disclaimer: "Приблизительная расстановка с зоной доступа {c} см вокруг камеры. Точное размещение, маршрут доставки и проход через двери подтверждаются при выезде на объект.",
      ctaQuote: "Запросить предложение по этой расстановке", ctaConfig: "Собрать в конфигураторе",
      f: { sofa: "Диван", table: "Столик", tv: "ТВ-тумба", massage: "Массажный стол", counter: "Стойка", lounger: "Шезлонг", treadmill: "Беговая дорожка", rack: "Стойка для весов", bench: "Скамья", bed: "Кровать", nightstand: "Тумба", armchair: "Кресло" }
    },
    ar: {
      scene: "المكان", scenes: { home: "المنزل / غرفة المعيشة", spa: "سبا وعافية", gym: "صالة رياضية", hotel: "غرفة فندق" },
      model: "الطراز", soon: "الأبعاد قريبًا", units: "عدد الغرف", roomW: "عرض الغرفة", roomD: "عمق الغرفة", ceil: "ارتفاع السقف",
      rotate: "تدوير الغرفة المحددة", reset: "إعادة التوزيع", hint: "اسحب الغرفة لتحديد موضعها في المكان.",
      fit: "تتسع براحة", fitNote: "تبقى مسافة وصول {c} سم حول الغرف.",
      tight: "تتسع لكن بضيق", tightNote: "الغرفة تتسع، لكن مسافة الوصول أقل من {c} سم في بعض الجوانب. جرّب تحريكها أو مساحة أكبر.",
      clash: "تتداخل مع الأثاث", clashNote: "اسحب الغرفة إلى مساحة فارغة.",
      no: "لا تتسع", noNote: "الغرفة لا تتسع لهذه الأبعاد. جرّب مساحة أكبر أو تدويرها أو عددًا أقل.",
      lowCeil: "السقف أقل من ارتفاع الغرفة ({h} م).",
      roomArea: "مساحة المكان", cabArea: "مساحة قاعدة الغرف", freeArea: "المساحة المتبقية", people: "مستخدمون في وقت واحد",
      access: "وصول", disclaimer: "توزيع تقريبي مع مسافة وصول افتراضية {c} سم حول كل غرفة. يُؤكَّد الموضع النهائي ومسار التسليم وعرض الباب خلال معاينة الموقع.",
      ctaQuote: "اطلب عرض سعر لهذا التوزيع", ctaConfig: "صمّمها في أداة التهيئة",
      f: { sofa: "أريكة", table: "طاولة", tv: "وحدة تلفاز", massage: "طاولة تدليك", counter: "منضدة", lounger: "كرسي استرخاء", treadmill: "جهاز مشي", rack: "رف أوزان", bench: "مقعد", bed: "سرير", nightstand: "منضدة جانبية", armchair: "كرسي بذراعين" }
    },
    es: {
      scene: "Espacio", scenes: { home: "Hogar / salón", spa: "Spa y wellness", gym: "Gimnasio", hotel: "Habitación de hotel" },
      model: "Modelo", soon: "medidas pronto", units: "Número de cámaras", roomW: "Ancho de la sala", roomD: "Fondo de la sala", ceil: "Altura del techo",
      rotate: "Girar la cámara seleccionada", reset: "Restablecer distribución", hint: "Arrastre la cámara para colocarla en la sala.",
      fit: "Cabe con holgura", fitNote: "Quedan {c} cm de acceso alrededor de las cámaras.",
      tight: "Cabe, pero justo", tightNote: "La cámara cabe, pero el espacio de acceso baja de {c} cm en algunos lados. Pruebe a moverla o un espacio mayor.",
      clash: "Choca con el mobiliario", clashNote: "Arrastre la cámara a una zona libre.",
      no: "No cabe", noNote: "La cámara no cabe en estas medidas. Pruebe una sala mayor, girarla o menos cámaras.",
      lowCeil: "El techo es más bajo que la cámara ({h} m).",
      roomArea: "Superficie de la sala", cabArea: "Superficie de las cámaras", freeArea: "Superficie libre", people: "Usuarios a la vez",
      access: "ACCESO", disclaimer: "Distribución aproximada con {c} cm de acceso por defecto alrededor de cada cámara. La ubicación final, la ruta de entrega y el paso por puertas se confirman en una visita técnica.",
      ctaQuote: "Solicitar presupuesto para esta distribución", ctaConfig: "Diseñarla en el configurador",
      f: { sofa: "Sofá", table: "Mesa baja", tv: "Mueble TV", massage: "Camilla de masaje", counter: "Mostrador", lounger: "Tumbona", treadmill: "Cinta de correr", rack: "Soporte de pesas", bench: "Banco", bed: "Cama", nightstand: "Mesita", armchair: "Butaca" }
    },
    pt: {
      scene: "Espaço", scenes: { home: "Casa / sala", spa: "Spa e wellness", gym: "Academia", hotel: "Quarto de hotel" },
      model: "Modelo", soon: "medidas em breve", units: "Número de câmaras", roomW: "Largura do ambiente", roomD: "Profundidade do ambiente", ceil: "Pé-direito",
      rotate: "Girar a câmara selecionada", reset: "Reiniciar layout", hint: "Arraste a câmara para posicioná-la no ambiente.",
      fit: "Cabe com folga", fitNote: "Sobram {c} cm de acesso ao redor das câmaras.",
      tight: "Cabe, mas apertado", tightNote: "A câmara cabe, mas o espaço de acesso fica abaixo de {c} cm em alguns lados. Tente movê-la ou um espaço maior.",
      clash: "Sobrepõe-se aos móveis", clashNote: "Arraste a câmara para uma área livre.",
      no: "Não cabe", noNote: "A câmara não cabe nestas medidas. Tente um ambiente maior, girá-la ou menos câmaras.",
      lowCeil: "O pé-direito é menor que a altura da câmara ({h} m).",
      roomArea: "Área do ambiente", cabArea: "Área das câmaras", freeArea: "Área livre", people: "Usuários ao mesmo tempo",
      access: "ACESSO", disclaimer: "Layout aproximado com {c} cm de acesso padrão ao redor de cada câmara. Posição final, rota de entrega e passagem por portas são confirmadas em uma visita técnica.",
      ctaQuote: "Pedir orçamento para este layout", ctaConfig: "Projetar no configurador",
      f: { sofa: "Sofá", table: "Mesa de centro", tv: "Rack de TV", massage: "Maca de massagem", counter: "Balcão", lounger: "Espreguiçadeira", treadmill: "Esteira", rack: "Suporte de pesos", bench: "Banco", bed: "Cama", nightstand: "Criado-mudo", armchair: "Poltrona" }
    },
    de: {
      scene: "Umgebung", scenes: { home: "Zuhause / Wohnzimmer", spa: "Spa & Wellness", gym: "Fitnessstudio", hotel: "Hotelzimmer" },
      model: "Modell", soon: "Maße folgen", units: "Anzahl Kammern", roomW: "Raumbreite", roomD: "Raumtiefe", ceil: "Deckenhöhe",
      rotate: "Ausgewählte Kammer drehen", reset: "Anordnung zurücksetzen", hint: "Ziehen Sie eine Kammer, um sie im Raum zu platzieren.",
      fit: "Passt bequem", fitNote: "Rund um die Kammern bleiben {c} cm Zugangsfläche.",
      tight: "Passt, aber eng", tightNote: "Die Kammer passt, doch die Zugangsfläche liegt an manchen Seiten unter {c} cm. Verschieben Sie sie oder wählen Sie mehr Fläche.",
      clash: "Überschneidet Möbel", clashNote: "Ziehen Sie die Kammer auf eine freie Fläche.",
      no: "Passt nicht", noNote: "Die Kammer passt nicht in diese Raummaße. Versuchen Sie einen größeren Raum, eine Drehung oder weniger Kammern.",
      lowCeil: "Die Decke ist niedriger als die Kammer ({h} m).",
      roomArea: "Raumfläche", cabArea: "Grundfläche Kammern", freeArea: "Freie Fläche", people: "Nutzer gleichzeitig",
      access: "ZUGANG", disclaimer: "Ungefähre Anordnung mit standardmäßig {c} cm Zugangsfläche um jede Kammer. Endgültige Position, Lieferweg und Türdurchgang werden bei einer Vor-Ort-Begehung bestätigt.",
      ctaQuote: "Angebot für diese Anordnung anfragen", ctaConfig: "Im Konfigurator gestalten",
      f: { sofa: "Sofa", table: "Couchtisch", tv: "TV-Möbel", massage: "Massageliege", counter: "Theke", lounger: "Liege", treadmill: "Laufband", rack: "Hantelablage", bench: "Bank", bed: "Bett", nightstand: "Nachttisch", armchair: "Sessel" }
    }
  };

  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function h(tag, cls, parent, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }
  function fmt(s, vars) { return s.replace(/\{(\w+)\}/g, function (_, k) { return vars[k]; }); }
  function overlap(a, b) { return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.d && b.y < a.y + a.d; }
  function grow(c, p) { return { x: c.x - p, y: c.y - p, w: c.w + 2 * p, d: c.d + 2 * p }; }

  function RoomFit(root) {
    var lang = (document.documentElement.lang || "tr").slice(0, 2);
    var t = T[lang] || T.en;
    function num(v) { return v.toLocaleString(lang, { maximumFractionDigits: 1 }); }
    var state = {
      scene: SCENES[root.getAttribute("data-scene")] ? root.getAttribute("data-scene") : "home",
      model: root.getAttribute("data-model") || "solo-lounge",
      units: 1, roomW: 0, roomD: 0, ceil: 0, cabs: [], sel: 0
    };
    var uid = Math.random().toString(36).slice(2, 7);

    /* ---------- arayüz ---------- */
    root.classList.add("room-fit");
    var controls = h("div", "rf-controls", root);
    var sceneRow = h("div", "rf-field rf-field--wide", controls);
    h("span", "rf-label", sceneRow, t.scene);
    var chips = h("div", "rf-chips", sceneRow);
    chips.setAttribute("role", "radiogroup");
    chips.setAttribute("aria-label", t.scene);
    var sceneBtns = {};
    Object.keys(SCENES).forEach(function (k) {
      var b = h("button", "rf-chip", chips, t.scenes[k]);
      b.type = "button";
      b.setAttribute("role", "radio");
      b.addEventListener("click", function () { setScene(k); });
      sceneBtns[k] = b;
    });

    var modelRow = h("div", "rf-field", controls);
    var modelLabel = h("label", "rf-label", modelRow, t.model);
    var modelSel = h("select", "rf-select", modelRow);
    modelSel.id = "rf-model-" + uid;
    modelLabel.htmlFor = modelSel.id;
    MODELS.forEach(function (m) {
      var o = h("option", null, modelSel, m.w ? m.name + " — " + m.w + "×" + m.d + " cm" : m.name + " (" + t.soon + ")");
      o.value = m.id;
      if (!m.w) o.disabled = true;
    });
    modelSel.addEventListener("change", function () { state.model = modelSel.value; layout(true); });

    function numField(key, label, min, max, step, unit, onChange) {
      var row = h("div", "rf-field rf-field--num", controls);
      var lab = h("label", "rf-label", row, label);
      var wrap = h("div", "rf-num", row);
      var range = h("input", null, wrap);
      range.type = "range"; range.min = min; range.max = max; range.step = step;
      range.setAttribute("aria-label", label);
      var box = h("input", "rf-num-input", wrap);
      box.type = "number"; box.min = min; box.max = max; box.step = step; box.inputMode = "decimal";
      box.id = "rf-" + key + "-" + uid;
      lab.htmlFor = box.id;
      if (unit) h("span", "rf-unit", wrap, unit);
      function sync(v, from) {
        v = Math.min(max, Math.max(min, +v || min));
        if (from !== range) range.value = v;
        if (from !== box) box.value = v;
        onChange(v);
      }
      range.addEventListener("input", function () { sync(range.value, range); });
      box.addEventListener("change", function () { sync(box.value, box); });
      return { set: function (v) { range.value = v; box.value = v; } };
    }
    var fW = numField("w", t.roomW, 2, 15, 0.1, "m", function (v) { state.roomW = Math.round(v * 100); layout(false); });
    var fD = numField("d", t.roomD, 2, 15, 0.1, "m", function (v) { state.roomD = Math.round(v * 100); layout(false); });
    var fC = numField("c", t.ceil, 2, 5, 0.05, "m", function (v) { state.ceil = Math.round(v * 100); render(); });
    var fU = numField("u", t.units, 1, MAX_UNITS, 1, "", function (v) { state.units = v; layout(true); });

    var stage = h("div", "rf-stage", root);
    var svg = el("svg", { class: "rf-svg", role: "img" }, stage);
    var tools = h("div", "rf-tools", stage);
    h("p", "rf-hint", tools, t.hint);
    var rotBtn = h("button", "rf-btn", tools, "⟳ " + t.rotate);
    rotBtn.type = "button";
    rotBtn.addEventListener("click", function () {
      var c = state.cabs[state.sel];
      if (!c) return;
      var cx = c.x + c.w / 2, cy = c.y + c.d / 2, w = c.w;
      c.w = c.d; c.d = w;
      c.x = snap(cx - c.w / 2); c.y = snap(cy - c.d / 2);
      clampCab(c);
      render();
    });
    var resetBtn = h("button", "rf-btn rf-btn--ghost", tools, t.reset);
    resetBtn.type = "button";
    resetBtn.addEventListener("click", function () { layout(true); });

    var out = h("div", "rf-result", root);
    var verdict = h("div", "rf-verdict", out);
    verdict.setAttribute("aria-live", "polite");
    var vTitle = h("strong", null, verdict);
    var vNote = h("p", null, verdict);
    var stats = h("div", "rf-stats", out);
    function stat(label) {
      var s = h("div", "rf-stat", stats);
      var v = h("strong", null, s);
      h("span", null, s, label);
      return v;
    }
    var sRoom = stat(t.roomArea), sCab = stat(t.cabArea), sFree = stat(t.freeArea), sPeople = stat(t.people);
    var cta = h("div", "rf-cta", root);
    var aQuote = h("a", "btn btn-primary", cta, t.ctaQuote);
    var aConfig = h("a", "btn btn-outline", cta, t.ctaConfig);
    h("p", "rf-disclaimer", root, fmt(t.disclaimer, { c: CLEAR }));

    /* ---------- yerleşim ---------- */
    function model() { return MODELS.filter(function (m) { return m.id === state.model; })[0] || MODELS[0]; }
    function snap(v) { return Math.round(v / SNAP) * SNAP; }
    function clampCab(c) {
      c.x = Math.max(0, Math.min(state.roomW - c.w, c.x));
      c.y = Math.max(0, Math.min(state.roomD - c.d, c.y));
    }
    function furniture() {
      /* Oda küçülünce mobilya oda içinde kalsın (sağ/alt duvara yaslanır). */
      return SCENES[state.scene].furniture.map(function (f) {
        return {
          k: f.k, w: f.w, d: f.d,
          x: Math.min(f.x, Math.max(0, state.roomW - f.w)),
          y: Math.min(f.y, Math.max(0, state.roomD - f.d))
        };
      });
    }
    /* Kabinleri boş alana yerleştir. Her aday konum (iki yönde) için duvar,
       mobilya ve diğer kabinlere en yakın mesafe ölçülür; erişim payını en iyi
       koruyan konum seçilir (tam pay bulunursa ilk bulunan — köşeye yakın). */
    function gap(a, b) {
      var dx = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w), 0);
      var dy = Math.max(b.y - (a.y + a.d), a.y - (b.y + b.d), 0);
      return Math.max(dx, dy);
    }
    function autoPlace() {
      var m = model(), furn = furniture(), cabs = [];
      for (var i = 0; i < state.units; i++) cabs.push(findSpot(m, furn, cabs) || { x: 0, y: 0, w: m.w, d: m.d });
      return cabs;
    }
    function findSpot(m, furn, cabs) {
      var best = null, bestScore = -1, others = furn.concat(cabs);
      [[m.w, m.d], [m.d, m.w]].forEach(function (s) {
        for (var y = 0; y + s[1] <= state.roomD; y += 10) {
          for (var x = 0; x + s[0] <= state.roomW; x += 10) {
            var body = { x: x, y: y, w: s[0], d: s[1] };
            if (others.some(function (o) { return overlap(body, o); })) continue;
            var score = Math.min(x, y, state.roomW - x - s[0], state.roomD - y - s[1]);
            others.forEach(function (o) { score = Math.min(score, gap(body, o)); });
            score = Math.min(score, CLEAR);
            if (score > bestScore) { bestScore = score; best = body; }
          }
        }
      });
      return best;
    }
    function layout(replace) {
      if (replace || state.cabs.length !== state.units) state.cabs = autoPlace();
      else state.cabs.forEach(clampCab);
      state.sel = Math.max(0, Math.min(state.sel, state.cabs.length - 1));
      render();
    }
    function setScene(k) {
      state.scene = k;
      var s = SCENES[k];
      state.roomW = s.room[0]; state.roomD = s.room[1]; state.ceil = s.ceil;
      fW.set(s.room[0] / 100); fD.set(s.room[1] / 100); fC.set(s.ceil / 100);
      Object.keys(sceneBtns).forEach(function (n) {
        sceneBtns[n].classList.toggle("is-active", n === k);
        sceneBtns[n].setAttribute("aria-checked", n === k ? "true" : "false");
      });
      layout(true);
    }

    /* ---------- değerlendirme ----------
       no    : kabin odadan taşıyor ya da iki kabin üst üste
       clash : kabin mobilyanın üstünde
       tight : kabin sığıyor ama erişim payı duvar/mobilya/diğer kabinle daralıyor
       fit   : her kabinin çevresinde tam erişim payı var */
    function evaluate() {
      var worst = 0, furn = furniture(), levels = ["fit", "tight", "clash", "no"];
      function up(s) { worst = Math.max(worst, levels.indexOf(s)); }
      state.cabs.forEach(function (c, i) {
        var zone = grow(c, CLEAR);
        if (c.x < 0 || c.y < 0 || c.x + c.w > state.roomW || c.y + c.d > state.roomD) up("no");
        state.cabs.forEach(function (o, j) {
          if (j === i) return;
          if (overlap(c, o)) up("no");
          else if (overlap(zone, o)) up("tight");
        });
        furn.forEach(function (f) {
          if (overlap(c, f)) up("clash");
          else if (overlap(zone, f)) up("tight");
        });
        if (zone.x < 0 || zone.y < 0 || zone.x + zone.w > state.roomW || zone.y + zone.d > state.roomD) up("tight");
      });
      return levels[worst];
    }

    /* ---------- çizim ---------- */
    var drag = null;
    function render() {
      var m = model(), W = state.roomW, D = state.roomD, PAD = 40;
      svg.setAttribute("viewBox", (-PAD) + " " + (-PAD) + " " + (W + 2 * PAD) + " " + (D + 2 * PAD));
      svg.setAttribute("aria-label", t.scenes[state.scene] + ": " + num(W / 100) + " × " + num(D / 100) + " m");
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      el("rect", { x: -10, y: -10, width: W + 20, height: D + 20, rx: 4, class: "rf-wall" }, svg);
      el("rect", { x: 0, y: 0, width: W, height: D, class: "rf-floor" }, svg);
      /* Erişim alanı duvarın dışına çizilmez (ölçü yazılarını örtmesin);
         daralma kararı zaten metinde ve renkte söyleniyor. */
      var clip = el("clipPath", { id: "rf-clip-" + uid }, el("defs", {}, svg));
      el("rect", { x: 0, y: 0, width: W, height: D }, clip);
      var grid = el("g", { class: "rf-grid" }, svg);
      for (var gx = 50; gx < W; gx += 50) el("line", { x1: gx, y1: 0, x2: gx, y2: D, class: gx % 100 ? "" : "rf-grid-m" }, grid);
      for (var gy = 50; gy < D; gy += 50) el("line", { x1: 0, y1: gy, x2: W, y2: gy, class: gy % 100 ? "" : "rf-grid-m" }, grid);
      el("text", { x: W / 2, y: -20, class: "rf-dim" }, svg).textContent = num(W / 100) + " m";
      el("text", { x: -20, y: D / 2, class: "rf-dim", transform: "rotate(-90 -20 " + (D / 2) + ")" }, svg).textContent = num(D / 100) + " m";

      furniture().forEach(function (f) {
        var g = el("g", { class: "rf-furn" }, svg);
        el("rect", { x: f.x, y: f.y, width: f.w, height: f.d, rx: 6 }, g);
        var fx = f.x + f.w / 2, fy = f.y + f.d / 2;
        var label = el("text", { x: fx, y: fy }, g);
        label.textContent = t.f[f.k] || "";
        if (f.d > f.w * 1.6) label.setAttribute("transform", "rotate(-90 " + fx + " " + fy + ")");
      });

      var status = evaluate();
      state.cabs.forEach(function (c, i) {
        var g = el("g", { class: "rf-cab rf-cab--" + status + (i === state.sel ? " is-sel" : ""), tabindex: "0", "data-i": i, role: "button",
          "aria-label": m.name + " " + (i + 1) + ", " + c.w + "×" + c.d + " cm" }, svg);
        var zone = grow(c, CLEAR);
        el("rect", { x: zone.x, y: zone.y, width: zone.w, height: zone.d, rx: 12, class: "rf-access", "clip-path": "url(#rf-clip-" + uid + ")" }, g);
        el("rect", { x: c.x, y: c.y, width: c.w, height: c.d, rx: Math.min(c.w, c.d) * 0.22, class: "rf-body" }, g);
        var cx = c.x + c.w / 2, cy = c.y + c.d / 2, rot = c.d > c.w * 1.4 ? "rotate(-90 " + cx + " " + cy + ")" : null;
        var name = el("text", { x: cx, y: cy - 4, class: "rf-cab-name" }, g);
        name.textContent = state.cabs.length > 1 ? m.name + " " + (i + 1) : m.name;
        var size = el("text", { x: cx, y: cy + 18, class: "rf-cab-size" }, g);
        size.textContent = c.w + "×" + c.d;
        if (rot) { name.setAttribute("transform", rot); size.setAttribute("transform", rot); }
        if (i === state.sel && zone.y + zone.d <= D + 4) {
          el("text", { x: cx, y: c.y + c.d + CLEAR / 2 + 6, class: "rf-access-label" }, g).textContent = t.access;
        }
        g.addEventListener("pointerdown", startDrag);
        g.addEventListener("keydown", keyMove);
      });

      var titles = { fit: t.fit, tight: t.tight, clash: t.clash, no: t.no };
      var notes = { fit: fmt(t.fitNote, { c: CLEAR }), tight: fmt(t.tightNote, { c: CLEAR }), clash: t.clashNote, no: t.noNote };
      var lowCeil = m.h && state.ceil && state.ceil < m.h;
      verdict.className = "rf-verdict rf-verdict--" + (lowCeil ? "no" : status);
      vTitle.textContent = lowCeil && status === "fit" ? t.no : titles[status];
      vNote.textContent = notes[status] + (lowCeil ? " " + fmt(t.lowCeil, { h: num(m.h / 100) }) : "");
      var room = W * D, cab = state.cabs.length * m.w * m.d;
      sRoom.textContent = num(room / 10000) + " m²";
      sCab.textContent = num(cab / 10000) + " m²";
      sFree.textContent = num(Math.max(0, room - cab) / 10000) + " m²";
      sPeople.textContent = String(state.cabs.length * m.cap);
      aConfig.href = "konfigurator.html?model=" + encodeURIComponent(m.id);
      aQuote.href = "iletisim.html?model=" + encodeURIComponent(m.id) + "&adet=" + state.cabs.length +
        "&oda=" + (W / 100) + "x" + (D / 100) + "#contact-form";
    }
    function focusCab(i) { var g = svg.querySelector('[data-i="' + i + '"]'); if (g) g.focus({ preventScroll: true }); }
    function toCm(e) {
      var p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
      return p.matrixTransform(svg.getScreenCTM().inverse());
    }
    function startDrag(e) {
      var i = +e.currentTarget.getAttribute("data-i"), c = state.cabs[i], p = toCm(e);
      state.sel = i;
      drag = { i: i, dx: p.x - c.x, dy: p.y - c.y, id: e.pointerId };
      svg.setPointerCapture(e.pointerId);
      e.preventDefault();
      render();
    }
    svg.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var c = state.cabs[drag.i], p = toCm(e);
      c.x = snap(p.x - drag.dx); c.y = snap(p.y - drag.dy);
      clampCab(c);
      render();
    });
    function endDrag(e) { if (drag && e.pointerId === drag.id) { drag = null; render(); } }
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);
    function keyMove(e) {
      var i = +e.currentTarget.getAttribute("data-i"), c = state.cabs[i];
      if (!c) return;
      state.sel = i;
      var s = e.shiftKey ? 50 : 10, k = e.key;
      /* SVG planı RTL'de de soldan sağa çizilir; ok tuşları ekrandaki yöne uyar. */
      if (k === "ArrowLeft") c.x -= s;
      else if (k === "ArrowRight") c.x += s;
      else if (k === "ArrowUp") c.y -= s;
      else if (k === "ArrowDown") c.y += s;
      else if (k === "r" || k === "R") { rotBtn.click(); focusCab(i); return; }
      else return;
      e.preventDefault();
      clampCab(c); render(); focusCab(i);
    }

    if (!MODELS.some(function (m) { return m.id === state.model && m.w; })) state.model = "solo-lounge";
    modelSel.value = state.model;
    fU.set(1);
    setScene(state.scene);
  }

  function init() { Array.prototype.forEach.call(document.querySelectorAll("[data-room-fit]"), RoomFit); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
