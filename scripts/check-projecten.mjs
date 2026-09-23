/**
 * Controleert de projectenslider in de browser: aantal kaarten, lokale
 * fotopaden, en de vergroting die opengaat bij een klik op een kaart.
 *
 * Gebruik: node scripts/check-projecten.mjs <basisurl> [uitvoermap]
 */
import { mkdirSync, readFileSync } from 'node:fs';
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

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

/* Netwerkfouten op afbeeldingen vangen we op, want een verkeerd basePath
   levert een pagina op die er verder prima uitziet. */
const mislukt = [];
page.on('requestfailed', (r) => {
  // Next prefetcht pagina's die de statische export niet als data-route kent;
  // alleen fouten op de projectfoto's zelf zijn hier interessant.
  if (/\/projecten\/.*\.webp$/.test(r.url())) mislukt.push(`mislukt ${r.url()}`);
});
page.on('response', (r) => {
  // Alleen de fotobestanden zelf; Next prefetcht daarnaast data-routes die
  // een statische export niet kent, en die 404's zeggen niets over beeld.
  if (r.status() >= 400 && /\/projecten\/.*\.webp$/.test(r.url())) {
    mislukt.push(`${r.status()} ${r.url()}`);
  }
});

await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });

// Alles langslopen zodat de lazy afbeeldingen in de slider laden.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
});
await wacht(800);

const kaarten = await page.$$('.slider-track article');

/* Het aantal kaarten moet overeenkomen met lib/data.ts: projecten worden
   samengevoegd zodra blijkt dat foto's bij hetzelfde dak horen, dus een vast
   minimum zou telkens verlopen. */
const bron = readFileSync('lib/data.ts', 'utf8');
const lijst = bron.match(/export const projecten(?:: Project\[\])? = \[([\s\S]*?)\n\];/)?.[1] ?? '';
const verwachteKaarten = [...lijst.matchAll(/image:\s*"project-\d+"/g)].length;

eis(
  'aantal kaarten komt overeen met de gegevens',
  kaarten.length === verwachteKaarten && verwachteKaarten > 0,
  `${kaarten.length} kaarten, ${verwachteKaarten} projecten`,
);

const bronnen = await page.$$eval('.slider-track article img', (els) =>
  els.map((e) => e.getAttribute('src')),
);
eis(
  'alle kaartfoto\'s zijn lokale webp-bestanden',
  bronnen.length > 0 && bronnen.every((s) => /\/projecten\/project-\d+-kaart\.webp$/.test(s)),
  bronnen[0] ?? 'geen',
);
eis('geen Unsplash meer in de slider', !bronnen.some((s) => s.includes('unsplash')));

const geladen = await page.$$eval('.slider-track article img', (els) =>
  els.filter((e) => e.complete && e.naturalWidth > 100).length,
);
eis('kaartfoto\'s daadwerkelijk geladen', geladen >= 4, `${geladen} van ${bronnen.length} geladen`);

/* Vergroting openen via de eerste kaart. */
await page.evaluate(() => {
  const knop = document.querySelector('.slider-track article button');
  knop.scrollIntoView({ block: 'center' });
  knop.click();
});
await wacht(600);

const dialoog = await page.$('[role="dialog"]');
eis('vergroting gaat open', Boolean(dialoog));

if (dialoog) {
  const inhoud = await page.$eval('[role="dialog"]', (el) => ({
    tekst: el.innerText,
    foto: el.querySelector('img')?.getAttribute('src') ?? '',
    fotoGeladen: (() => {
      const i = el.querySelector('img');
      return Boolean(i && i.complete && i.naturalWidth > 100);
    })(),
  }));

  eis('vergroting toont de grote foto', /\/projecten\/project-\d+\.webp$/.test(inhoud.foto), inhoud.foto);
  eis('grote foto is geladen', inhoud.fotoGeladen);
  eis('vergroting toont een projecttekst', inhoud.tekst.length > 120);
  eis('vergroting toont plaats en jaar',
    inhoud.tekst.includes('Plaats') && inhoud.tekst.includes('Jaar'));
  eis('geen kastlijntje in de vergroting', !inhoud.tekst.includes('\u2014'));

  if (UIT) await page.screenshot({ path: join(UIT, 'vergroting.png') });

  await page.keyboard.press('Escape');
  await wacht(400);
  eis('vergroting sluit met Escape', (await page.$('[role="dialog"]')) === null);
}

