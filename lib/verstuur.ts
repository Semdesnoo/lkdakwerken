/** Stuurt een formulier naar /api/aanvraag. Gooit bij elke mislukking, zodat
    het formulier nooit een bedankje toont voor een aanvraag die niet aankwam. */
export async function verstuurAanvraag(
  soort: 'offerte' | 'contact',
  velden: Record<string, string>,
  website: string,
  fotos: string[] = [],
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/aanvraag/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ soort, velden, website, fotos }),
  });
  if (!res.ok) throw new Error(`aanvraag mislukt: ${res.status}`);
}

/** Verkleint een foto in de browser tot een JPEG van hooguit 1600 px (base64,
    zonder data:-voorvoegsel). Telefoonfoto's zijn al snel 5 MB; drie daarvan
    passen niet door de 4,5 MB-limiet van een Vercel-functie. */
export async function verkleinFoto(bestand: File): Promise<string> {
  const beeld = await createImageBitmap(bestand);
  const schaal = Math.min(1, 1600 / Math.max(beeld.width, beeld.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(beeld.width * schaal);
  canvas.height = Math.round(beeld.height * schaal);
  canvas.getContext('2d')!.drawImage(beeld, 0, 0, canvas.width, canvas.height);
  beeld.close();
  return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
}
