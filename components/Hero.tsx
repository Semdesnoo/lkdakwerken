'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { diensten } from '@/lib/data';
import { foto } from '@/lib/images';
import { HeroVideo } from '@/components/HeroVideo';

const snelkoppelingen = ['bitumen-daken', 'renovatie', 'lekkage'];

export function Hero() {
  const reduce = useReducedMotion();
  const kaarten = snelkoppelingen
    .map((slug) => diensten.find((d) => d.slug === slug))
    .filter((d): d is (typeof diensten)[number] => Boolean(d));

  return (
    <section className="relative">
      <div className="relative h-[92vh] min-h-[640px] overflow-hidden">
        <HeroVideo />

        <div className="relative h-full container-wide flex flex-col justify-center">
          <div className="max-w-3xl pt-10 pb-16 md:pt-0 md:pb-24">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-blue-400"
            >
              Uw dak. Ons vak.
            </motion.p>

            {/* De H1 draagt de bedrijfsnaam en de belangrijkste zoekterm, want
                Google weegt die kop zwaar mee. De tagline staat er als kleine
                regel boven. Zuid-Holland zit in de zin eronder: als tweede
                kopregel brak dat woord over drie regels. */}
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-5xl md:text-7xl lg:text-[86px] leading-[0.95] tracking-[-0.04em] text-white text-balance"
            >
              LK Dakwerken
              <br />
              <span className="text-blue-400">Uw dakdekker</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed"
            >
              Specialist in platte daken in Rotterdam en heel Zuid-Holland. Bitumen
              dakbedekking, renovatie, nieuwbouw, onderhoud en spoedhulp bij lekkage.
              Dakmerk erkend, met 10 jaar garantie.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link href="/offerte" className="btn-pill">
                <span className="label">Offerte aanvragen</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <Link href="/contact" className="btn-ghost-invert">
                Bel ons
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Drie snelkoppelingen met fotominiatuur, als blok onder de hero */}
      <div className="container-wide relative z-10 -mt-14 md:-mt-20 mb-16 md:mb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {kaarten.map((dienst, i) => (
            <motion.div
              key={dienst.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/diensten/${dienst.slug}`}
                className="group panel flex items-center gap-4 p-4 md:p-5 hover:-translate-y-1 transition-transform duration-300 h-full"
              >
                <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-2xl overflow-hidden shrink-0 bg-paper-100">
                  <img
                    src={foto(dienst.heroImage, 300, 70)}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-lg md:text-xl font-semibold tracking-[-0.02em] text-ink-900 leading-tight group-hover:text-blue-500 transition-colors">
                    {dienst.titel}
                  </span>
                  <span className="block text-sm text-ink-500 mt-1 leading-snug">{dienst.korte}</span>
                </div>
                <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
