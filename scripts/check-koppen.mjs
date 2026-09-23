/**
 * Meet elke kop op de homepage: hoeveel regels hij inneemt en hoeveel ruimte
 * er in de kolom over is. Een kop die door text-balance korter wordt gezet dan
 * zijn kolom toelaat, valt hier op als "ruim" met meer regels dan nodig.
 *
 * Gebruik: node scripts/check-koppen.mjs <basisurl> [breedte]
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

const koppen = await page.evaluate(() => {
  /* Breedte van de langste fysieke regel, gemeten met Range-rechthoeken.
     Daarmee zien we of een kop breekt omdat hij niet past, of omdat
     text-balance hem korter zet dan nodig. */
  const regelbreedtes = (el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    const rects = Array.from(r.getClientRects()).filter((b) => b.width > 1);
    return rects.map((b) => Math.round(b.width));
  };

  return Array.from(document.querySelectorAll('h1, h2')).map((h) => {
    const cs = getComputedStyle(h);
    const breedtes = regelbreedtes(h);
    return {
      tekst: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 44),
      regels: Math.round(h.getBoundingClientRect().height / parseFloat(cs.lineHeight)),
      langste: Math.max(0, ...breedtes),
      kolom: Math.round(h.parentElement.getBoundingClientRect().width),
      grootte: cs.fontSize,
      wrap: cs.textWrap || cs.textWrapStyle || 'auto',
    };
  });
});

for (const k of koppen) {
  console.log(
    `${k.regels}r  langste=${String(k.langste).padStart(4)}  kolom=${String(k.kolom).padStart(4)}  ` +
      `${k.grootte.padStart(6)}  wrap=${k.wrap.padEnd(7)}  ${k.tekst}`
  );
}
await browser.close();
