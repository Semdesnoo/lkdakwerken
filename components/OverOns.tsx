import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { stats, certificeringen, fotos } from '@/lib/data';
import { foto } from '@/lib/images';
import { Reveal } from '@/components/Reveal';
import { Kerncijfers } from '@/components/Kerncijfers';

export function OverOns() {
  // Wit: staat tussen het paper-50 diensten-paneel en de donkere werkwijze.
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Foto. Op mobiel staat de kop erboven: eerst weten waar het over
              gaat, dan het beeld. Vandaar de omgekeerde volgorde tot lg. */}
          <Reveal className="lg:col-span-5 max-lg:order-2">
            <div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-ink-900">
                <img
                  src={foto(fotos.overOnsTeam, 1000, 80)}
                  alt="Het team van LK Dakwerken aan het werk op een dak"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Garantie-kaart staat onder de foto, nooit eroverheen */}
              <div className="card mt-4 p-5 md:p-6 flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </span>
                <div>
                  <div className="font-semibold text-ink-900">10 jaar garantie</div>
                  <div className="text-sm text-ink-500">Waterdichtheid via Dakmerk</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tekst en feiten */}
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 max-lg:order-1">
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
