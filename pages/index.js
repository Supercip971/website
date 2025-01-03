import { BottomBar } from "../components/common/bottom";
import Head from "next/head";
import Mlink from "../components/common/link";
import Image from "next/image";
import Handwritten from "../components/text/handwritten";
import dynamic from 'next/dynamic'

const Computer = dynamic(() => import('../components/common/computer'), { 
    loading: () => <p>Loading...</p>,  
    ssr: false
})
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
            <div className=" bg-black text-white flex flex-col lg:flex-row h-screen flex-1 items-stretch">

                <div className=" w-full lg:w-[40%] grow h-full lg:h-screen max-w-1/2 min-w-0 min-h-0">
                    <Computer className="" />
                </div>
                <div className=" max-w-prose w-full lg:w-1/2 
                    mb-16 lg:my-auto 
                    mx-auto lg:mr-16
                   px-4 lg:pr-8 shrink-0">
                    <h1 className=" text-2xl text-white font-black py-8  text-center">
                        Hello ! I'm <Handwritten>cyp</Handwritten>.
                    </h1>
                    <h2 className="text-xl text-white">
                        I'm an 18 year old french developer. On this website you can see my blog or my projects.
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
                        <Mlink href="/photo">
                            Photos
                        </Mlink>

                    </h3>
                </div>
            </div>
            <div className=" bg-white flex flex-col-reverse lg:flex-row py-16 w-full min-h-screen" id="about">
                <div className=" m-auto  text-black bg-white px-4 lg:px-0 w-full lg:w-1/2 max-w-prose ">
                    <div className="w-full">
                        <h1 className="my-8 px-2 font-black text-2xl bg-sky-500 text-white w-fit btitle ">About</h1>
                        <p className="text-xl">
                        Hello! I'm <Handwritten><span class="text-4xl">cyp</span></Handwritten>, an 18-year-old French C/C++ programmer.  
                        I focus on low-level programming (kernel/osdev, and lately I've been exploring FPGA development).  
                        Sometimes, I also experiment with high-level programming (as you can see on this website).  
                        Most of my work is open source. I've been working on multiple <Mlink href="/projects">projects</Mlink>.  
                        You can also check out my <Mlink href="/blog">small blog</Mlink>, which doesn't have much content for now.  
                        
                        I'm currently studying at INSA Lyon, so I no longer have as much time to dedicate to my projects.  
                        However, I still try to work on smaller things occasionally, like photography.  
                        
                        <br/>
                        If you're interested, feel free to reach out:  
<Mlink href="/contact">Contact</Mlink>
                        </p>
                    </div>
                </div>
                <div className=" m-auto  grayscale ease-in-out duration-700 hover:grayscale-0 max-w-prose w-1/3 lg:w-1/4  aspect-square py-8 lg:p-1  bg-white">
                    <div className="rounded-full  contrast-200 hover:contrast-100  shadow-black ease-in-out duration-700">

                        <Image src="/logo.webp" alt="my icon" width="512" height="512" quality="90 " className=" rounded-full" />

                    </div>
                </div>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
