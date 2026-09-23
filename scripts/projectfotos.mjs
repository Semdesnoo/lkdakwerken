/**
 * Zet de aangeleverde projectfoto's om naar webbestanden in public/projecten/.
 *
 * Bron: een map met jpeg's (standaard de scratch-map waar de WhatsApp-foto's
 * zijn ontdubbeld). Per foto komen er twee webp-bestanden:
 *
 *   project-01.webp     1000 px breed, voor de vergroting in de lightbox
 *   project-01-kaart.webp 640 px breed, voor de kaart in de slider
 *
 * Alle foto's zijn staand (3:4) geschoten, dus we houden die verhouding aan
 * en croppen niet: in een liggende kaart zou het dak grotendeels wegvallen.
 *
 *   node scripts/projectfotos.mjs [bronmap]
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const bron =
  process.argv[2] ?? 'C:/Users/Gebruiker/AppData/Local/hermes/cache/scratch/fotos';
const doel = path.join(process.cwd(), 'public', 'projecten');

const MATEN = [
  { achtervoegsel: '', breedte: 1000, kwaliteit: 68 },
  { achtervoegsel: '-kaart', breedte: 640, kwaliteit: 66 },
];

async function main() {
  await mkdir(doel, { recursive: true });

  const bestanden = (await readdir(bron))
    .filter((naam) => /\.(jpe?g|png)$/i.test(naam))
    .sort();

  if (bestanden.length === 0) {
    console.error(`Geen foto's gevonden in ${bron}`);
    process.exit(1);
  }

  const regels = [];

  for (const [index, naam] of bestanden.entries()) {
    const nummer = String(index + 1).padStart(2, '0');
    const regel = { bron: naam, id: `project-${nummer}`, varianten: [] };

    for (const maat of MATEN) {
      const uitNaam = `project-${nummer}${maat.achtervoegsel}.webp`;

      const info = await sharp(path.join(bron, naam))
        .rotate() // EXIF-orientatie toepassen, anders staan telefoonfoto's gekanteld
        .resize({ width: maat.breedte, withoutEnlargement: true })
        .webp({ quality: maat.kwaliteit })
        .toFile(path.join(doel, uitNaam));

      regel.varianten.push({
        bestand: uitNaam,
        breedte: info.width,
        hoogte: info.height,
        kb: Math.round(info.size / 1024),
      });
    }

    regels.push(regel);
  }

  await writeFile(
    path.join(process.cwd(), 'scripts', 'projectfotos.index.json'),
    JSON.stringify(regels, null, 2) + '\n',
    'utf8',
  );

  let totaal = 0;
  for (const r of regels) {
    const maten = r.varianten.map((v) => `${v.breedte}x${v.hoogte} ${v.kb} kB`).join('  |  ');
    totaal += r.varianten.reduce((som, v) => som + v.kb, 0);
    console.log(`${r.bron} -> ${r.id}  ${maten}`);
  }
  console.log(
    `\n${regels.length} foto's, ${regels.length * MATEN.length} bestanden, samen ${
      Math.round((totaal / 1024) * 10) / 10
    } MB`,
  );
}

main().catch((fout) => {
  console.error(fout);
  process.exit(1);
});
