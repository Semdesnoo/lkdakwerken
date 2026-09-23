/**
 * Centrale content voor LK Dakwerken.
 * Alle foto-ID's verwijzen naar bestaande Unsplash-bestanden en worden
 * opgebouwd via de helper in lib/images.ts.
 */

// Fotopool voor locatiepagina's: daken, Nederlandse stadsbeelden en gevels.
const locatieFotos = [
  'photo-1526505917130-857817501277',
  'photo-1597224646250-fadbb825dcf8',
  'photo-1459679749680-18eb1eb37418',
  'photo-1583295125721-766a0088cd3f',
  'photo-1542379589-60723c4ece4e',
  'photo-1566745609223-23bce7140997',
  'photo-1744975748338-d226c7535d49',
  'photo-1704908325704-250c0a685c11',
  'photo-1774900132442-e7692caaf285',
  'photo-1605704320412-5c3255bf47a9',
  'photo-1618333302170-d7bbc76188da',
  'photo-1465032995827-c3dce1d71c2a',
];

const locatieLijst = [
  { naam: "Rotterdam", slug: "rotterdam", regio: "Rijnmond" },
  { naam: "Den Haag", slug: "den-haag", regio: "Haaglanden" },
  { naam: "Dordrecht", slug: "dordrecht", regio: "Zuid-Holland Zuid" },
  { naam: "Leiden", slug: "leiden", regio: "Leiden" },
  { naam: "Zoetermeer", slug: "zoetermeer", regio: "Haaglanden" },
  { naam: "Delft", slug: "delft", regio: "Haaglanden" },
  { naam: "Alphen aan den Rijn", slug: "alphen-aan-den-rijn", regio: "Rijnstreek" },
  { naam: "Westland", slug: "westland", regio: "Westland" },
  { naam: "Schiedam", slug: "schiedam", regio: "Rijnmond" },
  { naam: "Spijkenisse", slug: "spijkenisse", regio: "Voorne-Putten" },
  { naam: "Vlaardingen", slug: "vlaardingen", regio: "Rijnmond" },
  { naam: "Maassluis", slug: "maassluis", regio: "Rijnmond" },
  { naam: "Ridderkerk", slug: "ridderkerk", regio: "Rijnmond" },
  { naam: "Barendrecht", slug: "barendrecht", regio: "Rijnmond" },
  { naam: "Capelle aan den IJssel", slug: "capelle-aan-den-ijssel", regio: "Rijnmond" },
  { naam: "Krimpen aan den IJssel", slug: "krimpen-aan-den-ijssel", regio: "Rijnmond" },
  { naam: "Hendrik-Ido-Ambacht", slug: "hendrik-ido-ambacht", regio: "Zuid-Holland Zuid" },
  { naam: "Papendrecht", slug: "papendrecht", regio: "Zuid-Holland Zuid" },
  { naam: "Sliedrecht", slug: "sliedrecht", regio: "Zuid-Holland Zuid" },
  { naam: "Gorinchem", slug: "gorinchem", regio: "Zuid-Holland Zuid" },
  { naam: "Gouda", slug: "gouda", regio: "Midden-Holland" },
  { naam: "Waddinxveen", slug: "waddinxveen", regio: "Midden-Holland" },
  { naam: "Bodegraven-Reeuwijk", slug: "bodegraven-reeuwijk", regio: "Midden-Holland" },
  { naam: "Nieuwkoop", slug: "nieuwkoop", regio: "Rijnstreek" },
  { naam: "Kaag en Braassem", slug: "kaag-en-braassem", regio: "Rijnstreek" },
  { naam: "Teylingen", slug: "teylingen", regio: "Leiden" },
  { naam: "Leiderdorp", slug: "leiderdorp", regio: "Leiden" },
  { naam: "Voorschoten", slug: "voorschoten", regio: "Leiden" },
  { naam: "Wassenaar", slug: "wassenaar", regio: "Haaglanden" },
  { naam: "Rijswijk", slug: "rijswijk", regio: "Haaglanden" },
  { naam: "Pijnacker-Nootdorp", slug: "pijnacker-nootdorp", regio: "Haaglanden" },
  { naam: "Lansingerland", slug: "lansingerland", regio: "Haaglanden" },
  { naam: "Zuidplas", slug: "zuidplas", regio: "Midden-Holland" },
  { naam: "Molenlanden", slug: "molenlanden", regio: "Zuid-Holland Zuid" },
  { naam: "Hoeksche Waard", slug: "hoeksche-waard", regio: "Zuid-Holland Zuid" },
  { naam: "Goeree-Overflakkee", slug: "goeree-overflakkee", regio: "Zuid-Holland Zuid" },
  { naam: "Nissewaard", slug: "nissewaard", regio: "Voorne-Putten" },
  { naam: "Hellevoetsluis", slug: "hellevoetsluis", regio: "Voorne-Putten" },
  { naam: "Westvoorne", slug: "westvoorne", regio: "Voorne-Putten" },
  { naam: "Midden-Delfland", slug: "midden-delfland", regio: "Haaglanden" },
  { naam: "Katwijk", slug: "katwijk", regio: "Leiden" },
  { naam: "Noordwijk", slug: "noordwijk", regio: "Leiden" },
  { naam: "Lisse", slug: "lisse", regio: "Rijnstreek" },
  { naam: "Hillegom", slug: "hillegom", regio: "Rijnstreek" },
  { naam: "Oegstgeest", slug: "oegstgeest", regio: "Leiden" },
  { naam: "Krimpenerwaard", slug: "krimpenerwaard", regio: "Midden-Holland" },
  { naam: "Alblasserdam", slug: "alblasserdam", regio: "Zuid-Holland Zuid" },
  { naam: "Hardinxveld-Giessendam", slug: "hardinxveld-giessendam", regio: "Zuid-Holland Zuid" },
];

