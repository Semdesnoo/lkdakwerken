'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Droplets,
  Hammer,
  Info,
  Layers,
  Lock,
  Phone,
  Wrench,
} from 'lucide-react';
import {
  berekenIndicatie,
  formatEuro,
  opties as prijsOpties,
  type OptieId,
} from '@/lib/prijzen';

const dienstOpties = [
  { value: 'bitumen-daken', label: 'Bitumen daken', hint: 'Nieuwe of vervangende dakbedekking', Icoon: Layers },
  { value: 'renovatie', label: 'Renovatie', hint: 'Bestaand dak volledig vernieuwen', Icoon: Hammer },
  { value: 'nieuwbouw', label: 'Nieuwbouw', hint: 'Dak voor woning, aanbouw of bouwproject', Icoon: Wrench },
  { value: 'onderhoud', label: 'Onderhoud', hint: 'Inspectie en periodiek onderhoud', Icoon: Check },
  { value: 'lekkage', label: 'Lekkage', hint: 'Onderzoek en herstel bij lekkage', Icoon: Droplets },
];

/* Standen van de oppervlakteschuif. Niet lineair: onder de honderd vierkante
   meter wil je per vijf kunnen kiezen, daarboven is dat zinloos nauwkeurig. */
const OPPERVLAKTES = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100,
  120, 140, 160, 180, 200, 250, 300, 400, 500, 750, 1000,
];
const STANDAARD_STAND = 9; // 50 m², een gangbare uitbouw

const OMSCHRIJVING_PLACEHOLDER: Record<string, string> = {
  'bitumen-daken': 'Bijvoorbeeld: het dak is ongeveer 20 jaar oud en we willen de dakbedekking en isolatie vernieuwen.',
  renovatie: 'Bijvoorbeeld: er ontstaan regelmatig lekkages en het dak is ongeveer 25 jaar oud.',
  nieuwbouw: 'Bijvoorbeeld: aanbouw van circa 45 m². De constructie wordt volgende maand geplaatst.',
  onderhoud: 'Bijvoorbeeld: we willen het dak jaarlijks laten controleren.',
  lekkage: 'Bijvoorbeeld: sinds gisteren lekt het bij de achterzijde van de aanbouw wanneer het hard regent.',
  '': 'Sinds wanneer speelt het probleem? Hoe oud is het dak? Zijn er foto\'s beschikbaar?',
};

type VeldNaam = 'dienst' | 'oppervlakte' | 'naam' | 'email' | 'telefoon' | 'straat' | 'postcode' | 'plaats' | 'opmerkingen';

const leeg: Record<VeldNaam, string> = {
  dienst: '',
  oppervlakte: '',
  naam: '',
  email: '',
  telefoon: '',
  straat: '',
  postcode: '',
  plaats: '',
  opmerkingen: '',
};

const POSTCODE_PATROON = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;

function valideer(data: Record<VeldNaam, string>) {
  const fouten: Partial<Record<VeldNaam, string>> = {};
  if (!data.dienst) fouten.dienst = 'Kies een dienst zodat we uw aanvraag bij de juiste vakman leggen.';
  if (!data.naam.trim()) fouten.naam = 'Vul uw naam in.';
  if (!data.email.trim()) {
    fouten.email = 'Vul uw e-mailadres in.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
    fouten.email = 'Dit e-mailadres lijkt niet compleet.';
  }
  if (!data.telefoon.trim()) {
    fouten.telefoon = 'Vul uw telefoonnummer in, zodat we u kunnen terugbellen.';
  } else if (data.telefoon.replace(/\D/g, '').length < 9) {
    fouten.telefoon = 'Vul een volledig telefoonnummer in.';
  }
  if (!data.straat.trim()) fouten.straat = 'Vul het adres van het dak in.';
  if (!data.postcode.trim()) {
    fouten.postcode = 'Vul de postcode in.';
  } else if (!POSTCODE_PATROON.test(data.postcode.trim())) {
    fouten.postcode = 'Vul een geldige postcode in, bijvoorbeeld 3044 CK.';
  }
  if (!data.plaats.trim()) fouten.plaats = 'Vul de plaats in.';
  return fouten;
}

