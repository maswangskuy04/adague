export default function Skeleton({ variant = 'rect', size = 'md', className = '' }) {
  const variantClass = {
    rect: 'rounded-lg',
    circle: 'rounded-full'
  }

  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  const baseClass = `relative overflow-hidden bg-gray-300 ${variantClass[variant] || variantClass.rect} ${sizeClass[size] || ''} ${className}`

  return (
    <div className={baseClass}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}