import {Controller, useFieldArray} from "react-hook-form";
import {TextField} from "@mui/material";
import {FormGroup} from "reactstrap";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import ButtonSave from "../../@core/Elements/ButtonSave";
import ButtonAdd from "../../@core/Elements/ButtonAdd";
import DataTable from "../../@core/DataTable";
import {MaterialReactTable} from "material-react-table";
import API, {showNotification} from "../../../helpers/API";
import Select from "react-select";
import Image from "next/image";
import {Delete} from "@mui/icons-material";
import {_storeAnswers} from "../../../store/actions/quiz";

const options = ['Option 1', 'Option 2', 'Option 3']
const SequenceForm = ({
                          control,
                          errors,
                          register,
                          type,
                          setValue,
                          watch,
                          imageKey,
                          setImageKey,
                          setImageModal,
                          setAnswers,
                          getValues,
                          setQuestionId,
                          _openModalImage,
                          setQuizStored,
                          setCorrectAnswer
                      }) => {
    const {t, i18n} = useTranslation("translation");
    const [numSteps, setNumSteps] = useState(null)
    const [selectOptions, SetSelectOptions] = useState([])
    const [answers, setNewAnswers] = useState([])
    const [rows, setRows] = useState([])
    const [stages, setStages] = useState([])
    const [data, setData] = useState([])
    const [showTable, setShowTable] = useState(false)
    const {fields, append, remove} = useFieldArray({
        control,
        name: "dynamicFields",
    });

    const updateFields = (newNumOfSteps) => {
        const currentLength = fields.length;
        if (newNumOfSteps < currentLength) {
            for (let i = currentLength - 1; i >= newNumOfSteps; i--) {
                remove(i);
            }
        }
        if (newNumOfSteps > currentLength) {
            const diff = newNumOfSteps - currentLength;
            for (let i = 0; i < diff; i++) {
                append({});
            }
        }
    };

    useEffect(() => {
        console.log(numSteps)
        updateFields(numSteps * 3);
    }, [numSteps]);
    const _createColumns = async (num) => {
        const dynamicFields = watch(`dynamicFields`);
        const quizTitle = watch(`quizTitle`);
        const questionTitle = watch(`questionTitle`);
        const answersArray = dynamicFields?.map((answer) => {
            return answer?.title
        })
        const requestData = {
            title: quizTitle,
            questions: [{
                title: questionTitle,
                answers: answersArray
            }]
        }
        const storeAnswers = await _storeAnswers(requestData, (data) => {
            console.log(data?.data?.questions[0]?.answers, 'data?.data?.questions[0]?.answers')
            setQuizStored({quizId: data?.data?.id, questionId: data?.data?.questions[0]?.id})
            return data;
        }, (eee) => {
        });
        const updatedOptions = [];

        await storeAnswers?.data?.questions[0]?.answers?.map((one, i) => {
            if (one?.title && !updatedOptions.some(option => option.label === one.title)) {
                updatedOptions.push({label: one.title, value: one?.id, status: 0});
            }
        });

        SetSelectOptions(updatedOptions);
        console.log(updatedOptions, 'updatedOptions')

        const allRowsHaveValues = dynamicFields.every((row) => {
            // console.log('Object.keys(row)', row?.title)
            return (row?.title !== undefined && row?.title !== '' && row?.title !== null);
        });
        if (!allRowsHaveValues) {
            showNotification(
                "error",
                " 12111يجب أكمال تعبئة كامل خيارات مراحل الإختبار",
                "يجب أكمال تعبئة كامل خيارات مراحل الإختبار"
            );
            return;
        } else {
            console.log('allRowsHaveValues', allRowsHaveValues)
            setRows([]);
            for (let i = 0; i < num; i++) {
                setRows((prev) => {
                    return [
                        ...prev,
                        {accessorKey: null, header: `step ${i + 1}`}
                    ];
                });
            }
            setShowTable(true)
        }

    }

    const [selectedOptions, setSelectedOptions] = useState(Array(rows.length).fill([]));


    const handleSelectChange = (value, rowIndex, colIndex) => {
        console.log(value, rowIndex, colIndex)
        const updatedOptions = [...selectedOptions];
        updatedOptions[rowIndex] = {...updatedOptions[rowIndex], [colIndex]: value};

        // Check if the selected value exists in the same row but different rows
        const selectedValues = Object.values(updatedOptions[rowIndex]);
        if (selectedValues.length !== new Set(selectedValues).size) {
            // If the same value exists in the same row but different rows, reset the current column's value
            updatedOptions[rowIndex][colIndex] = '';
        }

        setSelectedOptions(updatedOptions);
    };

    const [showMessage, setShowMessage] = useState(false);
    const fileInputRef = useRef();


    const handleUploadImageClick = (question, answers, i) => {
        const arrayOfObjects = Object.values(answers);
        // handleSetAnswer(i, arrayOfObjects);
        console.log(question, arrayOfObjects);
        if (arrayOfObjects?.length === 0 || arrayOfObjects.some(answer => answer === '')) {
            setShowMessage(true);
        } else {
            setShowMessage(false);
            fileInputRef.current.click();
        }
    };

    function handleSetAnswer(questionId, answers) {
        console.log(answers, "answersanswersanswers");
        const res = answers?.map(answer => ({
            label: answer.label,
            value: answer.value,

        }));
        setNewAnswers(res);
    }

    const handleCheckboxChange = (checked, rowIndex, colIndex) => {
        const newValue = checked ? 1 : 0;
        const updatedAnswers = [...selectedOptions];
        console.log(selectedOptions, "selectedOptions")
        updatedAnswers[rowIndex][colIndex] = {
            ...updatedAnswers[rowIndex][colIndex],
            status: newValue,
        };

        console.log(updatedAnswers, "updatedAnswers")
        setAnswers(updatedAnswers.map((one, i) => {
            return {
                answers: Object.values(one),
                questionId: i
            }
        }));
    };
    return (
        <>
            <FormGroup className={'relative overflow-y-scroll h-full pb-[150px] w-full p-[1vh] m-0'}>
                <div
                    className="mb-[1vh] gap-y-5 w-full flex flex-col justify-center items-center">
                    <Controller
                        className="w-full"
                        name={`questionTitle`}
                        id={`questionTitle`}
                        control={control}
                        ref={register}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextField
                                disabled={type === 'show'}
                                label={t("quiz.question_title")}
                                placeholder={t("quiz.enter_question_title")}
                                onChange={onChange}
                                value={value}
                                type="text"
                                className={`h-[6vh] w-[80%] `}
                            />
                        )}
                    />
                    <Controller
                        className="w-full"
                        name={`numOfSteps`}
                        id={`numOfSteps`}
                        control={control}
                        ref={register}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextField
                                disabled={type === 'show'}
                                label={t("quiz.num_of_steps")}
                                placeholder={t("quiz.enter_num_of_steps")}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue >= 0 && newValue <= 10) {
                                        setNumSteps(parseInt(newValue));
                                        setValue('numOfSteps', parseInt(newValue))
                                        setShowTable(false)
                                    }
                                }}
                                value={value}
                                type="number"
                                inputProps={{min: 0, max: 10}}
                                className={`h-[6vh] w-[80%] `}
                            />
                        )}
                    />
                </div>
                {fields && <div
                    className='w-full text-center text-xl text-blue-500 p-1'>
                    {t("quiz.fields")}
                </div>}
                {fields && <div className="flex-1 grid grid-cols-3 flex flex-wrap gap-2">
                    {fields.map((field, index) => (
                        <div key={index}>
                            <Controller
                                className="w-full"
                                name={`dynamicFields[${index}].title`}
                                id={`dynamicFields[${index}].title`}
                                control={control}
                                ref={register}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        disabled={type === 'show'}
                                        label={t("quiz.title") + " " + (index + 1)}
                                        placeholder={t("quiz.enter_title")}
                                        onChange={onChange}
                                        value={value}
                                        type="text"
                                        className={`h-[6vh] w-full `}
                                    />
                                )}
                            />
                        </div>
                    ))}
                </div>}
                <div className='w-full text-center pt-10'>
                    <ButtonSave text={"continue"} onClick={(e) => _createColumns(numSteps)}/>
                    {showTable &&
                    <div className="pt-10 w-full">
                        <table className="pt-10 w-full">
                            <thead>
                            <tr>
                                <th>Stages</th>
                                {options.map((option) => {
                                    return (
                                        <th>{option}</th>
                                    )
                                })}
                                <th>Upload Image</th>
                            </tr>
                            </thead>
                            <tbody className='p-2'>
                            {rows?.map((col, i) => (
                                <tr key={`row-${i}`} className='border p-10 m-2'>
                                    <td>stage {i + 1}</td>
                                    {options.map((option, j) => (
                                        <td key={`col-${j}`} className='w-px'>
                                            <div className=''>
                                                <Select
                                                    className="w-[200px] h-full m-10"
                                                    options={selectOptions}
                                                    value={selectedOptions[i]?.[j] || ''}
                                                    styles={{
                                                        option: (provided, state) => ({
                                                            ...provided,
                                                            position: 'relative',
                                                            zIndex: 99999999999,
                                                            borderRadius: '10px',
                                                        }),
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderColor: state.isFocused ? 'blue' : 'gray',
                                                        }),
                                                    }}
                                                    menuPlacement={i === rows?.length - 1 ? 'top' : "bottom"}
                                                    onChange={(value) => handleSelectChange(value, i, j)}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => handleCheckboxChange(e.target.checked, i, j)}
                                                />
                                            </div>
                                        </td>
                                    ))}
                                    <td>

                                        <div
                                            className="relative p-4 flex-1 flex flex-col items-center justify-center gap-y-5">
                                            <Controller
                                                name={`questions[${i}].image`}
                                                control={control}
                                                ref={register}
                                                render={({field: {onChange, value}}) => (
                                                    <div className={`w-full h-[85%] relative`}>
                                                        {value && <Image
                                                            fill
                                                            className="p-5 relative object-contain h-full w-full"
                                                            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${value}`}
                                                            alt={`upload`}
                                                        />}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                className={`${type === 'show' ? "hidden" : ""}`}
                                                name={`questions[${i}].imageU`}
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
                                                                    setCorrectAnswer(getValues(`questions[${i}].correctAnswer`))
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
                                                onClick={() => {
                                                    setQuestionId(i);
                                                    handleUploadImageClick(`stage ${i + 1}`, selectedOptions[i], i);
                                                }}
                                                text="Upload Image"
                                                className={`${type === 'show' ? "hidden" : ""} relative`}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </FormGroup>
        </>
    )
}
export default SequenceForm