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
function walkHtml(dir, prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(prefix, entry.name);
    return entry.isDirectory() ? walkHtml(path.join(dir, entry.name), rel) : (entry.name.endsWith(".html") ? [rel] : []);
  });
}
const htmlFiles = walkHtml(siteDir);
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

// v12 manifest: all six models must use their own canonical base and masks.
const manifestExpectations = {
  "solo-lounge": ["real/oslo-real", "masks/ext-lounge"],
  solo: ["real/dubai-real", "masks/ext-oslo"],
  duo: ["real/tokyo-real", "masks/ext-duo"],
  "duo-plus": ["real/tokyo-plus-real", "masks/ext-duo"],
  "quad-cube": ["real/milano-config", "masks/ext-quadcube2"],
  nexus: ["real/geneva-real", null]
};
Object.entries(manifestExpectations).forEach(([model, [image, mask]]) => {
  if (!mainSrc.includes(`${model.includes("-") ? `"${model}"` : model}: { exterior: "${image}"`)) {
    problems.push(`[MANIFEST] ${model}: canonical exterior is missing or changed`);
  }
  if (mask && !mainSrc.includes(`exteriorMask: "${mask}"`)) problems.push(`[MANIFEST] ${model}: exterior mask is missing`);
});
if (!mainSrc.includes("const SPIN_MODELS = Object.freeze({});")) problems.push("[CONFIG] configurator spin recolor must remain disabled");

// Five configurable exterior models must have a complete pre-rendered 15-color set.
const staticModels = ["solo-lounge", "solo", "duo", "duo-plus", "quad-cube"];
const staticColors = [
  "pearl-white", "sampanya", "bronz", "grafit", "antrasit", "mat-siyah",
  "gece-laciverti", "bordo", "zumrut", "bej", "adacayi-yesili", "turkuaz",
  "nane-yesili", "fildisi", "tas-grisi"
];
staticModels.forEach((model) => staticColors.forEach((color) => {
  const rel = `assets/img/models/renders/${model}/${color}.webp`;
  if (!exists(rel)) problems.push(`[STATIC-RENDER] missing: ${rel}`);
}));
if (!mainSrc.includes('`renders/${configState.model}/${configState.color}`')) {
  problems.push("[CONFIG] static exterior render routing is missing");
}

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
