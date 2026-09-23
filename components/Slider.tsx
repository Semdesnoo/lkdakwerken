'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Gedeelde mechaniek voor de horizontale sliders op de homepage.
 * De track is een gewone scroll-container met scroll-snap, zodat swipen op
 * mobiel en scrollen met een trackpad vanzelf werken. Daarbovenop komt
 * slepen met de muis en bediening via de pijlknoppen.
 */
export function useSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [terug, setTerug] = useState(false);
  // Begint op true: de track is altijd breder dan het scherm, dus de
  // vooruit-knop hoort niet uitgeschakeld te staan voordat JavaScript meet.
  const [vooruit, setVooruit] = useState(true);
  const reduce = useReducedMotion();

  const meet = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const maximum = el.scrollWidth - el.clientWidth;
    setTerug(el.scrollLeft > 8);
    setVooruit(el.scrollLeft < maximum - 8);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    meet();
    el.addEventListener('scroll', meet, { passive: true });
    const waarnemer = new ResizeObserver(meet);
    waarnemer.observe(el);
    return () => {
      el.removeEventListener('scroll', meet);
      waarnemer.disconnect();
    };
  }, [meet]);

  /** Eén kaartbreedte opschuiven, inclusief de tussenruimte van 1.25rem. */
  const stap = useCallback(
    (richting: 1 | -1) => {
      const el = track.current;
      if (!el) return;
      const kaart = el.firstElementChild as HTMLElement | null;
      const afstand = kaart ? kaart.offsetWidth + 20 : Math.round(el.clientWidth * 0.8);
      el.scrollBy({ left: richting * afstand, behavior: reduce ? 'auto' : 'smooth' });
    },
    [reduce],
  );

  const sleep = useRef({ actief: false, startX: 0, startScroll: 0, verplaatst: false });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    // Touch laten we aan de browser over: die scrollt en snapt al prima.
    if (!el || e.pointerType === 'touch' || e.button !== 0) return;
    sleep.current = {
      actief: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      verplaatst: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = 'none';
    el.style.userSelect = 'none';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || !sleep.current.actief) return;
    const verschil = e.clientX - sleep.current.startX;
    if (Math.abs(verschil) > 4) sleep.current.verplaatst = true;
    el.scrollLeft = sleep.current.startScroll - verschil;
  }, []);

  const stopSlepen = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || !sleep.current.actief) return;
    sleep.current.actief = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.style.scrollSnapType = '';
    el.style.userSelect = '';
  }, []);

  /** Een sleepbeweging mag niet als klik op de onderliggende kaart tellen. */
  const onClickCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sleep.current.verplaatst) return;
    sleep.current.verplaatst = false;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return {
    trackProps: {
      ref: track,
      onPointerDown,
      onPointerMove,
      onPointerUp: stopSlepen,
      onPointerCancel: stopSlepen,
      onClickCapture,
    },
    terug,
    vooruit,
    stap,
  };
}

/** Twee ronde blauwe pijlknoppen, uitgeschakeld aan het begin en het eind. */
export function SliderKnoppen({
  terug,
  vooruit,
  stap,
  label,
  className = '',
}: {
  terug: boolean;
  vooruit: boolean;
  stap: (richting: 1 | -1) => void;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        className="slider-arrow"
        onClick={() => stap(-1)}
        disabled={!terug}
        aria-label={`Vorige ${label}`}
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="slider-arrow"
        onClick={() => stap(1)}
        disabled={!vooruit}
        aria-label={`Volgende ${label}`}
      >
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
