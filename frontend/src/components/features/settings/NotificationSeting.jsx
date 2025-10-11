// Library
import { motion } from "framer-motion"
import { Bell } from "lucide-react"

export default function NotificationSetting() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, ease: 'easeOut' }}
      className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <Bell size={20} className="text-indigo-500" />
        <h2 className="text-base md:text-lg font-medium text-gray-600">Notification Settings</h2>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-gray-600">Notification push</span>
          <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-300`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}></span>
          </button>
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-gray-600">Do not disturb</span>
          <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-300`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}></span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}