import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STORY_EASE } from './choreography'

/** Smooth headline reveal — slide + opacity, no flash */
export function animateHeadline(
  el: HTMLElement | null,
  tl: gsap.core.Timeline,
  at: number | string,
  offsetY = 48,
) {
  if (!el) return
  tl.fromTo(
    el,
    { opacity: 0, y: offsetY, filter: 'blur(6px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      ease: STORY_EASE.softOut,
      duration: 0.35,
    },
    at,
  )
}

/** Section bridge — connect outgoing → incoming with parallax. Returns cleanup. */
export function bindSectionBridge(
  section: HTMLElement,
  opts: { enterY?: number; scale?: number } = {},
): () => void {
  const { enterY = 60, scale = 0.97 } = opts
  const triggers: ScrollTrigger[] = []

  const bridge = gsap.fromTo(
    section,
    { y: enterY, scale, opacity: 0.85 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      ease: STORY_EASE.cinematic,
      scrollTrigger: {
        trigger: section,
        start: 'top 92%',
        end: 'top 55%',
        scrub: 0.85,
      },
    },
  )
  if (bridge.scrollTrigger) triggers.push(bridge.scrollTrigger)

  const parallax = section.querySelector('.story-parallax-inner')
  if (parallax) {
    const parallaxTween = gsap.fromTo(
      parallax,
      { y: 30 },
      {
        y: -30,
        ease: STORY_EASE.none,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    )
    if (parallaxTween.scrollTrigger) triggers.push(parallaxTween.scrollTrigger)
  }

  return () => triggers.forEach((t) => t.kill())
}

/** Subtle image / visual drift while section is in view. Returns cleanup. */
export function bindVisualDrift(el: HTMLElement | null, section: HTMLElement): () => void {
  if (!el) return () => undefined

  const tween = gsap.fromTo(
    el,
    { y: 24, scale: 1.04 },
    {
      y: -24,
      scale: 1,
      ease: STORY_EASE.none,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.55,
      },
    },
  )

  return () => tween.scrollTrigger?.kill()
}
