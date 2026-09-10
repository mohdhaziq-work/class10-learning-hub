/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true }, // build tez + clean; lint alag se `npm run lint`
  webpack: (config) => {
    // pdfjs-dist ke optional node-only deps ko browser build me ignore karo
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Site-Name', value: 'Class 10 Learning Hub' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
