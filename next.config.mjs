/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Correctly specify the domains as an array of strings
  },
  webpack: (config) => {
    // Ensure that we are modifying the existing minimizer
    if (config.optimization && config.optimization.minimizer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Remove console logs
            },
            output: {
              comments: false, // Remove comments
            },
          },
        })
      );
    }

    return config;
  },
};

export default nextConfig; // Ensure you're exporting the configuration