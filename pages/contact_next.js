import { BottomBar } from "../components/common/bottom"
import Mlink, { MButton } from "../components/common/link"
import { TopBar } from "../components/common/top"
export default function Contact() {
    return (
        <div className="min-w-screen min-h-screen">
            <TopBar />
            <div className=" max-w-prose m-auto p-8 pt-24 min-h-screen">
     <h1 className="my-8 px-2 font-black text-2xl bg-sky-500 text-white w-fit btitle ">Contact</h1>
                   Thank you for trying to contact me! I will try to respond as soon as possible. 

                   <Mlink href="/"> Going back home. </Mlink> 

            </div>



            <BottomBar className="text-white bg-black flex flex-raw m-auto p-8" />
        </div>
    )
}