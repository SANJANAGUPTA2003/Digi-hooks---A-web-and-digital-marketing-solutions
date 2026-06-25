import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { INSIGHTS } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion/choreography'
import { killScrollTriggersIn } from '../lib/scroll'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

export function Insights() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    const cards = grid?.querySelectorAll('.insight-card')
    if (!grid || !cards?.length) return

    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => {
      killScrollTriggersIn(grid)
      tween.kill()
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-surface">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Insights"
          title="Practical growth thinking"
          description="Articles on websites, SEO, and marketing written for business owners who want results."
        />

        <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
          {INSIGHTS.map((post) => (
            <Link
              key={post.title}
              to="/contact"
              className="insight-card surface-card group flex flex-col p-6 sm:p-8 transition-opacity duration-300 hover:opacity-90"
              data-cursor="hover"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink">
                  {post.tag}
                </span>
                <span className="text-xs text-secondary">{post.date}</span>
              </div>
              <h3 className="font-semibold text-lg text-ink sm:text-xl leading-snug">{post.title}</h3>
              <p className="story-body mt-3 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-secondary transition-colors">
                Read article
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
