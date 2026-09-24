/**
 * Dakvormige overgang tussen hero en volgende sectie: een lijn die van
 * links schuin omhoog loopt, een dakpunt maakt, en weer omlaag naar rechts.
 * Verwijst naar het dak-icoon in het logo. Schuift over de video heen via
 * een negatieve margin op de aanroeper — dat overlappen is de bedoeling.
 */
export function DakOvergang({ kleur = '#fafafa' }: { kleur?: string }) {
  return (
    <div aria-hidden="true" className="relative z-10 -mt-20 md:-mt-32 pointer-events-none isolate">
      {/* Zelfde dakvorm als voorheen, nu als geclipte div i.p.v. SVG polygon:
          een SVG-pattern zou door preserveAspectRatio="none" mee uitrekken met
          de breedte en dus een ander schaal/hoek lijntje geven dan het echte
          .zigzag-motief eronder. Deze div gebruikt precies dezelfde
          background-size (56x22px) en rotatiehoek (-8deg) als .zigzag in
          globals.css, zodat de lijntjes op de naad overeenkomen. */}
      <div
        className="w-full h-24 md:h-36"
        style={{
          backgroundColor: kleur,
          clipPath: 'polygon(0% 100%, 0% 75%, 65% 0%, 100% 31%, 100% 100%)',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='22' viewBox='0 0 56 22'><path d='M0 15 L14 5 L28 15 L42 5 L56 15' fill='none' stroke='rgba(10,10,10,0.055)' stroke-width='1.4'/></svg>\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '56px 22px',
            transform: 'rotate(-8deg) scale(1.5)',
          }}
        />
      </div>
    </div>
  );
}
