import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Hammer,
  Layers,
  Droplets,
  Wind,
  PanelTop,
  Ruler,
  Wrench,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { bedrijf, fotos } from '@/lib/data';
import { foto, projectGroot } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { SubsidieCTA } from '@/components/SubsidieCTA';

export const metadata: Metadata = {
  title: 'Dakrenovatie Rotterdam | Plat Dak Renoveren | LK Dakwerken',
  description:
    'Plat dak laten renoveren? LK Dakwerken verzorgt complete dakrenovaties, dakbedekking en isolatie voor woningen en bedrijfspanden in Rotterdam en Zuid-Holland.',
  alternates: { canonical: '/diensten/renovatie' },
};

const trustPunten = [
  'Gratis dakinspectie',
  'Duidelijke offerte vooraf',
  'Complete dakrenovatie',
  'Garantie op uitgevoerd werk',
];

const signalen = [
  { icon: Layers, titel: 'Scheuren in de dakbedekking', tekst: 'Zichtbare scheuren kunnen ervoor zorgen dat vocht de dakconstructie binnendringt.' },
  { icon: Wind, titel: 'Blaasvorming', tekst: 'Bobbels of blazen in de dakbedekking kunnen wijzen op vocht of lucht onder de daklaag.' },
  { icon: Droplets, titel: 'Terugkerende lekkages', tekst: 'Wanneer lekkages steeds opnieuw ontstaan, kan er meer aan de hand zijn dan één lokale beschadiging.' },
  { icon: PanelTop, titel: 'Loslatende naden', tekst: 'Verouderde of beschadigde aansluitingen en naden verhogen het risico op lekkage.' },
  { icon: Ruler, titel: 'Water blijft op het dak staan', tekst: 'Langdurige plasvorming kan wijzen op problemen met afschot of afwatering.' },
  { icon: ShieldCheck, titel: 'Verouderde dakbedekking', tekst: 'Ook zonder directe lekkage kan sterk verouderde dakbedekking reden zijn om het dak preventief te laten beoordelen.' },
];

const onderdelen = [
  { nummer: '01', titel: 'Bestaande dakbedekking', tekst: 'De bestaande dakbedekking wordt beoordeeld en waar nodig verwijderd of voorbereid voor renovatie.' },
  { nummer: '02', titel: 'Ondergrond', tekst: 'We controleren of de ondergrond geschikt en voldoende stevig is voor de nieuwe dakopbouw.' },
  { nummer: '03', titel: 'Isolatie', tekst: 'Wanneer gewenst en technisch mogelijk kan de isolatie van het dak tijdens de renovatie worden verbeterd.' },
  { nummer: '04', titel: 'Nieuwe dakbedekking', tekst: 'Er wordt een nieuw passend dakbedekkingssysteem aangebracht.' },
  { nummer: '05', titel: 'Details & aansluitingen', tekst: 'Daktrimmen, hemelwaterafvoer, opstanden, doorvoeren en andere aansluitingen worden zorgvuldig afgewerkt.' },
];

const dakopbouw = ['Dakconstructie', 'Dampremmende laag', 'Dakisolatie', 'Onderlaag', 'Bitumen dakbedekking', 'Beschermende toplaag'];

const werkwijze = [
  { nummer: '01', titel: 'Dakinspectie', tekst: 'We bekijken het bestaande dak, de dakbedekking, aansluitingen, afwatering en waar mogelijk de dakopbouw.' },
  { nummer: '02', titel: 'Renovatieadvies & offerte', tekst: 'Op basis van de inspectie bepalen we welke renovatiemethode passend is. U ontvangt vervolgens een duidelijke offerte met werkzaamheden, materiaal en planning.' },
  { nummer: '03', titel: 'Dakrenovatie', tekst: 'Waar nodig verwijderen of behandelen we de bestaande daklagen en brengen we de nieuwe dakopbouw en dakbedekking aan.' },
  { nummer: '04', titel: 'Controle & oplevering', tekst: 'Na de werkzaamheden controleren we het dak en bespreken we de oplevering. U ontvangt de bijbehorende garantiedocumentatie.' },
];

