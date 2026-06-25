import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MessageCircle } from 'lucide-react'
import { GROWTH_ECOSYSTEM, WHATSAPP_URL } from '../../lib/constants'
import { isMobile, prefersReducedMotion } from '../../lib/motion/choreography'
import { LiveBackground } from '../LiveBackground'
import { DottedSectionBg } from '../DottedSectionBg'
import { Button } from '../ui/Button'

export function HeroConversion() {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    const visual = visualRef.current
    if (!section || !copy || !visual) return

    if (prefersReducedMotion()) {
      gsap.set([copy.children, visual.querySelectorAll('.eco-node, .eco-connector')], { opacity: 1, clearProps: 'all' })
      return
    }

    const nodes = visual.querySelectorAll('.eco-node')
    const connectors = visual.querySelectorAll('.eco-connector')

    const enterTl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    enterTl
      .fromTo(copy.querySelector('.hero-eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(copy.querySelector('.hero-headline'), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7 }, 0.08)
      .fromTo(copy.querySelector('.hero-sub'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 0.18)
      .fromTo(copy.querySelector('.hero-ctas'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.28)

    enterTl.fromTo(nodes, { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.55 }, 0.2)
    enterTl.fromTo(
      connectors,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, stagger: 0.1, duration: 0.45, transformOrigin: 'left center' },
      0.45,
    )

    if (!isMobile()) {
      gsap.to(nodes, {
        y: -6,
        stagger: { each: 0.15, yoyo: true, repeat: -1 },
        ease: 'sine.inOut',
        duration: 2.4,
      })
    }

    return () => {
      enterTl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20"
      aria-label="DigiHooks digital growth studio"
    >
      <LiveBackground variant="hero" />
      <DottedSectionBg className="opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-24 hidden h-80 w-80 rounded-full bg-surface/80 blur-3xl md:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div ref={copyRef} className="min-w-0">
          <p className="hero-eyebrow story-label opacity-0">Digital growth studio</p>
          <h1 className="hero-headline story-headline mt-4 text-[clamp(2rem,7vw,4.25rem)] text-ink opacity-0">
            Turn Attention Into Customers
          </h1>
          <p className="hero-sub story-body mt-4 max-w-lg text-base leading-relaxed opacity-0 sm:mt-5 sm:text-lg">
            Websites, SEO and digital growth systems built to help businesses get found, trusted and chosen.
          </p>
          <div className="hero-ctas mt-7 flex w-full flex-col gap-3 opacity-0 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Button to="/contact" variant="primary" className="w-full sm:w-auto">
              Book a Strategy Call
            </Button>
            <Button href={WHATSAPP_URL} variant="secondary" className="w-full sm:w-auto">
              <MessageCircle size={18} />
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        <div ref={visualRef} className="relative min-w-0">
          <div className="surface-elevated p-5 sm:p-8">
            <p className="story-label mb-5 sm:mb-6">How growth connects</p>
            <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
              {GROWTH_ECOSYSTEM.map((step, i) => (
                <div key={step.id} className="flex items-center sm:flex-1">
                  <div className="eco-node flex-1 opacity-0">
                    <div className="rounded-lg border border-line bg-surface/50 p-4 transition-colors hover:bg-surface sm:p-5">
                      <p className="text-sm font-semibold text-ink">{step.label}</p>
                      <p className="story-body mt-1 text-xs sm:text-sm">{step.desc}</p>
                    </div>
                  </div>
                  {i < GROWTH_ECOSYSTEM.length - 1 && (
                    <div className="eco-connector flex shrink-0 items-center justify-center px-2 py-2 opacity-0 sm:py-0">
                      <div className="hidden h-px w-full min-w-[1.5rem] origin-left bg-[#5F5C59]/20 sm:block" />
                      <span className="text-lg leading-none text-secondary sm:hidden">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="story-body mt-5 text-center text-sm sm:mt-6 sm:text-left">
              One connected system. Not three separate vendors.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
