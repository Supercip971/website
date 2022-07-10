import React from "react";

import * as fs from "fs";
import * as Blog from "./blog/index";
const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {
    const BASE_URL = "https://cyp.sh";
    const staticPaths = fs
        .readdirSync("pages")
        .filter((staticPage) => {
            return !["api", "_app.js", "404.js", "sitemap.xml.js"].includes(
                staticPage
            );
        })
        .map((staticPagePath) => {
            return `${BASE_URL}/${staticPagePath
                .replace(".js", "")
                .replace("index", "")}`;
        });

    const BlogPosts = (await Blog.getAllBlogposts()).map((post) => {
        return `${BASE_URL}/blog/${post.slug}`;
    }); // some remote API call maybe!

    const summedPaths = [...staticPaths, ...BlogPosts];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${summedPaths
          .map((url) => {
              return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}
    </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
