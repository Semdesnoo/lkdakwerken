import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-ink-950 text-white overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-blue-700/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-tight relative max-w-2xl">
        <p className="font-display text-7xl md:text-8xl font-bold text-blue-400 leading-none tracking-[-0.04em]">
          404
        </p>
        <h1 className="mt-6 text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.035em] text-balance">
          Deze pagina is van het dak gevallen.
        </h1>
        <p className="mt-5 text-lg text-white/75 leading-relaxed">
          De pagina die u zoekt bestaat niet of is verplaatst. Ga terug naar de homepage of bekijk onze diensten.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/" className="btn-pill">
            <span className="label">Terug naar home</span>
            <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
          </Link>
          <Link href="/diensten" className="btn-ghost-invert">
            Onze diensten
          </Link>
        </div>
      </div>
    </section>
  );
}
