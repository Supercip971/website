import Computer from "../components/common/computer";
import { BottomBar } from "../components/common/bottom";
import Image from "next/image";
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
            </Head>
            <div className=" hidden bsm:flex m-auto text-2xl font-bold max-w-fit back bg-white text-slate-900 flex-row px-8">
                <h1 className="p-8 hover:bg-black hover:text-white">CYP</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">BLOG</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">PROJECT</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">ABOUT</h1>
            </div>

            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-screen">
                <div className=" m-auto w-full lg:w-1/2 h-[50vh] lg:h-screen">
                    <Computer className="" />
                </div>
                <div className="m-auto max-w-prose w-full lg:w-1/2 p-8">
                    <h1 className="text-2xl font-extrabold py-8">Hello !</h1>
                    <h3 className="text-xl">
                        This website is verry work in progress ! don't expect
                        anything interesting/responsive here... Lorem ipsum odor
                        amet, consectetuer adipiscing elit. Ac purus in massa
                        egestas mollis varius; dignissim elementum. Mollis
                        tincidunt mattis hendrerit dolor eros enim, nisi ligula
                        ornare. Hendrerit parturient habitant pharetra rutrum
                        gravida porttitor eros feugiat. Mollis elit sodales
                        taciti duis praesent id. Consequat urna vitae morbi nunc
                        congue
                    </h3>
                </div>
            </div>
            <div className=" bg-white flex flex-col-reverse lg:flex-row py-16 w-full">
                <div className=" m-auto  text-black bg-white p-8 w-1/2 ">
                    <div className="max-w-prose m-auto">
                        <h1 className="py-8 font-bold text-2xl">whoami</h1>
                        <h3 className="text-xl">
                            Hey ! I'm supercyp, I am 15 years old C/C++ french
                            programmer. I try to do a lot of low level
                            programming (kernel/osdev, and lately I try to learn
                            fpga). But sometimes I also try to do high level
                            programming (as you can see with this website). In
                            general everything I do is open source. I've been
                            working on multiple projects that you can see{" "}
                            <a href="/projects">here</a>. You can also see my{" "}
                            <a href="/blog">small blog</a> which is not very
                            full of content for the time being.
                        </h3>
                    </div>
                </div>
                <div className=" m-auto   grayscale ease-in-out duration-700 hover:grayscale-0 max-w-prose w-1/3 lg:w-1/4 hover:lg:w-[28%] aspect-square p-8 lg:p-1  bg-white">
                    <div className="rounded-full border-8 border-black invert contrast-200 hover:contrast-100 hover:invert-0 hover:shadow-md shadow-black ease-in-out duration-700">
                        <Image
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
