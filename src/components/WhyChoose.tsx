import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Handshake, HeartHandshake, Target, Zap, type LucideIcon } from 'lucide-react'
import { WHY_CHOOSE } from '../lib/constants'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

const whyIcons: Record<string, LucideIcon> = {
  Zap,
  Target,
  HeartHandshake,
  Handshake,
}

export function WhyChoose() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.why-card')
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
  }, [])

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-surface">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why DigiHooks"
          title="Why businesses choose us"
          description="We operate like a product team, obsessed with outcomes, speed, and clarity."
          align="center"
        />

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WHY_CHOOSE.map((item) => {
            const Icon = whyIcons[item.icon] ?? Zap
            return (
              <div
                key={item.title}
                className="why-card opacity-0 surface-card p-6 sm:p-8 transition-opacity duration-300 hover:opacity-90"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-ink">
                  <Icon size={22} />
                </div>
                <h3 className="font-medium text-lg text-ink">{item.title}</h3>
                <p className="story-body mt-3 text-sm leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
