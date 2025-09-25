import bgAuth from '../../assets/bg_auth.svg'
// Motion
import { AnimatePresence, motion } from 'framer-motion'
// Icon
import { Mail, Lock, Send } from 'lucide-react'
// Navigasi
import { Link } from 'react-router-dom'

function LoginPage() {

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-3">
      <img src={bgAuth} alt="Background Login Website" className='absolute w-full h-full object-cover' />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gray-900/60' />

      <main className='relative z-10 w-full max-w-md space-y-8'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-center text-indigo-300 drop-shadow-lg'>Ada<span className='text-yellow-300'>Gue</span></h1>

        <form className="space-y-6">
          {/* Email */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: .3, delay: 0 }}
              className='flex justify-start'
            >
              <div className='bg-gray-200 px-4 py-3 rounded-2xl rounded-tl-lg shadow-md max-w-xs relative z-10'>
                <div className='absolute top-0 -left-1 bg-gray-200 rounded-bl-3xl rounded-tl-md w-4 h-2 shadow-bl-md -z-10' />
                <div className='flex items-center gap-3 mb-2'>
                  <Mail className='h-5 w-5 text-slate-600' />
                  <label htmlFor="email" className='block text-sm text-slate-600 font-medium'>Email</label>
                </div>

                <input type="email" name='email' id='email' placeholder='chatapp@example.com' className='bg-transparent outline-none w-full placeholder-slate-400 text-slate-600' />
                {/* {errors.email && <p className='text-red-700 text-sm mt-1'>{errors.email}</p>} */}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Password */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: .3, delay: .3 }}
              className='flex justify-end'
            >
              <div className='bg-gray-200 px-4 py-3 rounded-2xl rounded-tr-lg shadow-md max-w-xs relative z-10'>
                <div className='absolute top-0 -right-1 bg-gray-200 rounded-br-3xl rounded-tr-md w-4 h-2 shadow-br-md -z-10' />
                <div className='flex items-center gap-3 mb-2'>
                  <Lock className='h-5 w-5 text-slate-600' />
                  <label htmlFor="password" className='block text-sm text-slate-600 font-medium'>Password</label>
                </div>

                <input type="password" name='password' id='password' placeholder='********' className='bg-transparent outline-none w-full placeholder-slate-400 text-slate-600' />
                {/* {errors.password && <p className='text-red-700 text-sm mt-1'>{errors.password}</p>} */}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Button */}
          <div className='flex justify-end'>
            <button className={`w-full flex items-center rounded-lg shadow-md overflow-hidden transition-all duration-200 bg-gray-100 hover:shadow-lg`}>
              <div className='flex-1 px-4 py-3 text-left font-medium text-slate-700'>
                {/* {loading ? 'Memproses...' : 'Masuk Sekarang'} */}
                Masuk Sekarang
              </div>

              <div className={`px-4 h-full flex items-center justify-center bg-gray-300 bg-yellow-300 hover:bg-yellow-400`}>
                <Send size={18} className='text-slate-800' />
              </div>
            </button>
          </div>
        </form>

        <p className='text-sm mt-6 text-center text-slate-200'>Belum punya akun? <Link to='/register' className='text-yellow-300 font-semibold hover:underline'>Daftar disini</Link></p>
      </main>
    </div>
  )
}

export default LoginPage