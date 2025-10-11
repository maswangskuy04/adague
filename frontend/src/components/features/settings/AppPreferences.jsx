// Library
import { motion } from "framer-motion"
import { Brush } from "lucide-react"

export default function AppPreferences() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, ease: 'easeOut' }}
      className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <Brush size={20} className="text-indigo-500" />
        <h2 className="text-base md:text-lg font-medium text-gray-600">App Preferences</h2>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-gray-600">Theme</span>
          <div className="flex items-center gap-4">
            {/* Dark */}
            <label htmlFor="dark" className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="dark" id="dark" value='dark' className="hidden peer" />
              <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-300 transition-all" />
              <span className="text-sm text-gray-600 group-hover:text-indigo-500">Dark</span>
            </label>

            {/* Light */}
            <label htmlFor="light" className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="light" id="light" value='light' className="hidden peer" />
              <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-300 transition-all" />
              <span className="text-sm text-gray-600 group-hover:text-indigo-500">Light</span>
            </label>

            {/* Automatic */}
            <label htmlFor="system" className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="system" id="system" value='system' className="hidden peer" />
              <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-300 transition-all" />
              <span className="text-sm text-gray-600 group-hover:text-indigo-500">System</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-gray-600">Language</span>
          <select name="" id="" className="appearance-none pl-3 pr-8 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition cursor-pointer" defaultValue="">
            <option value="" disabled>-- Select Language --</option>
            <option value="">Indonesia</option>
            <option value="">English</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}