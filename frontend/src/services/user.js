import API from "./api"

export const getMe = async (data) => {
    const res = await API.get('/user/me', data)

    return res.data
}

export const updateUser = async (dataUser) => {
    const res = await API.put('/user/me', dataUser)

    return res.data
}

export const updateAnonim = async (isAnonim) => {
    const res = await API.patch('/user/anonim', { isAnonim })

    return res.data
}

export const getAnonim = async () => {
    const res = await API.get('/user/anonim')

    return res.data
}

export const uploadAvatar = async (file) => {
    try {
        const formData = new FormData()
        formData.append('avatar', file)

        const res = await API.post('/user/avatar', formData)
        return res.data
    } catch (err) {
        throw err
    }
}

export const getLoginHistory = async () => {
    const res = await API.get('/user/login-history')

    return res.data
}