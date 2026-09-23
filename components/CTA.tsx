import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA({ titel, tekst, buttonLabel, href }: { titel: string; tekst: string; buttonLabel: string; href: string }) {
  return (
    <section className="section-pad bg-ink-900 text-white">
      <div className="container-tight">
        <div className="max-w-3xl">
          <h2 className="text-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em]">{titel}</h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">{tekst}</p>
          <div className="mt-8">
            <Link href={href} className="btn-pill">
              <span className="label">{buttonLabel}</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
