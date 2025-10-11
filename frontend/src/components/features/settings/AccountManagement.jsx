// Library
import { motion } from "framer-motion"
import { ArrowLeftRight, Trash } from 'lucide-react'

export default function AccountManagement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, ease: 'easeOut' }}
      className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeftRight size={20} className="text-indigo-500" />
        <h2 className="text-base md:text-lg font-medium text-gray-600">Data & Account Management</h2>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-gray-600">Export data</span>
          <div className="relative">
            <select name="" id="" className="appearance-none pl-3 pr-8 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition cursor-pointer" defaultValue="">
              <option value="" disabled>-- Choose Format ---</option>
              <option value="">PDF</option>
              <option value="">Excel</option>
              <option value="">CSV</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-gray-600">Clear history / cache</span>
          <div className="items-end">
            <button className="group px-3 py-1.5 flex items-center gap-2 text-gray-600 border border-gray-200 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300">
              <Trash size={20} />
              <span className="text-sm font-medium">Clear</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between px-3 py-2 rounded-lg border border-red-200 bg-red-50">
          <div className="flex flex-col">
            <span className="text-red-600 font-semibold text-sm">Danger zone</span>
            <span className="text-gray-600">Choose your action</span>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            <button
              className="w-full md:w-auto group px-4 py-2 flex items-center gap-2 border border-yellow-300 text-yellow-700 rounded-md hover:bg-yellow-500 hover:text-white transition-all duration-300"
            >
              <Trash size={18} />
              <span className="text-sm font-medium">Temporarily delete</span>
            </button>

            <button
              className="w-full md:w-auto group px-4 py-2 flex items-center gap-2 border border-red-300 text-red-600 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <Trash size={18} />
              <span className="text-sm font-medium">Permanently delete</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}