import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Home as HomeIcon,
  Building2,
  HardHat,
  Layers,
  Ruler,
  PanelTop,
  Wind,
  Droplets,
  Waves,
  Sun,
  Cable,
  Recycle,
  Wrench,
  CalendarClock,
  Plus,
} from 'lucide-react';
import { bedrijf, fotos } from '@/lib/data';
import { foto, projectGroot } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { SubsidieCTA } from '@/components/SubsidieCTA';

export const metadata: Metadata = {
  title: 'Dakdekker Nieuwbouw Rotterdam | Platte Daken | LK Dakwerken',
  description:
    'Dakwerk voor nieuwbouw? LK Dakwerken realiseert complete dakbedekking en dakopbouw voor woningen, aannemers en bedrijfspanden in Rotterdam en Zuid-Holland.',
  alternates: { canonical: '/diensten/nieuwbouw' },
};

const trustPunten = [
  'Afstemming met aannemer',
  'Duidelijke planning',
  'Professionele dakopbouw',
  'Oplevering volgens afspraak',
];

const doelgroepen = [
  {
    icon: HomeIcon,
    titel: 'Nieuwe woning of aanbouw',
    tekst: 'Een nieuwbouwwoning, uitbouw, garage of ander nieuw dak? We verzorgen een passende dakopbouw en dakbedekking.',
  },
  {
    icon: HardHat,
    titel: 'Samenwerking met aannemers',
    tekst: 'We stemmen werkzaamheden, materiaal en planning af op het bouwproces en houden rekening met andere disciplines op het project.',
  },
  {
    icon: Building2,
    titel: 'Bedrijfs- en utiliteitsbouw',
    tekst: 'Dakwerk voor onder andere nieuwe bedrijfspanden, bedrijfsruimten en andere commerciële gebouwen binnen onze expertise.',
  },
];

const voorbereiding = [
  { nummer: '01', titel: 'Projectinformatie', tekst: 'We bekijken de tekeningen, afmetingen, dakdetails en relevante projectspecificaties.' },
  { nummer: '02', titel: 'Dakopbouw', tekst: 'We bepalen binnen de projectspecificaties welke materialen, isolatie en dakbedekking worden toegepast.' },
  { nummer: '03', titel: 'Details & aansluitingen', tekst: 'Doorvoeren, dakranden, hemelwaterafvoer en andere aansluitingen worden vooraf meegenomen.' },
  { nummer: '04', titel: 'Uitvoeringsplanning', tekst: 'De werkzaamheden worden afgestemd op het moment waarop het dak gereed is voor onze werkzaamheden.' },
];

const dakopbouw = ['Dakconstructie', 'Dampremmende laag', 'Thermische isolatie', 'Onderlaag / bevestigingssysteem', 'Waterdichte dakbedekking', 'Beschermende toplaag'];

const typeDaken = [
  { icon: PanelTop, titel: 'Plat dak', tekst: 'Veel toegepast bij moderne woningen, aanbouwen en bedrijfspanden.' },
  { icon: Ruler, titel: 'Licht hellend dak', tekst: 'Ook voor licht hellende dakconstructies kan een passend dakbedekkingssysteem worden samengesteld.' },
  { icon: Wind, titel: 'Lessenaarsdak', tekst: 'Een moderne dakvorm die onder andere voorkomt bij woningen, aanbouwen en bedrijfspanden.' },
  { icon: Recycle, titel: 'Groen dak', tekst: 'Wanneer dit onderdeel is van het ontwerp kan rekening worden gehouden met een dakopbouw geschikt voor verdere vergroening.' },
];

