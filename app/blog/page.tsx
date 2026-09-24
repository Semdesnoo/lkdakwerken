import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts, fotos } from '@/lib/data';
import { foto } from '@/lib/images';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Blog - Tips, advies en kennis over daken',
  description: 'Praktische artikelen over bitumen daken, renovatie, onderhoud, lekkage en duurzaamheid.',
  alternates: { canonical: '/blog' },
};

const datumOpmaak = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function BlogIndexPage() {
  const [uitgelicht, ...overige] = blogPosts;

  return (
    <>
      <PageHeader
        titel="Kennis over daken."
        lead="Praktische artikelen over materiaalkeuzes, onderhoud en de fouten die we in de praktijk het vaakst tegenkomen."
        image={fotos.blogHeader}
        imageAlt="Dak met lichtkoepel"
        compact
      />

      {/* Uitgelicht artikel */}
      <section className="section-pad bg-white pb-0 md:pb-0">
        <div className="container-wide">
          <Reveal>
            <Link
              href={`/blog/${uitgelicht.slug}`}
              className="group card card-hover overflow-hidden grid md:grid-cols-2"
            >
              <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-paper-100">
                <img
                  src={foto(uitgelicht.image, 1200, 80)}
                  alt={uitgelicht.titel}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-7 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-ink-500">
                  <span className="font-medium text-blue-500">{uitgelicht.categorie}</span>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-ink-300" />
                  <span>{uitgelicht.leestijd} leestijd</span>
                </div>
                <h2 className="mt-4 text-display text-2xl md:text-4xl leading-[1.1] tracking-[-0.03em] text-ink-900 group-hover:text-blue-500 transition-colors text-balance">
                  {uitgelicht.titel}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{uitgelicht.excerpt}</p>
                <span className="btn-link mt-7">
                  Lees artikel
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Overige artikelen */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {overige.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.07}>
                <article className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group card card-hover overflow-hidden h-full flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-paper-100">
                      <img
                        src={foto(post.image, 700, 75)}
                        alt={post.titel}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm text-ink-500">
                        <span className="font-medium text-blue-500">{post.categorie}</span>
                        <span aria-hidden="true" className="w-1 h-1 rounded-full bg-ink-300" />
                        <time dateTime={post.datum}>{datumOpmaak.format(new Date(post.datum))}</time>
                      </div>
                      <h2 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.015em] text-ink-900 group-hover:text-blue-500 transition-colors">
                        {post.titel}
                      </h2>
                      <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
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
