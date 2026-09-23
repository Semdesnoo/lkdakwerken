/**
 * Kerncijfers: het blok met grote getallen plus bijschrift, zoals het onder
 * de paginakop van /over en /projecten staat en in de sectie over ons op de
 * homepage. Stond drie keer los in de code; dit is dezelfde opmaak op één plek.
 *
 * `tabular-nums` zorgt dat de cijfers even breed zijn, zodat getallen naast
 * elkaar optisch uitlijnen in plaats van te dansen.
 */
export type Kerncijfer = { cijfer: string; label: string };

export function Kerncijfers({
  cijfers,
  className = '',
}: {
  cijfers: readonly Kerncijfer[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {cijfers.map((c) => (
        <div key={c.label}>
          <dt className="sr-only">{c.label}</dt>
          <dd>
            <span className="block font-display text-4xl md:text-5xl font-bold text-ink-900 leading-none tracking-[-0.03em] tabular-nums">
              {c.cijfer}
            </span>
            <span className="block mt-2.5 text-sm text-ink-500">{c.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
