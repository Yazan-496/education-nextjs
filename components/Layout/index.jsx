import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({user, children}) => {
    return (
        <div className="bg-white">
            <NavBar user={user}/>
            <div className="flex flex-row h-[93vh] overflow-hidden">
                {<SideBar/>}
                <main className="bg-[#ebf0fa] transition-width overflow-auto duration-500 h-[93vh] w-auto flex-1">
                    <div className="flex flex-col h-full">
                        {children}
                    </div>
                </main>
            </div>

        </div>
    );
};

export default Layout;
