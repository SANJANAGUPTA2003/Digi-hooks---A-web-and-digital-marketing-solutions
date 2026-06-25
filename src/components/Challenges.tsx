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
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

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
    <section className="relative overflow-hidden py-24 sm:py-32 bg-canvas">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Business challenges"
          title="What is holding your growth back?"
          description="Select a challenge to see how DigiHooks turns problems into measurable outcomes."
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-6">
          <div className="flex flex-col gap-2 lg:col-span-2">
            {CHALLENGES.map((challenge, index) => {
              const ChallengeIcon = iconMap[challenge.icon] ?? Globe
              const isActive = index === active
              return (
                <button
                  key={challenge.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex items-center gap-4 rounded-lg px-4 py-4 text-left transition-all duration-300 sm:px-5 ${
                    isActive ? 'bg-card' : 'bg-surface hover:bg-card/80'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-canvas text-ink' : 'bg-canvas/60 text-secondary'
                    }`}
                  >
                    <ChallengeIcon size={20} />
                  </div>
                  <span className={`font-medium ${isActive ? 'text-ink' : 'text-secondary'}`}>
                    {challenge.title}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="challenge-indicator"
                      className="ml-auto h-2 w-2 rounded-full bg-ink"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="surface-card p-6 sm:p-10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-surface text-ink">
                  <Icon size={28} />
                </div>

                <h3 className="font-medium text-2xl text-ink sm:text-3xl">{current.title}</h3>

                <div className="mt-8 space-y-6">
                  <div>
                    <p className="story-label mb-2">The problem</p>
                    <p className="story-body text-base sm:text-lg">{current.problem}</p>
                  </div>
                  <div className="surface-muted p-5 sm:p-6">
                    <p className="story-label mb-2">DigiHooks solution</p>
                    <p className="text-base leading-relaxed text-ink sm:text-lg">{current.solution}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
