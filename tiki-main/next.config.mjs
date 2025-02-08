/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  logging: {
    fetches: {
      failed: true,
    },
  },
};

export default nextConfig;
