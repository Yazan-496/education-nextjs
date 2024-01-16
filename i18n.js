"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./public/locales/en/translation.json";
import commonAe from "./public/locales/ar/translation.json";
import commonRu from "./public/locales/ru/translation.json";
import commonFa from "./public/locales/fa/translation.json";

const resources = {
    en: {
        translation: commonEn,
        direction: "ltr",
    },
    ar: {
        translation: commonAe,
        direction: "rtl",
    },
    ru: {
        translation: commonRu,
        direction: "rtl",
    },
    fa: {
        translation: commonFa,
        direction: "rtl",
    },
};
const savedLanguage =
    typeof window !== "undefined" && localStorage.getItem("language");

i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || "ar",
    debug: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
