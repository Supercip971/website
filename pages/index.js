import Computer from "../components/common/computer";
import { BottomBar } from "../components/common/bottom";
export default function Disco() {
    return (
        <div className="w-screen bg-black">
            <div className="m-auto text-3xl font-bold w-fit back bg-white text-slate-900 flex flex-row px-8">
                <h1 className="p-8 hover:bg-black hover:text-white">CYP</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">BLOG</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">PROJECT</h1>
                <h1 className="p-8 hover:bg-black hover:text-white">ABOUT</h1>
            </div>
            <div className="text-3xl bg-black text-white flex flex-row  h-screen">
                <Computer className="w-1/4" />
                <div className="m-auto max-w-prose w-3/4 mx-16 p-8">
                    <h1 className="font-bold py-8">"hello"</h1>
                    <h3>
                        This website is verry work in progress, don't expect
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
            <div className=" w-screen back text-black bg-white pb-64  px-16">
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
