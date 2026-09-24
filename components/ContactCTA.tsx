import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { bedrijf } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

export function ContactCTA() {
  return (
    <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
      <div className="container-wide relative">
        <Reveal className="max-w-3xl">
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.035em] text-balance">
            Klaar om uw dak aan te pakken?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
            Vraag een vrijblijvende offerte aan. We komen binnen drie werkdagen langs voor een gratis dakinspectie.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/offerte" className="btn-pill">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <a
              href="tel:0102713824"
              className="inline-flex items-center gap-3 text-white font-semibold group"
            >
              <span className="w-11 h-11 rounded-button-inner border border-white/25 flex items-center justify-center transition-colors group-hover:border-white/60 group-hover:bg-white/10">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="link-underline">{bedrijf.telefoon}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
