import { AnimatePresence, motion } from 'framer-motion'
import {
  Clock,
  Globe,
  Search,
  Sparkles,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { CHALLENGES } from '../lib/constants'
import { slideFromLeft, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const iconMap: Record<string, LucideIcon> = {
  Globe,
  TrendingDown,
  Search,
  Clock,
  Sparkles,
}

export function Challenges() {
  const [active, setActive] = useState(0)
  const current = CHALLENGES[active]
  const Icon = iconMap[current.icon] ?? Globe

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-purple/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Business challenges"
          title="What is holding your growth back?"
          description="Select a challenge to see how Digi Hooks turns problems into measurable outcomes."
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-col gap-2 lg:col-span-2"
          >
            {CHALLENGES.map((challenge, index) => {
              const ChallengeIcon = iconMap[challenge.icon] ?? Globe
              const isActive = index === active
              return (
                <motion.button
                  key={challenge.id}
                  variants={slideFromLeft}
                  type="button"
                  onClick={() => setActive(index)}
                  whileHover={{ x: 6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all sm:px-5 ${
                    isActive
                      ? 'glass-strong border-orange/30 shadow-lg shadow-orange/10'
                      : 'glass hover:border-white/20'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive ? 'bg-orange/25 text-orange' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    <ChallengeIcon size={20} />
                  </div>
                  <span
                    className={`font-display font-semibold ${
                      isActive ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {challenge.title}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="challenge-indicator"
                      className="ml-auto h-2 w-2 rounded-full bg-orange"
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10"
              >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-orange/20 to-purple/30 blur-3xl" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-orange/80 text-white">
                    <Icon size={28} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {current.title}
                  </h3>

                  <div className="mt-8 space-y-6">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange">
                        The problem
                      </p>
                      <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                        {current.problem}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-blue/20 bg-blue/5 p-5 sm:p-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue">
                        Digi Hooks solution
                      </p>
                      <p className="text-base leading-relaxed text-white/85 sm:text-lg">
                        {current.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
