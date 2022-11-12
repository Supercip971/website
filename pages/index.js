import Computer from "../components/common/computer";
import { BottomBar } from "../components/common/bottom";
import { TopBar } from "../components/common/top";

import Head from "next/head";
export default function Home() {
    return (
        <div className=" w-full bg-black">
            <Head>
                <title>Cyp website</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />

                <meta name="description" content="My little website with my portfolio, project and blog." />
            </Head>
            <TopBar />
            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-screen">
                <div className=" m-auto w-full lg:w-1/2 h-[50vh] lg:h-screen">
                    <Computer className="" />
                </div>
                        <Mlink href="#about">
                            About
                        </Mlink>
                        <Mlink href="#about">
                            Project
                        </Mlink>
                        <Mlink href="/blog">
                            Blog
                        </Mlink>

                        <Mlink href="https://github.com/Supercip971/website"> Source </Mlink>
                    </h3>
                </div>
            </div>
            <div className=" bg-white flex flex-col-reverse lg:flex-row py-16 w-full min-h-screen">
                <div className=" m-auto  text-black bg-white w-1/2 max-w-prose ">
                    <div className="w-full">
                        <h1 className="py-8 font-bold text-2xl">whoami</h1>
                        <h3 className="text-xl">
                            Hey ! I'm supercyp, I am 15 years old C/C++ french
                            programmer. I try to do a lot of low level
                            programming (kernel/osdev, and lately I try to learn
                            fpga). But sometimes I also try to do high level
                            programming (as you can see with this website). In
                            general everything I do is open source. I've been
                            working on multiple <Mlink href="/projects">projects</Mlink>. You can also see my{" "}
                            <Mlink href="/blog">small blog</Mlink> which is not very
                            full of content for the time being.
                        </h3>
                    </div>
                </div>
                <div className=" m-auto  grayscale ease-in-out duration-700 hover:grayscale-0 max-w-prose w-1/3 lg:w-1/6  aspect-square py-8 lg:p-1  bg-white">
                    <div className="rounded-full border-8 border-black invert contrast-200 hover:contrast-100 hover:invert-0 hover:shadow-md shadow-black ease-in-out duration-700">
                        <img
                            layout="responsive"
                            width="512"
                            height="512"
                            src="/logo.webp"
                            className=" aspect-square m-auto p-16 rounded-full"
                        />
                    </div>
                </div>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
