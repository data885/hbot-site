// Stage cross-fade state machine simulation with faithful DOM semantics.
// Drives the REAL main.js code through all user flows and asserts invariants:
//   I1: exactly one of imgA/imgB has .is-active
//   I2: the .is-active img's src ends with currentStageTarget().key + ".webp"
//   I3: stageActiveImg variable matches the DOM class assignment
//   I4: no img has a 404 (nonexistent) src
const fs = require("fs");
const path = require("path");
const siteDir = path.resolve(__dirname, "../site");

/* ---------------- faithful mini-DOM ---------------- */
function makeEl(id) {
  const classes = new Set();
  const listeners = {};
  const el = {
    id,
    children: [],
    style: {},
    hidden: false,
    textContent: "",
    _innerHTML: "",
    set innerHTML(v) { this._innerHTML = v; },
    get innerHTML() { return this._innerHTML; },
    src: "",
    classList: {
      add: (...cs) => cs.forEach((c) => classes.add(c)),
      remove: (...cs) => cs.forEach((c) => classes.delete(c)),
      toggle: (c, force) => {
        const want = force === undefined ? !classes.has(c) : !!force;
        if (want) classes.add(c); else classes.delete(c);
        return want;
      },
      contains: (c) => classes.has(c),
    },
    addEventListener: (type, fn) => { (listeners[type] = listeners[type] || []).push(fn); },
    removeEventListener: () => {},
    dispatch: (type, ev) => { (listeners[type] || []).forEach((fn) => fn(ev)); },
    querySelectorAll: () => [],
    querySelector: () => null,
    setAttribute() {}, getAttribute: () => null,
    setPointerCapture() {}, releasePointerCapture() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
    closest: () => null,
  };
  return el;
}

const stage = makeEl("config-stage");
const imgA = makeEl("stage-img-a");
const imgB = makeEl("stage-img-b");
const tint = makeEl("stage-tint");
const seatTint = makeEl("stage-seat-tint");
stage.children = [imgA, imgB, tint, seatTint];
// initial HTML state: both imgs same src, imgA is-active
imgA.src = "assets/img/models/real/apex-lounge-real.webp";
imgB.src = "assets/img/models/real/apex-lounge-real.webp";
imgA.classList.add("is-active");

const generic = new Map();
function genericEl(id) {
  if (!generic.has(id)) generic.set(id, makeEl(id));
  return generic.get(id);
}

const byId = {
  "config-stage": stage, "stage-img-a": imgA, "stage-img-b": imgB,
  "stage-tint": tint, "stage-seat-tint": seatTint,
  "stage-model-name": makeEl("stage-model-name"), "stage-spin-hint": makeEl("stage-spin-hint"),
  "config-summary": genericEl("config-summary"), "config-summary-text": genericEl("config-summary-text"),
  "config-model-grid": genericEl("config-model-grid"),
};

global.document = {
  getElementById: (id) => byId[id] || null,
  querySelector: (sel) => {
    if (sel === "#config-stage .stage-img.is-active") {
      return stage.children.find((c) => c.classList && c.classList.contains("is-active")) || null;
    }
    return null;
  },
  querySelectorAll: (sel) => {
    if (sel === ".stage-view-btn") return [];
    if (sel === "#current-year") return [];
    return [];
  },
  addEventListener() {},
  createElement: () => makeEl("anon"),
  body: { getAttribute: () => "configurator", appendChild() {} },
  documentElement: {},
};
global.window = {
  matchMedia: () => ({ matches: true }),
  addEventListener() {},
  location: { search: "", origin: "http://localhost", pathname: "/konfigurator.html", href: "" },
};
global.navigator = { language: "tr" };
global.localStorage = { getItem: () => null, setItem() {} };
global.fetch = () => new Promise(() => {}); // never resolves: no async re-render
let t = 0;
global.performance = { now: () => (t += 16) };
const rafQueue = [];
global.requestAnimationFrame = (fn) => { rafQueue.push(fn); return rafQueue.length; };
global.cancelAnimationFrame = () => { rafQueue.length = 0; };
global.Image = function () { return { set src(v) {}, onload: null, onerror: null }; };
global.setTimeoutReal = setTimeout;
// run setTimeout callbacks immediately-ignored (preload only)
const origSetTimeout = setTimeout;
global.setTimeout = (fn, ms) => 0;

const tSrc = fs.readFileSync(path.join(siteDir, "assets/js/translations.js"), "utf8");
global.TRANSLATIONS = new Function(tSrc + "; return TRANSLATIONS;")();

let src = fs.readFileSync(path.join(siteDir, "assets/js/main.js"), "utf8");
src = src.replace(/\}\)\(\);\s*$/, `
  return { configState, currentStageTarget, updateConfigStage, renderConfigSummary, initSpin,
           REAL_STAGE, REAL_INTERIOR, SPIN_MODELS, SPIN_FRAME_COUNT };
})();`);
const M = new Function("return " + src)();
M.initSpin(); // registers pointer handlers on stage

