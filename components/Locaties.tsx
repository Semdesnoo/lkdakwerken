import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { locaties } from '@/lib/data';

export function Locaties() {
  const regios = Array.from(new Set(locaties.map((l) => l.regio)));
  const perRegio = regios.map((r) => ({
    regio: r,
    items: locaties.filter((l) => l.regio === r),
  }));

  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-6">
            <div className="eyebrow mb-4">Werkgebied</div>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]">
              48 gemeenten.<br />
              <span className="text-blue-500">Heel Zuid-Holland.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-lg text-ink-500 leading-relaxed">
              We werken in heel Zuid-Holland. Van Rotterdam tot Dordrecht, van Den Haag tot Gouda.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {perRegio.slice(0, 4).map(({ regio, items }) => (
            <div key={regio} className="panel p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-2xl font-bold text-ink-900">
                  Regio {regio}
                </h3>
                <span className="pill-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {items.length} {items.length === 1 ? 'locatie' : 'locaties'}
                </span>
              </div>
              <div className="space-y-1">
                {items.slice(0, 8).map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locaties/${loc.slug}`}
                    className="group flex items-center justify-between py-3 divider-dashed first:border-t-0 hover:pl-2 transition-all"
                  >
                    <span className="font-medium text-ink-900 group-hover:text-blue-500 transition-colors">
                      {loc.naam}
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/lkdakwerken/locaties" className="btn-pill-dark">
            <span className="label">Alle 48 locaties</span>
            <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
