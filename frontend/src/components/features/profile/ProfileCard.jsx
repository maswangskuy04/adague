export default function ProfileCard({ children, className = '' }) {
  return (
    <div className={`bg-[#F8F8F8] border border-b-2 border-gray-200 rounded-xl shadow-sm p-4 ${className}`}>
      {children}
    </div>
  )
}