/** Kort, leesbaar aanvraagnummer. Puur voor herkenning bij telefonisch contact,
    geen database-ID: LK-<jaar>-<4 cijfers>. */
function nieuwAanvraagnummer() {
  const jaar = new Date().getFullYear();
  const reeks = Math.floor(1000 + Math.random() * 9000);
  return `LK-${jaar}-${reeks}`;
}

export function OfferteFormulier() {
  const [data, setData] = useState<Record<VeldNaam, string>>(leeg);
  const [gekozenOpties, setGekozenOpties] = useState<OptieId[]>([]);
  const [aangeraakt, setAangeraakt] = useState<Partial<Record<VeldNaam, boolean>>>({});
  const [gepoogd, setGepoogd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aanvraagnummer, setAanvraagnummer] = useState('');
  /* De schuif staat pas aan zodra de bezoeker hem gebruikt; daarvoor is het
     oppervlak onbekend en tonen we nog geen prijs. */
  const [stand, setStand] = useState(STANDAARD_STAND);
  const [oppervlakBekend, setOppervlakBekend] = useState(false);
  const reduce = useReducedMotion();
  const wortel = useRef<HTMLDivElement>(null);

  // Vanaf een dienstpagina kan /offerte/?dienst=nieuwbouw de juiste dienst voorselecteren.
  const zoekParams = useSearchParams();
  useEffect(() => {
    const gevraagd = zoekParams.get('dienst');
    if (gevraagd && dienstOpties.some((o) => o.value === gevraagd)) {
      setData((vorige) => ({ ...vorige, dienst: gevraagd }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oppervlak = OPPERVLAKTES[stand];

  const fouten = useMemo(() => valideer(data), [data]);
  const indicatie = useMemo(
    () =>
      berekenIndicatie(
        data.dienst,
        oppervlakBekend ? String(oppervlak) : '',
        gekozenOpties,
      ),
    [data.dienst, oppervlak, oppervlakBekend, gekozenOpties]
  );
  // Toeslagen en oppervlakteslider slaan alleen ergens op bij werk dat per m² wordt gerekend.
  const toonToeslagen = data.dienst !== '' && data.dienst !== 'lekkage';
  const toonOppervlakteSlider = data.dienst !== 'lekkage';

  function update(k: VeldNaam, v: string) {
    setData((vorige) => ({ ...vorige, [k]: v }));
  }

  function kiesDienst(waarde: string) {
    setData((vorige) => ({ ...vorige, dienst: waarde }));
    setAangeraakt((a) => ({ ...a, dienst: true }));
  }

  function verzetSchuif(nieuweStand: number) {
    setStand(nieuweStand);
    setOppervlakBekend(true);
    update('oppervlakte', String(OPPERVLAKTES[nieuweStand]));
  }

  function wisselOptie(id: OptieId) {
    setGekozenOpties((vorige) =>
      vorige.includes(id) ? vorige.filter((o) => o !== id) : [...vorige, id]
    );
  }

  function toonFout(k: VeldNaam) {
    return Boolean((aangeraakt[k] || gepoogd) && fouten[k]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setGepoogd(true);
    if (Object.keys(fouten).length > 0) {
      // Naar het eerste veld met een fout, anders blijft de melding onzichtbaar.
      const eerste = (Object.keys(fouten) as VeldNaam[])[0];
      document.getElementById(eerste)?.focus({ preventScroll: false });
      return;
    }
    setAanvraagnummer(nieuwAanvraagnummer());
    setSubmitted(true);
    // De bevestiging is korter dan het formulier, dus zonder scrollen kijkt de
    // bezoeker naar de footer in plaats van naar het bedankbericht.
    requestAnimationFrame(() => {
      wortel.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
    });
  }

  const gekozenDienst = dienstOpties.find((o) => o.value === data.dienst);

  if (submitted) {
    return (
      <div ref={wortel} className="panel p-8 md:p-12 text-center scroll-mt-28">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-7 flex items-center justify-center">
          <Check className="w-8 h-8 text-white" aria-hidden="true" strokeWidth={3} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 tracking-[-0.03em]">
          Bedankt, we hebben uw aanvraag ontvangen.
        </h2>
        <p className="mt-4 text-lg text-ink-500 max-w-md mx-auto leading-relaxed">
          We bekijken uw aanvraag en nemen contact met u op om de situatie en eventuele
          dakinspectie verder te bespreken.
        </p>

        <dl className="mt-8 max-w-md mx-auto rounded-2xl bg-paper-50 p-6 text-left space-y-3">
          <div className="flex justify-between gap-4 text-sm">
            <dt className="text-ink-500">Aanvraagnummer</dt>
            <dd className="font-semibold text-ink-900">{aanvraagnummer}</dd>
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <dt className="text-ink-500">Dienst</dt>
            <dd className="font-semibold text-ink-900">{gekozenDienst?.label}</dd>
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <dt className="text-ink-500">Locatie</dt>
            <dd className="font-semibold text-ink-900">{data.plaats}</dd>
          </div>
        </dl>

        {indicatie && (
          <div className="mt-4 max-w-md mx-auto rounded-2xl bg-ink-950 text-white p-6 text-left">
            <p className="text-sm font-semibold text-blue-400">Prijsindicatie</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] leading-none">
              {formatEuro(indicatie.van)}
              <span className="text-white/50 font-normal"> – </span>
              {formatEuro(indicatie.tot)}
              {indicatie.eenheid && (
                <span className="text-base font-normal text-white/60"> {indicatie.eenheid}</span>
              )}
            </p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">{indicatie.voorbehoud}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-pill">
            <span className="label">Terug naar home</span>
          </Link>
          <Link href="/projecten" className="btn-ghost-invert">
            Bekijk onze projecten
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Voortgang: geen echte wizard, maar de secties voelen wel als stappen. */}
      <ol className="mt-2 mb-10 flex flex-wrap items-center gap-x-1 gap-y-2 rounded-2xl bg-white border border-paper-200 shadow-sm px-5 py-4 text-sm font-semibold">
        <li className="flex items-center gap-2.5 text-blue-600">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs text-white shadow-[0_2px_10px_rgba(37,99,235,0.35)]">1</span>
          Uw dak
        </li>
        <ArrowRight className="w-4 h-4 mx-3 text-ink-300 shrink-0" aria-hidden="true" />
        <li className="flex items-center gap-2.5 text-ink-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper-100 text-xs text-ink-400">2</span>
          Uw gegevens
        </li>
        <ArrowRight className="w-4 h-4 mx-3 text-ink-300 shrink-0" aria-hidden="true" />
        <li className="flex items-center gap-2.5 text-ink-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper-100 text-xs text-ink-400">3</span>
          Aanvraag versturen
        </li>
      </ol>

      <form onSubmit={submit} noValidate>
        <div className="panel p-6 md:p-10">
          {/* Groep 1: dak-informatie */}
          <fieldset className="form-group">
            <legend className="text-display text-2xl tracking-[-0.02em] text-ink-900 mb-1">
              1. Over uw dak
            </legend>
            <p className="text-ink-500 mb-6">Met deze gegevens kunnen we uw aanvraag en prijsindicatie beter afstemmen.</p>

            <div className="space-y-8">
              {/* Dienstkeuze als kaarten */}
              <fieldset className="border-0 p-0 m-0 min-w-0">
                <legend className="field-label">
                  Welke dienst heeft u nodig?
                  <span className="verplicht" aria-hidden="true">*</span>
                </legend>
                <div
                  className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-1"
                  role="radiogroup"
                  aria-label="Welke dienst heeft u nodig?"
                  aria-invalid={toonFout('dienst')}
                  aria-describedby={toonFout('dienst') ? 'dienst-fout' : undefined}
                >
                  {dienstOpties.map(({ value, label, hint, Icoon }) => {
                    const aan = data.dienst === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={aan}
                        id={value === dienstOpties[0].value ? 'dienst' : undefined}
                        onClick={() => kiesDienst(value)}
                        className={`group relative flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all ${
                          aan
                            ? 'border-blue-500 bg-blue-500/[0.06] shadow-[0_2px_16px_rgba(37,99,235,0.14)]'
                            : 'border-paper-200 hover:border-blue-300 hover:bg-paper-50'
                        }`}
                      >
                        {aan && (
                          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                        )}
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                            aan ? 'bg-blue-500 text-white' : 'bg-paper-100 text-ink-500'
                          }`}
                        >
                          <Icoon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block font-semibold text-[0.9375rem] leading-tight ${
                              aan ? 'text-blue-600' : 'text-ink-900'
                            }`}
                          >
                            {label}
                          </span>
                          <span className="block text-sm text-ink-500 mt-1 leading-snug">{hint}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                {toonFout('dienst') && (
                  <p id="dienst-fout" className="field-error">
                    {fouten.dienst}
                  </p>
                )}
              </fieldset>

              {/* Lekkage: bel-CTA meteen bovenaan, geen formulier eerst */}
              {data.dienst === 'lekkage' && (
                <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-[0_8px_30px_rgba(37,99,235,0.28)]">
                  <div>
                    <p className="text-sm font-semibold text-white/80">Heeft u nu actieve lekkage?</p>
                    <p className="mt-0.5 text-lg font-display font-bold tracking-[-0.01em]">Wij helpen u direct verder.</p>
                  </div>
                  <a
                    href="tel:+31680110879"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-blue-700 font-semibold shadow-sm transition-transform hover:scale-[1.03]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </span>
                    06 - 80 11 08 79
                  </a>
                </div>
              )}

              {/* Oppervlakte met een schuif: alleen zinvol als er wel per m² wordt gerekend */}
              {toonOppervlakteSlider && (
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <label htmlFor="oppervlakte" className="field-label mb-0">
                      Geschatte oppervlakte
                    </label>
                    <span
                      className={`font-display text-2xl font-bold tracking-[-0.02em] tabular-nums transition-colors ${
                        oppervlakBekend ? 'text-blue-600' : 'text-ink-400'
                      }`}
                      aria-hidden="true"
                    >
                      {oppervlak} m²
                    </span>
                  </div>

                  <input
                    id="oppervlakte"
                    name="oppervlakte"
                    type="range"
                    min={0}
                    max={OPPERVLAKTES.length - 1}
                    step={1}
                    value={stand}
                    onChange={(e) => verzetSchuif(Number(e.target.value))}
                    className="schuif mt-4"
                    aria-valuetext={`${oppervlak} vierkante meter`}
                  />

                  <div className="mt-2 flex justify-between text-xs text-ink-400">
                    <span>{OPPERVLAKTES[0]} m²</span>
                    <span>{OPPERVLAKTES[OPPERVLAKTES.length - 1]} m² of meer</span>
                  </div>

                  <p className="field-hint">
                    {oppervlakBekend
                      ? 'Een schatting is genoeg. Bij de inspectie meten we het dak precies op.'
                      : 'Sleep de schuif voor een directe prijsindicatie. Een schatting is genoeg.'}
                  </p>
                </div>
              )}

              {/* Toeslagen: alleen zinvol bij werk dat per m² wordt gerekend */}
              {toonToeslagen && (
                <fieldset className="border-0 p-0 m-0 min-w-0 mt-2">
                  <legend className="field-label">Wilt u dit meenemen?</legend>
                  <div className="grid sm:grid-cols-2 gap-3 mt-1">
                    {prijsOpties.map((optie) => {
                      const aan = gekozenOpties.includes(optie.id);
                      return (
                        <label
                          key={optie.id}
                          className={`flex gap-3 rounded-2xl border p-4 cursor-pointer transition-colors ${
                            aan
                              ? 'border-blue-500 bg-blue-500/[0.06]'
                              : 'border-paper-200 hover:border-paper-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={aan}
                            onChange={() => wisselOptie(optie.id)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`w-5 h-5 mt-0.5 rounded-md shrink-0 flex items-center justify-center border transition-colors ${
                              aan ? 'bg-blue-500 border-blue-500' : 'border-paper-300 bg-white'
                            }`}
                          >
                            {aan && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-ink-900 text-[0.9375rem]">
                              {optie.label}
                            </span>
                            <span className="block text-sm text-ink-500 mt-0.5 leading-relaxed">
                              {optie.hint}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <div className="mt-8">
                <Prijskaart indicatie={indicatie} reduce={!!reduce} />
              </div>
            </div>
          </fieldset>

          <div className="form-divider" aria-hidden="true" />

          {/* Groep 2: contactgegevens + adres van het dak */}
          <fieldset className="form-group">
            <legend className="text-display text-2xl tracking-[-0.02em] text-ink-900 mb-1">
              2. Waar kunnen we de offerte naartoe sturen?
            </legend>
            <p className="text-ink-500 mb-6">
              Vul uw gegevens in zodat we contact met u kunnen opnemen over de aanvraag.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="naam" className="field-label">
                  Naam
                  <span className="verplicht" aria-hidden="true">*</span>
                </label>
                <input
                  id="naam"
                  name="naam"
                  type="text"
                  required
                  autoComplete="name"
                  value={data.naam}
                  onChange={(e) => update('naam', e.target.value)}
                  onBlur={() => setAangeraakt((a) => ({ ...a, naam: true }))}
                  aria-invalid={toonFout('naam')}
                  aria-describedby={toonFout('naam') ? 'naam-fout' : undefined}
                  className="field-input"
                />
                {toonFout('naam') && (
                  <p id="naam-fout" className="field-error">
                    {fouten.naam}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="field-label">
                  E-mailadres
                  <span className="verplicht" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  onBlur={() => setAangeraakt((a) => ({ ...a, email: true }))}
                  aria-invalid={toonFout('email')}
                  aria-describedby={toonFout('email') ? 'email-fout' : undefined}
                  className="field-input"
                />
                {toonFout('email') && (
                  <p id="email-fout" className="field-error">
                    {fouten.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="telefoon" className="field-label">
                  Telefoonnummer
                  <span className="verplicht" aria-hidden="true">*</span>
                </label>
                <input
                  id="telefoon"
                  name="telefoon"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={data.telefoon}
                  onChange={(e) => update('telefoon', e.target.value)}
                  onBlur={() => setAangeraakt((a) => ({ ...a, telefoon: true }))}
                  aria-invalid={toonFout('telefoon')}
                  aria-describedby={toonFout('telefoon') ? 'telefoon-fout' : undefined}
                  className="field-input"
                />
                {toonFout('telefoon') && (
                  <p id="telefoon-fout" className="field-error">
                    {fouten.telefoon}
                  </p>
                )}
              </div>
            </div>

            {/* Adres van het dak: hoort inhoudelijk bij "waar kunnen we de offerte
                naartoe sturen", staat daarom in dezelfde stap als de contactgegevens
                i.p.v. tussen de dakvragen in stap 1. */}
            <div className="grid sm:grid-cols-3 gap-6 mt-6">
              <div>
                <label htmlFor="straat" className="field-label">
                  Adres van het dak
                  <span className="verplicht" aria-hidden="true">*</span>
                </label>
                <input
                  id="straat"
                  name="straat"
                  type="text"
                  autoComplete="street-address"
                  value={data.straat}
                  onChange={(e) => update('straat', e.target.value)}
                  onBlur={() => setAangeraakt((a) => ({ ...a, straat: true }))}
                  aria-invalid={toonFout('straat')}
                  aria-describedby={toonFout('straat') ? 'straat-fout' : undefined}
                  placeholder="Straat 12"
                  className="field-input"
                />
                {toonFout('straat') && (
                  <p id="straat-fout" className="field-error">
                    {fouten.straat}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="postcode" className="field-label">
                  Postcode
                  <span className="verplicht" aria-hidden="true">*</span>
                </label>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  autoComplete="postal-code"
                  value={data.postcode}
                  onChange={(e) => update('postcode', e.target.value)}
                  onBlur={() => setAangeraakt((a) => ({ ...a, postcode: true }))}
                  aria-invalid={toonFout('postcode')}
                  aria-describedby={toonFout('postcode') ? 'postcode-fout' : undefined}
                  placeholder="3044 CK"
                  className="field-input"
                />
                {toonFout('postcode') && (
                  <p id="postcode-fout" className="field-error">
                    {fouten.postcode}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="plaats" className="field-label">
                  Plaats
                  <span className="verplicht" aria-hidden="true">*</span>
                </label>
                <input
                  id="plaats"
                  name="plaats"
                  type="text"
                  autoComplete="address-level2"
                  value={data.plaats}
                  onChange={(e) => update('plaats', e.target.value)}
                  onBlur={() => setAangeraakt((a) => ({ ...a, plaats: true }))}
                  aria-invalid={toonFout('plaats')}
                  aria-describedby={toonFout('plaats') ? 'plaats-fout' : undefined}
                  placeholder="Rotterdam"
                  className="field-input"
                />
                {toonFout('plaats') && (
                  <p id="plaats-fout" className="field-error">
                    {fouten.plaats}
                  </p>
                )}
              </div>

              <p className="field-hint sm:col-span-3">
                Zo kunnen we meteen controleren of uw adres binnen onze regio valt.
              </p>
            </div>
          </fieldset>

          <div className="form-divider" aria-hidden="true" />

          {/* Groep 3: omschrijving */}
          <fieldset className="form-group">
            <legend className="text-display text-2xl tracking-[-0.02em] text-ink-900 mb-1">
              3. Nog iets dat we moeten weten?
            </legend>
            <p className="text-ink-500 mb-6">Vertel eventueel kort iets over de situatie. U mag dit ook leeg laten.</p>

            <label htmlFor="opmerkingen" className="field-label">
              Uw situatie
            </label>
            <textarea
              id="opmerkingen"
              name="opmerkingen"
              rows={5}
              value={data.opmerkingen}
              onChange={(e) => update('opmerkingen', e.target.value)}
              placeholder={OMSCHRIJVING_PLACEHOLDER[data.dienst] ?? OMSCHRIJVING_PLACEHOLDER['']}
              className="field-input resize-y"
            />
          </fieldset>

          <div className="form-divider" aria-hidden="true" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <p className="flex items-start gap-2.5 text-sm text-ink-500 max-w-sm leading-relaxed">
              <Lock className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" aria-hidden="true" />
              <span>
                Door deze aanvraag te versturen gaat u akkoord met onze verwerking van uw gegevens
                om contact over deze aanvraag mogelijk te maken.
              </span>
            </p>
            <div className="self-start sm:self-auto">
              <button type="submit" className="btn-pill">
                <span className="label">Vraag mijn offerte aan</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </button>
              <p className="mt-2 text-xs text-ink-400">Vrijblijvend · Geen verplichtingen</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/** De zwarte prijskaart. Gedeeld tussen de mobiele inline-plek en de sticky
    kolom op desktop, zodat opmaak en cijfers nooit uit de pas kunnen lopen. */
function Prijskaart({
  indicatie,
  reduce,
  compact = false,
}: {
  indicatie: ReturnType<typeof berekenIndicatie>;
  reduce: boolean;
  compact?: boolean;
}) {
  return (
    <AnimatePresence initial={false}>
      {indicatie && (
        <motion.div
          key="indicatie"
          initial={reduce ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={reduce ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          aria-live="polite"
        >
          <div className={`rounded-2xl bg-ink-950 text-white ${compact ? 'p-5' : 'p-6 sm:p-7'}`}>
            <p className="text-sm font-semibold text-blue-400">Uw prijsindicatie</p>

            <p className={`mt-2 font-display font-bold tracking-[-0.03em] leading-none ${compact ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
              {formatEuro(indicatie.van)}
              <span className="text-white/50 font-normal"> – </span>
              {formatEuro(indicatie.tot)}
              {indicatie.eenheid && (
                <span className="text-base font-normal text-white/60"> {indicatie.eenheid}</span>
              )}
            </p>

            {!compact && <p className="mt-2.5 text-white/75 leading-relaxed">{indicatie.toelichting}</p>}

            <dl className="mt-5 pt-5 border-t border-blue-400/20 space-y-2.5">
              {indicatie.regels.map((regel) => (
                <div
                  key={regel.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"
                >
                  <dt className="text-white/70">{regel.label}</dt>
                  <dd className="text-white font-medium">{regel.waarde}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-start gap-2.5 text-sm text-white/60 leading-relaxed">
              <Info className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" aria-hidden="true" />
              {indicatie.voorbehoud}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
