/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';
// import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add any other domains you need here
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

// // Export the configuration with bundle analyzer
// export default withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })(nextConfig);