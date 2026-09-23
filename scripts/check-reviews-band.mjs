/**
 * Controleert de lopende band met beoordelingen:
 *  - hij schuift vanzelf op;
 *  - hij stopt NIET als de muis eroverheen gaat;
 *  - hij loopt door voorbij het eind in plaats van stil te vallen.
 *
 * Gebruik: node scripts/check-reviews-band.mjs <basisurl>
 * Sluit af met code 1 zodra een van de drie niet klopt.
 */
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:3000/lkdakwerken/').replace(/\/$/, '');
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const wacht = (ms) => new Promise((r) => setTimeout(r, ms));
let fouten = 0;
const eis = (naam, goed, wat) => {
  console.log(`${goed ? 'OK  ' : 'FOUT'} ${naam}  ${wat}`);
  if (!goed) fouten++;
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 950 });
await page.goto(`${BASIS}/`, { waitUntil: 'networkidle0', timeout: 60000 });

/* De band staat pas in beeld na scrollen; daarvoor draait de animatie wel,
   maar we willen meten wat de bezoeker ziet. */
const vak = await page.evaluateHandle(() =>
  [...document.querySelectorAll('section')].find((s) => /Dit zeggen onze klanten/i.test(s.textContent))
);
await vak.asElement().scrollIntoView();
await wacht(1200);

const positie = () =>
  page.evaluate(() => {
    const sec = [...document.querySelectorAll('section')].find((s) =>
      /Dit zeggen onze klanten/i.test(s.textContent)
    );
    return sec.querySelector('.slider-track').scrollLeft;
  });

/* De lus is alleen naadloos als elke beoordeling twee keer in de band staat:
   halverwege springen we een helft terug naar een identiek beeld. */
const dubbel = await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find((s) =>
    /Dit zeggen onze klanten/i.test(s.textContent)
  );
  const kaarten = [...sec.querySelectorAll('.slider-item')];
  const namen = kaarten.map((k) => k.querySelector('.font-semibold')?.textContent ?? '');
  const uniek = new Set(namen);
  return { totaal: kaarten.length, uniek: uniek.size };
});
eis(
  'elke beoordeling staat twee keer in de band',
  dubbel.totaal === dubbel.uniek * 2,
  `${dubbel.totaal} kaarten, ${dubbel.uniek} uniek`
);

// 1. Loopt hij uit zichzelf?
const a = await positie();
await wacht(1500);
const b = await positie();
eis('band schuift vanzelf op', b > a, `van ${Math.round(a)} naar ${Math.round(b)}`);

// 2. Blijft hij lopen onder de muis?
const doos = await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find((s) =>
    /Dit zeggen onze klanten/i.test(s.textContent)
  );
  const r = sec.querySelector('.slider-track').getBoundingClientRect();
  return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
});
await page.mouse.move(doos.x, doos.y);
await wacht(300);
const c = await positie();
await wacht(1500);
const d = await positie();
eis('band loopt door met muis erboven', d !== c, `van ${Math.round(c)} naar ${Math.round(d)}`);
await page.mouse.move(0, 0);

// 3. Valt hij niet stil aan het eind? Sprong naar vlak voor de naad en kijken
//    of hij daarna nog beweegt in plaats van tegen de rand te blijven staan.
await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find((s) =>
    /Dit zeggen onze klanten/i.test(s.textContent)
  );
  const t = sec.querySelector('.slider-track');
  t.scrollLeft = t.scrollWidth - t.clientWidth - 4;
});
await wacht(1600);
const e = await positie();
await wacht(1200);
const f = await positie();
const maximum = await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find((s) =>
    /Dit zeggen onze klanten/i.test(s.textContent)
  );
  const t = sec.querySelector('.slider-track');
  return t.scrollWidth - t.clientWidth;
});
eis(
  'band blijft niet aan het eind hangen',
  e < maximum - 8 || f !== e,
  `positie ${Math.round(e)} -> ${Math.round(f)} van max ${Math.round(maximum)}`
);

console.log(`\nfouten: ${fouten}`);
await browser.close();
process.exit(fouten ? 1 : 0);
