import { motion } from 'framer-motion'
import { Calendar, MessageCircle } from 'lucide-react'
import { STRATEGY_CALL_URL, WHATSAPP_URL } from '../lib/constants'
import { Button } from './ui/Button'

export function FinalCTA() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange via-purple to-bg opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to grow your business online?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Book a free strategy call or message us on WhatsApp . We typically respond within 24
            hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={WHATSAPP_URL} variant="whatsapp">
              <MessageCircle size={20} />
              Chat on WhatsApp
            </Button>
            <Button href={STRATEGY_CALL_URL} variant="secondary">
              <Calendar size={20} />
              Book Strategy Call
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
