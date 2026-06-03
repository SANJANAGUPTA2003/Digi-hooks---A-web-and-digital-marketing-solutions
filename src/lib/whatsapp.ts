import { PHONE_RAW } from './constants'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(message)}`
}
