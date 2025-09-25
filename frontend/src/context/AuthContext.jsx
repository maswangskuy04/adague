import { createContext, useEffect, useState } from "react"
// Navigasi
import { useNavigate } from "react-router-dom"
// Jwt
import { jwtDecode } from 'jwt-decode'
// Service
import { login, register } from "../services/auth"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('userToken') || null)
  const navigate = useNavigate()

  const saveToken = (jwt) => {
    localStorage.setItem('userToken', jwt)
    setToken(jwt)
    const decodeToken = jwtDecode(jwt)
    setUser({
      id: decodeToken.id,
      email: decodeToken.email,
      fullname: decodeToken.fullname
    })
  }

  const loginFunc = async (dataUser) => {
    setLoading(true)

    try {
      const res = await login(dataUser)
      if (res.userToken) return saveToken(res.userToken);

      return res
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const registerFunc = async (dataUser) => {
    setLoading(true)

    try {
      const res = await register(dataUser)

      return res
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logoutFunc = async () => {
    localStorage.removeItem('userToken')
    setUser(null)
    setToken(null)
    navigate('/login')
  }

  useEffect(() => {
    if (token) {
      try {
        const decodeToken = jwtDecode(token)
        setUser({
          id: decodeToken.id,
          email: decodeToken.email,
          fullname: decodeToken.fullname
        })
      } catch (err) {
        console.error('Invalid token: ', err)
        logoutFunc()
      }
    }

    setInitializing(false)
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, loading, initializing, loginFunc, registerFunc, logoutFunc }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider