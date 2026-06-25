import { HeroConversion } from '../components/immersive/HeroConversion'
import { ClientJourneyStory } from '../components/immersive/ClientJourneyStory'
import { ProblemStory } from '../components/immersive/ProblemStory'
import { PhilosophyStory } from '../components/immersive/PhilosophyStory'
import { ServiceScrollExperience } from '../components/ServiceScrollExperience'
import { HookEngageGrowStory } from '../components/immersive/HookEngageGrowStory'
import { Reviews } from '../components/Reviews'
import { Insights } from '../components/Insights'
import { HomeContact } from '../components/HomeContact'

export function HomePage() {
  return (
    <>
      <HeroConversion />
      <ClientJourneyStory />
      <ProblemStory />
      <PhilosophyStory />
      <ServiceScrollExperience />
      <HookEngageGrowStory />
      <Reviews />
      <Insights />
      <HomeContact />
    </>
  )
}
