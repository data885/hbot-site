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

// v10 recolor motoru (saf fonksiyonlar — DOM'suz test edilir)
const rSrc = fs.readFileSync(path.join(siteDir, "assets/js/recolor.js"), "utf8");
new Function(rSrc)();
const RC = globalThis.HBOTRecolor || global.window.HBOTRecolor;

let src = fs.readFileSync(path.join(siteDir, "assets/js/main.js"), "utf8");
// expose internals: turn trailing "})();" into a return
src = src.replace(/\}\)\(\);\s*$/, `
  return { configState, MODEL_PRICING, ensureTierCompatible, spinNormIdx, spinFrameKey, spinAvailableFor,
           currentStageTarget, computeSubtotal, computeTotal, SPIN_MODELS, SPIN_FRAME_COUNT,
           STAGE_TINT_MASKS, STAGE_SEAT_MASKS, EXT_PAINT_MODE, INT_PAINT_MODE, SEAT_PAINT_MODE,
           REAL_STAGE, REAL_INTERIOR, MODEL_CARD_IMG, NEXUS_BASE_SEATS, NEXUS_MAX_SEATS,
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
  return M.MODEL_PRICING[model].tiers.filter((t) => (isNexus ? !!t.nexusOnly : !t.nexusOnly)).map((t) => t.ata);
}
models.forEach((m) => {
  const vis = visibleTiers(m);
  if (m === "nexus") check(`nexus: görünür kademeler = [${vis}]`, vis.join(",") === "3.0 ATA,6.0 ATA", vis.join(","));
  else check(`${m}: 3.0/6.0 gizli, görünür = [${vis}]`, vis.join(",") === "1.5 ATA,2.0 ATA,2.5 ATA", vis.join(","));
});

// ensureTierCompatible
M.configState.model = "duo"; M.configState.tierIndex = 3; // 3.0 ATA seçiliyken duo'ya geçiş
M.ensureTierCompatible(false);
check("duo'da 3.0 seçiliyken -> 2.5 ATA'ya düşer", M.MODEL_PRICING.duo.tiers[M.configState.tierIndex].ata === "2.5 ATA", M.MODEL_PRICING.duo.tiers[M.configState.tierIndex].ata);
M.configState.model = "quad"; M.configState.tierIndex = 4; // 6.0 ATA seçiliyken quad'a geçiş
M.ensureTierCompatible(false);
check("quad'da 6.0 seçiliyken -> 2.5 ATA'ya düşer", M.MODEL_PRICING.quad.tiers[M.configState.tierIndex].ata === "2.5 ATA", M.MODEL_PRICING.quad.tiers[M.configState.tierIndex].ata);
M.configState.model = "nexus"; M.configState.tierIndex = 0; // 1.5 seçiliyken nexus'a geçiş — 3.0'a çekilmeli
M.ensureTierCompatible(false);
check("nexus'ta 1.5 seçiliyken -> 3.0 ATA'ya çeker", M.MODEL_PRICING.nexus.tiers[M.configState.tierIndex].ata === "3.0 ATA", M.MODEL_PRICING.nexus.tiers[M.configState.tierIndex].ata);
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

console.log("\n== 4. Boya maske kapsama + boya modu tabloları (v10) ==");
const trDict = TRANSLATIONS.tr.configurator;
const extColorIds = trDict.colors.map((c) => c.id);
const intColorIds = trDict.interior_colors.map((c) => c.id);
const seatColorIds = trDict.seat_colors.map((c) => c.id);
const validMode = (v) => v === null || v === "paint" || v === "metal";
check("her dış renk için boya modu tanımlı", extColorIds.every((id) => id in M.EXT_PAINT_MODE && validMode(M.EXT_PAINT_MODE[id])), extColorIds.filter((id) => !(id in M.EXT_PAINT_MODE)).join(","));
check("her iç renk için boya modu tanımlı", intColorIds.every((id) => id in M.INT_PAINT_MODE && validMode(M.INT_PAINT_MODE[id])), intColorIds.filter((id) => !(id in M.INT_PAINT_MODE)).join(","));
check("her koltuk rengi için boya modu tanımlı", seatColorIds.every((id) => id in M.SEAT_PAINT_MODE && validMode(M.SEAT_PAINT_MODE[id])), seatColorIds.filter((id) => !(id in M.SEAT_PAINT_MODE)).join(","));
check("varsayılan dış renk (pearl-white) nötr = null (ham kare)", M.EXT_PAINT_MODE["pearl-white"] === null);
check("varsayılan iç renk (cream) nötr = null (ham kare)", M.INT_PAINT_MODE.cream === null);
check("metalik renkler metal modda", ["mat-siyah", "antrasit", "grafit"].every((id) => M.EXT_PAINT_MODE[id] === "metal"));
check("her palet renginin hex'i HSL'e çevrilebiliyor", [...trDict.colors, ...trDict.interior_colors, ...trDict.seat_colors].every((c) => RC.hexToHsl(c.hex) !== null));

models.forEach((m) => {
  M.configState.model = m;
  // exterior target
  const ext = M.currentStageTarget().key;
  const extMaskKey = ext.indexOf("spin/") === 0 ? "spin:" + m : ext;
  check(`${m} dış: maske var (${extMaskKey})`, !!M.STAGE_TINT_MASKS[extMaskKey]);
  // interior target
  M.configState.stageView = "interior";
  const int = M.currentStageTarget().key;
  check(`${m} iç: maske var (${int})`, !!M.STAGE_TINT_MASKS[int]);
  check(`${m} iç: koltuk maskesi var`, !!M.STAGE_SEAT_MASKS[int]);
  M.configState.stageView = "exterior";
});

console.log("\n== 5. Recolor motoru (HBOTRecolor) ==");
const bordoHsl = RC.hexToHsl("#6B2737");
check("hexToHsl bordo hue ~349°", Math.abs(bordoHsl[0] - 349) < 4, String(bordoHsl[0].toFixed(1)));
check("LED koruması: amber parlak piksel korunur", RC.isProtectedPixel(42, 0.8, 0.7) === true);
check("LED koruması: orta ton amber korunmaz (l=0.3 < 0.5 eşiği)", RC.isProtectedPixel(42, 0.8, 0.3) === false);
check("cam koruması: çok koyu piksel korunur", RC.isProtectedPixel(220, 0.1, 0.05) === true);
check("normal gövde pikseli korunmaz", RC.isProtectedPixel(30, 0.1, 0.6) === false);
// paint modu: nötr gri piksel + bordo -> hue bordo, L hedefe ölçeklenir (0.7 * 0.286/0.65 ≈ 0.31)
const bordoPaint = { h: bordoHsl[0], s: bordoHsl[1], l: bordoHsl[2], metal: false };
const painted = RC.recolorPixel(0.7, 0.7, 0.7, 1, bordoPaint);
const paintedHsl = RC.rgbToHsl(painted[0], painted[1], painted[2]);
check("paint: lightness hedefe ölçeklenir (~0.31)", Math.abs(paintedHsl[2] - 0.31) < 0.03, String(paintedHsl[2].toFixed(3)));
check("paint: hue hedefe döner (~349°)", Math.abs(paintedHsl[0] - bordoHsl[0]) < 5 || Math.abs(paintedHsl[0] - bordoHsl[0] - 360) < 5, String(paintedHsl[0].toFixed(1)));
// metal modu: açık piksel + mat siyah -> koyu + düşük sat
const blackHsl = RC.hexToHsl("#16181A");
const metalOut = RC.recolorPixel(0.8, 0.8, 0.8, 1, { h: blackHsl[0], s: blackHsl[1], l: blackHsl[2], metal: true });
const metalHsl = RC.rgbToHsl(metalOut[0], metalOut[1], metalOut[2]);
check("metal: mat siyah koyulaştırır (l<0.25)", metalHsl[2] < 0.25, String(metalHsl[2].toFixed(3)));
check("metal: düşük saturation (s<0.1)", metalHsl[1] < 0.1, String(metalHsl[1].toFixed(3)));
// feather: alfa 0.5 -> orijinal ile boya arası (bordo koyu: 0.7 -> 0.452 yönünde)
const feather = RC.recolorPixel(0.7, 0.7, 0.7, 0.5, bordoPaint);
check("feather: alfa 0.5 ara değer üretir", feather[0] < 0.7 && feather[0] > painted[0], `${feather[0].toFixed(3)} arası [${painted[0].toFixed(3)}, 0.7]`);
// korunan piksel recolorPixel'da da değişmez
const led = RC.recolorPixel(0.95, 0.75, 0.4, 1, bordoPaint); // amber LED tonu
check("LED pikseli recolor'da değişmez", led[0] === 0.95 && led[1] === 0.75 && led[2] === 0.4, led.join(","));
// alfa 0 -> değişim yok
const noOp = RC.recolorPixel(0.5, 0.6, 0.7, 0, bordoPaint);
check("alfa 0 = işlem yok", noOp[0] === 0.5 && noOp[1] === 0.6 && noOp[2] === 0.7);

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
