import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  Wrench,
  Building2,
  ClipboardCheck,
  FileText,
  Hammer,
  CheckCircle2,
  Sun,
  Waves,
  Plus,
} from 'lucide-react';
import { diensten, bedrijf, fotos } from '@/lib/data';
import { foto, projectGroot } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Bitumen dak Rotterdam | Aanleggen & Renoveren | LK Dakwerken',
  description:
    'Bitumen dak laten aanleggen of renoveren? LK Dakwerken verzorgt professionele bitumen dakbedekking voor woningen en bedrijfspanden in Rotterdam en Zuid-Holland.',
  alternates: { canonical: '/diensten/bitumen-daken' },
};

const trustPunten = [
  'Gratis dakinspectie',
  'Heldere offerte vooraf',
  'Vakbekwame dakdekkers',
  'Garantie op uitgevoerd werk',
];

const voordelen = [
  {
    icon: ShieldCheck,
    titel: 'Sterk en waterdicht',
    tekst: 'Bitumen vormt een betrouwbare waterdichte laag en is daardoor uitstekend geschikt voor platte daken.',
  },
  {
    icon: Clock,
    titel: 'Lange levensduur',
    tekst: 'Bij correcte aanleg en goed onderhoud kan een bitumen dak tientallen jaren meegaan.',
  },
  {
    icon: Wrench,
    titel: 'Goed te onderhouden',
    tekst: 'Beschadigingen of zwakke plekken zijn vaak lokaal te herstellen zonder direct het volledige dak te vervangen.',
  },
  {
    icon: Building2,
    titel: 'Breed toepasbaar',
    tekst: 'Geschikt voor woningen, garages, aanbouwen, bedrijfspanden en andere platte of licht hellende daken.',
  },
];

const toepassingen = [
  {
    titel: 'Platte daken van woningen',
    tekst: 'Voor uitbouwen, aanbouwen en complete platte woningdaken.',
    image: projectGroot('project-01'),
  },
  {
    titel: 'Garage of aanbouw',
    tekst: 'Een duurzame oplossing voor kleinere platte dakoppervlakken.',
    image: projectGroot('project-02'),
  },
  {
    titel: 'Bedrijfspanden',
    tekst: 'Bitumen dakbedekking voor grotere commerciële dakoppervlakken.',
    image: projectGroot('project-05'),
  },
  {
    titel: 'Bestaande daken',
    tekst: 'Vervanging of renovatie van bestaande dakbedekking wanneer deze verouderd of beschadigd is.',
    image: projectGroot('project-08'),
  },
];

const werkwijze = [
  { nummer: '01', titel: 'Dakinspectie', tekst: 'We bekijken de huidige staat van het dak, controleren de ondergrond en bespreken uw wensen.' },
  { nummer: '02', titel: 'Heldere offerte', tekst: 'U ontvangt een duidelijke offerte waarin werkzaamheden, materialen en planning worden beschreven.' },
  { nummer: '03', titel: 'Uitvoering', tekst: 'Onze dakdekkers voeren het werk volgens planning uit en zorgen voor een nette en waterdichte afwerking.' },
  { nummer: '04', titel: 'Controle & oplevering', tekst: 'Na afronding controleren we het dak en lopen we de werkzaamheden waar nodig samen met u na.' },
];

const kostenFactoren = [
  'het aantal vierkante meters',
  'de staat van de bestaande dakbedekking',
  'de ondergrond',
  'bereikbaarheid van het dak',
  'gewenste isolatie',
  'aansluitingen en dakdetails',
  'het gekozen dakbedekkingssysteem',
];

