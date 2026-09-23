/**
 * Prijsmodel voor de indicatie in het offerteformulier.
 *
 * De bedragen zijn richtprijzen inclusief btw, materiaal en arbeid, en sluiten
 * aan op de prijs die ook in de FAQ staat (bitumen 75 tot 110 euro per m²).
 * Alles staat bewust in dit ene bestand, zodat de tarieven aangepast kunnen
 * worden zonder de formuliercode aan te raken.
 *
 * Twee soorten diensten:
 * - 'oppervlakte': prijs per m², met een minimumbedrag voor de opstartkosten
 *   (steiger, aan- en afvoer, opstarten van de ploeg) die ook bij een klein
 *   dak gemaakt worden.
 * - 'vast': een bandbreedte per opdracht, omdat oppervlakte daar weinig zegt.
 */

export type DienstSlug =
  | 'bitumen-daken'
  | 'renovatie'
  | 'nieuwbouw'
  | 'onderhoud'
  | 'lekkage';

type Tarief =
  | {
      soort: 'oppervlakte';
      /** Ondergrens en bovengrens per m², inclusief btw. */
      perM2: [number, number];
      /** Ondergrens van een opdracht, ongeacht hoe klein het dak is. */
      minimum: number;
      eenheid: string;
      toelichting: string;
    }
  | {
      soort: 'vast';
      bedrag: [number, number];
      eenheid: string;
      toelichting: string;
    };

export const tarieven: Record<DienstSlug, Tarief> = {
  'bitumen-daken': {
    soort: 'oppervlakte',
    perM2: [75, 110],
    minimum: 950,
    eenheid: 'per m²',
    toelichting: 'Inclusief materiaal, arbeid en afvoer van het oude materiaal.',
  },
  renovatie: {
    soort: 'oppervlakte',
    perM2: [110, 165],
    minimum: 1450,
    eenheid: 'per m²',
    toelichting: 'Inclusief demontage van de oude bedekking en een nieuw daksysteem.',
  },
  nieuwbouw: {
    soort: 'oppervlakte',
    perM2: [90, 140],
    minimum: 1200,
    eenheid: 'per m²',
    toelichting: 'Compleet daksysteem op een nieuwe constructie, exclusief dakramen.',
  },
  onderhoud: {
    soort: 'oppervlakte',
    perM2: [4, 8],
    minimum: 195,
    eenheid: 'per m² per jaar',
    toelichting: 'Jaarcontract met inspectie, reiniging van goten en kleine herstellingen.',
  },
  lekkage: {
    soort: 'vast',
    bedrag: [165, 650],
    eenheid: 'per bezoek',
    toelichting: 'Voorrijden en het eerste uur, plus materiaal voor de noodreparatie.',
  },
};

/** Toeslagen die de klant zelf aanvinkt. Alleen zinvol bij een m²-dienst. */
export const opties = [
  {
    id: 'isolatie',
    label: 'Isolatie meenemen',
    hint: 'Nieuwe isolatieplaten onder de dakbedekking.',
    /** Opslag per m², onder- en bovengrens. */
    perM2: [28, 45] as [number, number],
  },
  {
    id: 'verwijderen',
    label: 'Oude dakbedekking verwijderen',
    hint: 'Sloop, containerhuur en gecertificeerde afvoer.',
    perM2: [12, 22] as [number, number],
  },
] as const;

export type OptieId = (typeof opties)[number]['id'];

export type Indicatie = {
  /** Ondergrens en bovengrens van het totaalbedrag, afgerond op 50 euro. */
  van: number;
  tot: number;
  eenheid: string;
  toelichting: string;
  /** Slotzin onder het paneel, passend bij het soort dienst. */
  voorbehoud: string;
  /** True wanneer het minimumbedrag de berekening heeft opgetrokken. */
  minimumGehaald: boolean;
  /** Regels voor de opbouw, klaar om te tonen. */
  regels: { label: string; waarde: string }[];
};

