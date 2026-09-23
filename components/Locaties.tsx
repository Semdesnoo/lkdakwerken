import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { locaties } from '@/lib/data';
import { WerkgebiedKaart } from '@/components/Werkgebied';
import { Reveal } from '@/components/Reveal';

export function Locaties() {
  const regios = Array.from(new Set(locaties.map((l) => l.regio)));

  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              {locaties.length} gemeenten.
              <br />
              <span className="text-blue-500">Heel Zuid-Holland.</span>
            </h2>
            <p className="lead mt-6 max-w-md">
              Vanuit Rotterdam rijden we dagelijks door de hele provincie. Van Katwijk tot Gorinchem, van Den Haag tot Goeree-Overflakkee.
            </p>
            <Link href="/locaties" className="btn-pill-dark mt-9">
              <span className="label">Bekijk het werkgebied</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <WerkgebiedKaart />
          </Reveal>
        </div>

        {/* Regio's als chip-rijen: een andere vorm dan de kaartrasters hierboven */}
        <Reveal delay={0.05} className="mt-14 md:mt-20 space-y-7">
          {regios.map((regio) => (
            <div key={regio} className="grid md:grid-cols-12 gap-3 md:gap-6 items-baseline">
              <h3 className="md:col-span-3 text-lg font-semibold text-ink-900">{regio}</h3>
              <ul className="md:col-span-9 flex flex-wrap gap-2">
                {locaties
                  .filter((l) => l.regio === regio)
                  .map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        href={`/locaties/${loc.slug}`}
                        className="chip hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        {loc.naam}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
