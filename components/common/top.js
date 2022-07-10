import { useEffect, useRef } from "react";
import Link from "next/link";
function TopMenu(props) {
    return (
        <div {...props}>
            <Link href="/" passHref>
                <h1 className="p-8 hover:bg-black hover:text-white cursor-pointer">
                    CYP
                </h1>
            </Link>
            <Link href="/blog" passHref>
                <h1 className="p-8 hover:bg-black hover:text-white cursor-pointer">
                    BLOG
                </h1>
            </Link>
            <h1 className="p-8 hover:bg-black hover:text-white cursor-pointer">
                PROJECT
            </h1>
            <h1 className="p-8 hover:bg-black hover:text-white cursor-pointer">
                ABOUT
            </h1>
        </div>
    );
}
export function TopBar(props) {
    const barref = useRef(null);
    const menuref = useRef(null);

    const onclickfn = () => {
        console.log("hello world");
        menuref.current.classList.toggle("hidden");
    };
    return (
        <div>
            <div className="fixed z-[10] w-screen m-auto text-2xl font-bold hidden bsm:flex back bg-white/90 backdrop-blur-lg  text-slate-900 ">
                <TopMenu
                    className="w-fit m-auto bsm:flex flex-row "
                    ref={null}
                />
            </div>
            <div className="fixed z-[10] w-screen m-auto text-2xl font-bold flex flex-col bsm:hidden back bg-white/90 backdrop-blur-lg  text-slate-900 ">
                <div className="w-full m-auto flex flex-row ">
                    <h1 className="py-8 px-16 hover:bg-black hover:text-white cursor-pointer w-max">
                        CYP
                    </h1>
                    <button
                        className="py-8 px-16 ml-auto bg-transparent hover:bg-black  cursor-pointer w-fit"
                        ref={barref}
                        onClick={onclickfn}
                    >
                        <svg
                            height="100%"
                            viewBox="0 0 178 178"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-black hover:fill-white pr-8"
                        >
                            <rect x="15" y="29" width="148" height="24" />
                            <rect x="15" y="77" width="148" height="24" />
                            <rect x="15" y="125" width="148" height="24" />
                        </svg>
                    </button>
                </div>

                <div ref={menuref} className="hidden w-screen">
                    <TopMenu className="w-full m-auto flex-col flex px-16" />
                </div>
            </div>
        </div>
    );
}
