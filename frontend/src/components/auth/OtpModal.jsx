import { useEffect, useState } from "react"

function OtpModal({ isOpen, onClose, onVerify, onResend, loading }) {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    if(isOpen) {
      setCountdown(60)
      setOtp('')
      
      const interval = setInterval(() => {
        setCountdown((props) => {
          if(props <= 1) {
            clearInterval(interval)
            return 0
          }

          return props - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  if(!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-lg font-semibold text-white text-center">Enter OTP</h2>

        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center tracking-widest text-xl focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200" placeholder="******" />
        <button onClick={() => onVerify(otp)} disabled={loading} className="w-full px-3 py-2 bg-indigo-500 text-slate-50 font-medium rounded-md hover:shadow-lg transition-all duration-300 disabled:opacity-50">
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <div className="text-center text-sm text-gray-300">
          {countdown > 0 ? (
            <p>Resend OTP in {countdown}</p>
          ) : (
            <button onClick={onResend} className="text-indigo-400 hover:underline" disabled={loading}>
              Resend OTP
            </button>
          )}
        </div>

        <button onClick={onClose} className="block mx-auto mt-2 text-xs text-gray-400 hover:text-gray-200">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default OtpModal