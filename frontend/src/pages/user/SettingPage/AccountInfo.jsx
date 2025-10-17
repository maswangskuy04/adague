// Library
import { AnimatePresence, motion } from "framer-motion"
import { Cable, ClockFading, Dock, Lock } from "lucide-react"
// Navigasi
import { Link } from "react-router-dom"
// React
import { useState } from "react"
// Component
import SettingSection from "../../../components/features/settings/SettingSection"
import SettingCard from "../../../components/features/settings/SettingCard"

export default function AccountInfo() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const menuItems = [
    { icon: <Lock size={20} />, label: 'Security & Privacy', to: '/settings/security&privacy' },
    { icon: <Cable size={20} />, label: 'Connected Accounts / Social Login', to: '/settings/connected_account_social' },
    { icon: <ClockFading size={20} />, label: 'Activity & History' }
  ]

  return (
    <SettingSection>
      <SettingCard icon={<Dock size={20} className="text-indigo-500" />} title='Account Information'>
        <div className="flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-3 py-2 hover:pl-4 flex items-center gap-4 w-full rounded-md text-xs md:text-sm text-gray-600 hover:bg-indigo-100 transition-all duration-200"
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
            </Link>
          ))}
        </div>
      </SettingCard>
    </SettingSection>
  )
}