/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add any other domains you need here
  },
  webpack: (config) => {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs
          },
          output: {
            comments: false, // Remove comments
          },
        },
      }),
    ];

    return config;
  },
};

export default nextConfig;