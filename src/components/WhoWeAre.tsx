import { motion } from 'framer-motion'
import { Anchor, Megaphone, TrendingUp } from 'lucide-react'
import {
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  viewportOnce,
} from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const pillars = [
  {
    icon: Anchor,
    title: 'Hook',
    desc: 'Capture attention with modern websites and brand experiences that make a strong first impression.',
  },
  {
    icon: Megaphone,
    title: 'Engage',
    desc: 'Reach the right audience through SEO, social media, and campaigns built for real conversations.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    desc: 'Turn visibility into enquiries and revenue with data driven optimization and ongoing support.',
  },
]

export function WhoWeAre() {
  return (
    <section className="relative py-20 sm:py-28">
      <motion.div
        aria-hidden
        className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-purple/15 blur-[100px]"
        animate={{ x: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Who we are"
          title="What is Digi Hooks?"
          description="We are a digital growth partner for businesses that want more than a pretty website. We build systems that attract leads, rank on Google, and scale with you."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="space-y-5 text-base leading-relaxed text-white/65 sm:text-lg"
          >
            <motion.p variants={slideFromLeft}>
              Digi Hooks helps local and growing businesses turn their online presence into a
              reliable growth engine. From high performance websites to SEO and social marketing,
              we handle the digital side so you can focus on running your business.
            </motion.p>
            <motion.p variants={slideFromLeft}>
              Our name reflects our approach: <strong className="text-white">Hook</strong> your
              audience, <strong className="text-white">Engage</strong> them with clear messaging
              and trust, and <strong className="text-white">Grow</strong> through measurable
              results, not vanity metrics.
            </motion.p>
            <motion.p variants={slideFromLeft} className="font-medium text-white/90">
              Transparent strategy. Modern engineering. Marketing tied to real business outcomes.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  variants={slideFromRight}
                  whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="glass group rounded-2xl p-5 transition hover:border-orange/25 sm:p-6"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple/40 to-orange/30 text-orange"
                  >
                    <Icon size={22} />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{pillar.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
