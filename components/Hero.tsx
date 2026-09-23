'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative">
      {/* Full-width achtergrond foto met hogere min-height */}
      <div className="relative h-[92vh] min-h-[680px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=2400&q=85&auto=format&fit=crop"
          alt="Wijk met pannendaken in Zuid-Holland"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Donkere overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/40 to-ink-950/85" />

        {/* Grid patroon voor textuur */}
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

        {/* Tekst content */}
        <div className="relative h-full container-wide flex flex-col justify-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex pill mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-widest">LK Dakwerken · Zuid-Holland</span>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.03em] text-balance text-white"
            >
              Wij zijn <span className="text-blue-500">LK</span>
              <br />Dakwerken.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed"
            >
              Specialisten in platte en licht hellende daken. Onderhoud, renovatie en nieuwbouw. Waar kunnen we u mee helpen?
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link href="/contact" className="btn-pill">
                <span className="label">Direct contact</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/offerte" className="btn-ghost border-white/40 text-white hover:bg-white hover:text-ink-900">
                Offerte aanvragen
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator onderaan */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </div>

      {/* 3 service-pill cards - BLOK onder hero, NIET overlappend */}
      <div className="container-wide relative z-10 -mt-16 md:-mt-20 mb-12 md:mb-16 pointer-events-none">
        <div className="grid md:grid-cols-3 gap-4 pointer-events-auto">
          {[
            { label: 'Bitumen', href: '/diensten/bitumen-daken', desc: 'Bitumen daken' },
            { label: 'Renovatie', href: '/diensten/renovatie', desc: 'Dakrenovatie' },
            { label: 'Lekkage', href: '/diensten/lekkage', desc: 'Spoedservice' },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-3 panel p-5 md:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-400 mb-1">0{i + 1}</div>
                  <span className="text-lg md:text-xl font-bold text-ink-900 block leading-tight">{item.label}</span>
                  <span className="text-xs text-ink-500 block mt-0.5">{item.desc}</span>
                </div>
                <span className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-blue-500 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform flex-shrink-0">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
