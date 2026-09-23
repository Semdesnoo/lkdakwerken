import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, Navigation2 } from 'lucide-react';
import { bedrijf, certificeringen, fotos } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Contact - Bel, mail of stuur een WhatsApp',
  description: 'Neem contact op met LK Dakwerken. Bel 06 12 34 56 78 of stuur een WhatsApp.',
  alternates: { canonical: '/contact' },
};

const kanalen = [
  {
    icon: Phone,
    label: 'Bel ons',
    waarde: '06 12 34 56 78',
    sub: '7 dagen per week, 07:00 tot 21:00',
    href: 'tel:+31612345678',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    waarde: '06 12 34 56 78',
    sub: 'Meestal binnen een uur antwoord',
    href: 'https://wa.me/31612345678',
  },
  {
    icon: Mail,
    label: 'Mail ons',
    waarde: 'info@lkdakwerken.nl',
    sub: 'Antwoord binnen 24 uur',
    href: 'mailto:info@lkdakwerken.nl',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        titel="Laten we"
        accent="kennismaken."
        lead="Een vraag over uw dak, een lekkage of een offerte: we denken graag mee. U krijgt altijd een vakman aan de lijn, geen callcenter."
        image={fotos.contactHeader}
        imageAlt="Skyline van Rotterdam"
        kruimels={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        compact
      />

      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Contactkanalen */}
          <div className="lg:col-span-5 space-y-4">
            {kanalen.map((c, i) => {
              const Icon = c.icon;
              const extern = c.href.startsWith('http');
              return (
                <Reveal key={c.label} delay={i * 0.07}>
                  <a
                    href={c.href}
                    {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group card card-hover flex items-center gap-4 p-5 md:p-6"
                  >
                    <span className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-ink-500">{c.label}</span>
                      <span className="block text-lg font-semibold text-ink-900 truncate">{c.waarde}</span>
                      <span className="block text-sm text-ink-500 mt-0.5">{c.sub}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="w-5 h-5 text-blue-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0"
                    />
                  </a>
                </Reveal>
              );
            })}

            <Reveal delay={0.24}>
              <div className="panel p-6 md:p-7">
                <h2 className="text-display text-xl tracking-[-0.02em] text-ink-900">
                  Liever meteen een prijs?
                </h2>
                <p className="mt-2.5 text-ink-500 leading-relaxed">
                  Vul het offerteformulier in. U hoort binnen één werkdag van ons.
                </p>
                <Link href="/offerte" className="btn-pill mt-6 w-full justify-between">
                  <span className="label">Offerte aanvragen</span>
                  <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Gestileerd kaartblok en gegevens */}
          <div className="lg:col-span-7 space-y-5">
            <Reveal delay={0.05}>
              {/* Op mobiel staat de speld boven het bijschrift in een smaller
                  vlak; 16/10 werd daar zo laag dat beide over elkaar vielen. */}
              <div className="relative rounded-3xl overflow-hidden bg-ink-900 aspect-[4/3] sm:aspect-[16/10]">
                <div className="absolute inset-0 bg-grid-dark opacity-80" aria-hidden="true" />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-800/40 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Schematische wegen en water rond het depot */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 62"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 44 C 25 36, 55 50, 100 40" fill="none" stroke="#2563eb" strokeWidth="5" opacity="0.28" />
                  <path d="M12 0 L 30 62" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.22" />
                  <path d="M0 22 L 100 16" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.22" />
                  <path d="M72 0 L 62 62" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.22" />
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                  <span className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span className="mt-3 text-white font-semibold">{bedrijf.naam}</span>
                  <span className="text-sm text-white/65">{bedrijf.straat}</span>
                </div>

                <p className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-sm text-white/75">
                  <Navigation2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                  Kantoor en materiaaldepot in {bedrijf.plaats}. Bezoek op afspraak.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="panel p-6 md:p-8 grid sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-semibold text-ink-900 mb-2.5">Adres</h2>
                  <address className="not-italic text-ink-500 leading-relaxed">
                    {bedrijf.naam}
                    <br />
                    {bedrijf.straat}
                    <br />
                    {bedrijf.postcode} {bedrijf.plaats}
                  </address>
                </div>
                <div>
                  <h2 className="font-semibold text-ink-900 mb-2.5">Openingstijden</h2>
                  <dl className="text-ink-500 space-y-1.5">
                    <div className="flex justify-between gap-4">
                      <dt>Maandag tot vrijdag</dt>
                      <dd className="text-ink-900 whitespace-nowrap tabular-nums">{bedrijf.openingstijden.maVrij}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Zaterdag</dt>
                      <dd className="text-ink-900 whitespace-nowrap tabular-nums">{bedrijf.openingstijden.za}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Zondag</dt>
                      <dd className="text-ink-900 whitespace-nowrap tabular-nums">{bedrijf.openingstijden.zo}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h2 className="font-semibold text-ink-900 mb-2.5">Bedrijfsgegevens</h2>
                  <p className="text-ink-500 leading-relaxed">
                    KvK {bedrijf.kvk}
                    <br />
                    BTW {bedrijf.btw}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-ink-900 mb-2.5">Certificering</h2>
                  <ul className="text-ink-500 space-y-1.5">
                    {certificeringen.map((c) => (
                      <li key={c.naam}>{c.naam}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
