/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'reservoir.tools', 'api-goerli.reservoir.tools'],
  },
}

module.exports = nextConfig
