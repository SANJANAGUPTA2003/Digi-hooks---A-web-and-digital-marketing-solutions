import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, isMobile, prefersReducedMotion } from '../../lib/motion/choreography'
import { revealOnScroll } from '../../lib/scroll'
import { LiveBackground } from '../LiveBackground'
import { DottedSectionBg } from '../DottedSectionBg'

const FRAGMENTS = [
  { label: 'Website', x: -150, y: -80 },
  { label: 'SEO', x: 150, y: -70 },
  { label: 'Marketing', x: 0, y: 120 },
] as const

export function ProblemStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const group = groupRef.current
    const text = textRef.current
    const hub = hubRef.current
    if (!section || !canvas || !group || !text || !hub) return

    const unbindBridge = bindSectionBridge(section)

    if (prefersReducedMotion()) {
      gsap.set([text, hub, group, ...canvas.querySelectorAll('.problem-fragment')], {
        opacity: 1,
        clearProps: 'all',
      })
      return unbindBridge
    }

    const fragments = canvas.querySelectorAll('.problem-fragment')
    const connectors = canvas.querySelectorAll('.problem-connector')

    if (isMobile()) {
      gsap.set(fragments, { x: 0, y: 0, opacity: 1 })
      gsap.set(hub, { opacity: 1, scale: 1 })
      gsap.set(connectors, { scale: 1, opacity: 1 })
      gsap.set(group, { scale: 1 })

      const tween = revealOnScroll(
        text,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        { trigger: section, start: 'top 82%', toggleActions: 'play none none none' },
      )

      return () => {
        unbindBridge()
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }

    const rootStyle = getComputedStyle(document.documentElement)
    const surfaceColor = rootStyle.getPropertyValue('--color-surface').trim()
    const lineColor = rootStyle.getPropertyValue('--color-line').trim()

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(420),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    tl.fromTo(
      fragments,
      {
        opacity: 1,
        x: (i) => FRAGMENTS[i].x,
        y: (i) => FRAGMENTS[i].y,
      },
      { x: 0, y: 0, ease: 'power3.inOut', duration: 0.38, stagger: 0.03 },
      0,
    )
      .fromTo(hub, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.2 }, 0.34)
      .fromTo(
        connectors,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, ease: 'power2.out', duration: 0.14 },
        0.42,
      )
      .to(fragments, { backgroundColor: surfaceColor, borderColor: lineColor, duration: 0.14 }, 0.5)
      .to(group, { scale: 1.06, ease: 'power2.out', duration: 0.22 }, 0.54)
      .to(hub, { scale: 1.08, ease: 'power2.out', duration: 0.18 }, 0.54)
      .to({}, { duration: 0.65 }, 0.56)
      .to(group, { scale: 1.1, ease: 'power1.inOut', duration: 0.16 }, 0.78)
      .to({}, { duration: 0.5 }, 0.78)

    animateHeadline(text, tl, 0.88, 32)

    return () => {
      unbindBridge()
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative overflow-hidden bg-surface py-16 sm:py-20 md:h-screen md:py-0"
      aria-label="Integrated growth system"
    >
      <LiveBackground variant="network" />
      <DottedSectionBg className="opacity-40" />

      <div className="absolute top-10 left-6 z-10 md:left-12">
        <span className="story-label">The problem</span>
      </div>

      <div
        ref={canvasRef}
        className="story-parallax-inner relative flex min-h-[18rem] items-center justify-center px-4 sm:px-6 md:absolute md:inset-0"
      >
        <div ref={groupRef} className="relative flex w-full max-w-xl flex-col items-center gap-3 md:aspect-square md:items-center md:justify-center">
          <div className="pointer-events-none absolute inset-8 hidden rounded-full border border-ink/5 md:block" />
          <div className="pointer-events-none absolute inset-16 hidden rounded-full border border-ink/5 md:block" />
          <div className="pointer-events-none absolute inset-24 hidden rounded-full border border-dashed border-ink/8 md:block" />

          {FRAGMENTS.map((frag) => (
            <div key={frag.label} className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="problem-fragment surface-card px-5 py-3 text-sm font-semibold text-ink shadow-sm sm:px-6 sm:py-4 md:whitespace-nowrap">
                {frag.label}
              </div>
            </div>
          ))}

          <div
            ref={hubRef}
            className="surface-elevated z-20 px-5 py-3 text-sm font-semibold text-ink text-center shadow-sm opacity-0 md:absolute md:opacity-0"
          >
            Integrated Growth System
          </div>

          {FRAGMENTS.map((frag, i) => (
            <div
              key={`conn-${frag.label}`}
              className="problem-connector pointer-events-none hidden h-px w-24 origin-center scale-0 bg-ink/12 opacity-0 md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2"
              style={{ rotate: `${i * 120 - 90}deg` }}
            />
          ))}
        </div>
      </div>

      <div ref={textRef} className="relative z-10 mt-8 px-4 opacity-0 sm:px-6 md:absolute md:bottom-[10%] md:left-0 md:right-0 md:mt-0 md:px-12">
        <p className="story-body mb-3 max-w-xl text-base">
          Most agencies sell website, SEO, and marketing separately.
        </p>
        <h2 className="story-headline max-w-3xl text-[clamp(1.75rem,5vw,3.25rem)] text-ink">
          Growth works better when everything works together.
        </h2>
      </div>
    </section>
  )
}
