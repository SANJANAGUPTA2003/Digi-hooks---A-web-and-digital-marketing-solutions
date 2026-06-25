interface DottedSectionBgProps {
  className?: string
}

/** Subtle #5F5C59 grid overlay for section backgrounds */
export function DottedSectionBg({ className = 'opacity-45' }: DottedSectionBgProps) {
  return (
    <div
      className={`section-grid-bg pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  )
}