export const locaties = locatieLijst.map((l, i) => ({
  ...l,
  image: locatieFotos[i % locatieFotos.length],
}));

export const diensten = [
  {
    titel: "Bitumen daken",
    slug: "bitumen-daken",
    korte: "Hoogwaardige bitumen dakbedekking voor platte en licht hellende daken.",
    heroImage: "photo-1635424709845-3a85ad5e1f5e",
    beschrijving: "Bitumen is al decennialang de standaard voor platte daken. Wij werken uitsluitend met APP en SBS gemodificeerde bitumen van topmerken zoals IKO en Derbigum. Onze bitumen daken worden mechanisch bevestigd, gelast of volledig verkleefd, afhankelijk van de ondergrond en uw wensen.",
    icon: "layers",
    voordelen: [
      "Levensduur tot 30 jaar bij correct onderhoud",
      "Bestand tegen UV-straling en wortelgroei",
      "Volledig recyclebaar",
      "Snel te leggen, dus minimale overlast",
    ],
  },
  {
    titel: "Renovatie",
    slug: "renovatie",
    korte: "Volledige dakrenovatie met garantiecertificaat.",
    heroImage: "photo-1633759593085-1eaeb724fc88",
    beschrijving: "Is uw dak toe aan vervanging? Wij verzorgen de complete renovatie: van inspectie en advies tot demontage van de oude bedekking en het aanbrengen van nieuw isolatie- en dakbedekkingssysteem. Na afloop ontvangt u een Dakmerk garantiecertificaat.",
    icon: "wrench",
    voordelen: [
      "Gratis dakinspectie vooraf",
      "10 jaar garantie op waterdichtheid",
      "Dakmerk Erkend Kwaliteitskeurmerk",
      "VCA-gecertificeerde uitvoering",
    ],
  },
  {
    titel: "Nieuwbouw",
    slug: "nieuwbouw",
    korte: "Complete dakbedekking voor nieuwbouwprojecten.",
    heroImage: "photo-1676802037786-3697d60497ae",
    beschrijving: "Voor aannemers en particulieren realiseren wij complete daksystemen voor nieuwbouw. Denk aan platte daken, lessenaarsdaken, sedumdaken en licht hellende daken. Wij denken mee in de ontwerpfase en leveren volgens de strakke planning van uw bouwproject.",
    icon: "hammer",
    voordelen: [
      "Samenwerking met aannemer en architect",
      "Voldoet aan alle Bouwbesluit-eisen",
      "Keuze uit bitumen, EPDM, PVC of groendak",
      "Strakke planning en oplevering",
    ],
  },
  {
    titel: "Onderhoud",
    slug: "onderhoud",
    korte: "Periodiek onderhoud voorkomt kostbare reparaties.",
    heroImage: "photo-1779755376652-22ca6eba86b8",
    beschrijving: "Een goed onderhouden dak gaat jaren langer mee. Wij bieden onderhoudscontracten op maat: jaarlijkse inspectie, reiniging van goten en afvoeren, controle van aansluitingen en kleine herstelwerkzaamheden. Zo voorkomt u lekkages en onverwachte kosten.",
    icon: "shield-check",
    voordelen: [
      "Jaarlijkse inspectie en rapportage",
      "Reiniging van dak en goten inbegrepen",
      "Voorrang bij calamiteiten",
      "Vaste lage onderhoudskosten per jaar",
    ],
  },
  {
    titel: "Lekkage",
    slug: "lekkage",
    korte: "Spoedservice bij lekkage. Vaak dezelfde dag ter plaatse.",
    heroImage: "photo-1784009198441-fce45ab9d268",
    beschrijving: "Lekkage vraagt om snel handelen. Onze spoedservice is 7 dagen per week bereikbaar. In de meeste gevallen zijn wij binnen enkele uren ter plaatse om de schade te beperken en een noodreparatie uit te voeren. Daarna plannen we een structurele oplossing.",
    icon: "droplet",
    voordelen: [
      "7 dagen per week bereikbaar",
      "Vaak dezelfde dag ter plaatse",
      "Noodreparatie en structurele oplossing",
      "Heldere communicatie over kosten",
    ],
  },
];

