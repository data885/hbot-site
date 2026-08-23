// hbot-site-canli.zip dogrulama: cikart + python http.server + 4 sayfa smoke test
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const TMP = "/Users/murselalkan/Documents/kimi/workspace/hbot-deploy/zip-test";
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
execSync(`unzip -q /Users/murselalkan/Documents/kimi/workspace/hbot-deploy/hbot-site-canli.zip -d ${TMP}`);
console.log("zip cikarildi, kok index.html:", fs.existsSync(TMP + "/index.html"));

const srv = spawn("python3", ["-m", "http.server", "7611", "--bind", "127.0.0.1"], { cwd: TMP, stdio: "ignore" });
process.on("exit", () => { try { srv.kill(); } catch (e) {} });

const puppeteer = require("/Users/murselalkan/Documents/kimi/workspace/mobil-test/node_modules/puppeteer-core");
const ok = [], bad = [];
const log = (g, m) => { (g ? ok : bad).push(m); console.log((g ? "PASS " : "FAIL ") + m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  await sleep(1200);
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox"] });
  const pages = [
    ["/", "ana sayfa"],
    ["/konfigurator.html?model=quad-cube", "konfigurator quad-cube"],
    ["/model-milano.html", "model Milano"],
    ["/model-geneva.html", "model Geneva"],
  ];
  for (const [path, label] of pages) {
    const p = await browser.newPage();
    await p.setViewport({ width: 1440, height: 900 });
    const errs = [], notFound = [];
    p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    p.on("requestfailed", (r) => notFound.push(r.url().split("/").slice(-2).join("/")));
    p.on("response", (r) => { if (r.status() >= 400) notFound.push(r.url().split("/").slice(-2).join("/") + " HTTP" + r.status()); });
    const resp = await p.goto("http://127.0.0.1:7611" + path, { waitUntil: "networkidle0", timeout: 30000 });
    await sleep(1200);
    log(resp && resp.status() === 200, `${label} HTTP ${resp && resp.status()}`);
    const imgs = await p.evaluate(() => {
      const all = Array.from(document.querySelectorAll("img"));
      const broken = all.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => (i.src || "").split("/").pop());
      return { total: all.length, broken };
    });
    log(imgs.broken.length === 0, `${label} ${imgs.total} img yuklendi, kirik: ${imgs.broken.join(",") || "yok"}`);
    log(errs.length === 0 && notFound.length === 0, `${label} konsol/404 temiz` + (errs.length + notFound.length ? " -> " + [...errs, ...notFound].slice(0, 3).join(" | ") : ""));
    await p.close();
  }
  // konfiguratorde renk tiklama smoke test
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://127.0.0.1:7611/konfigurator.html?model=quad-cube", { waitUntil: "networkidle0" });
  await sleep(1200);
  await p.click('#config-color-grid [data-color-id="bordo"]');
  await sleep(700);
  const tint = await p.evaluate(() => { const t = document.querySelector("#stage-tint"); return t ? getComputedStyle(t).backgroundColor : ""; });
  log(tint === "rgb(107, 39, 55)", `zip'ten konfigurator renk tint calisiyor: ${tint}`);
  // WhatsApp butonu mailto'ya gidiyor mu
  const waHref = await p.evaluate(() => (document.getElementById("whatsapp-float-btn") || {}).href || "YOK");
  log(waHref.startsWith("mailto:info@hbotchambertech.com"), `WhatsApp butonu mailto fallback: ${waHref.slice(0, 70)}`);
  await p.close();
  await browser.close();
  console.log(`\n=== smoke: ${ok.length} PASS / ${bad.length} FAIL ===`);
  bad.forEach((b) => console.log("FAIL: " + b));
  srv.kill();
  fs.rmSync(TMP, { recursive: true, force: true });
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error("FATAL", e); try { srv.kill(); } catch (x) {} process.exit(1); });
