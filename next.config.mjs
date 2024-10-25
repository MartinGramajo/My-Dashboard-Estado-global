/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'images.unsplash.com',
      },
      {
        protocol: "https",
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: "https",
        hostname: 'raw.githubusercontent.com',  // Add your own API endpoint here
      }

    ],
  }

};

export default nextConfig;
