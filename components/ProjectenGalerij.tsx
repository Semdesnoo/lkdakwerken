'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Images, X } from 'lucide-react';
import { projecten } from '@/lib/data';
import { projectGroot, projectKaart } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

/**
 * Alle opgeleverde projecten als raster. Een klik opent het project op ware
 * grootte, met de overige opnamen van datzelfde dak als miniaturen ernaast.
 *
 * De slider op de homepage toont dezelfde projecten in een smalle strook;
 * hier krijgen ze de volle breedte van de pagina.
 */
export function ProjectenGalerij() {
  const [open, setOpen] = useState<number | null>(null);
  const [fotoIndex, setFotoIndex] = useState(0);

  const sluit = useCallback(() => setOpen(null), []);
  const toon = useCallback((i: number) => {
    setOpen(i);
    setFotoIndex(0);
  }, []);

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
  const fotos = actief ? [actief.image, ...(actief.extraFotos ?? [])] : [];
  const huidigeFoto = fotos[fotoIndex] ?? fotos[0];

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projecten.map((p, i) => {
          const aantal = 1 + (p.extraFotos?.length ?? 0);
          return (
            <Reveal key={p.image} delay={(i % 3) * 0.07}>
              <button
                type="button"
                onClick={() => toon(i)}
                aria-label={`Bekijk project ${p.titel} in ${p.plaats}`}
                className="group card card-hover overflow-hidden h-full w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-100">
                  <img
                    src={projectKaart(p.image)}
                    alt={`${p.type} in ${p.plaats} door LK Dakwerken`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Aantal opnamen, zodat meteen zichtbaar is welke projecten
                      meer beeld hebben dan die ene kaartfoto. */}
                  {aantal > 1 && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/75 px-2.5 py-1 text-xs font-semibold text-white">
                      <Images className="h-3.5 w-3.5" aria-hidden="true" />
                      {aantal}
                    </span>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-sm text-ink-500">
                    <span className="font-medium text-blue-500">{p.type}</span>
                    <span aria-hidden="true" className="w-1 h-1 rounded-full bg-ink-300" />
                    <span>{p.jaar}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-ink-900 leading-snug group-hover:text-blue-500 transition-colors">
                    {p.titel}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">{p.plaats}</p>
                </div>
              </button>
            </Reveal>
          );
        })}
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
              className="relative w-full max-w-5xl max-h-full overflow-y-auto rounded-2xl bg-white"
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
                <div className="relative">
                  <img
                    key={huidigeFoto}
                    src={projectGroot(huidigeFoto)}
                    alt={`${actief.type} in ${actief.plaats} door LK Dakwerken`}
                    className="w-full h-72 md:h-full object-cover md:rounded-l-2xl"
                  />
                  {fotos.length > 1 && (
                    <span className="absolute right-3 bottom-3 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-semibold text-white">
                      {fotoIndex + 1} van {fotos.length}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {actief.type}
                  </p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink-900">
                    {actief.titel}
                  </h3>

                  {fotos.length > 1 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {fotos.map((id, n) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setFotoIndex(n)}
                          aria-label={`Foto ${n + 1} van dit project`}
                          aria-current={n === fotoIndex}
                          className={`relative h-16 w-16 overflow-hidden rounded-xl transition ${
                            n === fotoIndex
                              ? 'ring-2 ring-blue-500 ring-offset-2'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={projectKaart(id)}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-ink-600 leading-relaxed">{actief.tekst}</p>

                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-900/10 pt-5 text-sm">
                    <div>
                      <dt className="text-ink-500">Plaats</dt>
                      <dd className="mt-1 font-semibold text-ink-900">{actief.plaats}</dd>
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
    </>
  );
}
