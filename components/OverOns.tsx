import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { stats, certificeringen } from '@/lib/data';

export function OverOns() {
  return (
    <section className="relative bg-ink-900 text-white overflow-hidden">
      {/* Achtergrond foto */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1676802037786-3697d60497ae?w=2000&q=80&auto=format&fit=crop"
          alt="Dakconstructie"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/80 to-ink-900/40" />
      </div>

      <div className="container-wide relative py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Linker: tekst */}
          <div className="md:col-span-7">
            <div className="eyebrow mb-4 text-blue-500">Over ons</div>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] mb-6">
              Met zorg gekozen.<br />
              <span className="text-blue-500">Met passie geleverd.</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
              LK Dakwerken is een Rotterdams familiebedrijf met meer dan 20 jaar ervaring. We werken met een vast team van tien vakmensen, geen onderaannemers. Iedere dakdekker in ons team heeft minimaal 5 jaar werkervaring en is in dienst. Zo weten we wie er op uw dak staat.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {certificeringen.slice(0, 4).map((c) => (
                <div key={c.naam} className="pill">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  {c.naam}
                </div>
              ))}
            </div>

            <Link href="/over" className="btn-pill">
              <span className="label">Meer over ons</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>

          {/* Rechter: stats panel */}
          <div className="md:col-span-5">
            <div className="bg-white/[0.06] backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center md:text-left">
                    <div className="font-display text-4xl md:text-5xl font-bold text-blue-500 leading-none tracking-tight">
                      {s.cijfer}
                    </div>
                    <div className="mt-2 text-xs text-white/70 leading-relaxed">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
