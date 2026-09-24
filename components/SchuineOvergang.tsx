/**
 * Schuine sectiescheiding: een brede, licht gedraaide balk met afgeronde
 * uiteinden, gekleurd als de sectie die erna komt. Staat als lege rij tussen
 * twee secties in de pagina, dus onafhankelijk van de overflow-hidden van
 * die secties zelf — de balk schuift over de naad heen.
 *
 * Vaste rem-overschrijding aan weerszijden (i.p.v. procenten, die Tailwind
 * v4 niet als negatieve arbitrary waarde bouwt) zodat de rotatie op geen
 * enkele breedte een driehoekig gat aan de zijkant achterlaat.
 *
 * hoek bepaalt de kant: negatief laat 'm van linksonder naar rechtsboven
 * lopen, positief andersom.
 */
export function SchuineOvergang({
  kleur,
  hoek = -1.75,
  className = '',
  zigzag = false,
}: {
  kleur: string;
  hoek?: number;
  className?: string;
  /** Voegt hetzelfde lijnenmotief toe als de `.zigzag`-secties (bv. Blog),
      zodat het patroon doorloopt over de schuine overgang heen in plaats
      van te stoppen bij een vlakke kleur. */
  zigzag?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`relative h-16 md:h-24 overflow-visible z-10 pointer-events-none ${className}`}>
      <div
        className="absolute -left-16 -right-16 -top-4 md:-top-10 h-32 md:h-44 rounded-[3rem] md:rounded-[4rem] overflow-hidden"
        style={{ backgroundColor: kleur, transform: `rotate(${hoek}deg)` }}
      >
        {zigzag && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='22' viewBox='0 0 56 22'><path d='M0 15 L14 5 L28 15 L42 5 L56 15' fill='none' stroke='rgba(10,10,10,0.055)' stroke-width='1.4'/></svg>\")",
              backgroundRepeat: 'repeat',
              backgroundSize: '56px 22px',
            }}
          />
        )}
      </div>
    </div>
  );
}
