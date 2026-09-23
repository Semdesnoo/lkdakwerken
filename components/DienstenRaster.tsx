import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { diensten } from '@/lib/data';
import { foto } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

/**
 * Asymmetrisch diensten-raster: twee uitgelichte kaarten met foto,
 * daaronder drie compacte rijen. Bewust geen vijf gelijke kaarten.
 */
export function DienstenRaster() {
  const uitgelicht = diensten.slice(0, 2);
  const compact = diensten.slice(2);

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        {uitgelicht.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.08}>
            <Link
              id={d.slug}
              href={`/diensten/${d.slug}`}
              className="group card card-hover overflow-hidden flex flex-col h-full scroll-mt-28"
            >
              <div className="aspect-[16/10] overflow-hidden bg-paper-100">
                <img
                  src={foto(d.heroImage, 1100, 80)}
                  alt={`${d.titel} door LK Dakwerken`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-display text-2xl md:text-3xl tracking-[-0.02em] text-ink-900 group-hover:text-blue-500 transition-colors">
                  {d.titel}
                </h3>
                <p className="mt-3 text-ink-500 leading-relaxed">{d.korte}</p>

                <ul className="mt-6 space-y-2">
                  {d.voordelen.slice(0, 2).map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>

                <span className="btn-link mt-auto pt-7">
                  Bekijk {d.titel.toLowerCase()}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="space-y-3">
        {compact.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.06}>
            <Link
              id={d.slug}
              href={`/diensten/${d.slug}`}
              className="group card card-hover flex items-center gap-4 md:gap-6 p-4 md:p-5 scroll-mt-28"
            >
              <div className="w-20 h-20 md:w-28 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-paper-100">
                <img
                  src={foto(d.heroImage, 400, 70)}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-2xl font-semibold tracking-[-0.02em] text-ink-900 group-hover:text-blue-500 transition-colors">
                  {d.titel}
                </h3>
                <p className="mt-1 text-sm md:text-base text-ink-500 leading-relaxed">{d.korte}</p>
              </div>
              <span className="w-11 h-11 rounded-full bg-paper-100 text-ink-900 flex items-center justify-center shrink-0 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