/** Afronden op vijftigtallen, zodat de indicatie niet suggereert dat het een offerte is. */
function rondAf(bedrag: number) {
  return Math.round(bedrag / 50) * 50;
}

export function formatEuro(bedrag: number) {
  return `€ ${bedrag.toLocaleString('nl-NL')}`;
}

/**
 * Leest een oppervlakte uit vrije invoer. De klant typt van alles:
 * '120', '120 m2', '120m²', '1.200', '85,5'. Geeft null bij onbruikbare invoer.
 */
export function leesOppervlakte(invoer: string): number | null {
  const schoon = invoer.replace(/m²|m2/gi, '').trim();
  if (!schoon) return null;
  // Punten zijn duizendtallen, komma is de decimaal: 1.200,5 wordt 1200.5
  const genormaliseerd = schoon.replace(/\./g, '').replace(',', '.');
  const getal = Number.parseFloat(genormaliseerd);
  if (!Number.isFinite(getal) || getal <= 0) return null;
  // Boven de 5000 m² is het geen particuliere klus meer en klopt het model niet.
  if (getal > 5000) return null;
  return getal;
}

/**
 * Berekent de indicatie. Geeft null zodra er te weinig bekend is, zodat het
 * formulier dan simpelweg niets toont in plaats van een slag in de lucht.
 */
export function berekenIndicatie(
  dienst: string,
  oppervlakteInvoer: string,
  gekozenOpties: OptieId[] = []
): Indicatie | null {
  const tarief = tarieven[dienst as DienstSlug];
  if (!tarief) return null;

  if (tarief.soort === 'vast') {
    return {
      van: tarief.bedrag[0],
      tot: tarief.bedrag[1],
      eenheid: tarief.eenheid,
      toelichting: tarief.toelichting,
      voorbehoud:
        'Een richtprijs inclusief btw. Wat het herstel precies kost, ziet onze dakdekker pas ter plaatse.',
      minimumGehaald: false,
      regels: [
        { label: 'Voorrijden en eerste uur', waarde: formatEuro(tarief.bedrag[0]) },
        { label: 'Uitloop bij een groter herstel', waarde: `tot ${formatEuro(tarief.bedrag[1])}` },
      ],
    };
  }

  const m2 = leesOppervlakte(oppervlakteInvoer);
  if (m2 === null) return null;

  const regels: { label: string; waarde: string }[] = [
    {
      label: `Dakwerk, ${m2.toLocaleString('nl-NL')} m²`,
      waarde: `${formatEuro(tarief.perM2[0])} tot ${formatEuro(tarief.perM2[1])} ${tarief.eenheid}`,
    },
  ];

  let laag = m2 * tarief.perM2[0];
  let hoog = m2 * tarief.perM2[1];

  // Toeslagen tellen alleen mee bij werk dat per m² wordt gerekend.
  for (const optie of opties) {
    if (!gekozenOpties.includes(optie.id)) continue;
    laag += m2 * optie.perM2[0];
    hoog += m2 * optie.perM2[1];
    regels.push({
      label: optie.label,
      waarde: `+ ${formatEuro(optie.perM2[0])} tot ${formatEuro(optie.perM2[1])} per m²`,
    });
  }

  const minimumGehaald = laag < tarief.minimum;
  if (minimumGehaald) {
    // Het minimum trekt de ondergrens op; de bovengrens schuift mee zodat de
    // bandbreedte niet omklapt bij een heel klein dak.
    hoog = Math.max(hoog, tarief.minimum * 1.35);
    laag = tarief.minimum;
    regels.push({
      label: 'Minimum per opdracht',
      waarde: formatEuro(tarief.minimum),
    });
  }

  return {
    van: rondAf(laag),
    tot: rondAf(hoog),
    eenheid: tarief.eenheid === 'per m² per jaar' ? 'per jaar' : '',
    toelichting: tarief.toelichting,
    voorbehoud:
      'Een richtprijs inclusief btw, gebaseerd op vergelijkbare daken. De definitieve prijs volgt na de gratis inspectie op locatie.',
    minimumGehaald,
    regels,
  };
}