const faq = [
  {
    vraag: 'Hoe lang gaat een bitumen dak mee?',
    antwoord:
      'Een professioneel aangelegd bitumen dak kan bij goed onderhoud tientallen jaren meegaan. De exacte levensduur hangt af van het toegepaste materiaal, de dakconstructie, weersinvloeden en onderhoud.',
  },
  {
    vraag: 'Wat kost een nieuw bitumen dak?',
    antwoord:
      'De prijs hangt onder andere af van het oppervlak, de bestaande dakbedekking, de ondergrond, isolatie en bereikbaarheid. Daarom bekijken wij het dak bij voorkeur eerst voordat we een definitieve offerte maken.',
  },
  {
    vraag: 'Kan nieuwe bitumen over oude dakbedekking worden aangebracht?',
    antwoord:
      'In sommige situaties is dit mogelijk. De bestaande dakbedekking en dakconstructie moeten hiervoor eerst worden beoordeeld. Tijdens een dakinspectie bepalen we of renovatie over de bestaande laag technisch verantwoord is.',
  },
  {
    vraag: 'Wat is het verschil tussen APP en SBS bitumen?',
    antwoord:
      'APP-bitumen is onder andere sterk bestand tegen UV en hogere temperaturen. SBS-bitumen is elastischer en beweegt gemakkelijker mee met de ondergrond. Welke variant het meest geschikt is, hangt af van het dak.',
  },
  {
    vraag: 'Kan een bitumen dak worden geïsoleerd?',
    antwoord:
      'Ja. Bij renovatie of vernieuwing van een plat dak kan vaak ook dakisolatie worden aangebracht. Dit kan een logisch moment zijn om het dak direct te verduurzamen.',
  },
  {
    vraag: 'Krijg ik garantie op het dak?',
    antwoord:
      'Op onze uitgevoerde dakwerkzaamheden geven wij volgens onze garantievoorwaarden tot 10 jaar garantie op waterdichtheid.',
  },
  {
    vraag: 'Werken jullie ook voor bedrijven?',
    antwoord: 'Ja. LK Dakwerken voert dakwerkzaamheden uit voor zowel particuliere als zakelijke opdrachtgevers.',
  },
  {
    vraag: 'In welke regio werken jullie?',
    antwoord: 'LK Dakwerken is gevestigd in Rotterdam en voert werkzaamheden uit in Rotterdam en omliggende plaatsen in Zuid-Holland.',
  },
];

const andereDiensten = [
  { slug: 'renovatie', titel: 'Dakrenovatie', tekst: 'Verouderd dak? Wij vernieuwen het dak en zorgen voor een betrouwbare nieuwe dakopbouw.', knop: 'Bekijk dakrenovatie' },
  { slug: 'nieuwbouw', titel: 'Nieuwbouw', tekst: 'Complete dakbedekking voor nieuwe woningen, aanbouwen en bedrijfspanden.', knop: 'Bekijk nieuwbouw' },
  { slug: 'onderhoud', titel: 'Dakonderhoud', tekst: 'Regelmatig onderhoud helpt problemen vroegtijdig te ontdekken en de levensduur van een dak te verlengen.', knop: 'Bekijk onderhoud' },
  { slug: 'lekkage', titel: 'Daklekkage', tekst: 'Problemen met lekkage? Laat de oorzaak professioneel opsporen en herstellen.', knop: 'Bekijk lekkage' },
];

