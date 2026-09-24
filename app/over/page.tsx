import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import {
  stats,
  projecten,
  bedrijf,
  fotos,
} from '@/lib/data';
import { foto, projectGroot } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { GoogleReviews } from '@/components/GoogleReviews';
import { Kerncijfers } from '@/components/Kerncijfers';
import { SchuineOvergang } from '@/components/SchuineOvergang';

export const metadata: Metadata = {
  title: 'Over LK Dakwerken | Dakdekker Rotterdam',
  description:
    'Maak kennis met LK Dakwerken en oprichter Luuk Kanters. Meer dan 5 jaar ervaring in dakwerk, renovatie, onderhoud, nieuwbouw en bitumen daken.',
  alternates: { canonical: '/over' },
};

const ontstaan = [
  { nummer: '01', titel: 'De basis in het vak', tekst: 'Luuk doet jarenlang praktijkervaring op als dakdekker en leert het vak van dichtbij kennen.' },
  { nummer: '02', titel: 'Steeds meer verantwoordelijkheid', tekst: 'Door aan verschillende projecten mee te werken groeit de ervaring met renovatie, onderhoud, bitumen dakbedekking en nieuwbouw.' },
  { nummer: '03', titel: 'LK Dakwerken ontstaat', tekst: 'Vanuit de wens om projecten zelfstandig uit te voeren en klanten persoonlijker te helpen ontstaat LK Dakwerken.' },
  { nummer: '04', titel: 'Verder bouwen', tekst: 'Vandaag richten we ons op kwalitatief dakwerk, tevreden klanten en het verder uitbouwen van LK Dakwerken.' },
];

const waarWijVoorStaan = [
  { titel: 'Duidelijke afspraken', tekst: 'We vertellen vooraf wat we gaan doen en proberen verrassingen tijdens het project zoveel mogelijk te voorkomen.' },
  { titel: 'Goed vakwerk', tekst: 'We kiezen voor een oplossing die technisch past bij het dak, niet alleen voor de snelste oplossing.' },
  { titel: 'Persoonlijk contact', tekst: 'Geen groot callcenter of onpersoonlijk proces. U weet met wie u zaken doet.' },
  { titel: 'Netjes opleveren', tekst: 'Een project is voor ons pas klaar wanneer het werk goed is uitgevoerd en netjes is achtergelaten.' },
];

const waaromLK = [
  'Meer dan 5 jaar ervaring in het vak',
  'Persoonlijk contact',
  'Duidelijke offertes',
  'Professionele materialen',
  'Aandacht voor details',
  'Zowel particuliere als zakelijke projecten',
  'Onderhoud, renovatie, nieuwbouw en lekkage',
  'Werkzaam in Rotterdam en omgeving',
];

const uitgelichteProjecten = projecten.slice(0, 3);

