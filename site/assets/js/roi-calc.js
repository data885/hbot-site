(function () {
  "use strict";
  var form = document.getElementById("roiCalcForm");
  if (!form) return;

  var out = document.getElementById("roiOutput");
  var isTr = (document.documentElement.lang || "").toLowerCase().indexOf("tr") === 0;
  var modelData = {
    oslo: { price: 29900, cap: 1, name: "Oslo (1P Wellness)" },
    dubai: { price: 69900, cap: 1, name: "Dubai (1P Wellness/Pro)" },
    tokyo: { price: 119900, cap: 2, name: "Tokyo (2P Pro/Clinical)" },
    "tokyo-plus": { price: 149900, cap: 4, name: "Tokyo Plus (4P Pro/Clinical)" },
    milano: { price: 224900, cap: 4, name: "Milano (3+1P Clinical)" },
    geneva: { price: 259900, cap: 12, name: "Geneva (10+2P Multiplace)" }
  };

  function fmt(n, cur) {
    var rounded = Math.round(n || 0);
    try {
      return new Intl.NumberFormat(isTr ? "tr-TR" : "en-US", {
        style: "currency",
        currency: cur,
        maximumFractionDigits: 0
      }).format(rounded);
    } catch (e) {
      return cur + " " + rounded.toLocaleString();
    }
  }

  function calc() {
    var mKey = form.elements.model.value;
    var m = modelData[mKey] || modelData.dubai;
    var cur = form.elements.currency.value || "EUR";
    var investInput = Number(form.elements.investment.value);
    var invest = investInput > 0 ? investInput : m.price;
    var fee = Math.max(10, Number(form.elements.sessionFee.value) || 120);
    var sessions = Math.max(1, Number(form.elements.sessionsPerDay.value) || 5);
    var guests = Math.max(1, Math.min(m.cap, Number(form.elements.guestsPerSession.value) || 1));
    var days = Math.max(1, Math.min(31, Number(form.elements.daysPerMonth.value) || 26));
    var opex = Math.max(0, Number(form.elements.monthlyOpex.value) || 0);

    var grossMonth = fee * guests * sessions * days;
    var netMonth = grossMonth - opex;
    var annualNet = netMonth * 12;
    var paybackMonths = netMonth > 0 ? (invest / netMonth) : null;

    var rows = [
      [isTr ? "Seçilen Model & Kapasite" : "Selected Model & Capacity", m.name + " (" + guests + "/" + m.cap + ")"],
      [isTr ? "Aylık Tahmini Brüt Gelir" : "Estimated Monthly Gross Revenue", fmt(grossMonth, cur)],
      [isTr ? "Aylık Net Katkı (İşletme Gideri Sonrası)" : "Monthly Net Contribution (After OpEx)", fmt(netMonth, cur)],
      [isTr ? "Yıllık Tahmini Net Katkı" : "Estimated Annual Net Contribution", fmt(annualNet, cur)],
      [isTr ? "Tahmini Geri Ödeme (Amortisman)" : "Estimated Payback Period",
        paybackMonths ? (paybackMonths.toFixed(1) + (isTr ? " ay" : " months")) : (isTr ? "Gelir gideri karşılamıyor" : "OpEx exceeds gross revenue")]
    ];

    out.textContent = "";
    var dl = document.createElement("dl");
    dl.className = "roi-dl";
    rows.forEach(function (pair, i) {
      var dt = document.createElement("dt");
      dt.textContent = pair[0];
      var dd = document.createElement("dd");
      dd.textContent = pair[1];
      if (i === 4) dd.className = "roi-highlight";
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    out.appendChild(dl);

    var note = document.createElement("p");
    note.className = "roi-note";
    note.textContent = isTr
      ? "Not: Varsayımsal simülasyondur; doluluk oranı, yerel işletme giderleri ve finansmana göre değişir."
      : "Note: Illustrative commercial estimate; actual returns depend on occupancy, local operating costs, and financing.";
    out.appendChild(note);
  }

  form.elements.model.addEventListener("change", function () {
    var m = modelData[form.elements.model.value];
    if (m) {
      form.elements.investment.value = m.price;
      form.elements.guestsPerSession.max = String(m.cap);
      if (Number(form.elements.guestsPerSession.value) > m.cap) {
        form.elements.guestsPerSession.value = String(m.cap);
      }
    }
    calc();
  });

  form.addEventListener("input", calc);
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    calc();
    if (typeof window.hbotTrackEvent === "function") {
      window.hbotTrackEvent("calculator_complete", {
        calc_type: "hbot_roi",
        model: form.elements.model.value,
        language: isTr ? "tr" : "en"
      });
    }
  });

  calc();
})();
