/**
 * Controleert de favicon-set: staan de verwijzingen in de pagina, geven de
 * bestanden een 200, en kloppen de afmetingen en het manifest.
 *
 * Gebruik: node scripts/check-favicon.mjs <basisurl>
 */
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:4322/lkdakwerken/').replace(/\/?$/, '/');
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let fouten = 0;
const eis = (naam, goed, extra = '') => {
  if (!goed) fouten += 1;
  console.log((goed ? 'OK   ' : 'FOUT ') + naam + (extra ? '  ' + extra : ''));
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});
const page = await browser.newPage();
await page.goto(BASIS, { waitUntil: 'networkidle0', timeout: 60000 });

/* ---------- verwijzingen in de pagina ---------- */

const links = await page.evaluate(() =>
  Array.from(document.querySelectorAll('link[rel*="icon"], link[rel="manifest"]')).map((l) => ({
    rel: l.getAttribute('rel'),
    href: l.getAttribute('href'),
    sizes: l.getAttribute('sizes'),
  }))
);

const heeft = (rel, deel) =>
  links.some((l) => l.rel.includes(rel) && (l.href ?? '').includes(deel));

eis('verwijzing naar favicon.ico', heeft('icon', 'favicon.ico'));
eis('verwijzing naar de png voor scherpe schermen', heeft('icon', 'favicon-96.png'));
eis('verwijzing naar het apple-touch-icon', heeft('apple-touch-icon', 'apple-touch-icon.png'));
eis('verwijzing naar het webmanifest', heeft('manifest', 'site.webmanifest'));
eis(
  'alle verwijzingen dragen het basispad',
  links.every((l) => (l.href ?? '').startsWith('/lkdakwerken/')),
  links.map((l) => l.href).join(' '),
);

/* ---------- bestanden echt ophalen ---------- */

const bestanden = [
  { naam: 'favicon.ico', minBytes: 1000 },
  { naam: 'favicon-96.png', minBytes: 1000, breedte: 96 },
  { naam: 'apple-touch-icon.png', minBytes: 1000, breedte: 180 },
  { naam: 'icon-192.png', minBytes: 1000, breedte: 192 },
  { naam: 'icon-512.png', minBytes: 5000, breedte: 512 },
];

for (const b of bestanden) {
  const url = new URL(b.naam, BASIS).href;
  const res = await page.evaluate(async (adres) => {
    const r = await fetch(adres, { cache: 'no-store' });
    const buf = await r.arrayBuffer();
    return { status: r.status, bytes: buf.byteLength, type: r.headers.get('content-type') };
  }, url);

  eis(`${b.naam} wordt geleverd`, res.status === 200 && res.bytes >= b.minBytes,
    `status ${res.status}, ${res.bytes} bytes`);

  if (b.breedte) {
    const maat = await page.evaluate(
      (adres) =>
        new Promise((klaar) => {
          const i = new Image();
          i.onload = () => klaar({ w: i.naturalWidth, h: i.naturalHeight });
          i.onerror = () => klaar(null);
          i.src = adres;
        }),
      url,
    );
    eis(
      `${b.naam} heeft de juiste afmeting`,
      maat !== null && maat.w === b.breedte && maat.h === b.breedte,
      maat ? `${maat.w}x${maat.h}` : 'niet geladen',
    );
  }
}

/* ---------- manifest ---------- */

const manifest = await page.evaluate(async (adres) => {
  const r = await fetch(adres, { cache: 'no-store' });
  if (r.status !== 200) return { status: r.status };
  try {
    return { status: 200, data: await r.json() };
  } catch (err) {
    return { status: 200, fout: err.message };
  }
}, new URL('site.webmanifest', BASIS).href);

eis('webmanifest is geldige JSON', manifest.status === 200 && Boolean(manifest.data),
  manifest.fout ?? `status ${manifest.status}`);

if (manifest.data) {
  eis('manifest draagt de bedrijfsnaam', manifest.data.name === 'LK Dakwerken', manifest.data.name);
  eis('manifest heeft minstens twee iconen', (manifest.data.icons ?? []).length >= 2);
  eis(
    'manifest-iconen dragen het basispad',
    (manifest.data.icons ?? []).every((i) => i.src.startsWith('/lkdakwerken/')),
  );
  eis('manifest kent een maskable icoon', (manifest.data.icons ?? []).some((i) => i.purpose === 'maskable'));
  eis('start_url wijst naar de site', manifest.data.start_url === '/lkdakwerken/', manifest.data.start_url);
}

await browser.close();
console.log('\nfouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
