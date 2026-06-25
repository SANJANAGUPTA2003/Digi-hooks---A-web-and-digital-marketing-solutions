import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { HOOK_JOURNEY } from '../../lib/constants'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { DottedSectionBg } from '../DottedSectionBg'
import { pinEnd, SCRUB, isMobile, prefersReducedMotion } from '../../lib/motion/choreography'
import { revealOnScroll } from '../../lib/scroll'

const PILLARS = [
  { name: 'Hook', desc: 'Capture attention with clarity and craft' },
  { name: 'Engage', desc: 'Start real conversations with the right people' },
  { name: 'Grow', desc: 'Turn trust into repeatable revenue' },
] as const

export function HookEngageGrowStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const text = textRef.current
    if (!section || !track || !text) return

    const unbindBridge = bindSectionBridge(section)

    if (prefersReducedMotion()) {
      gsap.set([text, ...track.querySelectorAll('.journey-item, .pillar-item')], { opacity: 1, clearProps: 'all' })
      return unbindBridge
    }

    const journeyItems = track.querySelectorAll('.journey-item')
    const pillars = track.querySelectorAll('.pillar-item')
    const connectors = track.querySelectorAll('.journey-connector')

    if (isMobile()) {
      const tween = revealOnScroll(
        [text, ...pillars, ...journeyItems],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' },
        { trigger: section, start: 'top 88%', toggleActions: 'play none none none' },
      )

      return () => {
        unbindBridge()
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(260),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    animateHeadline(text.querySelector('.process-headline') as HTMLElement, tl, 0, 32)

    pillars.forEach((pillar, i) => {
      tl.fromTo(
        pillar,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.18 },
        0.1 + i * 0.12,
      )
    })

    journeyItems.forEach((item, i) => {
      if (i > 0) {
        tl.fromTo(
          connectors[i - 1],
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, transformOrigin: 'left center', ease: 'power2.inOut', duration: 0.12 },
          0.45 + i * 0.14,
        )
      }
      tl.fromTo(
        item,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, ease: 'power2.out', duration: 0.15 },
        0.42 + i * 0.14,
      )
    })

    return () => {
      unbindBridge()
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative overflow-hidden bg-canvas py-16 sm:py-20 md:h-screen md:py-0"
      aria-label="Our process — Hook, Engage, Grow"
    >
      <DottedSectionBg />
      <div className="absolute top-10 left-6 z-10 md:left-12">
        <span className="story-label">Our process</span>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:absolute md:top-24 md:left-12 md:max-w-xl md:px-0 lg:top-28">
        <div ref={textRef} className="opacity-0">
          <h2 className="process-headline story-headline text-[clamp(1.75rem,4vw,2.5rem)] text-ink">
            Hook → Engage → Grow
          </h2>
          <p className="story-body mt-3 text-base">
            Attention becomes visitors. Visitors become conversations. Conversations become customers.
            Customers become growth.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 mt-10 flex flex-col items-center justify-center gap-10 px-4 sm:px-6 md:absolute md:inset-0 md:mt-0 md:gap-14 md:px-12 md:pt-24"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.name} className="pillar-item opacity-0 text-center max-w-[140px]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-card text-sm font-medium text-ink">
                {i === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 18c0-4 3-8 6-10 3 2 6 6 6 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </div>
              <p className="font-medium text-ink">{pillar.name}</p>
              <p className="story-body mt-1 text-xs">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex w-full max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:gap-0">
          {HOOK_JOURNEY.map((step, i) => (
            <div key={step.stage} className="flex items-center">
              <div className="journey-item surface-card w-full opacity-0 px-4 py-3 text-center sm:min-w-[100px] sm:w-auto md:min-w-[120px] md:bg-transparent md:p-0 md:shadow-none">
                <p className="text-xs story-label">{step.stage}</p>
                <p className="mt-1 text-sm font-medium text-ink">{step.outcome}</p>
              </div>
              {i < HOOK_JOURNEY.length - 1 && (
                <div className="journey-connector mx-auto hidden h-6 w-px origin-top scale-y-0 bg-ink/10 sm:mx-0 md:block md:h-px md:w-8 md:origin-left md:scale-x-0 lg:w-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