export const blogPosts = [
  {
    slug: "bitumen-vs-epdm-welk-dak-kies-je",
    titel: "Bitumen vs EPDM: welk dak kies je?",
    excerpt: "Beide materialen zijn populair voor platte daken, maar ze verschillen flink in prijs, levensduur en verwerking. Een eerlijke vergelijking.",
    categorie: "Materialen",
    leestijd: "6 min",
    datum: "2026-01-15",
    auteur: "Kees van der Linden",
    image: "photo-1673645652864-9c285c1eed29",
    inhoud: `Bitumen en EPDM zijn de twee meest gekozen materialen voor platte daken in Nederland. Maar welke past het beste bij uw situatie? In dit artikel zetten we de belangrijkste verschillen op een rij.\n\n## Bitumen dakbedekking\n\nBitumen is al ruim een eeuw de standaard voor platte daken. Modern APP en SBS bitumen heeft een levensduur van 25 tot 30 jaar, is sterk en betaalbaar. Bitumen wordt warm of koud verwerkt en is daardoor op vrijwel elke ondergrond toepasbaar.\n\n## EPDM dakbedekking\n\nEPDM is een synthetisch rubber dat in één stuk op het dak wordt gelijmd. Het materiaal is elastisch, UV-bestendig en gaat tot 40 jaar mee. Het nadeel: EPDM is duurder in aanschaf en de verwerking vraagt meer specialistische kennis.\n\n## Wanneer kiest u wat?\n\nKies bitumen als u een betrouwbaar, betaalbaar dak wilt dat door elke dakdekker goed verwerkt kan worden. Kies EPDM als u maximaal 40 jaar wilt genieten zonder onderhoud en bereid bent om meer te investeren.\n\nTwijfelt u? Wij komen graag vrijblijvend langs voor een dakinspectie en eerlijk advies.`,
  },
  {
    slug: "dak-lekkage-wat-te-doen",
    titel: "Dak lekkage? Dit moet u direct doen",
    excerpt: "Een lekkage is altijd vervelend, maar snel handelen beperkt de schade. Een stappenplan voor als het misgaat.",
    categorie: "Schade",
    leestijd: "4 min",
    datum: "2026-01-08",
    auteur: "Kees van der Linden",
    image: "photo-1637847522219-ef24dd4445fe",
    inhoud: `Een lekkage kan veel schade aanrichten in korte tijd. Waterschade aan plafond, muren en vloeren, schimmelvorming en zelfs kortsluiting. Snel handelen is essentieel.\n\n## Stap 1: Zet de stroom uit\n\nAls water in de buurt komt van stopcontacten of elektrische apparaten, schakel dan direct de groep uit. Veiligheid gaat voor.\n\n## Stap 2: Vang het water op\n\nPlaats emmers, bakken of handdoeken om het water op te vangen. Prik niet in een waterzak in het plafond, dit kan voor extra schade zorgen.\n\n## Stap 3: Bel uw verzekeraar\n\nMeld de schade zo snel mogelijk bij uw opstal- of inboedelverzekeraar. Maak foto's van de schade voor uw dossier.\n\n## Stap 4: Schakel een dakdekker in\n\nBel een erkende dakdekker voor een noodreparatie. Wij zijn 7 dagen per week bereikbaar en vaak dezelfde dag ter plaatse in heel Zuid-Holland.\n\nVoorkomen is beter dan genezen: met periodiek onderhoud vangt u kleine problemen op voordat ze uitgroeien tot een lekkage.`,
  },
  {
    slug: "dak-onderhoud-jaarlijkse-checklist",
    titel: "Dakonderhoud: de jaarlijkse checklist",
    excerpt: "Met deze checklist voorkomt u de meest voorkomende dakproblemen. Doe het zelf of besteed het uit aan een vakman.",
    categorie: "Onderhoud",
    leestijd: "5 min",
    datum: "2025-12-20",
    auteur: "Kees van der Linden",
    image: "photo-1764315878148-9df30fd4e174",
    inhoud: `Een goed onderhouden dak gaat tientallen jaren mee. Zonder onderhoud kan een dak al binnen 15 jaar problemen geven. Met deze jaarlijkse checklist houdt u uw dak in topconditie.\n\n## Visuele inspectie\n\nLoop of kijk rond uw dak en let op:\n\n- Blaasvorming of scheuren in de bedekking\n- Losliggende randen of loodslabben\n- Vochtplekken of mosgroei\n- Verstopte dakgoten en hemelwaterafvoeren\n\n## Goten reinigen\n\nReinig in het najaar alle goten en afvoeren. Bladeren en vuil zorgen voor verstoppingen, met wateroverlast en lekkage tot gevolg.\n\n## Aansluitingen controleren\n\nControleer de aansluitingen rondom schoorstenen, dakramen, lichtkoepels en opstanden. Kitranden verouderen en moeten op tijd vervangen worden.\n\n## Wilt u het uitbesteden?\n\nWij bieden onderhoudscontracten vanaf 175 euro per jaar. Inclusief jaarlijkse inspectie, reiniging en voorrang bij calamiteiten. Vraag vrijblijvend een offerte aan.`,
  },
  {
    slug: "kosten-dakrenovatie-2026",
    titel: "Kosten dakrenovatie in 2026: waar moet u op letten?",
    excerpt: "Een dakrenovatie is een flinke investering. Wij leggen uit welke kosten u kunt verwachten en hoe u bespaart zonder in te leveren op kwaliteit.",
    categorie: "Renovatie",
    leestijd: "7 min",
    datum: "2025-12-12",
    auteur: "Kees van der Linden",
    image: "photo-1763665814538-8ba04597286c",
    inhoud: `Een volledige dakrenovatie kost gemiddeld tussen de 8.000 en 25.000 euro voor een gemiddelde woning. Maar wat bepaalt de prijs precies?\n\n## Factoren die de prijs bepalen\n\n**Oppervlakte**: het aantal vierkante meters is de belangrijkste prijsbepaler.\n\n**Materiaal**: bitumen is voordeliger dan EPDM of groendak.\n\n**Isolatie**: het meenemen van dakisolatie in de renovatie levert direct besparing op uw energierekening.\n\n**Bereikbaarheid**: een dak op de 4e verdieping zonder lift is duurder om te renoveren dan een dak op de begane grond.\n\n**Ondergrond**: rotte dakbeschot of doorgezakte balken zorgen voor meerwerk.\n\n## Hoe bespaart u slim?\n\n- Combineer renovatie met isolatie: subsidie mogelijk via ISDE\n- Voer het werk in het laagseizoen uit (oktober-maart)\n- Kies voor bitumen als topkwaliteit niet per se EPDM vereist\n- Vraag meerdere offertes aan en vergelijk op garantie en materiaal\n\n## Garantie als kwaliteitsindicator\n\nEen Dakmerk Erkend Kwaliteitskeurmerk geeft u 10 jaar garantie op waterdichtheid, ook als het bedrijf onverhoopt in gebreke blijft. Dat is pas echte zekerheid.`,
  },
  {
    slug: "groendak-subsidie-zuid-holland",
    titel: "Groendak aanleggen? Subsidie in Zuid-Holland",
    excerpt: "Een sedumdak isoleert, vertraagt regenwater en verlengt de levensduur van uw dak. En u kunt subsidie krijgen.",
    categorie: "Duurzaam",
    leestijd: "5 min",
    datum: "2025-11-28",
    auteur: "Kees van der Linden",
    image: "photo-1641244107263-266c7c43d0ac",
    inhoud: `Steeds meer huiseigenaren in Zuid-Holland kiezen voor een groendak. Niet alleen vanwege de uitstraling, maar ook vanwege de praktische voordelen: betere isolatie, langere levensduur van de onderliggende dakbedekking en opvang van regenwater.\n\n## Subsidie in uw gemeente\n\nVeel Zuid-Hollandse gemeenten verstrekken subsidie voor de aanleg van een groendak. Het bedrag verschilt per gemeente, maar loopt op tot 50 euro per vierkante meter.\n\nGemeenten met groendak-subsidie in onze regio zijn onder andere Rotterdam, Den Haag, Dordrecht, Leiden, Delft en Zoetermeer. De ISDE-subsidie van de rijksoverheid is landelijk beschikbaar.\n\n## Wat kost een groendak?\n\nEen sedumdak kost gemiddeld 50 tot 80 euro per vierkante meter, inclusief aanleg en onderhoudsplan. Reken op een terugverdientijd van 12 tot 18 jaar via subsidie, besparing op energiekosten en waardevermeerdering van uw woning.\n\n## Onze werkwijze\n\nWij leggen groendaksystemen aan op bestaande en nieuwe platte daken. Eerst een waterdichte onderlaag in bitumen of EPDM, daarna een drainagelaag, substraat en sedummat. Binnen twee dagen heeft u een bloeiend dak.\n\nWilt u weten of uw groendak in aanmerking komt voor subsidie? Wij regelen de aanvraag voor u.`,
  },
  {
    slug: "dakinspectie-kopen-huis",
    titel: "Dakinspectie bij aankoop van een woning",
    excerpt: "Een dak kan er goed uitzien en toch verborgen gebreken hebben. Laat het controleren vóór u tekent.",
    categorie: "Advies",
    leestijd: "4 min",
    datum: "2025-11-15",
    auteur: "Kees van der Linden",
    image: "photo-1635424710928-0544e8512eae",
    inhoud: `De aankoop van een woning is een grote stap. Een bouwkundige keuring wordt vaak geadviseerd, maar het dak krijgt daarbij soms weinig aandacht. Dat is jammer, want een dakreparatie of renovatie kan al snel tienduizenden euro's kosten.\n\n## Wat wij controleren\n\nBij een dakinspectie voor aankoop kijken wij naar:\n\n- Leeftijd en conditie van de dakbedekking\n- Aansluitingen, randen en loodslabben\n- Staat van goten, hemelwaterafvoeren en kilgoten\n- Eventuele vochtplekken of schimmel\n- Staat van het dakbeschot (van binnenuit)\n\n## Onafhankelijk rapport\n\nU ontvangt een helder rapport met foto's en een inschatting van de kosten op korte en middellange termijn. Handig als onderhandelingsinstrument of om onaangename verrassingen te voorkomen.\n\n## Wanneer inschakelen?\n\nHet liefst vóór of tijdens het onderhandelingsproces. Een eigen dakdekker mee laten kijken op de bezichtigdag kan al veel duidelijk maken.\n\nWij bieden dakinspecties voor slechts 195 euro. Bel ons of plan online een afspraak.`,
  },
];

