import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA({ titel, tekst, buttonLabel, href }: { titel: string; tekst: string; buttonLabel: string; href: string }) {
  return (
    <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
      <div className="container-tight relative">
        <div className="max-w-3xl">
          <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.035em] text-balance">
            {titel}
          </h2>
          <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-xl">{tekst}</p>
          <div className="mt-9">
            <Link href={href} className="btn-pill">
              <span className="label">{buttonLabel}</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
