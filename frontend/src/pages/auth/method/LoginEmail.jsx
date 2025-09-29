// Component
import AuthFormWrapper from "../../../components/auth/AuthFormWrapper"
// Icon
import { ArrowLeftSquare, Mail } from 'lucide-react'
// Library
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"

function LoginEmail() {
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
      <form onSubmit={submit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block text-sm text-slate-300">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <Mail size={20} className="text-slate-200" />
            </div>
            <input type="email" id="email" name="email" className="w-full bg-gray-500/30 border border-gray-500 rounded px-3 py-1.5 pl-10 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400" placeholder="Input valid email" />
          </div>
        </div>
        <button className="w-full px-3 py-2 bg-indigo-500 text-slate-50 font-medium rounded-md hover:shadow-lg transition-all duration-300">Continue</button>
      </form>
    </AuthFormWrapper>
  )
}

export default LoginEmail