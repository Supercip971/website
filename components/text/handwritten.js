

import localFont from '@next/font/local'


// WTF why can't I just use the root of the project ?
const mfont = localFont({

    family: 'Pecita',
    display: 'swap',
    src: '/Pecita.woff2',
});

export default function Handwritten(props) {

    return (
        <span className={mfont.className + " text-sky-500 title"} {...props}>
            {props.children}
        </span>
    );
}