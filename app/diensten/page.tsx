import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { diensten } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Diensten - Bitumen, Renovatie, Nieuwbouw, Onderhoud & Lekkage',
  description: 'LK Dakwerken biedt alle dakdiensten onder één dak: bitumen daken, renovatie, nieuwbouw, onderhoud en lekkage. Dakmerk erkend.',
  alternates: { canonical: '/diensten' },
};

export default function DienstenPage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="eyebrow mb-6">Diensten</div>
              <h1 className="text-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] text-balance">
                Vijf specialisaties.
                <br />
                <span className="text-[var(--accent)]">Eén aanspreekpunt.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pt-12">
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                Van een lekkage in uw garage tot de complete dakbedekking van een bedrijfspand. Wij regelen het van A tot Z.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-wide space-y-0">
          {diensten.map((d, i) => {
            const reverse = i % 2 === 1;
            return (
              <article key={d.slug} id={d.slug} className="reveal-on-scroll scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-16 border-b border-[var(--border)]">
                <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--foreground)]">
                    <img src={`https://picsum.photos/seed/lk-${d.slug}/800/1000`} alt={d.titel} className="w-full h-full object-cover opacity-90" />
                  </div>
                </div>

                <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                  <div className="text-display text-7xl md:text-8xl font-mono leading-none mb-6 text-[var(--border)]">{String(i + 1).padStart(2, '0')}</div>
                  <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-[-0.04em] text-balance">{d.titel}</h2>
                  <p className="mt-6 text-[var(--muted)] text-lg leading-relaxed max-w-xl">{d.beschrijving}</p>

                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                    {d.voordelen.map((v) => (
                      <li key={v} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/offerte" className="inline-flex items-center gap-2 mt-8 font-semibold link-underline">
                    Offerte {d.titel.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
