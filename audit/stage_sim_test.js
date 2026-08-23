// v12 stage race simulation: delayed image loads must never overwrite the latest choice.
const fs = require("fs");
const path = require("path");
const siteDir = path.resolve(__dirname, "../site");

function makeEl(id) {
  const classes = new Set();
  return {
    id, src: "", style: {}, hidden: false, textContent: "", innerHTML: "",
    classList: {
      add: (...xs) => xs.forEach((x) => classes.add(x)),
      remove: (...xs) => xs.forEach((x) => classes.delete(x)),
      toggle: (x, force) => (force ? classes.add(x) : classes.delete(x)),
      contains: (x) => classes.has(x)
    },
    addEventListener() {}, querySelectorAll: () => [], querySelector: () => null,
    getAttribute: () => null, setAttribute() {}, getContext: () => null
  };
}

const stage = makeEl("config-stage");
const imgA = makeEl("stage-img-a");
const imgB = makeEl("stage-img-b");
imgA.src = "/assets/img/models/real/oslo-real.webp?v=5";
imgB.src = imgA.src;
imgA.classList.add("is-active");
const ids = {
  "config-stage": stage, "stage-img-a": imgA, "stage-img-b": imgB,
  "stage-model-name": makeEl("stage-model-name"), "lounge-decor-note": makeEl("lounge-decor-note")
};
global.document = {
  getElementById: (id) => ids[id] || null,
  querySelectorAll: () => [], querySelector: () => null, addEventListener() {},
  createElement: () => makeEl("canvas"),
  body: { getAttribute: () => "configurator", appendChild() {} },
  documentElement: { getAttribute: () => "tr" }
};
global.window = {
  matchMedia: () => ({ matches: true }), addEventListener() {},
  location: { search: "", origin: "http://localhost", pathname: "/konfigurator.html", href: "" }
};
global.navigator = { language: "tr" };
global.localStorage = { getItem: () => null, setItem() {} };
global.fetch = () => Promise.reject(new Error("offline"));
global.performance = { now: () => 0 };
global.requestAnimationFrame = () => 0;
global.cancelAnimationFrame = () => {};
global.setTimeout = () => 0;

const pending = [];
global.Image = class FakeImage {
  set src(value) { this._src = value; pending.push(this); }
  get src() { return this._src; }
  resolve() { if (this.onload) this.onload(); }
};

const tSrc = fs.readFileSync(path.join(siteDir, "assets/js/translations.js"), "utf8");
global.TRANSLATIONS = new Function(tSrc + "; return TRANSLATIONS;")();
let src = fs.readFileSync(path.join(siteDir, "assets/js/main.js"), "utf8");
src = src.replace(/\}\)\(\);\s*$/, `
  return { configState, currentStageTarget, updateConfigStage, normalizeConfigStageView };
})();`);
const M = new Function("return " + src)();
const dict = TRANSLATIONS.tr;
let failures = 0;
function check(name, condition, detail = "") {
  if (condition) console.log(`  ✔ ${name}`);
  else { failures++; console.log(`  ✘ ${name}${detail ? ` — ${detail}` : ""}`); }
}
function activeImage() { return imgA.classList.contains("is-active") ? imgA : imgB; }

console.log("== 1. Hızlı model seçimi / geç yüklenen eski görsel ==");
M.updateConfigStage(dict); // Oslo request
M.configState.model = "solo";
M.updateConfigStage(dict); // Dubai request
M.configState.model = "duo";
M.updateConfigStage(dict); // Tokyo request
check("üç yükleme isteği oluştu", pending.length === 3, String(pending.length));
pending[2].resolve(); // latest first
pending[1].resolve(); // stale Dubai afterwards
pending[0].resolve(); // stale Oslo last
check("en son seçim Tokyo olarak kalır", activeImage().src.includes("real/tokyo-real.webp"), activeImage().src);
check("yalnız bir sahne katmanı aktif", imgA.classList.contains("is-active") !== imgB.classList.contains("is-active"));

console.log("\n== 2. Görünüm normalizasyonu ==");
M.configState.model = "solo-lounge";
M.configState.stageView = "interior";
M.updateConfigStage(dict);
pending.at(-1).resolve();
check("Oslo iç görünüm talebi dış görünüme normalize edilir", M.configState.stageView === "exterior");
check("Oslo kendi görselini gösterir", activeImage().src.includes("real/oslo-real.webp"), activeImage().src);

M.configState.model = "nexus";
M.configState.stageView = "exterior";
M.updateConfigStage(dict);
pending.at(-1).resolve();
check("Geneva dış görünüm talebi iç görünüme normalize edilir", M.configState.stageView === "interior");
check("Geneva kendi iç görselini gösterir", activeImage().src.includes("real/geneva-interior.webp"), activeImage().src);

console.log("\n== 3. Aynı hedefte gereksiz istek yok ==");
const before = pending.length;
M.updateConfigStage(dict);
check("aynı src tekrar yüklenmez", pending.length === before, `${before} -> ${pending.length}`);

if (failures) { console.log(`\n${failures} STAGE TESTİ BAŞARISIZ`); process.exit(1); }
console.log("\nTüm stage yarış testleri geçti. ✔");
