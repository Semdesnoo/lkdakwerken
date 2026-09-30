/** Stuurt een formulier naar /api/aanvraag. Gooit bij elke mislukking, zodat
    het formulier nooit een bedankje toont voor een aanvraag die niet aankwam. */
export async function verstuurAanvraag(
  soort: 'offerte' | 'contact',
  velden: Record<string, string>,
  website: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/aanvraag/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ soort, velden, website }),
  });
  if (!res.ok) throw new Error(`aanvraag mislukt: ${res.status}`);
}
