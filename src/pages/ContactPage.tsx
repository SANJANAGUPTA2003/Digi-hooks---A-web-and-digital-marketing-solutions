import { LeadCapture } from '../components/LeadCapture'
import { PageHero } from '../components/PageHero'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's talk"
        title="Contact Us"
        description="Book a free strategy call. Tell us about your business and we'll connect with you on WhatsApp."
      />
      <LeadCapture />
    </>
  )
}
