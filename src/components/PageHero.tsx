import { motion } from 'framer-motion'
import { pageHeroDesc, pageHeroTitle, staggerContainer } from '../lib/motion'

interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="mesh-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-purple/20 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-orange/15 blur-[80px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          {eyebrow && (
            <motion.div
              variants={pageHeroTitle}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm sm:text-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange" />
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            variants={pageHeroTitle}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={pageHeroDesc}
              className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