/* Projecten kunnen meerdere opnamen van hetzelfde dak dragen. Zijn die er,
   dan hoort de vergroting miniaturen te tonen waarmee je wisselt. Staat elk
   project op een enkele foto, dan mogen die miniaturen er juist niet zijn. */
const blokken = [...lijst.matchAll(/plaats:\s*"([^"]+)"[\s\S]*?\n  \},/g)];

let doelPlaats = '';
let verwachtAantal = 0;
for (const b of blokken) {
  const aantal =
    1 + [...(b[0].match(/extraFotos:\s*\[([^\]]*)\]/)?.[1] ?? '').matchAll(/"[^"]+"/g)].length;
  if (aantal > verwachtAantal) {
    verwachtAantal = aantal;
    doelPlaats = b[1];
  }
}

const metGalerij = await page.evaluate((plaats) => {
  const knoppen = [...document.querySelectorAll('.slider-track article button')];
  const i = plaats
    ? knoppen.findIndex((k) => (k.getAttribute('aria-label') ?? '').includes(plaats))
    : 0;
  if (i < 0) return -1;
  knoppen[i].scrollIntoView({ block: 'center' });
  knoppen[i].click();
  return i;
}, doelPlaats);

eis('kaart met de meeste foto\'s geopend', metGalerij >= 0,
  `${doelPlaats}, kaart ${metGalerij}, ${verwachtAantal} foto's`);

if (metGalerij >= 0) {
  await wacht(600);

  const galerij = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    const mini = [...dlg.querySelectorAll('button[aria-label^="Foto "]')];
    return {
      aantal: mini.length,
      teller: dlg.innerText.match(/\d+ van \d+/)?.[0] ?? '',
      hoofdfoto: dlg.querySelector('img')?.getAttribute('src') ?? '',
    };
  });

  if (verwachtAantal > 1) {
    eis(
      `${verwachtAantal} miniaturen zichtbaar`,
      galerij.aantal === verwachtAantal,
      `${galerij.aantal} miniaturen`,
    );
    eis('teller toont de positie', galerij.teller === `1 van ${verwachtAantal}`, galerij.teller);

    /* Op de tweede miniatuur klikken moet de grote foto verwisselen. */
    await page.evaluate(() => {
      document.querySelectorAll('[role="dialog"] button[aria-label^="Foto "]')[1].click();
    });
    await wacht(500);

    const na = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      const img = dlg.querySelector('img');
      return {
        bron: img?.getAttribute('src') ?? '',
        geladen: Boolean(img && img.complete && img.naturalWidth > 100),
        teller: dlg.innerText.match(/\d+ van \d+/)?.[0] ?? '',
      };
    });

    eis('grote foto wisselt bij een klik', na.bron !== galerij.hoofdfoto, na.bron);
    eis('tweede foto is geladen', na.geladen);
    eis('teller loopt mee', na.teller === `2 van ${verwachtAantal}`, na.teller);
  } else {
    /* Elk project heeft een eigen foto: dan hoort er geen galerij te staan. */
    eis('geen miniaturen bij een project met een enkele foto', galerij.aantal === 0,
      `${galerij.aantal} miniaturen`);
    eis('geen teller bij een enkele foto', galerij.teller === '', galerij.teller);
  }

  if (UIT) await page.screenshot({ path: join(UIT, 'galerij.png') });

  await page.keyboard.press('Escape');
  await wacht(300);
}

eis('geen mislukte fotoverzoeken', mislukt.length === 0, mislukt.slice(0, 3).join(' | '));

await browser.close();
console.log('fouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
