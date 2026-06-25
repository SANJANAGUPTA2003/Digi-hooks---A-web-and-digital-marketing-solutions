import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DottedSectionBg } from '../DottedSectionBg'
import { RESULTS_STORIES } from '../../lib/constants'
import { bindSectionBridge } from '../../lib/motion/reveal'
import { SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

export function ResultsStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    bindSectionBridge(section, { enterY: 48, scale: 0.98 })

    if (prefersReducedMotion()) return

    const stories = section.querySelectorAll('.result-story')

    stories.forEach((story, i) => {
      const headline = story.querySelector('.result-headline')
      const body = story.querySelector('.result-body')

      gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: 'top 78%',
          end: 'top 28%',
          scrub: SCRUB.gentle,
        },
      })
        .fromTo(
          story,
          { opacity: 0.12, y: 72, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        )
        .fromTo(
          headline,
          { y: 32, filter: 'blur(4px)' },
          { y: 0, filter: 'blur(0px)', ease: 'power2.out' },
          0,
        )
        .fromTo(body, { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.15)
        .to(story, { opacity: i < stories.length - 1 ? 0.18 : 1, y: -16, scale: 0.98 }, 0.75)
    })

    return () =>
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && section.contains(t.vars.trigger as Node)) t.kill()
      })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative overflow-hidden bg-surface py-32 md:py-48"
      aria-label="Results"
    >
      <DottedSectionBg />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <span className="story-label block mb-16">06 — Results</span>

        <div className="space-y-32 md:space-y-48">
          {RESULTS_STORIES.map((story, i) => (
            <article key={i} className="result-story opacity-20">
              <h2 className="result-headline story-headline text-[clamp(1.75rem,5vw,3.5rem)] text-ink leading-tight">
                {story.headline}
              </h2>
              <p className="result-body story-body mt-6 text-base md:text-lg max-w-2xl">{story.body}</p>
              <div className="mt-8 w-12 h-px bg-ink/20" />
            </article>
          ))}
        </div>

        <p className="story-body mt-24 text-center text-sm italic">
          Real outcomes. Real partnerships. No inflated metrics — just work that earns remembrance.
        </p>
      </div>
    </section>
  )
}
