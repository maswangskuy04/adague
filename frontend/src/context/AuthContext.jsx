import { createContext, useContext, useEffect, useState } from "react"
// Navigasi
import { useNavigate } from "react-router-dom"
// Jwt
import { jwtDecode } from 'jwt-decode'
// Service
import { reqOtpEmail, veryfOtpEmail } from "../services/auth"

export const AuthContext = createContext()

const decodeUser = (jwt) => {
  try {
    const { id, email, fullname } = jwtDecode(jwt)
    return { id, email, fullname }
  } catch (err) {
    console.error('Invalid token: ', err)
    return null
  }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('userToken') || null)
  const navigate = useNavigate()

  const saveToken = (jwt) => {
    localStorage.setItem('userToken', jwt)
    setToken(jwt)
    const decoded = decodeUser(jwt)
    if(decoded) setUser(decoded);
  }

  const requestOtpEmail = async (email) => {
    setLoading(true)

    try {
      const res = await reqOtpEmail({ email })

      return res
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const verifyOtpEmail = async ({ email, otp }) => {
    setLoading(true)

    try {
      const res = await veryfOtpEmail({ email, otp })

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
      const decoded = decodeUser(token)

      if(decoded) {
        setUser(decoded)
      } else {
        logoutFunc()
      }
    }

    setInitializing(false)
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, loading, initializing, requestOtpEmail, verifyOtpEmail, logoutFunc }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider