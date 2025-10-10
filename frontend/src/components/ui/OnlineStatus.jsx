import { motion } from "framer-motion"

export default function OnlineStatus({ isOnline }) {
  const status = {
    true: { color: 'bg-green-500' },
    false: { color: 'bg-red-500' }
  }

  return (
    <div className="absolute top-0 right-1 border-2 border-white rounded-full backdrop-blur-md">
      <motion.div
        animate={isOnline ? { scale: [1, 1.2, 1], opacity: [.6, 1, .6] } : { opacity: .5 }}
        transition={{ repeat: isOnline ? Infinity : 0, duration: 1.5, ease: 'easeInOut' }}
        className={`w-3 h-3 rounded-full shadow-sm ${status[isOnline]?.color}`}
      />
    </div>
  )
}