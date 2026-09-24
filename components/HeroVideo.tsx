'use client';

import { useEffect, useState } from 'react';
import { heroBestand } from '@/lib/images';

/**
 * Achtergrondvideo van de hero.
 *
 * Er zijn twee versies gefilmd: een liggende voor laptop en desktop en een
 * staande voor de telefoon. We kiezen er met matchMedia een van, zodat een
 * bezoeker nooit beide bestanden binnenhaalt. Omdat die keuze pas in de
 * browser valt, staat er tot die tijd alleen de poster.
 *
 * Bij 'prefers-reduced-motion' blijft het bij de poster: bewegend beeld op
 * de achtergrond is precies waar die voorkeur voor bedoeld is.
 */
export function HeroVideo() {
  const [variant, setVariant] = useState<'hero-desktop' | 'hero-mobiel' | null>(null);
  const [stil, setStil] = useState(false);

  useEffect(() => {
    const breed = window.matchMedia('(min-width: 768px)');
    const rustig = window.matchMedia('(prefers-reduced-motion: reduce)');

    const bijwerken = () => {
      setStil(rustig.matches);
      setVariant(breed.matches ? 'hero-desktop' : 'hero-mobiel');
    };

    bijwerken();
    breed.addEventListener('change', bijwerken);
    rustig.addEventListener('change', bijwerken);
    return () => {
      breed.removeEventListener('change', bijwerken);
      rustig.removeEventListener('change', bijwerken);
    };
  }, []);

  /* Tot de eerste meting tonen we de desktopposter; die dekt het vlak en
     wordt meteen vervangen zodra de juiste variant bekend is. */
  const poster = heroBestand(`${variant ?? 'hero-desktop'}.jpg`);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-950">
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {variant && !stil && (
        <video
          key={variant}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroBestand(`${variant}.mp4`)} type="video/mp4" />
        </video>
      )}

      {/* Donkere gloed over de video: links dieper, want daar staat de tekst.
          Genoeg om de witte kop en de knoppen te dragen, niet zo veel dat het
          beeld eronder verdwijnt. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-ink-950/30 to-ink-950/20"
      />
      {/* Tweede laag voor de boven- en onderrand: onder de menubalk en boven
          de dienstkaarten die over de hero heen steken. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink-950/35 via-transparent to-ink-950/55"
      />
    </div>
  );
}