const techniekDetails = [
  { icon: PanelTop, titel: 'Dakranden', tekst: 'Zorgvuldige aansluiting en afwerking van dakranden en opstanden.' },
  { icon: Droplets, titel: 'Hemelwaterafvoer', tekst: 'Afvoerpunten en hemelwaterafvoer moeten aansluiten op het ontwerp van het dak.' },
  { icon: Cable, titel: 'Doorvoeren', tekst: 'Technische doorvoeren vragen om een betrouwbare waterdichte aansluiting.' },
  { icon: Layers, titel: 'Opstanden', tekst: 'Correct uitgevoerde opstanden zijn essentieel voor een waterdichte detaillering.' },
  { icon: Waves, titel: 'Aansluitingen', tekst: 'Overgangen naar gevels en andere bouwdelen worden zorgvuldig uitgevoerd binnen de gekozen detaillering.' },
  { icon: Sun, titel: 'Isolatie', tekst: 'De isolatielaag moet aansluiten op de ontworpen thermische prestaties en dakopbouw.' },
];

const werkwijze = [
  { nummer: '01', titel: 'Project bespreken', tekst: 'We bespreken het project, de planning, tekeningen en gewenste dakopbouw.' },
  { nummer: '02', titel: 'Offerte & voorbereiding', tekst: 'Op basis van de beschikbare projectinformatie stellen we een duidelijke offerte op en stemmen we de uitvoering af.' },
  { nummer: '03', titel: 'Dakwerk uitvoeren', tekst: 'Zodra de constructie gereed is, voeren onze dakdekkers de afgesproken werkzaamheden uit volgens de projectspecificaties.' },
  { nummer: '04', titel: 'Controle & oplevering', tekst: 'Na afronding controleren we onze werkzaamheden en leveren we het dakgedeelte volgens de gemaakte afspraken op.' },
];

const toekomst = [
  { icon: Sun, titel: 'Zonnepanelen', tekst: 'Is het dak voorbereid op toekomstige plaatsing en onderhoud?' },
  { icon: Recycle, titel: 'Groendak', tekst: 'Moet de dakopbouw geschikt zijn voor toekomstige vergroening?' },
  { icon: Cable, titel: 'Installaties', tekst: 'Zijn toekomstige technische installaties of doorvoeren voorzien?' },
  { icon: Wrench, titel: 'Onderhoud', tekst: 'Blijven dakdelen en afvoeren goed bereikbaar voor inspectie en onderhoud?' },
];

const kostenFactoren = [
  'aantal vierkante meters',
  'type dakconstructie',
  'gewenste dakopbouw',
  'isolatiedikte',
  'gekozen dakbedekking',
  'aantal dakdetails',
  'doorvoeren en aansluitingen',
  'bereikbaarheid en projectplanning',
];

const faq = [
  { vraag: 'Werken jullie rechtstreeks voor aannemers?', antwoord: 'Ja. LK Dakwerken werkt zowel voor particuliere opdrachtgevers als voor aannemers en andere zakelijke opdrachtgevers.' },
  { vraag: 'Kunnen jullie meedenken voordat de bouw start?', antwoord: 'Ja. Wanneer tekeningen en projectspecificaties beschikbaar zijn, kunnen we onze werkzaamheden en dakopbouw vroegtijdig bespreken en afstemmen.' },
  { vraag: 'Welke informatie hebben jullie nodig voor een offerte?', antwoord: 'Bij voorkeur ontvangen we tekeningen, het dakoppervlak, de gewenste dakopbouw, technische omschrijving, projectlocatie en globale planning.' },
  { vraag: 'Welke dakbedekking gebruiken jullie voor nieuwbouw?', antwoord: 'Welke dakbedekking geschikt is, hangt af van het ontwerp en de projectspecificaties. LK Dakwerken is onder andere gespecialiseerd in bitumineuze dakbedekking voor platte en licht hellende daken.' },
  { vraag: 'Verzorgen jullie ook de dakisolatie?', antwoord: 'Wanneer dit onderdeel is van onze opdracht kunnen dakisolatie en dakbedekking gecombineerd worden in één dakopbouw.' },
  { vraag: 'Werken jullie volgens de geldende bouwregelgeving?', antwoord: 'Onze werkzaamheden worden uitgevoerd volgens de voor onze scope relevante geldende voorschriften, tekeningen en projectspecificaties. Voor nieuwbouw gelden onder andere de voorschriften uit het Besluit bouwwerken leefomgeving (Bbl).' },
  { vraag: 'Kunnen jullie een planning van een aannemer volgen?', antwoord: 'We stemmen de uitvoeringsperiode vooraf af op de bouwplanning. De definitieve uitvoering blijft onder andere afhankelijk van gereedheid van de ondergrond, bereikbaarheid en weersomstandigheden.' },
  { vraag: 'Werken jullie alleen in Rotterdam?', antwoord: 'LK Dakwerken is gevestigd in Rotterdam en voert werkzaamheden uit in Rotterdam en omliggende gebieden in Zuid-Holland.' },
];

