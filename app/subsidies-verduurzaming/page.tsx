import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  Home as HomeIcon,
  MapPin,
  Leaf,
  Building2,
  Plus,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { fotos } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Subsidie dakisolatie & verduurzaming | LK Dakwerken',
  description:
    'Uw dak isoleren of verduurzamen? Bekijk welke landelijke en lokale subsidies mogelijk beschikbaar zijn voor dakisolatie, groene daken en VvE\u2019s.',
  alternates: { canonical: '/subsidies-verduurzaming' },
};

const subsidieFaq = [
  {
    vraag: 'Kan ik subsidie krijgen voor dakisolatie?',
    antwoord:
      'Dakisolatie kan onder bepaalde voorwaarden in aanmerking komen voor de landelijke ISDE-regeling. Welke voorwaarden gelden, hangt onder andere af van de woning, de uitgevoerde maatregel en de actuele subsidieregels. Controleer daarom altijd de actuele voorwaarden bij RVO.',
  },
  {
    vraag: 'Zijn er ook gemeentelijke subsidies voor mijn dak?',
    antwoord:
      'Dat verschilt per gemeente en regio. Via de Energiesubsidiewijzer kunt u op basis van uw postcode controleren welke lokale en landelijke regelingen beschikbaar zijn.',
  },
  {
    vraag: 'Kan ik subsidie krijgen voor een groen dak?',
    antwoord:
      'In verschillende gemeenten en regio\u2019s bestaan regelingen voor groene daken, sedumdaken en het opvangen van regenwater. Controleer dit via de Groenesubsidiewijzer.',
  },
  {
    vraag: 'Geldt subsidie ook voor een VvE?',
    antwoord:
      'Voor VvE\u2019s bestaat onder andere de SVVE-regeling voor verduurzamingsmaatregelen. Hiervoor gelden andere voorwaarden dan voor particuliere woningeigenaren. Controleer de actuele voorwaarden bij RVO voordat werkzaamheden worden gestart.',
  },
  {
    vraag: 'Vraagt LK Dakwerken de subsidie voor mij aan?',
    antwoord:
      'LK Dakwerken verzorgt de dakwerkzaamheden en kan informatie over de geplande werkzaamheden en offerte leveren. De klant blijft zelf verantwoordelijk voor het controleren en aanvragen van subsidies, tenzij wij in de toekomst expliciet een aanvullende subsidiedienst aanbieden.',
  },
  {
    vraag: 'Krijg ik gegarandeerd subsidie wanneer LK Dakwerken mijn dak isoleert?',
    antwoord:
      'Nee. Of u voor subsidie in aanmerking komt, wordt bepaald door de betreffende subsidieverstrekker en de actuele voorwaarden. Wij kunnen daarom nooit vooraf garanderen dat een aanvraag wordt goedgekeurd.',
  },
];

const stappen = [
  {
    nummer: '01',
    titel: 'Bekijk de mogelijkheden',
    tekst: 'Controleer via de officiële subsidiecheck welke subsidies en regelingen beschikbaar zijn voor uw woning.',
  },
  {
    nummer: '02',
    titel: 'Laat uw dak beoordelen',
    tekst: 'Wij bekijken de huidige staat van uw dak en bespreken welke werkzaamheden en verduurzamingsmogelijkheden passend zijn.',
    knop: true,
  },
  {
    nummer: '03',
    titel: 'Ontvang een vrijblijvende offerte',
    tekst: 'U ontvangt van LK Dakwerken een duidelijke offerte voor de werkzaamheden. Deze kunt u waar nodig gebruiken bij het controleren of aanvragen van een subsidieregeling.',
  },
];

