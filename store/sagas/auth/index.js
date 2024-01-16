import {all, delay, fork, put, takeEvery} from "@redux-saga/core/effects";
import {fetchDataError} from "../../actions";
import {startAuthLoading, stopAuthLoading} from "../../actions/auth";
import Cookies from "js-cookie"; // Import js-cookie
import API from "helpers/API";
import store from "store/index";

function* fetchRegisterSaga(action, callBack, callBackErr) {
    const data = action?.payload?.formData;
    yield put(startAuthLoading());
    delay(6000);
    try {
        if (data) {
            const user = yield API.request("post", `auth/signup`, {
                name: data?.name,
                email: data?.email,
                password: data?.password,
            }, callBack, callBackErr);
            if (user?.data) {
            }
        }
        yield put(stopAuthLoading());
    } catch (error) {
        delay(6000);
        yield put(stopAuthLoading());
        yield put(fetchDataError(error));
    }
}

function* fetchLoginSaga(action, callBack, callBackErr) {
    const data = action?.payload;
    yield put(startAuthLoading());
    delay(6000);
    try {
        if (data) {
            const user = yield API.request("post", `auth/login`, {
                email: data?.email,
                password: data?.password,
            }, callBack, callBackErr);
            if (user?.user) {
                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "USER_DATA",
                        JSON.stringify({
                            user: user?.user,
                        })
                    );
                }
                Cookies.set("token", user?.user?.api_token);
                Cookies.set("user", JSON.stringify({user: user?.user}));
                if (typeof window !== "undefined") {
                    window.location.href = "/";
                }
            }
        }
        yield put(stopAuthLoading());
    } catch (error) {
        delay(6000);
        yield put(stopAuthLoading());
        yield put(fetchDataError(error));
    }
}

function* fetchRegisterWatch() {
    yield takeEvery("REGISTER", fetchRegisterSaga);
}

function* fetchLoginWatch() {
    yield takeEvery("LOGIN", fetchLoginSaga);
}

export function* AuthSaga() {
    yield all([fork(fetchRegisterWatch)]);
    yield all([fork(fetchLoginWatch)]);
}
