const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,

  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://www.aikitbox.com/api/:path*'
        destination: 'http://localhost:8200/api/:path*'
      }
    ]
  }
};

module.exports = nextConfig;
