/**
 * Maakt de favicon-set uit het aangeleverde logo.
 *
 * Het logo is deels zwart en deels blauw, met een doorzichtige achtergrond.
 * Op een donkere tabbladbalk zou de zwarte helft wegvallen, dus alle iconen
 * krijgen een witte achtergrond. Dat is ook wat iOS verwacht: doorzichtige
 * app-iconen worden daar zwart ingevuld.
 *
 * Uitvoer in public/:
 *   favicon.ico          16, 32 en 48 px in één bestand, voor de tab
 *   favicon-96.png       scherpere variant voor moderne browsers
 *   icon-192.png         Android, snelkoppeling op het beginscherm
 *   icon-512.png         Android, splash-scherm
 *   apple-touch-icon.png 180 px, iOS
 *
 *   node scripts/favicons.mjs [bronbestand]
 */
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const bron =
  process.argv[2] ?? 'C:/Users/Gebruiker/AppData/Local/hermes/attachments/Favicon.png';
const doel = path.join(process.cwd(), 'public');

const WIT = { r: 255, g: 255, b: 255, alpha: 1 };

/**
 * Snijdt de lege rand weg en plaatst het logo gecentreerd op een wit vlak,
 * met een marge van tien procent. Zonder die marge plakt het logo tegen de
 * rand van een afgeronde tegel op een telefoon.
 */
async function maakIcoon(formaat, marge = 0.1) {
  const binnen = Math.round(formaat * (1 - marge * 2));

  const logo = await sharp(bron)
    .trim()
    .resize(binnen, binnen, { fit: 'contain', background: { ...WIT, alpha: 0 } })
    .toBuffer();

  return sharp({
    create: { width: formaat, height: formaat, channels: 4, background: WIT },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();
}

async function kb(bestand) {
  return Math.round((await stat(bestand)).size / 1024);
}

async function main() {
  await mkdir(doel, { recursive: true });

  /* De .ico bundelt drie maten; Windows en oudere browsers kiezen zelf. In
     de kleinste maat is een ruime marge zonde van de pixels. */
  const icoDelen = await Promise.all([
    maakIcoon(16, 0.04),
    maakIcoon(32, 0.06),
    maakIcoon(48, 0.08),
  ]);
  const ico = await pngToIco(icoDelen);
  await writeFile(path.join(doel, 'favicon.ico'), ico);

  const maten = [
    { naam: 'favicon-96.png', formaat: 96, marge: 0.08 },
    { naam: 'icon-192.png', formaat: 192, marge: 0.1 },
    { naam: 'icon-512.png', formaat: 512, marge: 0.1 },
    // iOS snijdt de hoeken zelf af, dus daar iets meer lucht omheen.
    { naam: 'apple-touch-icon.png', formaat: 180, marge: 0.14 },
  ];

  for (const m of maten) {
    const buffer = await maakIcoon(m.formaat, m.marge);
    await writeFile(path.join(doel, m.naam), buffer);
    console.log(`${m.naam}  ${m.formaat}x${m.formaat}  ${Math.round(buffer.length / 1024)} kB`);
  }

  console.log(`favicon.ico  16+32+48  ${await kb(path.join(doel, 'favicon.ico'))} kB`);
}

main().catch((fout) => {
  console.error(fout);
  process.exit(1);
});
