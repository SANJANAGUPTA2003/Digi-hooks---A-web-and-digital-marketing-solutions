import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { bindSectionBridge, bindVisualDrift, animateHeadline } from '../../lib/motion/reveal'
import { pinEnd, SCRUB, prefersReducedMotion } from '../../lib/motion/choreography'

const NODES = ['Website', 'SEO', 'Digital Strategy'] as const

export function GrowthStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const device = deviceRef.current
    const text = textRef.current
    if (!section || !device || !text) return

    bindSectionBridge(section)
    bindVisualDrift(device, section)

    if (prefersReducedMotion()) {
      gsap.set([device, text, ...device.querySelectorAll('.growth-node')], { opacity: 1 })
      return
    }

    const nodes = device.querySelectorAll('.growth-node')
    const lines = device.querySelectorAll('.growth-line')
    const screen = device.querySelector('.device-screen')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(220),
        pin: true,
        scrub: SCRUB.smooth,
        anticipatePin: 1,
      },
    })

    tl.fromTo(
      device,
      { opacity: 0, y: 100, rotateX: 14, scale: 0.94 },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, ease: 'power3.out' },
      0,
    )
      .fromTo(screen, { scale: 0.9, opacity: 0.4 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0.12)
      .fromTo(
        nodes,
        { opacity: 0, scale: 0.55, y: 28, filter: 'blur(4px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, ease: 'power2.out' },
        0.28,
      )
      .fromTo(
        lines,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.08, transformOrigin: 'top center', ease: 'power2.inOut' },
        0.42,
      )

    animateHeadline(text, tl, 0.18, 44)

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="story-section relative h-screen bg-cream overflow-hidden perspective-[1200px]"
      aria-label="Growth"
    >
      <div className="absolute top-10 left-6 md:left-12">
        <span className="story-label">03 — Growth</span>
      </div>

      <div className="story-parallax-inner absolute inset-0 flex flex-col items-center justify-center px-6 pt-8">
        <div ref={deviceRef} className="relative will-change-transform opacity-0">
          <div className="relative w-[min(90vw,420px)] aspect-[4/5] rounded-[2rem] bg-ink p-3 shadow-[0_40px_80px_-20px_rgba(28,28,28,0.15)]">
            <div className="device-screen h-full w-full rounded-[1.5rem] bg-cream overflow-hidden flex flex-col items-center justify-center p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />

              <div className="relative z-10 flex flex-col items-center gap-6 w-full">
                {NODES.map((node, i) => (
                  <div key={node} className="flex flex-col items-center w-full">
                    <div className="growth-node px-6 py-3 rounded-full bg-white border border-ink/5 text-sm font-medium text-ink shadow-sm opacity-0">
                      {node}
                    </div>
                    {i < NODES.length - 1 && (
                      <div className="growth-line w-px h-8 bg-ink/10 origin-top my-1" />
                    )}
                  </div>
                ))}
              </div>

              <svg
                className="absolute inset-4 opacity-20 pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="70" stroke="#1C1C1C" strokeWidth="0.5" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div ref={textRef} className="absolute bottom-[10%] left-0 right-0 px-6 md:px-12 opacity-0">
        <h2 className="story-headline text-[clamp(2rem,6vw,4rem)] max-w-3xl">
          Growth isn&apos;t luck.
          <br />
          <span className="italic text-muted">It&apos;s engineered.</span>
        </h2>
      </div>
    </section>
  )
}
