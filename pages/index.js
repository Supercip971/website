import Computer from "../components/common/computer";
import { BottomBar } from "../components/common/bottom";
import { TopBar } from "../components/common/top";
import Head from "next/head";
import Link from "next/link";
import Mlink from "../components/common/link";

import Handwritten from "../components/text/handwritten";
export default function Home() {
    return (
        <div className=" w-full bg-black">
            <Head>
                <title>Cyp website</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="preload" href="/pecita/Pecita.otf" as="font" type="otf" crossOrigin="/" />
                <meta name="description" content="My little website with my portfolio, project and blog." />
            </Head>
            <div className=" bg-black text-white flex flex-col lg:flex-row h-screen flex-1 items-stretch">

                <div className=" w-full lg:w-[40%] grow h-full lg:h-screen max-w-1/2 min-w-0 min-h-0">
                    <Computer className="" />
                </div>
                <div className=" max-w-prose w-full lg:w-1/2 
                    mb-16 lg:my-auto 
                    mx-auto lg:mr-16
                    lg:pr-8 shrink-0">
                    <h1 className=" text-2xl text-white font-black py-8  text-center">
                        Hello ! I'm <Handwritten>cyp</Handwritten>.
                    </h1>
                    <h2 className="text-xl text-white">
                        I'm a 16 year old french developer, on this website you can see my blog or my projects.
                    </h2>
                    <h3 className="py-8 flex flex-row w-full justify-around">
                        <Mlink href="#about">
                            About
                        </Mlink>
                        <Mlink href="/projects">
                            Project
                        </Mlink>
                        <Mlink href="/blog">
                            Blog
                        </Mlink>

                        <Mlink href="https://github.com/Supercip971/website"> Source </Mlink>
                    </h3>
                </div>
            </div>
            <div className=" bg-white flex flex-col-reverse lg:flex-row py-16 w-full min-h-screen" id="about">
                <div className=" m-auto  text-black bg-white w-1/2 max-w-prose ">
                    <div className="w-full">
                        <h1 className="my-8 px-2 font-black text-2xl bg-sky-500 text-white w-fit btitle ">About</h1>
                        <p className="text-xl">
                            Hey ! I'm cyp, I am 16 years old C/C++ french
                            programmer. I try to do a lot of low level
                            programming (kernel/osdev, and lately I try to learn
                            fpga). But sometimes I also try to do high level
                            programming (as you can see with this website). In
                            general everything I do is open source. I've been
                            working on multiple <Mlink href="/projects">projects</Mlink>. You can also see my{" "}
                            <Mlink href="/blog">small blog</Mlink> which is not very
                            full of content for the time being.
                        </p>
                    </div>
                </div>
                <div className=" m-auto  grayscale ease-in-out duration-700 hover:grayscale-0 max-w-prose w-1/3 lg:w-1/6  aspect-square py-8 lg:p-1  bg-white">
                    <div className="rounded-full  invert contrast-200 hover:contrast-100 hover:invert-0 shadow-black ease-in-out duration-700">
                        <img
                            layout="responsive"
                            width="512"
                            height="512"
                            alt="My icon"
                            src="/logo.webp"
                            className=" aspect-square m-auto p-16 rounded-full "
                        />
                    </div>
                </div>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
