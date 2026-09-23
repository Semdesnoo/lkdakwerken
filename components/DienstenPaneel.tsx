'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { diensten } from '@/lib/data';
import { foto } from '@/lib/images';
import { Lijnen } from '@/components/Lijnen';
import { Reveal } from '@/components/Reveal';

/**
 * Diensten op de homepage: een donker ink-paneel met links een lijst van de
 * vijf specialisaties en rechts de foto van de actieve dienst. Hoveren of
 * klikken wisselt de foto met een crossfade.
 *
 * Onder 768px valt het paneel terug op gestapelde kaarten, omdat hoveren
 * daar geen betekenis heeft. Het raster op /diensten blijft ongemoeid.
 */
export function DienstenPaneel() {
  const [actief, setActief] = useState(0);
  const reduce = useReducedMotion();
  const dienst = diensten[actief];

  return (
    <section className="section-pad bg-paper-50">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 text-white p-6 sm:p-10 lg:p-14">
            <Lijnen
              variant="donker"
              className="absolute -top-32 -right-40 w-[46rem] h-[40rem]"
            />

            <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Links: kop, lijst en knop */}
              <div className="lg:col-span-5">
                <h2 className="text-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.035em] text-balance">
                  Vijf specialisaties voor een zorgeloos dak.
                </h2>
                <p className="mt-5 text-white/75 leading-relaxed max-w-md">
                  Van een lekkage op zaterdagavond tot een complete dakrenovatie van uw
                  bedrijfspand. LK Dakwerken levert alle dakdiensten onder één dak.
                </p>

                {/* Interactieve lijst vanaf 768px */}
                <ul className="hidden md:block mt-10 border-b border-blue-400/20">
                  {diensten.map((d, i) => (
                    <li key={d.slug}>
                      <button
                        type="button"
                        onMouseEnter={() => setActief(i)}
                        onFocus={() => setActief(i)}
                        onClick={() => setActief(i)}
                        aria-pressed={i === actief}
                        aria-controls="dienst-uitgelicht"
                        className={`w-full flex items-center justify-between gap-4 py-4 text-left border-t border-blue-400/20 transition-colors ${
                          i === actief ? 'text-blue-400' : 'text-white hover:text-blue-300'
                        }`}
                      >
                        <span className="text-xl lg:text-2xl font-semibold tracking-[-0.02em]">
                          {d.titel}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            i === actief ? 'bg-blue-500 text-white' : 'bg-white/10 text-white'
                          }`}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Terugval onder 768px: gestapelde kaarten met dezelfde inhoud */}
                <div className="md:hidden mt-8 space-y-4">
                  {diensten.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/diensten/${d.slug}`}
                      className="block rounded-2xl overflow-hidden border border-blue-400/20 bg-white/[0.06]"
                    >
                      <div className="aspect-[16/9] bg-ink-900">
                        <img
                          src={foto(d.heroImage, 700, 75)}
                          alt={`${d.titel} door LK Dakwerken`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">
                          {d.titel}
                        </h3>
                        <p className="mt-2 text-sm text-white/75 leading-relaxed">{d.korte}</p>
                        <span className="inline-flex items-center gap-2 mt-4 text-[0.9375rem] font-semibold text-blue-400">
                          Lees meer
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link href="/diensten" className="btn-pill-white mt-9">
                  <span className="label">Alle diensten</span>
                  <span className="arrow">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>

              {/* Rechts: foto van de actieve dienst */}
              <div
                id="dienst-uitgelicht"
                aria-live="polite"
                className="hidden md:block lg:col-span-7"
              >
                <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden bg-ink-900">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={dienst.slug}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <img
                        src={foto(dienst.heroImage, 1200, 80)}
                        alt={`${dienst.titel} door LK Dakwerken`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Donkere voet onder de foto, zodat de tekst leesbaar blijft */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink-950 via-ink-950/75 to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                        <h3 className="text-display text-2xl lg:text-3xl tracking-[-0.02em] text-white">
                          {dienst.titel}
                        </h3>
                        <p className="mt-2 text-white/85 leading-relaxed max-w-md">{dienst.korte}</p>
                        <Link
                          href={`/diensten/${dienst.slug}`}
                          className="group inline-flex items-center gap-2 mt-5 text-[0.9375rem] font-semibold text-white"
                        >
                          <span className="link-underline">Lees meer</span>
                          <ArrowRight
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
