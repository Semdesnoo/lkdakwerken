/**
 * Dakvormige overgang tussen hero en volgende sectie: een lijn die van
 * links schuin omhoog loopt, een dakpunt maakt, en weer omlaag naar rechts.
 * Verwijst naar het dak-icoon in het logo. Schuift over de video heen via
 * een negatieve margin op de aanroeper — dat overlappen is de bedoeling.
 */
export function DakOvergang({ kleur = '#fafafa' }: { kleur?: string }) {
  return (
    <div aria-hidden="true" className="relative z-10 -mt-20 md:-mt-32 pointer-events-none">
      <svg
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        className="block w-full h-24 md:h-36"
      >
        <defs>
          {/* Zelfde zigzagmotief als .zigzag in globals.css, zodat het lijntjespatroon
              doorloopt over de dakvorm heen in plaats van te stoppen bij een vlakke kleur. */}
          <pattern id="dak-zigzag" width="7" height="2.75" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <path d="M0 1.9 L1.75 0.6 L3.5 1.9 L5.25 0.6 L7 1.9" fill="none" stroke="rgba(10,10,10,0.055)" strokeWidth="0.18" />
          </pattern>
        </defs>
        <polygon points="0,16 0,12 65,0 100,5 100,16" fill={kleur} />
        <polygon points="0,16 0,12 65,0 100,5 100,16" fill="url(#dak-zigzag)" />
      </svg>
    </div>
  );
}
