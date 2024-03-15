/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'restaurant-api-ksq3.onrender.com',
      },
    ],
  },
};

export default nextConfig;
