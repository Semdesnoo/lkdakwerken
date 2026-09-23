'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Droplets,
  Hammer,
  Info,
  Layers,
  Lock,
  Wrench,
} from 'lucide-react';
import {
  berekenIndicatie,
  formatEuro,
  opties as prijsOpties,
  type OptieId,
} from '@/lib/prijzen';

const dienstOpties = [
  { value: 'bitumen-daken', label: 'Bitumen daken', hint: 'Nieuwe dakbedekking', Icoon: Layers },
  { value: 'renovatie', label: 'Renovatie', hint: 'Bestaand dak vervangen', Icoon: Hammer },
  { value: 'nieuwbouw', label: 'Nieuwbouw', hint: 'Dak op nieuwe aanbouw', Icoon: Wrench },
  { value: 'onderhoud', label: 'Onderhoud', hint: 'Jaarlijkse controle', Icoon: Check },
  { value: 'lekkage', label: 'Lekkage', hint: 'Spoed, vaak dezelfde dag', Icoon: Droplets },
];

/* Standen van de oppervlakteschuif. Niet lineair: onder de honderd vierkante
   meter wil je per vijf kunnen kiezen, daarboven is dat zinloos nauwkeurig. */
const OPPERVLAKTES = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100,
  120, 140, 160, 180, 200, 250, 300, 400, 500, 750, 1000,
];
const STANDAARD_STAND = 9; // 50 m², een gangbare uitbouw

type VeldNaam = 'dienst' | 'oppervlakte' | 'naam' | 'email' | 'telefoon' | 'adres' | 'opmerkingen';

const leeg: Record<VeldNaam, string> = {
  dienst: '',
  oppervlakte: '',
  naam: '',
  email: '',
  telefoon: '',
  adres: '',
  opmerkingen: '',
};

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
  return fouten;
}

