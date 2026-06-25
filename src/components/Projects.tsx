import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../lib/constants'
import { SectionHeader } from './ui/SectionHeader'
import { DottedSectionBg } from './DottedSectionBg'

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card')
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
  }, [])

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-canvas">
      <DottedSectionBg />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Selected work"
          title="Real projects. Real outcomes."
          description="No fabricated case studies. These are businesses we've helped build, launch, and grow."
        />

        <div ref={gridRef} className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="project-card opacity-0 surface-card flex flex-col p-6 sm:p-8 transition-opacity duration-300 hover:opacity-90"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="story-label">{project.category}</p>
                  <h3 className="mt-2 font-medium text-xl text-ink">{project.name}</h3>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink">
                  <span className="text-xs font-medium">{project.name.charAt(0)}</span>
                </div>
              </div>
              <p className="story-body flex-1 text-sm leading-relaxed">{project.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full bg-surface px-3 py-1 text-xs text-secondary"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="story-body mt-10 text-center text-sm">
          More projects in progress.{' '}
          <Link to="/contact" className="font-medium text-ink hover:text-secondary transition-colors inline-flex items-center gap-1">
            Discuss yours
            <ArrowUpRight size={14} />
          </Link>
        </p>
      </div>
    </section>
  )
}
