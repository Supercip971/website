import { BottomBar } from "../components/common/bottom"
import Mlink, { MButton } from "../components/common/link"
import { TopBar } from "../components/common/top"
export default function Contact() {
    return (
        <div className="min-w-screen min-h-screen">
            <TopBar />
            <div className=" max-w-prose m-auto p-8 pt-24 min-h-screen">
                <h1 className="my-8 px-2 font-black text-2xl bg-sky-500 text-white w-fit btitle ">Contact</h1>

                You are able to contact me through the email: <Mlink href="mailto:contact@cyp.sh">contact@cyp.sh</Mlink> or by using the form below:

                <form action="https://api.staticforms.xyz/submit" method="post">
                    <input type="hidden" name="accessKey" value="65719a19-786d-4d42-9759-f72e7fa112bf" />

                    <h3 className="font-black text-xl p-4">Name:</h3>
                    <input type="text" name="name" className="w-full border-2 border-black" />
                    <h3 className="font-black text-xl p-4">Email:</h3>

                    <input type="text" name="email" className="w-full border-2 border-black" />

                    <h3 className="font-black text-xl p-4">Message:</h3>

                    <textarea name="message" className="w-full border-2 border-black"></textarea>
                    <br></br>


                    <div className="w-fit p-4">

                        <MButton> <input type="submit" value="Submit" className=" text-xl w-fit cursor-pointer" /> </MButton>

                        <input type="hidden" name="redirectTo" value="https://cyp.sh/contact_next"></input>
                    </div>
                </form>

            </div>



            <BottomBar className="text-white bg-black flex flex-raw m-auto p-8" />
        </div>
    )
}