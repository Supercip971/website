import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Mlink({ pclass, href, children, ...props }) {

    let dyn = useRef(<div></div>);

    /* we set the width of the component, 
     * We shouldn't use js and there should be a way to do this 
     * without using js. 
     */ 
    useEffect(() => {
        if (!dyn) {
            return;
        }

        dyn.onResize = () => {
            dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');

            console.debug(dyn.current);
        }


        dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');

    });

    return (
        <Link {...props} className="link" href={href} scroll={false} ref={dyn}>
            {children}
        </Link>
    );
}
