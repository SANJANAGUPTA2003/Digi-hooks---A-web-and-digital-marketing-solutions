import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROCESS_JOURNEY } from '../../lib/constants'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

export function ProcessStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const text = textRef.current
    const journey = journeyRef.current
    if (!section || !path || !text || !journey) return

    bindSectionBridge(section)

    if (prefersReducedMotion()) {
      gsap.set([text, ...section.querySelectorAll('.process-step')], { opacity: 1 })
      gsap.set(path, { strokeDashoffset: 0 })
      return
    }

    const steps = section.querySelectorAll('.process-step')
    const length = path.getTotalLength()

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    gsap.fromTo(
      journey,
      { y: 30, scale: 0.97 },
      {
        y: -20,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinEnd(220),
          scrub: SCRUB.gentle,
        },
      },
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(220),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)

    steps.forEach((step, i) => {
      tl.fromTo(
        step,
        { opacity: 0, y: 36, scale: 0.9, filter: 'blur(3px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power2.out' },
        i * 0.18 + 0.08,
      )
    })

    animateHeadline(text, tl, 0.05, 32)

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative h-screen bg-cream overflow-hidden"
      aria-label="Process"
    >
      <div className="absolute top-10 left-6 md:left-12">
        <span className="story-label">05 — Process</span>
      </div>

      <div ref={textRef} className="absolute top-24 md:top-28 left-6 md:left-12 opacity-0">
        <h2 className="story-headline text-[clamp(1.75rem,4vw,2.5rem)] text-ink">
          The DigiHooks Journey
        </h2>
      </div>

      <div
        ref={journeyRef}
        className="story-parallax-inner absolute inset-0 flex items-center justify-center px-6 md:px-12 pt-20"
      >
        <div className="relative w-full max-w-4xl">
          <svg
            className="w-full h-auto"
            viewBox="0 0 800 200"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d="M 40 100 Q 200 40 400 100 T 760 100"
              stroke="#FAD7C5"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mt-8 md:mt-0 md:absolute md:inset-0 md:items-center">
            {PROCESS_JOURNEY.map((item, i) => (
              <div
                key={item.step}
                className="process-step opacity-0 text-center md:absolute"
                style={{
                  left: i === 0 ? '0%' : i === 1 ? '28%' : i === 2 ? '56%' : 'auto',
                  right: i === 3 ? '0%' : 'auto',
                  top: i % 2 === 0 ? '55%' : '15%',
                }}
              >
                <div className="w-3 h-3 rounded-full bg-ink mx-auto mb-3" />
                <h3 className="text-sm md:text-base font-medium text-ink">{item.step}</h3>
                <p className="text-xs text-muted mt-1 max-w-[140px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
