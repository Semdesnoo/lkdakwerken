/** @type {import('next').NextConfig} */
const basePath = '/lkdakwerken';

const nextConfig = {
  output: 'export',
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
