// Functional test of configurator logic extracted from main.js (IIFE -> exported internals)
const fs = require("fs");
const path = require("path");
const siteDir = path.resolve(__dirname, "../site");

// --- stubs ---
const elStub = () => ({
  addEventListener() {}, setAttribute() {}, classList: { add() {}, remove() {}, toggle() {} },
  querySelectorAll: () => [], style: {}, textContent: "", innerHTML: "",
});
global.document = {
  addEventListener() {},
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: elStub,
  body: { getAttribute: () => "configurator", appendChild() {} },
  documentElement: {},
};
global.window = {
  matchMedia: () => ({ matches: true }), addEventListener() {}, location: { search: "", origin: "http://localhost", pathname: "/konfigurator.html", href: "" },
};
global.navigator = { language: "tr" };
global.localStorage = { getItem: () => null, setItem() {} };
global.fetch = () => Promise.reject(new Error("offline"));
global.performance = { now: () => 0 };
global.requestAnimationFrame = () => 0;
global.cancelAnimationFrame = () => {};

const tSrc = fs.readFileSync(path.join(siteDir, "assets/js/translations.js"), "utf8");
global.TRANSLATIONS = new Function(tSrc + "; return TRANSLATIONS;")();

let src = fs.readFileSync(path.join(siteDir, "assets/js/main.js"), "utf8");
// expose internals: turn trailing "})();" into a return
src = src.replace(/\}\)\(\);\s*$/, `
  return { configState, MODEL_PRICING, ensureTierCompatible, spinNormIdx, spinFrameKey, spinAvailableFor,
           currentStageTarget, computeSubtotal, computeTotal, tiltClipPoly, SPIN_MODELS, SPIN_FRAME_COUNT,
           STAGE_TINT_MASKS, STAGE_TINT_CLIP, STAGE_SEAT_MASKS, EXT_TINT_STRENGTH, INT_TINT_STRENGTH,
           SEAT_TINT_STRENGTH, REAL_STAGE, REAL_INTERIOR, MODEL_CARD_IMG, NEXUS_BASE_SEATS, NEXUS_MAX_SEATS,
           NEXUS_SEAT_PRICE, ADDON_PRICING, STYLE_PRICING, REF_CODES };
})();`);

const M = new Function("return " + src)();

let fails = 0;
function check(name, cond, detail) {
  if (cond) console.log("  ✔ " + name);
  else { console.log("  ✘ " + name + (detail ? " — " + detail : "")); fails++; }
}

console.log("== 1. ATA kademe kuralları ==");
const models = Object.keys(M.MODEL_PRICING);
models.forEach((m) => {
  const atas = M.MODEL_PRICING[m].tiers.map((t) => t.ata);
  check(`${m}: 1.3 ATA yok`, !atas.some((a) => a.includes("1.3")), atas.join(","));
  check(`${m}: 1.5/2.0/2.5 mevcut`, ["1.5 ATA", "2.0 ATA", "2.5 ATA"].every((a) => atas.includes(a)), atas.join(","));
  const nexusOnlyFlags = M.MODEL_PRICING[m].tiers.filter((t) => t.nexusOnly).map((t) => t.ata);
  check(`${m}: 3.0/6.0 nexusOnly işaretli`, nexusOnlyFlags.join(",") === "3.0 ATA,6.0 ATA", nexusOnlyFlags.join(","));
});

// pressure visibility filter (renderConfigPressure logic replicated)
function visibleTiers(model) {
  const isNexus = model === "nexus";
  return M.MODEL_PRICING[model].tiers.filter((t) => (isNexus ? true : !t.nexusOnly)).map((t) => t.ata);
}
models.forEach((m) => {
  const vis = visibleTiers(m);
  if (m === "nexus") check(`nexus: görünür kademeler = [${vis}]`, vis.join(",") === "1.5 ATA,2.0 ATA,2.5 ATA,3.0 ATA,6.0 ATA");
  else check(`${m}: 3.0/6.0 gizli, görünür = [${vis}]`, vis.join(",") === "1.5 ATA,2.0 ATA,2.5 ATA", vis.join(","));
});

// ensureTierCompatible
M.configState.model = "duo"; M.configState.tierIndex = 3; // 3.0 ATA seçiliyken duo'ya geçiş
M.ensureTierCompatible(false);
check("duo'da 3.0 seçiliyken -> 2.5 ATA'ya düşer", M.MODEL_PRICING.duo.tiers[M.configState.tierIndex].ata === "2.5 ATA", M.MODEL_PRICING.duo.tiers[M.configState.tierIndex].ata);
M.configState.model = "quad"; M.configState.tierIndex = 4; // 6.0 ATA seçiliyken quad'a geçiş
M.ensureTierCompatible(false);
check("quad'da 6.0 seçiliyken -> 2.5 ATA'ya düşer", M.MODEL_PRICING.quad.tiers[M.configState.tierIndex].ata === "2.5 ATA", M.MODEL_PRICING.quad.tiers[M.configState.tierIndex].ata);
M.configState.model = "nexus"; M.configState.tierIndex = 0; // 1.5 seçiliyken nexus'a geçiş — dokunulmamalı
M.ensureTierCompatible(false);
check("nexus'ta 1.5 seçiliyken -> seçim korunur (1.5 ATA)", M.MODEL_PRICING.nexus.tiers[M.configState.tierIndex].ata === "1.5 ATA", M.MODEL_PRICING.nexus.tiers[M.configState.tierIndex].ata);
M.configState.tierIndex = 4;
M.ensureTierCompatible(false);
check("nexus'ta 6.0 seçilebilir", M.MODEL_PRICING.nexus.tiers[M.configState.tierIndex].ata === "6.0 ATA");