const kostenFactoren = [
  'het dakoppervlak',
  'staat van de bestaande dakbedekking',
  'eventuele verwijdering van oude daklagen',
  'toestand van de ondergrond',
  'gewenste isolatie',
  'aantal dakdetails en aansluitingen',
  'bereikbaarheid',
  'gekozen dakbedekkingssysteem',
];

const faq = [
  { vraag: 'Wanneer moet een plat dak volledig worden gerenoveerd?', antwoord: 'Dat hangt af van de leeftijd, staat en opbouw van het dak. Terugkerende lekkages, scheuren, loslatende naden of sterk verouderde dakbedekking kunnen signalen zijn dat renovatie nodig is. Een dakinspectie geeft hierover meer duidelijkheid.' },
  { vraag: 'Moet de oude dakbedekking altijd worden verwijderd?', antwoord: 'Nee. In sommige situaties kan een bestaand dak geschikt zijn voor renovatie zonder dat alle daklagen volledig verwijderd hoeven te worden. Dit wordt tijdens de inspectie technisch beoordeeld.' },
  { vraag: 'Kan ik mijn dak tijdens de renovatie ook laten isoleren?', antwoord: 'In veel gevallen kan dakisolatie onderdeel worden van een renovatie. Welke isolatiemethode mogelijk is, hangt af van de bestaande constructie en gewenste dakopbouw.' },
  { vraag: 'Hoe lang duurt een dakrenovatie?', antwoord: 'Dat is afhankelijk van het oppervlak, de werkzaamheden, bereikbaarheid en weersomstandigheden. De verwachte uitvoeringsduur wordt vooraf in de planning besproken.' },
  { vraag: 'Kan ik subsidie krijgen wanneer ik mijn dak laat isoleren?', antwoord: 'Voor bepaalde isolatiemaatregelen kan subsidie beschikbaar zijn. Via onze pagina Subsidies & verduurzaming kunt u de actuele landelijke en lokale mogelijkheden bekijken.' },
  { vraag: 'Krijg ik garantie na een dakrenovatie?', antwoord: 'Op onze werkzaamheden gelden de afgesproken garantievoorwaarden, tot 10 jaar garantie op waterdichtheid, vastgelegd in een garantiecertificaat bij oplevering.' },
  { vraag: 'Kan ik in het gebouw blijven tijdens een dakrenovatie?', antwoord: 'Bij veel dakrenovaties kan het gebouw tijdens de werkzaamheden gewoon gebruikt blijven worden. Dit hangt echter af van het type gebouw en de omvang van de werkzaamheden.' },
  { vraag: 'Werken jullie voor particulieren én bedrijven?', antwoord: 'Ja. LK Dakwerken voert renovatiewerkzaamheden uit voor zowel particuliere als zakelijke opdrachtgevers.' },
];

const andereDiensten = [
  { slug: 'bitumen-daken', titel: 'Bitumen daken', tekst: 'Hoogwaardige bitumen dakbedekking voor platte en licht hellende daken.', knop: 'Bekijk bitumen daken', image: projectGroot('project-01') },
  { slug: 'nieuwbouw', titel: 'Nieuwbouw', tekst: 'Complete dakbedekking en dakopbouw voor nieuwbouwprojecten.', knop: 'Bekijk nieuwbouw', image: foto('photo-1676802037786-3697d60497ae', 600, 75) },
  { slug: 'onderhoud', titel: 'Onderhoud', tekst: 'Periodiek onderhoud helpt problemen vroegtijdig te herkennen en de levensduur van het dak te verlengen.', knop: 'Bekijk onderhoud', image: projectGroot('project-05') },
  { slug: 'lekkage', titel: 'Lekkage', tekst: 'Daklekkage laten onderzoeken en professioneel herstellen.', knop: 'Bekijk lekkage', image: projectGroot('project-08') },
];

