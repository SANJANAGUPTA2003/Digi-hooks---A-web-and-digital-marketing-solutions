import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'

interface ButtonProps {
  children: ReactNode
  href?: string
  to?: string
  onClick?: () => void
  variant?: Variant
  className?: string
  type?: 'button' | 'submit'
}

const variants: Record<Variant, string> = {
  primary:
    'btn-gradient text-white font-semibold shadow-lg shadow-orange/20 border-0',
  secondary:
    'glass text-white font-medium hover:bg-white/10 border border-white/15',
  ghost: 'text-white/80 hover:text-white hover:bg-white/5 font-medium',
  whatsapp:
    'bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/25',
}

export function Button({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm transition-colors sm:px-6 sm:py-3.5 sm:text-base'
  const classes = `${base} ${variants[variant]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  )
}
