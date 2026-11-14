/* Site açılışı — ana sayfaya dışarıdan her girişte ~4 sn HBOT logo filmi
   (doğrudan adres, arama, reklam, sosyal medya). Site içinden ana sayfaya
   dönüşte oynamaz; ?intro=1 ile her zaman oynar.
   <head>'de senkron yüklenir: uygunsa html'e "hbot-splash" konur ve CSS ilk
   boyamadan itibaren koyu açılış zeminini gösterir (sayfa bir an görünüp sonra
   örtülmesin). <body> oluşur oluşmaz film eklenir; translations.js / main.js'i
   beklemez. Bitince (ya da "Geç", tıklama, Esc) site yumuşakça açılır ve
   "hbot:splash-done" olayı yayılır — banner filmi ancak o zaman başlar.
   Film başlayamazsa kullanıcı koyu ekranda bekletilmez. */
(function () {
  var root = document.documentElement;
  var START_WAIT = 2500; // film bu sürede oynamazsa açılış atlanır
  var MAX = 6000;        // ne olursa olsun bu sürede site açılır (film ~3,8 sn)
  var FORCE = /[?&]intro=1(&|$)/.test(location.search);

  function internalNav() {
    try { return !!document.referrer && new URL(document.referrer).host === location.host; } catch (e) { return false; }
  }
  function eligible() {
    if (/bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|lighthouse/i.test(navigator.userAgent)) return false;
    if (FORCE) return true;
    if (internalNav()) return false;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    var conn = navigator.connection || {};
    if (conn.saveData === true || /^(slow-2g|2g)$/.test(conn.effectiveType || "")) return false;
    /* Arka planda açılan sekme ya da sayfa içi bağlantı (#bölüm): açılış yok. */
    if (document.visibilityState === "hidden" || location.hash) return false;
    return true;
  }
  if (!eligible()) return;
  root.classList.add("hbot-splash");

  var SKIP = { tr: "Geç", en: "Skip", ru: "Пропустить", ar: "تخطي", es: "Saltar", pt: "Pular", de: "Überspringen" };

  function whenBody(fn) {
    if (document.body) { fn(); return; }
    var mo = new MutationObserver(function () {
      if (document.body) { mo.disconnect(); fn(); }
    });
    mo.observe(root, { childList: true });
  }

  whenBody(function () {
    var wrap = document.createElement("div");
    wrap.className = "site-splash";
    var v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("aria-hidden", "true");
    v.preload = "auto";
    v.poster = "/assets/img/splash/hbot-splash-start.webp?v=1";
    var narrow = Math.min(window.innerWidth || 9999, (window.screen && window.screen.width) || 9999) < 768;
    v.src = "/assets/video/splash/hbot-splash-" + (narrow ? "480" : "720") + ".mp4?v=2";
    var skip = document.createElement("button");
    skip.type = "button";
    skip.className = "site-splash-skip";
    skip.textContent = SKIP[(root.lang || "tr").slice(0, 2)] || SKIP.en;
    wrap.appendChild(v);
    wrap.appendChild(skip);
    document.body.insertBefore(wrap, document.body.firstChild);

    var done = false;
    var started = false;
    function finish() {
      if (done) return;
      done = true;
      document.removeEventListener("keydown", onKey);
      root.classList.add("hbot-splash-out");
      setTimeout(function () {
        root.classList.remove("hbot-splash", "hbot-splash-out");
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
        window.__hbotSplashDone = true;
        document.dispatchEvent(new Event("hbot:splash-done"));
      }, 620);
    }
    function onKey(e) { if (e.key === "Escape") finish(); }

    wrap.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    v.addEventListener("playing", function () { started = true; });
    v.addEventListener("ended", finish);
    v.addEventListener("error", finish);
    var p = v.play();
    if (p && p.catch) p.catch(function () { if (v.paused) finish(); });
    setTimeout(function () { if (!started) finish(); }, START_WAIT);
    setTimeout(finish, MAX);
  });
})();
