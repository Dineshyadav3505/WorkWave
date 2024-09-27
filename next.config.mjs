/** @type {import('next').NextConfig} */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add any other domains you need here
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: true,
            mangle: true,
            output: {
              comments: false, // Remove comments
            },
          },
        }),
      ];
    }
    return config;
  },
};

export default nextConfig;