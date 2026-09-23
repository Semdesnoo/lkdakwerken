/**
 * Controleert de hero-video in de browser: speelt de juiste variant af op
 * desktop en telefoon, ligt de zwarte laag erover en blijft de kop leesbaar.
 *
 * Gebruik: node scripts/check-hero.mjs <basisurl> [uitvoermap]
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
  // Zonder deze vlag weigert headless Chrome autoplay van video.
  args: ['--hide-scrollbars', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
});

async function meet(naam, breedte, hoogte, mobiel, verwachteVariant) {
  const page = await browser.newPage();
  await page.setViewport({ width: breedte, height: hoogte, isMobile: mobiel, hasTouch: mobiel });

  const mislukt = [];
  page.on('response', (r) => {
    if (r.status() >= 400 && /\/hero\//.test(r.url())) mislukt.push(`${r.status()} ${r.url()}`);
  });

  await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });
  await wacht(2500);

  const video = await page.evaluate(() => {
    const v = document.querySelector('section video');
    if (!v) return null;
    return {
      bron: v.currentSrc || v.querySelector('source')?.getAttribute('src') || '',
      speelt: !v.paused && !v.ended,
      tijd: v.currentTime,
      gedempt: v.muted,
      herhaalt: v.loop,
      inline: v.hasAttribute('playsinline'),
      breedte: v.videoWidth,
      hoogte: v.videoHeight,
    };
  });

  console.log(`\n--- ${naam} (${breedte}x${hoogte}) ---`);
  eis(`${naam}: video aanwezig`, Boolean(video));

  if (video) {
    eis(`${naam}: juiste variant`, video.bron.includes(verwachteVariant), video.bron);
    eis(`${naam}: video speelt af`, video.speelt && video.tijd > 0, `t=${video.tijd.toFixed(2)}s`);
    eis(`${naam}: zonder geluid`, video.gedempt);
    eis(`${naam}: herhaalt`, video.herhaalt);
    eis(`${naam}: speelt inline af`, video.inline);
    eis(
      `${naam}: beeldverhouding klopt`,
      mobiel ? video.hoogte > video.breedte : video.breedte > video.hoogte,
      `${video.breedte}x${video.hoogte}`,
    );
  }

  /* De donkere lagen moeten over de video liggen, niet eronder. */
  const laag = await page.evaluate(() => {
    const houder = document.querySelector('section video')?.parentElement;
    if (!houder) return null;
    const lagen = [...houder.querySelectorAll(':scope > div[aria-hidden="true"]')];
    if (lagen.length === 0) return null;
    const kinderen = [...houder.children];
    const video = houder.querySelector('video');
    return {
      aantal: lagen.length,
      verlopen: lagen.every((el) => getComputedStyle(el).backgroundImage.includes('gradient')),
      naVideo: lagen.every((el) => kinderen.indexOf(el) > kinderen.indexOf(video)),
      eerste: getComputedStyle(lagen[0]).backgroundImage.slice(0, 40),
    };
  });
  eis(`${naam}: zwarte laag over de video`, laag?.verlopen === true, laag?.eerste ?? 'geen');
  eis(`${naam}: laag ligt bovenop`, laag?.naVideo === true, `${laag?.aantal ?? 0} lagen`);

  const kop = await page.evaluate(() => {
    const h = document.querySelector('section h1');
    if (!h) return null;
    const r = h.getBoundingClientRect();
    return { tekst: h.innerText.replace(/\s+/g, ' ').trim(), zichtbaar: r.width > 0 && r.height > 0 };
  });
  eis(`${naam}: kop staat over de video`, kop?.zichtbaar === true, kop?.tekst ?? 'geen');

  eis(`${naam}: geen mislukte heroverzoeken`, mislukt.length === 0, mislukt.slice(0, 2).join(' | '));

  if (UIT) await page.screenshot({ path: join(UIT, `${naam}.png`) });
  await page.close();
}

await meet('desktop', 1440, 900, false, 'hero-desktop');
await meet('mobiel', 390, 844, true, 'hero-mobiel');

await browser.close();
console.log('\nfouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
