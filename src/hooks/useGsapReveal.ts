import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { revealOnScroll } from '../lib/scroll'

/** GSAP scroll reveal — immediateRender:false so content stays visible until animated */
export function useGsapReveal<T extends HTMLElement>(options?: {
  y?: number
  delay?: number
  start?: string
}) {
  const ref = useRef<T>(null)
  const { y = 40, delay = 0, start = 'top 88%' } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const tween = revealOnScroll(
      el,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration: 0.9, delay, ease: 'power2.out' },
      { trigger: el, start, toggleActions: 'play none none none' },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, delay, start])

  return ref
}
