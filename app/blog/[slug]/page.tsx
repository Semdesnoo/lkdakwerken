import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { foto } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.titel,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.titel, description: post.excerpt, type: 'article' },
  };
}

const datumOpmaak = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Zet de platte tekst uit lib/data.ts om in leesbare opmaak. */
function renderInhoud(raw: string) {
  const blokken: React.ReactNode[] = [];
  let lijst: string[] = [];

  const spoelLijst = (sleutel: number) => {
    if (lijst.length === 0) return;
    blokken.push(
      <ul key={`ul-${sleutel}`} className="my-6 space-y-2.5">
        {lijst.map((item) => (
          <li key={item} className="flex items-start gap-3 text-ink-700 leading-relaxed">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
    lijst = [];
  };

  raw.split('\n').forEach((regel, i) => {
    const tekst = regel.trim();
    if (tekst === '') {
      spoelLijst(i);
      return;
    }
    if (tekst.startsWith('## ')) {
      spoelLijst(i);
      blokken.push(
        <h2 key={i} className="text-display text-2xl md:text-3xl tracking-[-0.025em] text-ink-900 mt-12 mb-4">
          {tekst.slice(3)}
        </h2>
      );
      return;
    }
    if (tekst.startsWith('- ')) {
      lijst.push(tekst.slice(2));
      return;
    }
    spoelLijst(i);
    blokken.push(
      <p key={i} className="text-lg text-ink-700 leading-[1.75] my-5">
        {renderVet(tekst)}
      </p>
    );
  });

  spoelLijst(9999);
  return blokken;
}

/** Ondersteunt **vet** binnen een alinea. */
function renderVet(tekst: string) {
  return tekst.split(/(\*\*[^*]+\*\*)/g).map((deel, i) =>
    deel.startsWith('**') && deel.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink-900">
        {deel.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{deel}</span>
    )
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Artikelkop */}
      <header className="relative bg-ink-900 text-white overflow-hidden">
        <img
          src={foto(post.image, 2000, 80)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/80 to-ink-950" />

        <div className="container-tight relative pt-32 pb-16 md:pt-40 md:pb-20 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Alle artikelen
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 text-sm text-white/70 mb-5">
            <span className="font-medium text-blue-400">{post.categorie}</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/40" />
            <time dateTime={post.datum}>{datumOpmaak.format(new Date(post.datum))}</time>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/40" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.leestijd} leestijd
            </span>
          </div>

          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-balance">
            {post.titel}
          </h1>
          <p className="mt-6 text-xl text-white/80 leading-relaxed">{post.excerpt}</p>

          <div className="mt-9 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-display font-bold"
            >
              {post.auteur[0]}
            </span>
            <span>
              <span className="block font-semibold">{post.auteur}</span>
              <span className="block text-sm text-white/60">Eigenaar LK Dakwerken</span>
            </span>
          </div>
        </div>
      </header>

      {/* Artikelfoto */}
      <div className="bg-white">
        <div className="container-tight max-w-4xl -mt-10 md:-mt-14 relative z-10">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-paper-100 shadow-[0_24px_70px_-25px_rgba(0,0,0,0.35)]">
            <img src={foto(post.image, 1600, 82)} alt={post.titel} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Artikeltekst */}
      <article className="bg-white pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="container-prose">
          {renderInhoud(post.inhoud)}

          <aside className="mt-14 rounded-3xl bg-ink-900 text-white p-7 md:p-9">
            <h2 className="text-display text-2xl md:text-3xl tracking-[-0.025em]">Hulp nodig bij uw dak?</h2>
            <p className="mt-3 text-white/75 leading-relaxed">
              We komen vrijblijvend langs voor een gratis dakinspectie en een heldere offerte.
            </p>
            <Link href="/offerte" className="btn-pill mt-7">
              <span className="label">Offerte aanvragen</span>
              <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
            </Link>
          </aside>
        </div>
      </article>

      {/* Gerelateerde artikelen */}
      <section className="section-pad bg-paper-50">
        <div className="container-wide">
          <Reveal className="mb-10">
            <h2 className="text-display text-3xl md:text-4xl tracking-[-0.03em] text-ink-900">Lees ook</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <article className="h-full">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group card card-hover overflow-hidden h-full flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-paper-100">
                      <img
                        src={foto(p.image, 700, 75)}
                        alt={p.titel}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-sm font-medium text-blue-500">{p.categorie}</span>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink-900 group-hover:text-blue-500 transition-colors">
                        {p.titel}
                      </h3>
                      <span className="btn-link mt-auto pt-5">
                        Lees artikel
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
