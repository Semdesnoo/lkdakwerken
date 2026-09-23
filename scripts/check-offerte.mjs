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

/** Klikt de dienstkaart met dit opschrift aan. */
async function kiesDienst(label) {
  const gelukt = await page.evaluate((tekst) => {
    const knop = Array.from(document.querySelectorAll('[role="radio"]')).find((b) =>
      b.textContent.includes(tekst)
    );
    if (!knop) return false;
    knop.click();
    return true;
  }, label);
  if (!gelukt) throw new Error(`dienstkaart niet gevonden: ${label}`);
  await wacht(400);
}

/**
 * Zet de oppervlakteschuif op de gevraagde waarde. De schuif kent vaste
 * standen, dus we zoeken de stand die bij het aantal vierkante meters hoort
 * en sturen de bijbehorende invoergebeurtenis.
 */
async function zetOppervlakte(meters) {
  const gezet = await page.evaluate((doel) => {
    const schuif = document.querySelector('#oppervlakte');
    if (!schuif) return null;

    // De standen staan niet in de DOM, dus we lopen ze af en lezen het
    // getal dat het formulier zelf toont.
    const zetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    const max = Number(schuif.max);
    for (let i = 0; i <= max; i += 1) {
      zetter.call(schuif, String(i));
      schuif.dispatchEvent(new Event('input', { bubbles: true }));
      const tekst = schuif.getAttribute('aria-valuetext') ?? '';
      const waarde = Number(tekst.match(/\d+/)?.[0] ?? 0);
      if (waarde >= doel) return waarde;
    }
    return null;
  }, meters);

  await wacht(500);
  return gezet;
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

/* ---------- dienstkeuze als kaarten ---------- */

const kaarten = await page.$$('[role="radio"]');
check('dienstkeuze staat als kaarten', kaarten.length === 5, `${kaarten.length} kaarten`);
check('geen keuzelijst meer voor de dienst', (await page.$('select#dienst')) === null);

check('geen indicatie bij een leeg formulier', (await leesIndicatie()) === null);

// Alleen een dienst, nog geen oppervlakte: nog steeds niets tonen.
await kiesDienst('Bitumen daken');
check('gekozen kaart is aangevinkt', await page.evaluate(() =>
  Array.from(document.querySelectorAll('[role="radio"]')).some(
    (b) => b.getAttribute('aria-checked') === 'true' && b.textContent.includes('Bitumen daken')
  )
));
check('geen indicatie zonder oppervlakte', (await leesIndicatie()) === null);

/* ---------- oppervlakte met de schuif ---------- */

const schuif = await page.$eval('#oppervlakte', (el) => el.type);
check('oppervlakte is een schuif', schuif === 'range', schuif);

const gezet = await zetOppervlakte(120);
check('schuif bereikt 120 m²', gezet === 120, String(gezet));

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
await kiesDienst('Lekkage');
await wacht(500);
const lekkage = await leesIndicatie();
check('lekkage toont een bedrag per bezoek', lekkage !== null && lekkage.van === 165, lekkage?.tekst);
check('lekkage verbergt de toeslagen', !(await page.$$eval('label', (ls) =>
  ls.some((l) => l.textContent.includes('Isolatie meenemen'))
)));

await schietPaneel('offerte-lekkage.png');

/* ---------- verplichte contactgegevens ---------- */

await page.reload({ waitUntil: 'networkidle0' });
await kiesDienst('Renovatie');
await page.click('button[type="submit"]');
await wacht(600);

const meldingen = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.field-error')).map((e) => e.textContent.trim())
);
check('versturen zonder contactgegevens wordt tegengehouden', meldingen.length >= 3, `${meldingen.length} meldingen`);
check('naam is verplicht', meldingen.some((m) => m.toLowerCase().includes('naam')));
check('e-mailadres is verplicht', meldingen.some((m) => m.toLowerCase().includes('mail')));
check('telefoonnummer is verplicht', meldingen.some((m) => m.toLowerCase().includes('telefoon')));
check('formulier is niet verstuurd', !(await page.evaluate(() =>
  document.body.textContent.includes('Bedankt,')
)));

// Een half e-mailadres hoort ook te worden afgekeurd.
await page.type('#naam', 'Jan de Vries');
await page.type('#email', 'jan@voorbeeld');
await page.type('#telefoon', '0612345678');
await page.click('button[type="submit"]');
await wacht(600);
check('onvolledig e-mailadres wordt afgekeurd', await page.evaluate(() =>
  Array.from(document.querySelectorAll('.field-error')).some((e) =>
    e.textContent.includes('niet compleet')
  )
));

/* ---------- mobiel ---------- */

await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: 'networkidle0' });
await kiesDienst('Renovatie');
await zetOppervlakte(250);
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

/* ---------- versturen ---------- */

await page.setViewport({ width: 1440, height: 1200 });
await page.reload({ waitUntil: 'networkidle0' });
await kiesDienst('Bitumen daken');
await zetOppervlakte(120);
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
