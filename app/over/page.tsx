import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import {
  stats,
  certificeringen,
  werkwijze,
  projecten,
  bedrijf,
  fotos,
} from '@/lib/data';
import { foto } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { GoogleReviews } from '@/components/GoogleReviews';
import { Kerncijfers } from '@/components/Kerncijfers';

export const metadata: Metadata = {
  title: 'Over LK Dakwerken - Vakmensen voor uw dak sinds 2004',
  description:
    'LK Dakwerken is een Rotterdams dakdekkersbedrijf met meer dan 20 jaar ervaring in bitumen, renovatie, nieuwbouw, onderhoud en lekkage. Werkzaam in heel Zuid-Holland.',
  alternates: { canonical: '/over' },
};

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        titel="Twintig jaar vakwerk."
        accent="Eén Rotterdams team."
        lead="LK Dakwerken is opgericht in 2004 met een eenvoudig idee: een dak is de belangrijkste bescherming van een gebouw, en dat werk verdient een vakman."
        image={fotos.overOnsHeader}
        imageAlt="Dakdekkers van LK Dakwerken op locatie"
        kruimels={[{ label: 'Home', href: '/' }, { label: 'Over ons' }]}
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Offerte aanvragen</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <a href="tel:0102713824" className="btn-ghost-invert">
          <Phone className="w-4 h-4" aria-hidden="true" />
          Bel ons
        </a>
      </PageHeader>

      {/* Kerncijfers */}
      <section className="relative -mt-12 md:-mt-16 z-10">
        <div className="container-wide">
          <Kerncijfers
            cijfers={stats}
            className="panel p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          />
        </div>
      </section>

      {/* Verhaal met foto */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-paper-100">
              <img
                src={foto(fotos.overOnsTeam, 1000, 80)}
                alt="Team van LK Dakwerken op een plat dak"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Geen franchise. Geen verkooppraat.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-700">
              <p>
                In 2004 begon Kees van der Linden samen met één compagnon vanuit een busje in Rotterdam. De afspraak was simpel: geen verkooppraat, geen verborgen kosten, gewoon goed werk leveren. Die afspraak geldt vandaag nog steeds.
              </p>
              <p>
                We zijn bewust klein gebleven. Tien dakdekkers, geen onderaannemers die u nooit ziet. Iedereen in ons team heeft minimaal tien jaar ervaring en is in dienst.
              </p>
              <p>
                We zijn lid van Dakmerk en VCA-gecertificeerd. Elk project ontvangt een garantiecertificaat. Gaat er onverhoopt toch iets mis, dan staat de stichting Dakmerk garant.
              </p>
            </div>

            <ul className="mt-9 flex flex-wrap gap-2.5">
              {certificeringen.map((c) => (
                <li key={c.naam} className="chip">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {c.naam}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Werkwijze als tijdlijn */}
      <section className="section-pad bg-ink-900 text-white">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-display text-3xl md:text-5xl leading-[1.06] tracking-[-0.03em] text-balance">
              Vier stappen.
              <br />
              <span className="text-blue-400">Geen verrassingen.</span>
            </h2>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-md">
              Zo werken wij aan elk project, of het nu om één garagedak gaat of om een complex van 32 woningen.
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-400/70 via-white/25 to-transparent"
              />
              {werkwijze.map((stap, i) => (
                <Reveal as="li" key={stap.titel} delay={i * 0.09} className="relative pl-10 pb-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-blue-500 ring-4 ring-ink-900"
                  />
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{stap.titel}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed max-w-md">{stap.tekst}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Verwijzing naar de projectenpagina */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal>
            <div className="panel p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
                  Liever zien wat we maken?
                </h2>
                <p className="mt-4 text-lg text-ink-600 leading-relaxed max-w-xl">
                  Op de projectpagina staan {projecten.length} opgeleverde daken uit de regio
                  Rotterdam, met echte foto’s van ons eigen werk en het verhaal achter elk
                  project.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <Link href="/projecten" className="btn-pill">
                  <span className="label">Bekijk onze projecten</span>
                  <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Beoordelingen: hetzelfde Google-blok als op de homepage */}
      <GoogleReviews />

      {/* Bedrijfsgegevens */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="panel p-8 md:p-12 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
                Waar u ons vindt
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Ons kantoor en materiaaldepot staan in Rotterdam. Bezoek op afspraak.
              </p>
            </div>

            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Adres</h3>
                <address className="not-italic text-ink-500 leading-relaxed">
                  {bedrijf.naam}
                  <br />
                  {bedrijf.straat}
                  <br />
                  {bedrijf.postcode} {bedrijf.plaats}
                </address>
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Contact</h3>
                <p className="text-ink-500 leading-relaxed">
                  {bedrijf.telefoon}
                  <br />
                  {bedrijf.email}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Openingstijden</h3>
                <p className="text-ink-500 leading-relaxed">
                  Maandag tot vrijdag: {bedrijf.openingstijden.maVrij}
                  <br />
                  Zaterdag: {bedrijf.openingstijden.za}
                  <br />
                  Zondag: {bedrijf.openingstijden.zo.toLowerCase()}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink-900 mb-2">Bedrijfsgegevens</h3>
                <p className="text-ink-500 leading-relaxed">
                  KvK {bedrijf.kvk}
                  <br />
                  BTW {bedrijf.btw}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Afsluitende CTA */}
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
              Klaar om uw dak aan te pakken?
            </h2>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Vraag vandaag nog een vrijblijvende offerte aan. We komen binnen drie werkdagen bij u langs.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-center gap-4">
            <Link href="/offerte" className="btn-pill">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <a href="tel:0102713824" className="btn-ghost-invert">
              <Phone className="w-4 h-4" aria-hidden="true" />
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
