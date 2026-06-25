import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, FileText, LineChart, MapPin, Megaphone, Palette, Share2 } from 'lucide-react'
import { SERVICES, STORY_SERVICES } from '../lib/constants'
import { pinEnd, SCRUB, isMobile, prefersReducedMotion } from '../lib/motion/choreography'
import { animateHeadline } from '../lib/motion/reveal'
import { revealOnScroll } from '../lib/scroll'
import { LiveBackground } from './LiveBackground'
import { DottedSectionBg } from './DottedSectionBg'

const ICONS = {
  Code2,
  LineChart,
  Share2,
  MapPin,
  Megaphone,
  Palette,
  FileText,
} as const

interface ServiceScrollExperienceProps {
  showSupporting?: boolean
}

export function ServiceScrollExperience({ showSupporting = true }: ServiceScrollExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const mobileStackRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      const panels = panelsRef.current?.querySelectorAll('.service-focus-panel')
      if (panels?.length) {
        gsap.set(panels, { opacity: 1, y: 0, clearProps: 'filter' })
        gsap.set(sectionRef.current?.querySelectorAll('.service-headline, .service-body, .service-index') ?? [], {
          opacity: 1,
          y: 0,
        })
      }
      const mobileCards = mobileStackRef.current?.querySelectorAll('.service-mobile-card')
      if (mobileCards?.length) gsap.set(mobileCards, { opacity: 1, y: 0 })
      return
    }

    if (isMobile()) {
      const stack = mobileStackRef.current
      const cards = stack?.querySelectorAll('.service-mobile-card')
      if (!stack || !cards?.length) return

      const tween = revealOnScroll(
        cards,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: 'power2.out' },
        { trigger: stack, start: 'top 88%', toggleActions: 'play none none none' },
      )

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }

    const section = sectionRef.current
    const panels = panelsRef.current?.querySelectorAll('.service-focus-panel')
    if (!section || !panels?.length) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: pinEnd(360),
        pin: true,
        scrub: SCRUB.smooth,
      },
    })

    panels.forEach((panel, i) => {
      const headline = panel.querySelector('.service-headline')
      const body = panel.querySelectorAll('.service-body')
      const index = panel.querySelector('.service-index')

      if (i === 0) {
        if (headline) animateHeadline(headline as HTMLElement, tl, 0, 36)
        tl.fromTo(index, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.15 }, 0.05)
        tl.fromTo(body, { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.2 }, 0.08)
      } else {
        const start = i * 0.22
        tl.to(panels[i - 1], { opacity: 0, y: -24, duration: 0.18, ease: 'power2.in' }, start)
        tl.fromTo(panel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, start + 0.04)
        if (headline) animateHeadline(headline as HTMLElement, tl, start + 0.06, 32)
        tl.fromTo(index, { opacity: 0 }, { opacity: 1, duration: 0.12 }, start + 0.08)
        tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.15 }, start + 0.1)
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <>
      {/* Mobile: vertical service cards */}
      <section
        ref={mobileStackRef}
        className="relative overflow-hidden bg-surface py-16 sm:py-20 md:hidden"
        aria-label="Services"
      >
        <LiveBackground variant="soft" />
        <DottedSectionBg />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <span className="story-label">Services</span>
          <h2 className="story-headline mt-3 text-2xl text-ink">What we build for growth</h2>
          <div className="mt-8 flex flex-col gap-5">
            {STORY_SERVICES.map((service, i) => (
              <article key={service.id} className="service-mobile-card surface-elevated p-6 sm:p-7">
                <span className="story-label">0{i + 1}</span>
                <h3 className="story-headline mt-3 text-xl text-ink">{service.title}</h3>
                <p className="story-body mt-3 text-base text-ink">{service.line}</p>
                <p className="story-body mt-3 text-sm">{service.detail}</p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-secondary"
                >
                  Discuss this service
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: pinned scroll panels */}
      <section
        ref={sectionRef}
        className="relative hidden h-screen overflow-hidden bg-surface md:block"
        aria-label="Services"
      >
        <LiveBackground variant="network" />
        <DottedSectionBg />
        <div className="absolute top-10 left-6 z-10 md:left-12">
          <span className="story-label">Services</span>
        </div>
        <div ref={panelsRef} className="relative h-full">
          {STORY_SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`service-focus-panel absolute inset-0 flex items-center px-6 md:px-12 lg:px-20 ${
                i === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                <div>
                  <span className="service-index story-label opacity-0">0{i + 1}</span>
                  <h2 className="service-headline story-headline mt-6 text-[clamp(2.25rem,5vw,4rem)] text-ink opacity-0">
                    {service.title}
                  </h2>
                </div>
                <div className="surface-elevated p-8 md:p-10">
                  <p className="service-body text-lg leading-relaxed text-ink opacity-0">{service.line}</p>
                  <p className="service-body story-body mt-5 text-sm md:text-base opacity-0">{service.detail}</p>
                  <Link
                    to="/contact"
                    className="service-body mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-secondary opacity-0"
                  >
                    Discuss this service
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showSupporting && (
        <section className="relative overflow-hidden bg-canvas py-16 sm:py-28">
          <LiveBackground variant="soft" />
          <DottedSectionBg />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-xl sm:mb-12">
              <span className="story-label">Full capability</span>
              <h2 className="story-headline mt-4 text-2xl sm:text-3xl text-ink">
                Everything you need to grow online
              </h2>
              <p className="story-body mt-3 text-base">
                Seven focused services. One growth partner. Click any service to start a conversation.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => {
                const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Code2
                return (
                  <Link
                    key={service.title}
                    to="/contact"
                    className="service-card group flex flex-col p-6 sm:p-7"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface transition-colors group-hover:bg-ink group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                    <p className="story-body mt-3 flex-1 text-sm leading-relaxed">{service.desc}</p>
                    <span className="mt-5 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-ink transition-transform group-hover:translate-x-0.5">
                      Learn more
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
