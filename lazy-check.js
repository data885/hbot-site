// ana sayfa lazy-loading kontrolu — scroll sonrasi tum img'ler yukleniyor mu
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const TMP = "/Users/murselalkan/Documents/kimi/workspace/hbot-deploy/zip-test";
fs.rmSync(TMP, { recursive: true, force: true });
execSync(`unzip -q /Users/murselalkan/Documents/kimi/workspace/hbot-deploy/hbot-site-canli.zip -d ${TMP}`);
const srv = spawn("python3", ["-m", "http.server", "7612", "--bind", "127.0.0.1"], { cwd: TMP, stdio: "ignore" });
process.on("exit", () => { try { srv.kill(); } catch (e) {} });
const puppeteer = require("/Users/murselalkan/Documents/kimi/workspace/mobil-test/node_modules/puppeteer-core");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  await sleep(1200);
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox"] });
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://127.0.0.1:7612/", { waitUntil: "networkidle0" });
  await p.evaluate(async () => { // sayfayi bastan sona kaydir
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  });
  await sleep(1500);
  const imgs = await p.evaluate(() => {
    const all = Array.from(document.querySelectorAll("img"));
    return { total: all.length, broken: all.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => (i.src || "").split("/").pop()) };
  });
  console.log(`scroll sonrasi: ${imgs.total} img, kirik: ${imgs.broken.length ? imgs.broken.join(",") : "YOK"} -> ${imgs.broken.length === 0 ? "PASS" : "FAIL"}`);
  await browser.close();
  srv.kill();
  fs.rmSync(TMP, { recursive: true, force: true });
  process.exit(imgs.broken.length ? 1 : 0);
})().catch((e) => { console.error("FATAL", e); try { srv.kill(); } catch (x) {} process.exit(1); });
