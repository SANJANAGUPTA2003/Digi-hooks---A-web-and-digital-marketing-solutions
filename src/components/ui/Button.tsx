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
  'data-cursor'?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-white border border-ink hover:bg-hover hover:text-white hover:border-hover hover:shadow-[0_8px_24px_rgb(27_27_27_/_18%)]',
  secondary:
    'bg-transparent text-ink border border-line hover:bg-ink hover:text-white hover:border-ink',
  ghost: 'text-secondary hover:text-ink border border-transparent',
  whatsapp:
    'bg-ink text-white border border-ink hover:bg-hover hover:text-white hover:border-hover hover:shadow-[0_8px_24px_rgb(27_27_27_/_18%)]',
}

export function Button({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const base =
    'relative z-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold tracking-wide transition-all duration-[250ms] ease-out hover:scale-[1.03] active:scale-[0.98] sm:min-h-0 sm:py-3 sm:text-sm'
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} data-cursor="hover" {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
        data-cursor="hover"
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} data-cursor="hover" {...rest}>
      {children}
    </button>
  )
}
