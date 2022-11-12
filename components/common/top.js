import { useEffect, useRef } from "react";
import Link from "next/link";

function TopMenu(props) {
    return (
        <div {...props}>
            <Link href="/" passHref>
                <h1 className=" button py-2 px-8 text-2xl text-white  ">
                    Home
                </h1>
            </Link>
            <Link href="/blog" passHref>
                <h1 className=" py-2 px-8 hover:bg-black button text-white ">
                    Blog
                </h1>
            </Link>
            <h1 className=" py-2 px-8 hover:bg-black button text-white ">
                Project
            </h1>
            <h1 className=" py-2 px-8 hover:bg-black button text-white ">
                About
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
            <div className="fixed z-[10] py-2 w-screen m-auto text-2xl font-bold hidden bsm:flex back bg-black/90 backdrop-blur-lg  text-white ">
                <TopMenu
                    className="w-fit m-auto bsm:flex flex-row "
                    ref={null}
                />
            </div>
            <div className="fixed z-[10] w-screen m-auto text-2xl font-bold flex flex-col bsm:hidden back bg-black/90 backdrop-blur-lg  text-white ">
                <div className="w-full m-auto flex flex-row ">
                    <h1 className="py-4 px-16 hover:bg-black hover:text-white cursor-pointer w-max text-white ">
                        Home
                    </h1>
                    <button
                        className="py-4 px-16 ml-auto bg-transparent hover:bg-white bg-black hover:text-black text-white  cursor-pointer w-fit"
                        ref={barref}
                        onClick={onclickfn}
                        title="open main menu"
                    >
                        <svg
                            height="100%"
                            viewBox="0 0 178 178"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                            className="pr-8 fill-current"
                        >
                            <rect x="15" y="29" width="148" height="24" />
                            <rect x="15" y="77" width="148" height="24" />
                            <rect x="15" y="125" width="148" height="24" />
                        </svg>
                    </button>
                </div>

                <div ref={menuref} className="hidden w-screen ease-in-out duration-300">
                    <TopMenu className="w-full m-auto flex-col flex p-8" />
                </div>
            </div>
        </div>
    );
}
