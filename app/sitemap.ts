import type { MetadataRoute } from 'next';
import { locaties, blogPosts, diensten } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lkdakwerken.nl';

  const staticPages = ['', '/diensten', '/over', '/blog', '/locaties', '/contact', '/offerte'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  const locatiePages = locaties.map((l) => ({
    url: `${base}/locaties/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.datum),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const dienstPages = diensten.map((d) => ({
    url: `${base}/diensten/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...locatiePages, ...blogPages, ...dienstPages];
}