const andereDiensten = [
  { slug: 'bitumen-daken', titel: 'Bitumen daken', tekst: 'Hoogwaardige bitumen dakbedekking voor platte en licht hellende daken.', knop: 'Bekijk bitumen daken', image: projectGroot('project-01') },
  { slug: 'renovatie', titel: 'Renovatie', tekst: 'Complete renovatie voor verouderde en beschadigde daken.', knop: 'Bekijk renovatie', image: projectGroot('project-08') },
  { slug: 'onderhoud', titel: 'Onderhoud', tekst: 'Onderhoud en periodieke controle om problemen vroegtijdig te signaleren.', knop: 'Bekijk onderhoud', image: projectGroot('project-05') },
  { slug: 'lekkage', titel: 'Lekkage', tekst: 'Daklekkage laten onderzoeken en professioneel herstellen.', knop: 'Bekijk lekkage', image: projectGroot('project-02') },
];

export default function NieuwbouwPage() {
  return (
    <>
      {/* 1. Hero — zelfde visuele systeem als Bitumen daken / Renovatie */}
      <PageHeader
        titel="Nieuwbouw"
        lead="Complete dakbedekking voor nieuwbouwprojecten. Van voorbereiding en materiaalkeuze tot uitvoering en oplevering. Wij realiseren complete daksystemen voor woningen, aanbouwen en bedrijfspanden en stemmen onze werkzaamheden af op de planning van uw bouwproject."
        imageSrc={foto('photo-1541976590-713941681591', 2000, 80)}
        imageAlt="Plat dak in aanleg op een nieuwbouwproject"
        compact
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Vraag een offerte aan</span>
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

      {/* 3. Intro: dakwerk als onderdeel van het bouwproject */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Van tekening tot dak</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Een nieuw dak begint al vóór de uitvoering.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Bij nieuwbouw is het dak onderdeel van een groter bouwproces. Een goede voorbereiding en afstemming
              zijn daarom minstens zo belangrijk als de uiteindelijke uitvoering.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              LK Dakwerken werkt voor particuliere opdrachtgevers, aannemers en andere professionele partijen. We
              kunnen waar nodig in een vroeg stadium meedenken over onder andere dakopbouw, dakbedekking, isolatie,
              aansluitingen, hemelwaterafvoer, doorvoeren, uitvoeringsvolgorde en planning.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Zo sluiten onze werkzaamheden zo goed mogelijk aan op de rest van het bouwproject.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={foto('photo-1590644365607-1c5e5a5c4c8e', 900, 78)}
              alt="Dak in ruwbouwfase tijdens een nieuwbouwproject"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 4. Voor wie we werken */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Voor particuliere én professionele nieuwbouw
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {doelgroepen.map((d, i) => (
              <Reveal key={d.titel} delay={i * 0.06} className="card card-hover p-8">
                <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <d.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink-900">{d.titel}</h3>
                <p className="mt-2.5 text-ink-500 leading-relaxed">{d.tekst}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10 text-center">
            <Link href="/offerte" className="btn-link justify-center">
              Bespreek uw nieuwbouwproject
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5. Van bouwtekening naar dakopbouw */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Voorbereiding</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van bouwtekening naar uitvoerbaar dak
            </h2>
            <p className="lead mt-5">
              Bij nieuwbouw ligt veel informatie al vast in tekeningen, technische omschrijvingen en
              projectspecificaties. Wij bekijken welke dakwerkzaamheden binnen onze scope vallen en stemmen de
              uitvoering waar nodig af met de opdrachtgever, aannemer en andere betrokken partijen.
            </p>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {voorbereiding.map((o, i) => (
              <Reveal key={o.nummer} delay={i * 0.06} className="card card-hover p-7">
                <span className="text-sm font-semibold text-blue-500 tabular-nums">{o.nummer}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{o.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{o.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Visuele dakopbouw */}
      <section className="section-pad bg-ink-950 text-white overflow-hidden">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Opbouw van het dak</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Elke laag heeft een functie.
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
              Voorbeeld van een mogelijke dakopbouw. De daadwerkelijke constructie wordt bepaald aan de hand van het
              ontwerp, de ondergrond, projectspecificaties en geldende eisen.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Type daken */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Daksystemen voor verschillende nieuwbouwprojecten
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {typeDaken.map((t, i) => (
              <Reveal key={t.titel} delay={i * 0.06} className="card card-hover p-7">
                <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <t.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{t.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{t.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Materiaalkeuze */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Materiaal & systeem</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Het juiste daksysteem voor het project
            </h2>
            <p className="lead mt-5">
              Niet ieder gebouw vraagt om dezelfde dakoplossing. De keuze voor dakbedekking hangt onder andere af
              van het ontwerp, de constructie, gewenste levensduur, isolatie, detaillering en toepassing van het
              gebouw. Onze expertise ligt bij hoogwaardige bitumineuze daksystemen voor platte en licht hellende
              daken.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-4">
            <Link href="/offerte" className="btn-link">
              Advies over de juiste dakopbouw
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 9. Technische details */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Een goed dak zit in de details.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techniekDetails.map((t, i) => (
              <Reveal key={t.titel} delay={(i % 6) * 0.05} className="card card-hover p-7">
                <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <t.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{t.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{t.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Regelgeving */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal className="text-center">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Bouwen volgens de geldende eisen</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Nieuwbouw vraagt om een correcte uitvoering.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed max-w-2xl mx-auto">
              Voor nieuwbouw gelden wettelijke en projectspecifieke eisen. De landelijke bouwtechnische voorschriften
              zijn vastgelegd in het Besluit bouwwerken leefomgeving (Bbl). Bij onze werkzaamheden houden we binnen
              onze scope rekening met de geldende tekeningen, technische omschrijvingen en projectspecificaties.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-2xl mx-auto">
              Wanneer constructieve, bouwfysische of andere specialistische berekeningen nodig zijn, blijven deze
              onderdeel van de daarvoor verantwoordelijke ontwerpende of adviserende partij.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 11. Bouwplanning */}
      <section className="section-pad bg-ink-950 text-white overflow-hidden">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Bouwplanning</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Op een bouwplaats moet alles op elkaar aansluiten.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-xl">
              Bij nieuwbouw zijn verschillende vakdisciplines van elkaar afhankelijk. Daarom stemmen we vooraf af
              wanneer de dakconstructie gereed is en wanneer onze werkzaamheden kunnen starten.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
              We houden waar mogelijk rekening met bouwplanning, materiaalbeschikbaarheid, andere vakdisciplines,
              weersomstandigheden, bereikbaarheid, benodigde hijs- of transportvoorzieningen en afgesproken
              oplevermomenten.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              Goede voorbereiding voorkomt vertraging tijdens de uitvoering.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <span className="w-14 h-14 rounded-button-inner bg-blue-500 text-white flex items-center justify-center">
              <CalendarClock className="w-6 h-6" aria-hidden="true" />
            </span>
          </Reveal>
        </div>
      </section>

      {/* 12. Werkwijze */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Onze werkwijze</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van aanvraag tot oplevering
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
        </div>
      </section>

      {/* 13. Isolatie */}
      <section className="section-pad bg-blue-50/60">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Energieprestatie</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Goede isolatie begint bij het ontwerp.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed max-w-xl">
              Bij een nieuw gebouw vormt dakisolatie een belangrijk onderdeel van de thermische schil. De juiste
              dakopbouw en isolatie worden daarom al tijdens de voorbereiding afgestemd op het ontwerp en de
              projectspecificaties.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-xl">
              Een goed uitgewerkt dak voorkomt dat later kostbare aanpassingen nodig zijn.
            </p>
            <Link href="/offerte" className="btn-link mt-6">
              Bespreek uw dakopbouw
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 14. Toekomstbestendig dak */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Denk vandaag al aan het dak van morgen.
            </h2>
            <p className="lead mt-5">
              Een nieuwbouwdak kan tientallen jaren onderdeel blijven van het gebouw. Daarom is het verstandig om
              bij het ontwerp ook rekening te houden met toekomstige wensen.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {toekomst.map((t, i) => (
              <Reveal key={t.titel} delay={i * 0.06} className="card card-hover p-7">
                <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <t.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{t.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{t.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Projecten — geen echte, toestemming-gedekte nieuwbouwprojectgegevens
          beschikbaar, sectie bewust weggelaten tot er echt materiaal is. */}

      {/* 16. Kosten / projectofferte */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Kosten</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Wat kost dakwerk bij nieuwbouw?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              De kosten van een nieuwbouwdak hangen af van het ontwerp en de technische specificaties van het
              project. Onder andere deze onderdelen hebben invloed:
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
              Voor een goede prijsopgave ontvangen we bij voorkeur zoveel mogelijk projectinformatie en tekeningen.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <div className="panel p-8">
              <h3 className="text-display text-xl tracking-[-0.02em] text-ink-900">Vraag een projectofferte aan</h3>
              <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">
                Heeft u tekeningen of een technische omschrijving? Voeg deze indien mogelijk direct toe aan uw
                aanvraag.
              </p>
              <Link href="/offerte?dienst=nieuwbouw" className="btn-pill mt-6 w-full justify-between">
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

      {/* 17. Vakmanschap */}
      <section className="relative section-pad bg-white overflow-hidden">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={foto(fotos.werkwijze, 1600, 75)}
              alt="Dakdekker tijdens uitvoering op een nieuwbouwproject"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/20" />
            <Reveal className="relative p-10 md:p-16 max-w-xl">
              <span className="text-sm font-semibold text-blue-300 tracking-wide uppercase">Vakmanschap</span>
              <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Een nieuw dak goed bouwen begint bij aandacht voor ieder detail.
              </h2>
              <p className="mt-5 text-white/85 leading-relaxed">
                Van voorbereiding en isolatie tot de laatste dakrand en doorvoer: ieder onderdeel moet aansluiten op
                de rest van het gebouw. Daarom werken we zorgvuldig en houden we tijdens de uitvoering rekening met
                de gemaakte afspraken en projectspecificaties.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 18. FAQ */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde vragen over nieuwbouw
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

      {/* 19. Subsidies — klein aanvullend blok, geen hoofd-CTA */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <SubsidieCTA />
        </div>
      </section>

      {/* 20. Andere diensten */}
      <section className="section-pad bg-paper-50">
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

      {/* 21. Eind-CTA */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Een nieuwbouwproject in voorbereiding?
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
              Bespreek de dakwerkzaamheden vroegtijdig met ons. Stuur uw projectgegevens of tekeningen mee en
              ontvang een passende offerte.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/offerte?dienst=nieuwbouw" className="btn-pill">
                <span className="label">Vraag een projectofferte aan</span>
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
            serviceType: 'Dakwerk nieuwbouw',
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
              { '@type': 'ListItem', position: 3, name: 'Nieuwbouw', item: '/diensten/nieuwbouw' },
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
