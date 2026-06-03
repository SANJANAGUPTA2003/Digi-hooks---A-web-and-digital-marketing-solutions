import { motion } from 'framer-motion'
import { fadeUp, staggerContainerFast, viewportOnce } from '../../lib/motion'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const maxW = align === 'center' ? 'max-w-2xl' : 'max-w-xl'

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainerFast}
      className={`mb-12 md:mb-16 ${alignClass} ${maxW}`}
    >
      <motion.span
        variants={fadeUp}
        className="mb-3 inline-block font-display text-xs font-semibold uppercase tracking-[0.2em] text-orange"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
