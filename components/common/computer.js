import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { BrightnessContrastShader } from "three/examples/jsm/shaders/BrightnessContrastShader";
import { HueSaturationShader } from "three/examples/jsm/shaders/HueSaturationShader";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import * as THREE from "three";


import { Html, OrbitControls, useProgress } from "@react-three/drei";

import {  Vector2, Vector3 } from "three";

function Model(props) {
    const { scene } = useLoader(GLTFLoader, "/computer/computer.gltf");

    scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            //    node.material = new ShaderMaterial(getGrainShader());
        }
    });

    scene.castShadow = true;

    scene.receiveShadow = true;
    return <primitive {...props} object={scene}></primitive>;
}


export function WindowResizeRescaler(props) {
    var tanFOV = Math.tan(((Math.PI / 180) * 90) / 2);
    const ref = props.dref;

    let old_size = (new THREE.Vector2(0, 0));
    useFrame((state, delta) => {
        if (!state || !ref || !ref.current) {
            return;
        }


        if (old_size.x != ref.current.width || old_size.y != ref.current.height) {


            //   state.setSize(ref.current.width, ref.current.height);
            state.camera.aspect = ref.current.width / ref.current.height;

            state.camera.fov =
                (360 / Math.PI) *
                Math.atan(tanFOV / (ref.current.width / ref.current.height));
            state.camera.updateProjectionMatrix();


            old_size = new THREE.Vector2(ref.current.width, ref.current.height);
        }



        // FIXME: only do this when the window resize
    });
}

let original_camera_pos = new Vector3(0, 1
    , 3.5);
let stop_animation = 0;
function Effect(ref) {
    let { gl, scene, camera, size, viewport } = useThree();

    let [framesec, setFramesec] = useState(0);

    function round_ration(x) {
        return x;
    }

    function getSize() {

        const ratio = round_ration(window.devicePixelRatio);
        const w = (size.width * (ratio));


        return new THREE.Vector2(
            Math.floor(w),
            Math.floor(w / camera.aspect),
        );
    }

    useFrame((state, delta) => {

        setFramesec(framesec + delta);
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
            if (stop_animation <= 0.1) {
                let r = new Vector3(
                    camera.position.x - t.x,
                    camera.position.y - t.y,
                    camera.position.z - t.z
                );
                original_camera_pos = r;
            }
        }

        //  grain.material.uniforms.tSize.value = getSize();


        base.render(camera);
    //    final.render(camera);
    }, 1);

    let lsize = new Vector2(0,0)

    const [base] = useMemo(() => {


//        const render_size = getSize();



        const renderScene = new RenderPass(scene, camera);

        //comp.addPass(renderScene);

        //comp.addPass(fxaa);

        const finalComposer = new EffectComposer(gl);
        finalComposer.renderToScreen = true;
        const hss = new ShaderPass(HueSaturationShader);
        hss.material.uniforms["saturation"].value = -1;
        const bcs = new ShaderPass(BrightnessContrastShader);
        bcs.material.uniforms["contrast"].value = 0.98;

        finalComposer.addPass(renderScene);
     //   finalComposer.readBuffer = offscreenTarget;
     //   offscreenTarget.writeBuffer = finalComposer;

        //         fxaa.material.uniforms.tDepth.value = offscreenTarget.depthTexture;


        hss.material.depthFunc = THREE.AlwaysDepth;

        bcs.material.depthFunc = THREE.AlwaysDepth;
       // fxaa.material.depthFunc = THREE.AlwaysDepth;

        finalComposer.addPass(hss);
        finalComposer.addPass(bcs);



        // const pass = new SMAAPass( render_size.width, render_size.height );
        // 	finalComposer.addPass( pass );

        //  finalComposer.addPass();




        //             finalComposer.addPass(fxaa);



       // console.log("[camera, size]");
        
        return [finalComposer];
    }, []);

    useEffect(() => {
        gl.antialias = true;
        gl.alpha = true;

        camera.position.set(
            original_camera_pos.x,
            original_camera_pos.y,
            original_camera_pos.z
        );
        camera.near = 0.1;
        camera.far = 10;



        camera.updateProjectionMatrix();
    //    console.log("[]");
        window.addEventListener( 'resize', () => {
       //     console.log("[size]", getSize().width, getSize().height);
    
            base.setSize(getSize().width, getSize().height);
    
          //  final.setSize(getSize().width, getSize().height);
    
            gl.setPixelRatio(round_ration(window.devicePixelRatio));
    
        }, false );
            
    }, []);

   
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

    let scale = 1.2;
    let stop = () => {
        stop_animation = 5;
    
    };
    return (
        <>
            <Canvas
                shadows={true}
                camera={new THREE.PerspectiveCamera(90, (1920 * 2) / (1080 * 2), 0.1, 50)}
                onCreated={(gl) => { }}
                ref={ref}
                onMouseDown={stop}
                onScroll={stop}
                onDragEnter={stop}
                onWheel={stop}
                onDragStart={stop}
                onDrag={stop}
                onTouchMove={stop}
                className="h-full w-full"
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
                <OrbitControls enableZoom={true} target={[0, scale / 2, 0]} />
                <Suspense fallback={<Loader />}>
                    <Model castShadow receiveShadow scale={scale} />
                </Suspense>
                <Effect />
            </Canvas>
        </>
    );
}