/**
 * Beoordelingen zoals ze op Google staan. `initiaal` en `tijdAgo` voeden het
 * Google-blok op de homepage; de tekst zelf is onveranderd overgenomen.
 */
export const reviews = [
  {
    naam: "Mark Duits",
    initiaal: "M",
    tijdAgo: "2 maanden geleden",
    rol: "VvE-voorzitter",
    plaats: "Maassluis",
    rating: 5,
    tekst: "Een hardnekkige lekkage die anderen niet konden vinden, was in één middag verholpen. Nette prijs.",
  },
  {
    naam: "Hendrik Scheepers",
    initiaal: "H",
    tijdAgo: "3 maanden geleden",
    rol: "Particulier",
    plaats: "Rotterdam",
    rating: 5,
    tekst: "Volledige dakrenovatie. Van offerte tot oplevering alles volgens afspraak, en netjes werk.",
  },
  {
    naam: "Niels van der Kooij",
    initiaal: "N",
    tijdAgo: "5 maanden geleden",
    rol: "Cornus Vastgoed",
    plaats: "Rotterdam",
    rating: 5,
    tekst: "Wij schakelen LK in voor al onze vastgoedobjecten. Altijd snel en tegen eerlijke prijzen.",
  },
  {
    naam: "Renske van Grevenbroek",
    initiaal: "R",
    tijdAgo: "7 maanden geleden",
    rol: "Facility manager",
    plaats: "Den Haag",
    rating: 5,
    tekst: "Ze verzorgen het onderhoud van ons kantoorpand. Snel ter plaatse en proactief in hun advies.",
  },
  {
    naam: "Sanne Mol",
    initiaal: "S",
    tijdAgo: "9 maanden geleden",
    rol: "Particulier",
    plaats: "Delft",
    rating: 5,
    tekst: "Binnen twee uur stond er iemand op het dak. Definitieve oplossing volgde een week later.",
  },
  {
    naam: "Tom Bakker",
    initiaal: "T",
    tijdAgo: "11 maanden geleden",
    rol: "Aannemer",
    plaats: "Dordrecht",
    rating: 5,
    tekst: "Voor onze nieuwbouwprojecten werken we al jaren samen. Strakke planning, goede kwaliteit.",
  },
];

