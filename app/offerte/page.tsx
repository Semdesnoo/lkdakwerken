import type { Metadata } from 'next';
import { OfferteFormulier } from '@/components/OfferteFormulier';
import { Check, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Offerte aanvragen - Binnen 24 uur reactie',
  description: 'Vraag een gratis offerte aan voor uw dakwerkzaamheden. Binnen 5 werkdagen een heldere offerte.',
  alternates: { canonical: '/offerte' },
};

export default function OffertePage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6">Offerte</div>
            <h1 className="text-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] text-balance">
              Vraag uw
              <br />
              <span className="text-[var(--accent)]">gratis offerte aan.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <OfferteFormulier />
          </div>

          <aside className="lg:col-span-5 space-y-px bg-[var(--border)]">
            <div className="bg-[var(--background)] p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-3">Wat u krijgt</div>
              <ul className="space-y-2 text-sm">
                {['Gratis dakinspectie op locatie', 'Heldere offerte zonder kleine lettertjes', 'Foto-rapport van de huidige staat', 'Dakmerk garantiecertificaat', '10 jaar garantie op waterdichtheid'].map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--foreground)] text-[var(--background)] p-6">
              <Clock className="w-5 h-5 text-[var(--accent)] mb-3" />
              <div className="text-display text-xl tracking-tight">Spoed bij lekkage?</div>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">Wacht niet op een offerte. Bel direct.</p>
              <a href="tel:+31612345678" className="block mt-4 font-mono text-2xl">06 12 34 56 78</a>
            </div>

            <div className="bg-[var(--background)] p-6">
              <div className="font-semibold">Waarom LK Dakwerken?</div>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                Dakmerk erkend, VCA-gecertificeerd, 25 jaar ervaring. Eerlijke prijzen en garantie waar u op kunt bouwen.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
