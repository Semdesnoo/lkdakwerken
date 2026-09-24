import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Search,
  Sparkles,
  Wrench,
  Layers,
  Link2,
  PanelTop,
  Droplets,
  Cable,
  Waves,
  Trash2,
  AlertTriangle,
  Home as HomeIcon,
  Building2,
  RefreshCcw,
  FileCheck2,
  Plus,
} from 'lucide-react';
import { bedrijf, fotos } from '@/lib/data';
import { foto, projectGroot } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { SubsidieCTA } from '@/components/SubsidieCTA';

export const metadata: Metadata = {
  title: 'Dakonderhoud Rotterdam | Inspectie & Onderhoud | LK Dakwerken',
  description:
    'Plat dak laten onderhouden? LK Dakwerken verzorgt dakinspecties, reiniging en periodiek onderhoud voor woningen en bedrijfspanden in Rotterdam en Zuid-Holland.',
  alternates: { canonical: '/diensten/onderhoud' },
};

const trustPunten = [
  'Periodieke dakinspectie',
  'Duidelijke rapportage',
  'Preventief onderhoud',
  'Particulier & zakelijk',
];

const checklist = [
  { icon: Layers, titel: 'Dakbedekking', tekst: 'Controle op zichtbare slijtage, scheuren, beschadigingen en andere afwijkingen.' },
  { icon: Link2, titel: 'Naden & overlappen', tekst: 'Controle van verbindingen en naden in de dakbedekking.' },
  { icon: PanelTop, titel: 'Dakranden', tekst: 'Inspectie van daktrimmen, opstanden en aansluitingen.' },
  { icon: Droplets, titel: 'Hemelwaterafvoer', tekst: 'Controle van afvoerpunten en hemelwaterafvoer op vervuiling of blokkades.' },
  { icon: Cable, titel: 'Doorvoeren', tekst: 'Controle van aansluitingen rondom leidingen, ventilatie en andere dakdoorvoeren.' },
  { icon: Waves, titel: 'Plasvorming', tekst: 'We bekijken of er opvallend veel water op bepaalde delen van het dak blijft staan.' },
  { icon: Trash2, titel: 'Vervuiling', tekst: 'Bladeren, mos, vuil en andere vervuiling kunnen waar nodig worden verwijderd.' },
  { icon: AlertTriangle, titel: 'Zichtbare beschadigingen', tekst: 'Kleine beschadigingen en aandachtspunten worden geregistreerd.' },
];

const onderdelen = [
  { icon: Search, titel: 'Inspecteren', sub: 'Problemen vroeg herkennen', tekst: 'We bekijken de zichtbare staat van het dak en brengen aandachtspunten in kaart.' },
  { icon: Sparkles, titel: 'Reinigen', sub: 'Dak en afvoeren vrijhouden', tekst: 'Waar onderdeel van de opdracht reinigen we relevante delen van het dak en verwijderen we vervuiling rond afvoeren.' },
  { icon: Wrench, titel: 'Herstellen', sub: 'Kleine gebreken aanpakken', tekst: 'Wanneer kleine herstelwerkzaamheden onderdeel zijn van het gekozen onderhoudspakket, kunnen deze direct worden uitgevoerd.' },
];

const contractInhoud = [
  'Periodieke inspectie',
  'Controle van dakbedekking',
  'Controle van aansluitingen en doorvoeren',
  'Controle van hemelwaterafvoer',
  'Reiniging van relevante dakdelen',
  'Onderhoudsrapportage',
  'Advies over noodzakelijke herstelwerkzaamheden',
];

const rapportPunten = [
  'Geconstateerde aandachtspunten',
  "Foto's van relevante dakdelen",
  'Beoordeling van zichtbare gebreken',
  'Advies over onderhoud',
  'Advies over mogelijke reparaties',
  'Indicatie of verdere inspectie nodig is',
];

