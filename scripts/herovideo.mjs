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
 * De video's draaien als achtergrond achter de hero-tekst, dus beeldruis
 * telt zwaarder dan scherpte: liever een compact bestand dat direct start.
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
    bestand: 'Hero video laptop.mp4',
    naam: 'hero-desktop',
    // Full hd is voor een achtergrondvideo zonde van de bandbreedte.
    breedte: 1280,
  },
  {
    bestand: 'Hero video telefoon.mp4',
    naam: 'hero-mobiel',
    breedte: 720,
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
    const schaal = `scale=${v.breedte}:-2`;

    const mp4 = path.join(doel, `${v.naam}.mp4`);
    await ffmpeg([
      '-i', invoer,
      '-an',                      // geen geluid: de video speelt automatisch af
      '-vf', schaal,
      '-c:v', 'libx264',
      '-profile:v', 'main',
      '-crf', '30',
      '-preset', 'slow',
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
      '-q:v', '5',
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
