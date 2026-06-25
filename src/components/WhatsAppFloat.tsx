import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/constants'

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-canvas transition hover:bg-ink/88 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <MessageCircle size={28} />
    </a>
  )
}
