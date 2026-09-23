import Link from 'next/link';
import { MapPin } from 'lucide-react';

/**
 * Gestileerde weergave van het werkgebied. Geen echte kaart, maar een
 * schematisch knooppunten-diagram met Rotterdam als vertrekpunt.
 */
const knooppunten = [
  { naam: 'Leiden', slug: 'leiden', x: 24, y: 14 },
  { naam: 'Den Haag', slug: 'den-haag', x: 10, y: 35 },
  { naam: 'Gouda', slug: 'gouda', x: 66, y: 28 },
  { naam: 'Rotterdam', slug: 'rotterdam', x: 38, y: 53, hub: true },
  { naam: 'Spijkenisse', slug: 'spijkenisse', x: 14, y: 72 },
  { naam: 'Dordrecht', slug: 'dordrecht', x: 66, y: 76 },
];

export function WerkgebiedKaart() {
  const hub = knooppunten.find((k) => k.hub)!;

  return (
    <div className="relative rounded-3xl bg-ink-900 overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
      <div className="absolute inset-0 bg-dots-dark opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/35 via-transparent to-transparent" aria-hidden="true" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {knooppunten
          .filter((k) => !k.hub)
          .map((k) => (
            <line
              key={k.slug}
              x1={hub.x}
              y1={hub.y}
              x2={k.x}
              y2={k.y}
              stroke="#60a5fa"
              strokeWidth="0.35"
              strokeDasharray="1.6 1.6"
              opacity="0.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
      </svg>

      {knooppunten.map((k) => (
        <Link
          key={k.slug}
          href={`/locaties/${k.slug}`}
          style={{ left: `${k.x}%`, top: `${k.y}%` }}
          className="group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
        >
          <span
            aria-hidden="true"
            className={
              k.hub
                ? 'w-3.5 h-3.5 rounded-full bg-blue-400 ring-4 ring-blue-400/25 transition-transform group-hover:scale-125'
                : 'w-2.5 h-2.5 rounded-full bg-white/70 transition-all group-hover:bg-blue-400 group-hover:scale-125'
            }
          />
          <span
            className={`text-sm whitespace-nowrap transition-colors ${
              k.hub ? 'font-semibold text-white' : 'text-white/75 group-hover:text-white'
            }`}
          >
            {k.naam}
          </span>
        </Link>
      ))}

      <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-sm text-white/55">
        <MapPin className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
        <span>Vertrekpunt Rotterdam, werkgebied heel Zuid-Holland</span>
      </div>
    </div>
  );
}
