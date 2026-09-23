import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export function Blog() {
  const featured = blogPosts[0];

  return (
    <section className="section-pad bg-paper-50">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-5">
            <div className="eyebrow mb-4">Blog</div>
            <h2 className="text-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em]">
              Wist je dit al?
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-lg text-ink-500 leading-relaxed">
              Praktische artikelen over dakonderhoud, materiaalkeuzes en veelgemaakte fouten.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-5">
          {/* Featured - large card */}
          <Link href={`/blog/${featured.slug}`} className="md:col-span-7 group">
            <div className="panel overflow-hidden h-full">
              <div className="aspect-[16/10] overflow-hidden rounded-t-3xl">
                <img
                  src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80&auto=format&fit=crop"
                  alt={featured.titel}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="pill-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {featured.categorie}
                  </span>
                  <span className="text-xs text-ink-400 font-mono uppercase tracking-widest">{featured.leestijd} leestijd</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-ink-900 group-hover:text-blue-500 transition-colors leading-tight">
                  {featured.titel}
                </h3>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-500">
                  Lees artikel <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Stack van 3 kleinere cards */}
          <div className="md:col-span-5 flex flex-col gap-5">
            {blogPosts.slice(1, 4).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex-1">
                <div className="panel p-5 h-full flex items-center gap-5 hover:shadow-2xl transition-shadow">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=400&q=70&auto=format&fit=crop"
                      alt={post.titel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-blue-500 font-mono uppercase tracking-widest mb-1">{post.categorie}</div>
                    <h3 className="font-bold text-ink-900 group-hover:text-blue-500 transition-colors leading-snug">
                      {post.titel}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/blog" className="btn-pill-dark">
            <span className="label">Bekijk alle artikelen</span>
            <span className="arrow"><ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
