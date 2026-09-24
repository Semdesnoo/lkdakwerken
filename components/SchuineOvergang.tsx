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
}: {
  kleur: string;
  hoek?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`relative h-16 md:h-24 overflow-visible z-10 pointer-events-none ${className}`}>
      <div
        className="absolute -left-16 -right-16 -top-4 md:-top-10 h-32 md:h-44 rounded-[3rem] md:rounded-[4rem]"
        style={{ backgroundColor: kleur, transform: `rotate(${hoek}deg)` }}
      />
    </div>
  );
}
