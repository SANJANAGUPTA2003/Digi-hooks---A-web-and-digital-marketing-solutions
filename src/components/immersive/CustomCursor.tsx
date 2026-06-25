import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    document.body.classList.add('custom-cursor-active')

    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' })
    }

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14
      ring.current.y += (pos.current.y - ring.current.y) * 0.14
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y })
    }
    gsap.ticker.add(tick)

    const onEnter = () => gsap.to(ringEl, { scale: 1.6, opacity: 0.5, duration: 0.35, ease: 'power2.out' })
    const onLeave = () => gsap.to(ringEl, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' })

    const hoverables = document.querySelectorAll('a, button, [data-cursor="hover"]')
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
    </>
  )
}
