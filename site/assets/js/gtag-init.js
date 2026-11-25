/* Google etiketleri (GA4 + Ads) başlatma — CSP script-src 'self' uyumu için
   satır-içi yerine harici dosya (satır-içi script CSP'de yasak ve bloklanıyordu). */
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", "G-C4BP4KX9FC");
gtag("config", "G-KZ5Y39XS2F");
gtag("config", "AW-18410338370");

(function () {
  function fire(name, params) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    } catch (e) {}
  }
  window.hbotTrackEvent = fire;

  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a") : null;
    if (!a) return;
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href.indexOf("wa.me") > -1 || href.indexOf("whatsapp") > -1) {
      fire("whatsapp_click", { link_url: href });
    } else if (href.endsWith(".pdf") || a.hasAttribute("download")) {
      fire("catalog_download", { link_url: href });
    } else if (href.indexOf("tel:") === 0) {
      fire("phone_click", { link_url: href });
    }
  });

  document.addEventListener("submit", function (ev) {
    var form = ev.target;
    if (!form || !form.tagName) return;
    if (form.id === "configuratorForm" || location.pathname.indexOf("konfigurator") > -1) {
      fire("configurator_submit", { page: location.pathname });
    } else if (form.id !== "roiCalcForm") {
      fire("generate_lead", { page: location.pathname });
    }
  });
})();
