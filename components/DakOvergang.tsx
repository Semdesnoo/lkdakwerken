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
        <polygon points="0,16 0,9 50,0 100,9 100,16" fill={kleur} />
      </svg>
    </div>
  );
}