export default function OverOnsPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHeader
        titel="Gebouwd vanuit passie voor het vak."
        lead="LK Dakwerken is ontstaan vanuit jarenlange ervaring op het dak. Persoonlijk contact, degelijk vakwerk en een resultaat waar we achter kunnen staan vormen nog altijd de basis van ieder project."
        image={fotos.overOnsHeader}
        imageAlt="Dakdekker van LK Dakwerken tijdens werkzaamheden op een dak"
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Bespreek uw dak</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <Link href="/projecten" className="btn-ghost-invert">
          Bekijk onze projecten
        </Link>
      </PageHeader>

      {/* 2. Het verhaal achter LK Dakwerken */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-paper-100">
              <img
                src={foto(fotos.overOnsTeam, 1000, 80)}
                alt="Luuk Kanters tijdens werkzaamheden op een dak"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Het verhaal</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Van dakdekker naar LK Dakwerken
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-700">
              <p>
                Mijn naam is <strong>Luuk Kanters</strong> en vanuit mijn werk als dakdekker is LK Dakwerken
                ontstaan.
              </p>
              <p>
                Wat begon met het dagelijks werken op daken, groeide steeds verder uit tot de wens om projecten op
                mijn eigen manier uit te voeren: met aandacht voor het werk, duidelijke afspraken en vooral een
                resultaat waar zowel de klant als wijzelf tevreden over kunnen zijn.
              </p>
              <p>
                Inmiddels heb ik meer dan 5 jaar ervaring in het vak en heb ik mee mogen werken aan uiteenlopende
                projecten. Van onderhoud en reparaties tot complete renovaties en nieuwe daken.
              </p>
              <p>
                Die praktijkervaring vormt nog steeds de basis van LK Dakwerken. We weten hoe belangrijk een goed
                dak is en behandelen ieder project daarom alsof het voor onszelf is.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Persoonlijk blok — quote */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-paper-100">
              <img
                src={foto(fotos.overOnsHeader, 800, 80)}
                alt="Luuk Kanters, oprichter van LK Dakwerken"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-8">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Even voorstellen: Luuk</span>
            <blockquote className="mt-4 text-2xl md:text-3xl leading-snug tracking-[-0.02em] text-ink-900 text-balance">
              &ldquo;Ik vind het belangrijk dat klanten gewoon weten waar ze aan toe zijn. Geen ingewikkeld verhaal,
              maar eerlijk advies, goede afspraken en werk dat netjes wordt uitgevoerd.
              <br />
              <br />
              Juist omdat ik zelf vanuit het vak kom, kijk ik niet alleen naar hoe iets eruitziet, maar vooral naar
              hoe een dak technisch goed en duurzaam kan worden uitgevoerd.&rdquo;
            </blockquote>
            <p className="mt-5 font-semibold text-ink-700">— Luuk Kanters, LK Dakwerken</p>
          </Reveal>
        </div>
      </section>

      {/* 4. Kerncijfers */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Kerncijfers
            cijfers={stats}
            className="panel p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          />
        </div>
      </section>

      {/* 5. Hoe LK Dakwerken is ontstaan — tijdlijn */}
      <SchuineOvergang kleur="#0a0a0a" hoek={-1.75} />
      <section className="section-pad bg-ink-900 text-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Van ervaring naar
              <br />
              <span className="text-blue-400">eigen onderneming.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-400/70 via-white/25 to-transparent"
              />
              {ontstaan.map((stap, i) => (
                <Reveal as="li" key={stap.nummer} delay={i * 0.09} className="relative pl-10 pb-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-blue-500 ring-4 ring-ink-900"
                  />
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{stap.titel}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed max-w-md">{stap.tekst}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. Waar wij voor staan */}
      <SchuineOvergang kleur="#ffffff" hoek={1.75} />
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Hoe wij graag werken
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {waarWijVoorStaan.map((w, i) => (
              <Reveal key={w.titel} delay={i * 0.06} className="card card-hover p-6">
                <h3 className="text-base font-semibold text-ink-900">{w.titel}</h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{w.tekst}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Geen snelle oplossing om het snelle */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal>
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Onze manier van werken</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Niet alleen kijken naar vandaag, maar ook naar morgen.
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed max-w-2xl">
              Een dakprobleem kan soms met een kleine reparatie worden opgelost. In andere situaties is onderhoud of
              renovatie op de langere termijn verstandiger. Wij proberen daarom niet automatisch de grootste klus te
              verkopen. We bekijken eerst wat technisch nodig is en bespreken vervolgens welke oplossing bij de
              situatie past. Dat kan een kleine reparatie zijn, maar ook een complete renovatie wanneer het dak daar
              daadwerkelijk aan toe is.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8. Onze projecten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Ons werk</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Projecten waar we trots op zijn
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              In de afgelopen jaren hebben we aan verschillende soorten daken mogen werken. Van kleine particuliere
              werkzaamheden tot grotere renovatie- en nieuwbouwprojecten.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {uitgelichteProjecten.map((p, i) => (
              <Reveal key={p.image} delay={i * 0.06} className="card card-hover overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                  <img
                    src={projectGroot(p.image)}
                    alt={p.titel}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-ink-900">{p.type} – {p.plaats}</h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{p.titel}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10 text-center">
            <Link href="/projecten" className="btn-link justify-center">
              Bekijk onze projecten
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 9. Waarom klanten voor LK Dakwerken kiezen */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Een dakdekker waarop u kunt bouwen
            </h2>
          </Reveal>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
            {waaromLK.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-ink-700">
                <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Toekomst van LK Dakwerken */}
      <section className="section-pad bg-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-2xl md:text-3xl tracking-[-0.02em] text-ink-900 text-balance">
              We blijven bouwen aan LK Dakwerken
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-2xl mx-auto">
              LK Dakwerken is ontstaan vanuit het vak en dat willen we ook zo houden. We blijven investeren in
              kennis, goede materialen en een manier van werken waarbij kwaliteit en persoonlijk contact centraal
              staan. Het doel is niet alleen om vandaag een goed dak te maken, maar om een bedrijf op te bouwen waar
              klanten ook in de toekomst op kunnen vertrouwen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Beoordelingen */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <GoogleReviews />

      {/* Bedrijfsgegevens */}
      <SchuineOvergang kleur="#ffffff" hoek={1.75} />
      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="panel p-8 md:p-12 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
                Waar u ons vindt
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Ons kantoor en materiaaldepot staan in Rotterdam. Bezoek op afspraak.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Adres</h3>
                <address className="not-italic text-ink-500 leading-relaxed">
                  {bedrijf.naam}
                  <br />
                  {bedrijf.straat}
                  <br />
                  {bedrijf.postcode} {bedrijf.plaats}
                </address>
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Contact</h3>
                <p className="text-ink-500 leading-relaxed">
                  {bedrijf.telefoon}
                  <br />
                  {bedrijf.email}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Openingstijden</h3>
                <p className="text-ink-500 leading-relaxed">
                  Maandag tot vrijdag: {bedrijf.openingstijden.maVrij}
                  <br />
                  Zaterdag: {bedrijf.openingstijden.za}
                  <br />
                  Zondag: {bedrijf.openingstijden.zo.toLowerCase()}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Bedrijfsgegevens</h3>
                <p className="text-ink-500 leading-relaxed">
                  KvK {bedrijf.kvk}
                  <br />
                  BTW {bedrijf.btw}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grote eind-CTA */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
              Heeft u een dak waar we naar mogen kijken?
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Vertel ons wat er speelt en we denken graag met u mee over een passende oplossing.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-center gap-4">
            <Link href="/offerte" className="btn-pill">
              <span className="label">Vraag een offerte aan</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <a href="tel:+31680110879" className="btn-ghost-invert">
              <Phone className="w-4 h-4" aria-hidden="true" />
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
