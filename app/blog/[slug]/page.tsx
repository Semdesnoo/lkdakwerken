import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

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

function formatContent(raw: string) {
  return raw.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-display text-3xl mt-12 mb-4 tracking-tight">{line.slice(3)}</h2>;
    if (line.startsWith('- ')) return <li key={i} className="ml-6 list-disc marker:text-[var(--accent)] leading-relaxed my-1">{line.slice(2)}</li>;
    if (line.trim() === '') return null;
    return <p key={i} className="text-[var(--muted)] leading-relaxed my-4 text-lg">{line}</p>;
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="pt-28 pb-12 md:pt-32 md:pb-16 border-b border-[var(--border)]">
        <div className="container-tight max-w-3xl">
          <Link href="/lkdakwerken/blog" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] link-underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>

          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
            <span>{post.categorie}</span>
            <span>·</span>
            <span>{post.datum}</span>
            <span>·</span>
            <span>{post.leestijd}</span>
          </div>

          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-[-0.04em] text-balance">{post.titel}</h1>
          <p className="mt-6 text-xl text-[var(--muted)] leading-relaxed">{post.excerpt}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-display">{post.auteur[0]}</div>
            <div>
              <div className="font-semibold text-sm">{post.auteur}</div>
              <div className="text-xs text-[var(--muted)]">Eigenaar LK Dakwerken</div>
            </div>
          </div>
        </div>

        <div className="container-tight max-w-3xl mt-12">
          <div className="aspect-[16/9] overflow-hidden bg-[var(--card)]">
            <img src={`https://picsum.photos/seed/lk-hero-${post.slug}/1200/675`} alt={post.titel} className="w-full h-full object-cover" />
          </div>
          <div className="mt-12">{formatContent(post.inhoud)}</div>

          <div className="mt-16 p-8 bg-[var(--foreground)] text-[var(--background)]">
            <div className="text-display text-2xl md:text-3xl tracking-tight">Hulp nodig bij uw dak?</div>
            <p className="mt-3 opacity-80 leading-relaxed">Vraag een gratis dakinspectie aan.</p>
            <Link href="/lkdakwerken/offerte" className="inline-block mt-6 bg-[var(--background)] text-[var(--foreground)] font-semibold px-6 py-3 hover:opacity-85 transition-opacity">
              Offerte aanvragen
            </Link>
          </div>
        </div>
      </article>

      <section className="py-20">
        <div className="container-wide">
          <h2 className="text-display text-3xl tracking-tight mb-10">Lees ook</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="block group bg-[var(--background)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={`https://picsum.photos/seed/lk-rel-${p.slug}/400/300`} alt={p.titel} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--accent)]">{p.categorie}</div>
                  <h3 className="mt-2 text-display text-lg tracking-tight">{p.titel}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
