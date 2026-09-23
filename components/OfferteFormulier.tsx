"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const dienstOpties = [
  { value: "bitumen-daken", label: "Bitumen daken" },
  { value: "renovatie", label: "Renovatie" },
  { value: "nieuwbouw", label: "Nieuwbouw" },
  { value: "onderhoud", label: "Onderhoud" },
  { value: "lekkage", label: "Lekkage (spoed)" },
];

export function OfferteFormulier() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    dienst: "",
    oppervlakte: "",
    naam: "",
    email: "",
    telefoon: "",
    adres: "",
    opmerkingen: "",
  });

  function update(k: string, v: string) {
    setData({ ...data, [k]: v });
  }

  function next() { setStep(Math.min(3, step + 1)); }
  function back() { setStep(Math.max(1, step - 1)); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16 panel p-8">
        <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-8 flex items-center justify-center">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-4">
          Bedankt, {data.naam || "we nemen contact op"}.
        </h3>
        <p className="text-lg text-ink-500 max-w-xl mx-auto">
          We hebben je aanvraag ontvangen en bellen je binnen één werkdag terug op {data.telefoon || "het opgegeven nummer"}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="panel p-6 md:p-10">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-12">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-colors ${step >= n ? "bg-blue-500 text-white" : "bg-paper-100 text-ink-400"}`}>
              0{n}
            </div>
            {n < 3 && <div className={`h-0.5 w-12 md:w-20 rounded-full transition-colors ${step > n ? "bg-blue-500" : "bg-paper-100"}`} />}
          </div>
        ))}
      </div>

      <div className="min-h-[320px]">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <div className="eyebrow mb-2">Stap 01</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">
                Welke dienst heeft u nodig?
              </h3>
              <p className="text-ink-500">Kies de dienst die het beste bij uw vraag past.</p>
            </div>
            <div className="space-y-2">
              {dienstOpties.map((opt) => (
                <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors ${data.dienst === opt.value ? "bg-blue-500 text-white" : "bg-paper-50 hover:bg-blue-500/5"}`}>
                  <input
                    type="radio"
                    name="dienst"
                    value={opt.value}
                    checked={data.dienst === opt.value}
                    onChange={(e) => update("dienst", e.target.value)}
                    className="accent-blue-500"
                  />
                  <span className="font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">
                Geschatte oppervlakte (m²)
              </label>
              <input
                type="text"
                value={data.oppervlakte}
                onChange={(e) => update("oppervlakte", e.target.value)}
                placeholder="bijv. 120"
                className="w-full px-4 py-3 rounded-2xl border border-paper-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="eyebrow mb-2">Stap 02</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">
                Wat is uw adres?
              </h3>
              <p className="text-ink-500">We komen graag bij u langs voor een gratis inspectie.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">Adres + postcode</label>
              <input
                type="text"
                value={data.adres}
                onChange={(e) => update("adres", e.target.value)}
                placeholder="Straat 12, 3000 AA Rotterdam"
                className="w-full px-4 py-3 rounded-2xl border border-paper-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">Opmerkingen (optioneel)</label>
              <textarea
                value={data.opmerkingen}
                onChange={(e) => update("opmerkingen", e.target.value)}
                rows={4}
                placeholder="Vertel ons over uw situatie..."
                className="w-full px-4 py-3 rounded-2xl border border-paper-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <div className="eyebrow mb-2">Stap 03</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">
                Hoe kunnen we u bereiken?
              </h3>
              <p className="text-ink-500">We bellen binnen één werkdag terug.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">Naam</label>
              <input
                type="text"
                value={data.naam}
                onChange={(e) => update("naam", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-paper-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-2">E-mail</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-paper-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-2">Telefoon</label>
                <input
                  type="tel"
                  value={data.telefoon}
                  onChange={(e) => update("telefoon", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-paper-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-paper-200 pt-8">
        {step > 1 ? (
          <button type="button" onClick={back} className="inline-flex items-center gap-2 text-ink-900 font-semibold hover:text-blue-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Vorige
          </button>
        ) : <div />}

        {step < 3 ? (
          <button type="button" onClick={next} disabled={step === 1 && !data.dienst} className="btn-pill disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="label">Volgende</span>
            <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
          </button>
        ) : (
          <button type="submit" className="btn-pill">
            <span className="label">Verstuur aanvraag</span>
            <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
          </button>
        )}
      </div>
    </form>
  );
}
