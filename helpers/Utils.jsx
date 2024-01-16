import {toast} from "react-toastify";
import React from "react";
import Swal from "sweetalert2";
import Select, {components} from "react-select";
import {Form} from "react-bootstrap";

export const _toast = (type, message) => {
    switch (type) {
        case "Primary":
            toast.success(
                <p className="text-white tx-16 mb-0">{message}</p>,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored'
                }
            );
            break;
        case "Success":
            toast.success(
                <p className="text-white tx-16 mb-0">{message}</p>,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored'
                }
            );
            break;
        case "Error":
            toast.error(
                <p className="text-white tx-16 mb-0">{message}</p>,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',

                }
            );
            break;
        case "Warning":
            toast.warn(
                <p className="text-white tx-16 mb-0">{message}</p>,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',
                }
            );
            break;
        case "Info":
            toast.info(
                <p className="text-white tx-16 mb-0">{message}</p>,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',
                }
            );
            break;
        case "FixedError":
            toast.error(
                <p className="text-white tx-16 mb-0"><h3>Error!</h3>{message}</p>,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',
                }
            );
            break;
    }
}

export const SWalToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// using SWalToast
// SWalToast.fire({
//     icon: 'success',
//     title: 'Successfully Updated'
// })


export const selectColourStyles222 = {
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            zIndex: 99999999,
            textAlign: 'left',
        };
    },
    indicatorsContainer: (styles) => {
        return {
            ...styles,
            borderRadius: "1vh",
            cursor: "pointer",
        }
    },
    container: (styles) => {
        return {
            ...styles,
            borderBottomRightRadius: "5px",
            textAlign: 'left',
            height: '6vh !important',
            minHeight: '6vh !important',
            maxHeight: '6vh !important',
            width: '100% !important',
            fontFamily: 'Roboto, sans-serif',
            borderRadius: '1vh !important',
        }
    },
    control: (styles) => {
        return {
            ...styles,
            borderBottomRightRadius: "5px",
            textAlign: 'left',
            height: '6vh !important',
            minHeight: '6vh !important',
            maxHeight: '6vh !important',
            width: '100% !important',
            fontFamily: 'Roboto, sans-serif',
            borderRadius: '1vh !important',
        }
    },
};
const _confirm = () => {
    Swal.fire({
        title: 'Are you Sure',
        text: "You won't able to revert it",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
}

export const selectColourStyles = {
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            zIndex: 9999999999999999,
        };
    },
    indicatorSeparator: (styles) => {
        return {
            ...styles,
            backgroundColor: "#025cd8",

        }
    },
    indicatorsContainer: (styles) => {
        return {
            ...styles,
            backgroundColor: "#025cd8",
            borderBottomRightRadius: "5px",
            cursor: "pointer",

        }
    },
};
export const selectColourStylesMulti = {
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
        };
    },
    indicatorSeparator: (styles) => {
        return {
            ...styles,
            backgroundColor: "#FFF",
            marginLeft: "2px"
        }
    },
    indicatorsContainer: (styles) => {
        return {
            ...styles,
            backgroundColor: "#025cd8",
            borderBottomRightRadius: "5px",
            cursor: "pointer",

        }
    },
};


export const getTokenFromLocalStorage = () => {
    try {
        return localStorage.getItem('token')
    } catch (error) {
        console.error(error);
        return null
    }
};
export const getUserDataFromLocalStorage = () => {
    try {
        return localStorage.getItem('UserData')
    } catch (error) {
        console.error(error);
        return null
    }
};
export const getAppDataFromLocalStorage = () => {
    try {
        return localStorage.getItem('AppData')
    } catch (error) {
        console.error(error);
        return null
    }
};

export const saveItemToLocalStorage = async (key, value) => {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
};
export const getItemFromLocalStorage = (item) => {
    try {
        return localStorage.getItem(item)
    } catch (error) {
        console.error(error);
        return null
    }
};
export const removeDataFromLocalStorage = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('UserData');
     localStorage.removeItem('CompanyId');
     localStorage.removeItem('CompanyPort');
};
export const DropdownIndicator = (props) => {
    return (
        <div>
            <components.DropdownIndicator {...props}>
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.408266 0.342228H9.25583L4.83205 4.76601L0.408266 0.342228Z" fill="#292D34"/>
                </svg>
            </components.DropdownIndicator>
        </div>

    );
};
export const customStyles = {
    container: (provided) => ({
        ...provided,
        height: '4vh',
        width: '100%',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
        fontSize: '1.45vh',
        color: '#292D34',
        textAlign: 'left',
        // padding: 0,
        margin: 0,
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '1.13vh',
        borderWidth:1,
        borderColor:'#d9d9d9',
        minHeight: '1px',
        height: '4vh',
        // padding: 0,
        margin: 0,
    }),
    input: (provided) => ({
        ...provided,
        height: '4vh',
        // padding: 0,
        margin: 0,
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingTop: '0',
        paddingBottom: '0',
        color: '#757575',
        // padding: 0,
        margin: 0,
    }),
    indicatorSeparator: (provided) => null,
    clearIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
        // padding: 0,
        margin: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        minHeight: '1px',
        height: '4vh',
        paddingTop: '0',
        paddingBottom: '0',
        // padding: 0,
        margin: 0,
    }),
    singleValue: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingBottom: '2px',
        // padding: 0,
        margin: 0,
    }),
};
export const customStyles222 = {
    container: (provided, {data, isDisabled, isFocused, isSelected}) => ({
        ...provided,
        height: '5vh',
        width: '100%',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: '1.45vh',
        color: '#292D34',
        textAlign: 'left',
        // padding: 0,
        // backdropColor: isFocused ? '#FFFFFF' : '#F5F5F5',
        margin: 0,
    }),
    control: (provided, {data, isDisabled, isFocused, isSelected}) => ({
        ...provided,
        // borderRadius: '0.5vh',
        borderWidth:1,
        fontSize: '1rem !important',
        borderColor: isFocused ? '#93C7F3FF !important' : '#ffffff !important',
        backgroundColor: isFocused ? '#FFFFFF !important' : '#F5F5F5 !important',
        border: isFocused ? '0.10rem solid #93C7F3FF !important': '0.10rem solid var(--white) !important',
        boxShadow: '0 !important',
        borderRadius: '.5rem !important',
        minHeight: '1px',
        height: '6vh !important',
        // padding: 0,
        margin: 0,
    }),
    input: (provided) => ({
        ...provided,
        height: '5vh',
        // padding: 0,
        margin: 0,
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingTop: '0',
        paddingBottom: '0',
        color: '#757575',
        // padding: 0,
        margin: 0,
    }),
    indicatorSeparator: (provided) => null,
    clearIndicator: (provided) => ({
        ...provided,
        minHeight: '1px',
        // padding: 0,
        margin: 0,
    }),
    valueContainer: (provided, {data, isDisabled, isFocused, isSelected}) => ({
        ...provided,
        minHeight: '1px',
        height: '5vh',
        paddingTop: '0',
        paddingBottom: '0',
        // padding: 0,
        paddingLeft: '5vh',
        backdropColor: isFocused ? '#FFFFFF !important' : '#F5F5F5 !important',
        margin: 0,
    }),
    singleValue: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingBottom: '2px',
        // padding: 0,
        margin: 0,
    }),
};
