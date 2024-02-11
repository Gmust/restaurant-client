/** @type {import('next').NextConfig} */
const nextConfig = {
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
