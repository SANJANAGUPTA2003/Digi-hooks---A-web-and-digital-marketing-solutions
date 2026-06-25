import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { bindSectionBridge, bindVisualDrift, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, isMobile, prefersReducedMotion } from '../../lib/motion/choreography'

const DOT_COUNT_DESKTOP = 72
const DOT_COUNT_MOBILE = 36

export function AttentionStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const hookRef = useRef<HTMLDivElement>(null)
  const dotCount = isMobile() ? DOT_COUNT_MOBILE : DOT_COUNT_DESKTOP

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const text = textRef.current
    const hook = hookRef.current
    if (!section || !canvas || !text || !hook) return

    bindSectionBridge(section)
    bindVisualDrift(hook, section)

    if (prefersReducedMotion()) {
      gsap.set([text, hook, ...canvas.querySelectorAll('.attention-dot')], { opacity: 1 })
      return
    }

    const dots = canvas.querySelectorAll('.attention-dot')
    const visitors = canvas.querySelectorAll('.visitor-dot')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(240),
        pin: true,
        scrub: SCRUB.smooth,
        anticipatePin: 1,
      },
    })

    tl.fromTo(
      dots,
      {
        opacity: 0,
        scale: 0,
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-140, 140),
      },
      {
        opacity: 0.85,
        scale: 1,
        stagger: { amount: 0.7, from: 'random' },
        ease: 'power2.out',
      },
      0,
    )
      .to(
        dots,
        {
          x: (i) => {
            const angle = (i / dotCount) * Math.PI * 2
            return -Math.cos(angle) * (isMobile() ? 80 : 140)
          },
          y: (i) => {
            const angle = (i / dotCount) * Math.PI * 2
            return -Math.sin(angle) * (isMobile() ? 70 : 120) + 30
          },
          scale: 0.35,
          opacity: 0.45,
          stagger: { amount: 1, from: 'random' },
          ease: 'power3.inOut',
        },
        0.3,
      )
      .to(dots, { opacity: 0, scale: 0, duration: 0.25, stagger: { amount: 0.3 } }, 0.72)
      .fromTo(
        visitors,
        { opacity: 0, scale: 0.6, y: 24 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.06, ease: 'power2.out' },
        0.78,
      )
      .fromTo(hook, { opacity: 0.6, scale: 0.92 }, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.2)

    animateHeadline(text, tl, 0.58, 44)

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [dotCount])

  return (
    <section
      ref={sectionRef}
      className="story-section relative h-screen bg-cream overflow-hidden"
      aria-label="Attention"
    >
      <div className="absolute top-10 left-6 md:left-12">
        <span className="story-label">01 — Attention</span>
      </div>

      <div ref={canvasRef} className="story-parallax-inner absolute inset-0 flex items-center justify-center">
        <div ref={hookRef} className="absolute z-10 w-[min(28vw,120px)] opacity-80">
          <img src="/logo-dg.png" alt="" className="w-full h-auto opacity-90" draggable={false} />
        </div>

        {Array.from({ length: dotCount }).map((_, i) => (
          <span
            key={`dot-${i}`}
            className="attention-dot absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-ink/25 opacity-0"
            style={{
              left: `${50 + Math.cos((i / dotCount) * Math.PI * 2) * (38 + (i % 3) * 4)}%`,
              top: `${50 + Math.sin((i / dotCount) * Math.PI * 2) * (32 + (i % 2) * 5)}%`,
            }}
          />
        ))}

        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`visitor-${i}`}
            className="visitor-dot absolute opacity-0 flex flex-col items-center gap-1"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${35 + Math.floor(i / 4) * 18}%`,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-ink" />
            <div className="w-5 h-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>

      <div
        ref={textRef}
        className="absolute bottom-[15%] left-0 right-0 px-6 md:px-12 opacity-0"
      >
        <h2 className="story-headline text-[clamp(2rem,6vw,4rem)] max-w-3xl">
          Attention isn&apos;t bought.
          <br />
          <span className="italic text-muted">It&apos;s earned.</span>
        </h2>
      </div>
    </section>
  )
}
