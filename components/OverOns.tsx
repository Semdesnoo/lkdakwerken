import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { stats } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { Kerncijfers } from '@/components/Kerncijfers';

export function OverOns() {
  // Wit: staat tussen het paper-50 diensten-paneel en de donkere werkwijze.
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        {/* Verhaal links (7), garantie rechts (5). De kop heeft ~500px nodig
            om op twee regels te blijven; bij een gelijke 50/50-deling breekt
            "Geen onderaannemers." op 1440px in drieën. */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              Een vast team.
              <br />
              <span className="text-blue-500">Geen onderaannemers.</span>
            </h2>
            <p className="lead mt-6 max-w-xl">
              LK Dakwerken werkt met passie en gaat altijd voor het beste resultaat, zodat u nooit meer met lekkage te maken krijgt. We werken met een vast team van tien vakmensen. Iedere dakdekker bij ons heeft minimaal 5 jaar werkervaring en is in dienst. Zo weet u wie er op uw dak staat.
            </p>

            <Link href="/over" className="btn-pill-dark mt-9">
              <span className="label">Ons verhaal</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="card p-6 md:p-7 flex items-center gap-4">
              <span className="w-12 h-12 rounded-button-inner bg-blue-500 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-ink-900">10 jaar garantie</div>
                <div className="text-sm text-ink-500">Garantie van LK Dakwerken</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cijfers op een eigen rij over de volle breedte: vier naast elkaar
            lezen als bewijs, 2x2 in een smalle kolom leest als een formulier.
            De lijn erboven scheidt het verhaal van de cijfers. */}
        <Kerncijfers
          cijfers={stats}
          className="mt-16 md:mt-20 pt-12 border-t border-ink-900/10 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
        />
      </div>
    </section>
  );
}
