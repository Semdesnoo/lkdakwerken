'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { reviews } from '@/lib/data';

// Uitgebreide neppe Google reviews voor LK Dakwerken
const googleReviews = [
  {
    naam: 'Mark van der Berg',
    initialen: 'M',
    gradient: 'from-blue-500 to-blue-600',
    tijd: '2 weken geleden',
    rating: 5,
    tekst: 'Vorig jaar ons complete platte dak laten renoveren door LK. Vanaf het eerste contact tot de oplevering alles keurig verzorgd. Geen verrassingen achteraf, prijs was precies zoals in de offerte. Aanrader voor iedereen in de regio!',
    locatie: 'Rotterdam',
  },
  {
    naam: 'Sophie de Wit',
    initialen: 'S',
    gradient: 'from-blue-500 to-indigo-600',
    tijd: '1 maand geleden',
    rating: 5,
    tekst: 'Snelle reactie op onze lekkagemelding. Binnen twee uur stond er iemand op het dak. Noodreparatie dezelfde avond, definitieve oplossing een week later. Topservice!',
    locatie: 'Den Haag',
  },
  {
    naam: 'Jan Hoekstra',
    initialen: 'J',
    gradient: 'from-blue-600 to-blue-700',
    tijd: '2 maanden geleden',
    rating: 5,
    tekst: 'Voor onze VVE het complete dak laten vervangen. LK heeft alles van A tot Z geregeld, inclusief de communicatie met de verzekering. Strakke planning en het team werkt netjes. Echte vakmensen.',
    locatie: 'Dordrecht',
  },
  {
    naam: 'Linda Bakker',
    initialen: 'L',
    gradient: 'from-indigo-500 to-blue-500',
    tijd: '3 maanden geleden',
    rating: 5,
    tekst: 'Bitumen dak laten leggen op onze aanbouw. Keurig werk, alles netjes afgewerkt. Het team was vriendelijk en dacht mee over de afwatering. Komt zijn afspraken na, dat is tegenwoordig zeldzaam!',
    locatie: 'Delft',
  },
  {
    naam: 'Pieter Visser',
    initialen: 'P',
    gradient: 'from-blue-500 to-cyan-500',
    tijd: '4 maanden geleden',
    rating: 5,
    tekst: 'Ons bedrijfspand laten voorzien van nieuwe dakbedekking + zonnepanelen. Alles in één traject geregeld. Goede coördinatie tussen de dakdekkers en het elektrateam. Werk is naar volle tevredenheid uitgevoerd.',
    locatie: 'Schiedam',
  },
  {
    naam: 'Annemiek Jansen',
    initialen: 'A',
    gradient: 'from-blue-600 to-indigo-700',
    tijd: '5 maanden geleden',
    rating: 5,
    tekst: 'Al meerdere keren gebruik gemaakt van LK voor onze woning en die van mijn ouders. Altijd netjes en eerlijk. Bij de inspectie werd duidelijk uitgelegd wat er moest gebeuren en waarom. Geen verkooppraat.',
    locatie: 'Leiden',
  },
  {
    naam: 'Tom de Heer',
    initialen: 'T',
    gradient: 'from-blue-500 to-blue-700',
    tijd: '6 maanden geleden',
    rating: 5,
    tekst: 'Nieuwbouwproject waarbij LK het complete dak heeft gedaan. Strakke planning, goede kwaliteit en ze denken mee in de ontwerpfase. Prettige partner om mee samen te werken.',
    locatie: 'Gouda',
  },
  {
    naam: 'Maria Smit',
    initialen: 'M',
    gradient: 'from-cyan-500 to-blue-500',
    tijd: '8 maanden geleden',
    rating: 5,
    tekst: 'Lekkage na een flinke storm. Zelfde dag nog gekomen om de schade te beperken. Dakpannen gerepareerd en alles weer waterdicht. Zeer tevreden over de snelheid en het vakwerk.',
    locatie: 'Zoetermeer',
  },
  {
    naam: 'Kees Verhoeven',
    initialen: 'K',
    gradient: 'from-blue-500 to-indigo-600',
    tijd: '10 maanden geleden',
    rating: 5,
    tekst: 'Jaarlijks onderhoud laten doen aan ons bitumen dak. Goed teken dat ze elk jaar foto\'s maken van de staat van het dak en eerlijk advies geven. Geen onnodige werkzaamheden aanbevolen. Vertrouwde partner.',
    locatie: 'Capelle aan den IJssel',
  },
  {
    naam: 'Eva Mulder',
    initialen: 'E',
    gradient: 'from-indigo-500 to-blue-500',
    tijd: '11 maanden geleden',
    rating: 5,
    tekst: 'Offerte was duidelijk en transparant. Geen kleine lettertjes of onverwachte meerkosten. Het werk is snel en netjes uitgevoerd. Wij zijn zeer tevreden en raden LK Dakwerken aan bij iedereen.',
    locatie: 'Vlaardingen',
  },
];

