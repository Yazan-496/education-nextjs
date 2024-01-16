import {TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader} from "tw-elements-react";
import React, {useState} from "react";
import Image from "next/image";
import ButtonSave from "components/@core/Elements/ButtonSave";
import ButtonNext from "components/@core/Elements/ButtonNext";
import Select from "react-select";
import ButtonClose from "components/@core/Elements/ButtonClose";
import {ArrowSvg} from "../svgs";
import ModalRegion from "components/ModalRegions"

const ModalImage = ({
                        image,
                        openModal,
                        _openModal,
                        _closeModal,
                        title,
                        answers,
                        correctAnswer,
                        handleDone,
                        setImageServerPath,
                        questionId
                    }) => {
    const [close, setClose] = useState(true)
    let [selectedPoints, setSelectedPoints] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedRegionPoints, setSelectedRegionPoints] = useState([]);
    let [points, setPoints] = useState([]);
    const handleSetRegion = () => {
        const firstPoint = points[0];
        if (selectedAnswer) {
            const findIndex = selectedPoints?.findIndex((one) => one?.answerId === selectedAnswer?.value);
            if (findIndex === -1) {
                setSelectedPoints((prevSelectedPoints) => [
                    ...prevSelectedPoints,
                    {
                        answerId: selectedAnswer?.value,
                        points: [...points, firstPoint],
                        status: selectedAnswer?.status,
                        label: selectedAnswer?.label
                    },
                ]);
            } else {
                const updatedSelectedPoints = [...selectedPoints];
                updatedSelectedPoints[findIndex].points = [...points, firstPoint];
                setSelectedPoints(updatedSelectedPoints);
            }
            setPoints([]);
        }
    }
    const handleReset = () => {
        setSelectedAnswer('')
        setPoints([])
        setImageServerPath('')
        setSelectedPoints([])
        setSelectedRegionPoints([])
    }

    const _getAnswerForThisQuestion = (questionId) => {
        console.log(questionId, answers, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if (answers?.filter((answer) => answer?.questionId === questionId)?.length > 0){
            console.log("in")
            const res = answers?.filter((answer) => answer?.questionId === questionId)[0]?.answers
            console.log(res, "in")
            return res
        }
        else {
            return null
        }
    }

    return (
        <TEModal className="absolute left-0 top-0 backdrop-blur-[5.5px] overflow-hidden bg-transparent" show={openModal}
                 setShow={_openModal}>
            <TEModalDialog
                className="fixed h-full m-0 left-0 top-0 w-full max-w-full min-h-full min-w-full duration-150"
                theme={{
                    show: "translate-x-0 opacity-100",
                    hidden: "translate-x-[100%] opacity-0",
                }}>
                <TEModalContent
                    className="h-full w-full ">
                    <div
                        className={`${close ? "w-[200px]" : "w-[10px]"} border border-l-gray-200 border-[3px] fixed shadow-lg z-10 bg-white h-full top-0 right-0 flex flex-col`}>
                        <div className="flex-1 flex w-full items-center">
                            <button
                                type="button"
                                className="flex-1 max-h-24 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={_closeModal}
                                aria-label="Close"
                            >
                                X
                            </button>
                        </div>
                        <div
                            className="w-[3vh] h-[5vh] p-[0.5vh] border border-[0.3vh] border-r-0 shadow-[2vh]  rounded-bl-[2vh] rounded-tl-[2vh] bg-white relative top-[4vh] flex items-center
                                 justify-center text-center right-[2.9vh]"
                            onClick={() => {
                                setClose(!close)
                            }}
                        ><ArrowSvg width={'3vh'} height={"5vh"} rotate={close}/>
                        </div>
                        <div className="flex-1 px-5 flex w-full items-center">
                            <Select
                                className="w-[200px]"
                                options={_getAnswerForThisQuestion(questionId)}
                                value={selectedAnswer}
                                onChange={(e) => setSelectedAnswer(e)}
                                // defaultValue={selectedAnswer || null}
                            />
                        </div>
                        <div className="w-full px-5  flex-1 flex items-center">
                            <ButtonSave
                                disabled={points?.length === 0}
                                onClick={handleSetRegion}
                                className={`h-auto w-full `} text="set region"/>
                        </div>
                        <div className="flex-1 px-5  w-full flex items-center ">
                            <ButtonClose
                                onClick={handleReset}
                                className="h-auto w-full" text="reset"/>
                        </div>
                        <div className="flex-1 px-5  w-full flex items-center ">
                            <ButtonNext
                                onClick={() => handleDone(selectedPoints)}
                                className="h-auto w-full " text="Done"/>
                        </div>
                    </div>
                    <TEModalBody className="overflow-y-hidden p-0">
                        <ModalRegion
                            setPoints={(a) => setPoints(a)}
                            setSelectedPoints={(a) => setSelectedPoints(a)}
                            setSelectedRegionPoints={(a) => setSelectedRegionPoints(a)}
                            setSelectedAnswer={(a) => setSelectedAnswer(a)}
                            selectedAnswer={selectedAnswer}
                            correctAnswer={correctAnswer}
                            points={points}
                            selectedPoints={selectedPoints}
                            selectedRegionPoints={selectedRegionPoints}
                            imageFile={image}
                            answers={answers}
                            questionId={questionId}
                        />
                    </TEModalBody>
                </TEModalContent>
            </TEModalDialog>
        </TEModal>
    )
}
export default ModalImage