console.log("\n== 2. Fiyat: Apex Solo taban 55.000 EUR ==");
check("solo base = 55000", M.MODEL_PRICING.solo.base === 55000, String(M.MODEL_PRICING.solo.base));
M.configState.model = "solo"; M.configState.tierIndex = 0; M.configState.addons = new Set(); M.configState.chamberStyle = "solid"; M.configState.discountPct = 0;
check("solo 1.5 ATA toplam = 55000", M.computeTotal() === 55000, String(M.computeTotal()));

console.log("\n== 3. Spin: 24 kare ==");
check("SPIN_FRAME_COUNT = 24", M.SPIN_FRAME_COUNT === 24, String(M.SPIN_FRAME_COUNT));
check("duo spin aktif", M.SPIN_MODELS.duo === true);
check("quad-cube spin aktif", M.SPIN_MODELS["quad-cube"] === true);
check("nexus spin aktif", M.SPIN_MODELS.nexus === true);
check("spinNormIdx(-1) = 23", M.spinNormIdx(-1) === 23, String(M.spinNormIdx(-1)));
check("spinNormIdx(24) = 0", M.spinNormIdx(24) === 0);
M.configState.model = "duo";
check("spinFrameKey(5) = spin/duo/frame-05", M.spinFrameKey(5) === "spin/duo/frame-05", M.spinFrameKey(5));
M.configState.model = "solo";
check("solo'da spin yok", M.spinAvailableFor() === false);
M.configState.model = "duo";
check("duo stage target spin frame", M.currentStageTarget().key.indexOf("spin/duo/") === 0, M.currentStageTarget().key);
M.configState.stageView = "interior";
check("iç görünümde target = lounge iç foto", M.currentStageTarget().key === "real/apex-lounge-ic", M.currentStageTarget().key);
M.configState.stageView = "exterior";

console.log("\n== 4. Tint maske kapsama (her model + her görünüm) ==");
const trDict = TRANSLATIONS.tr.configurator;
const extColorIds = trDict.colors.map((c) => c.id);
const intColorIds = trDict.interior_colors.map((c) => c.id);
const seatColorIds = trDict.seat_colors.map((c) => c.id);
check("her dış renk için strength tanımlı", extColorIds.every((id) => id in M.EXT_TINT_STRENGTH), extColorIds.filter((id) => !(id in M.EXT_TINT_STRENGTH)).join(","));
check("her iç renk için strength tanımlı", intColorIds.every((id) => id in M.INT_TINT_STRENGTH), intColorIds.filter((id) => !(id in M.INT_TINT_STRENGTH)).join(","));
check("her koltuk rengi için strength tanımlı", seatColorIds.every((id) => id in M.SEAT_TINT_STRENGTH), seatColorIds.filter((id) => !(id in M.SEAT_TINT_STRENGTH)).join(","));

models.forEach((m) => {
  M.configState.model = m;
  // exterior target
  const ext = M.currentStageTarget().key;
  const extMaskKey = ext.indexOf("spin/") === 0 ? "spin:" + m : ext;
  check(`${m} dış: maske var (${extMaskKey})`, !!M.STAGE_TINT_MASKS[extMaskKey]);
  check(`${m} dış: clip fallback var`, !!M.STAGE_TINT_CLIP[extMaskKey]);
  // interior target
  M.configState.stageView = "interior";
  const int = M.currentStageTarget().key;
  check(`${m} iç: maske var (${int})`, !!M.STAGE_TINT_MASKS[int]);
  check(`${m} iç: clip fallback var`, !!M.STAGE_TINT_CLIP[int]);
  check(`${m} iç: koltuk maskesi var`, !!M.STAGE_SEAT_MASKS[int]);
  M.configState.stageView = "exterior";
});

console.log("\n== 5. tiltClipPoly çıktısı ==");
const clip = M.tiltClipPoly([[0, 0], [1, 0], [1, 1], [0, 1]], 1600 / 1199, "contain");
check("clip polygon üretildi", /^polygon\(/.test(clip), clip);
check("clip yüzdeleri 0-100 arası", clip.match(/[\d.]+(?=%)/g).every((n) => +n >= 0 && +n <= 100), clip);

console.log("\n== 6. Nexus koltuk fiyatı ==");
M.configState.model = "nexus"; M.configState.tierIndex = 0; M.configState.nexusSeats = M.NEXUS_BASE_SEATS;
M.ensureTierCompatible(false);
const nexusBase = M.computeTotal();
M.configState.nexusSeats = 8;
check("nexus +2 koltuk = +24000", M.computeTotal() - nexusBase === 2 * M.NEXUS_SEAT_PRICE, String(M.computeTotal() - nexusBase));

console.log("\n== 7. Model görselleri (REAL_STAGE / MODEL_CARD_IMG tutarlılığı) ==");
models.forEach((m) => {
  check(`${m}: REAL_STAGE tanımlı`, !!M.REAL_STAGE[m]);
  check(`${m}: REAL_INTERIOR tanımlı`, !!M.REAL_INTERIOR[m]);
  check(`${m}: MODEL_CARD_IMG tanımlı`, !!M.MODEL_CARD_IMG[m]);
});

console.log("\n== 8. Ref kodları ==");
check("ref kodları tanımlı", M.REF_CODES.length >= 1 && M.REF_CODES.every((c) => typeof c === "string"));

if (fails) { console.log(`\n${fails} TEST BAŞARISIZ`); process.exit(1); }
console.log("\nTüm fonksiyonel testler geçti. ✔");
