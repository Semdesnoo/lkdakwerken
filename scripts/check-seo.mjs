/**
 * Controleert de SEO-basis van de uitgevoerde homepage (out/index.html):
 * titel, beschrijving, de H1 en de gestructureerde gegevens. De bedrijfsnaam
 * moet in elk van die velden staan, want daarop wordt gezocht.
 *
 * Draai met: node scripts/check-seo.mjs
 */
import { readFileSync } from 'node:fs';

const html = readFileSync('out/index.html', 'utf8');
const tekst = html.replace(/<!-- -->/g, '');

let fouten = 0;
const eis = (naam, goed, extra = '') => {
  if (!goed) fouten += 1;
  console.log((goed ? 'OK   ' : 'FOUT ') + naam + (extra ? '  ' + extra : ''));
};

const MERK = 'LK Dakwerken';

/* ---------- titel ---------- */

const titel = tekst.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
console.log(`titel: "${titel}" (${titel.length} tekens)`);
eis('titel bevat de bedrijfsnaam', titel.includes(MERK));
eis('bedrijfsnaam staat vooraan', titel.trim().startsWith(MERK), titel.slice(0, 20));
eis('titel noemt het vak', /dakdekker/i.test(titel));
eis('titel noemt de regio', /rotterdam|zuid-holland/i.test(titel));
// Google kapt rond de zestig tekens af; daarboven valt het eind weg.
eis('titel niet te lang', titel.length > 0 && titel.length <= 60, `${titel.length} tekens`);

/* ---------- beschrijving ---------- */

const omschrijving =
  tekst.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
console.log(`\nbeschrijving: ${omschrijving.length} tekens`);
eis('beschrijving bevat de bedrijfsnaam', omschrijving.includes(MERK));
eis('beschrijving noemt diensten', /bitumen|renovatie|lekkage/i.test(omschrijving));
eis(
  'beschrijving heeft een bruikbare lengte',
  omschrijving.length >= 120 && omschrijving.length <= 200,
  `${omschrijving.length} tekens`,
);

/* ---------- H1 ---------- */

const h1s = [...tekst.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
  m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
);
console.log(`\nH1: ${h1s.map((h) => `"${h}"`).join(' | ')}`);
eis('precies een H1 op de pagina', h1s.length === 1, `${h1s.length} gevonden`);
eis('H1 bevat de bedrijfsnaam', h1s[0]?.includes(MERK) === true);
eis('H1 noemt het vak', /dakdekker/i.test(h1s[0] ?? ''));

/* ---------- gestructureerde gegevens ---------- */

const blokken = [...tekst.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
eis('gestructureerde gegevens aanwezig', blokken.length > 0, `${blokken.length} blok(ken)`);

let schema = null;
for (const b of blokken) {
  try {
    const data = JSON.parse(b[1]);
    if (data['@type'] === 'RoofingContractor') schema = data;
  } catch (err) {
    eis('gestructureerde gegevens zijn geldige JSON', false, err.message);
  }
}

eis('schema van het type RoofingContractor', Boolean(schema));
if (schema) {
  eis('schema draagt de bedrijfsnaam', schema.name === MERK, schema.name);
  eis('schema noemt het werkgebied', Array.isArray(schema.areaServed) && schema.areaServed.length > 0);
  eis('schema somt de diensten op', (schema.hasOfferCatalog?.itemListElement?.length ?? 0) >= 3);
  eis('schema heeft adres en telefoon', Boolean(schema.address && schema.telephone));
}

/* ---------- open graph ---------- */

const og = tekst.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? '';
eis('og:title bevat de bedrijfsnaam', og.includes(MERK), og);

/* ---------- geen kastlijntjes ---------- */

eis('geen kastlijntjes in de uitvoer', !tekst.includes('\u2014'));

console.log('\nfouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
