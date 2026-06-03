import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { INSIGHTS } from '../lib/constants'
import { fadeUpScale, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

export function Insights() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Insights"
          title="Latest growth thinking"
          description="Practical articles on websites, SEO, and digital marketing written for business owners, not developers."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {INSIGHTS.map((post) => (
            <motion.div
              key={post.title}
              variants={fadeUpScale}
              whileHover={{
                y: -8,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <Link
                to="/contact"
                className="glass group flex flex-col rounded-3xl p-6 transition hover:border-blue/30 sm:p-8"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-purple/30 px-3 py-1 text-xs font-medium text-blue">
                    {post.tag}
                  </span>
                  <span className="text-xs text-white/40">{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white transition group-hover:text-orange sm:text-xl">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue group-hover:text-orange">
                  Read article
                  <motion.span whileHover={{ x: 4, y: -4 }}>
                    <ArrowUpRight size={16} />
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
