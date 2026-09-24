'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    /* Getallen die van nul naar hun eindwaarde lopen zodra ze in beeld komen.
       Kerncijfers zet het doel in data-count-to; hier gebeurt het tellen.
       Wie liever geen beweging heeft krijgt meteen het eindgetal. */
    const stil = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nlGetal = (waarde: number, decimalen: number) =>
      waarde.toLocaleString('nl-NL', {
        minimumFractionDigits: decimalen,
        maximumFractionDigits: decimalen,
      });

    const telObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          telObserver.unobserve(el);
          // Zonder deze vlag ziet de MutationObserver hieronder onze eigen
          // tekstwijziging, hangt het element opnieuw aan en begint het
          // tellen elke frame opnieuw — het getal blijft dan bij nul hangen.
          if (el.dataset.countKlaar) return;
          el.dataset.countKlaar = 'ja';

          const doel = Number(el.dataset.countTo);
          const decimalen = Number(el.dataset.countDecimals ?? 0);
          if (!Number.isFinite(doel)) return;

          if (stil) {
            el.textContent = nlGetal(doel, decimalen);
            return;
          }

          const duur = 1400;
          const start = performance.now();
          const stap = (nu: number) => {
            const verstreken = Math.min((nu - start) / duur, 1);
            // Snel op gang, rustig uitlopen: het eindgetal is waar het om gaat.
            const soepel = 1 - Math.pow(1 - verstreken, 3);
            el.textContent = nlGetal(doel * soepel, decimalen);
            if (verstreken < 1) requestAnimationFrame(stap);
          };
          requestAnimationFrame(stap);
        });
      },
      { threshold: 0.6 }
    );

    const observe = () => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
      document.querySelectorAll('[data-count-to]').forEach((el) => telObserver.observe(el));
    };

    observe();

    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      telObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
