import React from "react";
import CanCall from "../config/acl/CanCall";

const ButtonAdd = ({onClick, text, type, className, action, ...rest}) => {
    return action ? (
        <CanCall action={action}>
            <button
                type={type || "button"}
                className={`${className}  ml-1 text-green-700  border border-green-500 rounded
                                            px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:text-white
                                            shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-success-600
                                            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                                            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                                             focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                                              dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                                               dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                                               dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                onClick={onClick}
                {...rest}
            >
                {text}
            </button>
        </CanCall>
    ) : (
        <button
            style={{
                background: '#ffffffff',
                color: '#376beabf'
            }}
            type={type || "button"}
            className={`${className}  ml-1 border border-green-500 rounded
                                            px-[1.5vh] py-[0.7vh] font-[600] text-[1.5vh] uppercase leading-normal hover:text-white
                                            shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-600
                                            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                                            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                                             focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                                              dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                                               dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                                               dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
            onClick={onClick}
            {...rest}
        >
            {text}
        </button>
    )
}
export default ButtonAdd