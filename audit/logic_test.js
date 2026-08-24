// Functional configurator audit: pricing, model state and v12 recolor manifest.
const fs = require("fs");
const path = require("path");
const siteDir = path.resolve(__dirname, "../site");

const elStub = () => ({
  addEventListener() {}, setAttribute() {}, classList: { add() {}, remove() {}, toggle() {} },
  querySelectorAll: () => [], style: {}, textContent: "", innerHTML: "", getContext: () => null
});
global.document = {
  addEventListener() {}, getElementById: () => null, querySelectorAll: () => [], querySelector: () => null,
  createElement: elStub, body: { getAttribute: () => "configurator", appendChild() {} }, documentElement: {}
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

const tSrc = fs.readFileSync(path.join(siteDir, "assets/js/translations.js"), "utf8");
global.TRANSLATIONS = new Function(tSrc + "; return TRANSLATIONS;")();
const rSrc = fs.readFileSync(path.join(siteDir, "assets/js/recolor.js"), "utf8");
new Function(rSrc)();
const RC = globalThis.HBOTRecolor || global.window.HBOTRecolor;

let src = fs.readFileSync(path.join(siteDir, "assets/js/main.js"), "utf8");
src = src.replace(/\}\)\(\);\s*$/, `
  return { configState, MODEL_PRICING, SEAT_TIERS, ensureTierCompatible,
           currentStageTarget, normalizeConfigStageView, computeSubtotal, computeTotal,
           SPIN_MODELS, STAGE_RENDER_MANIFEST, APPROVED_COLOR_RENDER_MANIFEST, EXT_PAINT_MODE,
           REAL_STAGE, REAL_INTERIOR, MODEL_CARD_IMG, REF_CODES,
           colorWorksFor };
})();`);
const M = new Function("return " + src)();

let fails = 0;
function check(name, cond, detail) {
  if (cond) console.log("  ✔ " + name);
  else { console.log("  ✘ " + name + (detail ? " — " + detail : "")); fails++; }
}

const modelIds = ["solo-lounge", "solo", "duo", "duo-plus", "quad-cube", "nexus"];
console.log("== 1. Model ve basınç kuralları ==");
check("tam altı güncel model var", modelIds.every((id) => M.MODEL_PRICING[id]));
modelIds.forEach((id) => {
  const atas = M.MODEL_PRICING[id].tiers.map((t) => t.ata);
  check(`${id}: 1.3 ATA yok`, !atas.includes("1.3 ATA"), atas.join(","));
  const expectedTiers = ["solo-lounge", "solo", "duo"].includes(id)
    ? "1.5 ATA,2.0 ATA"
    : "2.5 ATA,3.0 ATA,6.0 ATA";
  check(`${id}: doğru basınç ailesi`, atas.join(",") === expectedTiers, atas.join(","));
  check(`${id}: basınç ek ücreti yok`, M.MODEL_PRICING[id].tiers.every((tier) => tier.price === 0));
});
M.configState.model = "duo"; M.configState.tierIndex = 4;
M.ensureTierCompatible(false);
check("Tokyo geçersiz kademe indeksini ilk seçeneğe indirir", M.configState.tierIndex === 0);
M.configState.model = "nexus"; M.configState.tierIndex = 9;
M.ensureTierCompatible(false);
check("Geneva geçersiz kademe indeksini 2.5 ATA'ya indirir", M.MODEL_PRICING.nexus.tiers[M.configState.tierIndex].ata === "2.5 ATA");

console.log("\n== 2. Tek model-manifest doğruluğu ==");
const expected = {
  "solo-lounge": ["real/oslo-real", "masks/ext-lounge"],
  solo: ["real/dubai-real", "masks/ext-oslo"],
  duo: ["real/tokyo-real", "masks/ext-duo"],
  "duo-plus": ["real/tokyo-plus-real", "masks/ext-duo"],
  "quad-cube": ["real/milano-config", "masks/ext-quadcube2"],
  nexus: ["real/geneva-real", null]
};
modelIds.forEach((id) => {
  const item = M.STAGE_RENDER_MANIFEST[id];
  check(`${id}: kendi dış görseli`, item && item.exterior === expected[id][0], item && item.exterior);
  check(`${id}: doğru dış maskesi`, item && item.exteriorMask === expected[id][1], item && item.exteriorMask);
  check(`${id}: iç görsel + iki iç maske`, !!(item && item.interior && item.interiorMask && item.seatMask));
  M.configState.model = id;
  M.configState.stageView = "exterior";
  M.normalizeConfigStageView();
  const expectedStageKey = id === "nexus"
    ? item.interior
    : id === "duo"
      ? M.APPROVED_COLOR_RENDER_MANIFEST.duo["pearl-white"]
      : item.exterior;
  check(`${id}: sahne hedefi onaylı manifest ile aynı`, M.currentStageTarget().key === expectedStageKey, M.currentStageTarget().key);
});
check("konfigüratör ağır spin boyamasını kullanmıyor", Object.keys(M.SPIN_MODELS).length === 0);

