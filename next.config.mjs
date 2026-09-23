/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/lkdakwerken',
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
