import { BottomBar } from "../components/common/bottom"
import Mlink from "../components/common/link"
import { TopBar } from "../components/common/top"
export default function Licenses() {
    return (
        <div className="min-w-screen min-h-screen">
    <TopBar/>
        <div className=" max-w-prose m-auto p-8 pt-24 min-h-screen">
         <h1 className="font-black text-xl">
            Licenses
        </h1>

        <h2 className="py-8">
            The code of this web site is licensed under the <Mlink href="https://github.com/Supercip971/website/blob/main/license.md">MIT License</Mlink>, except where otherwise stated.
            
       
        </h2>
        <h2 className="py-8">
            The computer in the homepage is a modification based on {" "}
                <Mlink href="https://sketchfab.com/3d-models/computer-terminal-b3a26b00c5b04eedad0a1cdca884130f">
                    "Computer Terminal"
                </Mlink>{" "}
                by{" "}
                <Mlink href="https://sketchfab.com/ChrisSweetwood">
                    Chris Sweetwood
                </Mlink>{" "}
                and it is licensed under{" "}
                <Mlink href="http://creativecommons.org/licenses/by-sa/4.0/">
                    CC-BY-SA-4.0
                </Mlink>.
        </h2>
         <h2 className="py-8">
            The <Mlink href="http://pecita.eu/" className="mfont"><span className="mfont">Pecita</span></Mlink> font in the homepage is licensed under the <Mlink href="/pecita/license.txt">SIL OPEN FONT LICENSE</Mlink>
           <br/> <Mlink href="http://pecita.eu/copyright.xhtml">Copyright © 2009-2014, Philippe Cochy</Mlink> under the reserved name Pecita.
        </h2>
        
        </div>



            <BottomBar className="text-white bg-black flex flex-raw m-auto p-8" />
       </div>
    )
}