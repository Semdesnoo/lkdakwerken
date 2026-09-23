import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { locaties, diensten } from '@/lib/data';
import { foto } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

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

const beloften = [
  'Gratis dakinspectie op locatie',
  'Binnen 5 werkdagen een offerte',
  'Dakmerk Erkend kwaliteitskeurmerk',
  '10 jaar garantie op waterdichtheid',
  'VCA-gecertificeerde uitvoering',
];

export default async function LocatiePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locaties.find((l) => l.slug === slug);
  if (!loc) notFound();

  const nearby = locaties.filter((l) => l.regio === loc.regio && l.slug !== loc.slug).slice(0, 12);
  const overige = locaties.filter((l) => l.slug !== loc.slug).slice(0, 12);
  const buurgemeenten = nearby.length > 0 ? nearby : overige;

  return (
    <>
      <PageHeader
        titel="Dakdekker"
        accent={`${loc.naam}.`}
        lead={`LK Dakwerken is uw lokale dakdekkersbedrijf in ${loc.naam} en omgeving. Ruim 20 jaar ervaring, Dakmerk erkenning en 10 jaar garantie.`}
        image={loc.image}
        imageAlt={`Daken in ${loc.naam}`}
        kruimels={[
          { label: 'Home', href: '/' },
          { label: 'Locaties', href: '/locaties' },
          { label: loc.naam },
        ]}
        compact
      >
        <Link href="/offerte" className="btn-pill">
          <span className="label">Offerte aanvragen</span>
          <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
        </Link>
        <a href="tel:+31612345678" className="btn-ghost-invert">
          <Phone className="w-4 h-4" aria-hidden="true" />
          Bel ons
        </a>
      </PageHeader>

      {/* Verhaal met beloften */}
      <section className="section-pad bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900 text-balance">
              Waarom LK Dakwerken in {loc.naam}?
            </h2>
            <div className="mt-7 space-y-5 text-lg text-ink-700 leading-relaxed">
              <p>
                Als Dakmerk erkend dakdekkersbedrijf werken wij in {loc.naam} en de wijde regio {loc.regio}. Of het nu gaat om een plat dak op een woning, een bedrijfspand of een VvE-complex: wij leveren vakwerk met garantie.
              </p>
              <p>
                Onze specialisatie ligt bij bitumen dakbedekking voor platte en licht hellende daken. Daarnaast voeren wij renovaties uit, realiseren wij nieuwbouwdaken en bieden wij onderhoudscontracten op maat.
              </p>
              <p>
                Heeft u een lekkage? Onze spoedservice is 7 dagen per week bereikbaar en wij zijn vaak dezelfde dag ter plaatse in {loc.naam}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <div className="panel p-7">
              <h3 className="text-display text-xl tracking-[-0.02em] text-ink-900">Onze beloften</h3>
              <ul className="mt-5 space-y-3">
                {beloften.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-ink-700">
                    <Check className="w-4 h-4 text-blue-500 mt-1 shrink-0" aria-hidden="true" strokeWidth={3} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link href="/offerte" className="btn-pill mt-7 w-full justify-between">
                <span className="label">Offerte aanvragen</span>
                <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Diensten in deze gemeente */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="mb-10">
            <h2 className="text-display text-3xl md:text-4xl leading-[1.06] tracking-[-0.03em] text-ink-900">
              Diensten in {loc.naam}
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {diensten.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/diensten/${d.slug}`}
                  className="group card card-hover overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-paper-100">
                    <img
                      src={foto(d.heroImage, 600, 75)}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-ink-900 group-hover:text-blue-500 transition-colors">
                      {d.titel} in {loc.naam}
                    </h3>
                    <p className="mt-2 text-sm text-ink-500 leading-relaxed">{d.korte}</p>
                    <span className="btn-link mt-auto pt-4">
                      Meer info
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Buurgemeenten */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-display text-2xl md:text-3xl tracking-[-0.025em] text-ink-900 mb-6">
              Wij werken ook in
            </h2>
            <ul className="flex flex-wrap gap-2">
              {buurgemeenten.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/locaties/${n.slug}`}
                    className="chip hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {n.naam}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locaties" className="chip-ink">
                  Alle {locaties.length} gemeenten
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Afsluiting */}
      <section className="relative section-pad bg-ink-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
        <div className="container-tight relative text-center max-w-2xl">
          <h2 className="text-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.035em] text-balance">
            Offerte aanvragen in {loc.naam}?
          </h2>
          <p className="mt-5 text-lg text-white/75 leading-relaxed">
            Binnen 5 werkdagen een heldere offerte op maat, na een gratis dakinspectie.
          </p>
          <div className="mt-9 flex flex-wrap justify-center items-center gap-4">
            <Link href="/offerte" className="btn-pill">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
            <a href="tel:+31612345678" className="btn-ghost-invert">
              <Phone className="w-4 h-4" aria-hidden="true" />
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
