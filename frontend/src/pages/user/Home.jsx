// Component
import Layout from "../../components/ui/Layout"
import StatCard from "../../components/ui/StatCard"
// Context
import { useAuth } from "../../context/AuthContext"
// Library
import { AnimatePresence, motion } from "framer-motion"
import { Users, Globe, Search } from "lucide-react"
// Utils
import { getFirstName } from "../../utils/initialsUser"
// React
import { useState } from "react"
// Image
import BgHero from '../../assets/blog.svg'

function Home() {
  const { user, loading } = useAuth()
  const firstName = getFirstName(user?.fullname)
  const [showSearch, setShowSearch] = useState(true)
  const [matchedUser, setMatchedUser] = useState(null)

  return (
    <Layout>
      <div className="flex flex-col max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col my-auto space-y-6 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .5, ease: 'easeOut' }}
              className="text-3xl md:text-5xl font-extrabold text-slate-800 drop-shadow"
            >
              Hai {firstName}!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, ease: 'easeOut' }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed"
            >
              Welcome to{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500">AdaGue</span>{". "}
              A fun place to chat, make new friends, and make your day more enjoyable.
            </motion.p>

            {/* Button action Cari Partner */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }}
              disabled={loading}
              whileHover={!loading ? { y: -5 } : {}}
              whileTap={!loading ? { scale: .95 } : {}}
              className={`relative flex items-center justify-center gap-3 px-6 py-4 font-bold rounded-2xl shadow-lg overflow-hidden transition-colors transition-shadow w-full md:w-auto ${loading ? 'bg-gradient-to-r from-slate-600 to-slate-800 cursor-wait text-white' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-blue-300/50 text-white'}`}
            >
              <AnimatePresence>
                {showSearch && !loading && (
                  <motion.div
                    key='start'
                    className="relative w-8 h-8 flex items-center justify-center overflow-hidden"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="relative z-10"
                    >
                      <Search className="w-6 h-6 text-amber-200" />
                    </motion.div>

                    <motion.div
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-gray-300/70 to-transparent"
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    />

                    <motion.div
                      className="absolute inset-0 border border-white rounded-md"
                      animate={{ scale: [1, 1.15, 1], opacity: [.7, .2, .7] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Text */}
              <span className="ml-2">
                {loading ? (
                  <motion.span
                    key='loading-text'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [.3, 1, .3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Looking for friends...
                  </motion.span>
                ) : (
                  <span>Find a friend</span>
                )}
              </span>

              {/* Efek loading */}
              {loading && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: .95, ease: 'linear' }}
                  className="absolute inset-0 bg-white/20"
                />
              )}
            </motion.button>

            {matchedUser ? (
              <div className="mt-4 p-3 rounded-xl text-sm text-center font-semibold bg-green-100 text-green-800 border-b border-green-300 shadow">
                Kamu terhubung dengan {matchedUser.fullname}
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl text-sm text-center font-semibold bg-amber-100 text-amber-800 border-b border-amber-300 shadow">
                You haven't connected with anyone yet. Click the button above!
              </div>
            )}
          </div>

          <motion.div
            className="hidden md:flex items-center justify-center"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <img src={BgHero} alt="Image Hero" className="w-96 h-96 object-contain" />
          </motion.div>
        </div>

        {/* Card List User Active & User Registered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard icon={<Users size={26} />} label='Online User' color='#006d77' />
          <StatCard icon={<Globe size={26} />} label='Total Users' color='#353535' />
        </div>
      </div>
    </Layout>
  )
}

export default Home