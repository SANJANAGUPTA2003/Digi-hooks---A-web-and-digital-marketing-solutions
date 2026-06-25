import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, isMobile, prefersReducedMotion } from '../../lib/motion/choreography'
import { revealOnScroll } from '../../lib/scroll'
import { LiveBackground } from '../LiveBackground'
import { DottedSectionBg } from '../DottedSectionBg'

const BUILT_RIGHT = ['Fast', 'Mobile friendly', 'SEO ready', 'Conversion focused'] as const

export function PhilosophyStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const pills = pillsRef.current
    if (!section || !text || !pills) return

    const unbindBridge = bindSectionBridge(section)

    if (prefersReducedMotion()) {
      gsap.set([text.children, ...pills.querySelectorAll('.philosophy-pill')], { opacity: 1, clearProps: 'all' })
      return unbindBridge
    }

    const pillEls = pills.querySelectorAll('.philosophy-pill')

    if (isMobile()) {
      const tween = revealOnScroll(
        [text.children, pillEls],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out' },
        { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
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
        end: pinEnd(180),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    animateHeadline(text.querySelector('.philosophy-headline') as HTMLElement, tl, 0, 36)
    tl.fromTo(
      text.querySelectorAll('.philosophy-line'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.25 },
      0.12,
    )
    tl.fromTo(
      pillEls,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.06, ease: 'power2.out', duration: 0.2 },
      0.35,
    )

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
      aria-label="Why DigiHooks"
    >
      <LiveBackground variant="soft" />
      <DottedSectionBg />
      <div className="absolute top-10 left-6 z-10 md:left-12">
        <span className="story-label">Why DigiHooks</span>
      </div>

      <div className="relative z-10 flex items-center px-4 sm:px-6 md:absolute md:inset-0 md:px-12 lg:px-20">
        <div className="w-full max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
          <div ref={textRef}>
            <h2 className="philosophy-headline story-headline text-[clamp(1.75rem,4vw,2.75rem)] text-ink opacity-0">
              Websites should be built right from the start.
            </h2>
            <p className="philosophy-line story-body mt-6 text-base sm:text-lg opacity-0">
              Most businesses are forced to pay separately for performance, SEO, usability and growth.
            </p>
            <p className="philosophy-line story-body mt-4 text-base sm:text-lg opacity-0">
              DigiHooks builds strong foundations into every website. Not expensive add-ons after launch.
            </p>
            <p className="philosophy-line mt-6 text-sm font-medium text-ink opacity-0">
              A philosophy-driven growth studio. No personality cult. Just a better way to build.
            </p>
          </div>

          <div ref={pillsRef} className="grid grid-cols-2 gap-3 sm:gap-4">
            {BUILT_RIGHT.map((item) => (
              <div
                key={item}
                className="philosophy-pill opacity-0 surface-card p-5 sm:p-6 text-center"
              >
                <span className="text-sm sm:text-base font-medium text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
