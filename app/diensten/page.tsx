import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { certificeringen, fotos } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { DienstenRaster } from '@/components/DienstenRaster';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Diensten - Bitumen, Renovatie, Nieuwbouw, Onderhoud & Lekkage',
  description: 'LK Dakwerken biedt alle dakdiensten onder één dak: bitumen daken, renovatie, nieuwbouw, onderhoud en lekkage. Dakmerk erkend.',
  alternates: { canonical: '/diensten' },
};

export default function DienstenPage() {
  return (
    <>
      <PageHeader
        titel="Vijf specialisaties."
        accent="Eén aanspreekpunt."
        lead="Van een lekkage in uw garage tot de complete dakbedekking van een bedrijfspand. Wij regelen het van A tot Z, met een vast team en tien jaar garantie."
        image={fotos.dienstenHeader}
        imageAlt="Platte daken van woningen in Zuid-Holland"
        kruimels={[{ label: 'Home', href: '/' }, { label: 'Diensten' }]}
        compact
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

      <section className="section-pad bg-white">
        <div className="container-wide">
          <DienstenRaster />
        </div>
      </section>

      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Kwaliteit die u kunt controleren.
            </h2>
            <p className="lead mt-5 max-w-md">
              Wij werken volgens de kwaliteitsrichtlijnen van Dakmerk. Elk project wordt gecontroleerd en opgeleverd met een garantiecertificaat.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <ul className="grid sm:grid-cols-2 gap-4">
              {certificeringen.map((c) => (
                <li key={c.naam} className="card p-6">
                  <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-5">
                    <Check className="w-5 h-5" aria-hidden="true" strokeWidth={3} />
                  </span>
                  <h3 className="text-lg font-semibold text-ink-900">{c.naam}</h3>
                  <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{c.uitleg}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
