import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Droplet,
  Link2,
  PanelTop,
  Cable,
  Waves,
  ShieldAlert,
  Wrench,
  Camera,
  FileText,
  Home as HomeIcon,
  Building2,
  MessageCircle,
  Plus,
} from 'lucide-react';
import { bedrijf } from '@/lib/data';
import { foto, projectGroot } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Daklekkage Rotterdam | Dak Laten Repareren | LK Dakwerken',
  description:
    'Last van daklekkage? LK Dakwerken onderzoekt de oorzaak en verzorgt nood- en dakreparaties voor platte daken in Rotterdam en Zuid-Holland.',
  alternates: { canonical: '/diensten/lekkage' },
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '316****5678';
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hallo LK Dakwerken, ik heb een daklekkage en wil graag de situatie laten beoordelen.'
)}`;

const trustPunten = ['7 dagen bereikbaar', 'Snelle beoordeling', 'Noodherstel mogelijk', 'Duidelijke afspraken'];

const directStappen = [
  { nummer: '01', titel: 'Beperk binnenschade', tekst: 'Plaats indien veilig mogelijk een emmer of opvangbak onder het lekkende gedeelte.' },
  { nummer: '02', titel: 'Houd water weg van elektra', tekst: 'Komt water in de buurt van stopcontacten of verlichting? Neem geen risico en schakel waar nodig professionele hulp in.' },
  { nummer: '03', titel: "Maak foto's", tekst: "Maak foto's van de zichtbare lekkage en eventuele schade. Dit helpt ons om vooraf een eerste beeld te krijgen." },
  { nummer: '04', titel: 'Neem contact op', tekst: 'Bel LK Dakwerken en leg kort uit waar de lekkage zichtbaar is en om welk type dak het gaat.' },
];

const oorzaken = [
  { titel: 'Beschadigde dakbedekking', tekst: 'Scheuren, perforaties of verouderde delen kunnen vocht doorlaten.' },
  { titel: 'Loslatende naden', tekst: 'Verbindingen tussen banen dakbedekking kunnen na verloop van tijd beschadigd raken.' },
  { titel: 'Dakdoorvoeren', tekst: 'Aansluitingen rondom ventilatie, leidingen en andere doorvoeren zijn kwetsbare punten.' },
  { titel: 'Dakranden en opstanden', tekst: 'Problemen rond randen, aansluitingen en opstanden kunnen lekkage veroorzaken.' },
  { titel: 'Verstopte afvoer', tekst: 'Water dat niet goed kan worden afgevoerd kan zich op het dak ophopen.' },
  { titel: 'Verouderd dak', tekst: 'Bij sterk verouderde dakbedekking kunnen meerdere zwakke plekken tegelijk ontstaan.' },
];

const werkwijze = [
  { nummer: '01', titel: 'Contact & eerste beoordeling', tekst: "U vertelt waar de lekkage zichtbaar is en om welk type dak of gebouw het gaat. Foto's kunnen helpen om vooraf een eerste indruk te krijgen." },
  { nummer: '02', titel: 'Lekkage onderzoeken', tekst: 'We bekijken het dak en zoeken naar mogelijke oorzaken van de lekkage.' },
  { nummer: '03', titel: 'Schade beperken & herstellen', tekst: 'Afhankelijk van de situatie voeren we een tijdelijke noodreparatie of direct een passende reparatie uit.' },
  { nummer: '04', titel: 'Structureel advies', tekst: 'Wanneer meer werkzaamheden nodig zijn, bespreken we duidelijk welke vervolgstappen worden geadviseerd.' },
];

const kostenFactoren = [
  'bereikbaarheid van het dak',
  'locatie van de lekkage',
  'tijd om de oorzaak te vinden',
  'type dakbedekking',
  'omvang van de beschadiging',
  'noodreparatie of definitief herstel',
  'benodigde materialen',
  'eventuele vervolgwerkzaamheden',
];

const faq = [
  { vraag: 'Wat moet ik doen als mijn dak lekt?', antwoord: "Probeer binnenschade veilig te beperken, houd water weg van elektrische installaties, maak foto's van de situatie en neem bij een actieve lekkage telefonisch contact op." },
  { vraag: 'Hoe snel kunnen jullie komen?', antwoord: 'Dit hangt af van locatie, planning, weersomstandigheden en urgentie. Bij actieve lekkage proberen we zo snel mogelijk te beoordelen wat mogelijk is.' },
  { vraag: 'Kunnen jullie direct een noodreparatie uitvoeren?', antwoord: 'Wanneer de situatie, veiligheid en weersomstandigheden dit toelaten, kan een tijdelijke noodreparatie mogelijk zijn. Soms is aanvullende voorbereiding nodig voor definitief herstel.' },
  { vraag: 'Hoe vinden jullie waar de lekkage vandaan komt?', antwoord: 'We controleren mogelijke zwakke plekken zoals dakbedekking, naden, afvoeren, doorvoeren en aansluitingen. De plek waar het water binnen zichtbaar wordt hoeft niet de daadwerkelijke oorzaak op het dak te zijn.' },
  { vraag: 'Wat kost het herstellen van een lekkage?', antwoord: 'Dat hangt af van de oorzaak, omvang, bereikbaarheid en benodigde reparatie. Daarom kan pas na beoordeling beter worden ingeschat welke werkzaamheden nodig zijn.' },
  { vraag: 'Is een lekkage altijd te repareren?', antwoord: 'Niet altijd met een kleine plaatselijke reparatie. Bij sterk verouderde of op meerdere plaatsen beschadigde dakbedekking kan renovatie technisch verstandiger zijn.' },
  { vraag: 'Werken jullie ook in het weekend?', antwoord: 'Voor lekkagemeldingen zijn wij 7 dagen per week bereikbaar. Beschikbaarheid voor uitvoering wordt per situatie bekeken.' },
  { vraag: 'Werken jullie ook voor bedrijven?', antwoord: 'Ja. LK Dakwerken helpt zowel particuliere als zakelijke opdrachtgevers bij daklekkages.' },
];

const andereDiensten = [
  { slug: 'bitumen-daken', titel: 'Bitumen daken', tekst: 'Hoogwaardige bitumen dakbedekking voor platte en licht hellende daken.', knop: 'Bekijk bitumen daken', image: projectGroot('project-01') },
  { slug: 'renovatie', titel: 'Renovatie', tekst: 'Bij een sterk verouderd dak kan volledige renovatie een betere oplossing zijn.', knop: 'Bekijk renovatie', image: projectGroot('project-08') },
  { slug: 'nieuwbouw', titel: 'Nieuwbouw', tekst: 'Complete dakbedekking voor nieuwbouwprojecten.', knop: 'Bekijk nieuwbouw', image: foto('photo-1541976590-713941681591', 600, 75) },
  { slug: 'onderhoud', titel: 'Onderhoud', tekst: 'Laat uw dak periodiek controleren om aandachtspunten eerder te herkennen.', knop: 'Bekijk onderhoud', image: projectGroot('project-05') },
];

export default function LekkagePage() {
  return (
    <>
      {/* 1. Hero — zelfde visuele systeem, primaire CTA is bellen */}
      <PageHeader
        titel="Lekkage"
        lead="Daklekkage vraagt om snel handelen. Wij onderzoeken de oorzaak, beperken waar mogelijk verdere schade en zorgen voor een passende reparatie. Voor urgente lekkages kunt u ons direct bellen."
        imageSrc={foto('photo-1784009198441-fce45ab9d268', 2000, 80)}
        imageAlt="Dakdekker onderzoekt een beschadigde aansluiting op een plat dak"
        compact
      >
        <a href="tel:0102713824" className="btn-pill">
          <span className="label">Bel direct: 010 - 271 38 24</span>
          <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
        </a>
        <Link href="/offerte?dienst=lekkage" className="btn-ghost-invert">
          Lekkage melden
        </Link>
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

      {/* 3. Direct actieblok — uniek, direct na trustbar */}
      <section className="section-pad bg-blue-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Heeft u nu lekkage?</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Dit kunt u direct doen
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {directStappen.map((s) => (
              <div key={s.nummer} className="card p-6">
                <span className="inline-flex w-9 h-9 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold tabular-nums">
                  {s.nummer}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{s.titel}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{s.tekst}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="tel:0102713824" className="btn-pill justify-center inline-flex">
              <span className="label">Bel 010 - 271 38 24</span>
              <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
            </a>
            <p className="mt-4 text-sm text-ink-500">
              Bij acute lekkage adviseren we telefonisch contact in plaats van alleen een regulier offerteformulier.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Wat wij doen */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-6">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Van lekkage naar oplossing</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Eerst de oorzaak vinden, daarna herstellen.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              De plek waar water binnenkomt is niet altijd dezelfde plek waar het dak daadwerkelijk beschadigd is.
              Water kan zich onder of door delen van de dakconstructie verplaatsen voordat het binnen zichtbaar
              wordt. Daarom beginnen we bij een lekkage met het beoordelen van het dak en mogelijke oorzaken.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6">
            <p className="text-sm font-medium text-ink-500 mb-4">Afhankelijk van de situatie kunnen we vervolgens:</p>
            <ul className="space-y-2.5">
              {['De lekkage lokaliseren', 'Zichtbare beschadigingen beoordelen', 'Zwakke naden of aansluitingen controleren', 'Afvoeren inspecteren', 'Een tijdelijke noodreparatie uitvoeren', 'Een structurele reparatie adviseren of uitvoeren', 'Beoordelen of grotere renovatie nodig is'].map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. Veelvoorkomende oorzaken */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Veelvoorkomende oorzaken van daklekkage
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {oorzaken.map((o, i) => (
              <Reveal key={o.titel} delay={(i % 3) * 0.06} className="card card-hover p-6">
                <span className="w-10 h-10 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Droplet className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{o.titel}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{o.tekst}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-500 max-w-2xl">
            Niet zichtbaar waar het water vandaan komt? Dat is normaal. De zichtbare lekkage binnen zegt niet altijd
            waar het probleem op het dak zit.
          </p>
        </div>
      </section>

      {/* 6. Kwetsbare punten (visueel dakdiagram, vereenvoudigd als lijst met iconen) */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Kwetsbare punten op een plat dak
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Waves, titel: 'Hemelwaterafvoer', tekst: 'Afvoerpunt op vervuiling of blokkades.' },
              { icon: PanelTop, titel: 'Dakrand', tekst: 'Daktrim, opstand en aansluiting.' },
              { icon: Cable, titel: 'Doorvoer', tekst: 'Aansluiting rondom leidingen of ventilatie.' },
              { icon: Link2, titel: 'Naad', tekst: 'Verbinding tussen banen dakbedekking.' },
            ].map((h) => (
              <div key={h.titel} className="card p-6">
                <span className="w-10 h-10 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <h.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{h.titel}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{h.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Noodreparatie of structureel herstel */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Tijdelijk of definitief?</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Een noodreparatie is niet altijd de eindoplossing.
            </h2>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Noodreparatie</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">
                Bedoeld om de situatie waar mogelijk tijdelijk onder controle te krijgen en verdere waterinwerking te
                beperken. Kan bijvoorbeeld relevant zijn wanneer direct definitief herstel niet mogelijk is of
                weersomstandigheden dit verhinderen.
              </p>
              <Link href="/offerte?dienst=lekkage" className="btn-link mt-6">
                Lekkage direct melden
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Wrench className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Structurele reparatie</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">
                Daarna bekijken we welke permanente oplossing nodig is: beschadigde dakbedekking herstellen, naden
                opnieuw afdichten, een aansluiting vernieuwen of een dakdeel vervangen.
              </p>
              <Link href="/offerte?dienst=lekkage" className="btn-link mt-6">
                Vraag hersteladvies aan
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Repareren of renoveren */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-4">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Is een reparatie voldoende?
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Bij een relatief jong dak met één lokale beschadiging kan een reparatie voldoende zijn. Wanneer een
              dak sterk verouderd is, meerdere zwakke plekken heeft of regelmatig opnieuw lekkage vertoont, kan het
              verstandiger zijn om naar renovatie te kijken.
            </p>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8">
              <h3 className="text-xl font-semibold text-ink-900">Lokale reparatie</h3>
              <p className="mt-2 text-sm text-ink-500">Interessant bij:</p>
              <ul className="mt-4 space-y-2.5">
                {['Eén duidelijk defect', 'Lokale beschadiging', 'Relatief goede algemene dakconditie', 'Incidentele lekkage'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05} className="card p-8">
              <h3 className="text-xl font-semibold text-ink-900">Renovatie</h3>
              <p className="mt-2 text-sm text-ink-500">Kan interessanter zijn bij:</p>
              <ul className="mt-4 space-y-2.5">
                {['Sterk verouderde dakbedekking', 'Meerdere gebreken', 'Terugkerende lekkage', 'Wens om direct isolatie mee te nemen'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
              <Link href="/diensten/renovatie" className="btn-link mt-6">
                Bekijk dakrenovatie
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-ink-400">
            Tijdens inspectie beoordelen we welke oplossing technisch het meest passend is.
          </p>
        </div>
      </section>

      {/* 9. Werkwijze */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Onze aanpak</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van melding tot herstel
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
            <Link href="/offerte?dienst=lekkage" className="btn-link justify-center">
              Meld uw lekkage
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 10. Foto's meesturen / WhatsApp */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Handig vooraf</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Stuur foto's van de lekkage mee
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed max-w-xl">
              Foto's van de zichtbare lekkage en, indien veilig mogelijk, van het dak kunnen helpen om vooraf een
              eerste indruk te krijgen. Het snelst kan dat via WhatsApp of tijdens het offerteformulier.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-pill-dark">
                <span className="label flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Stuur foto's via WhatsApp
                </span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </a>
              <Link href="/offerte?dienst=lekkage" className="btn-link">
                Lekkage melden met formulier
                <Camera className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. Spoed & bereikbaarheid — donkere sectie */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Spoed</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-balance">
              Bij actieve lekkage telt snelheid.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed max-w-2xl mx-auto">
              Bij een actieve lekkage proberen we de situatie zo snel mogelijk te beoordelen en waar mogelijk
              verdere schade te beperken. Onze daadwerkelijke aankomsttijd hangt onder andere af van locatie,
              lopende werkzaamheden, verkeerssituatie, weersomstandigheden en de ernst van de situatie.
            </p>
            <div className="mt-8">
              <a href="tel:0102713824" className="btn-pill">
                <span className="label">Bel 010 - 271 38 24</span>
                <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12. Particulier & zakelijk */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Lekkage aan woning, aanbouw of garage</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">
                We onderzoeken lekkages bij onder andere platte woningdaken, uitbouwen en garages.
              </p>
              <Link href="/offerte?dienst=lekkage" className="btn-link mt-6">
                Lekkage woning melden
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">Lekkage aan bedrijfsdak</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">
                Een lekkend bedrijfsdak kan directe gevolgen hebben voor inventaris, werkzaamheden of installaties.
                We beoordelen de situatie en bespreken welke nood- of herstelwerkzaamheden nodig zijn.
              </p>
              <Link href="/offerte?dienst=lekkage" className="btn-link mt-6">
                Zakelijke lekkage melden
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 13. Kosten */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Kosten</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Wat kost het herstellen van een daklekkage?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              De kosten hangen af van de oorzaak en omvang van het probleem. Onder andere deze factoren spelen mee:
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
              Bij lekkage is het vooraf daarom niet altijd mogelijk om een definitieve prijs te geven zonder de
              situatie te hebben beoordeeld. We bespreken zo duidelijk mogelijk wat we aantreffen en welke
              werkzaamheden worden geadviseerd.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <div className="panel p-8">
              <h3 className="text-display text-xl tracking-[-0.02em] text-ink-900">Lekkage melden</h3>
              <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">We denken direct met u mee.</p>
              <Link href="/offerte?dienst=lekkage" className="btn-pill mt-6 w-full justify-between">
                <span className="label">Lekkage melden</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <a
                href="tel:0102713824"
                className="mt-4 flex items-center gap-3 text-sm text-ink-600 hover:text-blue-500 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Bel {bedrijf.telefoon}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 14. Verzekering / documentatie */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Documentatie</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Schade melden bij uw verzekeraar?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Bij waterschade kan het verstandig zijn om de situatie goed vast te leggen. Maak daarom foto's van de
              zichtbare lekkage, beschadigde plafonds of muren, eventuele beschadigde spullen en de situatie voordat
              herstel plaatsvindt. Bewaar daarnaast facturen en relevante documentatie van uitgevoerde
              werkzaamheden.
            </p>
            <p className="mt-4 text-sm text-ink-400">
              Of schade daadwerkelijk wordt vergoed, hangt af van uw verzekering, de oorzaak en de polisvoorwaarden.
              LK Dakwerken geeft geen garantie over verzekeringsdekking.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6 card p-8 flex items-start gap-4">
            <FileText className="w-8 h-8 text-blue-500 shrink-0" aria-hidden="true" />
            <p className="text-sm text-ink-600 leading-relaxed">
              Leg de situatie zo goed mogelijk vast voordat herstelwerkzaamheden starten — dit kan helpen bij een
              eventuele verzekeringsmelding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 15. Onderhoud na de reparatie */}
      <section className="section-pad bg-white">
        <div className="container-tight text-center">
          <Reveal>
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Na het herstel</span>
            <h2 className="mt-3 text-display text-2xl md:text-3xl tracking-[-0.02em] text-ink-900 text-balance">
              Ook daarna blijft controle verstandig.
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-2xl mx-auto">
              Wanneer een lekkage is hersteld kan periodieke inspectie helpen om nieuwe aandachtspunten eerder te
              signaleren. Zeker bij oudere platte daken kan onderhoud inzicht geven in de verdere conditie van het
              dak.
            </p>
            <Link href="/diensten/onderhoud" className="btn-link justify-center mt-6">
              Bekijk dakonderhoud
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 16. Vakmanschap */}
      <section className="relative section-pad bg-white overflow-hidden">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={projectGroot('project-02')}
              alt="Dakdekker onderzoekt een detail op een plat dak"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/20" />
            <Reveal className="relative p-10 md:p-16 max-w-xl">
              <span className="text-sm font-semibold text-blue-300 tracking-wide uppercase">Gericht herstel</span>
              <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Niet alleen de vochtplek behandelen, maar zoeken naar de oorzaak.
              </h2>
              <p className="mt-5 text-white/85 leading-relaxed">
                Een goede lekkagereparatie begint bij het achterhalen van het probleem. Daarom kijken we naar de
                dakbedekking én naar kwetsbare details zoals naden, randen, afvoeren en doorvoeren voordat we
                adviseren welke reparatie passend is.
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
              Veelgestelde vragen over daklekkage
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

      {/* 19. Grote eind-CTA — urgenter dan andere pagina's, zelfde component */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Heeft u op dit moment daklekkage?
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
              Wacht bij actieve lekkage niet onnodig af. Neem contact met ons op en leg kort uit wat er aan de hand
              is.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="tel:0102713824" className="btn-pill">
                <span className="label">Bel 010 - 271 38 24</span>
                <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
              </a>
              <Link href="/offerte?dienst=lekkage" className="btn-ghost-invert">
                Lekkage online melden
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 20. Mobiele sticky actiebalk — alleen op deze pagina */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ink-950 border-t border-white/10 px-4 py-3 flex gap-2">
        <a href="tel:0102713824" className="flex-1 btn-pill justify-center py-2.5">
          <span className="label">Bel direct</span>
          <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
        </a>
        <Link href="/offerte?dienst=lekkage" className="flex-1 btn-ghost-invert justify-center py-2.5">
          Lekkage melden
        </Link>
      </div>
      {/* Ruimte onder de pagina zodat de sticky balk de footer niet overlapt op mobiel */}
      <div className="lg:hidden h-16" aria-hidden="true" />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Daklekkage reparatie',
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
              { '@type': 'ListItem', position: 3, name: 'Lekkage', item: '/diensten/lekkage' },
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
