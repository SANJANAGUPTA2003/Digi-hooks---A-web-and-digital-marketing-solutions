import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PROCESS_STEPS } from '../lib/constants'
import { SectionHeader } from './ui/SectionHeader'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1])

  return (
    <section className="relative py-20 sm:py-28" ref={ref}>
      <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-blue/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our process"
          title="From discovery to sustained growth"
          description="A proven six step framework, transparent, fast, and built around your revenue goals."
          align="center"
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-px">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-orange via-purple to-blue"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div className="space-y-8 md:space-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div
                      className={`glass rounded-2xl p-6 sm:p-8 ${
                        isEven ? 'md:ml-auto md:max-w-md' : 'md:max-w-md'
                      }`}
                    >
                      <span className="font-mono text-sm text-orange">{step.step}</span>
                      <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-4 top-8 z-10 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-orange bg-bg shadow-lg shadow-orange/30"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
