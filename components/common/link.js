import Link from "next/link";
import { useEffect, useRef } from "react";

export function MNav({ href, children, ...props })
{

    let dyn = useRef(<div></div>);

    /* we set the width of the component, 
     * We shouldn't use js and there should be a way to do this 
     * without using js. 
     */
    useEffect(() =>
    {
        if (!dyn)
        {
            return;
        }

        let update = () => {

            dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');
        }

        window.addEventListener('resize', update)



        
        dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');





        return _ => {
            window.removeEventListener('resize', update)
        }
    });

    return (
        <Link {...props} className="button" href={href} scroll={false} ref={dyn}>
            {children}
        </Link>
    );
}

export function MButton({ children, className, ...props })
{

    let dyn = useRef(<div></div>);

    /* we set the width of the component, 
     * We shouldn't use js and there should be a way to do this 
     * without using js. 
     */
    useEffect(() =>
    {
        if (!dyn)
        {
            return;
        }
        let update = () => {

            dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');
        }

        window.addEventListener('resize', update)




        dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');

        return _ => {
            window.removeEventListener('resize', update)
        }
    });

    return (
        <button {...props} className={className + " button"} scroll={false} ref={dyn}>
            {children}
        </button>
    );
}
export function MAction({ children, ...props })
{

    let dyn = useRef(<div></div>);

    /* we set the width of the component, 
     * We shouldn't use js and there should be a way to do this 
     * without using js. 
     */
    useEffect(() =>
    {
        if (!dyn)
        {
            return;
        }
        let update = () => {

            dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');
        }

        window.addEventListener('resize', update)




        dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');

        return _ => {
            window.removeEventListener('resize', update)
        }
    });

    return (
        <div {...props} className="link" scroll={false} ref={dyn}>
            {children}
        </div>
    );
}

export default function Mlink({ pclass, href, children, ...props })
{

    let dyn = useRef(<div></div>);

    /* we set the width of the component, 
     * We shouldn't use js and there should be a way to do this 
     * without using js. 
     */
    useEffect(() =>
    {
        if (!dyn)
        {
            return;
        }
        let update = () => {

            dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');
        }

        window.addEventListener('resize', update)



        dyn.current.style.setProperty('--end', dyn.current.offsetWidth + 20 + 'px');

        return _ => {
            window.removeEventListener('resize', update)
        }
    });

    return (
        <Link {...props} className="link" href={href} scroll={false} ref={dyn}>
            {children}
        </Link>
    );
}
