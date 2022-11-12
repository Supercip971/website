import fs from "fs";
import matter from "gray-matter";

import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { BottomBar } from "../../components/common/bottom";
import Image from "next/image";
import { TopBar } from "../../components/common/top";
import { MDXRemote } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";

import Head from "next/head";
import Mlink from "../../components/common/link";

function code_impl({ className, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
        <SyntaxHighlighter
            language={match[1]}
            PreTag="div"
            customStyle={{ border: "none" }}
            className="font-light text-base text-black border-none  "
            {...props}
        />
    ) : (
        <code className="font-light text-base text-black  " {...props}></code>
    );
}

const components = {
    a: (props) => (
        <Mlink {...props}>
        </Mlink>),
    img: (props) => <img {...props} />,
    h1: (props) => (
        <h1 className="btitle text-4xl font-black  text-white" {...props}></h1>
    ),
    h2: (props) => (
        <h2 className=" text-3xl font-black  text-current" {...props}></h2>
    ),
    h3: (props) => (
        <h3 className="text-2xl font-extrabold py-4 text-current" {...props}></h3>
    ),
    h4: (props) => (
        <h4 className="text-xl font-extrabold py-4 text-current" {...props}></h4>
    ),
    p: (props) => <p className=" text-base py-2 text-current" {...props}></p>,
    th: (props) => (
        <th
            className="text-base  p-2 border-black border-2"
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
    thead: (props) => <thead className=" bg-black text-white"  {...props}></thead>,
    pre: (props) => (
        <pre
            className="whitespace-pre-wrap font-light text-current m-1 border-2 border-black "
            {...props}
        ></pre>
    ),
    blockquote: (props) => (
        <blockquote
            className=" text-current italic  bg-blue-100 px-2 py-0"
            {...props}
        ></blockquote>
    ),
    code: code_impl,
    ul: (props) => (
        <ul
            className="list-disc text-base text-current list-inside"
            {...props}
        ></ul>
    ),
    li: (props) => <li className="text-base py-1 text-current" {...props}></li>,
};

export default function Post({ front, slug, mdx, source }) {
    return (
        <div className=" w-full">
            <Head>
                <title>{front.title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="author" content="cyp" />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="cyp" />
                <meta
                    property="og:image"
                    content={"/" + front.socialImage.replace(".webp", ".png")}
                />
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
            <div className="fixed w-screen h-screen bg-transparent z-[-1]">
                <Image src={"/" + front.socialImage} layout="fill" objectFit="cover" quality="90" />
            </div>
            <div className="bg-transparent  text-white flex flex-col lg:flex-row min-h-[100vh] pt-32 py-8 w-full px-8"  >
                <div className="m-auto max-w-prose w-full  bg-black   ">
                    <h1 className="text-6xl font-extrabold p-10 m-auto w-fit ">
                        {front.title}
                    </h1>
                </div>
            </div>
            <div className=" bg-white text-white flex flex-col lg:flex-row min-h-[50vh] pt-8 py-8 w-full px-8 ">
                <div className="m-auto max-w-prose w-full   ">
                    <MDXRemote {...mdx} components={components} />
                </div>

            <div className=" bg-white text-white flex flex-col lg:flex-row min-h-[50vh] pt-16 py-8 w-full px-8 z-2 " id="content">
                <main className="m-auto max-w-prose w-full text-black   " >
                    <MDXRemote {...mdx} components={components} lazy />
                </main>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8 bg-black" />
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
