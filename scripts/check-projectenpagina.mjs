/**
 * Controleert de projectenpagina: het raster, de vergroting met galerij en
 * de verwijzingen vanuit het menu, de voettekst en de pagina over ons.
 *
 * Gebruik: node scripts/check-projectenpagina.mjs <basisurl> [uitvoermap]
 */
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:4322/lkdakwerken/').replace(/\/?$/, '/');
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

/* Verwacht aantal projecten uit de gegevens, zodat de controle meeloopt. */
const bron = readFileSync('lib/data.ts', 'utf8');
const lijst = bron.match(/export const projecten(?:: Project\[\])? = \[([\s\S]*?)\n\];/)?.[1] ?? '';
const verwachteProjecten = [...lijst.matchAll(/image:\s*"project-\d+"/g)].length;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const mislukt = [];
page.on('response', (r) => {
  if (r.status() >= 400 && /\/projecten\/.*\.webp$/.test(r.url())) {
    mislukt.push(`${r.status()} ${r.url()}`);
  }
});

/* ---------- de pagina zelf ---------- */

const antwoord = await page.goto(`${BASIS}projecten/`, {
  waitUntil: 'networkidle0',
  timeout: 60000,
});
eis('projectenpagina bestaat', antwoord.status() === 200, `status ${antwoord.status()}`);

await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
});
await wacht(800);

const titel = await page.title();
eis('titel noemt projecten en het merk', /projecten/i.test(titel) && titel.includes('LK Dakwerken'), titel);

const kop = await page.$eval('h1', (el) => el.innerText.replace(/\s+/g, ' ').trim());
eis('eigen H1 op de pagina', kop.length > 0, kop);

const kaarten = await page.$$('main button[aria-label^="Bekijk project"]');
eis(
  'alle projecten staan in het raster',
  kaarten.length === verwachteProjecten,
  `${kaarten.length} van ${verwachteProjecten}`,
);

const bronnen = await page.$$eval('main button[aria-label^="Bekijk project"] img', (els) =>
  els.map((e) => e.getAttribute('src')),
);
eis(
  'alle foto\'s zijn lokale webp-bestanden',
  bronnen.length > 0 && bronnen.every((s) => /\/projecten\/project-\d+-kaart\.webp$/.test(s)),
  bronnen[0] ?? 'geen',
);
eis('geen Unsplash in het raster', !bronnen.some((s) => s.includes('unsplash')));

const geladen = await page.$$eval('main button[aria-label^="Bekijk project"] img', (els) =>
  els.filter((e) => e.complete && e.naturalWidth > 100).length,
);
eis('foto\'s daadwerkelijk geladen', geladen === bronnen.length, `${geladen} van ${bronnen.length}`);

/* Projecten met meerdere opnamen krijgen een telbadge op de kaart. Staat elk
   project op een enkele foto, dan hoort die badge er juist niet te zijn. */
const meervoudig = [...bron.matchAll(/extraFotos:\s*\[/g)].length;
const badges = await page.$$eval('main button[aria-label^="Bekijk project"]', (els) =>
  els.filter((e) => /\b[2-9]\b/.test(e.querySelector('span')?.innerText ?? '')).length,
);
eis(
  meervoudig > 0 ? 'kaarten tonen het aantal foto\'s' : 'geen telbadge bij enkele foto\'s',
  meervoudig > 0 ? badges >= 1 : badges === 0,
  `${badges} kaarten met een telbadge, ${meervoudig} projecten met extra foto's`,
);

/* ---------- vergroting met galerij ---------- */

await page.evaluate(() => {
  const knoppen = [...document.querySelectorAll('main button[aria-label^="Bekijk project"]')];
  const doel = knoppen.find((k) => (k.getAttribute('aria-label') ?? '').includes('Nesselande'));
  (doel ?? knoppen[0]).scrollIntoView({ block: 'center' });
  (doel ?? knoppen[0]).click();
});
await wacht(700);

const dialoog = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"]');
  if (!d) return null;
  return {
    mini: d.querySelectorAll('button[aria-label^="Foto "]').length,
    teller: d.innerText.match(/\d+ van \d+/)?.[0] ?? '',
    foto: d.querySelector('img')?.getAttribute('src') ?? '',
    tekst: d.innerText.length,
  };
});
eis('vergroting gaat open', Boolean(dialoog));

if (dialoog) {
  eis('grote foto is lokaal', /\/projecten\/project-\d+\.webp$/.test(dialoog.foto), dialoog.foto);
  if (meervoudig > 0) {
    eis('galerij toont miniaturen', dialoog.mini >= 2, `${dialoog.mini} miniaturen`);
    eis('teller aanwezig', /^1 van \d+$/.test(dialoog.teller), dialoog.teller);
  } else {
    eis('geen miniaturen bij een enkele foto', dialoog.mini === 0, `${dialoog.mini} miniaturen`);
    eis('geen teller bij een enkele foto', dialoog.teller === '', dialoog.teller);
  }
  eis('projecttekst staat erbij', dialoog.tekst > 200);

  if (UIT) await page.screenshot({ path: join(UIT, 'vergroting.png') });

  await page.keyboard.press('Escape');
  await wacht(400);
  eis('vergroting sluit met Escape', (await page.$('[role="dialog"]')) === null);
}

eis('geen mislukte fotoverzoeken', mislukt.length === 0, mislukt.slice(0, 2).join(' | '));
if (UIT) await page.screenshot({ path: join(UIT, 'pagina.png'), fullPage: false });

/* ---------- verwijzingen elders op de site ---------- */

const menu = await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });
eis('homepage laadt', menu.status() === 200);

const links = await page.$$eval('a', (els) => els.map((e) => e.getAttribute('href') ?? ''));
eis(
  'menu verwijst naar de projectenpagina',
  links.some((h) => /\/projecten\/?$/.test(h)),
);
eis(
  'geen verwijzing meer naar de oude ankerlink',
  !links.some((h) => h.includes('/over#projecten')),
);

await page.goto(`${BASIS}over/`, { waitUntil: 'networkidle0', timeout: 60000 });
const overLinks = await page.$$eval('a', (els) => els.map((e) => e.getAttribute('href') ?? ''));
eis(
  'pagina over ons verwijst door naar de projecten',
  overLinks.some((h) => /\/projecten\/?$/.test(h)),
);

const overUnsplash = await page.$$eval('main img', (els) =>
  els.filter((e) => (e.getAttribute('src') ?? '').includes('unsplash.com/project-')).length,
);
eis('geen kapotte projectfoto\'s meer op de pagina over ons', overUnsplash === 0, `${overUnsplash} gevonden`);

await browser.close();
console.log('\nfouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
