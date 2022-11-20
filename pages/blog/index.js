import * as fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { BottomBar } from "../../components/common/bottom";
import { TopBar } from "../../components/common/top";
import Image from "next/image";

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
                <meta name="description" content="My blog posts about programming, technology and other stuff" />
            </Head>
            <TopBar />
            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-[50vh] pt-32 p-8">
                <div className="m-auto max-w-prose w-full  ">
                    <h1 className="text-4xl font-black py-8 m-auto">
                        My <span className=" text-sky-500">blog</span>
                    </h1>
                    <h2 className="text-xl">
                        Sometimes I try to do a blog post, don't expect
                        something really good, and with a well written english.
                    </h2>
                </div>
            </div>

            <div className=" p-4 md:p-0 bg-white min-h-[100vh] w-full m-auto  ">
                {posts.map(({ slug, front }) => (

                    <article key={slug}>
                        <Link
                            href={"/blog/[slug]"}
                            as={"/blog/" + slug}
                            className=" m-auto border overflow-hidden flex  bg-black text-white flex-col max-w-prose mb-8 cursor-pointer"
                            passHref
                        >
                            <Image src={"/" + front.socialImage} alt="blog post picture" layout="responsive" width={1920} height={1080} />
                            <div className="flex md:flex-col flex-row flex-wrap">
                                <h1 className=" text-2xl p-4  bg-black text-white mr-auto  font-extrabold">
                                    {front.title}
                                </h1>
                                <time className="text-base  p-4 bg-black text-white ml-auto my-auto  font-light" dateTime={front.publishedOn}>
                                    {front.publishedOn}
                                </time>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}

export async function getAllBlogposts() {
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

    return posts;
}

export async function getStaticProps() {
    const posts = await getAllBlogposts();
    return {
        props: {
            posts,
        },
    };
}