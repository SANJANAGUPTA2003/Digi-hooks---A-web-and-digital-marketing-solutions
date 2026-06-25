import { MessageCircle, Send, Mail, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import {
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE,
  WHATSAPP_URL,
} from '../lib/constants'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { Button } from './ui/Button'
import { DottedSectionBg } from './DottedSectionBg'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

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
    'w-full min-h-12 rounded-lg border border-line bg-surface px-4 py-3.5 text-base text-ink placeholder:text-secondary/50 outline-none transition focus:border-ink/20 focus:ring-1 focus:ring-ink/10'

  return (
    <section className="relative overflow-hidden pb-20 sm:pb-28">
      <DottedSectionBg className="opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <aside className="lg:col-span-2 space-y-8">
            <div>
              <span className="story-label">Direct contact</span>
              <h2 className="story-headline mt-4 text-2xl sm:text-3xl text-ink">
                Let&apos;s start a conversation
              </h2>
              <p className="story-body mt-4 text-sm sm:text-base">
                Prefer to reach out directly? We&apos;re available on email, phone, and social.
              </p>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-sm text-secondary hover:text-ink transition-colors"
                >
                  <Mail size={18} className="text-ink/70" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-secondary hover:text-ink transition-colors"
                >
                  <Phone size={18} className="text-ink/70" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-secondary hover:text-ink transition-colors"
                >
                  <InstagramIcon className="h-[18px] w-[18px] text-ink/70" />
                  @digihooks
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-secondary hover:text-ink transition-colors"
                >
                  <FacebookIcon className="h-[18px] w-[18px] text-ink/70" />
                  DigiHooks on Facebook
                </a>
              </li>
            </ul>
          </aside>

          <div className="lg:col-span-3">
            <div className="surface-card p-6 sm:p-10">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
                    <MessageCircle size={32} className="text-ink" />
                  </div>
                  <p className="font-medium text-xl text-ink">Opening WhatsApp…</p>
                  <p className="story-body mt-2">
                    Your details have been prepared. Send the message to book your strategy call.
                  </p>
                  <Button href={WHATSAPP_URL} variant="whatsapp" className="mt-6">
                    <MessageCircle size={20} />
                    Open WhatsApp again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-medium text-2xl text-ink sm:text-3xl">Book a strategy call</h2>
                    <p className="story-body mt-3">
                      Tell us about your business and goals. We&apos;ll connect with you on WhatsApp.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="business" className="mb-2 block text-sm font-medium text-ink">
                        Business Name
                      </label>
                      <input id="business" name="business" required placeholder="Your company name" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="goals" className="mb-2 block text-sm font-medium text-ink">
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
                    </div>
                    <div>
                      <label htmlFor="achieve" className="mb-2 block text-sm font-medium text-ink">
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
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                        Email
                      </label>
                      <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                      <Send size={18} />
                      Submit &amp; connect on WhatsApp
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 surface-muted p-10 sm:p-14 text-center">
          <span className="story-label">Get started</span>
          <h2 className="story-headline mt-4 text-3xl sm:text-4xl text-ink max-w-2xl mx-auto">
            Ready to Grow?
          </h2>
          <p className="story-body mt-4 max-w-lg mx-auto text-sm sm:text-base">
            No pitch decks. No inflated promises. Just a clear look at where you are and where you could be.
          </p>
          <Button href={WHATSAPP_URL} variant="whatsapp" className="mt-8">
            <MessageCircle size={20} />
            Message us on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
