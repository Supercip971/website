import * as fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { BottomBar } from "../../components/common/bottom";
import { TopBar } from "../../components/common/top";
import Image from "next/image";
import { parse } from "exifr";
import { useState, useEffect } from "react";
import Head from "next/head";
import Mlink from "../../components/common/link";
import seedrandom from "seedrandom";
import Zoom from "../../components/common/zoommedExif";


async function PhotoLoad(photos, gridsCount) {
    let photosRes = [];

    let stackSaved = [];
    let lastIsHorizontal = false;
    let index = 0;

    let exifDatsPromise = [];
    for (let photo of photos) {
        exifDatsPromise.push(
            (async () =>{
                let exif = await parse(`photos/${photo.filename}`).then((exif) => {
                    return exif});
                let res = photo;
                res.exif = exif;
                res.width = exif.ExifImageWidth;
                res.height = exif.ExifImageHeight;
        
                res.isHorizontal = false;
                if (exif.ExifImageWidth >= exif.ExifImageHeight) {
                    res.isHorizontal = true;
                }
                return res;
        })());
    }
    let exifDats = await Array.fromAsync(exifDatsPromise).then((res) => {return res});
    
    for (let photo of exifDats) {


        let res = photo;

        /* 

        Avoid having 2 horizontal photos on the same line, and avoid having a horizontal photo as the 3rd photo of a line

        */
        if (res.isHorizontal && (lastIsHorizontal || index % gridsCount == (gridsCount - 1))) {
            stackSaved.push(res);
        }
        else {
            photosRes.push(res);
            index += (res.isHorizontal) ? 2 : 1;
        }

        lastIsHorizontal = res.isHorizontal;
        if(!res.isHorizontal && stackSaved.length > 0  && index % gridsCount < gridsCount - 1){
            let stacked = stackSaved.pop();
            photosRes.push(stacked);
            index += stacked.isHorizontal ? 2 : 1;
            
            lastIsHorizontal = stacked.isHorizontal;
            
        }

    }
    while(stackSaved.length > 0){
        photosRes.push(stackSaved.pop());
    }

    return photosRes;
}

function PhotoListGrid({photos, className, Vkey}){
    return <div className={" max-w-[90ch]  grid-cols-2 lg:grid-cols-3 gap-4 auto-cols-max m-auto " + className}>

        {(photos).map((val) => {
            console.log(val);
            if (!val.isHorizontal) {
                return <div key={val.filename + Vkey} className="m-auto">
                    <Zoom
                        src={`/photos/${val.filename}`}
                        alt={val.filename}
                        width={val.width}
                        height={val.height}
                        exifData={val.exif}
                    />

                </div>
            }
            else {

                return <div key={val.filename + Vkey} className="m-auto col-span-2">
                    <Zoom
                        src={`/photos/${val.filename}`}
                        alt={val.filename}
                        width={val.width}
                        height={val.height}
                        exifData={val.exif}
                    />

                </div>
            }
        })}
    </div>
}
export default function PhotoList({ photos }) {

    // filter photo by their size, and sort for different medium (such that the grid is coherent) 
    let [rePhotoLarge, setLargePhotos] = useState([]);
    let [rePhotoSmall, setSmallPhotos] = useState([]);
    let [randomlySortedPhotos, setRandomlySortedPhotos] = useState([]);
    let [seed, setSeed] = useState(0);

    useEffect(() => {
        setSeed(Math.random());
        const generator = seedrandom(seed);
        let photosCopy = photos.slice();
        photosCopy.sort((a, b) => {
            return generator() - 0.5;
        });
        setRandomlySortedPhotos(photosCopy);
    }, [photos]);
    useEffect(() => {

        setSeed(Math.random());

        PhotoLoad(randomlySortedPhotos, 3).then((res) => {
            setLargePhotos(res);
        });
        PhotoLoad(randomlySortedPhotos, 2).then((res) => {
            setSmallPhotos(res);
        });
    }, [photos, randomlySortedPhotos]);



    return (
        <div className=" w-full bg-black">
            <Head>
                <title>photos</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="author" content="cyp" />
                <meta name="description" content="My photos !" />
            </Head>
            <TopBar />
            <div className=" bg-black text-white flex flex-col lg:flex-row min-h-[50vh] pt-32 p-8">
                <div className="m-auto max-w-prose w-full  ">
                    <h1 className="text-4xl font-black py-8 m-auto">
                        My <span className=" text-sky-500">photos</span>
                    </h1>
                    <h2 className="text-xl">
                        Sometimes when I go outside, I love to carry my camera with me and take some pictures.
                        While I'm just starting out, I hope you'll enjoy them.
                        Note that the photos I share here are not of full quality, if you want to see them in full quality, you can feel free to <Mlink href="/contact">contact</Mlink> me.

                        In general I also share those pictures on my <Mlink href="https://www.instagram.com/cyp.bv/">instagram</Mlink> account.
                    </h2>
                </div>
            </div>
            <div className=" p-4 md:p-0 bg-white min-h-[100vh] m-auto " >
            <PhotoListGrid photos={rePhotoLarge} Vkey="large" className="lg:grid hidden"/>
            <PhotoListGrid photos={rePhotoSmall} Vkey="small" className="lg:hidden grid"/>
            </div>


            <BottomBar className="text-white flex flex-raw m-auto p-8" />
        </div>
    );
}

export async function getAllPhotos() {
    const files = fs.readdirSync("public/photos/");
    const photos = files
        .filter((file) => file.endsWith(".jpg"))
        .map((file) => {
            const path = `${file}`;
            return {
                filename: path,
            };
        });

    return photos;
}

export async function getStaticProps() {
    const photos = await getAllPhotos();
    return {
        props: {
            photos,
        },
    };
}