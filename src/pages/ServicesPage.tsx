import { PageHero } from '../components/PageHero'
import { Services } from '../components/Services'

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="What we offer" title="Our Services" />
      <Services showLearnMore />
    </>
  )
}
