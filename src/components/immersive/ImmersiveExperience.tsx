import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenisScroll } from '../../hooks/useLenisScroll'
import { CustomCursor } from './CustomCursor'
import { HeroStory } from './HeroStory'
import { AttentionStory } from './AttentionStory'
import { TrustStory } from './TrustStory'
import { GrowthStory } from './GrowthStory'
import { ServicesStory } from './ServicesStory'
import { ProcessStory } from './ProcessStory'
import { ResultsStory } from './ResultsStory'
import { CTAStory } from './CTAStory'

export function ImmersiveExperience() {
  useLenisScroll()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { opacity: 0, y: -16 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=500',
          scrub: 0.6,
        },
      },
    )
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="relative bg-cream">
      <CustomCursor />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 opacity-0 pointer-events-none md:pointer-events-auto"
        aria-label="Site navigation"
      >
        <img
          src="/logo.svg"
          alt="DigiHooks"
          className="h-5 md:h-6 w-auto pointer-events-auto"
          draggable={false}
        />
        <a
          href="#cta"
          data-cursor="hover"
          className="hidden md:inline-block text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors duration-300 pointer-events-auto"
        >
          Let&apos;s Talk
        </a>
      </nav>

      <main>
        <HeroStory />
        <AttentionStory />
        <TrustStory />
        <GrowthStory />
        <ServicesStory />
        <ProcessStory />
        <ResultsStory />
        <div id="cta">
          <CTAStory />
        </div>
      </main>
    </div>
  )
}
