import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const modulesRoot = process.env.CODEX_NODE_MODULES;
const sharp = modulesRoot ? require(path.join(modulesRoot, "sharp")) : require("sharp");

await import("../site/assets/js/recolor.js");
const recolor = globalThis.HBOTRecolor;
if (!recolor) throw new Error("HBOTRecolor could not be loaded");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetRoot = path.join(root, "site/assets/img/models");
const outputRoot = path.join(assetRoot, "renders");

const models = {
  "solo-lounge": { base: "real/oslo-real.webp", mask: "masks/ext-lounge.png" },
  solo: { base: "real/dubai-real.webp", mask: "masks/ext-oslo.png" },
  duo: { base: "real/tokyo-real.webp", mask: "masks/ext-duo.png" },
  "duo-plus": { base: "real/tokyo-plus-real.webp", mask: "masks/ext-duo.png" },
  "quad-cube": { base: "real/milano-config.webp", mask: "masks/ext-quadcube2.png" }
};

const colors = {
  "pearl-white": ["#F2F0E9", "paint"], sampanya: ["#C8AA78", "paint"], bronz: ["#8B5E3C", "paint"],
  grafit: ["#4B5054", "metal"], antrasit: ["#34383B", "metal"], "mat-siyah": ["#17191A", "metal"],
  "gece-laciverti": ["#172B4D", "paint"], bordo: ["#6B1F2B", "paint"], zumrut: ["#145A4A", "paint"],
  bej: ["#C8B79C", "paint"], "adacayi-yesili": ["#879683", "paint"], turkuaz: ["#2A9D9F", "paint"],
  "nane-yesili": ["#A7C7B7", "paint"], fildisi: ["#E3D5BD", "paint"], "tas-grisi": ["#8A8983", "metal"]
};

for (const [modelId, model] of Object.entries(models)) {
  const basePath = path.join(assetRoot, model.base);
  const maskPath = path.join(assetRoot, model.mask);
  const base = await sharp(basePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const mask = await sharp(maskPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (base.info.width !== mask.info.width || base.info.height !== mask.info.height) {
    throw new Error(`${modelId}: base/mask dimensions differ`);
  }
  const modelOut = path.join(outputRoot, modelId);
  await fs.mkdir(modelOut, { recursive: true });

  for (const [colorId, [hex, mode]] of Object.entries(colors)) {
    const px = new Uint8ClampedArray(base.data);
    const hsl = recolor.hexToHsl(hex);
    recolor.recolorImageData(px, [{
      data: mask.data,
      paint: { h: hsl[0], s: hsl[1], l: hsl[2], metal: mode === "metal", body: true }
    }]);
    await sharp(Buffer.from(px), { raw: base.info })
      .webp({ quality: 92, effort: 6, smartSubsample: true })
      .toFile(path.join(modelOut, `${colorId}.webp`));
  }
  console.log(`Rendered ${modelId}: ${Object.keys(colors).length} colors`);
}

console.log(`Completed ${Object.keys(models).length * Object.keys(colors).length} static configurator renders.`);