export default function SubsidiesPage() {
  return (
    <>
      <PageHeader
        titel="Uw dak verduurzamen?"
        accent="Controleer of u recht heeft op subsidie."
        lead="Bij het isoleren of verduurzamen van uw dak kunt u mogelijk gebruikmaken van landelijke, gemeentelijke of regionale subsidies en financieringsregelingen. LK Dakwerken helpt u graag met een toekomstbestendig dak. Via onderstaande officiële websites kunt u eenvoudig controleren welke subsidiemogelijkheden bij uw woning en situatie passen."
        compact
      >
        <span className="sr-only">Duurzaam verbouwen</span>
        <a
          href="https://www.verbeterjehuis.nl/energiesubsidiewijzer"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill"
        >
          <span className="label">Controleer subsidies op postcode</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </a>
        <Link href="/offerte" className="btn-ghost-invert">
          Vraag een vrijblijvende offerte aan
        </Link>
      </PageHeader>

      {/* Welke subsidies kunnen interessant zijn */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Welke subsidies kunnen interessant zijn?
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card p-7">
              <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <HomeIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink-900">Subsidie voor dakisolatie</h3>
              <p className="mt-3 text-ink-500 leading-relaxed">
                Bent u eigenaar van een koopwoning en wilt u uw dak isoleren? Dan kunt u mogelijk gebruikmaken van de
                landelijke ISDE-regeling. Deze regeling is bedoeld voor verschillende energiebesparende maatregelen,
                waaronder woningisolatie.
              </p>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                De voorwaarden kunnen per jaar veranderen. Controleer daarom altijd de actuele voorwaarden bij de
                Rijksdienst voor Ondernemend Nederland (RVO).
              </p>
              <a
                href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link mt-5"
              >
                Bekijk de ISDE-regeling
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="mt-2 text-xs text-ink-400">Officiële website van RVO</p>
            </div>

            <div className="card p-7 border-2 border-blue-500">
              <span className="w-11 h-11 rounded-button-inner bg-blue-500 text-white flex items-center justify-center">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink-900">Welke subsidie geldt in mijn gemeente?</h3>
              <p className="mt-3 text-ink-500 leading-relaxed">
                Naast landelijke regelingen hebben gemeenten, provincies en andere organisaties soms aanvullende
                subsidies of leningen voor het verduurzamen van woningen.
              </p>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                Met de Energiesubsidiewijzer kunt u op basis van uw postcode en woonsituatie controleren welke
                regelingen in uw omgeving beschikbaar zijn.
              </p>
              <a
                href="https://www.verbeterjehuis.nl/energiesubsidiewijzer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link mt-5"
              >
                Doe de subsidiecheck
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="mt-2 text-xs text-ink-400">Vul uw postcode in en bekijk de mogelijkheden voor uw woning.</p>
            </div>

            <div className="card p-7">
              <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Leaf className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink-900">Subsidie voor een groen dak</h3>
              <p className="mt-3 text-ink-500 leading-relaxed">
                Voor groene daken, sedumdaken, regenwateropvang en andere maatregelen om een woning of perceel te
                vergroenen zijn er in sommige gemeenten en regio&apos;s aparte subsidies beschikbaar.
              </p>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                Via de Groenesubsidiewijzer kunt u met uw postcode controleren welke regelingen bij u beschikbaar zijn.
              </p>
              <a
                href="https://groenesubsidiewijzer.verbeterjehuis.nl/groenesubsidiewijzer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link mt-5"
              >
                Controleer groene subsidies
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="card p-7">
              <span className="w-11 h-11 rounded-button-inner bg-blue-50 text-blue-500 flex items-center justify-center">
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink-900">Verduurzamen met een VvE</h3>
              <p className="mt-3 text-ink-500 leading-relaxed">
                Wilt u als Vereniging van Eigenaars het dak van een appartementencomplex isoleren of het gebouw verder
                verduurzamen? Dan kan de Subsidieregeling Verduurzaming voor Verenigingen van Eigenaars (SVVE)
                interessant zijn.
              </p>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                Let op: bij deze regeling moet voor verduurzamingsmaatregelen de subsidie in beginsel worden
                aangevraagd voordat de werkzaamheden worden uitgevoerd.
              </p>
              <a
                href="https://www.rvo.nl/subsidies-financiering/svve/verduurzamingsmaatregelen"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link mt-5"
              >
                Bekijk subsidies voor VvE&apos;s
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="mt-2 text-xs text-ink-400">Controleer de voorwaarden vóórdat de werkzaamheden starten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* In 3 stappen */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="text-center mb-14">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              In 3 stappen naar een duurzamer dak
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {stappen.map((stap) => (
              <Reveal key={stap.nummer}>
                <span className="text-sm font-semibold text-blue-500 tabular-nums">{stap.nummer}</span>
                <h3 className="mt-3 text-xl font-semibold text-ink-900">{stap.titel}</h3>
                <p className="mt-2.5 text-ink-500 leading-relaxed">{stap.tekst}</p>
                {stap.knop && (
                  <Link href="/contact" className="btn-link mt-4 text-sm">
                    Plan een dakinspectie
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dakisolatie uitgelicht */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="text-sm font-semibold text-blue-500 tracking-wide uppercase">Energie besparen</span>
            <h2 className="mt-3 text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Een nieuw dak is hét moment om ook naar isolatie te kijken.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Wanneer een dak wordt gerenoveerd of vernieuwd, is dat een logisch moment om direct te kijken naar de
              isolatie van het dak.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Goede dakisolatie kan warmteverlies beperken en het wooncomfort verbeteren. Bovendien kan dakisolatie
              onder bepaalde voorwaarden in aanmerking komen voor landelijke subsidie.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Door dakwerk en verduurzaming op het juiste moment te combineren, voorkomt u dat onderdelen van het dak
              later opnieuw moeten worden aangepakt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/offerte" className="btn-pill">
                <span className="label">Vraag advies over dakisolatie</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <a
                href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link text-sm"
              >
                Bekijk ISDE-subsidie
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={`https://images.unsplash.com/${fotos.werkwijze}?w=1000&q=80&auto=format&fit=crop`}
              alt="Geïsoleerd plat dak in aanbouw"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Subsidiecheck CTA */}
      <section className="section-pad bg-ink-950 text-white">
        <div className="container-tight text-center">
          <Reveal>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance max-w-2xl mx-auto">
              Benieuwd welke subsidies er voor uw woning beschikbaar zijn?
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
              Doe de onafhankelijke subsidiecheck van Verbeterjehuis en bekijk landelijke én lokale regelingen op
              basis van uw postcode en woonsituatie.
            </p>
            <a
              href="https://www.verbeterjehuis.nl/energiesubsidiewijzer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill mt-8 inline-flex"
            >
              <span className="label">Controleer mijn postcode</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </a>
            <p className="mt-4 text-xs text-white/40">U wordt doorgestuurd naar Verbeterjehuis.nl.</p>
          </Reveal>
        </div>
      </section>

      {/* Terug naar LK Dakwerken */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="panel p-10 md:p-14 text-center max-w-3xl mx-auto">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.03em] text-ink-900 text-balance">
              Weet u welke verduurzaming u wilt uitvoeren? Wij helpen met het dak.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Of het nu gaat om dakisolatie, renovatie, onderhoud of het vernieuwen van uw dak: LK Dakwerken bekijkt
              graag wat technisch mogelijk is en maakt een duidelijke offerte voor de werkzaamheden.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/offerte" className="btn-pill">
                <span className="label">Vraag gratis een offerte aan</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
              <a href="tel:+31680110879" className="btn-pill-dark">
                <span className="label">Neem contact met ons op</span>
                <span className="arrow"><Phone className="w-4 h-4" aria-hidden="true" /></span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container-tight">
          <Reveal className="text-center">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance max-w-2xl mx-auto">
              Veelgestelde vragen
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl mx-auto space-y-3">
            {subsidieFaq.map((item) => (
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

          <p className="mt-14 max-w-3xl mx-auto text-center text-xs text-ink-400 leading-relaxed">
            Subsidies en regelingen kunnen wijzigen. LK Dakwerken probeert bezoekers zo goed mogelijk door te
            verwijzen naar betrouwbare informatie, maar kan geen subsidiebedragen, voorwaarden of goedkeuring
            garanderen. Controleer vóór het aangaan van werkzaamheden altijd de actuele voorwaarden bij de
            betreffende subsidieverstrekker.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: subsidieFaq.map((item) => ({
              '@type': 'Question',
              name: item.vraag,
              acceptedAnswer: { '@type': 'Answer', text: item.antwoord },
            })),
          }),
        }}
      />
    </>
  );
}
