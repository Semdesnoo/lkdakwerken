import type { Metadata } from 'next';
import { Check, Clock } from 'lucide-react';
import { fotos } from '@/lib/data';
import { OfferteFormulier } from '@/components/OfferteFormulier';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Offerte aanvragen - Binnen 24 uur reactie',
  description: 'Vraag een gratis offerte aan voor uw dakwerkzaamheden. Binnen 5 werkdagen een heldere offerte.',
  alternates: { canonical: '/offerte' },
};

const inbegrepen = [
  'Gratis dakinspectie op locatie',
  'Heldere offerte zonder kleine lettertjes',
  'Fotorapport van de huidige staat',
  'Dakmerk garantiecertificaat',
  '10 jaar garantie op waterdichtheid',
];

export default function OffertePage() {
  return (
    <>
      <PageHeader
        titel="Vraag uw"
        accent="gratis offerte aan."
        lead="Vul het formulier in en we bellen binnen één werkdag terug om een inspectie in te plannen."
        image={fotos.offerteHeader}
        imageAlt="Dakdekkers bespreken de werkplanning"
        compact
      />

      <section className="section-pad bg-paper-50 zigzag overflow-hidden">
        <div className="container-wide grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <OfferteFormulier />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 space-y-4">
            <Reveal>
              <div className="panel p-7">
                <h2 className="text-display text-xl tracking-[-0.02em] text-ink-900">Wat u krijgt</h2>
                <ul className="mt-5 space-y-3">
                  {inbegrepen.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-ink-700">
                      <Check className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" strokeWidth={3} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="rounded-3xl bg-ink-900 text-white p-7">
                <span className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-5">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </span>
                <h2 className="text-display text-xl tracking-[-0.02em]">Spoed bij lekkage?</h2>
                <p className="mt-2.5 text-white/75 leading-relaxed">
                  Wacht niet op een offerte. Bel ons direct, 7 dagen per week.
                </p>
                <a
                  href="tel:+31612345678"
                  className="mt-5 inline-block text-2xl font-display font-bold tracking-[-0.02em] link-underline"
                >
                  06 12 34 56 78
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
