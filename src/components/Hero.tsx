import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/constants'
import { Button } from './ui/Button'
import { HeroMockup } from './HeroMockup'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="mesh-bg pointer-events-none absolute inset-0" />
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm sm:text-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange" />
            Hook · Engage · Grow · Digital growth partners
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
          >
            Turn your online presence into a{' '}
            <span className="text-gradient">growth engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Digi Hooks builds websites and marketing systems that attract qualified
            leads, rank on Google, and scale with your business not vanity metrics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button to="/contact">Free Strategy Call</Button>
            <Button href={WHATSAPP_URL} variant="whatsapp">
              <MessageCircle size={20} />
              Chat on WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8"
          >
            {[
              { value: '50+', label: 'Projects delivered' },
              { value: '3×', label: 'Avg. lead uplift' },
              { value: '24h', label: 'Response time' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroMockup />
        </motion.div>
      </div>
    </section>
  )
}
