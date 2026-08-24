import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const modulesRoot = process.env.CODEX_NODE_MODULES;
const sharp = modulesRoot ? require(path.join(modulesRoot, "sharp")) : require("sharp");

await import("../site/assets/js/recolor.js");
const recolor = globalThis.HBOTRecolor;
if (!recolor) throw new Error("HBOTRecolor could not be loaded");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modelRoot = path.join(root, "site/assets/img/models");
const models = {
  "solo-lounge": ["real/oslo-real.webp", "masks/ext-lounge.png"],
  solo: ["real/dubai-real.webp", "masks/ext-oslo.png"],
  duo: ["real/tokyo-real.webp", "masks/ext-duo.png"],
  "duo-plus": ["real/tokyo-plus-real.webp", "masks/ext-duo.png"],
  "quad-cube": ["real/milano-config.webp", "masks/ext-quadcube2.png"]
};
const interiorModels = {
  solo: ["real/oslo-interior.webp", "masks/int-oslo.png", "masks/seat-oslo.png"],
  duo: ["real/duo-interior.webp", "masks/int-duo.png", "masks/seat-duo.png"],
  "duo-plus": ["real/duo-interior.webp", "masks/int-duo.png", "masks/seat-duo.png"],
  "quad-cube": ["real/milano-interior.webp", "masks/int-quadcube.png", "masks/seat-quadcube.png"]
};
const colors = {
  "pearl-white": "#F2F0E9", sampanya: "#C8AA78", bronz: "#8B5E3C",
  grafit: "#4B5054", antrasit: "#34383B", "mat-siyah": "#17191A",
  "gece-laciverti": "#172B4D", bordo: "#6B1F2B", zumrut: "#145A4A",
  bej: "#C8B79C", "adacayi-yesili": "#879683", turkuaz: "#2A9D9F",
  "nane-yesili": "#A7C7B7", fildisi: "#E3D5BD", "tas-grisi": "#8A8983"
};
const interiorColors = { "kum-beji": "#C7A77A", konyak: "#9A5D32", anthracite: "#383B3D", burgundy: "#6B1F2B", navy: "#1D3152" };
const seatColors = { konyak: "#9A5D32", siyah: "#17191A", lacivert: "#1D3152", krem: "#E8DDC5", bordo: "#6B1F2B", gri: "#7C7F82" };

const failures = [];
const sampleIds = new Set(["pearl-white", "sampanya", "mat-siyah", "gece-laciverti", "fildisi"]);
const sampleTiles = [];
const assert = (ok, message) => { if (!ok) failures.push(message); };
const shortHash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 16);

