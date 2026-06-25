import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { STRATEGY_CALL_URL, WHATSAPP_URL } from '../../lib/constants'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

export function CTAStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const actions = actionsRef.current
    if (!section || !headline || !actions) return

    bindSectionBridge(section, { enterY: 36, scale: 0.98 })

    if (prefersReducedMotion()) {
      gsap.set([headline, actions], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(120),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    animateHeadline(headline, tl, 0.1, 64)
    tl.fromTo(
      actions,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.35 },
      0.35,
    )

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-32"
      aria-label="Contact"
    >
      <span className="story-label mb-12">07 — Begin</span>

      <h2
        ref={headlineRef}
        className="story-headline text-[clamp(2.5rem,9vw,6rem)] text-center text-ink max-w-5xl opacity-0"
      >
        Ready to be
        <br />
        <span className="italic text-muted">remembered?</span>
      </h2>

      <div
        ref={actionsRef}
        className="mt-14 flex flex-col sm:flex-row gap-4 w-full max-w-md opacity-0"
      >
        <a
          href={STRATEGY_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="flex-1 text-center px-8 py-4 bg-ink text-cream text-sm font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-ink/85"
        >
          Book a Strategy Call
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="flex-1 text-center px-8 py-4 border border-ink/15 text-ink text-sm font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-accent/50 hover:border-accent"
        >
          WhatsApp
        </a>
      </div>

      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-muted tracking-widest uppercase">
          © {new Date().getFullYear()} DigiHooks
        </p>
      </footer>
    </section>
  )
}