/** Cijfers en link van het Google-bedrijfsprofiel, voor het beoordelingenblok. */
export const google = {
  score: "4,9",
  aantal: 127,
  url: "https://www.google.com/search?q=LK+Dakwerken+Rotterdam+reviews",
};

export const bedrijf = {
  naam: "LK Dakwerken",
  slogan: "Vakwerk voor uw dak in Zuid-Holland",
  adres: "Vlaardingweg 12, 3044 CK Rotterdam",
  straat: "Vlaardingweg 12",
  postcode: "3044 CK",
  plaats: "Rotterdam",
  provincie: "Zuid-Holland",
  telefoon: "010 - 271 38 24",
  mobiel: "06 - 12 34 56 78",
  email: "info@lkdakwerken.nl",
  kvk: "24138572",
  btw: "NL001234567B01",
  openingstijden: {
    maVrij: "07:00 - 18:00",
    za: "08:00 - 14:00",
    zo: "Alleen spoed",
  },
};

export const stats = [
  { cijfer: "20+", label: "Jaar ervaring" },
  { cijfer: "1.842", label: "Daken geleverd" },
  { cijfer: "4,9", label: "Google score" },
  { cijfer: "127", label: "Reviews" },
];

export const certificeringen = [
  { naam: "Dakmerk Erkend", uitleg: "Gecertificeerd voor bitumen en kunststof daken" },
  { naam: "VCA**", uitleg: "Veiligheid, gezondheid en milieu" },
  { naam: "BRL 4702", uitleg: "Beoordelingsrichtlijn dakbedekking" },
  { naam: "10 jaar garantie", uitleg: "Waterdichtheidsgarantie via Dakmerk" },
];

