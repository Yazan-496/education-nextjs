"use client"
import {useEffect, useState} from "react";
import {ArrowSvg} from "components/@core/svgs"
import SideBarContent from "./SideBarContent"

const SideBar = () => {
    const [closed, setClosed] = useState(true)
    useEffect(() => {
        // setClosed(false)
    }, [])
    return (
        <div
            // onMouseEnter={() => setClosed(false)}
            // onMouseLeave={() => setClosed(true)}
            className={`bg-[#ebf0fa] sticky h-[93vh] bottom-0 left-0 flex ${!closed ? "w-[20%] " : "w-[7%]"} transition-width  duration-1000   `}
        >
            <div
                className="bg-white w-[20vw] border border-[0.3vh]  border-l-0 shadow-[2vh] rounded-[1vh] py-[5vh] flex items-start justify-center">
                <SideBarContent closed={closed}/>
            </div>
                <div
                    className="cursor-pointer w-[3vh] h-[5vh] p-[0.5vh] border border-[0.3vh] border-l-0 shadow-[2vh]  rounded-br-[2vh] rounded-tr-[2vh] bg-white relative top-[6vh] flex items-center justify-center text-center right-[0.4vh]"
                    onClick={() => setClosed(!closed)}
                ><ArrowSvg width={'3vh'} height={"5vh"} rotate={!closed}/>
                </div>
        </div>
    )
}
export default SideBar