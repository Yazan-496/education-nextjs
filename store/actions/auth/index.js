import API from "helpers/API";
import Cookies from "js-cookie";

export const startAuthLoading = () => ({
    type: "AUTH_START_LOADING",
});

export const stopAuthLoading = () => ({
    type: "AUTH_STOP_LOADING",
});
export const addImageSrc = (data) => ({
    type: "Add_Image_Src",
    payload: data
});

export const _login = async (data, callBack, callBackErr) => {
    await API.request("post", "auth/login", {
            email: data.email,
            password: data.password,
        },
        callBack, callBackErr)
}
export const _createUser = async (data, callBack, callBackErr) => {
    await API.request("post", "auth/signup", {
            name: data.name,
            email: data.email,
            photo: data.photo,
            password: data.password,
            role_id: data.role.value
        },
        callBack, callBackErr)
}
export const _getRolesAsync = async () => {
    const roles = await API.request("get", "auth/roles")
    // console.log(roles)
    const result = roles.map((role) => {
        return {
            label: role.name,
            value: role.id
        }
    })
    // console.log(result, "result")
    return result

}

export const _editUser = async (data, callBack, callBackErr) => {
    await API.request("post", "auth/user/edit", {
        ...data,
        role_id: data.role.value,
        photo: data.photo
    }, callBack, callBackErr)
}
export const _deleteUser = async (id, callBack, callBackErr) => {
    await API.request("get", `auth/user/delete/${id}`, null, callBack, callBackErr)
}
export const _deleteUsers = async (ids, callBack, callBackErr) => {
    await API.request("post", `auth/user/delete/users`, {
        ids
    }, callBack, callBackErr)
}
