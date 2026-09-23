/**
 * Beeldhelpers.
 *
 * `foto()` bouwt een Unsplash-URL op uit een gecontroleerd foto-ID; die
 * beelden gebruiken we als sfeerbeeld op de dienst-, blog- en locatiepagina's.
 *
 * De projectfoto's zijn echte foto's van opgeleverd werk en staan lokaal in
 * public/projecten/. De site draait onder een basePath (`/lkdakwerken`), dus
 * die bestanden moeten dat voorvoegsel meekrijgen. `next.config.mjs` zet
 * NEXT_PUBLIC_BASE_PATH; lokaal zonder basePath blijft de waarde leeg.
 */
export function foto(id: string, breedte = 1200, kwaliteit = 80) {
  return `https://images.unsplash.com/${id}?w=${breedte}&q=${kwaliteit}&auto=format&fit=crop`;
}

const basis = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Projectfoto voor de kaart in de slider (640 px breed). */
export function projectKaart(id: string) {
  return `${basis}/projecten/${id}-kaart.webp`;
}

/** Projectfoto op ware grootte, voor de vergroting (1000 px breed). */
export function projectGroot(id: string) {
  return `${basis}/projecten/${id}.webp`;
}
