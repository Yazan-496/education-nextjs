import LanguageDropDown from "../../@core/Language/LanguageDropDown";
import {TransServer} from "../../@core/Language/TransServer";
import Cookies from "js-cookie";
import React from "react";
import {handleAction} from "next/dist/server/app-render/action-handler";
import UserLogo from "/components/Pages/UserLogo";

const NavBar = ({user}) => {

    return (
        <div className="shadow-vh-xl z-10 h-[7vh] sticky top-0 items-center px-[2vh] flex justify-between border-[0.3vh] border-l-0 rounded-[.8vh] py-[2vh]">
            <div className="w-[30%]">Logo</div>
            <div className="relative w-[70%] flex items-center justify-end gap-x-[4vh]">
                <div className=" text-[1.7vh]">
                    <LanguageDropDown/>
                </div>
                {user && (
                    <UserLogo user={user}/>
                )}

            </div>
        </div>
    )
}
export default NavBar