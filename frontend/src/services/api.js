import axios from 'axios'

export const BASE_URL = 'http://localhost:5000'

const API = axios.create({
    baseURL: `${BASE_URL}/api`
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },

    (err) => Promise.reject(err)
)

// response ketika server mati
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if(!err.response) {
            return Promise.reject(new Error('Gagal terhubung ke server, coba lagi nanti.'))
        }

        // jika token expired atau invalid
        if(err.response.status === 401) {
            localStorage.removeItem('userToken')
            window.location.href = '/login'
        }

        return Promise.reject(new Error(err.response.data?.message))
    }
)

export default API