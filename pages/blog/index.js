import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { BottomBar } from "../../components/common/bottom";
import { TopBar } from "../../components/common/top";

import Head from "next/head";

export default function PostList({ posts }) {
    return (
        <div className=" w-full bg-black">
            <Head>
                <title>blog</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="author" content="cyp" />
            </Head>
            <TopBar />
            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-[50vh] pt-32 p-8">
                <div className="m-auto max-w-prose w-full  ">
                    <h1 className="text-4xl font-extrabold py-8 m-auto">
                        My blog
                    </h1>
                    <h3 className="text-xl">
                        Sometimes I try to do a blog post, don't expect
                        something really good, and with a well written english.
                    </h3>
                </div>
            </div>

            <div className=" p-4 md:p-0 bg-white min-h-[100vh] w-full m-auto  ">
                {posts.map(({ slug, front }) => (
                    <Link href={"/blog/[slug]"} as={"/blog/" + slug} key={slug}>
                        <div className="m-auto border overflow-hidden flex  bg-black text-white flex-col max-w-prose mb-8 cursor-pointer">
                            <img
                                layout="responsive"
                                width={1920}
                                height={1080}
                                src={front.socialImage}
                            ></img>
                            <div className="flex md:flex-col flex-row flex-wrap">
                                <h1 className=" text-2xl p-4  bg-black text-white mr-auto  font-extrabold">
                                    {front.title}
                                </h1>
                                <h1 className="text-base  p-4 bg-black text-white ml-auto my-auto  font-light">
                                    {front.publishedOn}
                                </h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
export async function getStaticProps() {
    const files = fs.readdirSync("public/post/");
    const posts = files
        .filter((file) => file.endsWith(".mdx"))
        .map((fileName) => {
            const raw = fileName.replace(".mdx", "");
            const readFile = fs.readFileSync(
                `public/post/${fileName}`,
                "utf-8"
            );
            const { data: frontmatter } = matter(readFile);

            return {
                slug: raw,
                front: frontmatter,
            };
        });

    return {
        props: {
            posts,
        },
    };
}
/*
export async function getStaticPaths() {
    const files = fs.readdirSync("public/blog");
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(".mdx", ""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}
*/
