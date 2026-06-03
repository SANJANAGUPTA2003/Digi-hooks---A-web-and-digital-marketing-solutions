import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'
import { WhatsAppFloat } from './WhatsAppFloat'

export function Layout() {
  return (
    <div className="min-h-screen bg-bg text-white antialiased">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
