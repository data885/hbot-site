/* Konfigüratör ara sahnesinden gelindiyse sayfa ilk karede perdenin son hâliyle
   (koyu zemin) açılsın; main.js sahne hazır olunca bu örtüyü yavaşça kaldırır.
   Örtü takılı kalamaz: CSS kendi başına 2,4 sn sonra kaldırır.
   Satır içi script CSP'ye takıldığı için ayrı dosya; <head>'de, senkron. */
(function () {
  try {
    if (sessionStorage.getItem("hbotConfigIntroHandoff") !== "1") return;
    sessionStorage.removeItem("hbotConfigIntroHandoff");
    document.documentElement.classList.add("ci-handoff");
  } catch (e) { /* depolama kapalı: örtü yok, sayfa normal açılır */ }
})();
