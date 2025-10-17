// Component
import Modal from "../../ui/Modal"
// Library
import { motion } from "framer-motion"
import { User } from "lucide-react"
// Hooks
import { useAuth } from "../../../context/AuthContext"
import { useAlert } from "../../../context/AlertContext"
// React
import { useRef, useState } from "react"
// Services
import { uploadAvatar } from "../../../services/user"
import { BASE_URL } from "../../../services/api"

function PreviewAvatar({ isOpen, onClose }) {
  const { user, setUser } = useAuth()
  const [previewOpen, setPreviewOpen] = useState(false)
  const fileInputRef = useRef()
  const alert = useAlert()

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const res = await uploadAvatar(file)
      setUser((prev) => ({ ...prev, avatar: res.avatar }))
      alert.showAlert(res.message, 'success')
    } catch (err) {
      console.error(err.message)
      alert.showAlert(err.message, 'error')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false} width="w-64">
      <button onClick={() => { setPreviewOpen(true) }} className="w-full text-left text-sm font-medium hover:bg-slate-100 p-2 rounded">
        See photo
      </button>
      <button onClick={() => fileInputRef.current.click()} className="w-full text-left text-sm font-medium hover:bg-slate-100 p-2 rounded">
        Change photo
      </button>
      <input type="file" ref={fileInputRef} accept="image/*" hidden onChange={handleUploadAvatar} />
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
            <img src={user?.avatar ? `${BASE_URL}/api/uploads/${user.avatar}` : ''} alt="Preview Photo Profile " className="flex bg-black/90 flex items-center justify-center z-50" />
          ) : (
            <User className="w-32 h-32 text-white" />
          )}
        </motion.div>
      )}
    </Modal>
  )
}

export default PreviewAvatar