// Component
import Layout from "../../components/ui/Layout"
import AccountInfo from "../../components/features/settings/AccountInfo"
import NotificationSetting from "../../components/features/settings/NotificationSeting"
// Navigasi
import { Link } from "react-router-dom"
// Library
import { ArrowBigLeft, Dock, User, Lock, Bell, Brush, ArrowLeftRight, Trash } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import AppPreferences from "../../components/features/settings/AppPreferences"
import AccountManagement from "../../components/features/settings/AccountManagement"

function Setting() {

  return (
    <Layout>
      <div className="flex flex-col max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link to='/home' className="p-2 rounded-full border border-red-300 hover:bg-red-100 text-slate-500 transition-colors">
            <ArrowBigLeft size={18} />
          </Link>
          <h1 className="text-lg md:text-xl font-semibold text-slate-700">Settings</h1>
        </div>

        {/* Account Information */}
        <AccountInfo />

        {/* Notification Settings */}
        <NotificationSetting />

        {/* App Preferences */}
        <AppPreferences />

        {/* Data & Account Management */}
        <AccountManagement />
      </div>
    </Layout>
  )
}

export default Setting