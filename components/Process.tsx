import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { werkwijze, fotos } from '@/lib/data';
import { foto } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

export function Process() {
  return (
    <section className="relative section-pad bg-ink-900 text-white overflow-hidden">
      <img
        src={foto(fotos.werkwijze, 1800, 75)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
              Vier stappen.
              <br />
              <span className="text-blue-400">Geen verrassingen.</span>
            </h2>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-md">
              Van de eerste inspectie tot het garantiecertificaat weet u precies waar u aan toe bent. U krijgt één vast aanspreekpunt.
            </p>
            <Link href="/offerte" className="btn-pill-white mt-9">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </Reveal>

          {/* Verticale tijdlijn: bewust een ander opmaakfamilie dan de kaartrasters */}
          <div className="lg:col-span-5 lg:col-start-8">
            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-400/70 via-white/25 to-transparent"
              />
              {werkwijze.map((stap, i) => (
                <Reveal
                  as="li"
                  key={stap.titel}
                  delay={i * 0.1}
                  className="relative pl-10 pb-10 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-blue-500 ring-4 ring-ink-950"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                    {stap.titel}
                  </h3>
                  <p className="mt-2.5 text-white/70 leading-relaxed max-w-md">{stap.tekst}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
