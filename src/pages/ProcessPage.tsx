import { Challenges } from '../components/Challenges'
import { PageHero } from '../components/PageHero'
import { Process } from '../components/Process'

export function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Our Process"
        description="A proven framework from discovery to sustained growth, plus the business challenges we help you overcome."
      />
      <Process />
      <Challenges />
    </>
  )
}