export const werkwijze = [
  { nummer: "01", titel: "Dak inspecteren", tekst: "We komen vrijblijvend langs, bekijken het dak en bespreken uw wensen." },
  { nummer: "02", titel: "Offerte opstellen", tekst: "U ontvangt binnen 3 werkdagen een heldere offerte met materiaal en planning." },
  { nummer: "03", titel: "Werk uitvoeren", tekst: "Vakmensen werken volgens planning. Geen verrassingen achteraf." },
  { nummer: "04", titel: "Samen opleveren", tekst: "We lopen samen het werk na. U ontvangt garantiecertificaat en onderhoudsadvies." },
];

/**
 * Opgeleverde projecten, allemaal in Rotterdam en omgeving. Elk project heeft
 * een eigen foto van het werkelijk uitgevoerde werk in public/projecten/; het
 * veld `image` verwijst naar de bestandsnaam zonder extensie. De helpers
 * projectKaart() en projectGroot() in lib/images.ts bouwen het pad op.
 *
 * `extraFotos` is optioneel en bedoeld voor het geval meerdere opnamen bij
 * hetzelfde dak horen; de vergroting toont die dan als miniaturen.
 *
 * `plaats` en `type` vormen samen het label onder de foto in de
 * projectenslider op de homepage. scripts/check-images.mjs controleert of bij
 * elk project beide fotobestanden daadwerkelijk bestaan.
 */
