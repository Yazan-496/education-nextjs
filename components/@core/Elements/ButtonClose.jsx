import React from "react";
import CanCall from "../config/acl/CanCall";

const ButtonClose = ({onClick, text, className, action, ...rest}) => {
    return action ? (
        <CanCall action={action}>
        <button
            type="button"
            className={`${className} inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium
                uppercase leading-normal text-red-500 border border-red-500 transition duration-150 ease-in-out
                hover:bg-red-50 focus:bg-danger-100 focus:outline-none focus:ring-0
                shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out
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
            type="button"
            className={`${className} inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium
                uppercase leading-normal text-red-500 border border-red-500 transition duration-150 ease-in-out
                hover:bg-red-50 focus:bg-danger-100 focus:outline-none focus:ring-0
                shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out
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
    )
}
export default ButtonClose