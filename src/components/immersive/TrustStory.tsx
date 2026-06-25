import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { bindSectionBridge, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

const STAGES = [
  { label: 'Visitors', icon: 'visitor' },
  { label: 'Conversations', icon: 'chat' },
  { label: 'Enquiries', icon: 'enquiry' },
  { label: 'Opportunities', icon: 'star' },
] as const

export function TrustStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const text = textRef.current
    if (!section || !track || !text) return

    bindSectionBridge(section)

    if (prefersReducedMotion()) {
      gsap.set([text, ...track.querySelectorAll('.trust-stage')], { opacity: 1 })
      return
    }

    const stages = track.querySelectorAll('.trust-stage')
    const connectors = track.querySelectorAll('.trust-connector')

    gsap.fromTo(
      track,
      { y: 40 },
      {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinEnd(240),
          scrub: SCRUB.gentle,
        },
      },
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(240),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    stages.forEach((stage, i) => {
      if (i === 0) {
        tl.fromTo(
          stage,
          { opacity: 0, y: 48, scale: 0.88, filter: 'blur(4px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power2.out' },
          0,
        )
      } else {
        tl.fromTo(
          stages[i - 1],
          { opacity: 1, scale: 1 },
          { opacity: 0.2, scale: 0.82, y: -12, filter: 'blur(3px)', duration: 0.35 },
          i * 0.2,
        )
          .fromTo(
            connectors[i - 1],
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, transformOrigin: 'left center', ease: 'power2.inOut' },
            i * 0.2,
          )
          .fromTo(
            stage,
            { opacity: 0, y: 56, scale: 0.82, filter: 'blur(4px)' },
            { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power3.out' },
            i * 0.2 + 0.08,
          )
      }
    })

    animateHeadline(text, tl, 0.12, 40)

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative h-screen bg-accent/30 overflow-hidden"
      aria-label="Trust"
    >
      <div className="absolute top-10 left-6 md:left-12">
        <span className="story-label">02 — Trust</span>
      </div>

      <div
        ref={trackRef}
        className="story-parallax-inner absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 px-6 md:px-16 pt-16"
      >
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="flex items-center">
            <div className="trust-stage flex flex-col items-center min-w-[120px] md:min-w-[160px]">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream border border-ink/5 flex items-center justify-center mb-4">
                {stage.icon === 'visitor' && (
                  <div className="w-4 h-4 rounded-full bg-ink" />
                )}
                {stage.icon === 'chat' && (
                  <div className="w-8 h-5 rounded-lg border-2 border-ink/20 relative">
                    <div className="absolute -bottom-1 left-2 w-2 h-2 bg-cream border-l-2 border-b-2 border-ink/20 rotate-45" />
                  </div>
                )}
                {stage.icon === 'enquiry' && (
                  <div className="w-7 h-9 border-2 border-ink/20 rounded-sm relative">
                    <div className="absolute top-2 left-1 right-1 h-px bg-ink/15" />
                    <div className="absolute top-4 left-1 right-1 h-px bg-ink/10" />
                  </div>
                )}
                {stage.icon === 'star' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1C1C1C" opacity="0.8">
                    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
                  </svg>
                )}
              </div>
              <span className="text-xs md:text-sm font-medium text-ink tracking-wide">
                {stage.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div className="trust-connector hidden md:block w-12 lg:w-20 h-px bg-ink/15 scale-x-0 mx-2" />
            )}
          </div>
        ))}
      </div>

      <div ref={textRef} className="absolute bottom-[12%] left-0 right-0 px-6 md:px-12 opacity-0">
        <h2 className="story-headline text-[clamp(2rem,6vw,4rem)] max-w-3xl">
          People don&apos;t buy products.
          <br />
          <span className="italic text-muted">They buy trust.</span>
        </h2>
      </div>
    </section>
  )
}
