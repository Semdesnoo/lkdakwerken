'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { projecten } from '@/lib/data';
import { foto } from '@/lib/images';
import { Lijnen } from '@/components/Lijnen';
import { SliderKnoppen, useSlider } from '@/components/Slider';

/* Kaarten komen na elkaar in beeld zodra de track in zicht schuift. */
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

export function ProjectenSlider() {
  const reduce = useReducedMotion();
  const { trackProps, terug, vooruit, stap } = useSlider();

  return (
    <section className="relative section-pad bg-white overflow-hidden">
      <Lijnen className="absolute -top-28 -right-32 w-[46rem] h-[36rem]" />

      <div className="container-wide relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              Onze projecten.
            </h2>
            <p className="lead mt-5">
              Een greep uit het werk van de afgelopen jaren, van een enkele woning tot een compleet
              appartementencomplex.
            </p>
          </div>
          <SliderKnoppen
            terug={terug}
            vooruit={vooruit}
            stap={stap}
            label="projecten"
            className="shrink-0"
          />
        </div>

        <div className="border-t border-blue-500/20 pt-8 md:pt-10">
          <motion.div
            {...trackProps}
            className="slider-track"
            variants={trackVarianten}
            initial={reduce ? false : 'verborgen'}
            whileInView={reduce ? undefined : 'zichtbaar'}
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Kaartbreedte: vanaf lg vier zichtbaar, dus 25% min drie keer
                een tussenruimte van 1.25rem, verdeeld over vier kaarten. */}
            {projecten.map((p) => (
              <motion.article
                key={p.titel}
                variants={kaartVarianten}
                className="slider-item group w-[78%] sm:w-[48%] lg:w-[calc(25%_-_0.9375rem)]"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-paper-100">
                  <img
                    src={foto(p.image, 800, 78)}
                    alt={`${p.type} in ${p.plaats} door LK Dakwerken`}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Subtiel verloop onderaan de foto, zonder tekst eroverheen */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/45 to-transparent"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink-900">
                    {p.plaats}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">{p.type}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
