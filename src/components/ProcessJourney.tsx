import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROCESS_JOURNEY } from '../lib/constants'
import { pinEnd, SCRUB, isMobile } from '../lib/motion/choreography'
import { animateHeadline } from '../lib/motion/reveal'
import { DottedSectionBg } from './DottedSectionBg'

export function ProcessJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const title = titleRef.current
    if (!section || !path || !title) return

    const steps = section.querySelectorAll('.journey-step')
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(isMobile() ? 160 : 220),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    animateHeadline(title, tl, 0.05, 32)
    tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0.1)

    steps.forEach((step, i) => {
      tl.fromTo(
        step,
        { opacity: 0, y: 36, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        i * 0.18 + 0.15,
      )
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-surface" aria-label="Process journey">
      <DottedSectionBg />
      <div className="absolute top-28 left-6 z-10 md:left-12">
        <div ref={titleRef} className="opacity-0">
          <span className="story-label">The journey</span>
          <h2 className="story-headline mt-3 text-3xl md:text-4xl text-ink">
            How we move with you
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-24">
        <div className="w-full max-w-4xl">
          <svg viewBox="0 0 800 120" className="w-full" fill="none">
            <path
              ref={pathRef}
              d="M 40 60 Q 200 20 400 60 T 760 60"
              stroke="#D9D2C8"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {PROCESS_JOURNEY.map((item) => (
              <div key={item.step} className="journey-step opacity-0 text-center">
                <div className="w-2.5 h-2.5 rounded-full bg-ink mx-auto mb-4" />
                <h3 className="text-sm font-medium text-ink">{item.step}</h3>
                <p className="text-xs text-secondary mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
