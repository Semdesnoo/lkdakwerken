'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { google, reviews } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { SliderKnoppen, useSlider } from '@/components/Slider';

/**
 * Het woord Google in de officiële lettersleuren. Dit is de enige plek waar
 * het palet wordt losgelaten, omdat het om een merknaam gaat.
 */
function GoogleWoord({ className = '' }: { className?: string }) {
  return (
    <span className={className}>
      <span className="google-blauw">G</span>
      <span className="google-rood">o</span>
      <span className="google-geel">o</span>
      <span className="google-blauw">g</span>
      <span className="google-groen">l</span>
      <span className="google-rood">e</span>
    </span>
  );
}

/** Gouden sterren horen bij het Google-idioom en staan daarom los van het palet. */
function GoudenSterren({ className = 'w-4 h-4', label }: { className?: string; label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={label ?? '5 van de 5 sterren'}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} aria-hidden="true" strokeWidth={0} className={`${className} ster-goud`} />
      ))}
    </span>
  );
}

const trackVarianten = {
  verborgen: {},
  zichtbaar: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const kaartVarianten = {
  verborgen: { opacity: 0, scale: 0.96 },
  zichtbaar: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function GoogleReviews() {
  const reduce = useReducedMotion();
  const { trackProps, terug, vooruit, stap } = useSlider({ automatisch: true });

  return (
    <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
      <div className="container-wide relative">
        <Reveal className="max-w-3xl">
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
            Dit zeggen onze klanten in Google
          </h2>
        </Reveal>

        {/* Kopbalk met score, sterren en de knop naar het Google-profiel */}
        <Reveal delay={0.08}>
          <div className="mt-10 md:mt-12 rounded-2xl border border-white/15 bg-white/[0.06] p-4 sm:p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-3">
              <GoogleWoord className="text-display text-3xl md:text-4xl tracking-[-0.02em] leading-none" />
              <span className="text-base md:text-lg font-semibold text-white/80 leading-none">
                Beoordelingen
              </span>
            </div>

            <div className="flex items-center gap-4 lg:border-l lg:border-blue-400/25 lg:pl-10">
              <span className="font-display text-5xl font-bold leading-none tracking-[-0.03em]">
                {google.score}
              </span>
              <div>
                <GoudenSterren
                  className="w-5 h-5"
                  label={`${google.score} van de 5 sterren op Google`}
                />
                <p className="mt-1.5 text-sm text-white/70">{google.aantal} beoordelingen</p>
              </div>
            </div>

            <a
              href={google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-white self-start lg:ml-auto"
            >
              <span className="label">Beoordeel ons op Google</span>
              <span className="arrow">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </Reveal>

        {/* Slider met de beoordelingen zelf */}
        <div className="mt-10 border-t border-blue-400/20 pt-8 md:pt-10">
          <div className="flex items-center justify-between gap-6 mb-6">
            <p className="text-sm text-white/70">
              De beoordelingen lopen door. Veeg of sleep om zelf te bladeren.
            </p>
            <SliderKnoppen
              terug={terug}
              vooruit={vooruit}
              stap={stap}
              label="beoordelingen"
              className="shrink-0 max-md:hidden"
            />
          </div>

          <motion.div
            {...trackProps}
            className="slider-track"
            variants={trackVarianten}
            initial={reduce ? false : 'verborgen'}
            whileInView={reduce ? undefined : 'zichtbaar'}
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Kaartbreedte: vanaf lg drie zichtbaar, dus een derde min twee
                tussenruimtes van 1.25rem, verdeeld over drie kaarten.

                De lijst staat er twee keer in: dat maakt de lopende band
                naadloos, want halverwege springen we een helft terug naar een
                identiek beeld. De tweede reeks is een kopie voor het oog en
                hoort daarom niet in de voorleesvolgorde. */}
            {[0, 1].map((reeks) =>
              reviews.map((r) => (
                <motion.figure
                  key={`${reeks}-${r.naam}`}
                  variants={kaartVarianten}
                  aria-hidden={reeks === 1 || undefined}
                  className="slider-item card-dark p-6 w-[82%] sm:w-[54%] lg:w-[calc(33.333%_-_0.834rem)]"
                >
                <div className="flex items-center gap-3">
                  <span className="relative shrink-0">
                    <span
                      aria-hidden="true"
                      className="w-11 h-11 rounded-full bg-white/12 text-white font-semibold flex items-center justify-center"
                    >
                      {r.initiaal}
                    </span>
                    {/* De G in het witte schildje staat in het accentblauw en
                        niet in Google-blauw: op 11px haalt #4285f4 op wit de
                        leesbaarheidsgrens niet. */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-white text-[11px] font-bold leading-none flex items-center justify-center text-blue-600"
                    >
                      G
                    </span>
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{r.naam}</div>
                    <div className="flex flex-wrap items-center gap-x-2 text-sm text-white/70">
                      <span>{r.plaats}</span>
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/40" />
                      <span className="whitespace-nowrap">{r.tijdAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <GoudenSterren label={`${r.rating} van de 5 sterren`} />
                </div>

                <blockquote className="mt-3 text-white/85 leading-relaxed line-clamp-3">
                  {r.tekst}
                </blockquote>
                </motion.figure>
              )),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
