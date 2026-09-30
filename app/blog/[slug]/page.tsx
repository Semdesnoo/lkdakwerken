import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { foto } from '@/lib/images';

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

  const overige = blogPosts.filter((p) => p.slug !== post.slug);
  const portret = `${process.env.NEXT_PUBLIC_BASE_PATH}/over/luuk-portret.webp`;

  return (
    <>
      {/* Artikelkop */}
      <header className="relative bg-ink-950 text-white overflow-hidden">
        <img
          src={foto(post.image, 2000, 80)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/85 to-ink-950" />

        <div className="container-wide relative pt-32 pb-14 md:pt-40 md:pb-20">
          <div className="max-w-3xl">
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
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">{post.excerpt}</p>

            <div className="mt-9 flex items-center gap-3">
              <img
                src={portret}
                alt=""
                aria-hidden="true"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
              />
              <span>
                <span className="block font-semibold">{post.auteur}</span>
                <span className="block text-sm text-white/60">Eigenaar LK Dakwerken</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Artikel + zijbalk */}
      <div className="bg-white pb-16 md:pb-24">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-14">
          <article className="lg:col-span-8 min-w-0">
            <div className="-mt-10 md:-mt-14 relative z-10 aspect-[16/9] rounded-3xl overflow-hidden bg-paper-100 shadow-[0_24px_70px_-25px_rgba(0,0,0,0.35)]">
              <img src={foto(post.image, 1600, 82)} alt={post.titel} className="w-full h-full object-cover" />
            </div>

            <div className="mt-10 md:mt-14 max-w-[42rem]">
              {renderInhoud(post.inhoud)}

              {/* Auteur onder het artikel */}
              <div className="mt-14 flex items-start gap-5 rounded-3xl border border-paper-200 p-6 md:p-7">
                <img src={portret} alt="Luuk Kanters" className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                <div>
                  <p className="text-sm text-ink-400">Geschreven door</p>
                  <p className="font-semibold text-ink-900">{post.auteur}</p>
                  <p className="mt-2 text-ink-500 leading-relaxed">
                    Dakdekker en eigenaar van LK Dakwerken. Luuk staat zelf op het dak en schrijft over wat hij
                    dagelijks tegenkomt bij platte daken in Rotterdam en omgeving.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Zijbalk: andere artikelen en offerte, blijft op desktop in beeld */}
          <aside className="lg:col-span-4 lg:pt-12">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-3xl bg-paper-50 p-6">
                <h2 className="text-display text-xl tracking-[-0.02em] text-ink-900 mb-4">Andere artikelen</h2>
                <ul className="divide-y divide-paper-200">
                  {overige.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="group flex items-center gap-4 py-3.5">
                        <span className="w-20 h-16 rounded-xl overflow-hidden bg-paper-100 shrink-0">
                          <img
                            src={foto(p.image, 300, 70)}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-medium text-blue-500">{p.categorie}</span>
                          <span className="block mt-0.5 text-sm font-semibold leading-snug text-ink-900 group-hover:text-blue-500 transition-colors">
                            {p.titel}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-ink-950 text-white p-7">
                <h2 className="text-display text-2xl tracking-[-0.025em]">Hulp nodig bij uw dak?</h2>
                <p className="mt-3 text-white/75 leading-relaxed">
                  We komen vrijblijvend langs en u ontvangt een heldere offerte.
                </p>
                <Link href="/offerte" className="btn-pill mt-6">
                  <span className="label">Offerte aanvragen</span>
                  <span className="arrow"><ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
