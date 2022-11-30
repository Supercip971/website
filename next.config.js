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
    
  async redirects() {
    // a fix because google don't want to remove the .html link, even when I reset through google search console
    return [
      {
        source: '/blog/syscallsysret.html',
        destination: '/blog/syscallsysret',
        permanent: true,
      },
    ]
  },
};

module.exports = withBundleAnalyzer(nextConfig);

