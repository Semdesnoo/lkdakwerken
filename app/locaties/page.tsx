import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { locaties, fotos } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { WerkgebiedKaart } from '@/components/Werkgebied';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Werkgebied - Dakdekker in heel Zuid-Holland',
  description: 'LK Dakwerken is werkzaam in alle gemeenten van Zuid-Holland. Bekijk alle locaties.',
  alternates: { canonical: '/locaties' },
};

const beloften = [
  { titel: '10 jaar', tekst: 'Garantie op waterdichtheid via Dakmerk' },
  { titel: `${locaties.length} gemeenten`, tekst: 'Actief in heel Zuid-Holland' },
  { titel: '7 dagen', tekst: 'Bereikbaar voor spoed bij lekkage' },
  { titel: '20+ jaar', tekst: 'Ervaring met platte en hellende daken' },
];

export default function LocatiesIndexPage() {
  const regios = Array.from(new Set(locaties.map((l) => l.regio)));

  return (
    <>
      <PageHeader
        titel={`${locaties.length} gemeenten.`}
        accent="Heel Zuid-Holland."
        lead="Vanuit Rotterdam rijden we dagelijks door de hele provincie. Kies uw gemeente voor de mogelijkheden bij u in de buurt."
        image={fotos.locatiesHeader}
        imageAlt="Luchtfoto van Rotterdam"
        compact
      />

      {/* Kaart en beloften */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-7">
            <WerkgebiedKaart />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {beloften.map((b) => (
                <div key={b.titel}>
                  <dt className="font-display text-3xl md:text-4xl font-bold text-ink-900 tracking-[-0.03em] leading-none">
                    {b.titel}
                  </dt>
                  <dd className="mt-2.5 text-sm text-ink-500 leading-relaxed">{b.tekst}</dd>
                </div>
              ))}
            </dl>
            <Link href="/offerte" className="btn-pill mt-10">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Alle gemeenten per regio */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide space-y-10">
          {regios.map((regio, i) => {
            const locs = locaties.filter((l) => l.regio === regio);
            return (
              <Reveal key={regio} delay={Math.min(i, 4) * 0.05}>
                <div className="panel-flat p-6 md:p-8">
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h2 className="text-display text-2xl md:text-3xl tracking-[-0.025em] text-ink-900">
                      {regio}
                    </h2>
                    <span className="text-sm text-ink-500 whitespace-nowrap">
                      {locs.length} {locs.length === 1 ? 'gemeente' : 'gemeenten'}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {locs.map((loc) => (
                      <li key={loc.slug}>
                        <Link
                          href={`/locaties/${loc.slug}`}
                          className="chip hover:bg-blue-500 hover:text-white transition-colors"
                        >
                          {loc.naam}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Afsluiting */}
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
              Staat uw gemeente er niet tussen?
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Geen probleem. Waar u in Zuid-Holland ook woont, wij komen bij u langs.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-center gap-4">
            <Link href="/offerte" className="btn-pill">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <a href="tel:+31612345678" className="btn-ghost-invert">
              <Phone className="w-4 h-4" aria-hidden="true" />
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
