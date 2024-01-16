import API from "helpers/API";

export const _createQuiz = async (data, callBack, callBackErr) => {
    await API.request("post", "quiz/store", data, callBack, callBackErr)
}

export const _deleteQuiz = async (id, callBack, callBackErr) => {
    await API.request("get", `quiz/delete/${id}`, null, callBack, callBackErr)
}

export const _deleteQuizzes = async (ids, callBack, callBackErr) => {
    await API.request("post", `quiz/delete/quizzes`, {
        ids
    }, callBack, callBackErr)
}
export const _storeAnswers = async (data, callBack, callBackErr) => {
    return await API.request("post", `quiz/answers/store`, data, callBack, callBackErr);
};