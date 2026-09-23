/**
 * Kerncijfers: het blok met grote getallen plus bijschrift, zoals het onder
 * de paginakop van /over en /projecten staat en in de sectie over ons op de
 * homepage. Stond drie keer los in de code; dit is dezelfde opmaak op één plek.
 *
 * `tabular-nums` zorgt dat de cijfers even breed zijn, zodat getallen naast
 * elkaar optisch uitlijnen in plaats van te dansen.
 *
 * Count-up: zodra een cijfer in beeld scrollt, telt de browser van 0 naar het
 * doelgetal. Wordt geregeld door `<ScrollReveal>` via `data-count-to`. Reduced-
 * motion gebruikers krijgen direct het eindgetal te zien (zonder animatie).
 */
export type Kerncijfer = { cijfer: string; label: string };

/**
 * Haal het numerieke deel uit "4,9" / "1.842" / "20+" en bepaal de decimalen.
 * Geeft null terug als de string geen getal bevat (zoals "+" of leeg).
 */
function parseCijfer(ruw: string): { waarde: number; decimalen: number; suffix: string } | null {
  const s = ruw.trim();
  // Pak het numerieke voorvoegsel: 4,9 → "4,9", 1.842 → "1.842", 20+ → "20"
  const match = s.match(/^([+-]?\d[\d.,]*)(.*)$/);
  if (!match) return null;
  const numeriekStr = match[1];
  const suffix = match[2];
  // NL-komma decimaal vervangen door punt; duizendtallen-punten strippen.
  const genormaliseerd = numeriekStr
    .replace(/\./g, '')
    .replace(',', '.');
  const waarde = parseFloat(genormaliseerd);
  if (!Number.isFinite(waarde)) return null;
  const decimalen = (numeriekStr.split(',')[1] || '').length;
  return { waarde, decimalen, suffix };
}

export function Kerncijfers({
  cijfers,
  className = '',
}: {
  cijfers: readonly Kerncijfer[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {cijfers.map((c) => {
        const parsed = parseCijfer(c.cijfer);
        // Fallback: toon de string zoals 'ie is (geen animatie).
        if (!parsed) {
          return (
            <div key={c.label}>
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <span className="block font-display text-4xl md:text-5xl font-bold text-ink-900 leading-none tracking-[-0.03em] tabular-nums">
                  {c.cijfer}
                </span>
                <span className="block mt-2.5 text-sm text-ink-500">{c.label}</span>
              </dd>
            </div>
          );
        }

        // Initialen "0" voor SSR/no-JS voorkomt een flits van het eindgetal.
        // ScrollReveal vervangt dit door de geanimeerde waarde zodra in beeld.
        const initieel = parsed.decimalen > 0 ? (0).toFixed(parsed.decimalen) : '0';

        return (
          <div key={c.label}>
            <dt className="sr-only">{c.label}</dt>
            <dd>
              <span className="block font-display text-4xl md:text-5xl font-bold text-ink-900 leading-none tracking-[-0.03em] tabular-nums">
                <span
                  data-count-to={parsed.waarde}
                  data-count-decimals={parsed.decimalen}
                  suppressHydrationWarning
                >
                  {initieel}
                </span>
                {parsed.suffix && (
                  <span aria-hidden="true">{parsed.suffix}</span>
                )}
              </span>
              <span className="block mt-2.5 text-sm text-ink-500">{c.label}</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}