import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { projecten, fotos } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { ProjectenGalerij } from '@/components/ProjectenGalerij';

export const metadata: Metadata = {
  title: 'Projecten - Opgeleverde daken in Rotterdam en omgeving',
  description:
    'Bekijk de daken die LK Dakwerken oplevert in Rotterdam en omgeving: bitumen dakbedekking, renovatie, nieuwbouw en lekkageherstel. Echte foto’s van eigen werk.',
  alternates: { canonical: '/projecten' },
};

/* Totaal aantal opnamen: elk project heeft een hoofdfoto en soms meerdere
   extra opnamen van hetzelfde dak. */
const aantalFotos = projecten.reduce(
  (som, p) => som + 1 + (p.extraFotos?.length ?? 0),
  0,
);

/* Vierkante meters bij elkaar opgeteld, voor het cijferblok. */
const totaalOppervlak = projecten.reduce((som, p) => {
  const getal = parseInt(p.oppervlakte.replace(/\D/g, ''), 10);
  return som + (Number.isNaN(getal) ? 0 : getal);
}, 0);

const cijfers = [
  { cijfer: `${projecten.length}`, label: 'Projecten in beeld' },
  { cijfer: `${aantalFotos}`, label: "Foto's van eigen werk" },
  { cijfer: `${totaalOppervlak.toLocaleString('nl-NL')} m²`, label: 'Dakoppervlak opgeleverd' },
  { cijfer: '10 jaar', label: 'Garantie via Dakmerk' },
];

export default function ProjectenPage() {
  return (
    <>
      <PageHeader
        titel="Ons werk."
        accent="Daken in de regio Rotterdam."
        lead="Geen stockfoto's maar echte opnamen van daken die wij hebben opgeleverd. Van een berging in de achtertuin tot een compleet appartementencomplex."
        image={fotos.dienstenHeader}
        imageAlt="Dakdekker van LK Dakwerken aan het werk op een plat dak"
        kruimels={[{ label: 'Home', href: '/' }, { label: 'Projecten' }]}
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Offerte aanvragen</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <a href="tel:0102713824" className="btn-ghost-invert">
          <Phone className="w-4 h-4" aria-hidden="true" />
          Bel ons
        </a>
      </PageHeader>

      {/* Kerncijfers over het werk */}
      <section className="relative -mt-12 md:-mt-16 z-10">
        <div className="container-wide">
          <dl className="panel p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cijfers.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl md:text-5xl font-bold text-ink-900 leading-none tracking-[-0.03em]">
                    {s.cijfer}
                  </span>
                  <span className="block mt-2.5 text-sm text-ink-500">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Alle projecten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="mb-10 md:mb-14 max-w-2xl">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Wat we recent hebben opgeleverd.
            </h2>
            <p className="lead mt-5">
              Klik op een project voor het verhaal erachter en de overige foto’s van dat
              dak. Bij elk project ziet u de plaats, het oppervlak en het jaar.
            </p>
          </Reveal>

          <ProjectenGalerij />
        </div>
      </section>

      {/* Afsluitende CTA */}
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
