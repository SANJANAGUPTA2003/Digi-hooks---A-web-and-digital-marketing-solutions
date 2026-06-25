import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SCRUB, isMobile, prefersReducedMotion } from '../../lib/motion/choreography'
import { revealOnScroll } from '../../lib/scroll'
import { LiveBackground } from '../LiveBackground'
import { DottedSectionBg } from '../DottedSectionBg'

const JOURNEY = [
  {
    id: 'attention',
    label: 'Attention',
    headline: 'Earn attention before you ask for the sale.',
    body: 'Most businesses get ignored because nothing in their digital presence gives people a reason to stop scrolling.',
    visual: 'dots',
  },
  {
    id: 'trust',
    label: 'Trust',
    headline: 'Trust turns visitors into conversations.',
    body: 'Clear messaging, proof, and a professional presence help prospects feel confident enough to reach out.',
    visual: 'stages',
  },
  {
    id: 'growth',
    label: 'Growth',
    headline: 'Growth is engineered, not accidental.',
    body: 'Website, SEO, and marketing work as one system so every channel pushes toward enquiries and revenue.',
    visual: 'system',
  },
] as const

const TRUST_STAGES = ['Visitors', 'Conversations', 'Enquiries', 'Customers'] as const

function JourneyVisual({ visual }: { visual: (typeof JOURNEY)[number]['visual'] }) {
  if (visual === 'dots') {
    return (
      <div className="relative mx-auto aspect-square max-w-xs">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border border-line bg-surface" />
        </div>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#5F5C59]/25"
            style={{
              left: `${50 + Math.cos((i / 28) * Math.PI * 2) * 42}%`,
              top: `${50 + Math.sin((i / 28) * Math.PI * 2) * 42}%`,
            }}
          />
        ))}
        <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-secondary">
          Scattered attention converges on your brand
        </p>
      </div>
    )
  }

  if (visual === 'stages') {
    return (
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {TRUST_STAGES.map((stage) => (
          <div
            key={stage}
            className="rounded-lg border border-line bg-surface px-4 py-3 text-center text-sm font-semibold text-ink"
          >
            {stage}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {['Website', 'SEO', 'Marketing'].map((node, i) => (
        <div key={node} className="flex w-full max-w-xs flex-col items-center">
          <div className="w-full rounded-lg border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-ink">
            {node}
          </div>
          {i < 2 && <div className="my-1 h-6 w-px bg-[#5F5C59]/20" />}
        </div>
      ))}
      <p className="mt-4 text-center text-xs font-semibold text-ink">Integrated Growth System</p>
    </div>
  )
}

function JourneyCard({ step, className = '' }: { step: (typeof JOURNEY)[number]; className?: string }) {
  return (
    <article className={`journey-card surface-elevated p-6 sm:p-8 ${className}`}>
      <span className="story-label">{step.label}</span>
      <h2 className="story-headline mt-3 text-2xl sm:text-3xl text-ink">{step.headline}</h2>
      <p className="story-body mt-3 text-base">{step.body}</p>
      <div className="mt-6 rounded-lg border border-line bg-canvas/80 p-5 sm:p-6">
        <JourneyVisual visual={step.visual} />
      </div>
    </article>
  )
}

export function ClientJourneyStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const mobileStackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const cleanups: (() => void)[] = []

    if (isMobile()) {
      const stack = mobileStackRef.current
      const cards = stack?.querySelectorAll('.journey-card')
      if (stack && cards?.length) {
        const tween = revealOnScroll(
          cards,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out' },
          { trigger: stack, start: 'top 88%', toggleActions: 'play none none none' },
        )
        cleanups.push(() => {
          tween.scrollTrigger?.kill()
          tween.kill()
        })
      }
      return () => cleanups.forEach((fn) => fn())
    }

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const panels = gsap.utils.toArray<HTMLElement>('.journey-panel', track)

    const horizontal = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth * 0.85}`,
        pin: true,
        scrub: SCRUB.smooth,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    panels.forEach((panel) => {
      const copyTween = gsap.fromTo(
        panel.querySelector('.journey-copy'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left 70%',
            end: 'right 30%',
            toggleActions: 'play reverse play reverse',
          },
        },
      )

      const visualTween = gsap.fromTo(
        panel.querySelector('.journey-visual'),
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          immediateRender: false,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left 75%',
            end: 'right 25%',
            toggleActions: 'play reverse play reverse',
          },
        },
      )

      cleanups.push(() => {
        copyTween.scrollTrigger?.kill()
        copyTween.kill()
        visualTween.scrollTrigger?.kill()
        visualTween.kill()
      })
    })

    cleanups.push(() => {
      horizontal.scrollTrigger?.kill()
      horizontal.kill()
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      {/* Mobile: vertical stacked cards */}
      <section
        ref={mobileStackRef}
        className="relative overflow-hidden bg-canvas py-16 sm:py-20 md:hidden"
        aria-label="Attention, trust and growth"
      >
        <LiveBackground variant="soft" />
        <DottedSectionBg />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <span className="story-label">How growth works</span>
          <h2 className="story-headline mt-3 text-2xl text-ink">Attention. Trust. Growth.</h2>
          <div className="mt-8 flex flex-col gap-6">
            {JOURNEY.map((step) => (
              <JourneyCard key={step.id} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: horizontal pinned scroll */}
      <section
        ref={sectionRef}
        className="story-section relative hidden h-screen overflow-hidden bg-canvas md:block"
        aria-label="Attention, trust and growth"
      >
        <LiveBackground variant="soft" />
        <DottedSectionBg />

        <div className="absolute top-10 left-6 z-20 md:left-12">
          <span className="story-label">How growth works</span>
          <p className="mt-2 text-xs text-secondary">Scroll to move through the journey</p>
        </div>

        <div ref={trackRef} className="flex h-full w-max">
          {JOURNEY.map((step) => (
            <article
              key={step.id}
              className="journey-panel flex h-full w-screen shrink-0 flex-col justify-center px-6 pb-16 pt-24 md:px-12 lg:px-20"
            >
              <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
                <div className="journey-copy">
                  <span className="story-label">{step.label}</span>
                  <h2 className="story-headline mt-4 text-[clamp(1.75rem,5vw,3.25rem)] text-ink">
                    {step.headline}
                  </h2>
                  <p className="story-body mt-4 max-w-lg text-base">{step.body}</p>
                </div>
                <div className="journey-visual surface-elevated p-6 sm:p-8">
                  <JourneyVisual visual={step.visual} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
