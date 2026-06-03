import { Hero } from '../components/Hero'
import { HomeContact } from '../components/HomeContact'
import { Insights } from '../components/Insights'
import { Process } from '../components/Process'
import { Services } from '../components/Services'
import { WhoWeAre } from '../components/WhoWeAre'

export function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Services />
      <Process />
      <Insights />
      <HomeContact />
    </>
  )
}
