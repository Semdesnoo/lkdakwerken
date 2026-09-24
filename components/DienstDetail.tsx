import Link from 'next/link';
import { ArrowRight, Check, Phone, Plus } from 'lucide-react';
import { diensten, certificeringen, werkwijze, faq, bedrijf } from '@/lib/data';
import { foto } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

interface Props {
  dienst: (typeof diensten)[number];
}

export default function DienstDetail({ dienst }: Props) {
  const andere = diensten.filter((d) => d.slug !== dienst.slug);

  return (
    <>
      <PageHeader
        titel={dienst.titel}
        lead={dienst.korte}
        image={dienst.heroImage}
        imageAlt={`${dienst.titel} door LK Dakwerken`}
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Offerte aanvragen</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <a href="tel:0102713824" className="btn-ghost-invert">
          <Phone className="w-4 h-4" aria-hidden="true" />
          Bel ons
        </a>
      </PageHeader>

      {/* Inhoud met sticky offerte-blok */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900">
                Wat wij voor u doen
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-700">{dienst.beschrijving}</p>
            </Reveal>

            <Reveal delay={0.05} className="mt-12">
              <h3 className="text-xl font-semibold text-ink-900">Inbegrepen bij {dienst.titel.toLowerCase()}</h3>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4">
                {dienst.voordelen.map((voordeel) => (
                  <li key={voordeel} className="card p-5 flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" aria-hidden="true" strokeWidth={3} />
                    </span>
                    <span className="text-ink-800 leading-snug">{voordeel}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05} className="mt-14">
              <h3 className="text-xl font-semibold text-ink-900">Zo pakken we het aan</h3>
              <ol className="mt-6 relative">
                <span
                  aria-hidden="true"
                  className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500 via-paper-300 to-transparent"
                />
                {werkwijze.map((stap) => (
                  <li key={stap.titel} className="relative pl-10 pb-8 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-blue-500 ring-4 ring-white"
                    />
                    <h4 className="text-lg font-semibold text-ink-900">{stap.titel}</h4>
                    <p className="mt-1.5 text-ink-500 leading-relaxed max-w-lg">{stap.tekst}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Offerte-blok blijft meelopen op desktop */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="panel p-7">
                <h3 className="text-display text-2xl tracking-[-0.02em] text-ink-900">
                  Wat kost {dienst.titel.toLowerCase()}?
                </h3>
                <p className="mt-3 text-ink-500 leading-relaxed">
                  U krijgt binnen 3 werkdagen een heldere offerte, na een gratis inspectie op locatie.
                </p>
                <Link href="/offerte" className="btn-pill mt-6 w-full justify-between">
                  <span className="label">Offerte aanvragen</span>
                  <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </Link>
                <a
                  href="tel:0102713824"
                  className="mt-5 flex items-center gap-3 text-ink-900 font-semibold group"
                >
                  <span className="w-10 h-10 rounded-button-inner bg-paper-100 flex items-center justify-center shrink-0 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="link-underline">{bedrijf.telefoon}</span>
                </a>
              </div>

              <ul className="card p-6 space-y-3">
                {certificeringen.map((c) => (
                  <li key={c.naam} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" strokeWidth={3} />
                    <span>
                      <span className="block font-medium text-ink-900">{c.naam}</span>
                      <span className="block text-sm text-ink-500">{c.uitleg}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Veelgestelde vragen */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde vragen
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl mx-auto space-y-3">
            {faq.map((item) => (
              <details key={item.vraag} className="group faq-item panel-flat p-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold leading-snug text-ink-900">{item.vraag}</h3>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-4 text-ink-500 leading-relaxed">{item.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Andere diensten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
              Ook voor deze vakgebieden
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {andere.map((d) => (
              <Link
                key={d.slug}
                href={`/diensten/${d.slug}`}
                className="group card card-hover overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                  <img
                    src={foto(d.heroImage, 600, 75)}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-ink-900 group-hover:text-blue-500 transition-colors">
                    {d.titel}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{d.korte}</p>
                  <span className="btn-link mt-auto pt-4">
                    Meer info
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
