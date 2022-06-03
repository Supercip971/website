import fs from "fs";
import matter from "gray-matter";

import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { BottomBar } from "../../components/common/bottom";
import { TopBar } from "../../components/common/top";
import { MDXRemote } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";

import Head from "next/head";

function code_impl({ className, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
        <SyntaxHighlighter
            language={match[1]}
            PreTag="div"
            className="font-light text-base text-black  "
            {...props}
        />
    ) : (
        <code className="font-light text-base text-black  " {...props}></code>
    );
}
const components = {
    img: (props) => <img {...props} />,
    h1: (props) => (
        <h1 className="text-4xl font-extrabold py-4 text-black" {...props}></h1>
    ),
    h2: (props) => (
        <h2 className="text-3xl font-extrabold py-4 text-black" {...props}></h2>
    ),
    h3: (props) => (
        <h3 className="text-2xl font-extrabold py-4 text-black" {...props}></h3>
    ),
    h4: (props) => (
        <h4 className="text-xl font-extrabold py-4 text-black" {...props}></h4>
    ),
    p: (props) => <p className=" text-base py-2 text-black" {...props}></p>,
    th: (props) => (
        <th
            className="text-base text-black p-2 border-black border-2"
            {...props}
        ></th>
    ),
    td: (props) => (
        <td
            className="text-base text-black p-2 border-black border-2"
            {...props}
        ></td>
    ),
    table: (props) => (
        <table
            className="w-max border-black border-2 m-auto p-4"
            {...props}
        ></table>
    ),
    thead: (props) => <thead className=" bg-slate-200 " {...props}></thead>,
    pre: (props) => (
        <pre
            className="whitespace-pre-wrap font-light text-black bg-slate-200 p-2"
            {...props}
        ></pre>
    ),
    blockquote: (props) => (
        <blockquote
            className=" text-black italic bg-slate-200 px-2 py-0"
            {...props}
        ></blockquote>
    ),
    code: code_impl,
    ul: (props) => (
        <ul
            className="list-disc text-base text-black list-inside"
            {...props}
        ></ul>
    ),
    li: (props) => <li className="text-base py-1 text-black" {...props}></li>,
};
export default function Post({ front, slug, mdx, source }) {
    return (
        <div className=" w-full bg-black">
            <Head>
                <title>{front.title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="author" content="cyp" />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="cyp" />
                <meta property="og:image" content={front.socialImage} />
                <meta property="og:description" content={front.description} />
                <meta property="og:title" content={front.title} />
                <meta
                    name="keywords"
                    content={
                        slug + ", " + front.title + ", blog, cyp, supercyp"
                    }
                />

                <meta name="description" content={front.description} />
            </Head>
            <TopBar />
            <div
                className=" bg-white text-white flex flex-col lg:flex-row min-h-[100vh] pt-32 py-8 w-full px-8 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: "url('/" + front.socialImage + "')",
                }}
            >
                <div className="m-auto max-w-prose w-full  bg-black ">
                    <h1 className="text-6xl font-extrabold py-10 m-auto w-fit">
                        {front.title}
                    </h1>
                </div>
            </div>
            <div className=" bg-white text-white flex flex-col lg:flex-row min-h-[50vh] pt-8 py-8 w-full px-8">
                <div className="m-auto max-w-prose w-full  ">
                    <MDXRemote {...mdx} components={components} />
                </div>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
export function getStaticPaths() {
    const files = fs.readdirSync("public/post/");
    const paths = files
        .filter((file) => file.endsWith(".mdx"))
        .map((filename) => ({
            params: {
                slug: filename.replace(".mdx", ".html"),
            },
        }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const markdownWithMeta = fs.readFileSync(
        path.join("public/post/", params.slug.replace(".html", "") + ".mdx"),
        "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownWithMeta);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
        },
    });
    const slug = params.slug;
    return {
        props: {
            front: frontMatter,
            slug: slug,
            mdx: mdxSource,
            source: content,
        },
    };
}
