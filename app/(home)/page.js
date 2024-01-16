import Image from 'next/image'
import React from "react";

export default function Home() {
    return (
        <div className={'w-full h-[93vh] p-[2vh]'}>
            <div
                className={'h-[4vh] w-full bg-transparent flex justify-start content-center items-start p-0 mb-[2vh] animate-PageTitle'}>
                <div className={'flex text-[2vh] font-[700] text-[#4677ef] line-[2vh]'}>Admin Dashboard
                    <div className={'text-[2vh] font-[700] text-[#727272] ml-[1vh] line-[2vh]'}>/ Home Page
                    </div>
                </div>
            </div>
        </div>
    )
}
