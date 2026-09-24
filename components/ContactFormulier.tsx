'use client';

import { useState } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';

const ONDERWERPEN = [
  'Bitumen dak',
  'Renovatie',
  'Nieuwbouw',
  'Onderhoud',
  'Lekkage',
  'Offerte',
  'Anders',
];

type Veld = 'naam' | 'email' | 'telefoon' | 'onderwerp' | 'bericht';

const leeg: Record<Veld, string> = { naam: '', email: '', telefoon: '', onderwerp: '', bericht: '' };

function valideer(data: Record<Veld, string>) {
  const fouten: Partial<Record<Veld, string>> = {};
  if (!data.naam.trim()) fouten.naam = 'Vul uw naam in.';
  if (!data.email.trim()) {
    fouten.email = 'Vul uw e-mailadres in.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
    fouten.email = 'Dit e-mailadres lijkt niet compleet.';
  }
  if (!data.bericht.trim()) fouten.bericht = 'Vertel kort waar we u mee kunnen helpen.';
  return fouten;
}

/**
 * Compact algemeen contactformulier: bewust géén calculator zoals /offerte/,
 * alleen naam, contactgegevens, onderwerp en bericht. Bij "Lekkage" tonen we
 * meteen de bel-CTA erboven, zodat een spoedklant niet eerst een formulier
 * hoeft in te vullen en te wachten.
 */
export function ContactFormulier() {
  const [data, setData] = useState<Record<Veld, string>>(leeg);
  const [aangeraakt, setAangeraakt] = useState<Partial<Record<Veld, boolean>>>({});
  const [gepoogd, setGepoogd] = useState(false);
  const [verzonden, setVerzonden] = useState(false);

  const fouten = valideer(data);
  const toonFout = (k: Veld) => Boolean((aangeraakt[k] || gepoogd) && fouten[k]);
  const update = (k: Veld, v: string) => setData((d) => ({ ...d, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setGepoogd(true);
    if (Object.keys(fouten).length > 0) return;
    setVerzonden(true);
  }

  if (verzonden) {
    return (
      <div className="panel p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-7 flex items-center justify-center">
          <Check className="w-8 h-8 text-white" aria-hidden="true" strokeWidth={3} />
        </div>
        <h3 className="font-display text-2xl font-bold text-ink-900 tracking-[-0.03em]">
          Bedankt, {data.naam}.
        </h3>
        <p className="mt-3 text-ink-500 max-w-md mx-auto leading-relaxed">
          We hebben uw bericht ontvangen en nemen zo snel mogelijk contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="panel p-6 md:p-10">
      {data.onderwerp === 'Lekkage' && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50 p-5">
          <p className="font-medium text-ink-900">Heeft u momenteel actieve lekkage?</p>
          <a href="tel:+31680110879" className="btn-pill shrink-0">
            <span className="label">Bel voor snellere hulp</span>
          </a>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="c-naam" className="field-label">
            Naam<span className="verplicht" aria-hidden="true">*</span>
          </label>
          <input
            id="c-naam"
            type="text"
            autoComplete="name"
            value={data.naam}
            onChange={(e) => update('naam', e.target.value)}
            onBlur={() => setAangeraakt((a) => ({ ...a, naam: true }))}
            aria-invalid={toonFout('naam')}
            className="field-input"
          />
          {toonFout('naam') && <p className="field-error">{fouten.naam}</p>}
        </div>

        <div>
          <label htmlFor="c-email" className="field-label">
            E-mailadres<span className="verplicht" aria-hidden="true">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => setAangeraakt((a) => ({ ...a, email: true }))}
            aria-invalid={toonFout('email')}
            className="field-input"
          />
          {toonFout('email') && <p className="field-error">{fouten.email}</p>}
        </div>

        <div>
          <label htmlFor="c-telefoon" className="field-label">Telefoonnummer</label>
          <input
            id="c-telefoon"
            type="tel"
            autoComplete="tel"
            value={data.telefoon}
            onChange={(e) => update('telefoon', e.target.value)}
            className="field-input"
          />
        </div>

        <div>
          <label htmlFor="c-onderwerp" className="field-label">Waar gaat uw vraag over?</label>
          <select
            id="c-onderwerp"
            value={data.onderwerp}
            onChange={(e) => update('onderwerp', e.target.value)}
            className="field-input"
          >
            <option value="">Maak een keuze</option>
            {ONDERWERPEN.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="c-bericht" className="field-label">
          Uw bericht<span className="verplicht" aria-hidden="true">*</span>
        </label>
        <textarea
          id="c-bericht"
          rows={5}
          value={data.bericht}
          onChange={(e) => update('bericht', e.target.value)}
          onBlur={() => setAangeraakt((a) => ({ ...a, bericht: true }))}
          aria-invalid={toonFout('bericht')}
          placeholder="Vertel kort waar we u mee kunnen helpen..."
          className="field-input resize-y"
        />
        {toonFout('bericht') && <p className="field-error">{fouten.bericht}</p>}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
        <p className="flex items-start gap-2.5 text-sm text-ink-500 max-w-sm leading-relaxed">
          <Lock className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" aria-hidden="true" />
          Uw gegevens worden alleen gebruikt om contact met u op te nemen over uw aanvraag.
        </p>
        <button type="submit" className="btn-pill self-start sm:self-auto">
          <span className="label">Verstuur mijn bericht</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </button>
      </div>
    </form>
  );
}
