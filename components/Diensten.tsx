'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { diensten } from '@/lib/data';

export function Diensten() {
  // Default = de dienst waarvan de statische foto afkomstig is (Renovatie)
  const [activeSlug, setActiveSlug] = useState<string>('renovatie');
  const active = diensten.find((d) => d.slug === activeSlug) ?? diensten[0];

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
          {/* Diensten panel — hover op een titel verwisselt de foto */}
          <div className="md:col-span-7 panel p-8 md:p-10">
            <div>
              {diensten.map((dienst) => {
                const isActive = dienst.slug === activeSlug;
                return (
                  <Link
                    key={dienst.slug}
                    href={`/diensten/${dienst.slug}`}
                    onMouseEnter={() => setActiveSlug(dienst.slug)}
                    onFocus={() => setActiveSlug(dienst.slug)}
                    className="group block py-5 first:pt-0 last:pb-0 divider-dashed first:border-t-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-200 ${
                          isActive
                            ? 'text-blue-500'
                            : 'text-ink-900 group-hover:text-blue-500'
                        }`}
                      >
                        {dienst.titel}
                      </span>
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                          isActive
                            ? 'bg-blue-500 text-white scale-110'
                            : 'bg-paper-100 text-ink-900 group-hover:bg-blue-500 group-hover:text-white'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10">
              <Link href="/diensten" className="btn-pill-dark">
                <span className="label">Bekijk alle diensten</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>

          {/* Foto rechts — crossfade tussen heroImages */}
          <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[500px] rounded-3xl overflow-hidden bg-ink-900">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={active.slug}
                src={`https://images.unsplash.com/${active.heroImage}?w=900&q=80&auto=format&fit=crop`}
                alt={active.titel}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent pointer-events-none" />

            {/* Tekst onderaan — ook crossfade */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-2">
                    {active.titel}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold leading-tight">
                    {active.korte}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
