// Component
import AuthFormWrapper from "../../../components/auth/AuthFormWrapper";
// Icon
import { ArrowLeftSquare, Phone } from 'lucide-react'
// Library
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"

function LoginPhone() {
  const navigate = useNavigate()

  return (
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

      <form className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="block text-sm text-slate-300">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <Phone size={20} className="text-slate-200" />
            </div>
            <input type="tel" id="phone" name="phoneNumber" inputMode="numeric" pattern="^(\+62|62|0)8[1-9][0-9]{6,11}$" className="w-full bg-gray-500/30 border border-gray-500 rounded px-3 py-1.5 pl-10 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400" placeholder="Input valid phone number" />
          </div>
        </div>
        <button className="w-full px-3 py-2 bg-indigo-500 text-slate-50 font-medium rounded-md hover:shadow-lg transition-all duration-300">Continue</button>
      </form>
    </AuthFormWrapper>
  )
}

export default LoginPhone