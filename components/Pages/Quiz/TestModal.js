import Slider from "react-slick";
import React, {createRef, useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";
import Image from "next/image";
import TypeWriterComponent from "../../../helpers/TypeWriter";
import QuizResult from "./Result";
import {Stage, Layer, Star, Text, Line, Rect} from 'react-konva';


const TestModal = ({data}) => {
    const {t, i18n} = useTranslation("translation");
    const router = useRouter()
    const [curXY, setCurXY] = useState({x: 1, y: 1})
    const [showImage, setShowImage] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [hoveredAnswer, setHoveredAnswer] = useState(null);
    const [animation0, setAnimation0] = useState(false);
    const [animation1, setAnimation1] = useState(false);
    const [animation2, setAnimation2] = useState(false);
    const [slideChanged, setSlideChanged] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState([]);
    const [answerIndex, setAnswerIndex] = useState(null);
    const [imageDimensions, setImageDimensions] = useState([]);
    const [selected, setSelected] = useState({});
    useEffect(() => {
        handleResetState()
        const a0 = setTimeout(() => {
            setShowTitle(true)
        }, 800)
        const a1 = setTimeout(() => {
            setAnimation0(true)
        }, 2400)
        const a2 = setTimeout(() => {
            setAnimation1(true)
        }, 3600)
        const a3 = setTimeout(() => {
            setAnimation2(true)
        }, 4800)


        const a4 = setTimeout(() => {
            setShowImage(true)
        }, 6000)
        setCurXY({x: 1, y: 1})
        setImageDimensions([])
        handleResize()
    }, [slideChanged])
    const parentDivRef = useRef()
    const settings = {
        dots: true,
        infinite: false,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        swipe: false,
        swipeToSlide: false,
        slidesToScroll: 1,
    };
    const sliderRef = createRef();
    const previous = () => {
        sliderRef.current?.slickPrev();
    };

     function handleResetState() {
         setShowImage(false)
        setAnimation0(false)
        setAnimation1(false)
        setAnimation2(false)
         setSelected({})
         const a0 = setTimeout(() => {
             setShowTitle(false)
         }, 400)
        // setSlideChanged(!slideChanged)
    }

    const next = () => {
         sliderRef.current?.slickNext();
        setSlideChanged(!slideChanged)
        setAnswerIndex(null)
    };
    useEffect(() => {
        console.log(data, "data")
    }, [data])

    const handleResize = () => {
        const targetWidth = window.innerWidth;
        const targetHeight = window.innerHeight * 0.7;
        const updatedDimensions = imageDimensions.map((one) => {
            if (one?.originalRatio > targetWidth / targetHeight) {
                const widthDiv = targetWidth;
                const heightDiv = targetWidth / one?.originalRatio;
                setCurXY({x: widthDiv, y: heightDiv})
                return {
                    ...one,
                    width: widthDiv,
                    height: heightDiv,
                };
            } else {
                const heightDiv = targetHeight;
                const widthDiv = targetHeight * one?.originalRatio;
                setCurXY({x: widthDiv, y: heightDiv})
                return {
                    ...one,
                    width: widthDiv,
                    height: heightDiv,
                };
            }
        });
        if (JSON.stringify(imageDimensions) !== JSON.stringify(updatedDimensions)) {
            setImageDimensions(updatedDimensions);
        }
    }

    useEffect(() => {
        const handleResizeOnImageDimensionsChange = () => {
            handleResize();
        };

        handleResize();

        window.addEventListener("resize", handleResizeOnImageDimensionsChange);

        return () => {
            window.removeEventListener("resize", handleResizeOnImageDimensionsChange);
        };
    }, [imageDimensions]);

    function handleSetDimensions(naturalHeight, naturalWidth, id) {
        const originalRatio = naturalWidth / naturalHeight
        const targetWidth = window.innerWidth;
        const targetHeight = window.innerHeight * 0.7;
        const updatedDimensions = [...imageDimensions];
        const index = updatedDimensions.findIndex((item) => item.id === id);

        if (originalRatio > targetWidth / targetHeight) {
            const widthDiv = targetWidth;
            const heightDiv = targetWidth / originalRatio;
            if (index !== -1) {
                updatedDimensions[index] = {
                    ...updatedDimensions[index],
                    width: widthDiv,
                    height: heightDiv,
                    originalRatio,
                };
            } else {
                updatedDimensions.push({
                    width: widthDiv,
                    height: heightDiv,
                    originalRatio,
                    id
                });
            }
            setImageDimensions(updatedDimensions);
            setCurXY({x: widthDiv, y: heightDiv})
        } else {
            const heightDiv = targetHeight;
            const widthDiv = targetHeight * originalRatio;
            if (index !== -1) {
                updatedDimensions[index] = {
                    ...updatedDimensions[index],
                    width: widthDiv,
                    height: heightDiv,
                    originalRatio,
                };
            } else {
                updatedDimensions.push({
                    width: widthDiv,
                    height: heightDiv,
                    originalRatio,
                    id
                });
            }
            setImageDimensions(updatedDimensions);
            setCurXY({x: widthDiv, y: heightDiv})
        }
    }

    const _getWidth = (id) => {
        return imageDimensions.filter((image) => image.id === id)[0]?.width || 100
    }
    const _getHeight = (id) => {
        return imageDimensions.filter((image) => image.id === id)[0]?.height || 100
    }

    const canvasRefs = useRef([]);
    useEffect(() => {
        if (data?.questions) {
            canvasRefs.current = Array(data?.questions.length)
                .fill(null)
                .map(() => createRef());
        }
    }, [data?.questions]);

    const handleQuestionsAnswered = () => {
        const question = selected?.question
        const answer = selected?.answer
        setQuestionsAnswered((prevState => [
            ...prevState,
            {questionId: question?.id, answerId: answer?.id, status: answer?.status}
        ]))
        next()
    }

    useEffect(() => {
      const a = setTimeout(() => {
          if (selected?.answer && selected?.question) {
              handleQuestionsAnswered()
          }
      }, 2000)
    }, [selected])
    return (
        <div className="w-full flex flex-col h-[100vh]">
            <Slider
                swipeToSlide={false}
                className='w-full flex items-center justify-center border-1'
                ref={sliderRef}
                {...settings}
            >
                {data.questions.map((question, index) => (
                    <div className="w-[100vw] flex flex-col border-1 h-[100vh]" key={index}>
                        <div className='w-full flex flex-1 items-start shadow-xl h-[70%] text-2xl font-bold'>
                        <div
                            className={` ${!showImage ? "opacity-0 " : "opacity-1" } transition-opacity duration-1000`}>
                            {showImage && <div ref={parentDivRef} className={`relative top-0 left-0 h-full w-full text-center`}>
                                <Image
                                    className={``}
                                    width={_getWidth(index)}
                                    height={_getHeight(index)}
                                    objectFit={'contain'}
                                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${question?.img_src}`}
                                    alt={`upload`}
                                    onLoad={(e) => {
                                        const {naturalWidth, naturalHeight} = e.target;
                                        handleSetDimensions(naturalHeight, naturalWidth, index)
                                    }}
                                />
                                <Stage style={{
                                    position: "absolute"
                                }} className="canvas absolute z-100 top-0 left-0" width={_getWidth(index)} height={_getHeight(index)}>
                                    {question?.answers?.map((answer, answerIndex) => (
                                        <Layer key={answerIndex}>
                                            <Line
                                                className="canvas"
                                                points={answer.region.points.flatMap(point => [(parseFloat(point.x) * curXY.x) / 100, (parseFloat(point.y) * curXY.y) / 100]).concat((parseFloat(answer.region.points[0].x) * curXY.x) / 100, (parseFloat(answer.region.points[0].y) * curXY.y) / 100)}
                                                tension={0.5}
                                                closed
                                                opacity={hoveredAnswer?.id === answer?.id ? 0.5 : 0}
                                                onMouseEnter={() =>
                                                    setHoveredAnswer(answer)
                                                }
                                                onMouseLeave={() => setHoveredAnswer(null)}
                                                stroke="#e7e4e4"
                                                onClick={() => {
                                                setSelected({question, answer})
                                                console.log('{question, answer}', {question, answer})
                                            }}
                                                fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                                                fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                                                fillLinearGradientColorStops={[0, 'transparent', 1, '#e7e4e4']}
                                            />
                                        </Layer>
                                    ))}
                                </Stage>
                            </div>}
                        </div>
                        </div>
                        <div className='w-full flex-2 flex items-start pt-3 justify-center h-[30%]'>
                            <div className="text-center w-full text-2xl text-gray-500">
                                {showTitle && <TypeWriterComponent text={question?.title} time={80}/>}
                                <div className='flex'>
                                    <div style={{
                                    }} className={`pt-3 flex-1 flex text-xl flex-col items-center justify-center`}>
                                        {question?.answers?.map((answer, i) => (
                                            <button
                                                onClick={() => {
                                                    setSelected({question, answer})
                                                    console.log('{question, answer}', {question, answer})
                                                }}
                                                onMouseOver={() => {
                                                    // handleOverAnswer(question, answer, index)
                                                }}

                                                onMouseEnter={() =>
                                                    setHoveredAnswer(answer)
                                                }
                                                onMouseLeave={() => setHoveredAnswer(null)}
                                                className={` 
                                            ${ (i === 0 ? !animation0 : i === 1 ? !animation1 : !animation2) ? "opacity-0" : "opacity-1"}
                                             ${hoveredAnswer?.id === answer?.id ? 'bg-gray-400 text-white' : ''} transition-opacity duration-700
                                             flex justify-between hover:bg-gray-400 hover:text-white hover:scale-[1.05] focus:bg-gray-400 focus:text-white focus:scale-[1.05]
                                                w-[90%] cursor-pointer skew-x-12 p-1 m-2 flex-1 rounded-full border border-2`}
                                                key={i}
                                            >
                                                <p/>
                                                {answer?.title}
                                                <p className="px-4">{i + 1}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <QuizResult data={data} questionsAnswered={questionsAnswered} />
            </Slider>
        </div>

    )
}
export default TestModal