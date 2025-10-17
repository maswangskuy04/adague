// Component
import Layout from "../../../../components/ui/Layout"
// Library
import { Link } from "react-router-dom"
import { ArrowBigLeft, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { FaFacebook, FaGoogle, FaVk } from "react-icons/fa"
// Hooks
import { useAuth } from "../../../../context/AuthContext"

function ConnectedAccount() {
  const { user } = useAuth()
  const accounts = [
    { provider: 'Google', icon: <FaGoogle size={24} className="text-red-500" />, connected: false },
    { provider: 'Facebook', icon: <FaFacebook size={24} className="text-blue-600" />, connected: false },
    { provider: 'Vk', icon: <FaVk size={24} className="text-sky-600" />, connected: false }
  ]

  return (
    <Layout>
      <div className="flex flex-col max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link to='/settings' className="p-2 rounded-full border border-red-300 hover:bg-red-100 text-slate-500 transition-colors">
            <ArrowBigLeft size={18} />
          </Link>
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">Connected Accounts / Social Login</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: 'easeOut' }}
          className="bg-[#fafaff]/80 border-b-2 border-gray-300 rounded-xl shadow-sm p-5 space-y-5"
        >
          <h2 className="text-sm font-medium text-gray-600 mb-3">Primary Email</h2>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                <Mail size={20} />
              </div>
              {/* Text */}
              <div>
                <span className="text-sm font-medium text-gray-800">{user?.email || 'Not set'}</span>
                <p className="text-xs text-gray-400">This is your main sign-in method.</p>
              </div>
            </div>
            {/* Button */}
            <Link to='/profile' className="text-xs px-3 py-1.5 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition">
              Change
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: 'easeOut' }}
          className="bg-[#fafaff]/80 border-b-2 border-gray-300 rounded-xl shadow-sm p-5 space-y-5"
        >
          <h1 className="text-sm font-medium text-gray-600 mb-3">Social Logins</h1>

          <div className="text-sm text-gray-500 leading-relaxed">
            <p>
              Link your social accounts to sign in faster and more securely. 
              Once connected, you can use these platforms to access your account without entering your password.
            </p>
            <p className="mt-1 italic text-gray-400">
              (You can always disconnect them at any time.)
            </p>
          </div>

          <div className="space-y-3">
            {accounts.map((acc, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {acc.icon}
                  <div>
                    <span className="font-medium text-gray-700">{acc.provider}</span>
                    <p className="text-xs text-gray-400">{acc.connected ? 'Connected' : 'Not connected'}</p>
                  </div>
                </div>
                <button className={`text-xs px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition ${acc.connected ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  {acc.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default ConnectedAccount