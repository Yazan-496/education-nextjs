import {TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader} from "tw-elements-react";
import React from "react";

const ModalComponent = ({openModal, _openModal, _closeModal, edit, title, children, fullScreen, isClose}) => {
    return (
            <TEModal className="backdrop-blur-[5.5px] bg-transparent overflow-y-hidden" show={openModal} setShow={_openModal}>
                <TEModalDialog
                    size={fullScreen ? "fullscreen" : ""}
                    className={`h-full right-0 ${fullScreen ? " min-w-[100vw]" : " min-w-[90vw]"} min-h-[100vh] duration-150`}
                    position="top-right"
                    theme={{
                        show: "translate-x-0 opacity-100",
                        hidden: "translate-x-[100%] opacity-0",
                    }}>
                    <TEModalContent
                        className="h-full w-[100vw]">
                        <TEModalHeader className={''}>
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                {title}
                            </h5>
                            {isClose && <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={_closeModal}
                                aria-label="Close"
                            >
                                X
                            </button>}
                        </TEModalHeader>
                        <TEModalBody className="overflow-y-hidden p-0">
                            {children}
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
    )
}
export default ModalComponent