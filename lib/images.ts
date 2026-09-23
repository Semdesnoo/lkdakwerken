/**
 * Bouwt een Unsplash-URL op uit een gecontroleerd foto-ID.
 * Alle ID's in lib/data.ts zijn met een HEAD-request op status 200 gecontroleerd.
 */
export function foto(id: string, breedte = 1200, kwaliteit = 80) {
  return `https://images.unsplash.com/${id}?w=${breedte}&q=${kwaliteit}&auto=format&fit=crop`;
}
