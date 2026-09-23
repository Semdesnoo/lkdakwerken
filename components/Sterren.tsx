import { Star } from 'lucide-react';

/** Sterrenindicatie in het blauw van het palet. */
export function Sterren({
  aantal = 5,
  className = 'w-4 h-4',
  label,
}: {
  aantal?: number;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={label ?? `${aantal} van de 5 sterren`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={0}
          className={`${className} ${i < aantal ? 'fill-blue-500 text-blue-500' : 'fill-paper-200 text-paper-200'}`}
        />
      ))}
    </span>
  );
}
