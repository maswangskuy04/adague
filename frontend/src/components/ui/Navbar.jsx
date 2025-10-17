// Context
import { useAuth } from "../../context/AuthContext"
// React
import { useEffect, useRef, useState } from "react"
// Utils
import { getInitials } from "../../utils/initialsUser"
// Library
import { AnimatePresence, motion } from "framer-motion"
import { LogOut, Menu, Settings, User } from "lucide-react"
// API
import { BASE_URL } from "../../services/api"
import { Link } from "react-router-dom"
// Hooks
import useClickOutside from "../../hooks/useClickOutside"

function Navbar() {
  const { user, logoutFunc } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menu = useRef()
  const [scrolled, setScrolled] = useState(false)
  const profileName = getInitials(user?.fullname)

  const menuItems = [
    { label: 'Profile', icon: <User />, to: '/profile' },
    { label: 'Settings', icon: <Settings />, to: '/settings' },
    { label: 'Logout', icon: <LogOut />, action: logoutFunc, danger: true }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useClickOutside(menu, () => setIsOpen(false))

  return (
    <nav ref={menu} className={`fixed top-0 right-0 w-full px-6 py-2 z-50 transition-all duration-200 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-md' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-blue-500 drop-shadow-sm">Ada<span className="text-yellow-500">Gue</span></h3>

        <div className="relative">
          <button onClick={() => setIsOpen((prev) => !prev)} className="group flex items-center gap-2 p-2 rounded-full hover:bg-gray-500/50 transition-colors">
            {user?.avatar ? (
              <div className="w-9 h-9 border-2 border-gray-500 rounded-full">
                <img src={user?.avatar ? `${BASE_URL}/api/uploads/${user.avatar}` : ''} alt="Foto Pengguna" className="w-full h-full object-cover rounded-full" />
              </div>
            ) : (
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-yellow-500 text-white font-bold shadow-md">
                {profileName}
              </div>
            )}
            <Menu size={22} className="group-hover:text-white text-gray-600" />
          </button>

          {/* Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: .95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1, y: -5 }}
                transition={{ duration: .2, ease: 'easeOut' }}
                className="absolute top-full right-0 origin-top-right"
              >
                <div className="bg-white/30 backdrop-blur-md shadow-sm rounded-3xl p-3 w-40 border border-slate-200">
                  {menuItems.map((item, index) => {
                    const content = (
                      <div className={`flex items-center gap-3 p-2 rounded-md ${item.danger ? 'text-red-500 hover:bg-red-500 hover:text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
                        {item.icon}
                        {item.label}
                      </div>
                    )

                    return item.to ? (
                      <Link
                        key={index}
                        to={item.to}
                        onClick={() => { setIsOpen(false); if (item.action) item.action() }}
                      >
                        {content}
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => { setIsOpen(false); if (item.action) item.action() }}
                        className="w-full text-left"
                      >
                        {content}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}

export default Navbar