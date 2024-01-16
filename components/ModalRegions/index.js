import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import ButtonNext from "../@core/Elements/ButtonNext";

const ModalRegion = ({imageFile, setSelectedPoints, questionId, setSelectedRegionPoints, selectedPoints, points, setPoints, selectedAnswer, setSelectedAnswer, correctAnswer, answers}) => {
    const imageRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');
    const [curX, setCurX] = useState(1)
    const [curY, setCurY] = useState(1)

    function handleResize() {
        const DIV_IMAGE = document.getElementById("DIV_IMAGE");
        const svg_SSS = document.getElementById("svg_SSS");
        const originalRatio = DIV_IMAGE.naturalWidth / DIV_IMAGE.naturalHeight;
        const targetWidth = window.innerWidth;
        const targetHeight = window.innerHeight; // 100% of screen height
        if (originalRatio > targetWidth / targetHeight) {
            DIV_IMAGE.style.width = targetWidth + "px";
            DIV_IMAGE.style.height = targetWidth / originalRatio + "px";
            svg_SSS.style.width = targetWidth + "px";
            svg_SSS.style.height = targetWidth / originalRatio + "px";
        } else {
            DIV_IMAGE.style.height = targetHeight + "px";
            DIV_IMAGE.style.width = targetHeight * originalRatio + "px";
            svg_SSS.style.height = targetHeight + "px";
            svg_SSS.style.width = targetHeight * originalRatio + "px";
        }
        DIV_IMAGE.style.left = "0";
        DIV_IMAGE.style.top = "0";
        svg_SSS.style.left = "0";
        svg_SSS.style.top = "0";
        setCurX(parseFloat(DIV_IMAGE.style.width))
        setCurY(parseFloat(DIV_IMAGE.style.height))
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const router = useRouter()
    const handleFileChange = (file) => {
        if (file) {
            const imageURL = URL.createObjectURL(file);
            const img = new Image();
            let imageWidth
            let imageHeight
            let originalRatio
            img.onload = () => {
                imageWidth = img.width;
                imageHeight = img.height;
                originalRatio = imageWidth / imageHeight;
                setImageSrc(imageURL);
                const DIV_IMAGE = document.getElementById("DIV_IMAGE");
                const svg_SSS = document.getElementById("svg_SSS");
                const targetWidth = window.innerWidth;
                const targetHeight = window.innerHeight;
                if (originalRatio > targetWidth / targetHeight) {
                    DIV_IMAGE.style.width = targetWidth + "px";
                    DIV_IMAGE.style.height = targetWidth / originalRatio + "px";
                    svg_SSS.style.width = targetWidth + "px";
                    svg_SSS.style.height = targetWidth / originalRatio + "px";
                } else {
                    DIV_IMAGE.style.height = targetHeight + "px";
                    DIV_IMAGE.style.width = targetHeight * originalRatio + "px";
                    svg_SSS.style.height = targetHeight + "px";
                    svg_SSS.style.width = targetHeight * originalRatio + "px";
                }
                DIV_IMAGE.style.left = "0";
                DIV_IMAGE.style.top = "0";
                svg_SSS.style.left = "0";
                svg_SSS.style.top = "0";
                handleResize()
            };
            img.src = imageURL;
        }
    };
    useEffect(() => {
        handleFileChange(imageFile)
    }, [imageFile])

    useEffect(() => {
        const DIV_IMAGE = document.getElementById("DIV_IMAGE");
        const svg_SSS = document.getElementById("svg_SSS");
        const originalRatio = DIV_IMAGE.naturalWidth / DIV_IMAGE.naturalHeight;
        const targetWidth = window.innerWidth;
        const targetHeight = window.innerHeight;
        if (originalRatio > targetWidth / targetHeight) {
            DIV_IMAGE.style.width = targetWidth + "px";
            DIV_IMAGE.style.height = targetWidth / originalRatio + "px";
            svg_SSS.style.width = targetWidth + "px";
            svg_SSS.style.height = targetWidth / originalRatio + "px";
        } else {
            DIV_IMAGE.style.height = targetHeight + "px";
            DIV_IMAGE.style.width = targetHeight * originalRatio + "px";
            svg_SSS.style.height = targetHeight + "px";
            svg_SSS.style.width = targetHeight * originalRatio + "px";
        }
        DIV_IMAGE.style.left = "0";
        DIV_IMAGE.style.top = "0";
        svg_SSS.style.left = "0";
        svg_SSS.style.top = "0";
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    const handleImageClick = (event) => {
            const DIV_IMAGE = document.getElementById("DIV_IMAGE");
            const imageElement = imageRef.current;
            // setCurX(parseFloat(DIV_IMAGE.style.width))
            // setCurY(parseFloat(DIV_IMAGE.style.height))
            const {left, top} = imageElement.getBoundingClientRect();
            const x = event.clientX - left;
            const y = event.clientY - top;
            const XPer100 = (100 * x) / DIV_IMAGE?.width
            const YPer100 = (100 * y) / DIV_IMAGE?.height
            const newPoint = {x: XPer100, y: YPer100};
            setPoints((prevPoints) => [...prevPoints, newPoint]);
            setSelectedRegionPoints((prevPoints) => [...prevPoints, {x, y}]);

    };

    return (
        <div id={'SpA10'}
             className={'bg-transparent w-full h-screen overflow-hidden flex flex-row flex-nowrap justify-start justify-items-start content-start items-start text-[black]'}>
            <div id={'Pic_Area'}
                 className={'relative w-full h-screen bg-[#e8e8e8] flex flex-col flex-nowrap justify-items-start justify-start items-start content-start m-0 p-0'}>
                <img
                    ref={imageRef}
                    id={'DIV_IMAGE'}
                    className={'cursor-crosshair object-[top_left] m-0 p-0'}
                    src={imageSrc ? imageSrc : ''}
                    onClick={handleImageClick}
                    alt="Image"
                />
                <svg
                    id={'svg_SSS'}
                    style={{
                        position: "absolute",
                        pointerEvents: "none",
                    }}
                >
                    {points.length > 0 && (
                        <polyline
                            points={points
                                .map((point) => `${(point.x * curX) / 100},${(point.y * curY) / 100}`)
                                .join(" ")}
                            fill={"#ff000029"}
                            stroke="red"
                            strokeWidth="0.1vh"
                        />
                    )}

                    {selectedPoints?.length > 0 && (
                        selectedPoints?.map((points, i) => {
                            return points?.points?.length > 0 && (
                                <polyline
                                    key={i}
                                    points={points?.points
                                        ?.map((point) => `${(point.x * curX) / 100},${(point.y * curY) / 100}`)
                                        .join(" ")}
                                    fill={`${parseInt(points?.answerId) === parseInt(correctAnswer) || (answers[questionId]?.answers?.filter(one => one.value === points.answerId)[0].status === 1) ? "#07950729" : "#ff000029"}`}
                                    stroke={`${parseInt(points?.answerId) === parseInt(correctAnswer) || (answers[questionId]?.answers?.filter(one => one.value === points.answerId)[0].status === 1) ? "green" :  "red"}`}
                                    strokeWidth="0.1vh"
                                />
                            )
                        })
                    )}
                </svg>
            </div>
        </div>
    );
};
export default ModalRegion;