export default function RenovatiePage() {
  return (
    <>
      {/* 1. Hero — zelfde visuele systeem als Bitumen daken */}
      <PageHeader
        titel="Renovatie"
        lead="Volledige dakrenovatie van inspectie tot oplevering. Wij vernieuwen verouderde platte daken en zorgen voor een duurzame, betrouwbare nieuwe dakopbouw."
        imageSrc={projectGroot('project-08')}
        imageAlt="Dakrenovatie in uitvoering op een plat dak"
        compact
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Vraag gratis een offerte aan</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <a href="tel:0102713824" className="btn-ghost-invert">
          <Phone className="w-4 h-4" aria-hidden="true" />
          Bel ons
        </a>
      </PageHeader>

      {/* 2. Trustbar */}
      <section className="bg-white">
        <div className="container-wide py-8">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            {trustPunten.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-ink-600">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Wanneer renoveren? */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Tijd voor vernieuwing?</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Wanneer is uw dak toe aan renovatie?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Een plat dak heeft niet het eeuwige leven. Door ouderdom, weersinvloeden en slijtage kan de
              dakbedekking na verloop van tijd uitdrogen, scheuren of zijn waterdichtheid verliezen.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Wanneer plaatselijke reparaties niet meer voldoende zijn, kan een volledige dakrenovatie de betere
              oplossing zijn.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Tijdens een dakinspectie beoordelen we niet alleen de zichtbare dakbedekking, maar kijken we ook naar
              de aansluitingen, afwatering, isolatie en algemene conditie van het dak.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={projectGroot('project-02')}
              alt="Verouderd plat dak vóór renovatie"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 4. Signalen */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Signalen dat uw dak aandacht nodig heeft
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {signalen.map((s, i) => (
              <Reveal key={s.titel} delay={(i % 6) * 0.05} className="card card-hover p-7">
                <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <s.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{s.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{s.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Voor/na: geen echt projectmateriaal beschikbaar, sectie bewust weggelaten
          tot er echte before/after-foto's zijn. */}

      {/* 6. Wat houdt een renovatie in */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Meer dan alleen nieuwe dakbedekking
            </h2>
            <p className="lead mt-5">
              Bij een dakrenovatie bekijken we de complete dakopbouw. Afhankelijk van de bestaande situatie
              vervangen of verbeteren we de onderdelen die daar technisch om vragen.
            </p>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {onderdelen.map((o, i) => (
              <Reveal key={o.nummer} delay={i * 0.06} className="card card-hover p-7">
                <span className="text-sm font-semibold text-blue-500 tabular-nums">{o.nummer}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{o.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{o.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dakopbouw doorsnede */}
      <section className="section-pad bg-ink-950 text-white overflow-hidden">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Van ondergrond tot toplaag</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Een goed dak begint bij de juiste opbouw
            </h2>
          </Reveal>
          <div className="max-w-xl">
            <ol className="space-y-0">
              {dakopbouw.map((laag, i) => (
                <li key={laag}>
                  <div className="flex items-center gap-4 py-3 border-b border-white/10">
                    <span className="text-sm text-blue-400 tabular-nums w-6 shrink-0">{i + 1}</span>
                    <span className="text-white/90">{laag}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-white/50 leading-relaxed">
              Dit is een voorbeeldopbouw. De exacte dakopbouw is afhankelijk van de bestaande constructie en gekozen
              renovatiemethode.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Repareren of renoveren */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Repareren of volledig renoveren?
            </h2>
            <p className="lead mt-5">
              Niet ieder probleem betekent automatisch dat het volledige dak vervangen moet worden. Soms kan een
              lokale reparatie voldoende zijn. Bij sterk verouderde of structureel beschadigde dakbedekking kan
              renovatie uiteindelijk verstandiger zijn.
            </p>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Wrench className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Dak repareren</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">Kan interessant zijn bij:</p>
              <ul className="mt-4 space-y-2.5">
                {['Plaatselijke beschadiging', 'Eén defecte aansluiting', 'Relatief jonge dakbedekking', 'Lokaal ontstane lekkage'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
              <Link href="/diensten/lekkage" className="btn-link mt-6">
                Bekijk lekkage & reparatie
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Hammer className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Dak renoveren</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">Kan interessanter zijn bij:</p>
              <ul className="mt-4 space-y-2.5">
                {['Sterk verouderde dakbedekking', 'Meerdere zwakke plekken', 'Terugkerende lekkages', 'Verslechterde dakopbouw', 'Wens om direct beter te isoleren'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
              <Link href="/offerte" className="btn-link mt-6">
                Laat mijn dak beoordelen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-ink-400 max-w-2xl">
            Gebruik geen harde automatische diagnose — het uiteindelijke advies volgt na inspectie.
          </p>
        </div>
      </section>

      {/* 9. Werkwijze */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Onze werkwijze</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van oud dak naar nieuwe dakopbouw
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paper-300 to-transparent"
            />
            {werkwijze.map((stap, i) => (
              <Reveal key={stap.nummer} delay={i * 0.07} className="relative">
                <span className="relative z-10 inline-flex w-10 h-10 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold tabular-nums">
                  {stap.nummer}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{stap.titel}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{stap.tekst}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-14 text-center">
            <Link href="/offerte" className="btn-link justify-center">
              Plan een gratis dakinspectie
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 10. Isolatie & verduurzaming — prominenter dan op Bitumen daken */}
      <section className="section-pad bg-blue-50/60">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Slim renoveren</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Dak open? Kijk direct naar de isolatie.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed max-w-xl">
              Wanneer een dak volledig wordt gerenoveerd, is dit vaak een geschikt moment om de bestaande
              dakisolatie te beoordelen. Door renovatie en isolatie waar mogelijk te combineren, hoeft het dak later
              niet opnieuw te worden opengelegd voor dezelfde werkzaamheden.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-xl">
              Betere dakisolatie kan daarnaast bijdragen aan minder warmteverlies en een comfortabeler binnenklimaat.
              Voor bepaalde isolatiemaatregelen zijn mogelijk landelijke of lokale subsidies beschikbaar.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/subsidies-verduurzaming" className="btn-pill">
                <span className="label">Bekijk subsidies & regelingen</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <Link href="/offerte" className="btn-link">
                Bespreek isolatie bij mijn renovatie
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={foto(fotos.dienstenHeader, 900, 78)}
              alt="Dakisolatie tijdens een renovatie"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 11. Duurzaam renoveren */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Renoveren met oog op de toekomst
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed max-w-2xl mx-auto">
              Bij een dakrenovatie kijken we niet alleen naar het oplossen van het huidige probleem, maar ook naar
              een dakopbouw die past bij het toekomstige gebruik van het gebouw. Denk bijvoorbeeld aan betere
              isolatie, toekomstige zonnepanelen, onderhoud en bereikbaarheid, goede hemelwaterafvoer of eventueel
              toekomstig gebruik als groen dak.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 12. Garantie & kwaliteitsborging — donkere sectie */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Zekerheid na oplevering</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Een gerenoveerd dak moet vertrouwen geven.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-xl">
              Een professionele dakrenovatie stopt niet bij het leggen van de laatste meter dakbedekking. Ook
              controle, oplevering en duidelijke afspraken over garantie horen daarbij.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Controle en oplevering na afronding',
                'Garantiecertificaat bij oplevering',
                'Tot 10 jaar garantie op waterdichtheid',
                'Vast team, geen onderaannemers',
              ].map((k) => (
                <li key={k} className="flex items-center gap-2.5 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={projectGroot('project-05')}
              alt="Opgeleverd gerenoveerd dak"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 13. Kosten */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Kosten</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Wat kost een dakrenovatie?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Geen twee renovaties zijn hetzelfde. De uiteindelijke prijs is onder andere afhankelijk van:
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {kostenFactoren.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" />
                  <span className="capitalize">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Daarom geven we liever een prijs die bij het daadwerkelijke dak past dan een algemene
              vierkantemeterprijs die achteraf afwijkt. Na een dakinspectie ontvangt u een heldere offerte voor de
              benodigde werkzaamheden.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <div className="panel p-8">
              <h3 className="text-display text-xl tracking-[-0.02em] text-ink-900">Ontvang een vrijblijvende offerte</h3>
              <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">
                Na beoordeling van het dak weet u precies waar u aan toe bent.
              </p>
              <Link href="/offerte" className="btn-pill mt-6 w-full justify-between">
                <span className="label">Offerte aanvragen</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <a
                href="tel:0102713824"
                className="mt-4 flex items-center gap-3 text-sm text-ink-600 hover:text-blue-500 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Liever direct overleggen? {bedrijf.telefoon}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 14. Vakmanschap */}
      <section className="relative section-pad bg-white overflow-hidden">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={foto(fotos.werkwijze, 1600, 75)}
              alt="Dakdekker tijdens renovatiewerkzaamheden op een plat dak"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/20" />
            <Reveal className="relative p-10 md:p-16 max-w-xl">
              <span className="text-sm font-semibold text-blue-300 tracking-wide uppercase">Vakmanschap</span>
              <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Een dakrenovatie waarbij ieder detail telt.
              </h2>
              <p className="mt-5 text-white/85 leading-relaxed">
                Van de voorbereiding en dakopbouw tot aansluitingen, dakranden en hemelwaterafvoer: bij een
                renovatie zijn juist de details bepalend voor het eindresultaat. Daarom werken we zorgvuldig en
                kiezen we voor materialen en oplossingen die passen bij het bestaande dak.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 15. Projectfoto's — geen echte renovatieprojecten met locatiegegevens
          beschikbaar, sectie bewust weggelaten tot er echt materiaal is. */}

      {/* 16. FAQ */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde vragen over dakrenovatie
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl mx-auto space-y-3">
            {faq.map((item) => (
              <details key={item.vraag} className="group faq-item panel-flat p-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold leading-snug text-ink-900">{item.vraag}</h3>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-4 text-ink-500 leading-relaxed">{item.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 17. Andere diensten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
              Meer mogelijkheden voor uw dak
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {andereDiensten.map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.06}>
                <Link
                  href={`/diensten/${d.slug}`}
                  className="group card card-hover overflow-hidden flex flex-col h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                    <img
                      src={d.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-ink-900 group-hover:text-blue-500 transition-colors">{d.titel}</h3>
                    <p className="mt-2 text-sm text-ink-500 leading-relaxed">{d.tekst}</p>
                    <span className="btn-link mt-auto pt-4">
                      {d.knop}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 18. Eind-CTA */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Is uw dak toe aan renovatie?
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
              Laat de huidige staat van uw dak beoordelen en ontvang een duidelijke offerte voor de benodigde
              werkzaamheden.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/offerte" className="btn-pill">
                <span className="label">Vraag een offerte aan</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <a href="tel:0102713824" className="btn-ghost-invert">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Bel 010 - 271 38 24
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Dakrenovatie',
            provider: { '@type': 'RoofingContractor', name: bedrijf.naam, telephone: bedrijf.telefoon, areaServed: 'Zuid-Holland' },
            areaServed: 'Rotterdam en Zuid-Holland',
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Diensten', item: '/diensten' },
              { '@type': 'ListItem', position: 3, name: 'Renovatie', item: '/diensten/renovatie' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.vraag,
              acceptedAnswer: { '@type': 'Answer', text: item.antwoord },
            })),
          }),
        }}
      />
    </>
  );
}
