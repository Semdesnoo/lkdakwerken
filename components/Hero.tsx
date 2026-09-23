'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative -mt-20 md:-mt-24">
      {/* Full-width achtergrond foto */}
      <div className="relative h-[88vh] min-h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=2000&q=80&auto=format&fit=crop"
          alt="Wijk met pannendaken in Zuid-Holland"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Donkere overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-900/40 to-ink-950/80" />

        {/* Tekst content */}
        <div className="relative h-full container-wide flex flex-col justify-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl pt-20"
          >
            <div className="pill mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              LK Dakwerken · Zuid-Holland
            </div>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.03em] text-balance text-white"
            >
              Wij zijn <span className="text-blue-500">LK</span> Dakwerken.
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed"
            >
              Specialisten in platte en licht hellende daken, zowel onderhoud als renovatie of nieuwbouw. Waar kunnen we u mee helpen?
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? false : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link href="/lkdakwerken/contact" className="btn-pill">
                <span className="label">Direct contact</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/lkdakwerken/offerte" className="btn-ghost border-white/40 text-white hover:bg-white hover:text-ink-900">
                Offerte aanvragen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 3 service-pill cards onderaan de hero, overlappend */}
      <div className="container-wide relative -mt-12 md:-mt-16 z-10 mb-16 md:mb-24">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Bitumen', href: '/diensten/bitumen-daken' },
            { label: 'Renovatie', href: '/diensten/renovatie' },
            { label: 'Lekkage', href: '/diensten/lekkage' },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-3 panel p-6 hover:shadow-2xl transition-all"
              >
                <span className="text-lg md:text-xl font-bold text-ink-900">{item.label}</span>
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform flex-shrink-0">
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
