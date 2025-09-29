// Navigasi
import { useNavigate } from "react-router-dom"
// Icon
import { Mail, Phone } from 'lucide-react'
// Component
import AuthFormWrapper from "../../components/auth/AuthFormWrapper"
import SocialLogin from "../../components/auth/SocialLogin"

function LoginMethod() {
  const navigate = useNavigate()

  const methods = [
    {
      key: 'email',
      label: 'Continue with Email',
      icon: <Mail className="h-5 w-5 text-slate-200" />,
      to: '/login/email'
    },
    {
      key: 'phone',
      label: 'Continue with Phone Number',
      icon: <Phone className="h-5 w-5 text-slate-200" />,
      to: '/login/phone'
    }
  ]

  return (
    <AuthFormWrapper title='Choose a login method'>
      <div className="space-y-4">
        {methods.map(({ key, label, icon, to }) => (
          <button
            key={key}
            onClick={() => navigate(to)}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg border border-gray-400 hover:bg-gray-800 transition"
          >
            {icon}
            <span className="flex-1 text-left font-medium text-slate-200">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-300">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <SocialLogin />
      </div>
    </AuthFormWrapper>
  )
}

export default LoginMethod