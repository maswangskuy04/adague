import { createContext, useCallback, useContext, useEffect, useState } from "react"
// Navigasi
import { useNavigate } from "react-router-dom"
// Jwt
import { jwtDecode } from 'jwt-decode'
// Service
import { reqOtpEmail, veryfOtpEmail, logout } from "../services/auth"
import { getMe } from "../services/user"

export const AuthContext = createContext()

const decodeUser = (jwt) => {
  try {
    const { id, email, fullname, role } = jwtDecode(jwt)
    return { id, email, fullname, role }
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

  const saveToken = useCallback((jwt, sessionId) => {
    try {
      localStorage.setItem('userToken', jwt)
      if(sessionId) {
        localStorage.setItem('sessionId', sessionId)
      }
      setToken(jwt)
      const decoded = decodeUser(jwt)
      if(decoded) {
        setUser(decoded)
      }
    } catch (err) {
      console.error('Fail to save token: ', err)
    }
  }, [])

  const requestOtpEmail = useCallback(async (email) => {
    setLoading(true)

    try {
      const res = await reqOtpEmail({ email })

      return res
    } catch (err) {
      console.error('Error request otp email: ', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyOtpEmail = useCallback(async ({ email, otp }) => {
    setLoading(true)

    try {
      const res = await veryfOtpEmail({ email, otp })

      return res
    } catch (err) {
      console.error('Error verify otp email: ', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const loginWithToken = useCallback((token, sessionId) => {
    saveToken(token, sessionId)
    const { role } = decodeUser(token)
    navigate(role === 'admin' ? '/admin/dashboard' : '/home', { replace: true })
  }, [navigate, saveToken])

  const logoutFunc = useCallback(async () => {
    try {
      if (token) {
        await logout({})
      }
    } catch (err) {
      console.error('Logout error: ', err.message)
    } finally {
      localStorage.removeItem('userToken')
      localStorage.removeItem('sessionId')
      setUser(null)
      setToken(null)
      navigate('/login', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setInitializing(false)
        return
      }

      try {
        const res = await getMe()
        setUser(res.user)
      } catch (err) {
        console.error('Error fetch user: ', err)
      } finally {
        setInitializing(false)
      }
    }

    fetchUser()
  }, [token, logoutFunc])

  return (
    <AuthContext.Provider value={{ user, setUser, token, loading, initializing, saveToken, requestOtpEmail, verifyOtpEmail, loginWithToken, logoutFunc }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider