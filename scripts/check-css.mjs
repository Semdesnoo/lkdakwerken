/**
 * Controleert of Tailwind de klassen uit de nieuwe homepage-componenten
 * daadwerkelijk heeft gegenereerd in de uitgevoerde CSS.
 * Draai met: node scripts/check-css.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const bestanden = [];
(function loop(map) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) loop(pad);
    else if (naam.endsWith('.css')) bestanden.push(pad);
  }
})('out');

const css = bestanden.map((f) => readFileSync(f, 'utf8')).join('\n');
console.log('css-bestanden: ' + bestanden.join(', '));
console.log('lengte: ' + css.length + ' tekens\n');

const zoek = [
  'slider-track',
  'slider-arrow',
  'slider-item',
  'google-blauw',
  'ster-goud',
  'border-blue-500',
  'border-blue-400',
  'w-\\[78\\%\\]',
  'calc(25% - .9375rem)',
  'calc(33.333% - .834rem)',
  'bg-white\\/12',
  'line-clamp-3',
  'aspect-\\[5\\/4\\]',
];

let ontbreekt = 0;
for (const s of zoek) {
  const gevonden = css.includes(s);
  if (!gevonden) ontbreekt += 1;
  console.log((gevonden ? 'JA  ' : 'NEE ') + s);
}

console.log('\nontbreekt: ' + ontbreekt);
process.exit(ontbreekt === 0 ? 0 : 1);
