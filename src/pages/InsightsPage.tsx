import { PageHero } from '../components/PageHero'
import { Reviews } from '../components/Reviews'
import { Insights } from '../components/Insights'
import { SectionHeader } from '../components/ui/SectionHeader'
import { DottedSectionBg } from '../components/DottedSectionBg'

export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Client stories & growth thinking"
        description="Real feedback from businesses we've helped, plus practical articles on websites, SEO, and digital marketing."
      />
      <section className="relative overflow-hidden bg-canvas pb-8 sm:pb-12">
        <DottedSectionBg />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="What our clients say"
            description="Honest results from real partnerships — no inflated metrics."
            align="center"
          />
        </div>
        <Reviews expanded />
      </section>
      <Insights />
    </>
  )
}
