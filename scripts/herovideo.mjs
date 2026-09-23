/**
 * Zet de aangeleverde hero-video's om naar webbestanden in public/hero/.
 *
 * Er zijn twee bronvideo's: een liggende voor laptop en desktop, en een
 * staande voor de telefoon. Per bron leveren we:
 *
 *   hero-desktop.mp4           de video zelf, zonder geluid
 *   hero-desktop.jpg           eerste frame als poster, zodat er meteen
 *                              beeld staat terwijl de video nog laadt
 *
 * Alleen h264/mp4: elke browser die autoplay op achtergrondvideo ondersteunt
 * speelt dat af, en een vp9/webm-variant bleek bij dit materiaal juist groter.
 *
 * De video's blijven op hun eigen resolutie staan en krijgen een lage crf:
 * het dak vult het hele scherm, en op een scherp scherm zie je meteen of er
 * op de vlakken is beknibbeld. De donkere waas komt van de CSS-verlopen in
 * components/HeroVideo.tsx, niet uit de video zelf.
 *
 *   node scripts/herovideo.mjs [bronmap]
 */
import { execFile } from 'node:child_process';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const draai = promisify(execFile);

const bron = process.argv[2] ?? 'C:/Users/Gebruiker/AppData/Local/hermes/attachments';
const doel = path.join(process.cwd(), 'public', 'hero');

const VARIANTEN = [
  {
    bestand: 'Hero video laptop-2.mp4',
    naam: 'hero-desktop',
    // 1600 px blijft op een groot scherm scherp; full hd leverde een bestand
    // van elf megabyte op, en dat weegt niet op tegen het zichtbare verschil.
    breedte: 1600,
  },
  {
    bestand: 'Hero video telefoon-2.mp4',
    naam: 'hero-mobiel',
    // Ruim boven de breedte van een telefoon, zodat het beeld ook op een
    // scherm met hoge pixeldichtheid scherp blijft.
    breedte: 1000,
  },
];

async function ffmpeg(args) {
  await draai('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], {
    maxBuffer: 1024 * 1024 * 32,
  });
}

async function kb(bestand) {
  return Math.round((await stat(bestand)).size / 1024);
}

async function main() {
  await mkdir(doel, { recursive: true });

  for (const v of VARIANTEN) {
    const invoer = path.join(bron, v.bestand);
    const schaal = `scale=${v.breedte}:-2:flags=lanczos`;

    const mp4 = path.join(doel, `${v.naam}.mp4`);
    await ffmpeg([
      '-i', invoer,
      '-an',                      // geen geluid: de video speelt automatisch af
      '-vf', schaal,
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-crf', '25',
      '-preset', 'slow',
      // Grote egale vlakken (dakbedekking, lucht) vragen om fijnere korrel,
      // anders ontstaan er banden in het verloop.
      '-tune', 'film',
      '-x264-params', 'aq-mode=3:aq-strength=1.0',
      '-pix_fmt', 'yuv420p',
      // Met faststart staat de index vooraan, zodat afspelen begint voordat
      // het hele bestand binnen is.
      '-movflags', '+faststart',
      mp4,
    ]);

    const poster = path.join(doel, `${v.naam}.jpg`);
    await ffmpeg([
      '-i', invoer,
      '-vf', schaal,
      '-frames:v', '1',
      '-q:v', '3',
      poster,
    ]);

    console.log(
      `${v.bestand} -> ${v.naam}  mp4 ${await kb(mp4)} kB  |  poster ${await kb(poster)} kB`,
    );
  }
}

main().catch((fout) => {
  console.error(fout.stderr ?? fout);
  process.exit(1);
});
