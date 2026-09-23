/**
 * Controleert of elke klasse uit de nieuwe en gewijzigde homepage-componenten
 * ook echt in de uitgevoerde CSS terechtkomt. Tailwind laat een klasse stil
 * vallen zodra de arbitraire waarde niet parseert, en dat is zonder controle
 * niet te zien. Draai met: node scripts/check-classes.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/* Alle componenten, niet een handmatige lijst: die liep achter zodra er een
   bestand bijkwam of verdween. */
const componenten = readdirSync('components')
  .filter((n) => n.endsWith('.tsx'))
  .map((n) => join('components', n));

const bestanden = [];
(function loop(map) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) loop(pad);
    else if (naam.endsWith('.css')) bestanden.push(pad);
  }
})('out');
const css = bestanden.map((f) => readFileSync(f, 'utf8')).join('\n');

/** Klassen die wij zelf in globals.css schrijven, zonder Tailwind-escape. */
const eigen = new Set([
  'slider-track', 'slider-item', 'slider-arrow', 'google-blauw', 'google-rood',
  'google-geel', 'google-groen', 'ster-goud', 'container-wide', 'container-tight',
  'section-pad', 'text-display', 'text-balance', 'lead', 'bg-grid-dark', 'card-dark',
  'btn-pill', 'btn-pill-dark', 'btn-pill-white', 'btn-ghost', 'btn-ghost-invert',
  'btn-link', 'chip', 'panel', 'card', 'card-hover', 'link-underline', 'label',
  'arrow', 'group', 'sr-only',
]);

const escape = (t) => t.replace(/[.:%[\]()/!#,'"+*~^$=<>{}|\\`?&;]/g, (c) => '\\' + c);

/** Losse woorden zonder streepje of variant die toch een klasse zijn. */
const kaal = new Set([
  'flex', 'grid', 'relative', 'absolute', 'block', 'hidden', 'truncate', 'group',
  'static', 'italic', 'underline',
]);

const tokens = new Set();
for (const pad of componenten) {
  const bron = readFileSync(pad, 'utf8');
  for (const m of bron.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    for (const ruw of (m[1] ?? m[2]).split(/\s+/)) {
      const t = ruw.replace(/^[`'"{}$]+/, '').replace(/[`'"{}]+$/, '');
      if (!t || /[$=?]/.test(t) || !/[a-z0-9]/i.test(t)) continue;
      // Alleen echte klassen: met streepje, variant of arbitraire waarde.
      if (!/[-:[\]/]/.test(t) && !kaal.has(t)) continue;
      tokens.add(t);
    }
  }
}

const mist = [...tokens]
  .filter((t) => !eigen.has(t))
  .filter((t) => !css.includes('.' + escape(t)));

console.log('klassen gecontroleerd: ' + tokens.size);
if (mist.length === 0) {
  console.log('alle klassen gevonden in de CSS');
} else {
  console.log('niet gevonden (' + mist.length + '):');
  for (const t of mist) console.log('  ' + t);
}
process.exit(mist.length === 0 ? 0 : 1);
