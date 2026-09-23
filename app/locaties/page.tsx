import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { locaties } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Werkgebied - Dakdekker in heel Zuid-Holland',
  description: 'LK Dakwerken is werkzaam in alle gemeenten van Zuid-Holland. Bekijk alle locaties.',
  alternates: { canonical: '/locaties' },
};

export default function LocatiesIndexPage() {
  const regios = Array.from(new Set(locaties.map((l) => l.regio)));

  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6">Werkgebied</div>
            <h1 className="text-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] text-balance">
              {locaties.length} gemeenten.
              <br />
              <span className="text-[var(--accent)]">Heel Zuid-Holland.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-wide space-y-16">
          {regios.map((regio) => {
            const locs = locaties.filter((l) => l.regio === regio);
            return (
              <div key={regio}>
                <div className="flex items-end justify-between border-b border-[var(--border)] pb-3 mb-6">
                  <h2 className="text-display text-2xl md:text-3xl tracking-tight">Regio {regio}</h2>
                  <span className="text-xs font-mono text-[var(--muted)]">{locs.length} locaties</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
                  {locs.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locaties/${loc.slug}`}
                      className="bg-[var(--background)] px-4 py-4 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors group flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{loc.naam}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-[var(--foreground)] text-[var(--background)]">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display text-4xl md:text-5xl tracking-[-0.04em] text-balance">
              Staat uw gemeente er niet tussen?
            </h2>
            <p className="mt-6 opacity-80 text-lg max-w-xl">
              Geen probleem. Waar u in Zuid-Holland ook woont, wij komen bij u langs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+31612345678" className="inline-flex items-center gap-2 bg-[var(--background)] text-[var(--foreground)] font-semibold px-6 py-3 hover:opacity-85 transition-opacity">
                <Phone className="w-4 h-4" /> Bel ons
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[var(--background)]/30 px-6 py-3 font-semibold hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors">
                Contactformulier
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-[var(--background)]/20 border border-[var(--background)]/20">
            <div className="bg-[var(--foreground)] p-6">
              <div className="text-display text-4xl tracking-tight">10 jaar</div>
              <div className="text-sm opacity-60 mt-2">Dakmerk garantie</div>
            </div>
            <div className="bg-[var(--foreground)] p-6">
              <div className="text-display text-4xl tracking-tight">{locaties.length}</div>
              <div className="text-sm opacity-60 mt-2">gemeenten</div>
            </div>
            <div className="bg-[var(--foreground)] p-6">
              <div className="text-display text-4xl tracking-tight">7 dagen</div>
              <div className="text-sm opacity-60 mt-2">bereikbaar</div>
            </div>
            <div className="bg-[var(--foreground)] p-6">
              <div className="text-display text-4xl tracking-tight text-[var(--accent)]">25+</div>
              <div className="text-sm opacity-60 mt-2">jaar ervaring</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