export function OfferteFormulier() {
  const [data, setData] = useState<Record<VeldNaam, string>>(leeg);
  const [gekozenOpties, setGekozenOpties] = useState<OptieId[]>([]);
  const [aangeraakt, setAangeraakt] = useState<Partial<Record<VeldNaam, boolean>>>({});
  const [gepoogd, setGepoogd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /* De schuif staat pas aan zodra de bezoeker hem gebruikt; daarvoor is het
     oppervlak onbekend en tonen we nog geen prijs. */
  const [stand, setStand] = useState(STANDAARD_STAND);
  const [oppervlakBekend, setOppervlakBekend] = useState(false);
  const reduce = useReducedMotion();
  const wortel = useRef<HTMLDivElement>(null);

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
  // Toeslagen slaan alleen ergens op bij werk dat per m² wordt gerekend.
  const toonToeslagen = data.dienst !== '' && data.dienst !== 'lekkage';

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

  if (submitted) {
    return (
      <div ref={wortel} className="panel p-8 md:p-12 text-center scroll-mt-28">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-7 flex items-center justify-center">
          <Check className="w-8 h-8 text-white" aria-hidden="true" strokeWidth={3} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 tracking-[-0.03em]">
          Bedankt, {data.naam}.
        </h2>
        <p className="mt-4 text-lg text-ink-500 max-w-md mx-auto leading-relaxed">
          We hebben uw aanvraag ontvangen en bellen u binnen één werkdag terug op {data.telefoon}.
        </p>
        {indicatie && (
          <div className="mt-8 max-w-md mx-auto rounded-2xl bg-ink-950 text-white p-6 text-left">
            <p className="text-sm font-semibold text-blue-400">Uw prijsindicatie</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] leading-none">
              {formatEuro(indicatie.van)}
              <span className="text-white/50 font-normal"> tot </span>
              {formatEuro(indicatie.tot)}
              {indicatie.eenheid && (
                <span className="text-base font-normal text-white/60"> {indicatie.eenheid}</span>
              )}
            </p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">{indicatie.voorbehoud}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="panel p-6 md:p-10">
      {/* Groep 1: dak-informatie */}
      <fieldset className="form-group">
        <legend className="text-display text-2xl tracking-[-0.02em] text-ink-900 mb-1">
          Over uw dak
        </legend>
        <p className="text-ink-500 mb-6">Met deze gegevens kunnen we de offerte gericht opstellen.</p>

        <div className="space-y-8">
          {/* Dienstkeuze als kaarten: sneller te kiezen dan een keuzelijst en
              meteen zichtbaar wat we aanbieden. */}
          <fieldset className="border-0 p-0 m-0 min-w-0">
            <legend className="field-label">
              Welke dienst heeft u nodig?
              <span className="verplicht" aria-hidden="true">*</span>
            </legend>
            <div
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-1"
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
                    className={`group flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all ${
                      aan
                        ? 'border-blue-500 bg-blue-500/[0.06] shadow-[0_2px_16px_rgba(37,99,235,0.14)]'
                        : 'border-paper-200 hover:border-blue-300 hover:bg-paper-50'
                    }`}
                  >
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

          {/* Oppervlakte met een schuif: fijner dan een getal intypen, en het
              laat meteen zien welke bandbreedte we aanhouden. */}
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

          <div>
            <label htmlFor="adres" className="field-label">
              Adres van het dak
            </label>
            <input
              id="adres"
              name="adres"
              type="text"
              autoComplete="street-address"
              value={data.adres}
              onChange={(e) => update('adres', e.target.value)}
              placeholder="Straat 12, 3044 CK Rotterdam"
              className="field-input"
            />
            <p className="field-hint">We komen langs voor een gratis inspectie.</p>
          </div>

          {/* Toeslagen: alleen zinvol bij werk dat per m² wordt gerekend */}
          {toonToeslagen && (
            <fieldset className="border-0 p-0 m-0 min-w-0">
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

          {/* Prijsindicatie: verschijnt zodra dienst en oppervlakte bekend zijn */}
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
                <div className="rounded-2xl bg-ink-950 text-white p-6 sm:p-7">
                  <p className="text-sm font-semibold text-blue-400">Uw prijsindicatie</p>

                  <p className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-none">
                    {formatEuro(indicatie.van)}
                    <span className="text-white/50 font-normal"> tot </span>
                    {formatEuro(indicatie.tot)}
                    {indicatie.eenheid && (
                      <span className="text-lg font-normal text-white/60"> {indicatie.eenheid}</span>
                    )}
                  </p>

                  <p className="mt-2.5 text-white/75 leading-relaxed">{indicatie.toelichting}</p>

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
        </div>
      </fieldset>

      <div className="form-divider" aria-hidden="true" />

      {/* Groep 2: contactgegevens */}
      <fieldset className="form-group">
        <legend className="text-display text-2xl tracking-[-0.02em] text-ink-900 mb-1">
          Uw contactgegevens
        </legend>
        <p className="text-ink-500 mb-6">
          We bellen binnen één werkdag terug. Naam, e-mailadres en telefoonnummer hebben we
          nodig om de offerte te kunnen sturen.
        </p>

        <div className="space-y-6">
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

          <div className="grid sm:grid-cols-2 gap-6">
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
        </div>
      </fieldset>

      <div className="form-divider" aria-hidden="true" />

      {/* Groep 3: omschrijving */}
      <fieldset className="form-group">
        <legend className="text-display text-2xl tracking-[-0.02em] text-ink-900 mb-1">
          Omschrijving
        </legend>
        <p className="text-ink-500 mb-6">Optioneel, maar het scheelt ons vaak een belletje.</p>

        <label htmlFor="opmerkingen" className="field-label">
          Uw situatie
        </label>
        <textarea
          id="opmerkingen"
          name="opmerkingen"
          rows={5}
          value={data.opmerkingen}
          onChange={(e) => update('opmerkingen', e.target.value)}
          placeholder="Sinds wanneer speelt het probleem? Hoe oud is het dak? Zijn er foto's beschikbaar?"
          className="field-input resize-y"
        />
      </fieldset>

      <div className="form-divider" aria-hidden="true" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
        <p className="flex items-start gap-2.5 text-sm text-ink-500 max-w-sm leading-relaxed">
          <Lock className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" aria-hidden="true" />
          <span>
            Velden met een <span className="text-blue-500 font-semibold">*</span> zijn verplicht.
            Uw gegevens gebruiken we alleen voor deze offerte en delen we niet met derden.
          </span>
        </p>
        <button type="submit" className="btn-pill self-start sm:self-auto">
          <span className="label">Verstuur aanvraag</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </button>
      </div>
    </form>
  );
}
