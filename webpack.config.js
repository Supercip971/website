/** @type {import('next').NextConfig} */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports =  {
    plugins: [
        new BundleAnalyzerPlugin()
      ],
    
};
