import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { BrightnessContrastShader } from "three/examples/jsm/shaders/BrightnessContrastShader";

import { HueSaturationShader } from "three/examples/jsm/shaders/HueSaturationShader";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import * as THREE from "three";

import {
    Html,
    OrbitControls,
    useProgress,
} from "@react-three/drei";

import { Vector3 } from "three";

function Test(props) {
    const { scene } = useLoader(GLTFLoader, "/computer/computer.gltf");

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

export function WindowResizeRescaler(props) {
    var tanFOV = Math.tan(((Math.PI / 180) * 90) / 2);
    const ref = props.dref;
    useFrame((state, delta) => {
        if (!state || !ref || !ref.current) {
            return;
        }

        state.camera.aspect = ref.current.width / ref.current.height;

        state.camera.fov =
            (360 / Math.PI) *
            Math.atan(tanFOV / (ref.current.width / ref.current.height));
        state.camera.updateProjectionMatrix();
        // FIXME: only do this when the window resize
    });
}

let original_camera_pos = new Vector3(0, 1.5, 4);
let stop_animation = 0;
function Effect() {
    let { gl, scene, camera, size } = useThree();
    let framesec = 0;

    useFrame((state, delta) => {
        framesec += delta;
        const t = new Vector3(
            Math.sin(-framesec * 0.25) * 0.8,
            Math.cos(framesec * 0.05) * 0.1,
            0
        );

        if (stop_animation <= 0.1) {
            camera.position.set(
                t.x + original_camera_pos.x,
                t.y + original_camera_pos.y,
                t.z + original_camera_pos.z
            );
            camera.updateMatrix();
        } else {
            stop_animation -= delta;
            if (stop_animation < 0.1) {
                let r = new Vector3(
                    camera.position.x - t.x,
                    camera.position.y - t.y,
                    camera.position.z - t.z
                );
                original_camera_pos = r;
            }
        }

        base.render(camera);
        final.render(camera);
    }, 1);

    const [base, final] = useMemo(() => {
        const renderScene = new RenderPass(scene, camera);
        const offscreenTarget = new THREE.WebGLRenderTarget(
            size.width,
            size.height
        );
        camera.aspect = size.x / size.y;

        camera.fov = (360 / Math.PI) * Math.atan(90 / (size.x / size.y));
        camera.updateProjectionMatrix();
        const comp = new EffectComposer(gl, offscreenTarget);
        comp.renderToScreen = false;
        comp.addPass(renderScene);
        const finalComposer = new EffectComposer(gl);

        const hss = new ShaderPass(HueSaturationShader);
        hss.material.uniforms["saturation"].value = -1;
        const bcs = new ShaderPass(BrightnessContrastShader);
        bcs.material.uniforms["contrast"].value = 0.99;

        finalComposer.addPass(renderScene);
        finalComposer.addPass(hss);
        finalComposer.addPass(bcs);


        return [comp, finalComposer];
    }, [camera, original_camera_pos]);

    useEffect(() => {
        camera.position.set(
            original_camera_pos.x,
            original_camera_pos.y,
            original_camera_pos.z
        );
        camera.updateProjectionMatrix();
        base.setSize(size.width, size.height);
        final.setSize(size.width, size.height);
    }, [base, final, size]);
    return null;
}

function Loader() {
    const { progress } = useProgress();
    var nprogress = Math.floor(progress);

    return (
        <Html center>
            <div className="font-bold">{nprogress}% loading...</div>
        </Html>
    );
}

export default function Computer(props) {
    const ref = useRef(null);
    let stop = () => {
        stop_animation = 5;
    };
    return (
        <Canvas
            shadows={true}
            camera={new THREE.PerspectiveCamera(90, 1920 / 1080, 0.1, 1000)}
            onCreated={(gl) => { }}
            ref={ref}
            onMouseDown={stop}
            onScroll={stop}
            onDragEnter={stop}
            onWheel={stop}
            onDragStart={stop}
            onDrag={stop}
            onTouchMove={stop}
            {...props}
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
            <Suspense fallback={<Loader />}>
                <Test castShadow receiveShadow scale={1.5} />
            </Suspense>
            <Effect />
        </Canvas>
    );
}
