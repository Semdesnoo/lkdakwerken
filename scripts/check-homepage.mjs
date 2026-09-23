/**
 * Controleert de uitgevoerde homepage (out/index.html) op de punten uit de
 * iteratie: nieuwe secties aanwezig, afwisselende achtergronden en geen
 * kastlijntjes in zichtbare tekst. Draai met: node scripts/check-homepage.mjs
 */
import { readFileSync } from 'node:fs';

const html = readFileSync('out/index.html', 'utf8');
// React zet <!-- --> tussen losse tekstknopen; dat wegfilteren maakt
// controles op zichtbare zinnen betrouwbaar.
const tekst = html.replace(/<!-- -->/g, '');
let fouten = 0;

const eis = (naam, goed, extra = '') => {
  if (!goed) fouten += 1;
  console.log((goed ? 'OK   ' : 'FOUT ') + naam + (extra ? '  ' + extra : ''));
};

console.log('--- nieuwe secties ---');
eis('projectenslider kop', html.includes('Onze projecten'));
eis('projectenslider track', html.includes('slider-track'));
eis('projectenslider pijlknoppen', html.includes('slider-arrow'));
/* Aantal projecten uit lib/data.ts, zodat de check meegroeit als er
   projecten bij komen. */
const projectenAantal = (
  readFileSync('lib/data.ts', 'utf8')
    .match(/export const projecten(?:: Project\[\])? = \[([\s\S]*?)\n\];/)?.[1]
    .match(/image:\s*"project-\d+"/g) || []
).length;

eis(
  `${projectenAantal} projecten in de track`,
  (html.match(/door LK Dakwerken" loading="lazy" draggable/g) || []).length === projectenAantal,
);
eis('licht diensten-paneel', /rounded-3xl bg-white/.test(html));
eis('diensten-paneel wisselt foto', html.includes('dienst-uitgelicht'));
eis('knop Alle diensten', html.includes('Alle diensten'));
eis('google kop', html.includes('Dit zeggen onze klanten in Google'));
eis('google logotype in vier kleuren', html.includes('google-blauw') && html.includes('google-rood') && html.includes('google-geel') && html.includes('google-groen'));
eis('gouden sterren', html.includes('ster-goud'));
eis('score en aantal', tekst.includes('4,9') && tekst.includes('127 beoordelingen'));
eis('knop Beoordeel ons op Google', html.includes('Beoordeel ons op Google'));
eis('link naar google-profiel', html.includes('google.com/search?q=LK+Dakwerken+Rotterdam+reviews'));
eis('blauw getinte hairlines', /border-blue-(400|500)\/2[05]/.test(html));

console.log('\n--- geen kastlijntjes ---');
eis('nul em-dashes in de uitvoer', !/—/.test(html));

console.log('\n--- ritme van de achtergronden ---');
const klassen = [...html.matchAll(/<section[^>]*class="([^"]*)"/g)].map((m) => m[1]);
const kleur = (c) => {
  if (/bg-ink-9[0-9]0/.test(c)) return 'donker';
  if (/bg-paper-50/.test(c)) return 'paper-50';
  if (/bg-white/.test(c)) return 'wit';
  return 'hero';
};
const rij = klassen.map(kleur);
rij.forEach((k, i) => console.log('  ' + i + ': ' + k));
/* Het aantal secties komt uit app/page.tsx, zodat de controle meeloopt
   wanneer er een blok af gaat of bij komt. */
const paginaBron = readFileSync('app/page.tsx', 'utf8');
const verwachteSecties = [...paginaBron.matchAll(/^\s*<[A-Z]\w+ \/>/gm)].length;
eis(`${verwachteSecties} secties`, rij.length === verwachteSecties, `${rij.length} gevonden`);
eis('geen twee gelijke achtergronden naast elkaar', rij.every((k, i) => i === 0 || k !== rij[i - 1]));
eis('donkere secties aanwezig', rij.filter((k) => k === 'donker').length >= 3);

console.log('\nfouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
