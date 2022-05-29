import { BottomBar } from "../components/common/bottom";
import { TopBar } from "../components/common/top";

import Head from "next/head";
export default function Blog({ children }) {
    return (
        <div className=" w-full bg-black">
            <Head>
                <title>blog</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <TopBar />
            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-[50vh] pt-32 p-8">
                <div className="m-auto max-w-prose w-full  ">
                    <h1 className="text-4xl font-extrabold py-8 m-auto">
                        BLOG
                    </h1>
                    {children}
                </div>
            </div>
            <div className=" bg-white flex flex-col-reverse lg:flex-row py-16 w-full min-h-[20vh]"></div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
