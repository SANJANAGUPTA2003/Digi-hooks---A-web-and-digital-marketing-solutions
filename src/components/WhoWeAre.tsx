import { useEffect, useRef } from 'react'
import { Anchor, Megaphone, TrendingUp } from 'lucide-react'
import { revealOnScroll } from '../lib/scroll'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

const pillars = [
  {
    icon: Anchor,
    title: 'Hook',
    desc: 'Capture attention with modern websites and brand experiences that make a strong first impression.',
  },
  {
    icon: Megaphone,
    title: 'Engage',
    desc: 'Reach the right audience through SEO, social media, and campaigns built for real conversations.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    desc: 'Turn visibility into enquiries and revenue with data driven optimization and ongoing support.',
  },
]

export function WhoWeAre() {
  const textRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    if (textRef.current) {
      tweens.push(
        revealOnScroll(
          textRef.current.children,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' },
          { trigger: textRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        ),
      )
    }
    if (pillarsRef.current) {
      tweens.push(
        revealOnScroll(
          pillarsRef.current.children,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' },
          { trigger: pillarsRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        ),
      )
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-canvas">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Who we are"
          title="What is DigiHooks?"
          description="We are a digital growth partner for businesses that want more than a pretty website. We build systems that attract leads, rank on Google, and scale with you."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div ref={textRef} className="space-y-5 text-base leading-relaxed story-body sm:text-lg">
            <p>
              DigiHooks helps local and growing businesses turn their online presence into a
              reliable growth engine. From high performance websites to SEO and social marketing,
              we handle the digital side so you can focus on running your business.
            </p>
            <p>
              Our name reflects our approach: <strong className="text-ink font-medium">Hook</strong> your
              audience, <strong className="text-ink font-medium">Engage</strong> them with clear messaging
              and trust, and <strong className="text-ink font-medium">Grow</strong> through measurable
              results, not vanity metrics.
            </p>
            <p className="font-medium text-ink">
              Transparent strategy. Modern engineering. Marketing tied to real business outcomes.
            </p>
          </div>

          <div ref={pillarsRef} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="surface-card group p-5 sm:p-6 transition-opacity duration-300 hover:opacity-90"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface text-ink">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-medium text-lg text-ink">{pillar.title}</h3>
                  <p className="story-body mt-2 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
