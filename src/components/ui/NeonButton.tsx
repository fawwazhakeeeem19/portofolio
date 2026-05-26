import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface NeonButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  disabled?: boolean
}

export function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  target,
  rel,
  disabled,
}: NeonButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white shadow-neon-blue',
    secondary: 'glass neon-border text-white/80 hover:text-white',
    ghost: 'text-white/60 hover:text-white',
  }

  const props = {
    className: cn(
      'inline-flex items-center gap-2 rounded-xl font-display font-semibold transition-all',
      sizeClasses[size],
      variantClasses[variant],
      disabled && 'opacity-50 cursor-not-allowed',
      className
    ),
    onClick,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...props}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...props}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  )
}
