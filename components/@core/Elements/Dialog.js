import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonClose from "./ButtonClose";
import ButtonSave from "./ButtonSave";
import {Alert} from "@mui/material";
import HTMLRenderer from "../../../helpers/HTMLRenderer";
import {useTranslation} from "react-i18next";

export default function DraggableDialog({...res}) {
    const {t, i18n} = useTranslation("translation");
    const handleClose = () => {
        res.onClose(false);
    };
    const handleConfirm = () => {
        res.onConfirm()
        res.onClose(false);
    };

    return (
        <div>
            <Dialog
                className="w-full"
                open={res.data.show}
                onClose={handleClose}
            >
                {/*<Alert severity="warning"/>*/}
                {/*<Alert severity="info"/>*/}
                {/*<Alert severity="success"/>*/}
                <DialogTitle className="flex items-center justify-center font-[700] text-gray-500">
                    {res.title}
                </DialogTitle>
                <DialogContent className="flex">
                    {res.data?.data?.length > 0 ?
                        <Alert className="w-full flex max-w-full" severity={res.type}>
                            {t("user.you_won't_to_delete_this")}{res.text}{'/'}{res.texts} {res?.data?.data?.map((one) => {
                            return (
                                <p className='font-[700] text-red-700'>{one?.name}</p>
                            )
                        })}
                        </Alert> : <Alert className="w-full max-w-full flex" severity={res.type}>
                            {t("user.you_won't_to_delete_this")} {res.text}
                            <p className='font-[700] text-red-700'>{res.data?.data?.name}</p>
                        </Alert>}
                </DialogContent>
                <DialogActions className="flex items-center justify-center font-[700] text-gray-500">
                    <ButtonClose autoFocus onClick={handleClose} text={res.cancelText || t("user.cancel")}/>
                    <ButtonSave onClick={handleConfirm} text={res.confirmText || t("user.confirm")}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}