/**
 * Visuele controle van de homepage: scrollt elke sectie in beeld en schiet
 * het viewport. Bewust GEEN captureBeyondViewport: secties met een
 * horizontaal scrollende track (de sliders) renderen dan leeg.
 *
 * Gebruik: node scripts/shots.mjs <basisurl> <uitvoermap>
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const BASIS = process.argv[2] ?? 'http://localhost:4322/lkdakwerken/';
const UIT = process.argv[3] ?? '.';
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

mkdirSync(UIT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});

const wacht = (ms) => new Promise((r) => setTimeout(r, ms));

async function schiet(naam, breedte, hoogte, mobiel) {
  const page = await browser.newPage();
  await page.setViewport({ width: breedte, height: hoogte, isMobile: mobiel, hasTouch: mobiel });
  await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });

  // Eerst alles langslopen zodat lazy afbeeldingen en scroll-reveals klaar zijn.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page
    .waitForFunction(() => Array.from(document.images).every((i) => i.complete), { timeout: 15000 })
    .catch(() => console.warn(`${naam}: niet alle afbeeldingen geladen`));
  await wacht(700);

  const posities = await page.evaluate(() =>
    Array.from(document.querySelectorAll('main > section')).map((el) => ({
      top: el.getBoundingClientRect().top + window.scrollY,
      hoogte: el.getBoundingClientRect().height,
      klasse: el.className.slice(0, 55),
    }))
  );

  let n = 0;
  for (const s of posities) {
    if (s.hoogte < 40) continue;
    // Lange secties in schermhoge stukken, zodat niets buiten beeld valt.
    const stukken = Math.max(1, Math.ceil(s.hoogte / hoogte));
    for (let k = 0; k < stukken; k += 1) {
      const y = Math.round(s.top + k * hoogte);
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await wacht(450);
      const naamStuk = `${naam}-${String(n).padStart(2, '0')}${stukken > 1 ? `-${k}` : ''}`;
      await page.screenshot({ path: join(UIT, `${naamStuk}.png`) });
    }
    console.log(`${naam}-${String(n).padStart(2, '0')}  h=${Math.round(s.hoogte)}  ${s.klasse}`);
    n += 1;
  }
  await page.close();
  return n;
}

const d = await schiet('desk', 1440, 900, false);
const m = await schiet('mob', 390, 844, true);
console.log(`secties desktop=${d} mobiel=${m}`);
await browser.close();
