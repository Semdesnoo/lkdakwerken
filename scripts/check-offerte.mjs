/**
 * Bedient het offerteformulier echt en controleert of de prijsindicatie
 * verschijnt en meebeweegt met de invoer. Schiet ook screenshots.
 *
 * Gebruik: node scripts/check-offerte.mjs <basisurl> <uitvoermap>
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const BASIS = process.argv[2] ?? 'http://localhost:4322/lkdakwerken/';
const UIT = process.argv[3] ?? '.';
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

mkdirSync(UIT, { recursive: true });
const wacht = (ms) => new Promise((r) => setTimeout(r, ms));
let fouten = 0;

function check(naam, voorwaarde, extra = '') {
  console.log(`${voorwaarde ? 'OK  ' : 'FOUT'} ${naam}${extra ? `  ${extra}` : ''}`);
  if (!voorwaarde) fouten += 1;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto(new URL('offerte/', BASIS).href, { waitUntil: 'networkidle0', timeout: 60000 });

/** Leest het indicatiepaneel uit, of geeft null wanneer het er niet staat. */
const leesIndicatie = () =>
  page.evaluate(() => {
    const kop = Array.from(document.querySelectorAll('p')).find(
      (p) => p.textContent.trim() === 'Uw prijsindicatie'
    );
    if (!kop) return null;
    const paneel = kop.parentElement;
    const bedrag = paneel.querySelector('p:nth-of-type(2)')?.textContent ?? '';
    const getallen = (bedrag.match(/[\d.]+/g) ?? []).map((g) => Number(g.replace(/\./g, '')));
    return {
      tekst: bedrag.replace(/\s+/g, ' ').trim(),
      van: getallen[0],
      tot: getallen[1],
      regels: Array.from(paneel.querySelectorAll('dl > div')).map((d) =>
        d.textContent.replace(/\s+/g, ' ').trim()
      ),
    };
  });

/** Leegmaken via Ctrl+A: een triple-click selecteert niet in dit React-veld. */
async function vulOppervlakte(waarde) {
  await page.click('#oppervlakte');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  const leeg = await page.$eval('#oppervlakte', (el) => el.value);
  if (leeg !== '') throw new Error(`oppervlakteveld niet leeg: ${JSON.stringify(leeg)}`);
  if (waarde) await page.type('#oppervlakte', waarde);
}

// Het paneel zelf in beeld schieten, niet het toevallige venster.
async function schietPaneel(bestand) {
  const el = await page.evaluateHandle(() => {
    const kop = Array.from(document.querySelectorAll('p')).find(
      (p) => p.textContent.trim() === 'Uw prijsindicatie'
    );
    return kop ? kop.parentElement : null;
  });
  const element = el.asElement();
  if (!element) return;
  await element.scrollIntoView();
  await wacht(400);
  await element.screenshot({ path: join(UIT, bestand) });
}

check('geen indicatie bij een leeg formulier', (await leesIndicatie()) === null);

// Alleen een dienst, nog geen oppervlakte: nog steeds niets tonen.
await page.select('#dienst', 'bitumen-daken');
await wacht(500);
check('geen indicatie zonder oppervlakte', (await leesIndicatie()) === null);

// Oppervlakte erbij: de indicatie moet verschijnen met de verwachte bedragen.
await page.type('#oppervlakte', '120');
await wacht(700);
const basis = await leesIndicatie();
check('indicatie verschijnt', basis !== null, basis?.tekst);
check('ondergrens 120 x 75 = 9.000', basis?.van === 9000, String(basis?.van));
check('bovengrens 120 x 110 = 13.200', basis?.tot === 13200, String(basis?.tot));

await schietPaneel('offerte-indicatie.png');

// Een toeslag aanvinken moet het bedrag verhogen en een regel toevoegen.
const labels = await page.$$('label');
for (const l of labels) {
  const tekst = await l.evaluate((el) => el.textContent);
  if (tekst.includes('Isolatie meenemen')) {
    await l.click();
    break;
  }
}
await wacht(700);
const metIsolatie = await leesIndicatie();
check('isolatie verhoogt het bedrag', metIsolatie.van > basis.van, `${basis.van} -> ${metIsolatie.van}`);
check('isolatie krijgt een eigen regel', metIsolatie.regels.length === basis.regels.length + 1);

await schietPaneel('offerte-isolatie.png');

// Spoed bij lekkage rekent per bezoek, niet per m².
await page.select('#dienst', 'lekkage');
await wacht(700);
const lekkage = await leesIndicatie();
check('lekkage toont een bedrag per bezoek', lekkage !== null && lekkage.van === 165, lekkage?.tekst);
check('lekkage verbergt de toeslagen', !(await page.$$eval('label', (ls) =>
  ls.some((l) => l.textContent.includes('Isolatie meenemen'))
)));

await schietPaneel('offerte-lekkage.png');

// Onzin in het oppervlakteveld mag geen bedrag opleveren.
await page.select('#dienst', 'renovatie');
await vulOppervlakte('geen idee');
await wacht(700);
check('onbruikbare invoer geeft geen bedrag', (await leesIndicatie()) === null);

// Mobiel: opnieuw laden op telefoonformaat, zodat de layout echt mobiel is.
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: 'networkidle0' });
await page.select('#dienst', 'renovatie');
await vulOppervlakte('250');
await wacht(700);
const mobiel = await leesIndicatie();
check('indicatie ook op mobiel', mobiel !== null, mobiel?.tekst);
const overloop = await page.evaluate(() => {
  const kop = Array.from(document.querySelectorAll('p')).find(
    (p) => p.textContent.trim() === 'Uw prijsindicatie'
  );
  if (!kop) return null;
  const r = kop.parentElement.getBoundingClientRect();
  return { links: r.left, rechts: r.right, venster: window.innerWidth };
});
check(
  'paneel past binnen het mobiele scherm',
  overloop !== null && overloop.links >= 0 && overloop.rechts <= overloop.venster + 1,
  JSON.stringify(overloop)
);
await schietPaneel('offerte-mobiel.png');

// Na het versturen moet de indicatie op de bevestiging blijven staan.
await page.setViewport({ width: 1440, height: 1200 });
await page.reload({ waitUntil: 'networkidle0' });
await page.select('#dienst', 'bitumen-daken');
await vulOppervlakte('120');
await page.type('#naam', 'Jan de Vries');
await page.type('#email', 'jan@voorbeeld.nl');
await page.type('#telefoon', '0612345678');
await page.click('button[type="submit"]');
await wacht(800);
const bevestiging = await leesIndicatie();
check('indicatie blijft na versturen staan', bevestiging?.van === 9000, bevestiging?.tekst);
check(
  'bevestiging noemt de naam',
  await page.evaluate(() => document.body.textContent.includes('Bedankt, Jan de Vries'))
);
// De bevestiging moet ook echt in beeld staan, niet ergens boven de vouw.
const zichtbaar = await page.evaluate(() => {
  const kop = Array.from(document.querySelectorAll('h2')).find((h) =>
    h.textContent.includes('Bedankt')
  );
  if (!kop) return null;
  const r = kop.getBoundingClientRect();
  return { top: Math.round(r.top), venster: window.innerHeight };
});
check(
  'bedankbericht staat in beeld na versturen',
  zichtbaar !== null && zichtbaar.top >= 0 && zichtbaar.top < zichtbaar.venster,
  JSON.stringify(zichtbaar)
);
await page.screenshot({ path: join(UIT, 'offerte-bevestiging.png') });

console.log(`\nfouten: ${fouten}`);
await browser.close();
process.exit(fouten === 0 ? 0 : 1);
