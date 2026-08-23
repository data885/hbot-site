// Asset + link integrity audit:
// 1) every src/href/action in HTML files resolves (local files exist)
// 2) every asset path referenced from JS (real/, spin/, masks/, banners/) exists
// 3) internal page links point to existing .html files
const fs = require("fs");
const path = require("path");
const siteDir = path.resolve(__dirname, "../site");

const problems = [];
const ok = [];

function exists(rel) {
  const clean = rel.split("#")[0].split("?")[0].replace(/^\//, "");
  return fs.existsSync(path.join(siteDir, clean));
}

// --- 1) HTML references ---
const htmlFiles = fs.readdirSync(siteDir).filter((f) => f.endsWith(".html"));
const attrRe = /(?:src|href|action)="([^"]+)"/g;
htmlFiles.forEach((f) => {
  const html = fs.readFileSync(path.join(siteDir, f), "utf8");
  let m;
  while ((m = attrRe.exec(html))) {
    let url = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    url = url.split("#")[0].split("?")[0];
    if (!url) continue;
    if (!exists(url)) problems.push(`[HTML] ${f}: missing -> ${m[1]}`);
  }
});

// --- 2) JS-referenced assets ---
const mainSrc = fs.readFileSync(path.join(siteDir, "assets/js/main.js"), "utf8");

// REAL_STAGE / REAL_INTERIOR / MODEL_CARD_IMG values
const imgMaps = mainSrc.match(/"(real\/[a-z0-9-]+)"/g) || [];
imgMaps.forEach((s) => {
  const rel = `assets/img/models/${s.replace(/"/g, "")}.webp`;
  if (!exists(rel)) problems.push(`[JS] missing image: ${rel}`);
});

// masks
const maskMaps = mainSrc.match(/"(masks\/[a-z0-9-]+)"/g) || [];
maskMaps.forEach((s) => {
  const rel = `assets/img/models/${s.replace(/"/g, "")}.png`;
  if (!exists(rel)) problems.push(`[JS] missing mask: ${rel}`);
});

// STAGE_TINT_MASKS/STAGE_SEAT_MASKS keys must each exist as real/spin imagery
const tintMaskBlock = mainSrc.match(/const STAGE_TINT_MASKS = \{([\s\S]*?)\};/)[1];
[...tintMaskBlock.matchAll(/"([^"]+)":/g)].forEach((m) => {
  const key = m[1];
  if (key.startsWith("spin:")) {
    const model = key.slice(5);
    for (let i = 0; i < 24; i++) {
      const rel = `assets/img/models/spin/${model}/frame-${String(i).padStart(2, "0")}.webp`;
      if (!exists(rel)) problems.push(`[SPIN] missing frame: ${rel}`);
    }
  } else {
    const rel = `assets/img/models/${key}.webp`;
    if (!exists(rel)) problems.push(`[TINT-KEY] no image for mask key: ${rel}`);
  }
});

// spin sets for SPIN_MODELS=true
const spinModelsBlock = mainSrc.match(/const SPIN_MODELS = \{([^}]*)\}/)[1];
[...spinModelsBlock.matchAll(/"?([a-z-]+)"?:\s*true/g)].forEach((m) => {
  const model = m[1];
  let count = 0;
  for (let i = 0; i < 24; i++) {
    const rel = `assets/img/models/spin/${model}/frame-${String(i).padStart(2, "0")}.webp`;
    if (exists(rel)) count++;
  }
  console.log(`spin set ${model}: ${count}/24 frames`);
  if (count !== 24) problems.push(`[SPIN] ${model}: only ${count}/24 frames`);
});

// other assets in JS: logo-full.png, logo-header.png
["assets/img/logo-full.png", "assets/img/logo-header.png", "assets/img/logo-icon.png",
 "assets/img/favicon-32.png", "assets/img/favicon-48.png", "assets/img/apple-touch-icon.png"
].forEach((rel) => { if (!exists(rel)) problems.push(`[ASSET] missing: ${rel}`); });

// hero banners referenced via data-bg in index.html
const idx = fs.readFileSync(path.join(siteDir, "index.html"), "utf8");
[...idx.matchAll(/data-bg="([^"]+)"/g)].forEach((m) => {
  if (!exists(m[1])) problems.push(`[HERO] missing banner: ${m[1]}`);
});

// og:image references
htmlFiles.forEach((f) => {
  const html = fs.readFileSync(path.join(siteDir, f), "utf8");
  [...html.matchAll(/(?:og:image|twitter:image)" content="https:\/\/hbotchambertech\.com\/([^"]+)"/g)].forEach((m) => {
    if (!exists(m[1])) problems.push(`[OG] ${f}: missing og image -> ${m[1]}`);
  });
});

// --- 3) internal page links ---
htmlFiles.forEach((f) => {
  const html = fs.readFileSync(path.join(siteDir, f), "utf8");
  [...html.matchAll(/href="([a-z0-9-]+\.html)(?:#[^"]*)?"/g)].forEach((m) => {
    if (!exists(m[1])) problems.push(`[LINK] ${f}: broken internal link -> ${m[1]}`);
  });
});

// MODEL_PAGES in JS
const modelPagesBlock = mainSrc.match(/const MODEL_PAGES = \{([\s\S]*?)\};/)[1];
[...modelPagesBlock.matchAll(/"([a-z0-9-]+\.html)"/g)].forEach((m) => {
  if (!exists(m[1])) problems.push(`[JS-LINK] MODEL_PAGES missing page: ${m[1]}`);
});

console.log("");
if (problems.length) {
  console.log("PROBLEMS (" + problems.length + "):");
  problems.forEach((p) => console.log("  " + p));
  process.exit(1);
} else {
  console.log("All referenced assets and links exist. ✔");
}