export type Project = {
  titel: string;
  plaats: string;
  type: string;
  jaar: number;
  image: string;
  tekst: string;
  extraFotos?: string[];
};

export const projecten: Project[] = [
  {
    titel: "Nieuwbouw plat dak op de aanbouw",
    plaats: "Rotterdam Kralingen",
    type: "Nieuwbouw plat dak",
    jaar: 2025,
    image: "project-01",
    tekst: "De aannemer zette de uitbouw neer, wij maakten hem waterdicht. Verse bitumen op nieuw dakbeschot, afgewerkt met een strakke aluminium daktrim die netjes aansluit op het boeiboord. De bewoners konden dezelfde week hun keuken laten plaatsen.",
  },
  {
    titel: "Bergingen in de achtertuin",
    plaats: "Schiedam",
    type: "Nieuwe dakbedekking",
    jaar: 2024,
    image: "project-02",
    tekst: "Bergingen die al jaren lekten. Alles eraf, de opstanden rondom opnieuw opgezet en een frisse laag leislagbitumen erop. De fietsen en het tuingereedschap staan er weer kurkdroog bij.",
  },
  {
    titel: "Compleet dak met dakunits",
    plaats: "Rotterdam Nesselande",
    type: "Renovatie",
    jaar: 2025,
    image: "project-04",
    tekst: "Lichtkoepel, dakdoorvoeren en ventilatie-units, allemaal op één dak. Elk obstakel is een risico op lekkage, dus elk obstakel kreeg zijn eigen afwerking. Daarna pas de grote banen.",
  },
  {
    titel: "Bedrijfspand in de stad",
    plaats: "Rotterdam Centrum",
    type: "Renovatie met steiger",
    jaar: 2025,
    image: "project-05",
    tekst: "Werken boven een drukke straat vraagt om een steiger en randbeveiliging. Oude dakbedekking eraf en afgevoerd, nieuwe erop met de brander, zonder dat de ondernemer eronder een dag dicht hoefde.",
  },
  {
    titel: "Plat dak naast het pannendak",
    plaats: "Schiedam",
    type: "Renovatie",
    jaar: 2024,
    image: "project-06",
    tekst: "De aansluiting tussen plat dak en pannendak is altijd het spannendste punt. Met een goed opgezette opstand en een strakke trim blijft dat jarenlang dicht, ook bij scheefstaande regen. De buitenunit hebben we netjes ingewerkt.",
  },
  {
    titel: "Dak met uitzicht over de stad",
    plaats: "Rotterdam Noord",
    type: "Renovatie",
    jaar: 2025,
    image: "project-07",
    tekst: "Een van onze mooiste werkplekken: de Rotterdamse skyline aan de horizon. Schoorstenen, doorvoeren en een lichtkoepel stuk voor stuk nagelopen en waterdicht opgeleverd.",
  },
  {
    titel: "Zwart bitumen op de aanbouw",
    plaats: "Rotterdam Charlois",
    type: "Nieuwe dakbedekking",
    jaar: 2024,
    image: "project-08",
    tekst: "Op verzoek van de eigenaar gingen we hier voor zwart bitumen zonder leislag. Strak, egaal en onzichtbaar vanaf de straat. De dakdoorvoer kreeg een eigen aansluiting.",
  },
  {
    titel: "Aanbouw in de woonwijk",
    plaats: "Nieuwerkerk aan den IJssel",
    type: "Renovatie",
    jaar: 2025,
    image: "project-09",
    tekst: "Ladder tegen de rand, grasveld ernaast en een dak dat om aandacht vroeg. De oude laag was dof en poreus geworden. Nieuwe leislagbitumen met een trim rondom, zodat de wind er geen grip meer op krijgt.",
  },
  {
    titel: "Overkapping naast het grinddak",
    plaats: "Berkel en Rodenrijs",
    type: "Nieuwe dakbedekking",
    jaar: 2025,
    image: "project-10",
    tekst: "Naast het bestaande grinddak met zonnepanelen kwam deze overkapping. De dakdoorvoer is netjes ingewerkt en de aansluiting op het hogere dak is dubbel uitgevoerd, want daar komt al het water samen.",
  },
];

