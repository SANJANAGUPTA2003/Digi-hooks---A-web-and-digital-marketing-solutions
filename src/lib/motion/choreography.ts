/** Shared scroll choreography — timing, easing, helpers */

export const SCRUB = {
  silk: 1.1,
  smooth: 0.85,
  medium: 0.65,
  gentle: 0.45,
} as const

export const STORY_EASE = {
  cinematic: 'power2.inOut',
  softOut: 'power2.out',
  softInOut: 'power1.inOut',
  none: 'none',
} as const

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function pinEnd(extra = 200) {
  return isMobile() ? `+=${Math.round(extra * 0.72)}%` : `+=${extra}%`
}
