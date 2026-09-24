import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { fotos } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { DienstenRaster } from '@/components/DienstenRaster';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Diensten - Bitumen, Renovatie, Nieuwbouw, Onderhoud & Lekkage',
  description: 'LK Dakwerken biedt alle dakdiensten onder één dak: bitumen daken, renovatie, nieuwbouw, onderhoud en lekkage.',
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
        compact
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Offerte aanvragen</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <a href="tel:+31680110879" className="btn-ghost-invert">
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
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Kwaliteit die u kunt controleren.
            </h2>
            <p className="lead mt-5">
              We werken met passie en gaan altijd voor het beste resultaat, zodat u nooit meer met lekkage te maken krijgt. Elk project wordt gecontroleerd en opgeleverd.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
