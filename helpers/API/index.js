"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {getAuthToken, getLangCode} from "./utils";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

let baseURLocalStorage;
if (typeof window !== "undefined") {
        baseURLocalStorage = localStorage.getItem("BASE_URL") || baseUrl;
}

const API = {
        request: async (method, url, data, callBack, callBackErr) => {
                try {
                        const requestOptions = {
                                method,
                                headers: {
                                        "Content-Type": "application/json",
                                },
                        };
                        const langCode = await getLangCode();
                        requestOptions.headers.lang = langCode;

                        const token = getAuthToken();
                        if (token) {
                                requestOptions.headers.Authorization = `Bearer ${token}`;
                        }
                        if (data) {
                                requestOptions.body = JSON.stringify(data);
                        }

                        const response = await fetch(baseUrl + url, requestOptions);
                        const responseBody = await response.json();
                        if (!response.ok) {
                                const errorMessage = responseBody.errors.length > 0
                                    ? responseBody.errors.join(', ')
                                    : "Request Failed";
                                showNotification("error", "Request Successful", errorMessage);
                                callBackErr(errorMessage)
                        }
                        else {
                                showNotification(
                                    "success",
                                    "Request Successful",
                                    responseBody?.message ?  responseBody?.message : "Request Successful"
                                );
                                callBack(responseBody)
                        }
                        return responseBody;
                } catch (error) {
                        callBackErr(error)
                        showNotification(
                            "success",
                            "Request Successful",
                            error?.message ?  error?.message : "Request Successful"
                        );
                        throw error;
                }
        },
};

// const showNotification = (type, message, description) => {
//   console.log("not");
//   return <Toast message={description} timeout={4000} />;
// };

export const showNotification = (type, message, description) => {
        const toastProps = {
                type,
                className: "toast",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                newestOnTop: false,
                rtl: false,
                pauseOnHover: false,
                draggable: false,
                progress: false,
        };

        toast(description, {...toastProps});
};
export default API;
