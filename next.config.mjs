/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude node-pg-migrate from server-side bundling
      config.externals.push('node-pg-migrate');
    }

    return config;
  },
}

export default nextConfig
