import Link from 'next/link';
import { stats, certificeringen, werkwijze, projecten, reviews, bedrijf } from '@/lib/data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Over LK Dakwerken — Vakmensen voor uw dak sinds 2004',
  description: 'LK Dakwerken is een Rotterdams dakdekkersbedrijf met meer dan 20 jaar ervaring in bitumen, renovatie, nieuwbouw, onderhoud en lekkage. Werkzaam in heel Zuid-Holland.',
};

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1676802037786-3697d60497ae?w=2000&q=80&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 to-ink-900" />
        </div>
        <div className="container-wide relative py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="pill mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Over ons
            </div>
            <h1 className="text-display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.03em] text-balance">
              Twintig jaar vakwerk.<br /><span className="text-blue-500">Eén Rotterdams team.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/85 max-w-2xl font-light leading-relaxed">
              LK Dakwerken is opgericht in 2004 met een eenvoudig idee: daken zijn de belangrijkste bescherming van een gebouw, en dat werk verdient een vakman.
            </p>
          </div>
        </div>
      </section>

      {/* Stats panel */}
      <section className="relative -mt-12 md:-mt-16 z-10 mb-12">
        <div className="container-wide">
          <div className="panel p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-5xl md:text-6xl font-bold text-blue-500 leading-none tracking-tight">
                    {s.cijfer}
                  </div>
                  <div className="mt-3 text-sm text-ink-500 leading-relaxed">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verhaal */}
      <section className="section-pad bg-white">
        <div className="container-wide grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Ons verhaal</div>
            <h2 className="text-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.03em]">
              Geen franchise.<br />Geen verkooppraat.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-ink-700">
            <p>
              In 2004 begon Kees van der Linden samen met één compagnon vanuit een busje in Rotterdam. De afspraak was simpel: geen verkooppraat, geen verborgen kosten, gewoon goed werk leveren. Die afspraak geldt vandaag nog steeds.
            </p>
            <p>
              We zijn bewust klein gebleven. Tien dakdekkers, geen onderaannemers die u nooit ziet. Iedereen in ons team heeft minimaal tien jaar ervaring en is in dienst.
            </p>
            <p>
              We zijn lid van Dakmerk en VCA-gecertificeerd. Elk project ontvangt een garantiecertificaat. Gaat er onverhoopt toch iets mis, dan staat de stichting Dakmerk garant.
            </p>
          </div>
        </div>
      </section>

      {/* Werkwijze / Team aanpak */}
      <section id="team" className="section-pad bg-paper-50 scroll-mt-32">
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

      {/* Projecten */}
      <section id="projecten" className="section-pad bg-white scroll-mt-32">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
            <div className="md:col-span-6">
              <div className="eyebrow mb-4">Recente projecten</div>
              <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
                Wat we vorig jaar hebben opgeleverd.
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projecten.map((p) => (
              <div key={p.titel} className="group panel overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden rounded-t-3xl">
                  <img
                    src={`https://images.unsplash.com/${p.image}?w=900&q=80&auto=format&fit=crop`}
                    alt={p.titel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="pill-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {p.type}
                    </span>
                    <span className="font-mono text-xs text-ink-400">{p.jaar}</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-1">{p.titel}</h3>
                  <p className="text-sm text-ink-500">{p.oppervlakte}</p>
                </div>
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
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {certificeringen.map((c, i) => (
              <div key={i} className="bg-white/[0.06] backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{c.naam}</h3>
                <p className="text-sm text-white/70">{c.uitleg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-4">Reviews</div>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
              4.9 op Google. 127 reviews.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.slice(0, 4).map((r) => (
              <div key={r.naam} className="panel p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-ink-900-100 text-ink-900 flex items-center justify-center font-bold text-lg">
                    {r.naam.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-ink-900">{r.naam}</div>
                    <div className="text-xs text-blue-500">{'★'.repeat(r.rating)}</div>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-ink-700">&ldquo;{r.tekst}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-paper-200 text-xs text-ink-500 font-mono uppercase tracking-widest">
                  {r.rol}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bedrijfsinfo */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <div className="panel p-8 md:p-12">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <div className="eyebrow mb-4">Gegevens</div>
                <h2 className="text-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.03em]">
                  Waar we zitten.
                </h2>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-3">Adres</h3>
                  <p className="text-lg text-ink-900">{bedrijf.adres}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-3">Contact</h3>
                  <p className="text-lg text-ink-900">{bedrijf.telefoon}</p>
                  <p className="text-lg text-ink-500">{bedrijf.email}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-3">Openingstijden</h3>
                  <p className="text-base text-ink-900">Ma-Vr: {bedrijf.openingstijden.maVrij}</p>
                  <p className="text-base text-ink-900">Za: {bedrijf.openingstijden.za}</p>
                  <p className="text-base text-ink-500">Zo: {bedrijf.openingstijden.zo}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-3">Bedrijfsgegevens</h3>
                  <p className="text-base text-ink-900">KvK: {bedrijf.kvk}</p>
                  <p className="text-base text-ink-900">BTW: {bedrijf.btw}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-blue-500 text-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
              <h2 className="text-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em]">
                Klaar om uw dak aan te pakken?
              </h2>
              <p className="mt-6 text-xl text-white/95 max-w-2xl">
                Vraag vandaag nog een vrijblijvende offerte aan. We komen binnen drie werkdagen bij u langs.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3">
              <Link href="/offerte" className="btn-pill-dark">
                <span className="label">Offerte aanvragen</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-500 transition-colors">
                Bel ons direct
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
