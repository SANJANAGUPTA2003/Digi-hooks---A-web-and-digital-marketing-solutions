import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { fadeUpScale, slideFromRight, staggerContainer, viewportOnce } from '../lib/motion'
import { Button } from './ui/Button'
import { SectionHeader } from './ui/SectionHeader'

export function HomeContact() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="Get in touch"
            title="Ready to start growing?"
            description="Tell us about your business and goals. We'll review your digital presence and map out a strategy with no obligation, just clarity."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideFromRight}
              whileHover={{ y: -4 }}
              className="glass-strong rounded-3xl p-8 sm:p-10"
            >
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange/30 to-purple/30 text-orange"
              >
                <Calendar size={28} />
              </motion.div>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">
                Book a free strategy call
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                Fill out a quick form with your business details and goals. We&apos;ll connect with
                you on WhatsApp to discuss next steps.
              </p>
              <motion.div variants={fadeUpScale}>
                <Button to="/contact" variant="primary" className="mt-8 w-full sm:w-auto">
                  Go to contact form
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