const cyclus = ['Inspectie', 'Rapportage', 'Onderhoud', 'Eventueel herstel', 'Volgend controlemoment'];

const werkwijze = [
  { nummer: '01', titel: 'Afspraak maken', tekst: 'We bespreken het dak, eventuele bekende aandachtspunten en het gewenste type inspectie of onderhoud.' },
  { nummer: '02', titel: 'Dak controleren', tekst: 'We inspecteren de relevante dakdelen en controleren onder andere dakbedekking, aansluitingen en afvoeren.' },
  { nummer: '03', titel: 'Onderhoud uitvoeren', tekst: 'Waar afgesproken voeren we reiniging en eventuele kleine onderhoudswerkzaamheden uit.' },
  { nummer: '04', titel: 'Terugkoppeling', tekst: 'U krijgt duidelijk te horen hoe het dak ervoor staat en welke eventuele vervolgwerkzaamheden worden geadviseerd.' },
];

const kostenFactoren = [
  'grootte van het dak',
  'bereikbaarheid',
  'type dakbedekking',
  'huidige staat',
  'hoeveelheid vervuiling',
  'gewenste inspectiefrequentie',
  'benodigde reiniging',
  'eenmalig of periodiek onderhoud',
];

const faq = [
  { vraag: 'Hoe vaak moet een plat dak worden geïnspecteerd?', antwoord: 'Dat hangt af van het type dak, de leeftijd, conditie, omgeving en het gebruik van het gebouw. Periodieke controle kan helpen om veranderingen en mogelijke gebreken tijdig te herkennen.' },
  { vraag: 'Wat controleren jullie tijdens dakonderhoud?', antwoord: 'Onder andere de zichtbare staat van de dakbedekking, naden, dakranden, afvoeren, opstanden, doorvoeren en eventuele vervuiling.' },
  { vraag: 'Worden dakgoten en afvoeren ook schoongemaakt?', antwoord: 'Wanneer reiniging onderdeel is van de afgesproken onderhoudswerkzaamheden kunnen goten, afvoerpunten en relevante dakdelen worden gereinigd.' },
  { vraag: 'Voeren jullie kleine reparaties direct uit?', antwoord: 'Dat hangt af van het soort gebrek en de gemaakte afspraken. Kleine herstelpunten kunnen in sommige gevallen direct worden uitgevoerd. Voor grotere reparaties ontvangt u eerst advies of een aparte offerte.' },
  { vraag: 'Kan ik een onderhoudscontract afsluiten?', antwoord: 'Wanneer LK Dakwerken onderhoudscontracten aanbiedt, kunnen periodieke inspectie en onderhoud volgens vaste afspraken worden ingepland. De exacte inhoud wordt afgestemd op het dak en de opdrachtgever.' },
  { vraag: 'Is onderhoud ook nodig bij een nieuw dak?', antwoord: 'Ja, ook een nieuw dak kan vervuild raken of beschadigd worden. Periodieke inspectie helpt om de actuele conditie van het dak te blijven volgen.' },
  { vraag: 'Onderhouden jullie ook bedrijfspanden?', antwoord: 'Ja. Onderhoud kan worden uitgevoerd voor zowel particuliere als zakelijke daken.' },
  { vraag: 'Wat als jullie tijdens onderhoud een groot probleem vinden?', antwoord: 'We bespreken wat is geconstateerd en welke vervolgwerkzaamheden worden geadviseerd. Voor grotere reparaties of renovatie kan een aparte offerte worden opgesteld.' },
];

