"use client"
import {MaterialReactTable} from "material-react-table";
import {ListItemIcon, MenuItem} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import ButtonSave from "components/@core/Elements/ButtonSave";
import ButtonClose from "components/@core/Elements/ButtonClose";
import React, {useEffect, useState} from "react";
import {MRT_Localization_EN,} from 'material-react-table/locales/en';
import {MRT_Localization_FA,} from 'material-react-table/locales/fa';
import {MRT_Localization_RU,} from 'material-react-table/locales/ru';
import {MRT_Localization_AR,} from 'components/@core/Language/arabicTable';
import {useTranslation} from "react-i18next";
import CanCall from "../config/acl/CanCall";

const DataTable = ({
                       columns,
                       data,
                       handleEdit,
                       handleDelete,
                       _openModal,
                       addButtonText,
                       actionAddText,
                       actionDeleteText,
                       enableTopToolbar,
                       getRowActionsButtons
                   }) => {
    console.log('getRowActionsButtons', getRowActionsButtons)
    const {t, i18n} = useTranslation("translation");
    const [lang, setLang] = useState(i18n.language)

    const localizationMap = {
        ar: MRT_Localization_AR,
        en: MRT_Localization_EN,
        fa: MRT_Localization_FA,
        ru: MRT_Localization_RU,
    };

    useEffect(() => {
        const langCode = i18n.language;
        const localizationObject = localizationMap[langCode];
        setLang(localizationObject);
    }, [i18n])


    return (
        <>
            <MaterialReactTable
                enableStickyHeader
                enableStickyFooter
                localization={lang}
                defaultColumn={{maxSize: 700, minSize: 20, size: 150,}}
                muiTableContainerProps={{
                    sx: {
                        maxHeight: "59vh",
                        minHeight: "59vh",
                        tableLayout: "fixed"
                    }
                }}
                columns={columns}
                data={data}
                enableColumnFilterModes={false}
                enableColumnOrdering
                enableGrouping
                enablePinning
                // enableRowActions
                enableRowActions={getRowActionsButtons ? getRowActionsButtons().isShowActions : false}
                editingMode={"modal"}
                enableRowSelection
                initialState={{showColumnFilters: false}}
                positionToolbarAlertBanner="bottom"
                positionActionsColumn="last"
                renderRowActionMenuItems={({table, row, closeMenu}) => {
                    return (
                        getRowActionsButtons(row, closeMenu).buttons
                    )
                }}
                renderTopToolbarCustomActions={enableTopToolbar ? ({table}) => {
                    const handleDeleteDialog = () => {
                    handleDelete(
                    table.getSelectedRowModel().flatRows.map((row) => {
                    return row?.original
                })
                    )
                };
                    return (
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                    <div
                    className='gap-x-[2vh] w-full h-[6.5vh] relative bg-transparent rounded-[2vh] py-[1vh] flex justify-end'>
                    <ButtonSave
                    action={actionAddText}
                    onClick={() => _openModal()}
                    text={t(`${addButtonText}`)}/>
                    <ButtonClose
                    action={actionDeleteText}
                    className={`cursor-pointer disabled:cursor-not-allowed`}
                    disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                    onClick={handleDeleteDialog}
                    text={t("user.delete_selected")}/>
                    </div>
                    </div>
                    );
                } : null}
                    />
                    </>
                    )
                }
export default DataTable