import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { projecten, fotos, diensten } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { ProjectenGalerij } from '@/components/ProjectenGalerij';
import { Kerncijfers } from '@/components/Kerncijfers';
import { SchuineOvergang } from '@/components/SchuineOvergang';
import { projectKaart } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Dakprojecten Rotterdam & Zuid-Holland | LK Dakwerken',
  description:
    'Bekijk echte dakprojecten van LK Dakwerken in Rotterdam en omgeving. Dakrenovatie, nieuwbouw en bitumen dakbedekking voor woningen en bedrijfspanden.',
  alternates: { canonical: '/projecten' },
};

const aantalPlaatsen = new Set(projecten.map((p) => p.plaats)).size;

const cijfers = [
  { cijfer: `${projecten.length}`, label: 'Projecten in beeld' },
  { cijfer: `${aantalPlaatsen}`, label: 'Plaatsen in de regio' },
  { cijfer: '5+ jaar', label: 'Ervaring in het vak' },
  {
    cijfer: '10 jaar',
    label: 'Garantie op waterdichtheid',
    footnoot: 'Volgens de toepasselijke garantievoorwaarden.',
  },
];

// Dienstpagina's die daadwerkelijk bestaan, elk gekoppeld aan een eigen echte projectfoto
// (matcht op categorie waar mogelijk; anders krijgt elke dienst gewoon een andere foto uit de lijst,
// zodat er nooit dezelfde foto drie keer naast elkaar staat).
const dienstSlugs = ['bitumen-daken', 'renovatie', 'nieuwbouw', 'onderhoud', 'lekkage'];
const gebruikt = new Set<string>();
const gekoppeldeDiensten = diensten
  .filter((d) => dienstSlugs.includes(d.slug))
  .map((d, i) => {
    const match = projecten.find(
      (p) => !gebruikt.has(p.image) && p.type.toLowerCase().includes(d.titel.toLowerCase().split(' ')[0]),
    );
    const foto = match ?? projecten.find((p) => !gebruikt.has(p.image)) ?? projecten[i % projecten.length];
    gebruikt.add(foto.image);
    return { ...d, foto: foto.image };
  });

export default function ProjectenPage() {
  return (
    <>
      <PageHeader
        titel="Ons werk."
        accent="Daken in de regio Rotterdam."
        lead="Geen stockfoto's, maar echte daken die wij hebben uitgevoerd. Van een berging in de achtertuin tot grotere renovatie- en nieuwbouwprojecten."
        image={fotos.dienstenHeader}
        imageAlt="Dakdekker van LK Dakwerken aan het werk op een plat dak"
      >
        <a href="#projectgrid" className="btn-pill">
          <span className="label">Bekijk onze projecten</span>
          <span className="arrow"><ArrowRight className="w-4 h-4 rotate-90" aria-hidden="true" /></span>
        </a>
        <Link href="/offerte" className="btn-ghost-invert">
          Vraag een offerte aan
        </Link>
      </PageHeader>

      {/* Kerncijfers over het werk */}
      <section className="relative -mt-12 md:-mt-16 z-10">
        <div className="container-wide">
          <Kerncijfers
            cijfers={cijfers}
            className="panel p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          />
        </div>
      </section>

      {/* Alle projecten */}
      <section id="projectgrid" className="section-pad bg-white scroll-mt-24">
        <div className="container-wide">
          <Reveal className="mb-10 md:mb-14 max-w-2xl">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Recent werk</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Wat we recent hebben opgeleverd
            </h2>
            <p className="lead mt-5">
              Bekijk hieronder een selectie van projecten die we in Rotterdam en omliggende plaatsen hebben
              uitgevoerd. Klik op een project voor meer foto's en het verhaal erachter.
            </p>
          </Reveal>

          <ProjectenGalerij />
        </div>
      </section>

      {/* Regio */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Regio</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Werkzaam in Rotterdam en omgeving
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              De projecten hierboven liggen verspreid over Rotterdam en de omliggende gemeenten. Hieronder ziet u in
              welke plaatsen we recent hebben gewerkt.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
            <ul className="grid sm:grid-cols-2 gap-3">
              {Array.from(new Set(projecten.map((p) => p.plaats))).map((plaats) => (
                <li key={plaats} className="flex items-center gap-2.5 rounded-xl bg-white p-4 text-ink-700 shadow-sm">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                  {plaats}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Conversieblok */}
      <SchuineOvergang kleur="#ffffff" hoek={-1.75} />
      <section className="section-pad bg-white">
        <div className="container-tight text-center">
          <Reveal>
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Uw dak kan de volgende zijn</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Heeft u een vergelijkbaar project?
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed max-w-xl mx-auto">
              Of het nu gaat om een kleine aanbouw, een complete renovatie of een groter bedrijfspand: we bekijken
              graag wat er voor uw dak nodig is.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/offerte" className="btn-pill">
                <span className="label">Vraag een offerte aan</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <a href="tel:0102713824" className="btn-link justify-center">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Bel 010 - 271 38 24
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Diensten koppelen aan projecten */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Bekijk wat we voor uw dak kunnen doen
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {gekoppeldeDiensten.map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.05}>
                <Link href={`/diensten/${d.slug}`} className="group card card-hover overflow-hidden block h-full">
                  <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                    <img
                      src={projectKaart(d.foto)}
                      alt={d.titel}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="font-semibold text-ink-900 group-hover:text-blue-500 transition-colors">
                      {d.titel}
                    </span>
                    <ArrowRight className="w-4 h-4 text-ink-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Afsluitende CTA */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden zigzag-donker">
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
              Uw dak als volgende project?
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Vraag een vrijblijvende offerte aan. We komen binnen drie werkdagen langs voor
              een gratis dakinspectie.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-center gap-4">
            <Link href="/offerte" className="btn-pill">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <a href="tel:0102713824" className="btn-ghost-invert">
              <Phone className="w-4 h-4" aria-hidden="true" />
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
