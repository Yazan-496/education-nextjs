import Slider from "react-slick";
import TypeWriterComponent from "../../../helpers/TypeWriter";
import React, {createRef, useEffect, useRef, useState} from "react";
import {FalseSvg, TrueSvg} from "../../@core/svgs";
import Celebration from "../../@core/Elements/confetti";

const QuizResult = ({data, questionsAnswered}) => {
    const [correctAnswer, setCorrectAnswers] = useState(null)
    const [streamAnimation, toggleStreamAnimation] = useState(false);
    const [showCelebration, setShowCelebration] = useState({show: false, type: null});
useEffect(() => {
    const aa = questionsAnswered?.filter((question) => question?.status === 1)?.length
    setCorrectAnswers(aa)
    if (aa === questionsAnswered?.length && questionsAnswered?.length === data?.questions?.length){
       const t = setTimeout(() => {
           setShowCelebration({show: true, type: "success"})
       }, 2000)
    }
    else if (aa === 0 && questionsAnswered?.length === data?.questions?.length){
        const t = setTimeout(() => {
            setShowCelebration({show: true, type: "failed"})
        }, 2000)
    }
}, [questionsAnswered, data])

    const getSelectedAnswer = (question, answer) => {
        return questionsAnswered?.filter((questionAnswered) => questionAnswered?.questionId === question?.id)[0]?.answerId
    }

    return (
        <div className="relative w-full text-center gap-y-5 py-2 my-2 flex flex-col h-[100vh]">
            <TypeWriterComponent text={`Correct Questions: ${correctAnswer} of ${questionsAnswered?.length} question`} time={100}/>
                {data.questions.map((question, index) => (
                    <div className="w-[100vw] flex flex-col border-1 border-b-1" key={index}>
                        <div className='w-full flex-2 flex items-start pt-3 justify-center'>
                            <div className="text-center  w-full  border border-t-0 border-b-1 shadow-lg text-xl text-gray-500">
                               <p className="underline text-2xl text-bold">{question?.title}</p>
                                <div className='flex'>
                                    <div style={{
                                    }} className={`p-3 flex-1 flex text-xl flex-col items-center justify-center`}>
                                        {question?.answers?.map((answer, i) => (
                                            <button
                                                className={`
                                                             ${answer?.status === 1 && getSelectedAnswer(question, answer) === answer?.id ? "bg-green-700 text-white" : ""}   
                                                              ${answer?.status === 1 ? "bg-green-500 text-white" : ""}  
                                                             ${getSelectedAnswer(question, answer) === answer?.id && answer?.status === 0 ? "bg-red-600 text-white" : ""} 
                                                 transition-opacity duration-700
                                             flex justify-between
                                                w-[90%] cursor-pointer skew-x-12 p-1 m-2 flex-1 rounded-full border border-2`}
                                                key={i}
                                            >
                                                <p className="px-2">{answer?.status === 1 && getSelectedAnswer(question, answer) === answer?.id ? <TrueSvg /> :
                                                   getSelectedAnswer(question, answer) === answer?.id ?
                                                        <FalseSvg /> : ""}</p>
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
            {/*{showCelebration.show && <div onClick={() => setShowCelebration({show: false, type: null})} className="absolute top-0 left-0 w-full h-full">*/}
            {/*    <Celebration type={showCelebration?.type}*/}
            {/*    /></div>}*/}
        </div>
    )
}
export default QuizResult