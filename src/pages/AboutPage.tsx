import { Founder } from '../components/Founder'
import { PageHero } from '../components/PageHero'
import { Reviews } from '../components/Reviews'
import { WhoWeAre } from '../components/WhoWeAre'
import { WhyChoose } from '../components/WhyChoose'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="About Digi Hooks"
        description="Who we are, why businesses choose us, and the story behind our growth first approach."
      />
      <WhoWeAre />
      <WhyChoose />
      <Reviews />
      <Founder />
    </>
  )
}
