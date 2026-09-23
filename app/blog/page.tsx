import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog - Tips, advies en kennis over daken',
  description: 'Praktische artikelen over bitumen daken, renovatie, onderhoud, lekkage en duurzaamheid.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 border-b border-[var(--border)]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6">Blog</div>
            <h1 className="text-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] text-balance">
              Kennis over daken.
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-[var(--background)]">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--card)]">
                    <img src={`https://picsum.photos/seed/lk-blog-${post.slug}/600/450`} alt={post.titel} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--muted)]">{post.categorie} · {post.leestijd}</div>
                    <h2 className="mt-3 text-display text-xl tracking-tight group-hover:text-[var(--accent)] transition-colors">{post.titel}</h2>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm">
                      Lees <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
