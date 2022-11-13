/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    pageExtensions: ["js", "jsx", ".module.css"],

    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};

module.exports = nextConfig;
