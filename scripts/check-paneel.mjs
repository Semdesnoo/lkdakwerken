/**
 * Meet de twee kolommen van het dienstenpaneel op de homepage: waar de
 * linkerkolom (lijst plus knop) eindigt en waar de rechterfoto eindigt.
 * Een groot verschil betekent een gat onder de kortste kolom.
 *
 * Gebruik: node scripts/check-paneel.mjs <basisurl> [breedte]
 */
import puppeteer from 'puppeteer-core';

const BASIS = process.argv[2] ?? 'http://localhost:3001/lkdakwerken/';
const BREEDTE = Number(process.argv[3] ?? 1440);
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: BREEDTE, height: 900 });
await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });

const meting = await page.evaluate(() => {
  const raster = document.querySelector('#dienst-uitgelicht')?.parentElement;
  if (!raster) return null;
  const [links, rechts] = Array.from(raster.children).map((el) => {
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top), hoogte: Math.round(r.height), breedte: Math.round(r.width) };
  });
  return { links, rechts, verschil: Math.abs(links.hoogte - rechts.hoogte) };
});

console.log(JSON.stringify(meting, null, 2));
await browser.close();
