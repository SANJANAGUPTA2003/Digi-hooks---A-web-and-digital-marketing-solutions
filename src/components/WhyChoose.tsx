import { motion } from 'framer-motion'
import {
  Handshake,
  HeartHandshake,
  Target,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { WHY_CHOOSE } from '../lib/constants'
import { fadeUpScale, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const whyIcons: Record<string, LucideIcon> = {
  Zap,
  Target,
  HeartHandshake,
  Handshake,
}

export function WhyChoose() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Digi Hooks"
          title="Why businesses choose us"
          description="We operate like a product team, obsessed with outcomes, speed, and clarity."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {WHY_CHOOSE.map((item) => {
            const Icon = whyIcons[item.icon] ?? Zap
            return (
              <motion.div
                key={item.title}
                variants={fadeUpScale}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="glass group rounded-3xl p-6 transition hover:border-orange/25 sm:p-8"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple/40 to-orange/30 text-orange"
                >
                  <Icon size={24} />
                </motion.div>
                <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
