import { PageHero } from '../components/PageHero'
import { ResultsStory } from '../components/immersive/ResultsStory'
import { Reviews } from '../components/Reviews'

export function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client stories"
        title="Testimonials"
        description="Real feedback from businesses we've helped grow — no inflated metrics, just honest results."
      />
      <ResultsStory />
      <Reviews expanded />
    </>
  )
}
