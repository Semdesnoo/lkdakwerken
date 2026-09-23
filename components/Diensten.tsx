import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DienstenRaster } from '@/components/DienstenRaster';
import { Reveal } from '@/components/Reveal';

export function Diensten() {
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <Reveal className="grid md:grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
          <div className="md:col-span-6">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              Vijf specialisaties voor een zorgeloos dak.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="lead">
              Van een lekkage op zaterdagavond tot een complete dakrenovatie van uw bedrijfspand. LK Dakwerken levert alle dakdiensten onder één dak.
            </p>
            <Link href="/diensten" className="btn-link mt-6">
              Alle diensten op een rij
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <DienstenRaster />
      </div>
    </section>
  );
}