export const faq = [
  {
    vraag: "Wat kost een nieuw bitumen dak?",
    antwoord: "De prijs hangt af van oppervlakte, huidige staat en isolatiewensen. Gemiddeld ligt bitumen tussen €75 en €110 per m² inclusief materiaal en arbeid. We maken graag een vrijblijvende offerte.",
  },
  {
    vraag: "Hoe snel kunnen jullie bij een lekkage zijn?",
    antwoord: "Bij spoed zijn we vaak binnen enkele uren ter plaatse, ook in het weekend. Bel onze spoedlijn en we sturen direct een dakdekker.",
  },
  {
    vraag: "Werken jullie ook in het weekend?",
    antwoord: "Ja, voor spoedgevallen zijn we 7 dagen per week bereikbaar. Geplande werkzaamheden voeren we uit van maandag tot en met zaterdag.",
  },
  {
    vraag: "Krijg ik garantie op het werk?",
    antwoord: "Ja. Via ons Dakmerk-keurmerk ontvangt u 10 jaar garantie op waterdichtheid, ook wanneer ons bedrijf onverhoopt in gebreke zou blijven.",
  },
  {
    vraag: "Werken jullie voor particulieren of alleen bedrijven?",
    antwoord: "Beide. We werken voor VvE's, woningcorporaties, aannemers en particuliere huiseigenaren. Geen project is ons te klein of te groot.",
  },
  {
    vraag: "In welke regio werken jullie?",
    antwoord: "We werken in heel Zuid-Holland: van Rotterdam tot Den Haag, van Dordrecht tot Leiden en alles daartussen. Op de pagina Locaties vindt u alle gemeenten waar we actief zijn.",
  },
];

/** Vaste sfeerfoto's per pagina-onderdeel. Alle ID's zijn gecontroleerd op 200. */
export const fotos = {
  overOnsTeam: "photo-1541888894402-f3b1af908be4",
  overOnsHeader: "photo-1541888946425-d81bb19240f5",
  dienstenHeader: "photo-1744975748338-d226c7535d49",
  blogHeader: "photo-1590365876016-da05ac533e83",
  locatiesHeader: "photo-1526505917130-857817501277",
  contactHeader: "photo-1597224646250-fadbb825dcf8",
  offerteHeader: "photo-1742112125567-3e8967bad60f",
  werkwijze: "photo-1634750006909-3258af95e257",
};
