// Hooks
import { useAlert } from "../../context/AlertContext"
import { useAuth } from "../../context/AuthContext"
// Library
import { X } from 'lucide-react'

function Modal({ onSave, onCancel }) {
  const { user } = useAuth()
  const alert = useAlert()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-slate-700">Edit Profile</h2>
        <button className="text-slate-500 hover:text-slate-700">
          <X size={20} />
        </button>
      </div>

      <form action="" className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-slate-600">Fullname</label>
          <input type="text" id="fullname" name="fullname" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-600">Username</label>
          <input type="text" id="username" name="username" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email</label>
          <input type="text" id="email" name="email" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-slate-600">Bio</label>
          <textarea name="bio" id="bio" cols="30" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"></textarea>
        </div>
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-slate-600">Interest</label>
          {loading ? (
            <p className="text-xs text-slate-400 mt-1">Memuat...</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">

            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-3 py-2 text-sm md:text-base bg-gray-500 hover:bg-gray-600 rounded-lg text-white transition-all duration-300 mt-3">Save changes</button>
        </div>
      </form>
    </div>
  )
}

export default Modal