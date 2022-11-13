import styles from './Handwritten.module.css';

import localFont from '@next/font/local'


// WTF why can't I just use the root of the project ?
const myFont = localFont({ src: '../../public/pecita/Pecita.otf', preload:true })

export default function Handwritten(props) {
    return (
        <span className={myFont.className + " text-sky-500 title"} {...props}>
            {props.children}
        </span>
    );
}