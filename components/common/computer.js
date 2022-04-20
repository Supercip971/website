import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
    EffectComposer,
    BrightnessContrast,
    HueSaturation,
    SMAA,
} from "@react-three/postprocessing";

import { OrbitControls } from "@react-three/drei";

function Test(props) {
    const { scene } = useLoader(GLTFLoader, "/computer/computer.glb");

    scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });

    scene.castShadow = true;
    scene.receiveShadow = true;
    return <primitive {...props} object={scene}></primitive>;
}
/*
<directionalLight
                position={[20, 10, 18]}
                castShadow
                shadowMapWidth={2048}
                shadowMapHeight={2048}
                intensity={1}
                color={[0 / 255, (127 - 22) / 255, 255 / 255]}
            />  <BrightnessContrast
                    contrast={1.0}
                    brightness={0.3}
                ></BrightnessContrast>
     <ColorDepth bits={1}></ColorDepth>
<directionalLight
                position={[-20, 10, 10]}
                castShadow
                shadowMapWidth={2048}
                shadowMapHeight={2048}
                intensity={0.7}
                color={[(255 - 12) / 255, 0x7f / 255, 24 / 255]}
            />

*/

const WindowResizeRescaler = (props) => {
    var tanFOV = Math.tan(((Math.PI / 180) * 90) / 2);
    const ref = props.dref;

    useFrame((state, delta) => {
        if (!state || !ref) {
            return;
        }

        state.camera.aspect = ref.current.width / ref.current.height;
        state.camera.fov =
            (360 / Math.PI) *
            Math.atan(tanFOV / (ref.current.width / ref.current.height));
        state.camera.updateProjectionMatrix();
        // FIXME: only do this when the window resize
    });
};

export default function Computer(props) {
    const ref = useRef(null);
    return (
        <Canvas
            shadows={true}
            camera={{
                fov: 90,
                position: [0, 1.5, 4],
                view: {
                    offsetY: 500,
                },
            }}
            dpr={[1, 1]}
            onCreated={(gl) => {}}
            antialias={true}
            {...props}
            ref={ref}
        >
            <WindowResizeRescaler dref={ref} />
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[0, 10, 18]}
                castShadow
                intensity={3.9}
                color={[1, 1, 1]}
            />
            <OrbitControls enableZoom={true} target={[0, 1, 0]} />
            <Suspense fallback={null}>
                <Test castShadow receiveShadow scale={1.5} />
            </Suspense>

            <EffectComposer>
                <HueSaturation saturation={-1.0} />

                <BrightnessContrast contrast={0.99} />
                <SMAA />
            </EffectComposer>
        </Canvas>
    );
}
