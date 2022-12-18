import { BottomBar } from "../components/common/bottom";
import { TopBar } from "../components/common/top";
import Head from "next/head";
import Mlink from "../components/common/link";
import Image from "next/image";
import PlumeLogo from "../public/pic/plume-logo.svg"
import BrutalLogo from "../public/pic/brutal-logo.svg"

import WingosLogo from "../public/pic/wingos-logo.png"

export function SProject({ title, children, image, link, ...props }) {


    return <article {...props} className="   p-2 m-8 rounded-xl">

        <h1 className="m-1 text-3xl text-white font-black  w-fit mx-auto">
            {title}
        </h1>

        <div className="p-4 text-white ">
            <div className="w-fit m-auto text-center">

                {children}

            </div>
            <nav className="w-full flex flex-row justify-around pt-4">

                <Mlink href={link}>
                    Source code
                </Mlink>
            </nav>

        </div>


    </article>;
}
export function Project({ title, children, image, link, id, ...props }) {



    let direction = "flex-col xl:flex-row-reverse";
    let back = " bg-white text-black";

    let blurred = " xl:bg-gradient-to-l from-white/100 via-white/100 to-white/100";

    let margindir = ' xl:my-0';


    if (id % 2 == 0) {
        direction = "flex-col xl:flex-row";
        back = " bg-black text-white";
        blurred = " xl:bg-gradient-to-r from-black/90 via-black/100 to-black/100";
        margindir = ' xl:-mr-96 xl:my-0';
    }



    return <article {...props} id={id} className={'flex min-h-screen ' + direction + back}>

        <div className={" h-[50vh] xl:h-screen relative xl:grow z-0 xl:m-0 m-4 " + margindir}>

            <Image src={image} alt="blog post picture" fill quality="90" className=" img-cover z-0  self-center " />

        </div>
        <div className={"w-screen xl:w-1/2 grow xl:max-w-prose xl:mx-4 h-full xl:h-screen align-middle"}>
            <div className={"w-full m-auto h-full  z-[2]  flex backdrop-blur-3xl bg-gradient-to-b " + blurred}>
                <div className="m-auto p-8 z-[2] max-w-prose">

                    <h1 className="title text-sky-500 font-black  w-fit mx-auto mb-2">
                        {title}
                    </h1>
                    {children}

                </div>
            </div>
        </div>

    </article>;
}
export default function Projects() {


    let plumeLogo = <Image src={PlumeLogo} alt="plume logo" quality="90" className=" img-cover  self-center " />

    let brutalLogo = <div className="m-auto flex flex-row w-full">
        <Image src={BrutalLogo} alt="brutal logo" quality="90" width={200} className="  self-center " />
    </div>
    let wingosLogo = <Image src={WingosLogo} alt="wingos logo" quality="90" className=" img-cover  self-center " />


    return (
        <div className=" w-full bg-black">
            <Head>
                <title>Projects</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="author" content="cyp" />
                <meta name="description" content="My various projects I worked/am working on;" />
            </Head>
            <TopBar />
            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-[50vh] pt-32 p-8">
                <div className="m-auto max-w-prose w-full  ">
                    <h1 className="text-4xl font-black py-8 m-auto">
                        My <span className=" text-sky-500">projects</span>
                    </h1>
                    <h2 className="text-xl">

                        My various open source project I worked on or am working on.
                    </h2>
                </div>
            </div>

            <div className=" md:p-0 bg-white min-h-[100vh] w-full m-auto  ">
                <Project title={"fcompute"} image="/pic/compute-ray-bg-2.png" id={0}>
                    A current rewrite of my 'plume' pathtracer (that you can see <Mlink href="#1"> below</Mlink>).
                    It's a compute shader based raytracer written in C with vulkan from scratch.
                    It supports GLTF loading, BSDF materials and much more...


                    <nav className="w-full flex flex-row justify-around py-4">
                        <Mlink href="https://github.com/Supercip971/compute-ray"> Source code </Mlink>
                    </nav>

                    <div className="mt-12 font-extralight">
                        The screenshot is a render of a scene I made with the pathtracer.
                    </div>
                </Project>


                <Project title={plumeLogo} image="/pic/plumeray.png" id={1}>
                    An open source cpu pathtracer written in C from scratch. It's aimed at being fast and simple. It is currently being reworked to be replaced by the <Mlink href="#0">compute shader</Mlink> version.

                    <nav className="w-full flex flex-row justify-around py-4">
                        <Mlink href="https://github.com/Supercip971/plume-raytracer"> Source code </Mlink>
                    </nav>
                </Project>


                <Project title={brutalLogo} image="/pic/brutal-bg.png" id={2}>

                    <p className="py-2">An operating system inspired by brutalist design that combines the ideals of UNIX from the 1970s with modern technology and engineering </p>
                    Brutal is an open source micro kernel written in C. I contributed to the operating system in various way, but I'm not the only maintainer.
                    Brutal has it's own (work in progess) C compiler, it has an Interface Definition Language, a UI system, a x86-64 & RISC-V kernel, it's own bootloader...
                    And everything was written from scratch.

                    <nav className="w-full flex flex-row justify-around py-4">
                        <Mlink href="https://github.com/brutal-org/brutal"> Source code </Mlink>
                        <Mlink href="https://brutal.smnx.sh/"> Website </Mlink>

                    </nav>
                </Project>


                <Project title={wingosLogo} image="/pic/wingos-bg.png" id={3}>

                    <p className="py-2">Another 64 bit (amd64) operating system I wrote from scrarch in C++, it has smp, ext2, basic network, ahci... I stopped working on it for Brutal</p>

                    <nav className="w-full flex flex-row justify-around py-4">
                        <Mlink href="https://github.com/supercip971/wingos"> Source code </Mlink>

                    </nav>
                </Project>
                <Project title="DEVSE" image="/pic/devse.png" id={4}>
                    I am one of the administrators of the DEVSE community. It's an awesome french community around the development of low level programming and operating systems. 
                    We have a discord server, a wiki, an IRC, ... 


                    <nav className="w-full flex flex-row justify-around py-4">
                        <Mlink href="https://github.com/devse-org/"> Github organization </Mlink>

                        <Mlink href="https://github.com/devse-org/documentation"> Documentation </Mlink>
                    </nav>
                </Project>

                <Project title="This website" image="/post/syscallsysret.webp" id={5}>
                    This website is where you are ! It was my first time using a web framework (like Next.JS). You can also take a look at an old version of the website that wasn't
                    using JS and was generated using python.


                    <nav className="w-full flex flex-row justify-around py-4">
                        <Mlink href="https://github.com/Supercip971/website"> Source code </Mlink>

                        <Mlink href="https://supercip971.github.io/"> Old version </Mlink>
                    </nav>
                </Project>
                <div className="text-sky-500 bg-black  ">
                    <h2 className="title font-black py-8 text-center ">
                        But I also have other projects !
                    </h2>

                    <div className="flex flex-wrap flex-row  p-8  mx-auto justify-around  items-stretch  ">
                        <SProject title={"pico-emu"} link={"github.com"}>
                            A WIP hobby raspberry pi pico emulator.
                        </SProject>
                        <SProject title={"obsidian typing speed"} link={"https://github.com/Supercip971/obsidian-typing-speed"}>
                            An obsidian plugin to track your typing speed. (1000+ downloads).
                        </SProject>
                        <SProject title={"Riscy-interpret"} link={"https://github.com/Supercip971/RISCYINTERPRET"}>
                            A risc-v interpretter written in C++ from scratch.
                        </SProject>
                        <SProject title={"Bid vscode"} link={"https://github.com/brutal-org/bid-vscode"}>
                            A VSCode extension to use the Brutal Interface Definition language (BID).
                        </SProject>
                    </div>

                    <h3 className="m-auto w-full text-center">
                        <Mlink href="https://github.com/Supercip971/" >
                            And much more !
                        </Mlink>
                    </h3>

                </div>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto px-4 py-8" />
        </div>
    );
}
