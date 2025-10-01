import API from "./api"

export const reqOtpEmail = async (email) => {
    const res = await API.post('/auth/request-otp', email)

    return res.data
}

export const veryfOtpEmail = async ({email, otp}) => {
    const res = await API.post('/auth/verify-otp', { email, otp })
    
    return res.data
}