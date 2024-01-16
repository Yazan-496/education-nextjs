"use client"
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Dialog from "components/@core/Elements/Dialog";
import {_deleteQuizzes, _deleteQuiz} from "store/actions/quiz";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import DataTable from "components/@core/DataTable";
import ManageModal from "./ManageModal";
import ModalComponent from "components/@core/DataTable/Modal";
import ModalImage from "components/@core/DataTable/ModalImage";
import handleImageChange from "components/@core/common/ImageUpload/UploadFile";
import moment from "moment";
import CanCall from "../../@core/config/acl/CanCall";
import {ListItemIcon, MenuItem} from "@mui/material";
import {Delete, Edit, PlayArrow, Visibility} from "@mui/icons-material";
import TestModal from "./TestModal";

const data = [
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "111", email: "email1", firstName: "firstName1", lastName: "lastName1"},
    {id: "222", email: "email2", firstName: "firstName2", lastName: "lastName2"}
]
const QuizComponent = ({quizzes}) => {
    const [openModal, setOpenModal] = useState(false)
    const [testData, setTestData] = useState({})
    const [openModalTest, setOpenModalTest] = useState(false)

    const _closeModal = () => {
        setOpenModal(false)
        setEdit({})
    }
    const _openModal = (data, type) => {
        if (data) {
            setEdit({data, isEdit: true, type})
        }
        setOpenModal(true)
    }
    const _closeModalTest = () => {
        setOpenModalTest(false)
        setTestData({})
    }
    const _openModalTest = (data) => {
        if (data) {
            setTestData({data})
        }
        setOpenModalTest(true)
    }
    const router = useRouter()
    const [dialogData, setDialogData] = useState({show: false, data: []})
    const [edit, setEdit] = useState({})
    const [imageServerPath, setImageServerPath] = useState([])
    const {t, i18n} = useTranslation("translation");
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                enableClickToCopy: true,
                header: t('quiz.id'),
                size: 20,
            },
            {
                accessorKey: 'title',
                enableClickToCopy: true,
                header: t('quiz.quiz_title'),
                size: 400,
            },
            {
                accessorKey: 'questions',
                enableClickToCopy: true,
                header: t('quiz.quiz_questions'),
                size: 400,
                Cell: (cell, column, renderedCellValue, row, table) => {

                    return (
                        <>
                            <div className={'w-full flex flex-col justify-start items-center'}>
                                {cell?.row?.original?.questions?.length > 0 && cell?.row?.original?.questions?.map((question) => (
                                    <div className={'w-full'}>
                                        {question?.title}
                                    </div>
                                ))
                                }
                            </div>
                        </>
                    )
                }
            },
            {
                accessorKey: 'score',
                enableClickToCopy: true,
                header: t('quiz.score_of_quiz'),
                size: 60,
            },
            {
                accessorKey: 'created_at',
                enableClickToCopy: true,
                header: t('quiz.created_at'),
                size: 50,
                Cell: (cell, column, renderedCellValue, row, table) => {
                    return (
                        <div>
                            {cell?.row?.original?.created_at ? moment(cell?.row?.original?.created_at).format('DD-MMM-YYYY').toString() : cell?.row?.original?.created_at}
                        </div>
                    )
                }
            },
        ],
        [],
    );

    function handleEdit(row, type) {
        const data = row?.original
        // console.log(data, "roew")
        if (data) {
            _openModal({
                    ...data,
                    role: {
                        label: data?.role?.name,
                        value: data?.role?.id
                    },
                },
                type);
        }
    }

    function handleTest(row) {
        const data = row?.original
        if (data) {
            _openModalTest({
                ...data,
                role: {
                    label: data?.role?.name,
                    value: data?.role?.id
                },
            });
        }
    }

    function handleDelete(row) {
        if (row?.length > 0) {
            setDialogData({show: true, data: row})
        }
        const id = row?.original?.id
        const data = row?.original
        if (id) {
            setDialogData({show: true, data})
        }
    }

    function handleConfirmDelete(data) {
        if (data.data?.length > 0) {
            const ids = data.data?.map((one) => {
                return one.id
            })
            _deleteQuizzes(ids,
                (res) => {
                    router.refresh()
                }, () => {
                })
        }
        if (data?.data?.id) {
            _deleteQuiz(data?.data?.id,
                (res) => {
                    router.refresh()
                }, () => {
                })
        }
    }

    const [openModalImage, setOpenModalImage] = useState(false)
    const [image, setImageModal] = useState(false)
    const [imageKey, setImageKey] = useState(null)
    const [finalResult, setFinalResult] = useState([])
    const [answers, setAnswers] = useState([])
    const [questionId, setQuestionId] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState('')
    const _closeModalImage = () => {
        setOpenModalImage(false)
        setImageModal(false)
        setCorrectAnswer('')
        setImageKey(null)
        setQuestionId(null)
    }
    const _openModalImage = () => {
        setOpenModalImage(true)
    }
    const handleDone = async (result) => {
        if (result?.length < 3) {
            // error
        } else {
            const res = await handleImageChange(image)
            const findIndex = finalResult?.findIndex((one) => one?.questionId === questionId);
            if (findIndex === -1) {
                setFinalResult((prev) => [
                    ...prev,
                    {
                        image: res,
                        questionId: questionId,
                        answers: result
                    },
                ])
                console.log(finalResult, 'finalResult')
            } else {
                const updatedFinalResult = [...finalResult];
                updatedFinalResult[findIndex].answers = result;
                setFinalResult(updatedFinalResult);
                console.log(updatedFinalResult, 'updatedFinalResult')
            }
            _closeModalImage()
        }
    }
    useEffect(() => {
    }, [answers])

    function getRowActionsButtons(row, closeMenu) {
        const rowButtons = [
            // <CanCall
            //     key={0} action={"SHOW_QUIZ"}>
            <MenuItem
                className="text-gray-500"
                onClick={() => {
                    handleEdit(row, 'show');
                    closeMenu()
                }}
                sx={{m: 0}}
            >
                <ListItemIcon>
                    <Visibility className="text-blue-500"/>
                </ListItemIcon>
                {t("user.show")}
            </MenuItem>,
            // </CanCall>,
            // <CanCall
            //     key={0} action={"SHOW_QUIZ"}>
            <MenuItem
                className="text-gray-500"
                onClick={() => {
                    handleTest(row);
                    closeMenu()
                }}
                sx={{m: 0}}
            >
                <ListItemIcon>
                    <PlayArrow className="text-green-500"/>
                </ListItemIcon>
                {t("user.test")}
            </MenuItem>,
            // </CanCall>,
            <CanCall
                key={0} action={"UPDATE_QUIZ"}>
                <MenuItem
                    className="text-gray-500"
                    onClick={() => {
                        handleEdit(row);
                        closeMenu()
                    }}
                    sx={{m: 0}}
                >
                    <ListItemIcon>
                        <Edit className="text-gray-500"/>
                    </ListItemIcon>
                    {t("user.edit")}
                </MenuItem>
            </CanCall>,
            <CanCall
                key={1} action={"DELETE_QUIZ"}>
                <MenuItem className="text-red-400"
                          onClick={() => {
                              handleDelete(row);
                              closeMenu()
                          }}
                          sx={{m: 0}}
                >
                    <ListItemIcon>
                        <Delete className="text-red-400"/>
                    </ListItemIcon>
                    {t("user.delete")}
                </MenuItem>
            </CanCall>
        ]
        let filteredArray = rowButtons.filter(item => item?.key !== null);

        let rowButtonsWithKey = filteredArray.length;
        // console.log(rowButtons, "rowButtons")
        return {
            buttons: rowButtons,
            isShowActions: rowButtonsWithKey > 0
        }

    }

    return (
        <>
            <DataTable
                enableTopToolbar={true}
                getRowActionsButtons={getRowActionsButtons}
                actionAddText="CREATE_QUIZ"
                actionEditText="UPDATE_QUIZ"
                actionDeleteText="DELETE_QUIZ"
                _openModal={_openModal}
                columns={columns}
                data={quizzes}
                handleDelete={handleDelete}
                handleEdit={(row) => handleEdit(row)}
                addButtonText="user.add_quiz"
            />
            <ModalComponent openModal={openModal} _openModal={_openModal} _closeModal={_closeModal} edit={edit}
                            title={edit?.type === 'show' ? t("quiz.show_quiz") : edit?.isEdit ? t("quiz.edit_quiz") : t("quiz.add_new_quiz")}>
                {openModal && <ManageModal
                    setImageKey={(a) => setImageKey(a)}
                    finalResult={finalResult}
                    imageKey={imageKey}
                    imageServerPath={imageServerPath}
                    _closeModalImage={_closeModalImage}
                    _openModalImage={_openModalImage}
                    setImageModal={(a) => setImageModal(a)}
                    setAnswers={(a) => setAnswers(a)}
                    setQuestionId={(a) => setQuestionId(a)}
                    setCorrectAnswer={(a) => setCorrectAnswer(a)}
                    rowData={edit?.data}
                    isEdit={edit?.isEdit}
                    type={edit?.type}
                    _closeModal={_closeModal}
                />}
            </ModalComponent>
            {/*<ModalComponent openModal={openModal} _openModal={_openModal} _closeModal={_closeModal} edit={edit} title={edit?.isEdit ? t("user.Edit_quiz") : t("user.add_new_quiz")} >*/}
            {/*    <ManageModal rowData={edit?.data} isEdit={edit?.isEdit} _closeModal={_closeModal}/>*/}
            {/*</ModalComponent>*/}
            <Dialog
                type="warning"
                data={dialogData}
                onClose={() => {
                    setDialogData({...dialogData, show: false})
                }}
                onConfirm={() => handleConfirmDelete(dialogData)}
                confirmText={t("user.delete_it")}
                cancelText={t("user.cancel")}
                title={t("user.are_you_sure")}
                text={t("user.quiz")}
                texts={t("user.quizzes")}
            />
            {openModalImage &&
            <ModalImage
                image={image}
                answers={answers}
                questionId={questionId}
                correctAnswer={correctAnswer}
                openModal={openModalImage}
                _openModal={_openModalImage}
                _closeModal={_closeModalImage}
                handleDone={(res) => handleDone(res)}
                setImageServerPath={(aa) => setImageServerPath(aa)}
                edit={false}
                title={"Set Regions On image"}/>
            }
            {openModalTest &&
            <ModalComponent fullScreen={true} isClose={true} openModal={openModalTest} _openModal={_openModalTest}
                            _closeModal={_closeModalTest} edit={edit}
                            title={testData?.data?.title}>
                {testData?.data && <TestModal data={testData?.data}/>}
            </ModalComponent>
            }
        </>
    );
}
export default QuizComponent