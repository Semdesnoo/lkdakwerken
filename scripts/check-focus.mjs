/**
 * Controleert de focusring: elk bedienbaar element krijgt bij toetsenbord-
 * focus een omtrek die tegen zijn eigen achtergrond minstens 3:1 haalt.
 * Dat is de grens die WCAG stelt aan niet-tekstuele onderdelen, en juist op
 * de donkere secties gaat dat snel mis.
 *
 * Gebruik: node scripts/check-focus.mjs <basisurl>
 * Sluit af met code 1 zodra een ring te weinig contrast heeft.
 */
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:3001/lkdakwerken/').replace(/\/$/, '');
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ROUTES = ['', 'diensten', 'projecten', 'over', 'locaties', 'blog', 'contact', 'offerte'];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });

const meet = () => {
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
  const verhouding = (a, b) => {
    const [h, l] = [licht(a), licht(b)].sort((x, y) => y - x);
    return (h + 0.05) / (l + 0.05);
  };
  const achtergrond = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return null;
      const k = ontleed(cs.backgroundColor);
      if (k && k.a === 1) return k;
      if (k && k.a > 0) return null;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const fouten = [];
  const gezien = new Set();
  for (const el of document.querySelectorAll('a, button, input, select, textarea, summary')) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    /* De ring ligt door outline-offset buiten het element zelf, dus hij
       steekt af tegen de achtergrond van de ouder, niet tegen de knopkleur. */
    const achter = el.parentElement ? achtergrond(el.parentElement) : null;
    if (!achter) continue;

    el.focus({ preventScroll: true });
    /* :focus-visible matcht alleen wanneer de browser in toetsenbordmodus
       staat; die is hierboven aangezet met een echte Tab-aanslag. */
    if (!el.matches(':focus-visible')) {
      el.blur();
      continue;
    }
    const cs = getComputedStyle(el);
    const ring = ontleed(cs.outlineColor);
    el.blur();

    const ratio = verhouding(ring, achter);
    if (ratio < 2.99) {
      const sleutel = `${cs.outlineColor}|${achter.r},${achter.g},${achter.b}`;
      if (gezien.has(sleutel)) continue;
      gezien.add(sleutel);
      fouten.push({
        ratio: Math.round(ratio * 100) / 100,
        ring: cs.outlineColor,
        op: `rgb(${achter.r},${achter.g},${achter.b})`,
        el: `${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 30)}"`,
      });
    }
  }
  return fouten;
};

let totaal = 0;
for (const route of ROUTES) {
  await page.goto(`${BASIS}/${route}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  /* Eén echte Tab zet de browser in toetsenbordmodus; pas daarna matcht
     :focus-visible ook bij focus() vanuit script. */
  await page.keyboard.press('Tab');
  const fouten = await page.evaluate(meet);
  if (fouten.length) {
    console.log(`\n/${route}`);
    for (const f of fouten) console.log(`  ${f.ratio}:1  ${f.ring} op ${f.op}  ${f.el}`);
  }
  totaal += fouten.length;
}

console.log(`\nfocusringen met te weinig contrast: ${totaal}`);
await browser.close();
process.exit(totaal ? 1 : 0);
