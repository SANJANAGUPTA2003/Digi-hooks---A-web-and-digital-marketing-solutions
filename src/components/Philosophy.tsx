import { useEffect, useRef } from 'react'
import { PHILOSOPHY_POINTS } from '../lib/constants'
import { revealOnScroll } from '../lib/scroll'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { DottedSectionBg } from './DottedSectionBg'

export function Philosophy() {
  const sectionRef = useGsapReveal<HTMLElement>()
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.philosophy-card')
    if (!cards?.length || !cardsRef.current) return

    const tween = revealOnScroll(
      cards,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out' },
      { trigger: cardsRef.current, start: 'top 88%', toggleActions: 'play none none none' },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32 bg-canvas">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="story-label">Our philosophy</span>
          <h2 className="story-headline mt-4 text-3xl sm:text-4xl text-ink">
            Why DigiHooks exists
          </h2>
          <p className="story-body mt-5 text-base sm:text-lg">
            We are not another agency selling disconnected services. DigiHooks was created
            because businesses deserve growth systems — not complexity.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-3">
          {PHILOSOPHY_POINTS.map((point) => (
            <article
              key={point.title}
              className="philosophy-card surface-card p-8 transition-opacity duration-300 hover:opacity-90"
            >
              <h3 className="font-medium text-ink text-lg">{point.title}</h3>
              <p className="story-body mt-4 text-sm leading-relaxed">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
