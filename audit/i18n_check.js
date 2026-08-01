// i18n key parity check across tr/en/ar/ru
const fs = require("fs");
const path = require("path");
const siteDir = path.resolve(__dirname, "../site");
const src = fs.readFileSync(path.join(siteDir, "assets/js/translations.js"), "utf8");
const TRANSLATIONS = new Function(src + "; return TRANSLATIONS;")();

function flatKeys(obj, prefix, out) {
  out = out || {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const p = prefix ? prefix + "." + k : k;
    if (Array.isArray(v)) {
      out[p + "[]"] = "len:" + v.length;
      // recurse into array objects for structure (ids)
      v.forEach((item, i) => {
        if (item && typeof item === "object") flatKeys(item, p + "[" + i + "]", out);
      });
    } else if (v && typeof v === "object") {
      flatKeys(v, p, out);
    } else {
      out[p] = typeof v;
    }
  }
  return out;
}

const langs = Object.keys(TRANSLATIONS);
console.log("Languages:", langs.join(", "));
const maps = {};
langs.forEach((l) => (maps[l] = flatKeys(TRANSLATIONS[l])));

const base = maps["tr"];
let missingCount = 0;
langs.forEach((l) => {
  if (l === "tr") return;
  const missing = Object.keys(base).filter((k) => !(k in maps[l]));
  const extra = Object.keys(maps[l]).filter((k) => !(k in base));
  if (missing.length) {
    missingCount += missing.length;
    console.log(`\n[${l}] MISSING ${missing.length} keys (vs tr):`);
    missing.slice(0, 60).forEach((k) => console.log("  - " + k));
    if (missing.length > 60) console.log("  ... +" + (missing.length - 60) + " more");
  }
  if (extra.length) console.log(`[${l}] extra keys: ${extra.length}`);
});
if (!missingCount) console.log("\nAll languages have full key parity with TR.");

// meta keys coverage
langs.forEach((l) => {
  const meta = TRANSLATIONS[l].meta || {};
  const need = ["home","technology","models","soloLounge","solo","duo","quad","quadCube","nexus","hbotInfo","blog","configurator","contact"];
  const miss = need.filter((k) => !meta[k]);
  if (miss.length) console.log(`[${l}] meta missing: ${miss.join(", ")}`);
});

// blog posts count
langs.forEach((l) => {
  const posts = (TRANSLATIONS[l].blog && TRANSLATIONS[l].blog.posts) || [];
  console.log(`[${l}] blog posts: ${posts.length}`);
});

// celebs: ensure people not companies
langs.forEach((l) => {
  const items = (TRANSLATIONS[l].home && TRANSLATIONS[l].home.celebs && TRANSLATIONS[l].home.celebs.items) || [];
  console.log(`[${l}] celebs: ${items.map((i) => i.name).join(" | ")}`);
});

// models ids per lang
langs.forEach((l) => {
  const m = TRANSLATIONS[l].configurator.models.map((x) => x.id + "=" + x.name).join(", ");
  console.log(`[${l}] models: ${m}`);
});

// data-i18n keys used in HTML vs tr dict
const htmlFiles = fs.readdirSync(siteDir).filter((f) => f.endsWith(".html"));
const usedKeys = new Set();
htmlFiles.forEach((f) => {
  const html = fs.readFileSync(path.join(siteDir, f), "utf8");
  const re = /data-i18n(?:-placeholder)?="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) usedKeys.add(m[1]);
});
const trFlat = flatKeys(TRANSLATIONS.tr);
const missingInDict = [...usedKeys].filter((k) => !(k in trFlat));
console.log(`\nHTML data-i18n keys used: ${usedKeys.size}; missing in TR dict: ${missingInDict.length}`);
missingInDict.forEach((k) => console.log("  ! " + k));
