import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20">
      <div className="container-tight text-center">
        <div className="font-display text-9xl text-rust-500 leading-none">404</div>
        <h1 className="mt-6 text-display text-4xl md:text-5xl tracking-tight text-balance">
          Deze pagina is van het dak gevallen.
        </h1>
        <p className="mt-4 text-[var(--muted)] text-lg max-w-md mx-auto">
          De pagina die u zoekt bestaat niet of is verplaatst. Ga terug naar de homepage of bekijk onze diensten.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Link href="/" className="btn-primary">Terug naar home</Link>
          <Link href="/diensten" className="btn-secondary">Onze diensten</Link>
        </div>
      </div>
    </section>
  );
}
