import { PageHero } from '../components/PageHero'
import { Process } from '../components/Process'
import { ProcessJourney } from '../components/ProcessJourney'
import { Challenges } from '../components/Challenges'

export function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Our Process"
        description="A proven framework from discovery to sustained growth, plus the business challenges we help you overcome."
      />
      <ProcessJourney />
      <Process />
      <Challenges />
    </>
  )
}
