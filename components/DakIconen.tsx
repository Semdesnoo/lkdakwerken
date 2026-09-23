/**
 * Decoratieve SVG-iconen voor LK Dakwerken
 * Mono-stroke, schaalbaar, passend bij een dakdekker.
 * Default kleur is via currentColor: geef kleur mee via className.
 */

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function DakLijnIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M2 18 L12 6 L22 18 Z" />
      <path d="M2 18 L22 18" />
      <path d="M12 6 L12 18" />
    </svg>
  );
}

export function DakpanIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M2 8 L22 8 L18 4 L6 4 Z" />
      <path d="M2 14 L22 14 L18 10 L6 10 Z" />
      <path d="M2 20 L22 20 L18 16 L6 16 Z" />
    </svg>
  );
}

export function HamerIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M14 6 L18 10 L20 8 L18 6 L14 4 L12 6 Z" />
      <path d="M14 6 L4 16 L8 20 L18 10" />
    </svg>
  );
}

export function DakgootIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M3 4 L21 4 L18 9 L6 9 Z" />
      <path d="M6 9 L6 14 L9 14" />
      <path d="M18 9 L18 14 L15 14" />
      <path d="M12 4 L12 9" />
    </svg>
  );
}

export function WaterdruppelIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3 C 12 3, 5 11, 5 15 a7 7 0 0 0 14 0 C 19 11, 12 3, 12 3 Z" />
    </svg>
  );
}

export function WolkRegenIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M6 16 a4 4 0 0 1 0-8 a5 5 0 0 1 9.6 -1.5 a3.5 3.5 0 0 1 4.4 4.5 L20 16 Z" />
      <path d="M8 19 L7 22" />
      <path d="M12 19 L11 22" />
      <path d="M16 19 L15 22" />
    </svg>
  );
}

export function ZonnepaneelIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="6" width="18" height="12" />
      <path d="M3 10 L21 10" />
      <path d="M3 14 L21 14" />
      <path d="M9 6 L9 18" />
      <path d="M15 6 L15 18" />
    </svg>
  );
}

export function BeschermlaagIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3 L4 6 V12 C 4 17, 8 20, 12 21 C 16 20, 20 17, 20 12 V 6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </svg>
  );
}

/**
 * Achtergrondpatroon: een grid van daklijnen, waterdruppels, hamers.
 * Gebruik als decoratie in een section. Neemt de volledige parent in.
 */
export function DakAchtergrond({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dak-pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Rij 1: grote daklijn */}
            <path d="M20 30 L40 12 L60 30" stroke="currentColor" strokeWidth="1" fill="none" />
            {/* Rij 1: hamer rechts */}
            <path d="M105 20 L120 35 L130 25 L120 18 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M118 22 L100 40 L106 46 L122 30" stroke="currentColor" strokeWidth="1" fill="none" />
            {/* Rij 1: dakgoot */}
            <path d="M145 18 L155 24 L145 30 L135 24 Z" stroke="currentColor" strokeWidth="1" fill="none" />

            {/* Rij 2: waterdruppel */}
            <path d="M30 80 C 30 80, 25 88, 25 93 a5 5 0 0 0 10 0 C 35 88, 30 80, 30 80 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            {/* Rij 2: dakpannen */}
            <path d="M70 70 L90 70 L86 66 L74 66 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M70 78 L90 78 L86 74 L74 74 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M70 86 L90 86 L86 82 L74 82 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            {/* Rij 2: wolk */}
            <path d="M120 80 a4 4 0 0 1 0-8 a5 5 0 0 1 9.6 -1.5 a3.5 3.5 0 0 1 4.4 4.5 L134 80 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M122 84 L121 87" stroke="currentColor" strokeWidth="1" />
            <path d="M126 84 L125 87" stroke="currentColor" strokeWidth="1" />
            <path d="M130 84 L129 87" stroke="currentColor" strokeWidth="1" />

            {/* Rij 3: schild */}
            <path d="M30 130 L22 132 V138 C 22 144, 26 148, 30 149 C 34 148, 38 144, 38 138 V 132 Z" stroke="currentColor" strokeWidth="1" fill="none" />

            {/* Rij 3: zonnepaneel */}
            <rect x="60" y="125" width="30" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M60 130 L90 130" stroke="currentColor" strokeWidth="1" />
            <path d="M60 140 L90 140" stroke="currentColor" strokeWidth="1" />
            <path d="M75 125 L75 145" stroke="currentColor" strokeWidth="1" />

            {/* Rij 3: daklijn groot */}
            <path d="M105 145 L130 120 L155 145" stroke="currentColor" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dak-pattern)" style={{ color: 'var(--accent)' }} />
      </svg>
    </div>
  );
}

/**
 * Grote decoratieve chevron/dakpan-pijl omhoog, zoals in de reviews-sectie.
 */
export function ChevronDecoratie({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="chevron-pattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 20 L20 0 L40 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </pattern>
      </defs>
      <rect width="240" height="140" fill="url(#chevron-pattern)" />
    </svg>
  );
}
