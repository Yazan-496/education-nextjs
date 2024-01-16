"use client"
import * as React from 'react';
import {useRef} from "react";
import ButtonClose from "../Elements/ButtonClose";
import ButtonSave from "../Elements/ButtonSave";

const BackDropFilterModal = ({
                                 left,
                                 top,
                                 height,
                                 width,
                                 width1,
                                 showModal,
                                 handleClickMyProfileX,
                                 children
                             }) => {
    const modalRef = useRef(null); // إنشاء مرجع
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClickMyProfileX(); // تنفيذ وظيفة الإغلاق عند النقر خارج المودال
        }
    };
    return (
        <>
            <div onClick={(e) => {
                handleClickOutside(e)
            }}
                 className={`${showModal ? 'transition-all duration-[0.3s] ease-[ease-in-out] delay-[0s]  left-[-100%] top-0' :
                     'transition-all duration-[0.9s] ease-[ease-in-out] delay-[0s] left-[200%] top-0'} absolute w-[200%] 
                     h-screen z-[99999] backdrop-blur-[5.5px]`}>

                <div
                    style={{width: width, height: height, top: top, left: showModal ? left : '100%'}}
                    ref={modalRef}
                    className={
                    `${showModal ? `transition-all duration-[0.5s] ease-[ease-in-out] delay-[0s]` 
                        : 'transition-all duration-[1s] ease-[ease-in-out] delay-[0s]'} 
                        absolute bg-white rounded-[23.3px] shadow-[2px_10px_20px_5px_#0000000d,-2px_-5px_20px_5px_#0000000d]
                        z-[999999999999999] flex flex-col flex-nowrap justify-center justify-items-center content-center items-center`}>

                    <div className={`w-[${width1}] h-[${height}] flex flex-col flex-nowrap justify-start justify-items-start items-start content-start px-[1.5%] py-[2vh]`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default BackDropFilterModal