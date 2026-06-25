import { forwardRef } from 'react'

type DGLogoProps = {
  className?: string
  hookRef?: React.RefObject<HTMLDivElement | null>
  monogramRef?: React.RefObject<HTMLDivElement | null>
}

/** Official DG monogram — PNG base + animatable hook accent overlay */
export const DGLogo = forwardRef<HTMLDivElement, DGLogoProps>(function DGLogo(
  { className = '', hookRef, monogramRef },
  ref,
) {
  return (
    <div ref={monogramRef ?? ref} className={`relative ${className}`} aria-label="DigiHooks DG monogram">
      <img
        src="/logo-dg.png"
        alt=""
        className="w-full h-auto select-none pointer-events-none"
        draggable={false}
      />
      {/* Hook accent — reveals on scroll over the G hook detail */}
      <div
        ref={hookRef}
        className="hook-accent absolute inset-0 opacity-0 pointer-events-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M248 118 C228 98 218 88 210 72 C200 52 208 38 224 32"
            stroke="#1C1C1C"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="hook-stroke"
            strokeDasharray="80"
            strokeDashoffset="80"
          />
          <circle cx="224" cy="32" r="5" stroke="#1C1C1C" strokeWidth="2" fill="#FFF7F0" className="hook-pin" />
        </svg>
      </div>
    </div>
  )
})
