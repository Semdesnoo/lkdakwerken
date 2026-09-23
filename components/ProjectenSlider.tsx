'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { projecten } from '@/lib/data';
import { projectGroot, projectKaart } from '@/lib/images';
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

  /* Index van het project dat vergroot in beeld staat, of null. */
  const [open, setOpen] = useState<number | null>(null);
  const sluit = useCallback(() => setOpen(null), []);

  /* Escape sluit de vergroting; de achtergrond scrollt ondertussen niet mee. */
  useEffect(() => {
    if (open === null) return;

    const opToets = (e: KeyboardEvent) => {
      if (e.key === 'Escape') sluit();
    };
    document.addEventListener('keydown', opToets);

    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', opToets);
      document.body.style.overflow = vorigeOverflow;
    };
  }, [open, sluit]);

  const actief = open === null ? null : projecten[open];

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
              {projecten.length} daken uit Rotterdam en omgeving, allemaal door ons eigen team
              opgeleverd. Klik op een foto voor het verhaal erachter.
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
            {projecten.map((p, i) => (
              <motion.article
                key={p.image}
                variants={kaartVarianten}
                className="slider-item group w-[78%] sm:w-[48%] lg:w-[calc(25%_-_0.9375rem)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 rounded-2xl"
                  aria-label={`Bekijk project ${p.titel} in ${p.plaats}`}
                >
                  {/* Staand beeld: de foto's komen van het dak zelf, liggend
                      zou het dakvlak grotendeels wegvallen. */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-paper-100">
                    <img
                      src={projectKaart(p.image)}
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
                    <span className="absolute left-4 bottom-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900">
                      {p.oppervlakte}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink-900">
                      {p.plaats}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500">{p.type}</p>
                  </div>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {actief && (
          <motion.div
            key="vergroting"
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={sluit}
            role="dialog"
            aria-modal="true"
            aria-label={actief.titel}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-full overflow-y-auto rounded-2xl bg-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={sluit}
                aria-label="Sluiten"
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm transition hover:bg-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="grid md:grid-cols-2">
                <img
                  src={projectGroot(actief.image)}
                  alt={`${actief.type} in ${actief.plaats} door LK Dakwerken`}
                  className="w-full h-64 md:h-full object-cover md:rounded-l-2xl"
                />
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {actief.type}
                  </p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink-900">
                    {actief.titel}
                  </h3>
                  <p className="mt-4 text-ink-600 leading-relaxed">{actief.tekst}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-ink-900/10 pt-5 text-sm">
                    <div>
                      <dt className="text-ink-500">Plaats</dt>
                      <dd className="mt-1 font-semibold text-ink-900">{actief.plaats}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">Oppervlakte</dt>
                      <dd className="mt-1 font-semibold text-ink-900">{actief.oppervlakte}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">Jaar</dt>
                      <dd className="mt-1 font-semibold text-ink-900">{actief.jaar}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
