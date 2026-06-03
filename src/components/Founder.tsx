import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { fadeUp, slideFromRight, staggerContainer, viewportOnce } from '../lib/motion'

export function Founder() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-purple/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <motion.div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange/30 to-purple/40 blur-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="glass-strong relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-bg via-purple/30 to-bg p-8 text-center">
                <motion.img
                  src="/logo.png"
                  alt="Digi Hooks founder"
                  className="mb-6 h-32 w-32 rounded-full object-cover ring-2 ring-orange/40"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <p className="font-display text-lg font-bold text-white">Founder, Digi Hooks</p>
                <p className="mt-1 text-sm text-orange">Hook · Engage · Grow</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              className="mb-3 inline-block font-display text-xs font-semibold uppercase tracking-[0.2em] text-orange"
            >
              Founder story
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Built for businesses that deserve better than generic agencies
            </motion.h2>

            <div className="relative mt-8 space-y-5 text-base leading-relaxed text-white/65 sm:text-lg">
              <Quote className="absolute -left-2 -top-2 h-8 w-8 text-orange/30" />
              <motion.p variants={slideFromRight}>
                Digi Hooks started with a simple observation: most local businesses invest in
                websites and marketing that look fine but never generate real enquiries. Pretty
                portfolios do not pay bills. Pipeline does.
              </motion.p>
              <motion.p variants={slideFromRight}>
                We created Digi Hooks to be the partner we wished existed: transparent strategy,
                modern engineering, and marketing tied to Google visibility and lead flow. No
                bloated retainers. No jargon. Just systems that help you hook attention, engage
                prospects, and grow revenue.
              </motion.p>
              <motion.p variants={slideFromRight} className="font-medium text-white/90">
                Every project is personal, because your growth story is ours too.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
