import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/motion/choreography'
import { DottedSectionBg } from './DottedSectionBg'

interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const eyebrowEl = content.querySelector('.page-eyebrow')
    const titleEl = content.querySelector('.page-title')
    const descEl = content.querySelector('.page-desc')

    if (prefersReducedMotion()) {
      gsap.set([eyebrowEl, titleEl, descEl].filter(Boolean), { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    if (eyebrowEl) {
      tl.fromTo(eyebrowEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, 0)
    }
    if (titleEl) {
      tl.fromTo(titleEl, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.06)
    }
    if (descEl) {
      tl.fromTo(descEl, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45 }, 0.14)
    }

    return () => {
      tl.kill()
    }
  }, [eyebrow, description, title])

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <DottedSectionBg className="opacity-55" />
      <div ref={contentRef} className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {eyebrow && <span className="page-eyebrow story-label">{eyebrow}</span>}
        <h1 className="page-title story-headline mt-4 text-4xl sm:text-5xl lg:text-6xl text-ink">
          {title}
        </h1>
        {description && (
          <p className="page-desc story-body mt-5 text-base sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  )
}
