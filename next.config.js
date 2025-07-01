/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'ae01.alicdn.com'
    ],
  },
  env: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-DHGJR3N05E',
  },
}

module.exports = nextConfig 