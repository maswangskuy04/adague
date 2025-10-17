// Library
import { Brush } from "lucide-react"
// Component
import SettingSection from "../../../components/features/settings/SettingSection"
import SettingCard from "../../../components/features/settings/SettingCard"

export default function AppPreferences() {
  return (
    <SettingSection delay={0.6}>
      <SettingCard icon={<Brush size={20} className="text-indigo-500" />} title='App Preferences'>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs md:text-sm text-gray-600">Theme</span>
            <div className="flex items-center gap-4">
              {/* Dark */}
              <label htmlFor="dark" className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="dark" id="dark" value='dark' className="hidden peer" />
                <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-300 transition-all" />
                <span className="text-sm text-gray-600 group-hover:text-indigo-500">Dark</span>
              </label>

              {/* Light */}
              <label htmlFor="light" className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="light" id="light" value='light' className="hidden peer" />
                <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-300 transition-all" />
                <span className="text-sm text-gray-600 group-hover:text-indigo-500">Light</span>
              </label>

              {/* Automatic */}
              <label htmlFor="system" className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="system" id="system" value='system' className="hidden peer" />
                <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-300 transition-all" />
                <span className="text-sm text-gray-600 group-hover:text-indigo-500">System</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs md:text-sm text-gray-600">Language</span>
            <select name="" id="" className="appearance-none pl-3 pr-8 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition cursor-pointer" defaultValue="">
              <option value="" disabled>-- Select Language --</option>
              <option value="">Indonesia</option>
              <option value="">English</option>
            </select>
          </div>
        </div>
      </SettingCard>
    </SettingSection>
  )
}