// Library
import { AnimatePresence, motion } from "framer-motion"
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, children, className = '', showClose = true, width = 'max-w-lg' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .95 }}
            transition={{ duration: .2 }}
            className={`relative bg-white rounded-xl shadow-lg w-full ${width} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {showClose && (
              <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            )}

            {/* Konten Modal */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}