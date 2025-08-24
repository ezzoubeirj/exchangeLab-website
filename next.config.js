// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

// 👉 Point this to your actual request.js location
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js'); 
// If your file is at the project root, use: './request.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Keep your original ESLint setting
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: '/kids',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // 👇 Good default caching:
  async headers() {
    return [
      // Versioned JS/CSS from Next are safe to cache long-term
      {
        source: '/:all*(js|css)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Keep JSON (e.g., translations) always fresh
      {
        source: '/:all*(json)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
