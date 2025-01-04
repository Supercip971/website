import fs from "fs";
import matter from "gray-matter";

import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { BottomBar } from "../../components/common/bottom";
import Image from "next/image";
import rehypeMathjax from 'rehype-mathjax'
import { TopBar } from "../../components/common/top";
import { MDXRemote } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import Head from "next/head";
import Mlink from "../../components/common/link";
import { useEffect, useRef, useState } from "react";
import CPart from "../../components/common/comment";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";

import rehypeKatex from "rehype-katex";

function code_impl({ className, ...props })
{
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


// transform the children to text, and add an id as a text
function TitlePart({children, className, ...props})
{


    let [text, setText] = useState("");

    useEffect(() => {
        // extract children as text
//        console.log(children);

        if(children == undefined)
        {
            return;
        }
        let text_child = children.props.children;
        

        setText(text_child.toString().replace(/ /g, "-").toLowerCase());
    }, [children]);

    return (
       <span className={className} id={text}>
       
        
{children}
        </span>
    );
}

const components = {
    a: (props) => (
        <Mlink {...props}>
        </Mlink>),
    img: (props) => <h1 className="btitle text-black bg-red-500">Fix your shit</h1>,
    Image: (props) => <Image {...props} />,
    h1: (props) => (
        <TitlePart><h1 className="mt-8 btitle text-4xl font-black  text-white" {...props}>
        </h1></TitlePart>

    ),
    h2: (props) => (
        <TitlePart><h2 className="mt-8  text-3xl font-black  text-current" {...props}>
        </h2></TitlePart>

    ),
    h3: (props) => (
        <TitlePart><h3 className="mt-8 text-2xl font-extrabold py-4 text-current" {...props}>
        </h3></TitlePart>

    ),
    h4: (props) => (
        <TitlePart><h4 className="mt-8 text-xl font-extrabold py-4 text-current" {...props}>
        </h4></TitlePart>

    ),

    h5: (props) => (
        <TitlePart><h4 className="mt-8 text-lg font-extrabold py-4 text-current" {...props}>
        </h4></TitlePart>

    ),

    h6: (props) => (
        <TitlePart><h4 className="mt-8 text-lg font-extrabold py-4 text-current" {...props}>
        </h4></TitlePart>

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
    "mjx-container": (props) => (
        <span className="
        text-base text-black w-fit inline " {...props} >
        </span>
    ),
    ul: (props) => (
        <ul
            className="ml-8 list-disc text-base text-current list-inside"
            {...props}
        ></ul>
    ),
    li: (props) => <li className="text-base py-1 text-current" {...props}></li>,
};


 function TableOfContent({table})
{
    let toc = useRef(<div></div>);
    let [openned, setOpenned] = useState(false);
    useEffect(() => {
        let content = table.map((item) => {
            return (
                <div className={" text-base text-current"} style={
                    { marginLeft: item.level*2 + "ch" }
                
                } key={item.title}>
                    <Mlink href={item.linkRef} >
                        → {item.title}
                    </Mlink>
                </div>
            );
        });
        toc.current = content;
    }, [table]);

    return (



        <div className="bg-black text-white w-prose h-full flex flex-col my-4 p-4">
            <h1 className="text-2xl font-black py-1">Table of Content</h1>
            <div>
                {openned ? (
                    <button
                        className="text-base text-current"
                        onClick={() => setOpenned(false)}
                    >
                        ↑ Close 
                    </button>
                ) : (
                    <button
                        className="text-base text-current"
                        onClick={() => setOpenned(true)}
                    >
                        ↓ Open
                    </button>
                )}
            </div>


            <div className={
                openned ? "block" : "hidden"}>
            {toc.current}
                </div>
        </div>
    );
}

export default function Post({ front, slug, mdx, source })
{

    const meta_desc =   JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": front.seoTitle,
                        "image": [
                            front.socialImage,
                            front.socialImage.replace(".webp", ".png"),
                        ],
                        "datePublished": front.publishedOn + "T00:00:00+00:00",
                        "dateModified": front.modifiedOn + "T00:00:00+00:00",
                        "author": [{
                            "@type": "Person",
                            "name": "Cyp",
                            "url": "https://cyp.sh/#about"
                        },
                        ]
                    });

    // create a table of content from markdown mdx 
    

    
    let [toc, setToc] = useState([]);

    useEffect(() => {
        let tocTemp = [];
        let content = source.split("\n");
        let level_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let line of content)
        {
            if (line.startsWith("#"))
            {
                let level = line.match(/#+/)[0].length; // number of '#' in the line
                
                level_count[level] += 1;

                //let count_total = level_count.slice(0, level + 1).join(".");
                let title = line.replace(/#+/, "").trim(); // remove '#' from the line
                let linkRef = "#" + title.replace(/ /g, "-").toLowerCase(); // create a link reference
                tocTemp.push({ level: level, title: title, linkRef: linkRef }); // add to the table of content
            }
        }

        setToc(tocTemp);
    
    }, [source]
    );
   


    return (
        <div className=" w-full">
            <Head>
                <title>{front.seoTitle}</title>
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
                <meta property="og:title" content={front.seoTitle} />


                <meta name="description" content={front.description} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: meta_desc }}/>
            </Head>
            <TopBar />

            <div className="min-h-screen w-full flex  flex-col lg:flex-row  ">
                <div className="h-[50vh] lg:h-screen  w-screen ">
                    <Image src={"/" + front.socialImage} alt="blog post picture" sizes="100vw" fill quality="90" className=" img-cover inline-block " />
                </div>

                <header className="bg-black/75 bg-gradient-to-t from-black to-black/10 backdrop-blur-xl  flex flex-col min-h-[50vh] lg:min-h-screen lg:max-w-prose  text-white pt-32 py-8 px-8 z-0"  >
                    <div className="m-auto max-w-prose w-full    ">
                        <h1 className="text-4xl  p-4 m-auto w-fit text-white font-black bg-sky-500 ">
                            {front.title}
                        </h1>
                        <h2 className="pt-4 ">
                            {front.description}
                        </h2>
                    </div>
                    <div className="flex">
                        <Link href="#content" scroll={false}>
                            ↓
                        </Link>
                        <time className="ml-auto" dateTime={front.publishedOn}>
                            {front.publishedOn}
                        </time>
                    </div>
                </header>
            </div>

            <div className=" bg-white text-white flex flex-col lg:flex-row min-h-[50vh] pt-16 py-8 w-full px-8 z-2 " id="content">
     
               <main className="m-auto max-w-prose w-full text-black grow   ">

                    <TableOfContent table={toc} />
                    <MDXRemote {...mdx} components={components} lazy />

                    <div className="py-8 ">
                        <CPart/> 
                    </div>
                </main>


            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8 bg-black" />
        </div>
    );
}

export function getStaticPaths()
{
    const files = fs.readdirSync("public/post/");
    const paths = files
        .filter((file) => file.endsWith(".mdx"))
        .map((filename) => ({
            params: {
                slug: filename.replace(".mdx", ""),
            },
        }));


    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params })
{
    const markdownWithMeta = fs.readFileSync(
        path.join("public/post/", params.slug + ".mdx"),
        "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownWithMeta);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath, remarkRehype],

            rehypePlugins: [[rehypeMathjax, { 
                chtml: {
                      fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
                    
                },
                displayMode: true,
                output: 'mathml',
                tex: {
                    displayMath: [['$$', '$$']],
                    inlineMath: [['$', '$']],
                },
        }]],
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
