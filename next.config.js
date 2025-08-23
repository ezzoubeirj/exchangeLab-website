const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint checks on Vercel builds
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
};

module.exports = withNextIntl(nextConfig);
