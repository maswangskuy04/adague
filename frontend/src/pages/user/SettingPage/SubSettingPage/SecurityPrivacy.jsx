// Component
import Layout from "../../../../components/ui/Layout"
// Navigasi
import { Link } from "react-router-dom"
// Library
import { ArrowBigLeft, Clock, Dot, KeyRound, Laptop } from "lucide-react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
// Hooks
import { useAuth } from "../../../../context/AuthContext"
import { usePasswordStrength } from "../../../../hooks/usePasswordStrength"
// React
import { useState } from "react"
import { useEffect } from "react"
// Service
import { getLoginHistory } from "../../../../services/user"
import Skeleton from "../../../../components/ui/Skeleton"
import SettingSection from "../../../../components/features/settings/SettingSection"
import SettingCard from "../../../../components/features/settings/SettingCard"

function SecurityPrivacy() {
  const { user } = useAuth()
  const { strength, valueStrength } = usePasswordStrength()
  const [password, setPassword] = useState('')
  const [isAnonim, setIsAnonim] = useState(false)
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const activeSessionId = localStorage.getItem('sessionId')

  const handleChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    valueStrength(value)
  }

  const getStrengthLabel = (value) => {
    if (value <= 2) return 'Weak'
    if (value === 3) return 'Medium'
    if (value === 4) return 'Strong'
    return 'Very Strong'
  }

  useEffect(() => {
    setIsLoading(true)
    getLoginHistory()
    .then((data) => setHistory(data))
    .finally(() => setIsLoading(false))
  }, [])

  return (
    <Layout>
      <div className="flex flex-col max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link to='/settings' className="p-2 rounded-full border border-red-300 hover:bg-red-100 text-slate-500 transition-colors">
            <ArrowBigLeft size={18} />
          </Link>
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">Security & Privacy</h1>
        </div>

        <SettingSection>
          <SettingCard>
            <div className="flex flex-col space-y-3">
              {!user?.password ? (
                <div className="bg-red-500 px-3 py-2 border-b-2 border-red-300 rounded-md">
                  <p className="text-sm font-medium text-white">No password has been set. Please create a password to make signing in more secure and convenient.</p>
                </div>
              ) : (
                <div className="bg-green-500 px-3 py-2 border-b-2 border-green-300 rounded-md">
                  <p className="text-sm font-medium text-white">A password has been set for your account.</p>
                </div>
              )}
              <form action="" className="space-y-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-500">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center p-3.5 pointer-events-none">
                      <KeyRound size={20} className="text-slate-400" />
                    </div>
                    <input type="password" name="password" id="password" value={password} onChange={handleChangePassword} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(!!password)} className="w-full mt-1 border rounded-lg px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all" />
                  </div>
                  {isFocused && (
                    <div className="mt-2 flex items-center gap-2 w-full max-w-xs">
                      <div className="relative w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className={`absolute top-0 left-0 h-full transition-all duration-300 ${strength <= 2 ? 'bg-red-500' : strength === 3 ? 'bg-yellow-500' : strength === 4 ? 'bg-green-400' : 'bg-green-600'}`} style={{ width: strength <= 2 ? '25%' : strength === 3 ? '50%' : strength === 4 ? '75%' : '100%' }} />
                      </div>
                      <span className="text-sm text-slate-600 min-w-[80px]">{getStrengthLabel(strength)}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-500">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center p-3.5 pointer-events-none">
                      <KeyRound size={20} className="text-slate-400" />
                    </div>
                    <input type="password" name="confirm_password" id="confirm_password" className="w-full mt-1 border rounded-lg px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="mt-2 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm md:text-base rounded-md active:scale-[0.95] transition-all duration-200">Save changes</button>
                </div>
              </form>
            </div>
          </SettingCard>
        </SettingSection>

        <SettingSection delay={0.3}>
          <SettingCard>
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-gray-500 font-medium">Anonymous User</span>
              <div className="grid grid-cols-2 items-center gap-3">
                <span className="py-1.5 px-3 text-xs md:text-sm font-bold text-slate-600">
                  {isAnonim ? 'Yes' : 'No'}
                </span>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnonim ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnonim ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </SettingCard>
        </SettingSection>

        <SettingSection delay={0.6}>
          <SettingCard icon={<Clock size={20} className="text-indigo-500" />} title='Login Activity'>
            <div className="flex flex-col space-y-3">
              <span className="text-xs md:text-sm text-gray-500 font-medium">Last login</span>

              <div className="flex flex-col space-y-2">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-3 py-2 rounded-lg border bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Skeleton variant="circle" className="w-8 h-8" />
                        <div className="flex flex-col">
                          <Skeleton className="h-4 w-36 mb-1" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end space-y-1">
                        <Skeleton className="h-3 w-40" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                  ))
                ) : (
                  history.map((item) => {
                    const isActive = activeSessionId === item.sessionId
  
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col md:flex-row md:items-center justify-between gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-green-200 text-green-700' : 'bg-indigo-100 text-indigo-600'}`}>
                            <Laptop />
                          </div>
  
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">
                              {item.deviceType || 'Unknown Device'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.location || 'Unknown'}
                            </span>
                          </div>
                        </div>
  
                        <div className="flex flex-col md:items-end text-xs text-gray-500">
                          {isActive && (
                            <span className="mb-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                              <Dot className="animate-pulse" />Active
                            </span>
                          )}
                          <span className="truncate max-w-xs md:max-w-sm opacity-80">{item.userAgent}</span>
                          <span>{formatDistanceToNow(new Date(item.loggedInAt), { addSuffix: true, locale: id })}</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </SettingCard>
        </SettingSection>
      </div>
    </Layout>
  )
}

export default SecurityPrivacy