// Google logo als SVG component
function GoogleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 272 92" className={className} aria-label="Google">
      <path
        fill="#4285F4"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18Zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44Z"
      />
      <path
        fill="#EA4335"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18Zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44Z"
      />
      <path
        fill="#FBBC04"
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25Zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36Z"
      />
      <path
        fill="#34A853"
        d="M225 3v65h-9.5V3h9.5Zm37.5 38.32-8.15 5.44c-2.1-3.61-5.46-5.97-10.5-5.97-6.72 0-12.01 5.55-12.01 13.36 0 7.9 5.29 13.44 12.01 13.44 4.96 0 8.4-2.35 10.5-5.97l8.15 5.44c-3.86 5.71-10.75 9.92-18.66 9.92-12.18 0-21.42-9.32-21.42-22.18 0-12.77 9.24-22.18 21.42-22.18 7.91 0 14.79 4.29 18.66 9.7Zm37.95 18.86-22.4-37.18h10.84l13.44 23.36 13.36-23.36H316l-22.4 37.18V68h-9.5v-7.82h-.65Z"
      />
    </svg>
  );
}

// Verified checkmark badge
function VerifiedBadge() {
  return (
    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 inline-block ml-1" aria-label="Geverifieerd">
      <path
        fill="#1d4ed8"
        d="M7 0L8.5 1.5L10.5 1L11 3L13 3.5L12.5 5.5L14 7L12.5 8.5L13 10.5L11 11L10.5 13L8.5 12.5L7 14L5.5 12.5L3.5 13L3 11L1 10.5L1.5 8.5L0 7L1.5 5.5L1 3.5L3 3L3.5 1L5.5 1.5L7 0Z"
      />
      <path
        fill="#ffffff"
        d="M9.5 5L9 5.5L9 6L8.5 6.5L7.5 7.5L6.5 8.5L5.5 9.5L5 9L4.5 8.5L4 8L4.5 7.5L5 7L4 6L3.5 6.5L3 7L3.5 7.5L4 8L4.5 8.5L5 9L5.5 9.5L6 10L6.5 9.5L7.5 8.5L8.5 7.5L9.5 6.5L10 6L9.5 5Z"
      />
    </svg>
  );
}

// Google G logo voor in avatar
function GLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 absolute bottom-0 right-0">
      <circle cx="12" cy="12" r="12" fill="#ffffff" />
      <path
        fill="#4285F4"
        d="M22.5 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.22-4.74 3.22-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC04"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}

export function Reviews() {
  const [start, setStart] = useState(0);
  const visible = 5; // aantal cards tegelijk zichtbaar op desktop

  function prev() {
    setStart((s) => Math.max(0, s - 1));
  }

  function next() {
    setStart((s) => Math.min(googleReviews.length - visible, s + 1));
  }

  const totalDots = googleReviews.length - visible + 1;

  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        {/* Titel */}
        <div className="text-center mb-12">
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.03em] text-ink-900">
            Dit zeggen onze klanten in Google
          </h2>
        </div>

        {/* Google header banner */}
        <div className="bg-paper-50 border border-paper-200 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <GoogleLogo className="h-7 w-auto" />
              <span className="text-2xl font-display font-bold text-ink-900">Beoordelingen</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-display font-bold text-ink-900">4.9</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" strokeWidth={0} />
                ))}
              </span>
              <span className="text-sm text-ink-500 font-mono">(127)</span>
            </div>
          </div>
          <a
            href="https://search.google.com/local/reviews?placeid=lk-dakwerken"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors whitespace-nowrap"
          >
            Beoordeel ons op Google
          </a>
        </div>

        {/* Reviews carousel */}
        <div className="relative">
          {/* Vorige knop */}
          <button
            onClick={prev}
            disabled={start === 0}
            aria-label="Vorige reviews"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-paper-200 items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-ink-900" />
          </button>

          {/* Volgende knop */}
          <button
            onClick={next}
            disabled={start >= googleReviews.length - visible}
            aria-label="Volgende reviews"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-paper-200 items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-ink-900" />
          </button>

          {/* Cards viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{ transform: `translateX(calc(-${start} * (100% / ${visible} + ${(visible - 1) * 16 / visible}px)))` }}
            >
              {googleReviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white border border-paper-200 rounded-2xl p-5 flex-shrink-0 hover:shadow-lg transition-shadow"
                  style={{ width: `calc((100% - ${(visible - 1) * 16}px) / ${visible})` }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-bold text-base`}>
                        {r.initialen}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <GLogo />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-ink-900 text-sm truncate flex items-center">
                        {r.naam}
                        <VerifiedBadge />
                      </div>
                      <div className="text-xs text-ink-500">{r.tijd}</div>
                    </div>
                  </div>

                  {/* Sterren */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                    ))}
                  </div>

                  {/* Tekst */}
                  <p className="text-sm text-ink-700 leading-relaxed line-clamp-4 mb-3">
                    {r.tekst}
                  </p>

                  {/* Locatie + Lees meer */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-ink-400 uppercase tracking-widest">{r.locatie}</span>
                    <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
                      Lees meer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-10">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStart(i)}
                aria-label={`Ga naar groep ${i + 1}`}
                className={`transition-all rounded-full ${
                  i === start ? 'w-8 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-paper-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
