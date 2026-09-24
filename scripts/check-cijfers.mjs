/**
 * Controleert de kerncijfers: ze horen van nul naar hun eindwaarde te lopen
 * zodra ze in beeld komen, en daarna op die eindwaarde te blijven staan.
 * Dit is de check op de bug waarbij overal 0 bleef staan.
 *
 * Gebruik: node scripts/check-cijfers.mjs <basisurl>
 * Sluit af met code 1 zodra een cijfer op nul blijft hangen.
 */
import puppeteer from 'puppeteer-core';

const BASIS = (process.argv[2] ?? 'http://localhost:3000/lkdakwerken/').replace(/\/$/, '');
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ROUTES = ['', 'over', 'projecten'];
const wacht = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 950 });

let fouten = 0;
for (const route of ROUTES) {
  await page.goto(route ? `${BASIS}/${route}/` : `${BASIS}/`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  const aantal = await page.evaluate(() => document.querySelectorAll('[data-count-to]').length);
  if (aantal === 0) {
    // Elke route in deze lijst hoort cijfers te hebben. Nul betekent dat de
    // sectie is verdwenen of dat de URL niet klopt — geen reden om te zwijgen.
    console.log(`\n/${route}\n  FOUT geen cijfers gevonden op deze pagina`);
    fouten++;
    continue;
  }

  // Alles in beeld brengen zodat de waarnemer aanslaat.
  await page.evaluate(async () => {
    for (const el of document.querySelectorAll('[data-count-to]')) {
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  // De animatie duurt 1400ms; ruim wachten zodat we de eindstand meten.
  await wacht(2200);

  const cijfers = await page.evaluate(() =>
    [...document.querySelectorAll('[data-count-to]')].map((el) => {
      const blok = el.closest('.reveal-on-scroll') ?? el;
      return {
        doel: Number(el.dataset.countTo),
        decimalen: Number(el.dataset.countDecimals ?? 0),
        getoond: el.textContent.trim(),
        // reveal-on-scroll begint op opacity 0: blijft die staan, dan is het
        // cijfer onzichtbaar ook al klopt de tekst.
        zichtbaar: Number(getComputedStyle(blok).opacity) > 0.9,
        label: el.closest('div')?.querySelector('dt, .text-sm')?.textContent?.trim() ?? '',
      };
    })
  );

  console.log(`\n/${route}`);
  for (const c of cijfers) {
    const verwacht = c.doel.toLocaleString('nl-NL', {
      minimumFractionDigits: c.decimalen,
      maximumFractionDigits: c.decimalen,
    });
    const goed = c.getoond === verwacht && c.zichtbaar;
    if (!goed) fouten++;
    const reden = c.getoond !== verwacht ? `verwacht ${verwacht}` : 'onzichtbaar (opacity 0)';
    console.log(
      `  ${goed ? 'OK  ' : 'FOUT'} ${c.getoond.padEnd(8)} ${goed ? '' : reden}  ${c.label}`
    );
  }
}

console.log(`\ncijfers die niet oplopen: ${fouten}`);
await browser.close();
process.exit(fouten ? 1 : 0);
