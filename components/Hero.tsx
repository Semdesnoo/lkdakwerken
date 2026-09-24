'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HeroVideo } from '@/components/HeroVideo';

export function Hero() {
  const reduce = useReducedMotion();

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
              Bitumen dakbedekking, renovatie, nieuwbouw, onderhoud en spoedhulp bij lekkage.
              Passie voor het vak, met 10 jaar garantie.
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
    </section>
  );
}
