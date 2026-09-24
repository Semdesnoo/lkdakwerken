import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { foto } from '@/lib/images';
import { Reveal } from '@/components/Reveal';

export function Blog() {
  const posts = blogPosts.slice(0, 4);

  return (
    <section className="section-pad -mt-16 md:-mt-24 pt-28 md:pt-40 bg-paper-50 zigzag overflow-hidden">
      <div className="container-wide">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance">
              Kennis over daken, zonder verkooppraat.
            </h2>
            <p className="lead mt-5 max-w-lg">
              Praktische artikelen over dakonderhoud, materiaalkeuzes en veelgemaakte fouten.
            </p>
          </div>
          <Link href="/blog" className="btn-link shrink-0 md:pb-2">
            Alle artikelen
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 4) * 0.07}>
              <article className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group card card-hover overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-paper-100">
                    <img
                      src={foto(post.image, 700, 75)}
                      alt={post.titel}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-ink-500">
                      <span className="font-medium text-blue-500">{post.categorie}</span>
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-ink-300" />
                      <span>{post.leestijd}</span>
                    </div>
                    <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-[-0.015em] leading-snug text-ink-900 group-hover:text-blue-500 transition-colors">
                      {post.titel}
                    </h3>
                    <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
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
  );
}
