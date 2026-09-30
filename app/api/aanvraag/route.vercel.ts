import { bedrijf } from '@/lib/data';
import { interneMail, klantMail } from './mail';

/* Alleen op Vercel gebouwd (zie pageExtensions in next.config.mjs): GitHub
   Pages kan geen servercode draaien, daar faalt de fetch en toont het
   formulier de bel/mail-uitwijk. */

// Alleen velden die we kennen komen in de mail; al het andere negeren we.
const VELDEN = {
  offerte: {
    aanvraagnummer: 'Aanvraagnummer',
    dienst: 'Dienst',
    oppervlakte: 'Oppervlakte (m²)',
    opties: 'Extra opties',
    indicatie: 'Prijsindicatie',
    naam: 'Naam',
    email: 'E-mail',
    telefoon: 'Telefoon',
    straat: 'Adres',
    postcode: 'Postcode',
    plaats: 'Plaats',
    opmerkingen: 'Omschrijving',
    fotos: "Foto's",
  },
  contact: {
    onderwerp: 'Onderwerp',
    naam: 'Naam',
    email: 'E-mail',
    telefoon: 'Telefoon',
    bericht: 'Bericht',
  },
} as const;

type Soort = keyof typeof VELDEN;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const AFZENDER = `${bedrijf.naam} <${bedrijf.email}>`;
// Eigen afzender voor meldingen aan LK: van info@ naar info@ toont Gmail als
// "me" en sorteert het tussen verzonden mail, zodat aanvragen wegvallen.
const WEBSITE_AFZENDER = `${bedrijf.naam} website <website@lkdakwerken.nl>`;

async function verstuur(mail: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mail),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY ontbreekt');
    return Response.json({ ok: false }, { status: 500 });
  }

  let body: { soort?: string; velden?: Record<string, unknown>; website?: string; fotos?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: mensen zien dit veld niet, bots vullen het in. Doe alsof het lukt.
  if (body.website) return Response.json({ ok: true });

  const soort = body.soort as Soort;
  if (!(soort in VELDEN)) return Response.json({ ok: false }, { status: 400 });

  const labels: Record<string, string> = VELDEN[soort];
  const waarden: Record<string, string> = {};
  for (const sleutel of Object.keys(labels)) {
    const v = body.velden?.[sleutel];
    if (typeof v === 'string' && v.trim()) waarden[sleutel] = v.trim().slice(0, 5000);
  }

  const naam = (waarden.naam ?? '').replace(/[\r\n]/g, ' ').slice(0, 100);
  const email = waarden.email ?? '';
  if (!naam || !EMAIL.test(email)) return Response.json({ ok: false }, { status: 400 });

  // Adres, postcode en plaats als één blok: Gmail maakt van een adres over losse
  // tabelrijen één link en schuift daarbij de cellen uit de kolommen.
  if (waarden.straat) {
    waarden.straat = [waarden.straat, [waarden.postcode, waarden.plaats].filter(Boolean).join(' ')]
      .filter(Boolean)
      .join('\n');
    delete waarden.postcode;
    delete waarden.plaats;
  }

  // Foto's alleen bij offertes, maximaal 3, en alleen echte JPEG's (de browser
  // verkleint ze naar JPEG) van redelijk formaat.
  const fotos =
    soort === 'offerte' && Array.isArray(body.fotos)
      ? body.fotos
          .filter((f): f is string => typeof f === 'string' && f.startsWith('/9j/') && f.length < 2_000_000)
          .slice(0, 3)
      : [];
  delete waarden.fotos; // alleen wij vullen deze rij, nooit de bezoeker
  if (fotos.length) waarden.fotos = `${fotos.length} bijgevoegd`;

  const rijen = Object.entries(waarden).map(([k, v]) => [labels[k], v] as [string, string]);
  // De klant ziet zijn eigen invoer terug, zonder ons interne nummer en de prijsindicatie.
  const klantRijen = rijen.filter(([l]) => l !== 'Aanvraagnummer' && l !== 'Prijsindicatie');

  const onderwerp =
    soort === 'offerte'
      ? `Offerteaanvraag ${waarden.aanvraagnummer ?? ''} – ${waarden.dienst ?? ''} – ${naam}`
      : `Contactformulier – ${waarden.onderwerp ?? 'Bericht'} – ${naam}`;

  try {
    // Eerst de mail naar LK zelf: mislukt die, dan is de aanvraag kwijt en moet de klant het weten.
    await verstuur({
      from: WEBSITE_AFZENDER,
      to: [bedrijf.email],
      reply_to: email,
      subject: onderwerp,
      html: interneMail({ soort, naam, email, telefoon: waarden.telefoon, rijen }),
      attachments: fotos.map((content, i) => ({ filename: `foto-${i + 1}.jpg`, content })),
    });
  } catch (fout) {
    console.error(fout);
    return Response.json({ ok: false }, { status: 502 });
  }

  try {
    await verstuur({
      from: AFZENDER,
      to: [email],
      reply_to: bedrijf.email,
      subject:
        soort === 'offerte'
          ? `We hebben uw offerteaanvraag ontvangen (${waarden.aanvraagnummer ?? ''})`
          : 'We hebben uw bericht ontvangen',
      html: klantMail({ soort, naam, aanvraagnummer: waarden.aanvraagnummer, rijen: klantRijen }),
    });
  } catch (fout) {
    // De aanvraag is binnen; een mislukte bevestiging mag de klant niet laten denken dat het fout ging.
    console.error(fout);
  }

  return Response.json({ ok: true });
}
