import { useEffect, useRef, useCallback, createRef } from "react";

export function CPartImpl({ title, slug }) {

    const ref = useRef(null);

    useEffect(() => {

        // thx: https://github.com/utterance/utterances/issues/624

        const script = document.createElement('script');

        const config = {
            src: "https://utteranc.es/client.js",
            repo: 'Supercip971/website',
            'issue-term': 'pathname',
            theme: 'github-light',
            label: "💬 comment",
            crossOrigin: 'anonymous',
            'async': true,
        };

        Object.entries(config).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });

        script.setAttribute('src', 'https://utteranc.es/client.js');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', 'github-light');
        script.setAttribute('repo', 'Supercip971/website');
        script.setAttribute('crossOrigin', 'anonymous');
        script.setAttribute('async', 'true');
        
        
        script.onload = () => {
            console.log('utterances loaded');
            const comments = document.getElementById("comments-container");

            // avoid two comment element
            if (comments && comments.children[1]) {
                comments.children[1].style.display = "none";
            }
        };



        // ref.current.append(script);
        ref.current.appendChild(script);
    }, []);

    return (
        <div ref={ref} classname="utterances-frame relative" id="comments-container" />
    )
}

export default function CPart({ title, slug }) {
    return (
        <>
            <h2 className="btitle mt-8 text-2xl font-black">Comments</h2>
            <CPartImpl title={title} slug={slug} />
        </>
    )
}


