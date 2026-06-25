import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion/choreography'
import { killScrollTriggersIn } from '../lib/scroll'
import { Button } from './ui/Button'
import { DottedSectionBg } from './DottedSectionBg'

export function HomeContact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll('.home-cta-item')

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => {
      killScrollTriggersIn(section)
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32 bg-surface">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-muted mx-auto max-w-3xl p-10 sm:p-14 text-center">
          <span className="home-cta-item story-label">Get started</span>
          <h2 className="home-cta-item story-headline mt-4 text-3xl sm:text-4xl text-ink">
            Ready to grow your business?
          </h2>
          <p className="home-cta-item story-body mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Tell us about your business. We will review your digital presence and map a clear path
            forward. No obligation. No jargon.
          </p>
          <div className="home-cta-item mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/contact" variant="primary">
              Book a Strategy Call
              <ArrowRight size={18} />
            </Button>
            <Button href={WHATSAPP_URL} variant="secondary">
              <MessageCircle size={18} />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
