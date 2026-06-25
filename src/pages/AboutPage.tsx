import { PageHero } from '../components/PageHero'
import { Philosophy } from '../components/Philosophy'
import { Reviews } from '../components/Reviews'
import { WhoWeAre } from '../components/WhoWeAre'
import { WhyChoose } from '../components/WhyChoose'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="About DigiHooks"
        description="A philosophy-driven growth studio built on clarity, craft, and measurable outcomes."
      />
      <WhoWeAre />
      <Philosophy />
      <WhyChoose />
      <Reviews />
    </>
  )
}
