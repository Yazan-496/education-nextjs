"use client"
import Link from "next/link"
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useTranslation} from "react-i18next";
import CanCall from "../../@core/config/acl/CanCall";
import Cookies from "js-cookie";
import {log} from "next/dist/server/typescript/utils";


const SideBarContent = ({closed}) => {
    const {t, i18n} = useTranslation("translation");
    const Navigation = [
        {
            name: <i className='bx font-[700] text-blue-700 bx-user '/>,
            auth: false,
            children: [
                {
                    name: t("side_bar.users_management"),
                    icon: (<i className='bx bxs-user-plus bx-flashing'/>),
                    link: "/users",
                    selected: false,
                    action: "SHOW_USERS"
                },
                {
                    name: t("user.logout"),
                    icon: <i className='bx bx-cog bx-log-out'/>,
                    link: "/logout",
                    selected: false,
                    action: "NoPermissionCode"
                }
            ],
            action: "NoPermissionCode"
        },
        {
            name: <i className='bx  font-[700] text-blue-700 bx-home-alt-2'/>,
            auth: true,
            children: [{
                name: t("side_bar.dashboard"),
                icon: <i className='bx bxs-dashboard bx-flashing'/>,
                link: "/",
                selected: false,
                action: "NoPermissionCode"
            }, {
                name: t("side_bar.setting"),
                icon: <i className='bx bx-cog bx-flashing'/>,
                link: "/setting",
                selected: false,
                action: "NoPermissionCode"
            }],
            action: "NoPermissionCode"
        },
        {
            name: <i className='bx  font-[700] text-blue-700 bxl-redux'/>,
            auth: true,
            children: [{
                name: t("side_bar.quizzes_management"),
                icon: <i className='bx bx-list-plus bx-flashing'/>,
                link: "/quizzes",
                selected: false,
                action: "NoPermissionCode"
            }],
            action: "NoPermissionCode"
        }]
    const pathName = usePathname()
    const [closedTime, setClosedTime] = useState(false)
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        if (counter === 0) {
            setCounter(counter + 1)
        } else {
            if (!closed) {
                setTimeout(() => {
                    setClosedTime(!closedTime)
                }, 500)
            } else {
                setClosedTime(!closedTime)
            }
        }
    }, [closed])
    const [navItems, setNavItems] = useState(Navigation)
    const handleChangeRoute = (navName) => {
        const updatedNavItems = navItems.map((item) => {
            const updatedItem = {...item};
            updatedItem.children = item.children.map((child) => {
                const updatedChild = {...child};
                updatedChild.selected = child.link === navName;
                return updatedChild;
            });
            return updatedItem;
        });
        setNavItems(updatedNavItems);
    };
    useEffect(() => {
        handleChangeRoute(pathName)
    }, [pathName])
    return (
        <div className=" flex w-full items-center justify-center flex-col">
            {navItems?.map((group, i) => {
                return (
                    <CanCall key={i} action={group.action}>
                        <div key={i} className="w-full flex flex-col justify-center">
                            <h1 className="font-[700] w-full mt-[.5vh] text-[2.2vh] text-center">{group.name}</h1>
                            {group.children?.map((nav, i) => {
                                return (
                                    <CanCall key={i} action={nav.action}>
                                        <Link
                                            // onClick={() => handleChangeRoute(nav.name)}
                                            className={`${nav.selected ? "bg-green-100 text-blue-500 shadow-2xl-vh" : "bg-transparent text-black"}
                                 rounded-tr-[2vh] rounded-br-[2vh] w-[90%] flex items-center ${!closedTime ? "justify-center" : "justify-start"}`}
                                            key={i} href={nav.link}>
                                            {nav.selected &&
                                            <div
                                                className="ml-[.5vh] h-[4vh] border-[.3vh] rounded-xl border-blue-500"/>}
                                            <div
                                                className={`
                                     p-[1vh] flex items-center justify-start gap-x-[2vh]`}>
                                                <div className="text-[2vh]">{nav?.icon}</div>
                                                {closedTime && <div
                                                    className={`text-[1.5vh]`}>
                                                    {nav.name}
                                                </div>}
                                            </div>
                                        </Link>
                                    </CanCall>
                                )
                            })}
                            <div className="border-t-[.2vh] border-gray-200 w-full px-[1.8vh]"/>
                        </div>
                    </CanCall>
                )
            })}
        </div>
    )
}
export default SideBarContent