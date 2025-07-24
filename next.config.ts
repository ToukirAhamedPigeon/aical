// import withPWA from 'next-pwa'

// const nextConfig = {
//   reactStrictMode: true,
//   // Add other options like images, experimental, etc.
// }

// export default withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
// })(nextConfig)


import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig;
