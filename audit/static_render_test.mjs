import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const modulesRoot = process.env.CODEX_NODE_MODULES;
const sharp = modulesRoot ? require(path.join(modulesRoot, "sharp")) : require("sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const renderRoot = path.join(root, "site/assets/img/models/renders");
const models = ["solo-lounge", "solo", "duo", "duo-plus", "quad-cube"];
const colors = [
  "pearl-white", "sampanya", "bronz", "grafit", "antrasit", "mat-siyah",
  "gece-laciverti", "bordo", "zumrut", "bej", "adacayi-yesili", "turkuaz",
  "nane-yesili", "fildisi", "tas-grisi"
];
const samples = ["pearl-white", "sampanya", "gece-laciverti", "zumrut", "bordo", "mat-siyah"];
const failures = [];
const tiles = [];

for (const model of models) {
  const hashes = new Set();
  let dimensions = null;
  for (const color of colors) {
    const file = path.join(renderRoot, model, `${color}.webp`);
    let buffer;
    try { buffer = await fs.readFile(file); }
    catch { failures.push(`${model}/${color}: file missing`); continue; }
    const meta = await sharp(buffer).metadata();
    const currentDimensions = `${meta.width}x${meta.height}`;
    dimensions ||= currentDimensions;
    if (currentDimensions !== dimensions) failures.push(`${model}/${color}: unexpected dimensions ${currentDimensions}`);
    hashes.add(createHash("sha256").update(buffer).digest("hex"));

    if (samples.includes(color)) {
      const safeLabel = `${model} · ${color}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
      const tile = await sharp(buffer)
        .resize(300, 190, { fit: "contain", background: "#eef2f4" })
        .extend({ bottom: 34, background: "#101820" })
        .composite([{ input: Buffer.from(`<svg width="300" height="34"><rect width="300" height="34" fill="#101820"/><text x="150" y="23" text-anchor="middle" font-family="Arial" font-size="14" fill="white">${safeLabel}</text></svg>`), top: 190, left: 0 }])
        .jpeg({ quality: 90 })
        .toBuffer();
      tiles.push({ model, color, tile });
    }
  }
  if (hashes.size !== colors.length) failures.push(`${model}: expected ${colors.length} unique colors, got ${hashes.size}`);
  console.log(`PASS ${model}: ${hashes.size} unique static colors · ${dimensions}`);
}

const sheetArg = process.argv.find((arg) => arg.startsWith("--contact-sheet="));
if (sheetArg) {
  const outPath = sheetArg.slice("--contact-sheet=".length);
  await sharp({ create: { width: samples.length * 300, height: models.length * 224, channels: 3, background: "#dfe6e9" } })
    .composite(tiles.map(({ model, color, tile }) => ({
      input: tile,
      left: samples.indexOf(color) * 300,
      top: models.indexOf(model) * 224
    })))
    .jpeg({ quality: 91 })
    .toFile(outPath);
  console.log(`Contact sheet: ${outPath}`);
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  process.exit(1);
}
console.log(`PASS static render matrix: ${models.length} models × ${colors.length} colors = ${models.length * colors.length} files`);
