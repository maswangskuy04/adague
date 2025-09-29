// Background website
import BgAuth from '../../assets/bg_auth.svg'
// Component
import SocialLogin from '../../components/auth/SocialLogin'

function AuthFormWrapper({ title, children, footer }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <img
        src={BgAuth}
        alt="Background Website"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gray-900/60 -z-10" />

      {/* Card */}
      <main className="relative w-full max-w-md border border-gray-700 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-600 drop-shadow-sm">
            Ada<span className="text-yellow-400">Gue</span>
          </h1>
          <h2 className="text-lg font-medium text-slate-300">{title}</h2>
        </div>

        {/* Form content */}
        <div className="space-y-6">{children}</div>

        {/* Footer */}
        {footer && (
          <p className="text-sm text-center text-slate-600">{footer}</p>
        )}
      </main>
    </div>
  )
}

export default AuthFormWrapper
