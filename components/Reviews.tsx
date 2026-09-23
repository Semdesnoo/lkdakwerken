import { Quote } from 'lucide-react';
import { reviews } from '@/lib/data';

export function Reviews() {
  return (
    <section className="section-pad bg-white">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-4">Reviews</div>
          <h2 className="text-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em] mb-6">
            Dit zeggen onze klanten in Google.
          </h2>

          {/* Google rating badge */}
          <div className="inline-flex items-center gap-4 panel px-6 py-4">
            <div className="text-left">
              <div className="text-2xl font-bold text-ink-900">4.9 <span className="text-blue-500">★★★★★</span></div>
              <div className="text-xs text-ink-500 font-mono uppercase tracking-widest">127 reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 6).map((r) => (
            <div key={r.naam} className="panel p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-ink-900-100 text-ink-900 flex items-center justify-center font-bold text-lg">
                  {r.naam.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="font-medium text-ink-900 text-sm">{r.naam}</div>
                  <div className="text-xs text-blue-500">{'★'.repeat(r.rating)}</div>
                </div>
              </div>
              <Quote className="w-6 h-6 text-blue-500 mb-3" />
              <p className="text-sm text-ink-700 leading-relaxed">
                {r.tekst.length > 180 ? r.tekst.substring(0, 180) + '...' : r.tekst}
              </p>
              <div className="mt-4 pt-4 border-t border-paper-200 text-xs text-ink-500 font-mono uppercase tracking-widest">
                {r.rol}
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator (CDB-stijl) */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-paper-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-paper-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-paper-200"></div>
        </div>
      </div>
    </section>
  );
}
