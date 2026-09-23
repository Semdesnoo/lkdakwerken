import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { diensten } from '@/lib/data';

export function Diensten() {
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-5">
            <div className="eyebrow mb-4">Onze diensten</div>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-ink-900">
              Vijf specialisaties voor een zorgeloos dak.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg text-ink-500 leading-relaxed">
              Van een lekkage op zaterdagavond tot een complete dakrenovatie van uw bedrijfspand. LK Dakwerken levert alle dakdiensten onder één dak.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Diensten panel (CDB-stijl) */}
          <div className="md:col-span-7 panel p-8 md:p-10">
            <div>
              {diensten.map((dienst) => (
                <Link
                  key={dienst.slug}
                  href={`/diensten/${dienst.slug}`}
                  className="group block py-5 first:pt-0 last:pb-0 divider-dashed first:border-t-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-xl md:text-2xl font-medium tracking-tight ${dienst.slug === "lekkage" ? "text-blue-500" : "text-ink-900"} group-hover:text-blue-500 transition-colors`}>
                      {dienst.titel}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-paper-100 group-hover:bg-blue-500 group-hover:text-white text-ink-900 flex items-center justify-center transition-all flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/diensten" className="btn-pill-dark">
                <span className="label">Bekijk alle diensten</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>

          {/* Foto rechts */}
          <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[500px] rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=900&q=80&auto=format&fit=crop"
              alt="Dakrenovatie in uitvoering"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-2">Dakmerk Erkend</div>
              <div className="text-2xl md:text-3xl font-bold leading-tight">10 jaar garantie op waterdichtheid</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
