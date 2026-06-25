import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DGLogo } from './DGLogo'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

export function HeroStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const hookRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const logoWrap = logoWrapRef.current
    const hook = hookRef.current
    const headline = headlineRef.current
    const sub = subRef.current
    const scrollHint = scrollHintRef.current
    if (!section || !logoWrap || !hook || !headline || !sub) return

    if (prefersReducedMotion()) {
      gsap.set([logoWrap, hook, headline, sub], { opacity: 1, clearProps: 'all' })
      return
    }

    bindSectionBridge(section, { enterY: 0, scale: 1 })

    const hookStroke = hook.querySelector('.hook-stroke')
    const hookPin = hook.querySelector('.hook-pin')

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinEnd(280),
          pin: true,
          scrub: SCRUB.silk,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        logoWrap,
        { scale: 1.35, y: 0, filter: 'brightness(1)' },
        { scale: 0.38, y: -48, filter: 'brightness(0.98)', ease: 'none' },
        0,
      )
        .to(hook, { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.28)
        .to(hookStroke, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.inOut' }, 0.32)
        .fromTo(hookPin, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2 }, 0.48)

      animateHeadline(headline, tl, 0.52, 56)
      animateHeadline(sub, tl, 0.68, 32)

      if (scrollHint) {
        tl.to(scrollHint, { opacity: 0, y: 16, ease: 'power1.in' }, 0.15)
      }

      return () => tl.scrollTrigger?.kill()
    })

    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinEnd(200),
          pin: true,
          scrub: SCRUB.smooth,
        },
      })

      tl.fromTo(logoWrap, { scale: 1.12 }, { scale: 0.48, y: -24, ease: 'none' }, 0)
        .to(hook, { opacity: 1, duration: 0.3 }, 0.25)
        .to(hookStroke, { strokeDashoffset: 0, duration: 0.3 }, 0.3)
        .fromTo(hookPin, { scale: 0 }, { scale: 1, duration: 0.2 }, 0.42)

      animateHeadline(headline, tl, 0.48, 40)
      animateHeadline(sub, tl, 0.62, 24)

      return () => tl.scrollTrigger?.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative h-screen bg-cream overflow-hidden"
      aria-label="Introduction"
    >
      <div className="story-parallax-inner absolute inset-0 flex flex-col items-center justify-center px-6">
        <div ref={logoWrapRef} className="will-change-transform origin-center">
          <DGLogo hookRef={hookRef} className="w-[min(78vw,340px)]" />
        </div>

        <div
          ref={headlineRef}
          className="mt-10 md:mt-14 text-center opacity-0 will-change-transform"
        >
          <h1 className="story-headline text-[clamp(2.5rem,8vw,5.5rem)] text-ink">
            Turn Attention
            <br />
            <span className="italic font-normal text-muted">Into Growth</span>
          </h1>
        </div>

        <p
          ref={subRef}
          className="story-body mt-6 max-w-md text-center text-sm md:text-base opacity-0"
        >
          A digital growth studio for brands that refuse to be forgettable.
        </p>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="story-label">Scroll to begin</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
