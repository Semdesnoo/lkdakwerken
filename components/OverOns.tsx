import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { stats, certificeringen } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { Kerncijfers } from '@/components/Kerncijfers';

export function OverOns() {
  // Wit: staat tussen het paper-50 diensten-paneel en de donkere werkwijze.
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Geen afbeelding op de homepage — sectie is puur tekst */}
                    <Reveal className="lg:col-span-8 lg:col-start-3 max-w-3xl mx-auto">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              Een vast team.
              <br />
              <span className="text-blue-500">Geen onderaannemers.</span>
            </h2>
            <p className="lead mt-6 max-w-xl">
              LK Dakwerken is een Rotterdams familiebedrijf met meer dan 20 jaar ervaring. We werken met een vast team van tien vakmensen. Iedere dakdekker bij ons heeft minimaal 5 jaar werkervaring en is in dienst. Zo weet u wie er op uw dak staat.
            </p>

            <Kerncijfers
              cijfers={stats}
              className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 max-w-lg"
            />

            <div className="mt-10 card p-5 md:p-6 flex items-center gap-4 max-w-md">
              <span className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-ink-900">10 jaar garantie</div>
                <div className="text-sm text-ink-500">Garantie van LK Dakwerken</div>
              </div>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2.5">
              {certificeringen.map((c) => (
                <li key={c.naam} className="chip">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {c.naam}
                </li>
              ))}
            </ul>

            <Link href="/over" className="btn-pill-dark mt-10">
              <span className="label">Ons verhaal</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
