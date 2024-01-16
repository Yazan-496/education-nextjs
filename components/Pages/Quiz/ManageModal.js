'use client'
import React, {createRef, useEffect, useRef, useState} from 'react';
import {Controller, useFieldArray, useForm} from "react-hook-form"
import {useRouter} from "next/navigation"
import {ArrowCircleRight, ArrowCircleLeft, Delete} from '@mui/icons-material';
import {Form, FormGroup, Input, Label} from "reactstrap"
import {TEModalFooter} from "tw-elements-react";
import ButtonClose from "components/@core/Elements/ButtonClose";
import ButtonSave from "components/@core/Elements/ButtonSave";
import {useTranslation} from "react-i18next";
import {TextField} from "@mui/material";
import Slider from 'react-slick';
import Image from "next/image";
import {_createQuiz} from "store/actions/quiz";
import Select from "react-select";
import SequenceForm from "./SequenceForm";
import ModalImage from "../../@core/DataTable/ModalImage";

const ManageModal = ({
                         _closeModal,
                         roles,
                         rowData,
                         isEdit,
                         _closeModalImage,
                         _openModalImage,
                         setImageModal,
                         setAnswers,
                         setCorrectAnswer,
                         setQuestionId,
                         imageServerPath,
                         imageKey,
                         finalResult,
                         setImageKey,
                         type
                     }) => {
    const {t, i18n} = useTranslation("translation");
    const router = useRouter()
    const [quizType, setQuizType] = useState(null)
    const [quizStored, setQuizStored] = useState({quizId: null, questionId: null})

    async function _getData() {
        return await rowData
    }

    useEffect(() => {
        // console.log(rowData, "rowData")
        clearErrors()
        reset()
    }, [rowData])


    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: {errors},
        clearErrors,
        reset,
        getValues
    } = useForm({
        defaultValues: async () => {
            const aa = {
                quizTitle: rowData?.title || "",
                quizDuration: rowData?.score || "",
                quizScore: rowData?.score || "",
                questions: rowData?.questions?.map((question) => {
                    return ({
                        questionTitle: question?.title,
                        answers: question?.answers?.length > 0 && [question?.answers[0]?.title, question?.answers[1]?.title, question?.answers[2]?.title],
                        correctAnswer: question?.answers?.length > 0 && question?.answers?.filter((answer) => answer?.status === 1)[0],
                        image: question?.img_src,
                    })
                })
            }
            return aa
        }
    });
    const {fields: fieldsQuestion, append: appendQuestion, remove: removeQuestion} = useFieldArray({
        control,
        name: "questions"
    })
    const formRules = {
        quizTitle: {
            required: t("user.quizTitle_is_required"),
            minLength: {
                value: 4,
                message: t("user.quizTitle_must_be_at_least_4_characters")
            }
        },
        quizDuration: {
            required: t("user.quizDuration_is_required"),
            minLength: {
                value: 1,
                message: t("user.quizDuration_must_be_at_least_1_characters")
            }
        },
        quizScore: {
            required: t("user.user_password_is_required"),
            minLength: {
                value: 1,
                message: t("user.quizScore_must_be_at_least_1_Characters")
            }
        }
    }
    useEffect(() => {
        // console.log(rowData, "rowData")
    }, [rowData])
    const handleReset = () => {
        clearErrors()
        reset()
    }

    useEffect(() => {
        if (finalResult?.length > 0) {
            finalResult?.map((result) => {
                return (
                    setValue(`questions[${result?.questionId}].image`, result?.image)
                )
            })
        }
    }, [finalResult])

    const onSubmit = (data) => {
        console.log(data, "data")
        console.log(finalResult, "finalResult")
     if (quizType === 'normal'){
         const updatedData = {
             ...data,
             questions: data?.questions?.map((question, index) => {
                 const finalResultItem = finalResult.find(result => result?.questionId === index);

                 if (finalResultItem) {
                     const answerTitles = question.answers;
                     const newAnswers = finalResultItem.answers.map((newAnswer, newIndex) => ({
                         ...newAnswer,
                         answerTitle: answerTitles[newIndex]
                     }));

                     return {
                         ...question,
                         newAnswers: newAnswers,
                     };
                 } else {
                     return question;
                 }
             })
         };
         _createQuiz({
             ...data,
             type: quizType,
             title: updatedData?.quizTitle,
             question: updatedData?.questions?.map((question) => {
                 return ({
                     title: question?.questionTitle,
                     img_src: question?.image,
                     img_name: question?.image,
                     top: 0,
                     left: 0,
                     score: 0,
                     answers: question?.newAnswers?.map((answer) => {
                         return ({
                             ...answer,
                             title: answer?.answerTitle,
                             status: parseInt(answer?.answerId) === parseInt(question?.correctAnswer),
                             region: answer?.points
                         })
                     })
                 })
             })
         }, res => {
             _closeModal()
             reset()
             router.refresh()
         }, (err) => {
         })
     }
     if (quizType === 'sequence'){
         console.log(data, "data")
         console.log(finalResult, "finalResult")
         _createQuiz({
             ...data,
             type: quizType,
             quiz_id: quizStored?.quizId,
             question_id: quizStored?.questionId,
             stages: finalResult
         }, res => {
             // setQuizStored({questionId: null, quizId: null})
             // _closeModal()
             // reset()
             // router.refresh()
         }, (err) => {
         })
     }
    }
    const sliderRef = createRef();
    const settings = {
        dots: true,
        infinite: false,
        autoplay: false,
        speed: 800,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerMargin: "50px",
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };
    const next = () => {
        sliderRef.current?.slickNext();
    };

    const handleNextQuestion = () => {
        appendQuestion({
            questionTitle: '',
            answers: ['', '', ''],
            correctAnswer: '',
            image: '',
        })
        // if (i) {
        next()
        // }
    };

    function handleSetAnswer(questionId, answers) {
        const res = answers?.map((answer, i) => {
            return {
                label: answer,
                value: i
            }
        })
        setAnswers((prev) => [
            ...prev,
            {
                questionId,
                answers: res
            }
        ]);
    }

    const [showMessage, setShowMessage] = useState(false);
    const fileInputRef = useRef();

    const handleUploadImageClick = (question, answers) => {
        if (answers.length === 0 || answers.some(answer => answer === '') || question?.questionTitle === '' || question?.correctAnswer === '') {
            setShowMessage(true);
        } else {
            setShowMessage(false);
            fileInputRef.current.click();
        }
    }

    useEffect(() => {
        // console.log(type, "type")
    }, [type])
    return (
        <>
            <Form className="w-[100%] h-full" onSubmit={handleSubmit(onSubmit)}>
                <div
                    className={' relative w-full bg-transparent flex flex-col justify-start items-start content-start m-0'}>
                    <div className="w-full h-full p-[2vh]">
                        <div
                            className='w-[100%] h-[81vh] w-full relative bg-[#FFFFFF] py-[2vh] rounded-[2vh] mb-[0vh] flex-col mb-10'>
                            {/*<ImageUpload imageState={image} onChange={(base64Image) => setImage(base64Image)}/>*/}
                            <div className="flex flex-2 items-start w-full">
                                <FormGroup className={'flex-1 relative h-auto p-[1vh] m-0'}>
                                    <Controller
                                        type={"text"}
                                        name={`quizTitle`}
                                        id={`quizTitle`}
                                        className="h-[7vh] mb-[2vh]"
                                        control={control}
                                        ref={register}
                                        rules={formRules?.quizTitle}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                disabled={type === 'show'}
                                                label={t(`quiz.quiz_title`)}
                                                placeholder={t(`quiz.enter_quiz_title`)}
                                                onChange={onChange}
                                                value={value}
                                                type="text"
                                                className={`h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        className="text-red-500">{errors?.quizTitle && errors.quizTitle.message}</small>
                                </FormGroup>
                                <FormGroup className={'flex-1 relative h-auto p-[1vh] m-0'}>
                                    <Controller
                                        className="h-[7vh] mb-[2vh]"
                                        name={`quizDuration`}
                                        id={`quizDuration`}
                                        control={control}
                                        ref={register}
                                        // defaultValue={rowData?.email || null}
                                        rules={formRules?.quizDuration}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                disabled={type === 'show'}
                                                label={t(`quiz.quiz_duration`)}
                                                placeholder={t(`quiz.enter_quiz_duration`)}
                                                onChange={onChange}
                                                value={value}
                                                type="text"
                                                className={`h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        className="text-red-500">{errors?.quizDuration && errors.quizDuration.message}</small>
                                </FormGroup>
                                <FormGroup className={'flex-1 relative h-auto p-[1vh] m-0'}>
                                    <Controller
                                        className="h-[7vh] mb-[2vh]"
                                        name={`quizScore`}
                                        id={`quizScore`}
                                        control={control}
                                        ref={register}
                                        // defaultValue={rowData?.real || null}
                                        rules={formRules?.quizScore}
                                        render={({field: {onChange, onBlur, value, name, ref}}) => (
                                            <TextField
                                                disabled={type === 'show'}
                                                label={t(`quiz.quiz_score`)}
                                                placeholder={t(`quiz.enter_quiz_score`)}
                                                onChange={onChange}
                                                value={value}
                                                type="text"
                                                className={`h-[6vh] w-[100%]`}
                                            />
                                        )}
                                    />
                                    <small
                                        className="text-red-500">{errors?.quizScore && errors.quizScore.message}</small>
                                </FormGroup>
                            </div>
                            <FormGroup
                                className={'flex-1 flex justify-center w-full text-center relative h-auto p-[1vh] m-0'}>
                                <Controller
                                    type={"text"}
                                    name={`type`}
                                    id={`type`}
                                    className="h-[7vh] w-full mb-[2vh] text-center"
                                    control={control}
                                    ref={register}
                                    rules={formRules?.type}
                                    render={({field: {onChange, onBlur, value, name, ref}}) => (
                                        <Select
                                            disabled={type === 'show'}
                                            label={t(`quiz.type`)}
                                            placeholder={t(`quiz.type`)}
                                            onChange={(type) => setQuizType(type.value)}
                                            value={value}
                                            options={[{label: "Normal", value: 'normal'}, {
                                                label: 'Sequence',
                                                value: "sequence"
                                            }]}
                                            className={`h-[6vh] w-[50%] `}
                                        />
                                    )}
                                />
                                <small
                                    className="text-red-500">{errors?.type && errors.type.message}</small>
                            </FormGroup>
                            {quizType === 'normal' ?
                                <div className="mt-10 flex-2 px-5 w-full">
                                    {/*<ul id={`translations`} className="w-full">*/}
                                    <Slider
                                        swipeToSlide={true}
                                        className='w-full px-10'
                                        ref={sliderRef}
                                        {...settings}
                                    >
                                        {fieldsQuestion.map((question, index) => (
                                            <div
                                                key={index}
                                                className={`border w-full border-gray-200 rounded-lg pb-2 mb-2`}
                                            >
                                                <div className="w-full text-center text-xl text-blue-500 p-5">
                                                    Question {index + 1}
                                                </div>
                                                <FormGroup className={'relative h-auto w-full p-[1vh] m-0'}>
                                                    <div
                                                        className="mb-[1vh] w-full flex flex-col justify-center items-center">
                                                        <Controller
                                                            className="w-full"
                                                            name={`questions[${index}].questionTitle`}
                                                            id={`questions[${index}].questionTitle`}
                                                            control={control}
                                                            ref={register}
                                                            rules={{
                                                                required: `Question ${index + 1} Title Is Required`,
                                                                minLength: {
                                                                    value: 4,
                                                                    message: `Question ${index + 1} Title must be at least 4 Characters`,
                                                                },
                                                            }}
                                                            render={({field: {onChange, onBlur, value}}) => (
                                                                <TextField
                                                                    disabled={type === 'show'}
                                                                    label={t("quiz.question_title") + " " + (index + 1)}
                                                                    placeholder={t("quiz.enter_question_title")}
                                                                    onChange={onChange}
                                                                    value={value}
                                                                    type="text"
                                                                    className={`h-[6vh] w-[80%] `}
                                                                />
                                                            )}
                                                        />
                                                        <small className="text-red-500">
                                                            {errors?.questions?.[index]?.questionTitle && errors?.questions?.[index]?.questionTitle?.message}
                                                        </small>
                                                        <small className="text-red-500">
                                                            {errors?.questions?.[index]?.correctAnswer && errors?.questions?.[index]?.correctAnswer?.message}
                                                        </small>
                                                    </div>

                                                    <div className="flex">
                                                        <div className="flex-1">
                                                            <div
                                                                className='w-full text-center text-xl text-blue-500 p-1'>
                                                                {t("quiz.answers")} {index + 1}
                                                            </div>
                                                            {fieldsQuestion[index]?.answers?.map((answer, i) => (
                                                                <div className="flex flex-col gap-y-2" key={i}>
                                                                    <div className="flex">
                                                                        <div className="flex w-full gap-x-1">
                                                                            <Controller
                                                                                name={`questions[${index}].answers[${i}]`}
                                                                                control={control}
                                                                                ref={register}
                                                                                rules={{
                                                                                    required: `Answer ${i + 1} for Question ${index + 1} Title Is Required`,
                                                                                    minLength: {
                                                                                        value: 4,
                                                                                        message: `Answer ${i + 1} for Question ${index + 1} Title must be at least 4 Characters`,
                                                                                    },
                                                                                }}
                                                                                render={({
                                                                                             field: {
                                                                                                 onChange,
                                                                                                 onBlur,
                                                                                                 value
                                                                                             }
                                                                                         }) => (
                                                                                    <>
                                                                                        <TextField
                                                                                            disabled={type === 'show'}
                                                                                            label={t(`quiz.answer_${i + 1}`)}
                                                                                            placeholder={t(`quiz.enter_answer_${i + 1}`)}
                                                                                            onChange={onChange}
                                                                                            value={value}
                                                                                            type="text"
                                                                                            className={`h-[6vh] w-[100%]`}
                                                                                        />
                                                                                        <Controller
                                                                                            name={`questions[${index}].correctAnswer`}
                                                                                            control={control}
                                                                                            rules={{
                                                                                                required: ` Correct Answer for Question ${index + 1} Title Is Required`
                                                                                            }}
                                                                                            render={({
                                                                                                         field: {
                                                                                                             onChange,
                                                                                                             onBlur,
                                                                                                             value
                                                                                                         }
                                                                                                     }) => (
                                                                                                <>
                                                                                                    <input
                                                                                                        disabled={type === 'show'}
                                                                                                        type="radio"
                                                                                                        name={`questions[${index}].correctAnswer`}
                                                                                                        value={i}
                                                                                                        defaultChecked={question?.correctAnswer?.answer_id === i}
                                                                                                        onChange={onChange}
                                                                                                    />
                                                                                                </>
                                                                                            )}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <small className="text-red-500">
                                                                        {errors?.questions?.[index]?.answers[i] && errors?.questions?.[index]?.answers[i]?.message}
                                                                    </small>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div
                                                            className="relative flex-1 flex flex-col items-center justify-center gap-y-5">
                                                            <Controller
                                                                name={`questions[${index}].image`}
                                                                control={control}
                                                                ref={register}
                                                                render={({field: {onChange, value}}) => (
                                                                    <div className={`w-full h-[85%] relative`}>
                                                                        {value && <Image
                                                                            fill
                                                                            className="object-contain h-full w-full"
                                                                            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${value}`}
                                                                            alt={`upload`}
                                                                        />}
                                                                    </div>
                                                                )}
                                                            />
                                                            <Controller
                                                                className={`${type === 'show' ? "hidden" : ""}`}
                                                                name={`questions[${index}].imageU`}
                                                                control={control}
                                                                ref={register}
                                                                render={({field: {onChange}}) => (
                                                                    <input
                                                                        type="file"
                                                                        ref={fileInputRef}
                                                                        key={imageKey}
                                                                        className="hidden absolute opacity-0 cursor-pointer"
                                                                        onChange={(e) => {
                                                                            const selectedFile = e.target.files[0];
                                                                            setImageModal(selectedFile);
                                                                            if (selectedFile) {
                                                                                const reader = new FileReader();
                                                                                reader.onload = (e) => {
                                                                                    onChange(e.target.result);
                                                                                    handleSetAnswer(index, getValues(`questions[${index}].answers`))
                                                                                    setCorrectAnswer(getValues(`questions[${index}].correctAnswer`))
                                                                                    _openModalImage(true)
                                                                                    e.target.value = "";
                                                                                    setImageKey(Date.now());
                                                                                };
                                                                                reader.readAsDataURL(selectedFile);
                                                                            }
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            <ButtonSave
                                                                // disabled={getValues(`questions[${index}].answers`)?.length > 0}
                                                                onClick={() => {
                                                                    setQuestionId(index)
                                                                    handleUploadImageClick(getValues(`questions[${index}]`), getValues(`questions[${index}].answers`))
                                                                }}
                                                                text="Upload Image"
                                                                className={`${type === 'show' ? "hidden" : ""} relative`}/>
                                                            <small className="text-red-500">
                                                                {showMessage &&
                                                                <p>Please complete existing question with answers and
                                                                    correct answer before uploading an image.</p>}
                                                            </small>
                                                            <Delete
                                                                className={`${type === 'show' ? "hidden" : ""} w-[40px] absolute bottom-0 right-0 h-[40px] opacity-50 cursor-pointer p-1 hover:p-0 hover:opacity-100`}
                                                                sx={{color: "#f10606"}}
                                                                onClick={() => removeQuestion(index)}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                        ))}
                                    </Slider>
                                    {/*</ul>*/}
                                    <div className='w-full flex items-center justify-center gap-x-5 mt-10'>
                                        <ArrowCircleLeft
                                            className="w-[60px] h-[60px] cursor-pointer p-1 hover:p-0"
                                            sx={{color: "#ed7a7a"}}
                                            onClick={previous}
                                            text="Previous Question"
                                            // disabled={!i > 0 }
                                        />
                                        <ButtonSave
                                            className={`${type === 'show' ? "hidden" : ""}`}
                                            onClick={handleNextQuestion}
                                            text="Add Question"
                                            // disabled={i === fieldsQuestion.length - 1}
                                        />
                                        <ArrowCircleRight
                                            className="w-[60px] h-[60px] opacity-50 cursor-pointer p-1 hover:p-0 hover:opacity-100"
                                            sx={{color: "#0e46e9a6"}}
                                            onClick={next}
                                            text="Next Question"
                                            // disabled={i === fieldsQuestion.length - 1}
                                        />
                                    </div>
                                </div> : quizType === 'sequence' ?
                                    <SequenceForm
                                        register={register}
                                        getValues={getValues}
                                        setImageModal={(a) => setImageModal(a)}
                                        setQuizStored={(a) => setQuizStored(a)}
                                        imageKey={imageKey}
                                        setImageKey={(a) => setImageKey(a)}
                                        setAnswers={(a) => setAnswers(a)}
                                        setQuestionId={(a) => setQuestionId(a)}
                                        setCorrectAnswer={(a) => setCorrectAnswer(a)}
                                        control={control}
                                        errors={errors}
                                        setValue={setValue}
                                        _openModalImage={_openModalImage}
                                        watch={watch}
                                        type={type}
                                    /> : null}
                        </div>
                    </div>
                    <TEModalFooter className="w-full z-10 mb-10 fixed bottom-0 bg-white">
                        <ButtonClose onClick={() => {
                            handleReset()
                            _closeModal()
                        }} text={t("user.close")}/>
                        <ButtonSave text={t("user.save")} type={"submit"}/>
                    </TEModalFooter>
                </div>
            </Form>
            <div className="w-[100vw] h-[100vh]">
            </div>
        </>
    )
}
export default ManageModal


