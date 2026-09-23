/**
 * HEAD-controle op de Unsplash-foto's die de site gebruikt.
 * Draai met: node scripts/check-images.mjs
 * Exit-code 1 zodra een foto geen 200 teruggeeft.
 */

const ids = [
  // Projectfoto's die al in lib/data.ts stonden
  'photo-1571236673892-13d222da2019',
  'photo-1565793298595-6a879b1d9492',
  'photo-1600585154340-be6161a56a0c',
  'photo-1605276374104-dee2a0ed3cd6',
  'photo-1774900132442-e7692caaf285',
  'photo-1503594384566-461fe158e797',
  // Kandidaten voor de uitbreiding naar acht projecten
  'photo-1618333302170-d7bbc76188da',
  'photo-1605704320412-5c3255bf47a9',
  'photo-1526505917130-857817501277',
  'photo-1459679749680-18eb1eb37418',
  'photo-1583295125721-766a0088cd3f',
  'photo-1542379589-60723c4ece4e',
  'photo-1566745609223-23bce7140997',
  'photo-1704908325704-250c0a685c11',
  'photo-1465032995827-c3dce1d71c2a',
  'photo-1597224646250-fadbb825dcf8',
];

let mislukt = 0;

for (const id of ids) {
  const url = 'https://images.unsplash.com/' + id + '?w=900&q=80&auto=format&fit=crop';
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(res.status + '  ' + id);
    if (res.status !== 200) mislukt += 1;
  } catch (err) {
    console.log('ERR ' + id + '  ' + err.message);
    mislukt += 1;
  }
}

console.log('niet-200: ' + mislukt);
process.exit(mislukt === 0 ? 0 : 1);
