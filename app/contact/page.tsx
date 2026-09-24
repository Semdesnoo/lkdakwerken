import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Plus,
  Camera,
  Clock,
} from 'lucide-react';
import { bedrijf, fotos } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { SchuineOvergang } from '@/components/SchuineOvergang';
import { ContactFormulier } from '@/components/ContactFormulier';

export const metadata: Metadata = {
  title: 'Contact LK Dakwerken | Dakdekker Rotterdam',
  description:
    'Neem contact op met LK Dakwerken in Rotterdam. Bel, WhatsApp of mail ons voor dakwerk, renovatie, onderhoud, nieuwbouw, lekkage of een vrijblijvende offerte.',
  alternates: { canonical: '/contact' },
};

// Zelfde nummer/patroon als WhatsappFloat.tsx: één env var, geen los hardcoded nummer per pagina.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '31680110879';
const whatsappHref = (tekst: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tekst)}`;

const kanalen = [
  {
    icon: Phone,
    label: 'Bel ons',
    waarde: bedrijf.mobiel,
    sub: '7 dagen per week bereikbaar, 07:00 – 21:00',
    knop: 'Bel direct',
    href: 'tel:+31680110879',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    waarde: bedrijf.mobiel,
    sub: "Stuur uw vraag of foto's van uw dak. Meestal binnen een uur antwoord.",
    knop: 'Open WhatsApp',
    href: whatsappHref('Hallo LK Dakwerken, ik heb een vraag over mijn dak.'),
    extern: true,
  },
  {
    icon: Mail,
    label: 'Mail ons',
    waarde: bedrijf.email,
    sub: 'Voor vragen, documenten en projectinformatie. Antwoord binnen 24 uur.',
    knop: 'Stuur een e-mail',
    href: `mailto:${bedrijf.email}`,
  },
];

const werkgebied = [
  'Rotterdam',
  'Schiedam',
  'Vlaardingen',
  'Barendrecht',
  'Capelle aan den IJssel',
  'Nieuwerkerk aan den IJssel',
  'Berkel en Rodenrijs',
  'Ridderkerk',
];

const faq = [
  {
    vraag: "Kan ik foto's van mijn dak sturen?",
    antwoord: "Ja. U kunt foto's eenvoudig via WhatsApp sturen of toevoegen aan een contact- of offerteaanvraag.",
  },
  {
    vraag: 'Kan ik langskomen op jullie locatie?',
    antwoord: `Ons kantoor en materiaaldepot is gevestigd aan de ${bedrijf.straat} in ${bedrijf.plaats}. Bezoek is mogelijk op afspraak.`,
  },
  {
    vraag: 'Zijn jullie in het weekend bereikbaar?',
    antwoord: 'Telefonisch zijn wij 7 dagen per week tussen 07:00 en 21:00 bereikbaar. Reguliere werkzaamheden en beschikbaarheid op locatie worden per situatie ingepland.',
  },
  {
    vraag: 'Wat is de snelste manier om een offerte te krijgen?',
    antwoord: 'Gebruik hiervoor het online offerteformulier. Daarmee ontvangen we direct de belangrijkste informatie over uw dak.',
  },
  {
    vraag: 'Ik heb lekkage. Wat moet ik doen?',
    antwoord: "Bij een actieve lekkage adviseren we om direct telefonisch contact op te nemen. U kunt foto's vervolgens via WhatsApp meesturen.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHeader
        titel="Hoe kunnen we"
        accent="u helpen?"
        lead="Heeft u een vraag over uw dak, wilt u een project bespreken of heeft u te maken met lekkage? Neem direct contact met ons op. We denken graag met u mee."
        image={fotos.contactHeader}
        imageAlt="Dakdekker van LK Dakwerken tijdens werkzaamheden"
        compact
      >
        <a href="tel:+31680110879" className="btn-pill">
          <span className="label">Bel {bedrijf.mobiel}</span>
          <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
        </a>
        <a
          href={whatsappHref('Hallo LK Dakwerken, ik heb een vraag over mijn dak.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-invert"
        >
          Stuur een WhatsApp
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </PageHeader>
      <p className="sr-only">Telefonisch bereikbaar 7 dagen per week van 07:00 tot 21:00.</p>

      {/* 2. Drie grote contactkaarten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-5">
            {kanalen.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    {...(c.extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group card card-hover flex flex-col h-full p-7 md:p-8"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center transition-colors group-hover:bg-blue-500 group-hover:text-white">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
                      {c.label}
                    </span>
                    <span className="mt-2 text-2xl md:text-3xl font-display font-bold tracking-[-0.02em] text-ink-900">
                      {c.waarde}
                    </span>
                    <span className="mt-3 text-ink-500 leading-relaxed">{c.sub}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                      {c.knop}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Lekkage-spoedblok */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Daklekkage?</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Bij actieve lekkage kunt u het beste direct bellen.
            </h2>
            <p className="mt-5 text-white/75 leading-relaxed max-w-xl">
              Bij lekkage telt snelheid. Bel ons direct en vertel kort wat er aan de hand is. Foto's van de
              situatie kunt u eventueel daarna via WhatsApp meesturen.
            </p>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xl">
              Beschikbaarheid voor uitvoering is afhankelijk van locatie, planning, weersomstandigheden en de
              situatie ter plaatse.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <a href="tel:+31680110879" className="btn-pill w-full justify-center">
              <span className="label">Bel {bedrijf.mobiel}</span>
              <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
            </a>
            <a
              href={whatsappHref("Hallo LK Dakwerken, ik heb een lekkage en wil graag foto's sturen.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-invert w-full justify-center"
            >
              <Camera className="w-4 h-4" aria-hidden="true" />
              Stuur foto's via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 5. Liever meteen een prijs? */}
      <SchuineOvergang kleur="#ffffff" hoek={1.75} />
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Prijsindicatie</span>
            <h2 className="mt-3 text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Liever meteen weten wat uw dak ongeveer kost?
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed max-w-xl">
              Met ons offerteformulier geeft u in een paar minuten door wat u nodig heeft. Selecteer de
              werkzaamheden, vul het geschatte dakoppervlak in en ontvang waar mogelijk direct een eerste
              prijsindicatie. Daarna bekijken we uw aanvraag en nemen we contact met u op.
            </p>
            <Link href="/offerte" className="btn-pill-dark mt-8">
              <span className="label">Start mijn offerte</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <p className="mt-3 text-sm text-ink-400">Vrijblijvend · Binnen enkele minuten ingevuld</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-3xl bg-ink-950 text-white p-6 sm:p-7">
              <p className="text-sm font-semibold text-blue-400">Uw prijsindicatie</p>
              <p className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-none">
                € 9.000 <span className="text-white/50 font-normal">–</span> € 13.200
              </p>
              <dl className="mt-5 pt-5 border-t border-blue-400/20 space-y-2.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                  <dt className="text-white/70">Dakwerk, 120 m²</dt>
                  <dd className="text-white font-medium">€ 75 tot € 110 per m²</dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                  <dt className="text-white/70">Isolatie meenemen</dt>
                  <dd className="text-white font-medium">+ € 28 tot € 45 per m²</dd>
                </div>
              </dl>
              <p className="mt-5 text-sm text-white/60 leading-relaxed">
                Richtprijs op basis van voorbeeldinvoer. Uw eigen indicatie berekent u in het offerteformulier.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Persoonlijk contactblok */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-8">
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Persoonlijk contact</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              U spreekt gewoon met iemand die verstand heeft van daken.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed max-w-2xl">
              Bij LK Dakwerken houden we contact graag eenvoudig. Heeft u een vraag, wilt u weten wat technisch
              mogelijk is of twijfelt u welke werkzaamheden nodig zijn? Neem gerust contact op. We luisteren
              eerst naar de situatie en bespreken vervolgens wat een logische volgende stap is.
            </p>
            <p className="mt-5 font-semibold text-ink-900">Luuk Kanters — LK Dakwerken</p>
          </Reveal>
        </div>
      </section>

      {/* 7. Contactformulier */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <Reveal className="mb-10 text-center">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Stuur ons een bericht
            </h2>
            <p className="mt-3 text-ink-500">Geen haast? Laat hieronder uw gegevens en vraag achter.</p>
          </Reveal>
          <Reveal delay={0.06}>
            <ContactFormulier />
          </Reveal>
        </div>
      </section>

      {/* 10-12. Openingstijden + bedrijfsgegevens */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Openingstijden
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            <Reveal className="md:col-span-2 panel p-7 md:p-8">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold mb-6">
                <Clock className="w-4 h-4" aria-hidden="true" />
                Kantoor / reguliere werkzaamheden
              </div>
              <dl className="grid grid-cols-3 gap-6">
                <div>
                  <dt className="text-sm text-ink-500">Ma – Vr</dt>
                  <dd className="mt-1 text-xl font-display font-bold tracking-[-0.02em] text-ink-900">{bedrijf.openingstijden.maVrij}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-500">Za</dt>
                  <dd className="mt-1 text-xl font-display font-bold tracking-[-0.02em] text-ink-900">{bedrijf.openingstijden.za}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-500">Zo</dt>
                  <dd className="mt-1 text-xl font-display font-bold tracking-[-0.02em] text-ink-900">{bedrijf.openingstijden.zo}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.06} className="rounded-3xl bg-ink-950 text-white p-7 md:p-8">
              <div className="flex items-center gap-2.5 text-blue-400 font-semibold mb-4">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Telefonisch bereikbaar
              </div>
              <p className="text-2xl font-display font-bold tracking-[-0.02em]">Dagelijks 07:00 – 21:00</p>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">Voor vragen en lekkagemeldingen.</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-5 panel-flat p-7 md:p-8">
            <h3 className="font-semibold text-ink-900 mb-4">Bedrijfsgegevens</h3>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <dt className="text-ink-400">Bedrijf</dt>
                <dd className="mt-1 text-ink-700">{bedrijf.naam}</dd>
              </div>
              <div>
                <dt className="text-ink-400">KvK</dt>
                <dd className="mt-1 text-ink-700">{bedrijf.kvk}</dd>
              </div>
              <div>
                <dt className="text-ink-400">BTW</dt>
                <dd className="mt-1 text-ink-700">{bedrijf.btw}</dd>
              </div>
              <div>
                <dt className="text-ink-400">E-mail</dt>
                <dd className="mt-1 text-ink-700">{bedrijf.email}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 13. Werkgebied */}
      <section className="section-pad bg-paper-50">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Actief in Rotterdam en omgeving
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed max-w-xl mx-auto">
              LK Dakwerken werkt vanuit Rotterdam en voert werkzaamheden uit in Rotterdam en omliggende plaatsen
              in Zuid-Holland.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {werkgebied.map((plaats) => (
                <span key={plaats} className="rounded-full bg-white border border-paper-200 px-4 py-2 text-sm text-ink-700">
                  {plaats}
                </span>
              ))}
            </div>
            <Link href="/locaties" className="btn-link justify-center mt-7">
              Bekijk onze locaties
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde contactvragen
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl mx-auto space-y-3">
            {faq.map((item) => (
              <details key={item.vraag} className="group faq-item panel-flat p-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold leading-snug text-ink-900">{item.vraag}</h3>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-4 text-ink-500 leading-relaxed">{item.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Grote eind-CTA */}
      <SchuineOvergang kleur="#000000" hoek={-1.75} />
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
              Een vraag over uw dak? We horen graag van u.
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Bel, stuur een WhatsApp of vraag direct online een offerte aan.
            </p>
            <Link href="/offerte" className="mt-6 inline-flex items-center gap-2 text-white font-semibold link-underline">
              Of vraag een offerte aan
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-center gap-4">
            <a href="tel:+31680110879" className="btn-pill">
              <span className="label">Bel {bedrijf.mobiel}</span>
              <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
            </a>
            <a
              href={whatsappHref('Hallo LK Dakwerken, ik heb een vraag over mijn dak.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-invert"
            >
              WhatsApp ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
