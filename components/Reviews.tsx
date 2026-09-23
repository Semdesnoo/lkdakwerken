import { Quote } from 'lucide-react';
import { reviews } from '@/lib/data';
import { Sterren } from '@/components/Sterren';
import { Reveal } from '@/components/Reveal';

export function Reviews() {
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <Reveal className="grid md:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="md:col-span-7">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              Wat opdrachtgevers over ons schrijven.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold text-ink-900 leading-none tracking-[-0.03em]">4.9</span>
              <Sterren className="w-5 h-5" label="4.9 van de 5 sterren op Google" />
            </div>
            <p className="mt-3 text-ink-500">Gemiddelde score op Google, uit 127 beoordelingen.</p>
          </div>
        </Reveal>

        {/* Getrapte kolommen: andere ritmiek dan de rechte kaartrasters elders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 6).map((r, i) => (
            <Reveal
              key={r.naam}
              delay={(i % 3) * 0.08}
              className={i % 3 === 1 ? 'lg:mt-10' : i % 3 === 2 ? 'lg:mt-20' : undefined}
            >
              <figure className="card card-hover h-full p-6 md:p-7 flex flex-col">
                <Quote className="w-7 h-7 text-blue-200 shrink-0" aria-hidden="true" />
                <blockquote className="mt-4 text-ink-800 leading-relaxed line-clamp-3">
                  {r.tekst}
                </blockquote>
                <figcaption className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-paper-200">
                  <div className="min-w-0">
                    <div className="font-semibold text-ink-900 truncate">{r.naam}</div>
                    <div className="text-sm text-ink-500 truncate">
                      {r.rol}, {r.plaats}
                    </div>
                  </div>
                  <Sterren aantal={r.rating} label={`${r.rating} van de 5 sterren`} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
