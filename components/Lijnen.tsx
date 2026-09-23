/**
 * Decoratief merkmotief: dunne, diagonaal gebogen lijnen als achtergrondtextuur.
 * Op wit blauw (#2563eb) rond 10 procent dekking, op donker een lichtblauwe zweem.
 * Puur decoratief, dus verborgen voor schermlezers en niet aanklikbaar.
 *
 * De positionering komt van de aanroeper via className, bijvoorbeeld
 * `absolute -top-24 -right-24 w-[38rem] h-[38rem]`.
 */
export function Lijnen({
  variant = 'licht',
  className = '',
}: {
  variant?: 'licht' | 'donker';
  className?: string;
}) {
  const kleur = variant === 'donker' ? 'rgba(96, 165, 250, 0.30)' : 'rgba(37, 99, 235, 0.12)';

  // Acht evenwijdige bogen, telkens 54 eenheden verschoven.
  const verschuivingen = [0, 54, 108, 162, 216, 270, 324, 378];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 640 640"
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <g fill="none" stroke={kleur} strokeWidth="1.25" strokeLinecap="round">
        {verschuivingen.map((v) => (
          <path
            key={v}
            vectorEffect="non-scaling-stroke"
            d={`M ${-160 + v} 700 C ${40 + v} 470, ${260 + v} 330, ${760 + v} 30`}
          />
        ))}
      </g>
    </svg>
  );
}
