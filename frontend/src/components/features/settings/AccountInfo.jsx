// Library
import { AnimatePresence, motion } from "framer-motion"
import { Cable, ClockFading, Dock, Lock, User } from "lucide-react"
// React
import { useState } from "react"

export default function AccountInfo() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const menuItems = [
    { icon: <User size={20} />, label: 'Personal Information' },
    { icon: <Lock size={20} />, label: 'Security & Privacy' },
    { icon: <Cable size={20} />, label: 'Connected Accounts / Social Login' },
    { icon: <ClockFading size={20} />, label: 'Activity & History' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, ease: 'easeOut' }}
      className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <Dock size={20} className="text-indigo-500" />
        <h2 className="text-base md:text-lg font-medium text-gray-600">Account Information</h2>
      </div>
      
      <div className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative px-3 py-2 hover:pl-4 flex items-center gap-4 w-full rounded-md text-gray-600 hover:bg-gray-200 transition-all duration-200"
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -8 }}
                  animate={{ opacity: 1, width: 6, x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -8 }}
                  transition={{ duration: .2, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
                />
              )}
            </AnimatePresence>   
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}