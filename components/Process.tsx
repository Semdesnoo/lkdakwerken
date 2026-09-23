import { werkwijze } from '@/lib/data';

export function Process() {
  return (
    <section className="section-pad bg-paper-50">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-4">Werkwijze</div>
          <h2 className="text-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
            Vier stappen. Geen verrassingen.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {werkwijze.map((stap, i) => (
            <div key={stap.nummer} className="panel p-6 md:p-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white font-mono text-sm font-bold mb-6">
                <span>{stap.nummer}</span>
                <span className="w-1 h-1 rounded-full bg-white/50"></span>
                <span>0{i + 1}/04</span>
              </div>
              <h3 className="text-xl font-bold text-ink-900 mb-3">{stap.titel}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{stap.tekst}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
