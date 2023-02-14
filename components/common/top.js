import { useRef } from "react";
import Link from "next/link";
import { MButton, MNav } from "./link";

function TopMenu(props) {
    return (
        <ol {...props}>
            <MNav href="/" passHref>
                <li className=" button py-2 px-8 text-2xl text-white  ">
                    Home
                </li>
            </MNav>
            <MNav href="/blog" passHref>
                <li className=" py-2 px-8  button text-white ">
                    Blog
                </li>
            </MNav>
            <MNav href="/projects" passHref>

                <li className=" py-2 px-8 button text-white ">
                    Project
                </li>
            </MNav>
            <MNav href="/#about">
                <li className=" py-2 px-8  button text-white ">
                    About
                </li>

            </MNav>
        </ol>
    );
}

export function TopBar(props) {
    const menuref = useRef(null);

    const onclickfn = () => {

        
        menuref.current.classList.toggle("invisible");
        menuref.current.classList.toggle("max-h-0");

   };
    return (
        <nav>
            <div className="fixed z-[10] py-2 w-screen m-auto text-2xl font-bold hidden bsm:flex back bg-black/90 backdrop-blur-lg  text-white ">
                <TopMenu
                    className="w-fit m-auto bsm:flex flex-row "
                    ref={null}
                />
            </div>
            <div className="fixed z-[10] w-screen m-auto text-2xl font-bold flex flex-col bsm:hidden back bg-black/90 backdrop-blur-lg  text-white ">
                <div className=" w-full m-auto flex flex-row py-1 px-4 ">
                    <MNav href="/" passHref className="flex h-full m-auto">
                        <div className=" button py-2 px-8 text-2xl text-white  ">
                            Home
                        </div>
                    </MNav>
                    <MButton
                        className="w-full    h-12 py-2  pr-2 m-auto  bg-black hover:text-black text-white  cursor-pointer"
                        onClick={onclickfn}
                        title="open main menu"
                    >
                        
                        <svg
                            height="100%"
                            viewBox="0 0 178 178"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                            className="m-auto  fill-current"
                        >
                            <rect x="15" y="29" width="148" height="24" />
                            <rect x="15" y="77" width="148" height="24" />
                            <rect x="15" y="125" width="148" height="24" />
                        </svg>
                    </MButton>
                </div>

                <div ref={menuref} className=" invisible w-screen ease-in-out  max-h-0">
                    <TopMenu className="w-full m-auto flex-col flex p-8" />
                </div>
            </div>
        </nav>
    );
}
