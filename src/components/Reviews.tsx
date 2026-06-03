import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { REVIEWS } from '../lib/constants'
import { fadeUpScale, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

export function Reviews() {
  return (
    <section className="relative py-20 sm:py-28">
      <motion.div
        aria-hidden
        className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-orange/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client reviews"
          title="What our clients say"
          description="Real feedback from businesses we've helped grow online."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {REVIEWS.map((review) => (
            <motion.blockquote
              key={review.name}
              variants={fadeUpScale}
              whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="glass flex flex-col rounded-3xl p-6 sm:p-8"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <Star size={16} className="fill-orange text-orange" />
                  </motion.div>
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-white/70 sm:text-base">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-6 border-t border-white/10 pt-4">
                <p className="font-display font-semibold text-white">{review.name}</p>
                <p className="text-sm text-white/50">
                  {review.role}, {review.business}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
