import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROCESS_STEPS } from '../lib/constants'
import { revealOnScroll } from '../lib/scroll'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    const steps = section?.querySelectorAll('.process-step')
    if (!section || !line || !steps?.length) return

    const tweens: gsap.core.Tween[] = []

    tweens.push(
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.5,
          },
        },
      ),
    )

    steps.forEach((step, i) => {
      tweens.push(
        revealOnScroll(
          step,
          { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          { trigger: step, start: 'top 90%', toggleActions: 'play none none none' },
        ),
      )
    })

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32 bg-canvas">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our process"
          title="From discovery to sustained growth"
          description="A proven six step framework, transparent, fast, and built around your revenue goals."
          align="center"
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px origin-top bg-ink/8 md:left-1/2 md:block md:-translate-x-px">
            <div ref={lineRef} className="h-full w-full origin-top bg-ink/20" />
          </div>

          <div className="space-y-8 md:space-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={step.title}
                  className={`process-step relative flex flex-col md:flex-row md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`surface-card p-6 sm:p-8 ${isEven ? 'md:ml-auto md:max-w-md' : 'md:max-w-md'}`}>
                      <span className="story-label">{step.step}</span>
                      <h3 className="mt-2 font-medium text-xl text-ink sm:text-2xl">{step.title}</h3>
                      <p className="story-body mt-3 text-sm sm:text-base">{step.desc}</p>
                    </div>
                  </div>

                  <div className="absolute left-4 top-8 z-10 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-card">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
