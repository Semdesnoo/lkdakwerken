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
export type Kerncijfer = { cijfer: string; label: string; footnoot?: string };

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
      {cijfers.map((c, i) => {
        const parsed = parseCijfer(c.cijfer);
        /* De cijfers verschijnen kort na elkaar in plaats van allemaal
           tegelijk; dat leest als opsomming en niet als een flits.
           reveal-on-scroll bestaat al en wordt door ScrollReveal bediend. */
        const vertraging = { transitionDelay: `${i * 90}ms` };
        // Fallback: toon de string zoals 'ie is (geen animatie).
        if (!parsed) {
          return (
            <div key={c.label} className="reveal-on-scroll" style={vertraging}>
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <span className="block font-display text-5xl md:text-6xl font-bold text-blue-500 leading-none tracking-[-0.035em] tabular-nums">
                  {c.cijfer}
                </span>
                <span className="block mt-3 text-sm text-ink-500 text-balance">{c.label}</span>
              </dd>
            </div>
          );
        }

        // Initiële nul voor SSR/no-JS voorkomt een flits van het eindgetal.
        // Nederlandse komma, anders staat er "0.0" waar "0,0" hoort.
        const initieel =
          parsed.decimalen > 0
            ? (0).toLocaleString('nl-NL', {
                minimumFractionDigits: parsed.decimalen,
                maximumFractionDigits: parsed.decimalen,
              })
            : '0';

        return (
          <div key={c.label} className="reveal-on-scroll" style={vertraging}>
            <dt className="sr-only">{c.label}</dt>
            <dd>
              <span className="block font-display text-5xl md:text-6xl font-bold text-blue-500 leading-none tracking-[-0.035em] tabular-nums">
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
              <span className="block mt-3 text-sm text-ink-500 text-balance">{c.label}</span>
              {c.footnoot && <span className="block mt-1 text-xs text-ink-400">{c.footnoot}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}