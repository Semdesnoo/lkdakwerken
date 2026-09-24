import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { bedrijf, diensten } from '@/lib/data';

// Zelfde groepering als het hoofdmenu (Navigation.tsx): Diensten en het
// "Over ons"-dropdownblok (Ons verhaal + Projecten) blijven bij elkaar,
// zodat de footer aanvoelt als een uitgeklapte versie van het menu i.p.v.
// een losse platte lijst.
const bedrijfsLinks = [
  { label: 'Over ons', href: '/over' },
  { label: 'Projecten', href: '/projecten' },
  { label: 'Blog', href: '/blog' },
];

const overigeLinks = [
  { label: 'Home', href: '/' },
  { label: 'Subsidies', href: '/subsidies-verduurzaming' },
  { label: 'Locaties', href: '/locaties' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Merk en NAP */}
          <div className="md:col-span-3">
            <img
              src="/lkdakwerken/logo-wit.png"
              alt="LK Dakwerken"
              className="h-10 w-auto mb-6"
            />
            <p className="text-white/70 leading-relaxed max-w-sm">
              Dakdekkersbedrijf uit Rotterdam, gespecialiseerd in bitumen, renovatie, nieuwbouw, onderhoud en lekkage. Werkzaam in heel Zuid-Holland.
            </p>

            <address className="mt-7 not-italic space-y-3 text-[15px]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" aria-hidden="true" />
                <span className="text-white/80">
                  <span className="block font-semibold text-white">{bedrijf.naam}</span>
                  {bedrijf.straat}
                  <br />
                  {bedrijf.postcode} {bedrijf.plaats}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${bedrijf.telefoon.replace(/\s|-/g, '')}`}
                  className="text-white/80 hover:text-white link-underline"
                >
                  {bedrijf.telefoon}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a href={`mailto:${bedrijf.email}`} className="text-white/80 hover:text-white link-underline">
                  {bedrijf.email}
                </a>
              </div>
            </address>
          </div>

          {/* Diensten: zelfde 5 items en volgorde als de "Diensten"-dropdown in het hoofdmenu */}
          <nav aria-labelledby="footer-diensten" className="md:col-span-3">
            <h2 id="footer-diensten" className="text-base font-semibold text-white mb-5">
              Diensten
            </h2>
            <ul className="space-y-3">
              {diensten.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/diensten/${d.slug}`}
                    className="text-white/70 hover:text-white link-underline"
                  >
                    {d.titel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bedrijf: zelfde groepering als de "Over ons"-dropdown in het hoofdmenu (Ons verhaal + Projecten) */}
          <nav aria-labelledby="footer-bedrijf" className="md:col-span-2">
            <h2 id="footer-bedrijf" className="text-base font-semibold text-white mb-5">
              Bedrijf
            </h2>
            <ul className="space-y-3">
              {bedrijfsLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Overig: pagina's die niet in de bovenstaande twee groepen thuishoren */}
          <nav aria-labelledby="footer-overig" className="md:col-span-2">
            <h2 id="footer-overig" className="text-base font-semibold text-white mb-5">
              Overig
            </h2>
            <ul className="space-y-3">
              {overigeLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Openingstijden en CTA */}
          <div className="md:col-span-2">
            <h2 className="text-base font-semibold text-white mb-5">Openingstijden</h2>
            <dl className="space-y-2 text-[15px] text-white/70">
              <div className="flex justify-between gap-4">
                <dt>Maandag tot vrijdag</dt>
                <dd className="text-white/90 whitespace-nowrap tabular-nums">{bedrijf.openingstijden.maVrij}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Zaterdag</dt>
                <dd className="text-white/90 whitespace-nowrap tabular-nums">{bedrijf.openingstijden.za}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Zondag</dt>
                <dd className="text-white/90 whitespace-nowrap tabular-nums">{bedrijf.openingstijden.zo}</dd>
              </div>
            </dl>

            <Link href="/offerte" className="btn-pill-white mt-7">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} {bedrijf.naam}. KvK {bedrijf.kvk}, BTW {bedrijf.btw}.
          </p>
          <p>10 jaar garantie op waterdichtheid.</p>
        </div>
      </div>
    </footer>
  );
}
