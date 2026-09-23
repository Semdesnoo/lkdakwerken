/**
 * Controleert dat geen enkele knop nog pilvormig is. Sinds de radiusronde
 * hoort elke knop de rechthoekige --radius-button te dragen; een radius die
 * de halve hoogte benadert, is een overgebleven pil.
 *
 * Uitgezonderd: de zwevende WhatsApp-knop (ronde bel is het idioom), chips
 * en stipjes (labels, geen knoppen) en de duim van de oppervlakteschuif.
 *
 * Gebruik: node scripts/check-knoppen.mjs <basisurl> [breedte]
 * Sluit af met code 1 zodra er een pil overblijft.
 */
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:3001/lkdakwerken/').replace(/\/$/, '');
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ROUTES = ['', 'diensten', 'projecten', 'over', 'locaties', 'blog', 'contact', 'offerte'];
const BREEDTE = Number(process.argv[3] ?? 1440);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: BREEDTE, height: 900 });

const meet = () =>
  Array.from(document.querySelectorAll('a, button'))
    /* Chips zijn labels die toevallig een link zijn; hun pilvorm is bedoeld.
       Hetzelfde geldt voor de zwevende WhatsApp-bel. */
    .filter(
      (el) =>
        !el.closest('.wa-float') &&
        !el.classList.contains('wa-float') &&
        !el.className.split(/\s+/).some((k) => k === 'chip' || k.startsWith('chip-')) &&
        !el.querySelector(':scope > .chip, :scope > [class^="chip-"]')
    )
    .map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        radius: parseFloat(cs.borderTopLeftRadius) || 0,
        hoogte: r.height,
        breedte: r.width,
        tekst: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 34),
      };
    })
    /* Een knop zonder eigen achtergrond of rand is een tekstlink; die heeft
       geen vorm om te beoordelen. Vandaar de ondergrens op de hoogte. */
    .filter((b) => b.hoogte >= 24 && b.breedte >= 24)
    /* Niet de pilgrens (radius = halve hoogte) maar de verhouding: 14px op
       een knop van 56px leest rustig, dezelfde 14px op 40px leest weer als
       een pil. De vormtaal is de ratio, niet de absolute waarde. */
    .filter((b) => b.radius / b.hoogte > 0.3);

let totaal = 0;
for (const route of ROUTES) {
  await page.goto(`${BASIS}/${route}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  const pillen = await page.evaluate(meet);
  if (pillen.length) {
    console.log(`\n/${route}`);
    for (const b of pillen) {
      console.log(`  r=${b.radius}px h=${Math.round(b.hoogte)}px  "${b.tekst}"`);
    }
  }
  totaal += pillen.length;
}

console.log(`\npilvormige knoppen over: ${totaal}`);
await browser.close();
process.exit(totaal ? 1 : 0);
