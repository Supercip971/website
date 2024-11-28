

import React, { useRef, useState} from "react";
import {default as Image, ImageProps} from "next/image.js";


export const Zoom = (props) => {

    const {
        zoomPercentage = 80,
        backgroundOpacity = .95,
        backgroundColor = "black",
        animationDuration = 150,
        exifData = {},
        width = 0, 
        height = 0,
        ...imageProps
    } = props;

   
    const containerRef = useRef(null);

    const [clicked, setClicked] = useState(false);

    const handleImageFocus = () => {
        if (!containerRef.current || clicked) return;
        
        containerRef.current.style.display = "hidden";

        window.document.addEventListener("scroll", closeWrapper, {once: true});

        setClicked(true);
    };

    const closeWrapper = () => {
        if (!containerRef.current) return;

        containerRef.current.style.display = "block";
        setClicked(false);
        console.log(exifData);
    };

    const styles = {
        position: "relative",
        display: props.layout === "fixed" ? "inline-block" : "block",
        width: props.layout === "fixed" ? "max-content" : "100%",
        height: props.layout === "fixed" ? "max-content" : "100%",
        transition: `background-color ${animationDuration}ms`,
        backgroundColor: clicked ? "rgba(0,0,0,.3)" : "transparent"
    }

    return (
        <>
           

          
            <div
                style={styles}
                ref={containerRef}
                onClick={handleImageFocus}
            >
                <Image {...imageProps} width={width} height={height} loading="lazy"  />
            </div>
            {clicked
                ? <><div style={{
                    backgroundColor: backgroundColor,
                    position: "fixed",
                    zIndex: 40,
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                }}
                       onClick={closeWrapper}
                >
                    
                    <div className=" w-fit m-auto flex flex-col lg:flex-row p-8 z-50 ">
                 

                    <div className="text-white bg-black p-4">
                        <h1 className="font-black text-xl">{imageProps.DateTimeOriginal}</h1>
                        <h2 className="">
                            <b>Camera:</b> {exifData.Model}
                        </h2>
                        <h2 className="">
                            <b>Lens:</b> {exifData.LensModel}
                        </h2>
                        <h2 className="">
                            <b>Iso:</b> {exifData.ISO}
                        </h2>
                        <h2 className="">
                            <b>F:</b> {exifData.FNumber}
                        </h2>
                        <h2 className="">
                            <b>Shutter Speed:</b> {exifData.ExposureTime}
                        </h2>
                        <h2 className="">
                            <b>Focal Length:</b> {exifData.FocalLength}
                        </h2>
                    </div>   
                    <div className=""> 
                    <Image {...imageProps} 
                                     className="w-full  max-h-[90vh] my-auto " width={width} height={height}/>

                    </div>
                    
                 </div>   
                 </div>         
                         
                </>
                : null}
        </>
    );
};

export default Zoom;