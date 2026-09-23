'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { werkwijze } from '@/lib/data';

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-paper-50 relative overflow-hidden">
      {/* Decoratieve grid-achtergrond */}
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="container-tight relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="eyebrow mb-4">Werkwijze</div>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-ink-900">
            Vier stappen.<br />
            <span className="text-blue-500">Geen verrassingen.</span>
          </h2>
        </motion.div>

        {/* Stappen-grid + verbindende lijn (alleen zichtbaar op md+) */}
        <div className="relative">
          {/* Horizontale connector-lijn achter de kaarten */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent"
          />

          <div className="grid md:grid-cols-4 gap-5 md:gap-6">
            {werkwijze.map((stap, i) => (
              <motion.div
                key={stap.nummer}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl p-7 md:p-8 border border-paper-200 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-blue-200 h-full flex flex-col">
                  {/* Nummer-badge met progress-ring */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    {/* Pulse-ring bij hover */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500 scale-100 group-hover:scale-110"
                    />
                    {/* Buitenring */}
                    <div className="absolute inset-0 rounded-full border-2 border-paper-200 group-hover:border-blue-300 transition-colors duration-300" />
                    {/* Binnenstap met progress (i+1)/4 */}
                    <svg
                      className="absolute inset-0 -rotate-90"
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="var(--color-blue-500)"
                        strokeWidth="3"
                        strokeDasharray={`${((i + 1) / werkwijze.length) * 289} 289`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    {/* Cijfer in het midden */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-display text-2xl md:text-3xl font-bold text-ink-900 group-hover:text-blue-500 transition-colors duration-300">
                        {stap.nummer}
                      </span>
                    </div>
                    {/* Check-mark in de hoek voor voltooide stappen (alle behalve laatste) */}
                    {i < werkwijze.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Pijltje tussen stappen (alleen op md+, behalve laatste) */}
                  {i < werkwijze.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute top-12 -right-3 translate-x-0 z-10 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm text-xs"
                    >
                      →
                    </div>
                  )}

                  {/* Titel */}
                  <h3 className="text-xl md:text-2xl font-bold text-ink-900 mb-3 text-center tracking-tight">
                    {stap.titel}
                  </h3>

                  {/* Tekst */}
                  <p className="text-sm text-ink-500 leading-relaxed text-center flex-1">
                    {stap.tekst}
                  </p>

                  {/* Voortgangs-bar onderaan */}
                  <div
                    aria-hidden="true"
                    className="mt-6 h-1 w-full bg-paper-100 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={reduce ? { width: `${((i + 1) / werkwijze.length) * 100}%` } : { width: 0 }}
                      whileInView={
                        reduce
                          ? undefined
                          : { width: `${((i + 1) / werkwijze.length) * 100}%` }
                      }
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
