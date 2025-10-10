import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

function StatCard({ icon, label, color, value: staticValue, socketEvent }) {
  const [displayCount, setDisplayCount] = useState(staticValue || 0)
  const targetCount = useRef(staticValue || 0)

  return (
    <motion.div
      initial={{ opacity: 0, scale: .9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .4, ease: 'easeOut' }}
      style={{ background: `linear-gradient(135deg, ${color}15, #ffffff40)`, border: `1px solid ${color}30` }}
      className="relative p-4 rounded-xl shadow-md backdrop-blur-lg overflow-hidden"
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ backgroundColor: color }} />

      {/* Content */}
      <div className="flex items-center gap-4 relative z-10">
        <div style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }} className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md`}>
          {icon}
        </div>

        {/* Text & Number */}
        <div className="flex flex-col">
          <p style={{ color }} className="text-xs font-semibold uppercase tracking-wide opacity-80">
            {label}
          </p>

          <AnimatePresence mode="popLayout">
            <motion.span
              key={displayCount}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: .25 }}
              style={{ color: color }}
              className="text-2xl font-bold"
            >
              {displayCount}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default StatCard