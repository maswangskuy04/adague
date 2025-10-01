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

function LoginEmail() {
  const { requestOtpEmail, verifyOtpEmail, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [showOtpModal, setShowOtpModal] = useState(false)
  const alert = useAlert()

  const onsubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await requestOtpEmail(email)

      if(res.success) {
        setShowOtpModal(true)
      } else {
        alert.error(res.message)
      }
    } catch (err) {
      alert.error(err.message)
      console.error('Error request otp: ', err.message)
    }
  }

  const handleVerify = async (otp) => {
    try {
      const res = await verifyOtpEmail({ email, otp })
  
      if(res.success) {
        alert.success(res.message)
        console.log(res)
      } else {
        console.error(res.message)
      }
    } catch (err) {
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
        <form onSubmit={onsubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block text-sm text-slate-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Mail size={20} className="text-slate-200" />
              </div>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-500/30 border border-gray-500 rounded px-3 py-1.5 pl-10 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400" placeholder="Input valid email" />
            </div>
          </div>
          <button className="w-full px-3 py-2 bg-indigo-500 text-slate-50 font-medium rounded-md hover:shadow-lg transition-all duration-300">Continue</button>
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