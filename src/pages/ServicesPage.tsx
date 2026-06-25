import { PageHero } from '../components/PageHero'
import { ServiceScrollExperience } from '../components/ServiceScrollExperience'

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we offer"
        title="Our Services"
        description="Each capability is built for growth. Not as a line item on an invoice."
      />
      <ServiceScrollExperience />
    </>
  )
}
