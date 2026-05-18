import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIDTH = 1284;
const HEIGHT = 2778;
const SLIDE_COUNT = 6;
const OUT_DIR = path.resolve(__dirname, "..", "..", "dist", "appstore-china", "iphone_6_5");

/** Optional: `node export.mjs 6` writes only slide-6.png */
function slideListFromArgv() {
  const raw = process.argv[2];
  if (raw === undefined) {
    return Array.from({ length: SLIDE_COUNT }, (_, k) => k + 1);
  }
  const s = String(raw).trim().toLowerCase();
  const m = /^(?:slide)?-?([1-6])$/.exec(s);
  if (!m) {
    throw new Error(`Usage: node export.mjs [1-${SLIDE_COUNT}]  (e.g. node export.mjs 6)`);
  }
  return [Number(m[1])];
}

/** Wait until every <img> in the visible slide has decoded (fixes empty grid cells on slide 2). */
async function waitSlideImagesReady(page, slideNum) {
  await page.waitForFunction(
    (n) => {
      const slide = document.querySelector(`[data-slide="${n}"]`);
      if (!slide) return true;
      const imgs = Array.from(slide.querySelectorAll("img"));
      if (imgs.length === 0) return true;
      return imgs.every((img) => img.complete && img.naturalWidth > 0);
    },
    slideNum,
    { timeout: 25000 },
  );
}

/** campaign.html fits copy with JS; hidden slides skip fit (0×0 slot). Re-run after toggling slide. */
async function refitCopySlots(page) {
  await page.evaluate(() => {
    window.dispatchEvent(new Event("resize"));
  });
  await new Promise((r) => setTimeout(r, 450));
}

async function main() {
  const htmlPath = path.join(__dirname, "campaign.html");
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing ${htmlPath}`);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const url = pathToFileURL(htmlPath).href;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "load" });
  await new Promise((r) => setTimeout(r, 400));

  const slides = slideListFromArgv();

  /* Decode images for each export slide once (some browsers defer off-screen images). */
  for (const pre of slides) {
    await page.evaluate((n) => {
      document.querySelectorAll("[data-slide]").forEach((el) => {
        el.style.display = el.getAttribute("data-slide") === String(n) ? "block" : "none";
      });
    }, pre);
    await waitSlideImagesReady(page, pre);
    await refitCopySlots(page);
    await new Promise((r) => setTimeout(r, 200));
  }

  for (const i of slides) {
    await page.evaluate((n) => {
      document.querySelectorAll("[data-slide]").forEach((el) => {
        el.style.display = el.getAttribute("data-slide") === String(n) ? "block" : "none";
      });
    }, i);
    await waitSlideImagesReady(page, i);
    await refitCopySlots(page);
    await new Promise((r) => setTimeout(r, 350));

    const outFile = path.join(OUT_DIR, `slide-${i}.png`);
    await page.screenshot({
      path: outFile,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      animations: "disabled",
    });
    process.stdout.write(`Wrote ${outFile}\n`);
  }

  await browser.close();
  process.stdout.write("Done.\n");
}

await main();
