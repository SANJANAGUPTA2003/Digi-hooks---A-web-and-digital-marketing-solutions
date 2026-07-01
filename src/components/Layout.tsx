import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'
import { WhatsAppFloat } from './WhatsAppFloat'
import { CustomCursor } from './immersive/CustomCursor'
import { LiveBackground } from './LiveBackground'
import { useLenisScroll } from '../hooks/useLenisScroll'

export function Layout() {
  const location = useLocation()
  useLenisScroll()

  useEffect(() => {
    ScrollTrigger.refresh()
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="relative min-h-screen bg-canvas text-ink antialiased transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <LiveBackground variant="global" />
        <div className="section-grid-bg absolute inset-0 opacity-50" aria-hidden />
      </div>
      <div className="relative z-10">
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <main key={location.pathname}>
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </div>
  )
}
