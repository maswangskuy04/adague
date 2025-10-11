// Component
import Layout from "../../components/ui/Layout"
import OnlineStatus from "../../components/ui/OnlineStatus"
import EditProfileForm from "../../components/features/profile/EditProfileForm"
// Navigasi
import { Link } from "react-router-dom"
// Icon
import { AlertCircle, ArrowBigLeft, CheckCircle, Clock, Edit3, MessageCircle, MessageCircleQuestionMarkIcon, User, UserCheck2Icon, UserSquare } from "lucide-react"
// Library
import { AnimatePresence, motion } from "framer-motion"
import { format, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
// Hooks
import { useAuth } from "../../context/AuthContext"
// React
import { useRef, useState } from "react"
import PreviewAvatar from "../../components/features/profile/PreviewAvatar"

function Profile() {
  const { user } = useAuth()
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [isAnonim, setIsAnonim] = useState(false)
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const modal = useRef()

  const statusMap = {
    ready_to_chat: "Haven't talked yet",
    chatting: 'Chatting'
  }

  const userStatus = statusMap[user?.chatStatus]

  const statusAccountMap = {
    active: { label: 'Active', className: 'text-green-600' },
    inactive: { label: 'Inactive', className: 'text-gray-600' },
    suspended: { label: 'Suspend', className: 'text-amber-600' },
    banned: { label: 'Banned', className: 'text-red-600' }
  }

  const accountStatus = statusAccountMap[user?.accountStatus] || statusAccountMap.inactive

  return (
    <Layout>
      <div className="flex flex-col max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to='/home' className="p-2 rounded-full border border-red-300 hover:bg-red-100 text-slate-500 transition-colors">
            <ArrowBigLeft size={18} />
          </Link>
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">User Profile</h1>
        </div>

        {/* Data User */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: 'easeOut' }}
          className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col md:flex-row items-center md:items-start gap-5"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-3 relative">
            {user?.avatar ? (
              <button onClick={() => setAvatarMenuOpen(true)} className="w-20 h-20 rounded-full overflow-hidden relative group">
                <img src={`${BASE_URL}/api/uploads/${user.avatar}`} alt="Foto Pengguna" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                  Ubah
                </div>
              </button>
            ) : (
              <button onClick={() => setAvatarMenuOpen(true)} className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white shadow relative">
                <User size={32} />
                <OnlineStatus isOnline={user?.isOnline} />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex-col items-center md:items-start text-center md:text-left space-y-1">
            <h2 className="text-base md:text-lg font-semibold text-slate-800">{isAnonim ? 'Pengguna Anonim' : user?.fullname || 'Nama Pengguna'}</h2>
            <p className="text-xs flex items-center gap-2 group relative">
              {!user?.emailVerified ? (
                <>
                  <AlertCircle size={14} className="text-amber-600 shrink-0" />
                  <span className="text-slate-600">{user?.email}</span>
                  <Link to='/verify-email' className="text-amber-600 hover:underline font-medium">Verification</Link>
                  <span className="absolute -top-7 left-0 opacity-0 group-hover:opacity-100 transition bg-amber-600 text-white text-[10px] rounded px-2 py-1 pointer-events-none">
                    Email no verified
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle size={14} className="text-green-600 shrink-0" />
                  <span className="text-slate-600">{user?.email}</span>
                  <span className="absolute -top-7 left-0 opacity-0 group-hover:opacity-100 transition bg-green-600 text-white text-[10px] rounded px-2 py-1 pointer-events-none">
                    Email verified
                  </span>
                </>
              )}
            </p>
            <p className="text-xs text-slate-500">Join: {" "}<span className="font-medium text-slate-700">{format(new Date(user?.createdAt), 'dd MMMM y', { locale: id })}</span></p>
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: .95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-xs font-semibold shadow-sm transition-colors"
            onClick={() => setIsOpenFormModal((prev) => !prev)}
          >
            <Edit3 size={14} />
            Edit Profile
          </motion.button>
        </motion.div>

        {/* Tentang Pengguna */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: 'easeOut', delay: .3 }}
          className="flex flex-col max-w-3xl w-full mx-auto space-y-4 mt-3"
        >
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">Account Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Status Percakapan */}
            <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col items-center text-center space-y-3 h-full">
              <div className="flex items-center gap-3">
                <MessageCircleQuestionMarkIcon size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Conversation Status</span>
              </div>
              <span className="py-1.5 px-3 text-xs md:text-sm font-bold rounded-full text-slate-600">{userStatus}</span>
            </div>
            
            {/* Aktivitas Terakhir */}
            <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col items-center text-center space-y-3 h-full">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Recent Activity</span>
              </div>
              <p className="py-1.5 px-3 text-xs md:text-sm font-bold rounded-full text-slate-600">{user?.isOnline ? 'Online Now' : user?.lastSeen ? `${formatDistanceToNow(new Date(user?.lastSeen), { addSuffix: true, locale: id })}` : 'Never been active'}</p>
            </div>

            {/* Status Akun */}
            <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col items-center text-center space-y-3 h-full">
              <div className="flex items-center gap-3">
                <UserCheck2Icon size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Account Status</span>
              </div>
              <span className={`py-1.5 px-3 text-xs md:text-sm font-bold rounded-full ${accountStatus.className}`}>
                {accountStatus.label}
              </span>
            </div>

            {/* Username */}
            <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col items-center text-center space-y-3 h-full">
              <div className="flex items-center gap-3">
                <User size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Username</span>
              </div>
              <span className="py-1.5 px-3 text-xs md:text-sm font-bold text-slate-600">@{user?.username || 'No username yet'}</span>
            </div>

            {/* Total Chat */}
            <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col items-center text-center space-y-3 h-full">
              <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Total Conversation</span>
              </div>
              <span className="py-1.5 px-3 text-xs md:text-sm font-bold text-slate-600">{user?.totalChats || 0}</span>
            </div>

            {/* Toggle Anonim */}
            <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-5 flex flex-col items-center text-center space-y-3 h-full">
              <div className="flex items-center gap-3">
                <UserSquare size={20} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Anonymous User</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-3">
                <span className="py-1.5 px-3 text-xs md:text-sm font-bold text-slate-600">
                  {isAnonim ? 'Yes' : 'No'}
                </span>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnonim ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnonim ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: 'easeOut', delay: .6 }}
          className="flex flex-col max-w-3xl w-full mx-auto space-y-4 mt-3"
        >
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">About Me</h1>
          <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-4">
            <p className="text-sm italic text-slate-600">{user?.bio || 'No bio yet'}</p>
          </div>
        </motion.div>

        {/* Minat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: 'easeOut', delay: .9 }}
          className="flex flex-col max-w-3xl w-full mx-auto space-y-4 mt-3"
        >
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">Interest</h1>
          <div className="flex flex-wrap gap-2">
            {user?.interests?.length > 0 ? (
              user?.interests.map((interest) => (
                <span key={interest.id} className="px-3 py-1 text-xs md:text-sm bg-gradient-to-tl from-gray-400 to-gray-700 text-white font-medium rounded-full shadow-sm">
                  {interest.name}
                </span>
              ))
            ) : (
              <div className="bg-[#fafaff]/80 border border-gray-300 rounded-xl shadow-sm p-4 w-full">
                <p className="text-sm italic text-slate-600">Has not added interests yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal Form Edit */}
      <AnimatePresence>
        {isOpenFormModal && (
          <EditProfileForm isOpen={isOpenFormModal} onClose={() => setIsOpenFormModal(false)} />
        )}
      </AnimatePresence>

      {/* Modal Avatar */}
      <AnimatePresence>
        {avatarMenuOpen && (
          <PreviewAvatar isOpen={avatarMenuOpen} onClose={() => setAvatarMenuOpen(false)} />
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default Profile