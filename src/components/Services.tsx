import { motion } from 'framer-motion'
import {
  Code2,
  LineChart,
  MapPin,
  Share2,
  Shield,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../lib/constants'
import { fadeUpScale, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  LineChart,
  MapPin,
  Share2,
  Shield,
}

interface ServicesProps {
  showLearnMore?: boolean
}

export function Services({ showLearnMore = false }: ServicesProps) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="Everything you need to win online"
          description="Full stack digital growth engineered for leads, rankings, and long term ROI."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Code2
            const isLarge = index === 0 || index === 2

            return (
              <motion.article
                key={service.title}
                variants={fadeUpScale}
                whileHover={{
                  y: -10,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 ${
                  isLarge ? 'sm:col-span-2' : ''
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-60 transition-opacity group-hover:opacity-80`}
                />
                <div className="glass relative flex h-full min-h-[220px] flex-col justify-between p-6 sm:min-h-[260px] sm:p-8">
                  <div>
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange transition group-hover:bg-orange/20"
                    >
                      <Icon size={28} />
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
                      {service.desc}
                    </p>
                  </div>

                  {showLearnMore && (
                    <Link
                      to="/contact"
                      className="mt-6 flex items-center gap-2 text-sm font-medium text-blue transition group-hover:text-orange"
                    >
                      <span>Learn more</span>
                      <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  )}

                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-orange/10 blur-2xl transition group-hover:bg-orange/20" />
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
