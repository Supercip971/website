export function BottomBar(props) {
    return (
        <div {...props}>
            <div className="px-8 m-auto">
                <a href="github.com/supercip971"> source code </a>
            </div>
            <div className="px-8 m-auto">
                The 3D model is based on{" "}
                <a href="https://sketchfab.com/3d-models/computer-terminal-b3a26b00c5b04eedad0a1cdca884130f">
                    "Computer Terminal"
                </a>{" "}
                by{" "}
                <a href="https://sketchfab.com/ChrisSweetwood">
                    Chris Sweetwood
                </a>{" "}
                is licensed under{" "}
                <a href="http://creativecommons.org/licenses/by-sa/4.0/">
                    CC-BY-SA-4.0
                </a>
            </div>
        </div>
    );
}
