import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { WHATSAPP_URL } from '../lib/constants'
import { fadeUp, staggerContainerFast } from '../lib/motion'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { Button } from './ui/Button'

export function LeadCapture() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const business = form.get('business') as string
    const goals = form.get('goals') as string
    const achieve = form.get('achieve') as string
    const email = form.get('email') as string

    const message = [
      'Strategy Call Request',
      '',
      `Business: ${business}`,
      `Goals: ${goals}`,
      `What I want to achieve: ${achieve}`,
      `Email: ${email}`,
    ].join('\n')

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-orange/50 focus:ring-2 focus:ring-orange/20'

  return (
    <section className="relative pb-20 sm:pb-28">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-gradient-to-r from-purple/20 via-transparent to-orange/15 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
          className="glass-strong rounded-3xl p-6 sm:p-10"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              className="py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/20"
              >
                <MessageCircle size={32} className="text-[#25D366]" />
              </motion.div>
              <p className="font-display text-xl font-bold text-white">Opening WhatsApp…</p>
              <p className="mt-2 text-white/60">
                Your details have been prepared. Send the message to book your strategy call.
              </p>
              <Button href={WHATSAPP_URL} variant="whatsapp" className="mt-6">
                <MessageCircle size={20} />
                Open WhatsApp again
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainerFast}
                className="mb-8 text-center"
              >
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-2xl font-bold text-white sm:text-3xl"
                >
                  Book a strategy call
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-3 text-white/60">
                  Tell us about your business and goals. We&apos;ll connect with you on WhatsApp.
                </motion.p>
              </motion.div>

              <motion.form
                initial="hidden"
                animate="visible"
                variants={staggerContainerFast}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <motion.div variants={fadeUp}>
                  <label htmlFor="business" className="mb-2 block text-sm font-medium text-white/70">
                    Business Name
                  </label>
                  <input
                    id="business"
                    name="business"
                    required
                    placeholder="Your company name"
                    className={inputClass}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label htmlFor="goals" className="mb-2 block text-sm font-medium text-white/70">
                    What are your goals?
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    required
                    rows={3}
                    placeholder="e.g. Get more leads, rank on Google, improve my website..."
                    className={`${inputClass} resize-none`}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label htmlFor="achieve" className="mb-2 block text-sm font-medium text-white/70">
                    What do you want to achieve?
                  </label>
                  <textarea
                    id="achieve"
                    name="achieve"
                    required
                    rows={3}
                    placeholder="Describe the outcome you're looking for..."
                    className={`${inputClass} resize-none`}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Button type="submit" variant="primary" className="w-full">
                    <Send size={18} />
                    Submit &amp; connect on WhatsApp
                  </Button>
                </motion.div>
              </motion.form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
