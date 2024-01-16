'use client'
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form"
import {useRouter} from "next/navigation"
import {Form, FormGroup, Input, Label} from "reactstrap"
import {TEModalFooter} from "tw-elements-react";
import ButtonClose from "components/@core/Elements/ButtonClose";
import ButtonSave from "components/@core/Elements/ButtonSave";
import {_createUser, _editUser} from "store/actions/auth";
import Select from "react-select";
import {useTranslation} from "react-i18next";
import ImageUpload from "components/@core/common/ImageUpload";

const ManageModal = ({_closeModal, roles, rowData, isEdit}) => {
    const {t, i18n} = useTranslation("translation");
    const [image, setImage] = useState(rowData?.photo)
    const router = useRouter()

    async function _getData() {
        return await rowData
    }

    const {register, handleSubmit, watch, control, setValue, formState: {errors}, clearErrors, reset} = useForm({
        defaultValues: async () => {
            const data = await _getData()
            return {
                name: data?.name || "",
                email: data?.email || "",
                password: data?.real || "",
                confirmPassword: data?.real || "",
                role: data?.role || "",
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
        // console.log(rowData, "rowData")
        clearErrors()
        reset()
    }, [rowData])

    const onSubmit = (data) => {
        if (isEdit) {
            _editUser({
                ...data,
                id: rowData.id,
                photo: image
            }, res => {
                _closeModal()
                reset()
                router.refresh()
            }, (err) => {
            })
        } else {
            _createUser({...data, photo: image}, res => {
                _closeModal()
                reset()
                router.refresh()
            }, (err) => {
            })
        }
    }
    return (
        <Form className="w-[100%] h-full" onSubmit={handleSubmit(onSubmit)}>
            <div
                className={' relative h-full w-full bg-transparent flex flex-col justify-start items-start content-start m-0'}>
                <div className="w-full h-full p-[2vh]">
                    <div
                        className='w-[100%] h-full w-full relative bg-[#FFFFFF] py-[2vh] rounded-[2vh] shadow-vh-xl mb-[0vh] flex-col'>
                        <ImageUpload type={"user"} imageState={image} onChange={(base64Image) => setImage(base64Image)}/>
                        <FormGroup className={'relative h-auto w-auto p-[1vh] m-0'}>
                            <Label className="mb-[2vh]"
                                   style={{
                                       fontSize: '1.6vh',
                                       fontWeight: '600',
                                       color: '#4677ef'
                                   }}>{t("user.name")}</Label>
                            <Controller
                                type={"text"}
                                name={`name`}
                                id={`name`}
                                className="h-[7vh] mb-[2vh]"
                                control={control}
                                ref={register}
                                rules={formRules?.name}
                                render={({field: {onChange, onBlur, value, name, ref}}) => (
                                    <Input
                                        className="block focus:outline-none w-full h-[4vh] px-[2vh] text-[1.5vh] font-normal leading-5 text-gray-700
                                        bg-white bg-clip-padding-box border border-gray-300 rounded-[1vh] transition duration-150 ease-in-out
                                        focus:border-blue-200 focus:shadow-vh-lg focus:shadow-blue-100 disabled:bg-gray-300 disabled:opacity-100"
                                        type="text"
                                        placeholder={t("user.enter_user_name")}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            <small className="text-red-500">{errors?.name && errors.name.message}</small>
                        </FormGroup>
                        <FormGroup className={'relative h-auto w-auto  p-[1vh] m-0'}>
                            <Label className="mb-[2vh]"
                                   style={{fontSize: '1.6vh', fontWeight: '600', color: '#4677ef'}}>
                                {t("user.email")}</Label>
                            <Controller
                                className="h-[7vh] mb-[2vh]"
                                name={`email`}
                                id={`email`}
                                control={control}
                                ref={register}
                                // defaultValue={rowData?.email || null}
                                rules={formRules?.email}
                                render={({field: {onChange, onBlur, value, name, ref}}) => (
                                    <Input
                                        className="block focus:outline-none w-full h-[4vh] px-[2vh] text-[1.5vh] font-normal leading-5 text-gray-700
                                        bg-white bg-clip-padding-box border border-gray-300 rounded-[1vh] transition duration-150 ease-in-out
                                        focus:border-blue-200 focus:shadow-vh-lg focus:shadow-blue-100 disabled:bg-gray-300 disabled:opacity-100"
                                        placeholder={t("user.enter_user_email")}
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <small
                                className="text-red-500">{errors?.email && errors.email.message}</small>
                        </FormGroup>
                        <FormGroup className={'relative h-auto w-auto  p-[1vh] m-0'}>
                            <Label className="mb-[2vh]"
                                   style={{
                                       fontSize: '1.6vh',
                                       fontWeight: '600',
                                       color: '#4677ef'
                                   }}>{t("user.password")}</Label>
                            <Controller
                                className="h-[7vh] mb-[2vh]"
                                name={`password`}
                                id={`password`}
                                control={control}
                                ref={register}
                                // defaultValue={rowData?.real || null}
                                rules={formRules?.password}
                                render={({field: {onChange, onBlur, value, name, ref}}) => (
                                    <Input
                                        className="block focus:outline-none w-full h-[4vh] px-[2vh] text-[1.5vh] font-normal leading-5 text-gray-700
                                        bg-white bg-clip-padding-box border border-gray-300 rounded-[1vh] transition duration-150 ease-in-out
                                        focus:border-blue-200 focus:shadow-vh-lg focus:shadow-blue-100 disabled:bg-gray-300 disabled:opacity-100"
                                        placeholder={t("user.enter_user_password")}
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <small
                                className="text-red-500">{errors?.password && errors.password.message}</small>
                        </FormGroup>
                        <FormGroup className={'relative h-auto w-auto  p-[1vh] m-0'}>
                            <Label className="mb-[2vh]"
                                   style={{
                                       fontSize: '1.6vh',
                                       fontWeight: '600',
                                       color: '#4677ef'
                                   }}>{t("user.confirm_password")}</Label>
                            <Controller
                                className="h-[7vh] mb-[2vh]"
                                name={`confirmPassword`}
                                id={`confirmPassword`}
                                control={control}
                                ref={register}
                                // defaultValue={rowData?.real || null}
                                rules={{
                                    validate: (value) => value === watch('password') || t("user.password_not_match")
                                }}
                                render={({field: {onChange, onBlur, value, name, ref}}) => (
                                    <Input
                                        value={value}
                                        className="block focus:outline-none w-full h-[4vh] px-[2vh] text-[1.5vh] font-normal leading-5 text-gray-700
                                        bg-white bg-clip-padding-box border border-gray-300 rounded-[1vh] transition duration-150 ease-in-out
                                        focus:border-blue-200 focus:shadow-vh-lg focus:shadow-blue-100 disabled:bg-gray-300 disabled:opacity-100"
                                        placeholder={t("user.confirm_password_")}
                                        type="text"
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <small
                                className="text-red-500">{errors?.confirmPassword && errors.confirmPassword.message}</small>
                        </FormGroup>
                        <FormGroup className={'relative h-auto w-auto p-[1vh] m-0'}>
                            <Label className="mb-[2vh]"
                                   style={{
                                       fontSize: '1.6vh',
                                       fontWeight: '600',
                                       color: '#4677ef'
                                   }}>{t("user.user_role")}</Label>
                            <Controller
                                name={`role`}
                                id={`role`}
                                control={control}
                                ref={register}
                                // defaultValue={rowData?.role || null}
                                rules={formRules?.role}
                                render={({field: {onChange, onBlur, value, name, ref}}) => (
                                    <Select
                                        value={value}
                                        options={roles}
                                        placeholder={t("user.select_user_role")}
                                        onChange={(onChange)}/>
                                )}
                            />
                            <small
                                className="text-red-500">{errors?.role && errors.role.message}</small>
                        </FormGroup>
                    </div>
                </div>
                <TEModalFooter className="w-full m-0 sticky bottom-0 bg-white">
                    <ButtonClose onClick={_closeModal} text={t("user.close")}/>
                    <ButtonSave text={t("user.save")} type={"submit"}/>
                </TEModalFooter>
            </div>

        </Form>
    )
}
export default ManageModal


