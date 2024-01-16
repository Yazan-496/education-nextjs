"use client"
import * as React from 'react';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form"
import {Form, FormGroup, Input, Label} from "reactstrap"
import {TextField} from "@mui/material";
import { makeStyles } from '@mui/styles';
import {_createUser, _editUser} from "/store/actions/auth";
import {useRouter} from "next/navigation";
import ImageUpload from "/components/@core/common/ImageUpload";
import Select from "react-select";
import ButtonClose from "/components/@core/Elements/ButtonClose";
import ButtonSave from "/components/@core/Elements/ButtonSave";
import {selectColourStyles222} from "/helpers/Utils";
import BackDropFilterModal from "/components/@core/BackDropFilterModal";

const UserLogo = ({user}) => {
    const router = useRouter()
    const {t, i18n} = useTranslation("translation");
    const useStyles = makeStyles({
        textField: {
            direction: i18n?.translator?.language === 'ar' ? 'rtl' : i18n?.translator?.language === 'fa' ? 'rtl' : 'ltr',
            border: '0.1vh solid #7C7C7C9E',
            '& .MuiOutlinedInput-root:focus-visible': {
                backgroundColor: '#ffffff !important'
            },
            '& .MuiOutlinedInput-root': {
                border: '0.1vh solid #7C7C7C9E',
                height: '6vh',
                backgroundColor: '#FFFFFF !important',
                fontSize: '1.8vh',
                padding: '0',
                borderRadius: '1vh',
                lineHeight: '2vh',
                '&:hover': {
                    border: '0.1vh solid #447FF1AA',
                },
                '&.Mui-focused': {
                    border: '0 solid #4476F154',
                    boxShadow: 'none',
                },
                '& fieldset': {
                    borderWidth: 0,
                },
                '&.Mui-disabled': {
                    opacity: '1',
                },
            },
            '& .MuiOutlinedInput-input': {
                border: 'none !important',
                height: '5.5vh !important',
                width: '100%',
                fontSize: '1.8vh !important',
                padding: '0 1vh !important',
                borderRadius: '1vh !important',
                lineHeight: '2vh !important',
                '&:hover': {
                    border: 'none !important',
                },
                '&.Mui-focused': {
                    border: 'none !important',
                    boxShadow: 'none !important',
                },
                '& fieldset': {
                    borderWidth: '2vh !important',
                    backgroundColor: '#00000000 !important',
                    width : 'auto !important',
                    margin: '0 1vh !important',
                },
                '&.Mui-disabled': {
                    opacity: '1 !important',
                },
            },
            '& .MuiInputLabel-root': {
                textAlign: i18n?.translator?.language === 'ar' ? 'right !important' : i18n?.translator?.language === 'fa' ? 'right !important' : 'left !important',
                fontSize: '2vh !important',
                color: 'rgba(68,118,241,0.88) !important',
                backgroundColor: 'rgb(255,255,255) !important',
                maxWidth : '100px !important',
                minWidth : '10px !important',
                width : 'auto !important',
                padding: '0 0.3vh !important',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                textAlign: i18n?.translator?.language === 'ar' ? 'right !important' : i18n?.translator?.language === 'fa' ? 'right !important' : 'left !important',
            },
            '& .MuiFormLabel-root-MuiInputLabel-root': {
                maxWidth : '100px !important',
                minWidth : '10px !important',
                width : 'auto !important',
            },
            '& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                maxWidth : '100px !important',
                minWidth : '10px !important',
                width : 'auto !important',
                color: 'red !important',
                // padding: '0 !important'
            },
            '& .MuiFormLabel-root': {
                textAlign: i18n?.translator?.language === 'ar' ? 'right !important' : i18n?.translator?.language === 'fa' ? 'right !important' : 'left !important',
                transformOrigin: i18n?.translator?.language === 'ar' ? 'top right !important' : i18n?.translator?.language === 'fa' ? 'top right !important' : 'top left !important',
                right: i18n?.translator?.language === 'ar' ? '3vh !important' : i18n?.translator?.language === 'fa' ? '3vh !important' : '',
                left: i18n?.translator?.language === 'ar' ? '' : i18n?.translator?.language === 'fa' ? '' : 0,
                top: '0 !important',
                maxWidth : '200px !important',
                minWidth : '10px !important',
                width : 'auto !important',
            },
        },
    });
    const classes = useStyles();
    const [showMyProfile, setShowMyProfile] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    async function _getData() {
        return await user
    }
    const {register, handleSubmit, watch, control, setValue, formState: {errors}, clearErrors, reset} = useForm({
        defaultValues: async () => {
            const data = await _getData()
            return {
                name: data?.name || "",
                email: data?.email || "",
                password: data?.real || "",
                confirmPassword: data?.real || "",
                role: {
                    label:data?.role?.name,
                    value:data?.role?.id
            } || null,
            }
        }
    });
    const formRules = {
        name: {
            required: t("user.user_name_is_required"),
            minLength: {
                value: 4,
                message: t("user.user_name_must_be_at_least_4_characters")
            }
        },
        email: {
            required: t("user.user_email_is_required"),
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("user.invalid_email_address")
            }
        },
        password: {
            required: t("user.user_password_is_required"),
            minLength: {
                value: 8,
                message: t("user.password_must_be_at_least_8_Characters")
            }
        },
        confirmPassword: {
            required: t("user.password_not_match"),
        },
        role: {
            required: t("user.user_role_is_required"),
        },
    }
    useEffect(() => {
        // console.log(user, "user")
        clearErrors()
        reset()
    }, [user])
    const onSubmit = (data) => {
        _editUser({
            ...data,
            id: user?.id,
            photo: image
        }, res => {
            setShowMyProfile(false)
            reset()
            router.refresh()
        }, (err) => {
        })
    }
    const handleClickMyProfile = () => {
        setShowMyProfile(true)
    }
    const handleClickMyProfileX = () => {
        setShowMyProfile(false)
    }
    const handleClickSettingsX = () => {
        setShowSettings(false)
    }
    const handleClickSettingse = () => {
        setShowSettings(true)
    }
    const [image, setImage] = useState(user?.photo);
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_UPLOAD_IMAGE_URL}`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.photo) {
                        setImage(responseData.photo);
                    }
                } else {
                    // Handle error response from the server
                    console.error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    return  (
        <>
            <div className="relative inline-block text-right">
                <div className="group">
                    <button
                        className="p-2 gap-x-[.5vh] flex items-center justify-center rounded-full transition-transform transform hover:scale-105">
                        <div className="h-[6vh] p-[.5vh] w-[6vh]">
                            <img
                                className="h-full w-full  rounded-full"
                                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${user?.photo}`}
                                alt="User profile image"
                            />
                        </div>
                    </button>
                    <div className="bg-[transparent] w-[32vh] h-[30vh] invisible border-[0px] duration-200 transform origin-top-right absolute right-0 group-hover:visible group-hover:scale-100">
                        <div className="fixed w-[32vh] h-[30vh] top-0 left-0 bg-[transparent]">
                            <div className="relative w-[32vh] h-[30vh] bg-[transparent]">
                                <div className="absolute w-[32vh] h-[21.5vh] top-[4vh] left-px bg-white rounded-[3vh] shadow-[2px_10px_20px_5px_#0000000d]" />
                                <div className="absolute w-[8vh] h-[8vh] top-0 left-[12vh] bg-[#00b884] rounded-full shadow-[2px_2px_6px_1px_#0000001a]" />
                                <img
                                    className="absolute w-[7.5vh] h-[7.5vh] top-[0.25vh] rounded-full left-[12.25vh] object-cover"
                                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${user?.photo}`}
                                    alt="User profile image"
                                />
                                <div className="absolute w-[32vh] h-[3vh] top-[9vh] left-0 [font-family:'Poppins-Bold',Helvetica] text-[#515151cf] font-[800] text-[1.8vh] text-center tracking-[0] leading-[2.5vh] whitespace-nowrap">
                                    {user?.name}
                                </div>
                                <div className="absolute w-[32vh] h-[3vh] top-[11.5vh] left-0 [font-family:'Poppins-Medium',Helvetica] text-[#707070cf] font-[600] text-[1.6vh] text-center tracking-[0] leading-[2.5vh] whitespace-nowrap">
                                    {user?.email}
                                </div>
                                <div className="absolute w-[32vh] h-[0.1vh] bg-[#bebebe4d] top-[14.5vh] left-0 object-cover"></div>
                                <div className="absolute w-[32vh] h-[11vh] top-[14.6vh] left-0">
                                    <div className="pointer absolute flex justify-center items-center w-[32vh] h-[3vh] top-[0.5vh] left-0 [font-family:'Poppins-Medium',Helvetica] text-[#4576ede3] text-[1.8vh] font-[700] tracking-[0] leading-[2.5vh] whitespace-nowrap">

                                        <svg width="2.5vh" height="2.5vh" className="pr-[1vh]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.5 17.575H17.599L17.5722 17.4797C17.5355 17.3494 17.436 17.2157 17.2959 17.0833C17.1544 16.9495 16.9647 16.8106 16.7364 16.671C16.2797 16.3916 15.6615 16.1048 14.9474 15.8467C13.5194 15.3304 11.6981 14.925 10 14.925C8.30815 14.925 6.4963 15.3272 5.07139 15.842C4.35883 16.0994 3.74067 16.3857 3.28129 16.6656C3.05167 16.8055 2.86003 16.9448 2.71576 17.0793C2.57276 17.2126 2.47025 17.3467 2.42856 17.4772L2.39731 17.575H2.5H17.5ZM12.575 5C12.575 3.58358 11.4164 2.425 10 2.425C8.58358 2.425 7.425 3.58358 7.425 5C7.425 6.41642 8.58358 7.575 10 7.575C11.4164 7.575 12.575 6.41642 12.575 5ZM5.075 5C5.075 2.27892 7.27892 0.075 10 0.075C12.7211 0.075 14.925 2.27892 14.925 5C14.925 7.72108 12.7211 9.925 10 9.925C7.27892 9.925 5.075 7.72108 5.075 5ZM0.075 17.5C0.075 16.6963 0.477012 15.9868 1.14403 15.3711C1.81156 14.755 2.7395 14.2381 3.77633 13.8227C5.85011 12.992 8.34063 12.575 10 12.575C11.6594 12.575 14.1499 12.992 16.2237 13.8227C17.2605 14.2381 18.1884 14.755 18.856 15.3711C19.523 15.9868 19.925 16.6963 19.925 17.5V19.925H0.075V17.5Z"
                                                fill="#4576ede3"
                                                stroke="white"
                                                stroke-width="0.15"/>
                                        </svg>
                                        <div onClick={() => handleClickMyProfile()}>{t("nav.my_Profile")}</div>
                                    </div>
                                    <div className="absolute w-[20vh] h-[0.1vh] bg-[#bebebe4d] top-[3.5vh] left-[6vh] object-cover"></div>
                                    <div className="pointer absolute flex justify-center items-center w-[32vh] h-[3vh] top-[4vh] left-0 [font-family:'Poppins-Medium',Helvetica] text-[#4576ede3] text-[1.8vh] font-[700] tracking-[0] leading-[2.5vh] whitespace-nowrap">

                                        <svg width="2.5vh" height="2.5vh" className="pr-[1vh]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.6205 20H7.87045C7.62045 20 7.40379 19.9167 7.22045 19.75C7.03712 19.5833 6.92879 19.375 6.89545 19.125L6.59545 16.8C6.37879 16.7167 6.17445 16.6167 5.98245 16.5C5.79045 16.3833 5.60312 16.2583 5.42045 16.125L3.24545 17.025C3.01212 17.1083 2.77879 17.1167 2.54545 17.05C2.31212 16.9833 2.12879 16.8417 1.99545 16.625L0.145455 13.4C0.0121212 13.1833 -0.0295455 12.95 0.0204545 12.7C0.0704545 12.45 0.195455 12.25 0.395455 12.1L2.27045 10.675C2.25379 10.5583 2.24545 10.4457 2.24545 10.337V9.663C2.24545 9.55433 2.25379 9.44167 2.27045 9.325L0.395455 7.9C0.195455 7.75 0.0704545 7.55 0.0204545 7.3C-0.0295455 7.05 0.0121212 6.81667 0.145455 6.6L1.99545 3.375C2.11212 3.14167 2.29112 2.99567 2.53245 2.937C2.77379 2.87833 3.01145 2.891 3.24545 2.975L5.42045 3.875C5.60379 3.74167 5.79545 3.61667 5.99545 3.5C6.19545 3.38333 6.39545 3.28333 6.59545 3.2L6.89545 0.875C6.92879 0.625 7.03712 0.416667 7.22045 0.25C7.40379 0.0833333 7.62045 0 7.87045 0H11.6205C11.8705 0 12.0871 0.0833333 12.2705 0.25C12.4538 0.416667 12.5621 0.625 12.5955 0.875L12.8955 3.2C13.1121 3.28333 13.3165 3.38333 13.5085 3.5C13.7005 3.61667 13.8878 3.74167 14.0705 3.875L16.2455 2.975C16.4788 2.89167 16.7121 2.88333 16.9455 2.95C17.1788 3.01667 17.3621 3.15833 17.4955 3.375L19.3455 6.6C19.4788 6.81667 19.5205 7.05 19.4705 7.3C19.4205 7.55 19.2955 7.75 19.0955 7.9L17.2205 9.325C17.2371 9.44167 17.2455 9.55433 17.2455 9.663V10.337C17.2455 10.4457 17.2288 10.5583 17.1955 10.675L19.0705 12.1C19.2705 12.25 19.3955 12.45 19.4455 12.7C19.4955 12.95 19.4538 13.1833 19.3205 13.4L17.4705 16.6C17.3371 16.8167 17.1495 16.9627 16.9075 17.038C16.6655 17.1133 16.4281 17.109 16.1955 17.025L14.0705 16.125C13.8871 16.2583 13.6955 16.3833 13.4955 16.5C13.2955 16.6167 13.0955 16.7167 12.8955 16.8L12.5955 19.125C12.5621 19.375 12.4538 19.5833 12.2705 19.75C12.0871 19.9167 11.8705 20 11.6205 20ZM9.79545 13.5C10.7621 13.5 11.5871 13.1583 12.2705 12.475C12.9538 11.7917 13.2955 10.9667 13.2955 10C13.2955 9.03333 12.9538 8.20833 12.2705 7.525C11.5871 6.84167 10.7621 6.5 9.79545 6.5C8.81212 6.5 7.98279 6.84167 7.30745 7.525C6.63212 8.20833 6.29479 9.03333 6.29545 10C6.29545 10.9667 6.63279 11.7917 7.30745 12.475C7.98212 13.1583 8.81145 13.5 9.79545 13.5ZM9.79545 11.5C9.37879 11.5 9.02446 11.354 8.73246 11.062C8.44046 10.77 8.29479 10.416 8.29545 10C8.29545 9.58333 8.44145 9.229 8.73345 8.937C9.02545 8.645 9.37945 8.49933 9.79545 8.5C10.2121 8.5 10.5665 8.646 10.8585 8.938C11.1505 9.23 11.2961 9.584 11.2955 10C11.2955 10.4167 11.1495 10.771 10.8575 11.063C10.5655 11.355 10.2115 11.5007 9.79545 11.5ZM8.74545 18H10.7205L11.0705 15.35C11.5871 15.2167 12.0665 15.0207 12.5085 14.762C12.9505 14.5033 13.3545 14.191 13.7205 13.825L16.1955 14.85L17.1705 13.15L15.0205 11.525C15.1038 11.2917 15.1621 11.046 15.1955 10.788C15.2288 10.53 15.2455 10.2673 15.2455 10C15.2455 9.73333 15.2288 9.471 15.1955 9.213C15.1621 8.955 15.1038 8.709 15.0205 8.475L17.1705 6.85L16.1955 5.15L13.7205 6.2C13.3538 5.81667 12.9498 5.496 12.5085 5.238C12.0671 4.98 11.5878 4.784 11.0705 4.65L10.7455 2H8.77045L8.42045 4.65C7.90379 4.78333 7.42479 4.97933 6.98345 5.238C6.54212 5.49667 6.13779 5.809 5.77045 6.175L3.29545 5.15L2.32045 6.85L4.47045 8.45C4.38712 8.7 4.32879 8.95 4.29545 9.2C4.26212 9.45 4.24545 9.71667 4.24545 10C4.24545 10.2667 4.26212 10.525 4.29545 10.775C4.32879 11.025 4.38712 11.275 4.47045 11.525L2.32045 13.15L3.29545 14.85L5.77045 13.8C6.13712 14.1833 6.54145 14.5043 6.98345 14.763C7.42545 15.0217 7.90446 15.2173 8.42045 15.35L8.74545 18Z"
                                                fill="#4576ede3"/>
                                        </svg>
                                        <div onClick={() => handleClickSettingse()}>{t("nav.settings")}</div>
                                    </div>
                                    <div className="absolute w-[20vh] h-[0.1vh] bg-[#bebebe4d] top-[7vh] left-[6vh] object-cover"></div>
                                    <div className="pointer absolute flex justify-center items-center w-[32vh] h-[3vh] top-[7.5vh] left-0 [font-family:'Poppins-Medium',Helvetica] text-[#FF0BE5bf] text-[1.8vh] font-[700] tracking-[0] leading-[2.5vh] whitespace-nowrap">

                                        <svg width="2.5vh" height="2.5vh" className="pr-[1vh]" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.75 2.66667L8.8335 3.60667L10.5105 5.33333H3.9V6.66667H10.5105L8.8335 8.38667L9.75 9.33333L13 6L9.75 2.66667ZM1.3 1.33333H6.5V0H1.3C0.585 0 0 0.6 0 1.33333V10.6667C0 11.4 0.585 12 1.3 12H6.5V10.6667H1.3V1.33333Z"
                                                fill="#FF0BE5bf"
                                            />
                                        </svg>
                                        <a href="/signin">{t("nav.sign_out")}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*onBlur={() => {handleClickMyProfileX()}}*/}
            <BackDropFilterModal
                left={'80.5%'}
                width={'20%'}
                width1={'100%'}
                top={'10vh'}
                height={'80vh'}
                showModal={showMyProfile}
                handleClickMyProfileX={handleClickMyProfileX}
            >
                <Form className="w-[100%] h-[77.8vh] p-[1vh]" onSubmit={handleSubmit(onSubmit)}>
                    <div className={`w-[100%] h-[4vh] z-[999999999999999] bg-[#FFFFFF] top-0 sticky absolute flex flex-row flex-nowrap justify-start justify-items-start items-start content-start font-bold text-[2vh] text-[#376beabf] mt-0 mb-0 mx-0 p-0`}>
                        {(i18n?.translator?.language === 'ar' || i18n?.translator?.language === 'fa') &&
                        <>
                            <div className="w-[50%] h-[4vh] flex flex-row flex-nowrap justify-start justify-items-start items-start content-start font-bold text-[#D31400B5] text-[2vh] mt-0 mb-0 mx-0 p-0 pointer">

                                <ButtonClose onClick={handleClickMyProfileX} text={t("user.close")}/>
                                <ButtonSave text={t("user.save")} type={'submit'}/>
                            </div>
                            <div className=" w-[50%] h-[4vh] flex flex-row flex-nowrap justify-end justify-items-end items-start content-start font-bold text-[2vh] text-[#376beabf] mt-0 mb-0 mx-0 p-0">
                                {t("nav.my_Profile")}
                            </div>
                        </>
                        }
                        {(i18n?.translator?.language === 'en' || i18n?.translator?.language === 'ru') &&
                        <>
                            <div className=" w-[50%] h-[4vh] flex flex-row flex-nowrap justify-start justify-items-start items-start content-start font-bold text-[2vh] text-[#376beabf] mt-0 mb-0 mx-0 p-0">
                                {t("nav.my_Profile")}
                            </div>
                            <div className="w-[50%] h-[4vh] flex flex-row flex-nowrap justify-end justify-items-end items-start content-start font-bold text-[#D31400B5] text-[2vh] mt-0 mb-0 mx-0 p-0 pointer">

                                <ButtonClose onClick={handleClickMyProfileX} text={t("user.close")}/>
                                <ButtonSave text={t("user.save")} type={'submit'}/>
                            </div>
                        </>
                        }
                    </div>
                    <div
                        className={' relative h-[auto] w-full bg-transparent flex flex-col justify-start items-start content-start m-0'}>
                        <div className="w-full h-full pt-[2vh]">
                            <div
                                className='w-[100%] h-full relative bg-[#FFFFFF] rounded-[2vh]  flex-col'>
                                <ImageUpload imageState={image} onChange={(base64Image) => setImage(base64Image)}/>
                                <FormGroup className={'relative h-auto w-auto p-[1vh] mt-[2vh]'}>
                                    <Controller
                                        type={"text"}
                                        name={`name`}
                                        id={`name`}
                                        className="h-[7vh] mb-[1vh]"
                                        control={control}
                                        ref={register}
                                        rules={formRules?.name}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                id="outlined-textarea"
                                                label={t("user.name")}
                                                placeholder={t("user.enter_user_name")}
                                                onChange={onChange}
                                                value={value}
                                                className={`${classes.textField} h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: i18n?.translator?.language === 'ar' ? 'flex-end' : i18n?.translator?.language === 'fa' ? 'flex-end' : 'flex-start',
                                            textAlign: i18n?.translator?.language === 'ar' ? 'right' : i18n?.translator?.language === 'fa' ? 'right' : 'left'
                                        }}
                                        className="text-red-500">{errors?.name && errors.name.message}</small>
                                </FormGroup>
                                <FormGroup className={'relative h-auto w-auto p-[1vh] mt-[2vh]'}>
                                    <Controller
                                        className="h-[7vh] mb-[2vh]"
                                        name={`email`}
                                        id={`email`}
                                        control={control}
                                        ref={register}
                                        // defaultValue={rowData?.email || null}
                                        rules={formRules?.email}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                id="outlined-textarea"
                                                label={t("user.email")}
                                                placeholder={t("user.enter_user_email")}
                                                value={value}
                                                onChange={onChange}
                                                className={`${classes.textField} h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: i18n?.translator?.language === 'ar' ? 'flex-end' : i18n?.translator?.language === 'fa' ? 'flex-end' : 'flex-start',
                                            textAlign: i18n?.translator?.language === 'ar' ? 'right' : i18n?.translator?.language === 'fa' ? 'right' : 'left'
                                        }}
                                        className="text-red-500">{errors?.email && errors.email.message}</small>
                                </FormGroup>
                                <FormGroup className={'relative h-auto w-auto  p-[1vh] m-0'}>
                                    <Controller
                                        className="h-[7vh] mb-[2vh]"
                                        name={`password`}
                                        id={`password`}
                                        control={control}
                                        ref={register}
                                        rules={formRules?.password}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                id="outlined-textarea"
                                                label={t("user.password")}
                                                placeholder={t("user.enter_user_password")}
                                                value={value}
                                                onChange={onChange}
                                                className={`${classes.textField} h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: i18n?.translator?.language === 'ar' ? 'flex-end' : i18n?.translator?.language === 'fa' ? 'flex-end' : 'flex-start',
                                            textAlign: i18n?.translator?.language === 'ar' ? 'right' : i18n?.translator?.language === 'fa' ? 'right' : 'left'
                                        }}
                                        className="text-red-500">{errors?.password && errors.password.message}</small>
                                </FormGroup>
                                <FormGroup className={'relative h-auto w-auto  p-[1vh] m-0'}>
                                    <Controller
                                        className="h-[7vh] mb-[2vh]"
                                        name={`confirmPassword`}
                                        id={`confirmPassword`}
                                        control={control}
                                        ref={register}
                                        rules={{
                                            validate: (value) => value === watch('password') || t("user.password_not_match")
                                        }}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                id="outlined-textarea"
                                                label={t("user.confirm_password")}
                                                placeholder={t("user.confirm_password_")}
                                                value={value}
                                                onChange={onChange}
                                                className={`${classes.textField} h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: i18n?.translator?.language === 'ar' ? 'flex-end' : i18n?.translator?.language === 'fa' ? 'flex-end' : 'flex-start',
                                            textAlign: i18n?.translator?.language === 'ar' ? 'right' : i18n?.translator?.language === 'fa' ? 'right' : 'left'
                                        }}
                                        className="text-red-500">{errors?.confirmPassword && errors.confirmPassword.message}</small>
                                </FormGroup>
                                <FormGroup className={'relative h-auto w-auto p-[1vh] m-0'}>
                                    <Controller
                                        name={`role`}
                                        id={`role`}
                                        control={control}
                                        ref={register}
                                        rules={formRules?.role}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <Select
                                                isDisabled={true}
                                                value={value}
                                                placeholder={t("user.select_user_role")}
                                                onChange={(onChange)}
                                                styles={selectColourStyles222}
                                                className='h-[6vh] hover:border-primary-600'
                                            />
                                        )}
                                    />
                                    <small
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: i18n?.translator?.language === 'ar' ? 'flex-end' : i18n?.translator?.language === 'fa' ? 'flex-end' : 'flex-start',
                                            textAlign: i18n?.translator?.language === 'ar' ? 'right' : i18n?.translator?.language === 'fa' ? 'right' : 'left'
                                        }}
                                        className="text-red-500">{errors?.role && errors.role.message}</small>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </Form>
            </BackDropFilterModal>
            <BackDropFilterModal
                left={'25%'}
                width={'60%'}
                width1={'100%'}
                header={t("nav.settings")}
                showModal={showSettings}
                handleClickMyProfileX={handleClickSettingsX}
            >

            </BackDropFilterModal>
        </>
    );
};
export default UserLogo;