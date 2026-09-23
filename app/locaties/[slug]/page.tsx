import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locaties, diensten } from '@/lib/data';
import { ArrowRight, Phone } from 'lucide-react';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locaties.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = locaties.find((l) => l.slug === slug);
  if (!loc) return {};
  const title = `Dakdekker ${loc.naam} - LK Dakwerken`;
  const description = `LK Dakwerken is uw dakdekker in ${loc.naam} en omgeving. Dakmerk erkend.`;
  return {
    title,
    description,
    alternates: { canonical: `/locaties/${loc.slug}` },
    openGraph: { title, description, type: 'website' },
  };
}

export default async function LocatiePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locaties.find((l) => l.slug === slug);
  if (!loc) notFound();
  const nearby = locaties.filter((l) => l.slug !== loc.slug).slice(0, 12);

  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-6">Regio {loc.regio}</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] text-balance">
                Dakdekker
                <br />
                <span className="text-[var(--accent)]">{loc.naam}.</span>
              </h1>
              <p className="mt-8 text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
                LK Dakwerken is uw lokale dakdekkersbedrijf in {loc.naam} en omgeving. 25 jaar ervaring, Dakmerk erkenning en 10 jaar garantie.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/lkdakwerken/offerte" className="btn-primary group">
                  Offerte {loc.naam}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="tel:+31612345678" className="btn-secondary">
                  <Phone className="w-4 h-4" />
                  <span className="font-mono">06 12 34 56 78</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border border-[var(--border)] p-6">
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-3">Onze beloften</div>
                <ul className="space-y-2 text-sm">
                  {['Gratis dakinspectie', 'Binnen 5 werkdagen offerte', 'Dakmerk Erkend', '10 jaar garantie', 'VCA-gecertificeerd'].map((p) => (
                    <li key={p} className="flex items-start gap-2">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <h2 className="text-display text-3xl md:text-4xl tracking-tight mb-10">Diensten in {loc.naam}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--border)] border border-[var(--border)]">
            {diensten.map((d) => (
              <Link key={d.slug} href={`/diensten#${d.slug}`} className="bg-[var(--background)] p-6 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors block">
                <div className="text-display text-lg tracking-tight">{d.titel}</div>
                <div className="text-xs opacity-60 mt-2">{d.korte}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 border-b border-[var(--border)]">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-display text-3xl md:text-4xl tracking-tight mb-6">
              Waarom LK Dakwerken in {loc.naam}?
            </h2>
            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>Als Dakmerk erkend dakdekkersbedrijf werken wij in {loc.naam} en de wijde regio. Of het nu gaat om een plat dak op een woning, een bedrijfspand of een VVE-complex: wij leveren altijd vakwerk met garantie.</p>
              <p>Onze specialisatie ligt bij bitumen dakbedekking voor platte en licht hellende daken. Daarnaast voeren wij renovaties uit, realiseren wij nieuwbouwdaken en bieden wij onderhoudscontracten op maat.</p>
              <p>Heeft u een lekkage? Onze spoedservice is 7 dagen per week bereikbaar en wij zijn vaak dezelfde dag ter plaatse in {loc.naam}.</p>
            </div>
          </div>
          <div className="aspect-[4/3] bg-[var(--foreground)] overflow-hidden">
            <img src={`https://picsum.photos/seed/lk-loc-${loc.slug}/800/600`} alt={`Dakwerk in ${loc.naam}`} className="w-full h-full object-cover opacity-90" />
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-wide">
          <h2 className="text-display text-2xl md:text-3xl tracking-tight mb-8">Wij werken ook in</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--border)] border border-[var(--border)]">
            {nearby.map((n) => (
              <Link key={n.slug} href={`/locaties/${n.slug}`} className="bg-[var(--background)] px-4 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors text-sm">
                {n.naam}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--foreground)] text-[var(--background)]">
        <div className="container-tight text-center max-w-2xl">
          <h2 className="text-display text-4xl md:text-5xl tracking-[-0.04em] text-balance">
            Offerte aanvragen in {loc.naam}?
          </h2>
          <p className="mt-6 opacity-80">Binnen 5 werkdagen een heldere offerte op maat.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/lkdakwerken/offerte" className="inline-flex items-center gap-2 bg-[var(--background)] text-[var(--foreground)] font-semibold px-6 py-3.5 hover:opacity-85 transition-opacity">
              Offerte aanvragen
            </Link>
            <a href="tel:+31612345678" className="inline-flex items-center gap-2 border border-[var(--background)]/30 px-6 py-3.5 font-semibold hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors">
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
