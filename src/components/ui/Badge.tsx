import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color = '#00d4ff', className }: BadgeProps) {
  return (
    <span
      className={cn('px-2 py-0.5 rounded-md font-mono text-[11px]', className)}
      style={{
        background: `${color}15`,
        border: `1px solid ${color}40`,
        color,
      }}
    >
      {children}
    </span>
  )
}
