"use client"
import React, {useCallback, useMemo, useState} from 'react';
import Dialog from "components/@core/Elements/Dialog";
import {_deleteUser, _deleteUsers} from "../../../store/actions/auth";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import DataTable from "components/@core/DataTable";
import ManageModal from "./ManageModal";
import ModalComponent from "components/@core/DataTable/Modal";
import CanCall from "../../@core/config/acl/CanCall";
import {ListItemIcon, MenuItem} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

const UsersComponent = ({ users, roles}) => {
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()

    const _closeModal = () => {
        setOpenModal(false)
        setEdit({})
    }
    const _openModal = (data) => {
        if (data){
            setEdit({data, isEdit: true})
        }
        setOpenModal(true)
    }
    const [dialogData, setDialogData] = useState({show: false, data: []})
    const [edit, setEdit] = useState({})
    const {t, i18n} = useTranslation("translation");
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                enableClickToCopy: false,
                header: t('user.id'),
                size: 100,
            },
            {
                accessorKey: 'email',
                enableClickToCopy: false,
                header: t('user.email'),
                size: 200,
            },
            {
                accessorKey: 'photo',
                enableClickToCopy: false,
                header: t('user.photo'),
                size: 200,
                Cell: ({row}) => {
                    return (
                        <div
                            className="relative overflow:hidden rounded-[50%] w-[7vh] h-[7vh] border shadow-[2px_10px_20px_5px_rgba(0,0,0,0.05)] p-[0.1vh] border-solid border-[gray-100] bg-transparent "
                        >
                            <img
                                alt="user-image"
                                className="object-cover w-full h-full rounded-[50%] transition-transform transform scale-100 hover:scale-110 hover:scale-110"
                                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${row?.original?.photo}`}
                            />
                        </div>
                    )
                }
            },
            {
                accessorKey: 'real',
                enableClickToCopy: false,
                header: t('user.password'),
                size: 200,
            },
            {
                accessorKey: 'name',
                enableClickToCopy: false,
                header: t('user.name'),
                size: 200,
            },
            {
                accessorKey: 'role.name',
                enableClickToCopy: false,
                header: t('user.role'),
                size: 200,
            },
        ],
        [],
    );

    function handleEdit(row) {
        const data = row?.original
        // console.log(data, "roew")
        if (data) {
            _openModal({
                ...data,
                role: {
                    label: data.role.name,
                    value: data.role.id
                }
            });
        }
    }

    function handleDelete(row) {
        if (row?.length > 0 ) {
            setDialogData({show: true, data: row})
        }
        const id = row?.original?.id
        const data = row?.original
        if (id) {
            setDialogData({show: true, data})
        }
    }
    function handleConfirmDelete(data) {
        if (data.data?.length > 0 ) {
            const ids = data.data?.map((one) => {
                return one.id
            })
            _deleteUsers(ids,
                (res) => {
                    router.refresh()
                }, () => {})
        }
        if (data?.data?.id) {
            _deleteUser(data?.data?.id,
                (res) => {
                router.refresh()
            }, () => {})
        }
    }

    function getRowActionsButtons(row, closeMenu) {
        const rowButtons = [
            <CanCall
                key={0} action={"UPDATE_USER"}>
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
                key={1} action={"DELETE_USER"}>
                <MenuItem  className="text-red-400"
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
                actionAddText="CREATE_USER"
                actionEditText="UPDATE_USER"
                actionDeleteText="DELETE_USER"
                _openModal={_openModal}
                columns={columns}
                data={users}
                handleDelete={handleDelete}
                handleEdit={(row) => handleEdit(row)}
                addButtonText="user.add_user"
            />
            <ModalComponent openModal={openModal} _openModal={_openModal} _closeModal={_closeModal} edit={edit} title={edit?.isEdit ? t("user.Edit_user") : t("user.add_new_user")} >
                {openModal && <ManageModal rowData={edit?.data} isEdit={edit?.isEdit} _closeModal={_closeModal} roles={roles}/>}
            </ModalComponent>
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
                text={t("user.user")}
                texts={t("user.users")}
            />
        </>
    );
}
export  default UsersComponent