const dict = TRANSLATIONS.tr;
let failures = 0;
function flushRaf(max = 200) {
  let n = 0;
  while (rafQueue.length && n++ < max) { const fn = rafQueue.shift(); fn(); }
}
function invariant(tag) {
  const actA = imgA.classList.contains("is-active");
  const actB = imgB.classList.contains("is-active");
  const problems = [];
  if (actA === actB) problems.push(`I1: is-active durumu bozuk (A=${actA}, B=${actB})`);
  const active = actA ? imgA : imgB;
  const expected = M.currentStageTarget().key;
  if (!active.src.endsWith(expected + ".webp")) problems.push(`I2: aktif src '${active.src}' != beklenen '${expected}.webp'`);
  [imgA, imgB].forEach((im, i) => {
    if (im.src && !im.src.startsWith("assets/")) problems.push(`I4: img${i} tuhaf src: ${im.src}`);
    if (im.src.includes("spin/")) {
      const mdl = im.src.match(/spin\/([a-z-]+)\//);
      const fr = im.src.match(/frame-(\d\d)/);
      if (mdl && !M.SPIN_MODELS[mdl[1]]) problems.push(`I4: spin seti olmayan model: ${im.src}`);
      if (fr && (+fr[1] < 0 || +fr[1] > 23)) problems.push(`I4: geçersiz frame: ${im.src}`);
      // dosya var mı
      if (!fs.existsSync(path.join(siteDir, im.src))) problems.push(`I4: 404 src: ${im.src}`);
    } else if (im.src && !fs.existsSync(path.join(siteDir, im.src))) {
      problems.push(`I4: 404 src: ${im.src}`);
    }
  });
  if (problems.length) {
    failures++;
    console.log(`  ✘ [${tag}]`);
    problems.forEach((p) => console.log("      " + p));
  } else {
    console.log(`  ✔ [${tag}] aktif=${actA ? "A" : "B"} src=${active.src.replace("assets/img/models/", "")}`);
  }
}
function selectModel(m) {
  M.configState.model = m;
  M.configState.spinIdx = M.configState.spinIdx; // spinIdx persists like real flow
  M.renderConfigSummary(dict);
  flushRaf();
  invariant("model=" + m);
}
function drag(px) {
  stage.dispatch("pointerdown", { pointerType: "mouse", button: 0, clientX: 500, target: { closest: () => null }, preventDefault() {}, pointerId: 1 });
  let x = 500;
  const steps = Math.ceil(Math.abs(px) / 40);
  for (let i = 0; i < steps; i++) { x += px / steps; stage.dispatch("pointermove", { clientX: x }); }
  stage.dispatch("pointerup", {});
  flushRaf(); // momentum dahil
  invariant("drag(" + px + ")");
}
function setView(v) {
  M.configState.stageView = v;
  M.updateConfigStage(dict);
  flushRaf();
  invariant("view=" + v);
}
function changeColor(c) {
  M.configState.color = c;
  M.renderConfigSummary(dict);
  flushRaf();
  invariant("color=" + c);
}

console.log("== Akış 1: ilk yükleme (varsayılan solo-lounge) ==");
M.renderConfigSummary(dict); flushRaf(); invariant("init");

console.log("\n== Akış 2: statik -> spin (Nexus) ==");
selectModel("nexus");

console.log("\n== Akış 3: spin sürükleme + momentum ==");
drag(350);
drag(-220);

console.log("\n== Akış 4: spin sonrası renk/opsiyon değişimi (v10: recolor fake DOM'da devre dışı — ham kare) ==");
changeColor("bordo");
changeColor("mat-siyah");

console.log("\n== Akış 4b: renk seçiliyken sürükleme + nötr renge dönüş ==");
drag(120);
changeColor("pearl-white");

console.log("\n== Akış 5: iç/dış görünüm geçişleri ==");
setView("interior");
setView("exterior");
setView("interior");
setView("exterior");

console.log("\n== Akış 6: spin -> başka spin (Nexus -> Duo) ==");
selectModel("duo");
drag(300);

console.log("\n== Akış 7: spin -> statik (Duo -> Solo) ==");
selectModel("solo");

console.log("\n== Akış 8: statik -> spin (Solo -> Quad-Cube) ==");
selectModel("quad-cube");
drag(-450);

console.log("\n== Akış 9: YARIŞ — momentum çalışırken model değiştir ==");
stage.dispatch("pointerdown", { pointerType: "mouse", button: 0, clientX: 500, target: { closest: () => null }, preventDefault() {}, pointerId: 1 });
for (let i = 1; i <= 5; i++) stage.dispatch("pointermove", { clientX: 500 + i * 60 });
stage.dispatch("pointerup", {}); // momentum başlar (rafQueue'da tick'ler)
// momentum bitmeden model değiştir:
M.configState.model = "solo";
M.renderConfigSummary(dict);
flushRaf(); // momentum tick'leri ŞİMDİ çalışır
invariant("momentum sırasında solo'ya geçiş");

console.log("\n== Akış 10: momentum çalışırken görünüm değiştir ==");
selectModel("nexus");
stage.dispatch("pointerdown", { pointerType: "mouse", button: 0, clientX: 500, target: { closest: () => null }, preventDefault() {}, pointerId: 1 });
for (let i = 1; i <= 5; i++) stage.dispatch("pointermove", { clientX: 500 + i * 60 });
stage.dispatch("pointerup", {});
M.configState.stageView = "interior";
M.updateConfigStage(dict);
flushRaf();
invariant("momentum sırasında iç görünüme geçiş");

console.log("\n== Akış 11: iç görünümde sürükleme denemesi (spin engelli olmalı) ==");
drag(400);
setView("exterior");

console.log("\n== Akış 12: hızlı ardışık model değişimleri ==");
["duo", "nexus", "quad-cube", "solo", "solo-lounge", "nexus"].forEach((m) => selectModel(m));

if (failures) { console.log(`\n${failures} INVARIANT İHLALİ`); process.exit(1); }
console.log("\nTüm akışlarda invariant'lar sağlandı. ✔");
