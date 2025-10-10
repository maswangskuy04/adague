import API from "./api"

export const getMe = async (data) => {
    const res = await API.get('/user/me', data)

    return res.data
}