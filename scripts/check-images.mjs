/**
 * Controleert de beelden van de site:
 *
 *  1. elk project in lib/data.ts heeft beide lokale fotobestanden in
 *     public/projecten/ (kaart- en grote variant), met inhoud;
 *  2. er liggen geen weesbestanden in public/projecten/ die nergens
 *     bij horen;
 *  3. de Unsplash-sfeerfoto's die de site nog gebruikt, geven een 200.
 *
 * Draai met: node scripts/check-images.mjs
 * Exit-code 1 zodra er iets niet klopt.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const wortel = process.cwd();
const fotoMap = path.join(wortel, 'public', 'projecten');

let fouten = 0;

function fout(regel) {
  console.log('FOUT  ' + regel);
  fouten += 1;
}

/* ---------- 1 + 2: lokale projectfoto's ---------- */

const data = await readFile(path.join(wortel, 'lib', 'data.ts'), 'utf8');

const blok = data.match(/export const projecten(?:: Project\[\])? = \[([\s\S]*?)\n\];/);
if (!blok) {
  fout('kan de projecten-array niet vinden in lib/data.ts');
  process.exit(1);
}

const ids = [...blok[1].matchAll(/image:\s*"([^"]+)"/g)].map((m) => m[1]);

/* Projecten kunnen meerdere opnamen van hetzelfde dak hebben; die staan in
   extraFotos en horen er net zo goed bij. */
const extra = [...blok[1].matchAll(/extraFotos:\s*\[([^\]]*)\]/g)].flatMap((m) =>
  [...m[1].matchAll(/"([^"]+)"/g)].map((t) => t[1]),
);

const alleIds = [...ids, ...extra];
console.log(`projecten in data.ts: ${ids.length} (plus ${extra.length} extra foto's)`);

if (ids.length === 0) fout('geen projecten gevonden');

const verwacht = new Set();

for (const id of alleIds) {
  for (const bestand of [`${id}.webp`, `${id}-kaart.webp`]) {
    verwacht.add(bestand);
    try {
      const info = await stat(path.join(fotoMap, bestand));
      if (info.size < 1024) fout(`${bestand} is verdacht klein (${info.size} bytes)`);
    } catch {
      fout(`ontbreekt: public/projecten/${bestand}`);
    }
  }
}

const aanwezig = (await readdir(fotoMap)).filter((n) => n.endsWith('.webp'));
for (const bestand of aanwezig) {
  if (!verwacht.has(bestand)) fout(`weesbestand: public/projecten/${bestand}`);
}

console.log(`fotobestanden: ${aanwezig.length} aanwezig, ${verwacht.size} verwacht`);

/* ---------- 3: Unsplash-sfeerfoto's ---------- */

const sfeer = [...data.matchAll(/"(photo-[0-9a-zA-Z-]+)"/g)].map((m) => m[1]);
const uniek = [...new Set(sfeer)];

for (const id of uniek) {
  const url = 'https://images.unsplash.com/' + id + '?w=900&q=80&auto=format&fit=crop';
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.status !== 200) fout(`Unsplash ${res.status}  ${id}`);
  } catch (err) {
    fout(`Unsplash ERR ${id}  ${err.message}`);
  }
}

console.log(`Unsplash-sfeerfoto's gecontroleerd: ${uniek.length}`);
console.log('fouten: ' + fouten);
process.exit(fouten === 0 ? 0 : 1);