console.log("\n== 3. Renk paleti ve maske kapsamı ==");
const tr = TRANSLATIONS.tr.configurator;
const validMode = (v) => v === null || v === "paint" || v === "metal";
check("15 dış rengin tamamı tanımlı", tr.colors.length === 15 && tr.colors.every((c) => validMode(M.EXT_PAINT_MODE[c.id])));
check("İnci Beyazı tarayıcı boyaması kullanmaz", M.EXT_PAINT_MODE["pearl-white"] === null);
check("Fildişi gerçek ivory tonunda", tr.colors.find((c) => c.id === "fildisi").hex === "#E3D5BD");
check("tüm renk hex değerleri geçerli", [...tr.colors, ...tr.interior_colors, ...tr.seat_colors].every((c) => RC.hexToHsl(c.hex)));
modelIds.filter((id) => id !== "nexus").forEach((id) => {
  check(`${id}: 15 dış rengin tamamı çalışır`, tr.colors.every((c) => M.colorWorksFor(id, c.id)));
});
check("Geneva yalnız İnci Beyazı", tr.colors.filter((c) => M.colorWorksFor("nexus", c.id)).map((c) => c.id).join(",") === "pearl-white");
M.configState.model = "solo"; M.configState.stageView = "exterior";
M.configState.color = "bordo"; const bordoTarget = M.currentStageTarget().key;
M.configState.color = "zumrut"; const greenTarget = M.currentStageTarget().key;
check("dış renk değişimi model fotoğrafını değiştirmez", bordoTarget === "real/dubai-real" && greenTarget === bordoTarget, `${bordoTarget} -> ${greenTarget}`);
const tokyoApproved = ["pearl-white", "mat-siyah", "antrasit", "gece-laciverti", "bordo", "sampanya", "bronz", "zumrut"];
check("Tokyo için sekiz onaylı statik renk renderı var", tokyoApproved.every((id) => M.APPROVED_COLOR_RENDER_MANIFEST.duo[id]));
check("Tokyo onaylı render dosyaları mevcut", tokyoApproved.every((id) => fs.existsSync(path.join(siteDir, "assets/img/models", `${M.APPROVED_COLOR_RENDER_MANIFEST.duo[id]}.webp`))));
M.configState.model = "duo"; M.configState.stageView = "exterior";
M.configState.color = "bordo"; const tokyoBordoTarget = M.currentStageTarget().key;
M.configState.color = "bej"; const tokyoFallbackTarget = M.currentStageTarget().key;
check("Tokyo onaylı renk doğru statik renderı açar", tokyoBordoTarget === "colors/tokyo/bordo", tokyoBordoTarget);
check("Tokyo renderı olmayan renkte kanonik fotoğrafa döner", tokyoFallbackTarget === "real/tokyo-real", tokyoFallbackTarget);

console.log("\n== 4. Renk motoru saf fonksiyonları ==");
const blue = RC.hexToHsl("#172B4D");
const out = RC.recolorPixel(0.75, 0.72, 0.68, 1, { h: blue[0], s: blue[1], l: blue[2], metal: false, body: true });
const outHsl = RC.rgbToHsl(out[0], out[1], out[2]);
check("hedef mavi hue uygulanır", Math.abs(outHsl[0] - blue[0]) < 4, String(outHsl[0]));
const noOp = RC.recolorPixel(0.5, 0.6, 0.7, 0, { h: 0, s: 1, l: 0.5 });
check("maske alfa 0 dışarıyı değiştirmez", noOp[0] === 0.5 && noOp[1] === 0.6 && noOp[2] === 0.7);

console.log("\n== 5. Fiyat ve koltuk kademeleri ==");
M.configState.model = "solo"; M.configState.tierIndex = 0; M.configState.addons = new Set(); M.configState.chamberStyle = "solid"; M.configState.discountPct = 0;
check("Dubai taban fiyatı hesaplanır", M.computeTotal() === M.MODEL_PRICING.solo.base, String(M.computeTotal()));
M.configState.model = "nexus"; M.configState.tierIndex = 3; M.configState.nexusSeats = M.SEAT_TIERS.nexus[0].seats;
M.ensureTierCompatible(false);
const base = M.computeTotal();
M.configState.nexusSeats = M.SEAT_TIERS.nexus[1].seats;
check("Geneva koltuk kademe farkı fiyatı değiştirir", M.computeTotal() > base, `${base} -> ${M.computeTotal()}`);
check("referans kodları tanımlı", M.REF_CODES.length > 0);

if (fails) { console.log(`\n${fails} TEST BAŞARISIZ`); process.exit(1); }
console.log("\nTüm fonksiyonel testler geçti. ✔");
