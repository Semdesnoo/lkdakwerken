import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="section-pad bg-blue-500 text-white relative overflow-hidden">
      <div className="container-wide relative">
        <div className="grid md:grid-cols-12 gap-12 items-center mb-12">
          <div className="md:col-span-7">
            <h2 className="text-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em]">
              Wil jij ook een duurzaam dak?
            </h2>
            <p className="mt-6 text-lg text-white/95 max-w-xl leading-relaxed">
              Neem contact met ons per telefoon, per mail of laat je terugbellen. We komen binnen drie werkdagen bij u langs.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/lkdakwerken/contact" className="btn-pill-dark">
                <span className="label">Bel mij terug</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/lkdakwerken/offerte" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-500 transition-colors">
                Offerte aanvragen
              </Link>
            </div>
          </div>
        </div>

        {/* Contact cards - witte panels op oranje */}
        <div className="grid md:grid-cols-3 gap-4">
          <a href="tel:0102713824" className="group bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-full bg-white text-blue-500 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest text-white/80 mb-1">Bel direct</div>
              <div className="font-display text-lg font-bold truncate">010 - 271 38 24</div>
            </div>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </a>
          <a href="mailto:info@lkdakwerken.nl" className="group bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-full bg-white text-blue-500 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest text-white/80 mb-1">Mail ons</div>
              <div className="font-display text-lg font-bold truncate">info@lkdakwerken.nl</div>
            </div>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </a>
          <div className="group bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white text-blue-500 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest text-white/80 mb-1">Bezoek ons</div>
              <div className="font-display text-lg font-bold">Rotterdam Zuid</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
