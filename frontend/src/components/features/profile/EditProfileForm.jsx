// Component
import Modal from "../../ui/Modal"
// Hooks
import { useAuth } from "../../../context/AuthContext"
import { useInterests } from "../../../hooks/useInterests"
import { useAlert } from "../../../context/AlertContext"
// React
import { useEffect, useState } from "react"
import { updateUser } from "../../../services/user"

function EditProfileForm({ isOpen, onClose, onSave }) {
  const { user } = useAuth()
  const { interests: allInterest, loading } = useInterests()
  const alert = useAlert()

  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    interests: user?.interests?.map((i) => i.id) || []
  })

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user?.fullname || '',
        username: user?.username || '',
        email: user?.email || '',
        bio: user?.bio || '',
        interests: user?.interests?.map((i) => i.id) || []
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangeInterest = (id) => {
    setFormData((prev) => ({ ...prev, interests: prev.interests.includes(id) ? prev.interests.filter((i) => i !== id) : [...prev.interests, id] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await updateUser(formData)
      alert.showAlert(res.message, 'success')
      onSave?.(res.user)
      onClose?.()
    } catch (err) {
      console.error(err.message)
      alert.showAlert(err.message, 'error')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-slate-700">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 p-2">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-slate-600">Fullname</label>
            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all" />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-600">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all" />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-slate-600">Bio</label>
            <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} cols="30" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all resize-none"></textarea>
          </div>
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-slate-600">Interest</label>
            {loading ? (
              <p className="text-xs text-slate-400 mt-1">Memuat...</p>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {allInterest.map((option) => (
                  <button type="button" key={option.id} onClick={() => handleChangeInterest(option.id)} className={`px-3 py-1 rounded-full text-sm border ${formData.interests.includes(option.id) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-slate-600 border-gray-300'}`}>
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-3 py-2 text-sm md:text-base bg-gray-500 hover:bg-gray-600 rounded-lg text-white transition-all duration-300 mt-3">Save changes</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditProfileForm