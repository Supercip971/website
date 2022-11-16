/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  })
const nextConfig = {
    reactStrictMode: true,

    pageExtensions: ["js", "jsx", ".module.css"],

    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
    
};

module.exports = withBundleAnalyzer(nextConfig);

