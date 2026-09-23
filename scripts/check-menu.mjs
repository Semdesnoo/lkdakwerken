/**
 * Controleert het scrollgedrag van de menubalk: omhoog uit beeld bij naar
 * beneden scrollen, terug in beeld bij omhoog scrollen, en altijd zichtbaar
 * bovenaan de pagina.
 *
 * Gebruik: node scripts/check-menu.mjs <basisurl> [uitvoermap]
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const BASIS = process.argv[2] ?? 'http://localhost:4322/lkdakwerken/';
const UIT = process.argv[3] ?? null;
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

if (UIT) mkdirSync(UIT, { recursive: true });

let fouten = 0;
const eis = (naam, goed, extra = '') => {
  if (!goed) fouten += 1;
  console.log((goed ? 'OK   ' : 'FOUT ') + naam + (extra ? '  ' + extra : ''));
};

const wacht = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});

/** Verticale positie van de balk ten opzichte van het scherm. */
async function balkTop(page) {
  return page.evaluate(() => {
    const h = document.querySelector('header');
    return h ? Math.round(h.getBoundingClientRect().top) : null;
  });
}

async function scrollNaar(page, y) {
  await page.evaluate((doel) => window.scrollTo({ top: doel, behavior: 'instant' }), y);
  // De schuifanimatie duurt 500 ms; ruim wachten zodat we de eindstand meten.
  await wacht(900);
}

async function meet(naam, breedte, hoogte, mobiel) {
  const page = await browser.newPage();
  await page.setViewport({ width: breedte, height: hoogte, isMobile: mobiel, hasTouch: mobiel });
  await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });
  await wacht(600);

  console.log(`\n--- ${naam} (${breedte}x${hoogte}) ---`);

  const overgang = await page.evaluate(() => {
    const s = getComputedStyle(document.querySelector('header'));
    return { eigenschap: s.transitionProperty, duur: s.transitionDuration };
  });
  eis(
    `${naam}: balk heeft een schuifanimatie`,
    overgang.eigenschap.includes('transform') && parseFloat(overgang.duur) > 0,
    `${overgang.eigenschap} ${overgang.duur}`,
  );

  const boven = await balkTop(page);
  eis(`${naam}: balk staat bovenaan in beeld`, boven !== null && boven >= 0, `top ${boven}px`);

  /* Naar beneden: de balk hoort boven de bovenrand van het scherm te staan. */
  await scrollNaar(page, 1400);
  const naOmlaag = await balkTop(page);
  eis(
    `${naam}: balk verdwijnt bij naar beneden scrollen`,
    naOmlaag !== null && naOmlaag + 10 < 0,
    `top ${naOmlaag}px`,
  );
  if (UIT) await page.screenshot({ path: join(UIT, `${naam}-omlaag.png`) });

  /* Weer omhoog, maar niet tot bovenaan: de balk hoort terug te komen zonder
     dat de pagina helemaal naar boven is gescrold. */
  await scrollNaar(page, 900);
  const naOmhoog = await balkTop(page);
  eis(
    `${naam}: balk komt terug bij omhoog scrollen`,
    naOmhoog !== null && naOmhoog >= 0,
    `top ${naOmhoog}px`,
  );
  eis(
    `${naam}: pagina staat niet bovenaan`,
    (await page.evaluate(() => window.scrollY)) > 400,
  );
  if (UIT) await page.screenshot({ path: join(UIT, `${naam}-omhoog.png`) });

  /* Terug naar de top: altijd zichtbaar. */
  await scrollNaar(page, 0);
  const terugBoven = await balkTop(page);
  eis(`${naam}: balk zichtbaar aan de top`, terugBoven !== null && terugBoven >= 0, `top ${terugBoven}px`);

  await page.close();
}

await meet('desktop', 1440, 900, false);
await meet('mobiel', 390, 844, true);

await browser.close();
console.log('\nfouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
