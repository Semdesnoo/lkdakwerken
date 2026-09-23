import Link from 'next/link';
import { foto } from '@/lib/images';

type Kruimel = { label: string; href?: string };

interface Props {
  titel: string;
  /** Tweede regel van de kop, in blauw. */
  accent?: string;
  lead?: string;
  /** Unsplash foto-ID. Zonder foto krijgt de header een strak ink-vlak. */
  image?: string;
  imageAlt?: string;
  kruimels?: Kruimel[];
  /** Knoppen of chips onder de lead. */
  children?: React.ReactNode;
  /** Compacte variant voor overzichtspagina's. */
  compact?: boolean;
}

/**
 * De vaste bovenkant van elke interior-pagina. Vervangt de oude
 * doorschijnende fotoband onder de navigatie: elke pagina krijgt nu
 * een eigen, bewust ontworpen header.
 */
export function PageHeader({
  titel,
  accent,
  lead,
  image,
  imageAlt = '',
  kruimels,
  children,
  compact = false,
}: Props) {
  return (
    <section className="relative bg-ink-900 text-white overflow-hidden">
      {image ? (
        <>
          <img
            src={foto(image, 2000, 80)}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-950/92 via-ink-950/80 to-ink-950/55" />
        </>
      ) : (
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden="true" />
      )}

      <div
        className={`container-wide relative ${
          compact ? 'pt-32 pb-14 md:pt-40 md:pb-20' : 'pt-32 pb-16 md:pt-44 md:pb-28'
        }`}
      >
        {kruimels && kruimels.length > 0 && (
          <nav aria-label="Kruimelpad" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              {kruimels.map((k, i) => (
                <li key={k.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-white/55">/</span>}
                  {k.href ? (
                    <Link href={k.href} className="hover:text-white transition-colors">
                      {k.label}
                    </Link>
                  ) : (
                    <span className="text-white">{k.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1
          className={`text-display text-balance leading-[0.98] tracking-[-0.035em] ${
            compact
              ? 'text-4xl md:text-6xl lg:text-7xl'
              : 'text-5xl md:text-7xl lg:text-[80px]'
          }`}
        >
          {titel}
          {accent && (
            <>
              <br />
              <span className="text-blue-400">{accent}</span>
            </>
          )}
        </h1>

        {lead && (
          <p className="mt-7 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {lead}
          </p>
        )}

        {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