for (const [model, [baseRel, maskRel]] of Object.entries(models)) {
  const basePath = path.join(modelRoot, baseRel);
  const maskPath = path.join(modelRoot, maskRel);
  const baseMeta = await sharp(basePath).metadata();
  const maskMeta = await sharp(maskPath).metadata();
  assert(baseMeta.width === maskMeta.width && baseMeta.height === maskMeta.height,
    `${model}: base/mask dimensions differ`);

  const width = 320;
  const base = await sharp(basePath).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const mask = await sharp(maskPath).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert(base.info.width === mask.info.width && base.info.height === mask.info.height,
    `${model}: resized base/mask dimensions differ`);

  let masked = 0;
  const pixelCount = base.info.width * base.info.height;
  for (let i = 3; i < mask.data.length; i += 4) if (mask.data[i] > 8) masked++;
  const coverage = masked / pixelCount;
  assert(coverage > 0.05 && coverage < 0.80, `${model}: suspicious mask coverage ${coverage.toFixed(3)}`);

  const hashes = new Set();
  for (const [colorId, hex] of Object.entries(colors)) {
    const px = new Uint8ClampedArray(base.data);
    const hsl = recolor.hexToHsl(hex);
    const paint = { h: hsl[0], s: hsl[1], l: hsl[2], metal: ["grafit", "antrasit", "mat-siyah", "tas-grisi"].includes(colorId), body: true };
    recolor.recolorImageData(px, [{ data: mask.data, paint }]);

    let outsideChanged = 0;
    let insideDelta = 0;
    let insideSamples = 0;
    for (let i = 0; i < px.length; i += 4) {
      const delta = Math.abs(px[i] - base.data[i]) + Math.abs(px[i + 1] - base.data[i + 1]) + Math.abs(px[i + 2] - base.data[i + 2]);
      if (mask.data[i + 3] === 0) outsideChanged += delta;
      if (mask.data[i + 3] > 128) { insideDelta += delta; insideSamples++; }
    }
    assert(outsideChanged === 0, `${model}/${colorId}: pixels outside mask changed`);
    assert(insideSamples > 0 && insideDelta / insideSamples > 2, `${model}/${colorId}: color change is not visible`);
    hashes.add(shortHash(Buffer.from(px)));
    if (sampleIds.has(colorId)) {
      const label = `${model} · ${colorId}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
      const tile = await sharp(Buffer.from(px), { raw: base.info })
        .resize(260, 170, { fit: "contain", background: "#101820" })
        .extend({ bottom: 30, background: "#101820" })
        .composite([{ input: Buffer.from(`<svg width="260" height="30"><rect width="260" height="30" fill="#101820"/><text x="130" y="20" text-anchor="middle" font-family="Arial" font-size="13" fill="white">${label}</text></svg>`), top: 170, left: 0 }])
        .jpeg({ quality: 88 }).toBuffer();
      sampleTiles.push({ model, colorId, tile });
    }
  }
  assert(hashes.size === Object.keys(colors).length, `${model}: two or more colors render identically`);
  console.log(`PASS ${model}: ${hashes.size} colors, mask ${(coverage * 100).toFixed(1)}%`);
}

for (const [model, [baseRel, interiorMaskRel, seatMaskRel]] of Object.entries(interiorModels)) {
  const paths = [baseRel, interiorMaskRel, seatMaskRel].map((rel) => path.join(modelRoot, rel));
  const metadata = await Promise.all(paths.map((p) => sharp(p).metadata()));
  assert(metadata.every((m) => m.width === metadata[0].width && m.height === metadata[0].height), `${model}: interior mask dimensions differ`);
  const width = 280;
  const base = await sharp(paths[0]).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const intMask = await sharp(paths[1]).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const seatMask = await sharp(paths[2]).resize({ width }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const runPass = (colorId, hex, maskData, prefix) => {
    const px = new Uint8ClampedArray(base.data);
    const hsl = recolor.hexToHsl(hex);
    const metal = colorId === "anthracite" || colorId === "siyah" || colorId === "gri";
    recolor.recolorImageData(px, [{ data: maskData, paint: { h: hsl[0], s: hsl[1], l: hsl[2], metal } }]);
    let outsideChanged = 0, insideDelta = 0, insideSamples = 0;
    for (let i = 0; i < px.length; i += 4) {
      const delta = Math.abs(px[i] - base.data[i]) + Math.abs(px[i + 1] - base.data[i + 1]) + Math.abs(px[i + 2] - base.data[i + 2]);
      if (maskData[i + 3] === 0) outsideChanged += delta;
      if (maskData[i + 3] > 128) { insideDelta += delta; insideSamples++; }
    }
    assert(outsideChanged === 0, `${model}/${prefix}-${colorId}: pixels outside mask changed`);
    assert(insideSamples > 0 && insideDelta / insideSamples > 2, `${model}/${prefix}-${colorId}: color change is not visible`);
  };
  Object.entries(interiorColors).forEach(([id, hex]) => runPass(id, hex, intMask.data, "interior"));
  Object.entries(seatColors).forEach(([id, hex]) => runPass(id, hex, seatMask.data, "seat"));
  console.log(`PASS ${model} interior: ${Object.keys(interiorColors).length} wall + ${Object.keys(seatColors).length} seat colors`);
}

const mainSource = await (await import("node:fs/promises")).readFile(path.join(root, "site/assets/js/main.js"), "utf8");
assert(!mainSource.includes("REAL_STAGE_BY_COLOR"), "legacy cross-model REAL_STAGE_BY_COLOR is still present");
assert(!mainSource.includes("startRecolorJob"), "runtime canvas recolor job is still present");
assert(mainSource.includes('"duo-plus": { exterior: "real/tokyo-plus-real", exteriorMask: "masks/ext-duo"'), "Tokyo Plus manifest is missing");
assert(mainSource.includes('const SPIN_MODELS = Object.freeze({});'), "configurator spin recolor is not disabled");
const tokyoApprovedIds = ["pearl-white", "mat-siyah", "antrasit", "gece-laciverti", "bordo", "sampanya", "bronz", "zumrut"];
for (const colorId of tokyoApprovedIds) {
  const rel = `colors/tokyo/${colorId}.webp`;
  assert(mainSource.includes(`"${colorId}": "colors/tokyo/${colorId}"`) || mainSource.includes(`${colorId}: "colors/tokyo/${colorId}"`), `Tokyo ${colorId}: approved manifest entry missing`);
  assert(require("node:fs").existsSync(path.join(modelRoot, rel)), `Tokyo ${colorId}: approved render file missing`);
}

const sheetArg = process.argv.find((arg) => arg.startsWith("--contact-sheet="));
if (sheetArg) {
  const outPath = sheetArg.slice("--contact-sheet=".length);
  const modelIds = Object.keys(models);
  const colorIds = [...sampleIds];
  const canvas = sharp({ create: { width: colorIds.length * 260, height: modelIds.length * 200, channels: 3, background: "#0b1218" } });
  await canvas.composite(sampleTiles.map(({ model, colorId, tile }) => ({
    input: tile,
    left: colorIds.indexOf(colorId) * 260,
    top: modelIds.indexOf(model) * 200
  }))).jpeg({ quality: 90 }).toFile(outPath);
  console.log(`Contact sheet: ${outPath}`);
}

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  failures.forEach((f) => console.error(`- ${f}`));
  process.exit(1);
}
console.log(`\nPASS recolor matrix: ${Object.keys(models).length} exterior models × ${Object.keys(colors).length} colors; ${Object.keys(interiorModels).length} interior models`);
