import Link from 'next/link';
import { diensten, certificeringen, werkwijze, faq } from '@/lib/data';
import { ArrowRight, Check } from 'lucide-react';

interface Props {
  dienst: typeof diensten[number];
}

export default function DienstDetail({ dienst }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={`https://images.unsplash.com/${dienst.heroImage}?w=2000&q=80&auto=format&fit=crop`} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 to-ink-900/50" />
        </div>
        <div className="container-wide relative py-24 md:py-32">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 mb-6">
            <Link href="/lkdakwerken/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/lkdakwerken/diensten" className="hover:text-white">Diensten</Link>
            <span>/</span>
            <span className="text-blue-500">{dienst.titel}</span>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-4">Dienst</div>
          <h1 className="text-display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.03em]">
            {dienst.titel}.
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/85 max-w-2xl font-light leading-relaxed">
            {dienst.korte}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/lkdakwerken/offerte" className="btn-pill">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link href="/lkdakwerken/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white hover:text-ink-900 transition-colors">
              Bel: 010 - 271 38 24
            </Link>
          </div>
        </div>
      </section>

      {/* Foto */}
      <section className="container-wide -mt-px relative z-10">
        <div className="relative aspect-[21/6] md:aspect-[21/5] rounded-3xl overflow-hidden -mb-12 md:-mb-16">
          <img
            src={`https://images.unsplash.com/${dienst.heroImage}?w=1800&q=80&auto=format&fit=crop`}
            alt={dienst.titel}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Inleiding */}
      <section className="section-pad bg-white pt-32 md:pt-40">
        <div className="container-wide grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Over deze dienst</div>
            <h2 className="text-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.03em]">
              Wat we doen.
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl leading-relaxed text-ink-700">
              {dienst.beschrijving}
            </p>
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
            <div className="md:col-span-5">
              <div className="eyebrow mb-4">Wat u krijgt</div>
              <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
                Vier redenen om voor LK te kiezen.
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {dienst.voordelen.map((voordeel, i) => (
              <div key={i} className="panel p-6 md:p-8 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-2">0{i + 1}</div>
                  <p className="text-lg md:text-xl font-medium leading-tight text-ink-900">{voordeel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-4">Werkwijze</div>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
              Vier stappen. Geen verrassingen.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {werkwijze.map((stap, i) => (
              <div key={stap.nummer} className="panel p-6 md:p-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white font-mono text-sm font-bold mb-6">
                  <span>{stap.nummer}</span>
                  <span className="w-1 h-1 rounded-full bg-white/50"></span>
                  <span>0{i + 1}/04</span>
                </div>
                <h3 className="text-xl font-bold text-ink-900 mb-3">{stap.titel}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{stap.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificeringen */}
      <section className="section-pad bg-ink-900 text-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
            <div className="md:col-span-5">
              <div className="eyebrow mb-4">Gecertificeerd</div>
              <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
                Kwaliteit die u kunt controleren.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg text-white/70 leading-relaxed">
                Wij werken volgens de strenge kwaliteitsrichtlijnen van Dakmerk. Elk project wordt gecontroleerd.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {certificeringen.map((c, i) => (
              <div key={i} className="bg-white/[0.06] backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{c.naam}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{c.uitleg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-4">FAQ</div>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
              Veelgestelde vragen.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faq.map((item, i) => (
              <details key={i} className="group panel p-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-lg font-medium leading-tight text-ink-900">{item.vraag}</h3>
                  <span className="text-blue-500 text-2xl leading-none group-open:rotate-45 transition-transform flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">+</span>
                </summary>
                <p className="mt-4 text-ink-500 leading-relaxed">{item.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Andere diensten */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-4">Andere diensten</div>
            <h2 className="text-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.03em]">
              Ook voor deze vakgebieden.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {diensten.filter(d => d.slug !== dienst.slug).map((d) => (
              <Link key={d.slug} href={`/diensten/${d.slug}`} className="group panel p-6 hover:bg-ink-900 transition-all">
                <h3 className="text-lg font-bold text-ink-900 group-hover:text-white mb-2 transition-colors">{d.titel}</h3>
                <p className="text-sm text-ink-500 group-hover:text-white/80 leading-relaxed transition-colors">{d.korte}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 group-hover:text-white">
                  Meer info <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
