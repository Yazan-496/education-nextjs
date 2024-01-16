import Quiz from "components/Pages/Quiz";
import React from "react";
import {TransServer} from "../../../components/@core/Language/TransServer";

const Quizzes = async () => {
    const {quizzes} = await getData();
    return (
        <div className={'w-full h-[93vh] p-[2vh]'}>
            <div
                className={'h-[4vh] w-full bg-transparent flex justify-start content-center items-start p-0 mb-[2vh] animate-PageTitle'}>
                <div className={'flex text-[2vh] font-[700] text-[#4677ef] line-[2vh]'}>{TransServer("user.quizzes_management")}
                    <div className={'text-[2vh] font-[700] text-[#727272] ml-[1vh] line-[2vh]'}>
                    </div>
                </div>
            </div>
            <Quiz quizzes={quizzes}/>
        </div>
    )

}
export default Quizzes

async function getData() {
    const quizzes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}quiz/all`, { cache: 'no-cache'}).then(res => res.json())
    return {
        quizzes
    }
}