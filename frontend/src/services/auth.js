import API from "./api"

export const login = async (dataUser) => {
    const res = await API.post('/auth/login', dataUser)

    return res.data
}

export const register = async (dataUser) => {
    const res = await API.post('/auth/register', dataUser)

    return res.data
}