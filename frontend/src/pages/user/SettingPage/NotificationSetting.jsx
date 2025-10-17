// Library
import { Bell } from "lucide-react"
// Component
import SettingSection from "../../../components/features/settings/SettingSection"
import SettingCard from "../../../components/features/settings/SettingCard"

export default function NotificationSetting() {
  return (
    <SettingSection delay={0.3}>
      <SettingCard icon={<Bell size={20} className="text-indigo-500" />} title='Notification Settings'>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs md:text-sm text-gray-600">Notification push</span>
            <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-300`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}></span>
            </button>
          </div>

          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs md:text-sm text-gray-600">Do not disturb</span>
            <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-300`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}></span>
            </button>
          </div>
        </div>
      </SettingCard>
    </SettingSection>
  )
}