/**
 * Schiet één schermvullende opname per pagina-sectie voor een lijst routes,
 * zodat de binnenpagina's net zo gecontroleerd worden als de homepage.
 *
 * Gebruik: node scripts/shots-paginas.mjs <basisurl> <uitvoermap> [breedte]
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:3001/lkdakwerken/').replace(/\/$/, '');
const UIT = process.argv[3] ?? '.';
const BREEDTE = Number(process.argv[4] ?? 1440);
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ROUTES = [
  'diensten',
  'diensten/bitumen-daken',
  'projecten',
  'over',
  'locaties',
  'blog',
  'contact',
  'offerte',
];

mkdirSync(UIT, { recursive: true });
const wacht = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});

const page = await browser.newPage();
const mobiel = BREEDTE < 700;
await page.setViewport({ width: BREEDTE, height: mobiel ? 844 : 900, isMobile: mobiel, hasTouch: mobiel });

for (const route of ROUTES) {
  await page.goto(`${BASIS}/${route}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page
    .waitForFunction(() => Array.from(document.images).every((i) => i.complete), { timeout: 15000 })
    .catch(() => console.warn(`${route}: niet alle afbeeldingen geladen`));
  await wacht(500);

  const hoogte = await page.evaluate(() => document.body.scrollHeight);
  const viewport = mobiel ? 844 : 900;
  const stukken = Math.min(6, Math.ceil(hoogte / viewport));
  const naam = route.replace(/\//g, '-');
  for (let k = 0; k < stukken; k += 1) {
    await page.evaluate((y) => window.scrollTo(0, y), k * viewport);
    await wacht(350);
    await page.screenshot({ path: join(UIT, `${naam}-${k}.png`) });
  }
  console.log(`${naam}  h=${hoogte}  stukken=${stukken}`);
}

await browser.close();