export default function BitumenDakenPage() {
  return (
    <>
      {/* 1. Hero: tekst links, foto rechts */}
      <section className="relative bg-white overflow-hidden pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="container-wide">
          <nav aria-label="Broodkruimel" className="mb-6 text-sm text-ink-400 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/diensten" className="hover:text-blue-500">Diensten</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink-600">Bitumen daken</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <Reveal className="lg:col-span-6">
              <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Bitumen dakbedekking</span>
              <h1 className="mt-3 text-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.035em] text-ink-900 text-balance">
                Een bitumen dak dat jarenlang meegaat.
              </h1>
              <p className="mt-6 text-lg text-ink-600 leading-relaxed max-w-lg">
                Bitumen is een sterke en betrouwbare dakbedekking voor platte en licht hellende daken. LK Dakwerken
                verzorgt nieuwe bitumen dakbedekking, vervanging en renovatie voor woningen en bedrijfspanden.
              </p>
              <p className="mt-4 text-ink-600 leading-relaxed max-w-lg">
                We werken met hoogwaardige APP- en SBS-bitumen en zorgen voor een nette, waterdichte afwerking.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/offerte" className="btn-pill">
                  <span className="label">Vraag gratis een offerte aan</span>
                  <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </Link>
                <a href="tel:0102713824" className="inline-flex items-center gap-2.5 px-5 py-3.5 font-semibold text-ink-900 hover:text-blue-500 transition-colors">
                  <span className="w-10 h-10 rounded-button-inner bg-paper-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </span>
                  010 - 271 38 24
                </a>
              </div>

              <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3">
                {trustPunten.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-ink-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05} className="lg:col-span-6">
              <div className="relative aspect-[4/5] md:aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src={projectGroot('project-01')}
                  alt="Strak aangelegde bitumen dakbedekking op een plat dak"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Introductie: wat is een bitumen dak */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Waarom kiezen voor bitumen dakbedekking?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Bitumen wordt al jarenlang gebruikt als dakbedekking voor platte en licht hellende daken. Het materiaal
              is sterk, waterdicht en flexibel en kan daardoor uitstekend tegen de verschillende weersomstandigheden
              in Nederland.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              LK Dakwerken werkt met APP- en SBS-gemodificeerde bitumen. Afhankelijk van het type dak, de ondergrond
              en de bestaande dakconstructie bepalen we welke methode het meest geschikt is. De dakbedekking kan
              bijvoorbeeld worden gebrand of gelast, mechanisch bevestigd, of volledig verkleefd.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Tijdens een dakinspectie bekijken we welke oplossing technisch het beste bij het dak past.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={projectGroot('project-08')}
              alt="Detail van bitumen dakbedekking met aansluiting"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 3. APP en SBS */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              APP of SBS bitumen: wat is het verschil?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Sun className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">APP-bitumen</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">
                APP-bitumen heeft een hoge weerstand tegen zonlicht en hoge temperaturen. Hierdoor wordt deze
                dakbedekking veel toegepast op platte daken die sterk aan zon en weersinvloeden worden blootgesteld.
              </p>
              <ul className="mt-6 space-y-2.5">
                {['Hoge UV-bestendigheid', 'Geschikt voor platte daken', 'Sterke en duurzame afwerking'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05} className="card p-8 md:p-10">
              <span className="w-12 h-12 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Waves className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink-900">SBS-bitumen</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">
                SBS-bitumen is zeer elastisch en beweegt gemakkelijker mee met de dakconstructie. Hierdoor is het
                bijzonder geschikt voor situaties waarin flexibiliteit belangrijk is.
              </p>
              <ul className="mt-6 space-y-2.5">
                {['Hoge elasticiteit', 'Goede hechting', 'Beweegt mee met de ondergrond'].map((k) => (
                  <li key={k} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-10 text-center">
            <p className="text-ink-600">Niet zeker welk type uw dak nodig heeft?</p>
            <Link href="/offerte" className="btn-link mt-2 justify-center">
              Laat uw dak beoordelen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. Voordelen */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Waarom zoveel daken met bitumen worden uitgevoerd
            </h2>
            <p className="lead mt-5">
              Een goed aangelegd bitumen dak biedt een combinatie van betrouwbaarheid, betaalbaarheid en lange
              levensduur.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {voordelen.map((v, i) => (
              <Reveal key={v.titel} delay={(i % 4) * 0.06} className="card card-hover p-7">
                <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                  <v.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{v.titel}</h3>
                <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{v.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Toepassingen */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Voor vrijwel ieder plat dak
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {toepassingen.map((t, i) => (
              <Reveal key={t.titel} delay={(i % 4) * 0.06} className="group card card-hover overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                  <img
                    src={t.image}
                    alt={t.titel}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-ink-900">{t.titel}</h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{t.tekst}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Kwaliteit / materialen — donkere sectie */}
      <section className="section-pad bg-ink-950 text-white overflow-hidden">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Materiaal dat meegaat</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Wij kiezen voor kwaliteit op het dak.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-xl">
              Een goed dak begint bij goede materialen. Daarom werken wij met professionele bitumineuze dakbedekking
              van gerenommeerde fabrikanten.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
              Afhankelijk van de situatie kiezen we het materiaal en systeem dat het beste aansluit bij het dak, de
              ondergrond en de gewenste levensduur. Onder andere materialen van IKO en Derbigum.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5 rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={projectGroot('project-05')}
              alt="Bitumen dakbedekking op een bedrijfspand"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 7. Werkwijze: premium tijdlijn */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van inspectie tot oplevering
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
            <p className="text-ink-600">Klaar om uw dak te laten bekijken?</p>
            <Link href="/offerte" className="btn-link mt-2 justify-center">
              Plan een gratis dakinspectie
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 8. Verduurzaming */}
      <section className="section-pad bg-blue-50/60">
        <div className="container-tight">
          <Reveal className="rounded-3xl bg-white border border-blue-100 p-8 md:p-12 flex flex-col md:flex-row items-start gap-8">
            <span className="w-14 h-14 rounded-button-inner bg-blue-500 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </span>
            <div>
              <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Slim combineren</span>
              <h2 className="mt-2 text-display text-2xl md:text-3xl tracking-[-0.02em] text-ink-900 text-balance">
                Uw dak vernieuwen? Kijk direct naar isolatie.
              </h2>
              <p className="mt-4 text-ink-600 leading-relaxed max-w-2xl">
                Wanneer oude dakbedekking wordt vervangen, is dit vaak een logisch moment om ook te kijken naar de
                isolatie van het dak. Dakisolatie kan het warmteverlies van een woning verminderen en het
                wooncomfort verbeteren. Voor bepaalde isolatiemaatregelen zijn mogelijk landelijke of lokale
                subsidies beschikbaar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/subsidies-verduurzaming" className="btn-link">
                  Bekijk subsidies
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link href="/offerte" className="btn-link">
                  Vraag advies over dakisolatie
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Kosten */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Wat kost een bitumen dak?
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed">De kosten van een bitumen dak zijn afhankelijk van onder andere:</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {kostenFactoren.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" />
                  <span className="capitalize">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-600 leading-relaxed">
              Daarom werken we liever niet met een algemene prijs die uiteindelijk niet bij uw dak past. Na een
              dakinspectie ontvangt u een heldere offerte afgestemd op uw situatie.
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

      {/* 10. Passie voor het vak */}
      <section className="relative section-pad bg-white overflow-hidden">
        <div className="container-wide">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={foto(fotos.werkwijze, 1600, 75)}
              alt="Dakdekker tijdens de werkzaamheden op een plat dak"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/20" />
            <Reveal className="relative p-10 md:p-16 max-w-xl">
              <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Passie voor goed dakwerk.
              </h2>
              <p className="mt-5 text-white/85 leading-relaxed">
                Wij geloven dat een dak alleen goed is wanneer elk detail klopt. Van de voorbereiding van de
                ondergrond tot de laatste aansluiting: we werken zorgvuldig en streven naar een duurzaam en
                waterdicht eindresultaat.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde vragen over bitumen daken
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

      {/* 13. Andere diensten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
              Meer mogelijkheden voor uw dak
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {andereDiensten.map((d, i) => {
              const dienst = diensten.find((x) => x.slug === d.slug);
              return (
                <Reveal key={d.slug} delay={i * 0.06}>
                  <Link
                    href={`/diensten/${d.slug}`}
                    className="group card card-hover overflow-hidden flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                      <img
                        src={foto(dienst?.heroImage ?? fotos.dienstenHeader, 600, 75)}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. Laatste CTA */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Is uw bitumen dak toe aan vervanging of renovatie?
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
              Laat uw dak vrijblijvend beoordelen en ontvang een duidelijke offerte voor de werkzaamheden.
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
            serviceType: 'Bitumen dakbedekking',
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
              { '@type': 'ListItem', position: 3, name: 'Bitumen daken', item: '/diensten/bitumen-daken' },
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
