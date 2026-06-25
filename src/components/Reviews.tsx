import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { REVIEWS } from '../lib/constants'
import { revealOnScroll } from '../lib/scroll'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

interface ReviewsProps {
  expanded?: boolean
}

export function Reviews({ expanded = false }: ReviewsProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    const cards = grid?.querySelectorAll('.review-card')
    if (!grid || !cards?.length) return

    const tween = revealOnScroll(
      cards,
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' },
      { trigger: grid, start: 'top 88%', toggleActions: 'play none none none' },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className={`relative overflow-hidden bg-canvas ${expanded ? 'pb-24 sm:pb-32' : 'py-24 sm:py-32'}`}>
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!expanded && (
          <SectionHeader
            eyebrow="Client reviews"
            title="What our clients say"
            description="Real feedback from businesses we've helped grow online."
            align="center"
          />
        )}

        <div
          ref={gridRef}
          className={`grid gap-6 ${expanded ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'}`}
        >
          {REVIEWS.map((review) => (
            <blockquote
              key={review.name}
              className="review-card surface-card flex flex-col p-6 sm:p-8 transition-opacity duration-300 hover:opacity-90"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={15} className="fill-ink/20 text-ink/20" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed story-body sm:text-base">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="font-medium text-ink">{review.name}</p>
                <p className="text-sm text-secondary">
                  {review.role}, {review.business}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
