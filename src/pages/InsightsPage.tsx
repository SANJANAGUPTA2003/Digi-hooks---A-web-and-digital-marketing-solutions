import { PageHero } from '../components/PageHero'
import { Insights } from '../components/Insights'

export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog & tips"
        title="Insights"
        description="Practical articles on websites, SEO, and digital marketing written for business owners."
      />
      <Insights />
    </>
  )
}
