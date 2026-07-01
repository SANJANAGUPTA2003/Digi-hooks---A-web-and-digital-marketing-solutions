import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { isMobile, prefersReducedMotion } from '../lib/motion/choreography'

type LiveBackgroundVariant = 'global' | 'hero' | 'network' | 'soft'

interface LiveBackgroundProps {
  variant?: LiveBackgroundVariant
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  phase: number
}

/** Light: brand #5F5C59 · Dark: soft warm gray nodes */
const NODE_RGB = { light: '95, 92, 89', dark: '168, 162, 158' } as const

type VariantConfig = {
  nodes: number
  nodeOpacity: number
  lineOpacity: number
  speed: number
  linkDistance: number
  maxLinks: number
}

function getVariantConfig(variant: LiveBackgroundVariant): VariantConfig {
  const mobile = isMobile()

  const desktop: Record<LiveBackgroundVariant, VariantConfig> = {
    global: { nodes: 32, nodeOpacity: 0.38, lineOpacity: 0.2, speed: 0.14, linkDistance: 160, maxLinks: 3 },
    hero: { nodes: 40, nodeOpacity: 0.42, lineOpacity: 0.22, speed: 0.16, linkDistance: 170, maxLinks: 3 },
    network: { nodes: 36, nodeOpacity: 0.4, lineOpacity: 0.24, speed: 0.15, linkDistance: 165, maxLinks: 3 },
    soft: { nodes: 22, nodeOpacity: 0.32, lineOpacity: 0.16, speed: 0.12, linkDistance: 140, maxLinks: 2 },
  }

  const mobileCfg: Record<LiveBackgroundVariant, VariantConfig> = {
    global: { nodes: 14, nodeOpacity: 0.34, lineOpacity: 0.18, speed: 0.1, linkDistance: 120, maxLinks: 2 },
    hero: { nodes: 16, nodeOpacity: 0.36, lineOpacity: 0.2, speed: 0.11, linkDistance: 125, maxLinks: 2 },
    network: { nodes: 14, nodeOpacity: 0.34, lineOpacity: 0.18, speed: 0.1, linkDistance: 120, maxLinks: 2 },
    soft: { nodes: 10, nodeOpacity: 0.3, lineOpacity: 0.14, speed: 0.09, linkDistance: 110, maxLinks: 2 },
  }

  return mobile ? mobileCfg[variant] : desktop[variant]
}

export function LiveBackground({ variant = 'global', className = '' }: LiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const nodeRgb = NODE_RGB[theme]
    const config = getVariantConfig(variant)
    let nodes: Node[] = []
    let raf = 0
    let tick = 0
    let width = 0
    let height = 0
    const frameSkip = isMobile() ? 2 : 1

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2)
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodes = Array.from({ length: config.nodes }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        r: 1.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw)
      if (document.hidden) return

      tick++
      if (tick % frameSkip !== 0) return

      ctx.clearRect(0, 0, width, height)

      const t = time * 0.00015

      nodes.forEach((node) => {
        node.x += node.vx + Math.sin(t + node.phase) * 0.08
        node.y += node.vy + Math.cos(t * 0.9 + node.phase) * 0.08

        if (node.x < 8) node.vx = Math.abs(node.vx)
        if (node.x > width - 8) node.vx = -Math.abs(node.vx)
        if (node.y < 8) node.vy = Math.abs(node.vy)
        if (node.y > height - 8) node.vy = -Math.abs(node.vy)
      })

      const linkCounts = new Array(nodes.length).fill(0)

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (linkCounts[i] >= config.maxLinks || linkCounts[j] >= config.maxLinks) continue

          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)

          if (dist < config.linkDistance) {
            const fade = 1 - dist / config.linkDistance
            ctx.strokeStyle = `rgba(${nodeRgb}, ${config.lineOpacity * fade})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            linkCounts[i]++
            linkCounts[j]++
          }
        }
      }

      nodes.forEach((node) => {
        ctx.fillStyle = `rgba(${nodeRgb}, ${config.nodeOpacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [variant, theme])

  if (prefersReducedMotion()) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden
    />
  )
}
