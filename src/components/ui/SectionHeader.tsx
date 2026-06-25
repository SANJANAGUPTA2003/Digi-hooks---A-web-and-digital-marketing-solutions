import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../../lib/scroll'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const maxW = align === 'center' ? 'max-w-2xl' : 'max-w-xl'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = revealOnScroll(
      el.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' },
      {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${alignClass} ${maxW}`}>
      <span className="story-label">{eyebrow}</span>
      <h2 className="story-headline mt-4 text-3xl sm:text-4xl lg:text-[2.5rem] text-ink">{title}</h2>
      {description && (
        <p className="story-body mt-4 text-base sm:text-lg max-w-prose">{description}</p>
      )}
    </div>
  )
}
