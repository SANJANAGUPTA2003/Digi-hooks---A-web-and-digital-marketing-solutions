import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Code2,
  LineChart,
  MapPin,
  Share2,
  Shield,
  Target,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../lib/constants'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  LineChart,
  MapPin,
  Share2,
  Shield,
  Target,
}

interface ServicesProps {
  showLearnMore?: boolean
}

export function Services({ showLearnMore = false }: ServicesProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card')
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
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
          eyebrow="Services"
          title="Everything you need to win online"
          description="Full stack digital growth engineered for leads, rankings, and long term ROI."
        />

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Code2
            const isLarge = index === 0 || index === 2

            return (
              <article
                key={service.title}
                className={`service-card opacity-0 group surface-card p-6 sm:p-8 transition-opacity duration-300 hover:opacity-90 ${
                  isLarge ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex h-full min-h-[180px] flex-col justify-between">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-ink transition-colors duration-300 group-hover:bg-canvas">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-medium text-xl text-ink sm:text-2xl">{service.title}</h3>
                    <p className="story-body mt-3 max-w-lg text-sm sm:text-base">{service.desc}</p>
                  </div>

                  {showLearnMore && (
                    <Link
                      to="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-secondary transition-colors"
                      data-cursor="hover"
                    >
                      Learn more
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
