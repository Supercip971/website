/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || "https://cyp.sh",
    generateRobotsTxt: true, 
};

module.exports = config;
