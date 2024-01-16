"use client"
import {useTranslation} from "react-i18next";
import * as React from 'react';
import {Autocomplete, Box, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {usePathname, useRouter} from "next/navigation";

const LanguageDropDown = (props) => {
    const router= useRouter()
    const pathName= usePathname()
    const {t, i18n} = useTranslation("translation");
    let [lang, setLang] = useState({
    })
    const languages = [
        {
        code: 'SY',
        label: 'ar',
        name: "العربية",
        flag: "https://flagcdn.com/w40/sy.png"
    },
        {
            code: 'GB',
            label: 'en',
            name: "English",
            flag: "https://flagcdn.com/w40/gb.png"
        },
        {
            code: 'RU',
            label: 'ru',
            name: "русский",
            flag: "https://flagcdn.com/w40/ru.png"
        },
        {
            code: 'IR',
            label: 'fa',
            name: "فارسی",
            flag: "https://flagcdn.com/w40/ir.png"
        },
    ]
    const ChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        // console.log(i18n.language);
        localStorage.setItem("language", language);
        Cookies.set("language", language);
        const direction = language === "ar" ? "rtl" : "ltr";
        if (typeof window !== "undefined") {
            document.documentElement.lang = language;
            // document.documentElement.dir = direction;
        }
        // router.refresh()
        window.location.href = pathName;
    };

    const handleChangeLang = (lan) => {
        if (lan !== lang.label) {
            ChangeLanguage(lan);
        }
    };
    useEffect(() => {
        const defaultLang = languages.find((language) => language.label === i18n.language)
        setLang(defaultLang)
    }, [i18n])
    return  (
        <div className="">
            <Autocomplete
                disableClearable
                className="text-sm h-full"
                size="small"
                sx={{width: "15vh"}}
                options={languages}
                value={lang}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box style={{
                        fontSize: "1.3vh",
                        width: "15vh",
                        height: "5vh"
                    }} component="li" sx={{'& > img': {mr: "2vh", flexShrink: 0}}} {...props}>
                        <img
                            loading="lazy"
                            width="20vh"
                            srcSet={`${option.flag} 2x`}
                            src={`${option.flag}`}
                            alt=""
                        />
                        {option.name}
                    </Box>
                )}
                onChange={(event, newValue) => {
                    handleChangeLang(newValue.label);
                }}
                renderInput={(params) => (
                    <TextField
                        size={"small"}
                        {...params}
                        label={lang?.label === 'en' ? 'language' : lang?.label === 'ru' ? 'язык' : lang?.label === 'fa' ? 'زبان' :"اللغة"}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                        }}
                    />
                )}
            />
        </div>
    );
};

export default LanguageDropDown;
