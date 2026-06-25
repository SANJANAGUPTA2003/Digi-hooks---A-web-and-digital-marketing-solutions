import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { STORY_SERVICES } from '../../lib/constants'
import { bindSectionBridge } from '../../lib/motion/reveal'
import { SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

export function ServicesStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    bindSectionBridge(section, { enterY: 40, scale: 0.98 })

    const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth)

    if (prefersReducedMotion()) return

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount() + window.innerHeight * 0.6}`,
        pin: true,
        scrub: SCRUB.smooth,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    const panels = track.querySelectorAll('.service-panel')
    panels.forEach((panel) => {
      const reveals = panel.querySelectorAll('.service-reveal')
      gsap.fromTo(
        reveals,
        { opacity: 0.15, y: 56, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 78%',
            end: 'left 32%',
            scrub: SCRUB.gentle,
          },
        },
      )

      gsap.fromTo(
        panel,
        { scale: 0.96 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 90%',
            end: 'left 50%',
            scrub: true,
          },
        },
      )
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative h-screen bg-ink text-cream overflow-hidden"
      aria-label="Services"
    >
      <div className="absolute top-10 left-6 md:left-12 z-10">
        <span className="story-label text-cream/40">04 — Services</span>
      </div>

      <div ref={trackRef} className="flex h-full w-max will-change-transform">
        {STORY_SERVICES.map((service, i) => (
          <div
            key={service.id}
            className="service-panel flex-shrink-0 w-screen h-full flex flex-col justify-center px-8 md:px-20 lg:px-32"
          >
            <span className="service-reveal story-label text-accent mb-6 block">
              0{i + 1}
            </span>
            <h2 className="service-reveal story-headline text-[clamp(2.5rem,7vw,5rem)] text-cream max-w-4xl">
              {service.title}
            </h2>
            <p className="service-reveal mt-6 text-lg md:text-xl text-cream/55 font-light max-w-xl">
              {service.line}
            </p>
            <p className="service-reveal mt-8 text-sm md:text-base text-cream/35 max-w-lg leading-relaxed">
              {service.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
