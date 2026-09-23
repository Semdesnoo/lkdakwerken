import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { bedrijf } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative bg-paper-50 py-16">
      <div className="container-wide">
        {/* Main panel met kaarten */}
        <div className="bg-ink-900 text-white rounded-3xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-12 gap-8 mb-10">
            <div className="md:col-span-4">
              <img src="/lkdakwerken/logo.svg" alt="LK Dakwerken" className="h-12 w-auto mb-6 brightness-0 invert" />
              <p className="text-white/70 leading-relaxed max-w-sm">
                LK Dakwerken is een Rotterdams dakdekkersbedrijf gespecialiseerd in bitumen, renovatie, nieuwbouw, onderhoud en lekkage. Werkzaam in heel Zuid-Holland.
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-6">Navigatie</div>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Diensten', href: '/diensten' },
                  { label: 'Over ons', href: '/over' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Locaties', href: '/locaties' },
                  { label: 'Contact', href: '/contact' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 hover:text-blue-500 link-underline">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-6">Diensten</div>
              <ul className="space-y-3">
                {[
                  { label: 'Bitumen', href: '/diensten/bitumen-daken' },
                  { label: 'Renovatie', href: '/diensten/renovatie' },
                  { label: 'Nieuwbouw', href: '/diensten/nieuwbouw' },
                  { label: 'Onderhoud', href: '/diensten/onderhoud' },
                  { label: 'Lekkage', href: '/diensten/lekkage' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 hover:text-blue-500 link-underline">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-6">Contact</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{bedrijf.adres}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <a href={`tel:${bedrijf.telefoon.replace(/\s|-/g, '')}`} className="text-white/80 hover:text-blue-500 link-underline">
                    {bedrijf.telefoon}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${bedrijf.email}`} className="text-white/80 hover:text-blue-500 link-underline">
                    {bedrijf.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/50">
            <div>
              &copy; {new Date().getFullYear()} {bedrijf.naam} · KvK {bedrijf.kvk} · BTW {bedrijf.btw}
            </div>
            <div className="flex items-center gap-2 font-mono uppercase tracking-widest">
              Dakmerk Erkend · VCA** · 10 jaar garantie
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