const andereDiensten = [
  { slug: 'bitumen-daken', titel: 'Bitumen daken', tekst: 'Hoogwaardige bitumen dakbedekking voor platte en licht hellende daken.', knop: 'Bekijk bitumen daken', image: projectGroot('project-01') },
  { slug: 'renovatie', titel: 'Renovatie', tekst: 'Complete dakrenovatie voor verouderde of beschadigde daken.', knop: 'Bekijk renovatie', image: projectGroot('project-08') },
  { slug: 'nieuwbouw', titel: 'Nieuwbouw', tekst: 'Complete dakbedekking voor nieuwe woningen en bouwprojecten.', knop: 'Bekijk nieuwbouw', image: foto('photo-1541976590-713941681591', 600, 75) },
  { slug: 'lekkage', titel: 'Lekkage', tekst: 'Heeft u al een lekkage? Laat de oorzaak onderzoeken en herstellen.', knop: 'Bekijk lekkage', image: projectGroot('project-02') },
];

export default function OnderhoudPage() {
  return (
    <>
      {/* 1. Hero — zelfde visuele systeem als de andere dienstpagina's */}
      <PageHeader
        titel="Onderhoud"
        lead="Periodiek dakonderhoud helpt gebreken vroegtijdig te herkennen en voorkomt dat kleine problemen onnodig groter worden. LK Dakwerken inspecteert, reinigt en onderhoudt platte daken voor particuliere en zakelijke opdrachtgevers."
        imageSrc={projectGroot('project-05')}
        imageAlt="Dakdekker inspecteert een plat dak"
        compact
      >
        <Link href="/offerte?dienst=onderhoud" className="btn-pill">
          <span className="label">Plan een dakinspectie</span>
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

      {/* 3. Waarom dakonderhoud */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Voorkom verrassingen</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Een dak verdient aandacht voordat er problemen ontstaan.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Een plat dak krijgt het hele jaar te maken met regen, wind, temperatuurverschillen, vuil en andere
              weersinvloeden. Kleine beschadigingen, verstopte afvoeren of verouderde aansluitingen vallen vanaf de
              grond vaak niet op.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Door een dak periodiek te controleren kunnen mogelijke aandachtspunten eerder worden ontdekt en waar
              nodig worden hersteld voordat ze zich verder ontwikkelen. Regelmatig onderhoud kan bovendien
              bijdragen aan het behoud van de technische staat en levensduur van de dakbedekking.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={projectGroot('project-08')}
              alt="Onderhoud aan een plat dak"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 4. Wat controleren we */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Dakinspectie</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              We kijken verder dan alleen de dakbedekking.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {checklist.map((c, i) => (
              <Reveal key={c.titel} delay={(i % 4) * 0.06} className="card card-hover p-6">
                <span className="w-10 h-10 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <c.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{c.titel}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{c.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Onderhoud in 3 onderdelen */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Een onderhoudsbeurt van rand tot afvoer
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {onderdelen.map((o, i) => (
              <Reveal key={o.titel} delay={i * 0.06} className="card card-hover p-8">
                <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <o.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink-900">{o.titel}</h3>
                <p className="mt-1.5 text-sm font-medium text-blue-500">{o.sub}</p>
                <p className="mt-3 text-ink-500 leading-relaxed">{o.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Onderhoudscontracten */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Periodiek onderhoud</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Niet steeds opnieuw eraan hoeven denken.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed max-w-xl">
              Voor daken die periodiek gecontroleerd moeten worden kan een onderhoudsafspraak interessant zijn.
              Afhankelijk van de afspraken kan dit bijvoorbeeld bestaan uit:
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {contractInhoud.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
            <Link href="/offerte?dienst=onderhoud" className="btn-link mt-7">
              Vraag naar onderhoudsmogelijkheden
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7. Rapportage — donkere sectie met mock-up */}
      <section className="section-pad bg-ink-950 text-white overflow-hidden">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Duidelijk in beeld</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-balance">
              Weten hoe uw dak ervoor staat.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-lg">
              Na een uitgebreide inspectie kan LK Dakwerken de belangrijkste bevindingen overzichtelijk
              terugkoppelen. Denk bijvoorbeeld aan:
            </p>
            <ul className="mt-6 space-y-2.5">
              {rapportPunten.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6">
            <div className="rounded-3xl bg-white text-ink-900 p-7">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-blue-500" aria-hidden="true" />
                <h3 className="font-semibold">Dakinspectierapport</h3>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-paper-200 pb-3">
                  <span className="text-ink-600">Dakbedekking</span>
                  <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium">✓ In orde</span>
                </div>
                <div className="flex items-center justify-between border-b border-paper-200 pb-3">
                  <span className="text-ink-600">Hemelwaterafvoer</span>
                  <span className="inline-flex items-center gap-1.5 text-amber-600 font-medium">! Aandachtspunt</span>
                </div>
                <div className="flex items-center justify-between border-b border-paper-200 pb-3">
                  <span className="text-ink-600">Dakrand zuidzijde</span>
                  <span className="inline-flex items-center gap-1.5 text-red-600 font-medium">✕ Herstel aanbevolen</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-ink-600">Doorvoeren</span>
                  <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium">✓ In orde</span>
                </div>
              </div>
              <p className="mt-5 text-xs text-ink-400">Voorbeeldweergave, geen echte klantgegevens.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Particulier & zakelijk */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Voor woningen</h3>
              <p className="mt-2 text-blue-500 font-medium">Uw dak periodiek laten controleren</p>
              <p className="mt-3 text-ink-600 leading-relaxed">
                Voor platte daken van woningen, aanbouwen, uitbouwen, garages en andere particuliere objecten.
              </p>
              <Link href="/offerte?dienst=onderhoud" className="btn-link mt-6">
                Onderhoud woning aanvragen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Voor bedrijven & vastgoed</h3>
              <p className="mt-2 text-blue-500 font-medium">Grip op onderhoud van uw daken</p>
              <p className="mt-3 text-ink-600 leading-relaxed">
                Periodieke controle kan interessant zijn voor bedrijfspanden, vastgoedobjecten en locaties waarbij
                dakproblemen vroegtijdig moeten worden gesignaleerd.
              </p>
              <Link href="/offerte?dienst=onderhoud" className="btn-link mt-6">
                Zakelijk onderhoud bespreken
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. Onderhoudscyclus */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Periodiek controleren</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Onderhoud als vast onderdeel van uw gebouwbeheer
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paper-300 to-transparent"
            />
            {cyclus.map((stap, i) => (
              <Reveal key={stap} delay={i * 0.07} className="relative">
                <span className="relative z-10 inline-flex w-12 h-12 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{stap}</h3>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-ink-600 max-w-2xl">
            De exacte frequentie wordt afgestemd op type dak, leeftijd, conditie, omgeving, gebruik van het gebouw
            en eerdere gebreken. Voor veel daken kan een periodieke controle verstandig zijn — de geschikte
            frequentie hangt af van de situatie.
          </p>
        </div>
      </section>

      {/* 10. Onderhoud of reparatie? */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Onderhoud nodig of is er al een probleem?
            </h2>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8 md:p-10">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink-900">Preventief onderhoud</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">Geschikt wanneer:</p>
              <ul className="mt-4 space-y-2.5">
                {['Er nog geen lekkage is', 'U de technische staat wilt laten controleren', 'U problemen vroeg wilt herkennen', 'Afvoeren of dakdelen gereinigd moeten worden'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
              <Link href="/offerte?dienst=onderhoud" className="btn-link mt-6">
                Onderhoud aanvragen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="card p-8 md:p-10 border-2 border-blue-200">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink-900">Lekkage / reparatie</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">Geschikt wanneer:</p>
              <ul className="mt-4 space-y-2.5">
                {['Er al vocht binnenkomt', 'Er actieve lekkage is', 'Dakbedekking zichtbaar beschadigd is', 'Een spoedreparatie nodig lijkt'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
              <Link href="/diensten/lekkage" className="btn-link mt-6">
                Bekijk lekkage
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-ink-400 max-w-2xl">
            Bij acute lekkage: ga direct naar Lekkage, niet naar regulier Onderhoud.
          </p>
        </div>
      </section>

      {/* 11. Werkwijze */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Onze werkwijze</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van dakinspectie tot onderhoudsadvies
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
            <Link href="/offerte?dienst=onderhoud" className="btn-link justify-center">
              Plan een dakinspectie
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 12. Kosten */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Kosten</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Wat kost dakonderhoud?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">De kosten hangen af van onder andere:</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {kostenFactoren.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" />
                  <span className="capitalize">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Daarom stellen we onderhoud bij voorkeur af op het daadwerkelijke dak en de gewenste werkzaamheden.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <div className="panel p-8">
              <h3 className="text-display text-xl tracking-[-0.02em] text-ink-900">Vraag een onderhoudsofferte aan</h3>
              <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">
                Na een gratis inspectie weet u precies waar uw dak aan toe is.
              </p>
              <Link href="/offerte?dienst=onderhoud" className="btn-pill mt-6 w-full justify-between">
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

      {/* 13. Preventieblok — donkere sectie */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight">
          <Reveal className="text-center">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Preventief onderhoud</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Een klein aandachtspunt is meestal makkelijker aan te pakken dan een groot probleem.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed max-w-2xl mx-auto">
              Een verstopping, beschadigde aansluiting of kleine afwijking hoeft niet direct tot lekkage te leiden.
              Wanneer zulke punten vroeg worden ontdekt, kan vaak eerder worden ingegrepen. Periodiek dakonderhoud
              geeft daardoor meer inzicht in de staat van het dak en helpt het risico op onverwachte problemen te
              verkleinen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 14. Onderhoud na renovatie of nieuwbouw */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-2xl md:text-3xl tracking-[-0.02em] text-ink-900 text-balance">
              Ook een nieuw dak heeft onderhoud nodig.
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-2xl mx-auto">
              Een nieuw of recent gerenoveerd dak is niet automatisch onderhoudsvrij. Door het dak ook na oplevering
              periodiek te controleren, kunnen vervuiling, beschadigingen of veranderingen aan het dak tijdig
              worden opgemerkt.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link href="/diensten/renovatie" className="btn-link justify-center">
                Bekijk renovatie
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/diensten/nieuwbouw" className="btn-link justify-center">
                Bekijk nieuwbouw
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 15. Verduurzaming — klein aanvullend blok */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <SubsidieCTA />
        </div>
      </section>

      {/* 16. Vakmanschap */}
      <section className="relative section-pad bg-white overflow-hidden">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={foto(fotos.werkwijze, 1600, 75)}
              alt="Dakdekker inspecteert een aansluiting op een plat dak"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/20" />
            <Reveal className="relative p-10 md:p-16 max-w-xl">
              <span className="text-sm font-semibold text-blue-300 tracking-wide uppercase">Aandacht voor uw dak</span>
              <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Goed onderhoud begint met goed kijken.
              </h2>
              <p className="mt-5 text-white/85 leading-relaxed">
                Veel dakproblemen beginnen klein. Daarom kijken we bij onderhoud niet alleen naar het oppervlak,
                maar besteden we ook aandacht aan naden, aansluitingen, afvoeren, doorvoeren en andere kwetsbare
                details. Zo ontstaat een beter beeld van de actuele staat van het dak.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 17. FAQ */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde vragen over dakonderhoud
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

      {/* 18. Andere diensten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
              Ook voor deze vakgebieden
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

      {/* 19. Eind-CTA */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Wanneer is uw dak voor het laatst gecontroleerd?
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
              Laat uw dak inspecteren en krijg duidelijk inzicht in de huidige staat en eventuele onderhoudspunten.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/offerte?dienst=onderhoud" className="btn-pill">
                <span className="label">Plan een dakinspectie</span>
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
            serviceType: 'Dakonderhoud',
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
              { '@type': 'ListItem', position: 3, name: 'Onderhoud', item: '/diensten/onderhoud' },
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
