'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { diensten } from '@/lib/data';
import { foto } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

/**
 * Diensten op de homepage: een licht paneel met links een lijst van de vijf
 * specialisaties en rechts de foto van de actieve dienst. Hoveren of klikken
 * wisselt de foto met een crossfade.
 *
 * De rijen staan ruim uit elkaar en worden gescheiden door stippellijnen, met
 * daaronder een knop over de volle breedte van de kolom.
 *
 * Onder 768px valt het paneel terug op gestapelde kaarten, omdat hoveren daar
 * geen betekenis heeft. Het raster op /diensten blijft ongemoeid.
 */
export function DienstenPaneel() {
  const [actief, setActief] = useState(0);
  const reduce = useReducedMotion();
  const dienst = diensten[actief];

  return (
    <section className="section-pad -mt-16 md:-mt-24 pt-16 md:pt-24 bg-paper-50 zigzag overflow-hidden">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-white text-ink-900 border border-ink-900/10 shadow-[0_2px_40px_rgba(10,10,10,0.06)] p-6 sm:p-10 lg:p-14">

            <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-start lg:items-stretch">
              {/* Links: kop, lijst en knop */}
              <div className="lg:col-span-5 flex flex-col">
                <h2 className="text-display text-4xl md:text-5xl leading-[1.04] tracking-[-0.035em] text-balance text-ink-900">
                  Vijf specialisaties voor een zorgeloos dak.
                </h2>
                <p className="mt-5 text-ink-600 leading-relaxed max-w-md">
                  Van een lekkage op zaterdagavond tot een complete dakrenovatie van uw
                  bedrijfspand. LK Dakwerken levert alle dakdiensten onder één dak.
                </p>

                {/* Interactieve lijst vanaf 768px */}
                <ul className="hidden md:block mt-10">
                  {diensten.map((d, i) => (
                    <li key={d.slug}>
                      <button
                        type="button"
                        onMouseEnter={() => setActief(i)}
                        onFocus={() => setActief(i)}
                        onClick={() => setActief(i)}
                        aria-pressed={i === actief}
                        aria-controls="dienst-uitgelicht"
                        className={`w-full flex items-center justify-between gap-4 py-6 text-left border-b border-dashed border-ink-900/15 transition-colors ${
                          i === actief ? 'text-blue-600' : 'text-ink-900 hover:text-blue-600'
                        }`}
                      >
                        <span className="text-xl lg:text-2xl font-semibold tracking-[-0.02em]">
                          {d.titel}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 transition-transform ${
                            i === actief ? 'translate-x-1' : ''
                          }`}
                        >
                          <ArrowRight className="w-6 h-6" />
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
                      className="block rounded-2xl overflow-hidden border border-ink-900/10 bg-paper-50"
                    >
                      <div className="aspect-[16/9] bg-paper-100">
                        <img
                          src={foto(d.heroImage, 700, 75)}
                          alt={`${d.titel} door LK Dakwerken`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink-900">
                          {d.titel}
                        </h3>
                        <p className="mt-2 text-sm text-ink-600 leading-relaxed">{d.korte}</p>
                        <span className="inline-flex items-center gap-2 mt-4 text-[0.9375rem] font-semibold text-blue-600">
                          Lees meer
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link href="/diensten" className="btn-breed mt-9 lg:mt-auto">
                  <span>Alle diensten</span>
                  <span className="arrow">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>

              {/* Rechts: foto van de actieve dienst. Vanaf lg vult hij de volle
                  hoogte van de lijst ernaast, zodat er geen gat onder valt. */}
              <div
                id="dienst-uitgelicht"
                aria-live="polite"
                className="hidden md:block lg:col-span-7"
              >
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem] rounded-2xl overflow-hidden bg-paper-100">
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
