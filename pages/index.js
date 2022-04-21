import Computer from "../components/common/computer";
import { BottomBar } from "../components/common/bottom";
export default function Home() {
    return (
        <div className=" w-full bg-black">
            <div className=" hidden bsm:flex m-auto text-3xl font-bold max-w-fit back bg-white text-slate-900 flex-row px-8">
                <h1 className="p-8 hover:bg-black hover:text-white">CYP</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">BLOG</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">PROJECT</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">ABOUT</h1>
            </div>

            <div className="text-3xl bg-black text-white flex flex-col lg:flex-row min-h-screen">
                <div className=" m-auto w-full lg:w-1/2 h-[50vh] lg:h-screen">
                    <Computer className="" />
                </div>
                <div className="m-auto max-w-prose w-full lg:w-1/4 p-8">
                    <h1 className="text-4xl font-extrabold py-8">"hello"</h1>
                    <h3>
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
            <div className=" w-full back text-black bg-white pb-64 p-8">
                <div className="max-w-prose m-auto">
                    <h1 className="py-8 font-bold text-4xl">whoami</h1>
                    <h3 className="text-2xl">
                        When I said it's WIP it's very WIP
                    </h3>
                </div>
            </div>

            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}
