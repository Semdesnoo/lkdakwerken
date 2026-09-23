/**
 * Contrastcontrole over alle pagina's: berekent voor elk tekstelement de
 * verhouding tussen tekstkleur en de eerste ondoorzichtige achtergrond
 * erboven, en meldt alles onder de WCAG AA-grens (4.5 voor gewone tekst,
 * 3.0 voor tekst vanaf 24px of vanaf 19px vet).
 *
 * Tekst boven een foto of een verloop kan niet betrouwbaar gemeten worden en
 * wordt overgeslagen; die beoordelen we op de schermopnamen.
 *
 * Gebruik: node scripts/check-contrast.mjs <basisurl> [breedte]
 * Sluit af met code 1 zodra er een overtreding is.
 */
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:3001/lkdakwerken/').replace(/\/$/, '');
const BREEDTE = Number(process.argv[3] ?? 1440);
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ROUTES = [
  '',
  'diensten',
  'diensten/bitumen-daken',
  'projecten',
  'over',
  'locaties',
  'blog',
  'contact',
  'offerte',
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: BREEDTE, height: 1200 });

const meet = () => {
  /* Chrome geeft computed colors terug als oklab() zodra er een alpha-variant
     van Tailwind in het spel is. In plaats van elk kleurformaat zelf te
     ontleden laten we canvas het werk doen: die kent elk formaat en geeft
     onvermenigvuldigde rgba terug. */
  const doek = document.createElement('canvas');
  doek.width = 1;
  doek.height = 1;
  const ctx = doek.getContext('2d', { willReadFrequently: true });

  const ontleed = (kleur) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = kleur;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  };

  const kanaal = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const licht = ({ r, g, b }) => 0.2126 * kanaal(r) + 0.7152 * kanaal(g) + 0.0722 * kanaal(b);

  /* Halfdoorzichtige tekst over de achtergrond leggen, zodat white/70 als
     de kleur telt die de bezoeker werkelijk ziet. */
  const meng = (voor, achter) => ({
    r: voor.r * voor.a + achter.r * (1 - voor.a),
    g: voor.g * voor.a + achter.g * (1 - voor.a),
    b: voor.b * voor.a + achter.b * (1 - voor.a),
    a: 1,
  });

  const verhouding = (a, b) => {
    const [hoog, laag] = [licht(a), licht(b)].sort((x, y) => y - x);
    return (hoog + 0.05) / (laag + 0.05);
  };

  /* Eerste voorouder met een dekkende achtergrondkleur. Zodra we onderweg een
     foto of verloop tegenkomen is de meting onbetrouwbaar: dan null. */
  const achtergrond = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return null;
      const kleur = ontleed(cs.backgroundColor);
      if (kleur && kleur.a === 1) return kleur;
      if (kleur && kleur.a > 0) return null;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const fouten = [];
  for (const el of document.querySelectorAll('body *')) {
    const tekst = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (!tekst) continue;

    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0') continue;

    const achter = achtergrond(el);
    if (!achter) continue;
    const voor = ontleed(cs.color);
    if (!voor) continue;

    const grootte = parseFloat(cs.fontSize);
    const gewicht = parseInt(cs.fontWeight, 10) || 400;
    const groot = grootte >= 24 || (grootte >= 18.66 && gewicht >= 700);
    const grens = groot ? 3 : 4.5;
    const ratio = verhouding(meng(voor, achter), achter);

    if (ratio < grens - 0.01) {
      fouten.push({
        tekst: tekst.slice(0, 48),
        ratio: Math.round(ratio * 100) / 100,
        grens,
        kleur: cs.color,
        op: `rgb(${Math.round(achter.r)},${Math.round(achter.g)},${Math.round(achter.b)})`,
        grootte: cs.fontSize,
      });
    }
  }
  return fouten;
};

let totaal = 0;
for (const route of ROUTES) {
  await page.goto(`${BASIS}/${route}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  const fouten = await page.evaluate(meet);
  if (fouten.length) {
    console.log(`\n/${route}`);
    for (const f of fouten) {
      console.log(
        `  ${f.ratio}:1 (moet ${f.grens})  ${f.grootte.padStart(7)}  ${f.kleur} op ${f.op}  "${f.tekst}"`
      );
    }
  }
  totaal += fouten.length;
}

console.log(`\ncontrastfouten: ${totaal}`);
await browser.close();
process.exit(totaal ? 1 : 0);
