export default function SettingCard({ children, title, icon, className = '' }) {
  return (
    <div className={`bg-[#F8F8F8] border border-b-2 border-gray-200 rounded-xl shadow-sm p-4 ${className}`}>
      <div className={`flex items-center gap-4 ${title ? 'mb-4' : 'mb-0'}`}>
        {icon}
        <h2 className="text-lg md:text-xl font-medium text-gray-600">{title}</h2>
      </div>
      
      {children}
    </div>
  )
}