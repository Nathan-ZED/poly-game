/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.rawg.io']
  },
  flags: {
    DEV_SSR: false,
  }
}

module.exports = {
  nextConfig
}
