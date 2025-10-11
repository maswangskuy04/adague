// Component
import Modal from "../../ui/Modal"
// Library
import { motion } from "framer-motion"
import { User } from "lucide-react"
// Hooks
import { useAuth } from "../../../context/AuthContext"
// React
import { useState } from "react"

function PreviewAvatar({ isOpen, onClose }) {
  const { user } = useAuth()
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false} width="w-60">
      <button onClick={() => { setPreviewOpen(true) }} className="w-full text-left text-sm font-medium hover:bg-slate-100 p-2 rounded">
        See photo
      </button>
      <button className="w-full text-left text-sm font-medium hover:bg-slate-100 p-2 rounded">
        Change photo
      </button>
      {user?.avatar && (
        <button className="w-full text-left text-sm font-medium text-red-500 hover:bg-red-50 p-2 rounded">
          Delete photo
        </button>
      )}

      {previewOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setPreviewOpen(false)}
        >
          {user?.avatar ? (
            <img src={user?.avatar} alt="Preview Photo Profile " className="flex bg-black/90 flex items-center justify-center z-50" />
          ) : (
            <User className="w-32 h-32 text-white" />
          )}
        </motion.div>
      )}
    </Modal>
  )
}

export default PreviewAvatar