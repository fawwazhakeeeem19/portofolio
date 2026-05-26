import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: string
}

export function GlassCard({ children, className, hover = true, glow }: GlassCardProps) {
  return (
    <motion.div
      className={cn('glass neon-border rounded-2xl p-5', className)}
      whileHover={hover ? { y: -4, boxShadow: glow || '0 8px 40px rgba(0,212,255,0.12)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
