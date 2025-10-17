import { motion } from "framer-motion"

export default function ProfileSection({ title, children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, ease: 'easeOut', delay }}
      className={`flex flex-col max-w-3xl w-full mx-auto space-y-4 mt-3 ${className}`}
    >
      {title && (
        <h1 className="text-lg md:text-xl font-semibold text-slate-700">
          {title}
        </h1>
      )}
      {children}
    </motion.div>
  )
}