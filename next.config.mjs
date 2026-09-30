/** @type {import('next').NextConfig} */
// Vercel serveert vanaf de root van het domein, GitHub Pages onder /lkdakwerken.
const basePath = process.env.VERCEL ? '' : '/lkdakwerken';

const opVercel = Boolean(process.env.VERCEL);

const nextConfig = {
  // GitHub Pages kan alleen statische bestanden aan; op Vercel draait ook de
  // formulier-API (app/api/aanvraag/route.vercel.ts), die alleen daar meedoet.
  ...(opVercel
    ? { pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'vercel.ts'] }
    : { output: 'export' }),
  basePath,
  env: {
    // Zodat lib/images.ts de projectfoto's onder het juiste voorvoegsel laadt.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
