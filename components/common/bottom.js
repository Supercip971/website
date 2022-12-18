import Mlink from "./link";

export function BottomBar(props) {
    return (
        <div {...props}>
            <div className=" m-auto">
                
                <Mlink href="https://github.com/Supercip971/website"> source code </Mlink>
            </div>
            <div className=" m-auto">
                <Mlink href="/licenses"> licenses </Mlink>
            </div>

            <div className=" m-auto">
                <Mlink href="/contact"> contact </Mlink>
            </div>
        </div>
    );
}
