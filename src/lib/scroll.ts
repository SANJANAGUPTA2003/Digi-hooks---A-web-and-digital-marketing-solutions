import type Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance
}

export function scrollToTop(smooth = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, smooth ? { duration: 1.1 } : { immediate: true })
    return
  }

  window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export function resetNavigationScroll() {
  scrollToTop(true)
  killAllScrollTriggers()

  if (typeof ScrollTrigger.clearScrollMemory === 'function') {
    ScrollTrigger.clearScrollMemory()
  }

  requestAnimationFrame(() => {
    ScrollTrigger.refresh(true)
  })

  window.setTimeout(() => {
    ScrollTrigger.refresh(true)
  }, 200)
}

export function refreshScrollLayout() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh(true)
  })
}

export function revealOnScroll(
  targets: gsap.TweenTarget,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  trigger: ScrollTrigger.Vars,
) {
  return gsap.fromTo(targets, from, {
    ...to,
    immediateRender: false,
    scrollTrigger: trigger,
  })
}

export function killScrollTriggersIn(root: HTMLElement | null) {
  if (!root) return
  ScrollTrigger.getAll().forEach((trigger) => {
    const el = trigger.vars.trigger
    if (el === root || (el instanceof Element && root.contains(el))) {
      trigger.kill()
    }
  })
}
