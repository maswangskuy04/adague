// Component
import AuthFormWrapper from "../../../components/auth/AuthFormWrapper"
import OtpModal from "../../../components/auth/OtpModal"
// Icon
import { ArrowLeftSquare, Mail } from 'lucide-react'
// Library
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
// Hooks
import { useAuth } from "../../../context/AuthContext"
import { useAlert } from "../../../context/AlertContext"
import { useFormValidation } from "../../../hooks/useFormValidation"

function LoginEmail() {
  const { requestOtpEmail, verifyOtpEmail, loading, loginWithToken } = useAuth()
  const { values, errors, handleChange, validateAll } = useFormValidation({ email: '' })
  const navigate = useNavigate()
  const [showOtpModal, setShowOtpModal] = useState(false)
  const alert = useAlert()

  const handleSubmit = async (e) => {
    e.preventDefault()
    validateAll()

    try {
      const res = await requestOtpEmail(values.email)

      if(res.success) {
        alert.showAlert(res.message, 'success')
        setShowOtpModal(true)
      } else {
        alert.showAlert(res.message, 'error')
      }
    } catch (err) {
      alert.showAlert(err.message, 'error')
      console.error('Error request otp: ', err.message)
    }
  }

  const handleVerify = async (otp) => {
    try {
      const res = await verifyOtpEmail({ email: values.email, otp })
  
      if(res.success) {
        alert.showAlert(res.message, 'success')
        loginWithToken(res.token)
      } else {
        alert.showAlert(res.message, 'error')
        console.error(res.message)
      }
    } catch (err) {
      alert.showAlert(err.message, 'error')
      console.error(err.message)
    }
  }

  return (
    <>
      <AuthFormWrapper>
        <motion.button
          initial={{ opacity: 0, scale: .75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .3, ease: 'easeOut' }}
          onClick={() => navigate('/login')}
          className="absolute top-5 left-5 p-2"
        >
          <ArrowLeftSquare className="text-white" />
        </motion.button>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block text-sm text-slate-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Mail size={20} className="text-slate-200" />
              </div>
              <input type="email" id="email" name="email" value={values.email} onChange={handleChange} disabled={loading} className="w-full bg-gray-500/30 border border-gray-500 rounded px-3 py-1.5 pl-10 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400" placeholder="Input valid email" />
            </div>
            {errors && <p className="text-sm text-red-400">{errors.email}</p>}
          </div>
          <button disabled={loading} className={`w-full px-3 py-2 bg-indigo-500 text-slate-50 font-medium rounded-md hover:shadow-lg transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {loading ? 'Please wait...' : 'Continue'}
          </button>
        </form>
      </AuthFormWrapper>

      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleVerify}
        loading={loading}
      />
    </>
  )
}

export default LoginEmail