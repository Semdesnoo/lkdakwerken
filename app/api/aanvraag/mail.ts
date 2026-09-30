import { bedrijf } from '@/lib/data';

/* E-mailopmaak. Tabellen en inline-stijlen omdat Outlook en Gmail geen
   stylesheets of flexbox begrijpen; afbeeldingen via absolute URL. */

const SITE = 'https://www.lkdakwerken.nl';
const BLAUW = '#2563eb';
const INKT = '#0a0a0a';
const GRIJS = '#6b7280';
const PAPIER = '#f4f4f5';
const LETTER = "font-family:Inter,'Segoe UI',Helvetica,Arial,sans-serif";
const TEL = 'tel:+31680110879';

export function html(tekst: string) {
  return tekst
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

export function gegevensTabel(rijen: [string, string][]) {
  const regels = rijen
    .map(
      ([label, waarde], i) => `<tr>
  <td style="${LETTER};font-size:14px;color:${GRIJS};padding:12px 16px;vertical-align:top;width:38%;${i ? `border-top:1px solid #e5e7eb;` : ''}">${html(label)}</td>
  <td style="${LETTER};font-size:14px;color:${INKT};padding:12px 16px;vertical-align:top;${i ? `border-top:1px solid #e5e7eb;` : ''}">${html(waarde)}</td>
</tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:${PAPIER};border-radius:12px;">${regels}</table>`;
}

function knop(href: string, tekst: string, donker = false) {
  const bg = donker ? INKT : BLAUW;
  return `<a href="${href}" style="${LETTER};display:inline-block;background:${bg};color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:12px;">${tekst}</a>`;
}

/** Omlijsting met logo, inhoud en footer met bedrijfsgegevens. */
function omlijsting(voorvertoning: string, inhoud: string) {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${bedrijf.naam}</title>
</head>
<body style="margin:0;padding:0;background:${PAPIER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${html(voorvertoning)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPIER};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:0;line-height:0;font-size:0;">
      <!-- Logo en zwarte balk zitten samen in één afbeelding: Gmail en Outlook in
           donkere modus kleuren achtergronden om, maar laten afbeeldingen met rust.
           Een los wit logo op een CSS-achtergrond verdween daardoor tegen wit. -->
      <a href="${SITE}"><img src="${SITE}/mail/header.png" width="600" alt="${bedrijf.naam}" style="display:block;border:0;width:100%;max-width:600px;height:auto;"></a>
    </td></tr>
    <tr><td style="background:#ffffff;padding:40px 32px;border-radius:0 0 16px 16px;">
      ${inhoud}
    </td></tr>
    <tr><td style="padding:28px 32px;text-align:center;${LETTER};font-size:13px;line-height:1.7;color:${GRIJS};">
      <strong style="color:${INKT};">${bedrijf.naam}</strong><br>
      ${html(bedrijf.adres)}<br>
      <a href="${TEL}" style="color:${GRIJS};text-decoration:none;">${bedrijf.telefoon}</a> &nbsp;·&nbsp;
      <a href="mailto:${bedrijf.email}" style="color:${GRIJS};text-decoration:none;">${bedrijf.email}</a><br>
      <a href="${SITE}" style="color:${BLAUW};text-decoration:none;">www.lkdakwerken.nl</a> &nbsp;·&nbsp; KvK ${bedrijf.kvk}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

const P = `${LETTER};font-size:16px;line-height:1.65;color:#374151;margin:0 0 16px;`;
const H1 = `${LETTER};font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:${INKT};margin:0 0 20px;`;
const H2 = `${LETTER};font-size:17px;font-weight:700;color:${INKT};margin:32px 0 12px;`;

function stap(nr: number, titel: string, tekst: string) {
  return `<tr>
  <td style="width:40px;vertical-align:top;padding:0 0 18px;">
    <div style="${LETTER};width:28px;height:28px;line-height:28px;border-radius:14px;background:${BLAUW};color:#ffffff;font-size:14px;font-weight:700;text-align:center;">${nr}</div>
  </td>
  <td style="vertical-align:top;padding:3px 0 18px;${LETTER};font-size:15px;line-height:1.55;color:#374151;">
    <strong style="color:${INKT};">${titel}</strong><br>${tekst}
  </td>
</tr>`;
}

/** Bevestiging naar de klant. */
export function klantMail(opts: {
  soort: 'offerte' | 'contact';
  naam: string;
  aanvraagnummer?: string;
  rijen: [string, string][];
}) {
  const offerte = opts.soort === 'offerte';
  const titel = offerte ? 'Bedankt voor uw offerteaanvraag' : 'Bedankt voor uw bericht';

  const intro = offerte
    ? `<p style="${P}">Hartelijk dank voor het aanvragen van een offerte bij ${bedrijf.naam}. We hebben uw aanvraag in goede orde ontvangen.</p>
<p style="${P}">We nemen zo snel mogelijk contact met u op om een afspraak te maken. Een van onze dakdekkers komt dan bij u langs om het dak te bekijken, zodat u een offerte krijgt die precies past bij uw situatie.</p>`
    : `<p style="${P}">Hartelijk dank voor uw bericht aan ${bedrijf.naam}. We hebben het in goede orde ontvangen en nemen zo snel mogelijk contact met u op.</p>`;

  const stappen = offerte
    ? `<h2 style="${H2}">Hoe gaat het verder?</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${stap(1, 'We bellen u', 'Meestal binnen één werkdag, om een moment af te spreken dat u uitkomt.')}
${stap(2, 'We komen langs', 'Een dakdekker bekijkt het dak ter plaatse. Vrijblijvend en kosteloos.')}
${stap(3, 'U ontvangt de offerte', 'Helder en compleet, zonder verrassingen achteraf.')}
</table>`
    : '';

  const nummer = offerte && opts.aanvraagnummer
    ? `<p style="${LETTER};font-size:14px;color:${GRIJS};margin:0 0 24px;">Uw aanvraagnummer: <strong style="color:${INKT};">${html(opts.aanvraagnummer)}</strong></p>`
    : '';

  const inhoud = `
<h1 style="${H1}">${titel}, ${html(opts.naam)}.</h1>
${nummer}
${intro}
${stappen}
<h2 style="${H2}">Uw gegevens</h2>
${gegevensTabel(opts.rijen)}
<p style="${LETTER};font-size:13px;color:${GRIJS};margin:10px 0 0;">Klopt er iets niet? Beantwoord deze e-mail, dan passen we het aan.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;background:#eff6ff;border-radius:12px;">
<tr><td style="padding:20px 22px;">
  <p style="${LETTER};font-size:15px;line-height:1.55;color:${INKT};margin:0 0 14px;"><strong>Lekt het nu?</strong> Wacht dan niet op ons telefoontje en bel direct. We zijn 7 dagen per week bereikbaar voor spoed.</p>
  ${knop(TEL, `Bel ${bedrijf.telefoon}`)}
</td></tr>
</table>

<p style="${P};margin-top:32px;margin-bottom:0;">Met vriendelijke groet,</p>
<p style="${P};margin-bottom:0;"><strong style="color:${INKT};">Luuk Kanters</strong><br>${bedrijf.naam}</p>`;

  return omlijsting(
    offerte
      ? 'We hebben uw offerteaanvraag ontvangen en nemen snel contact op om langs te komen.'
      : 'We hebben uw bericht ontvangen en nemen snel contact met u op.',
    inhoud,
  );
}

/** Melding naar LK zelf. */
export function interneMail(opts: {
  soort: 'offerte' | 'contact';
  naam: string;
  email: string;
  telefoon?: string;
  rijen: [string, string][];
}) {
  const telLink = opts.telefoon ? `tel:${opts.telefoon.replace(/[^\d+]/g, '')}` : '';
  const inhoud = `
<p style="${LETTER};font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${BLAUW};margin:0 0 8px;">Via de website</p>
<h1 style="${H1}">${opts.soort === 'offerte' ? 'Nieuwe offerteaanvraag' : 'Nieuw contactbericht'} van ${html(opts.naam)}</h1>
${gegevensTabel(opts.rijen)}
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>
  ${telLink ? `<td style="padding-right:10px;">${knop(telLink, 'Bel klant')}</td>` : ''}
  <td>${knop(`mailto:${opts.email}`, 'Mail klant', true)}</td>
</tr></table>
<p style="${LETTER};font-size:13px;color:${GRIJS};margin:20px 0 0;">Tip: op "Beantwoorden" klikken gaat direct naar de klant.</p>`;
  return omlijsting(`Nieuwe aanvraag van ${opts.naam}`, inhoud);
}
