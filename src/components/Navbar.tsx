import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../lib/constants'
import { Button } from './ui/Button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    return (
      'rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/5 hover:text-white ' +
      (isActive ? 'text-white bg-white/5' : 'text-white/70')
    )
  }

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return (
      'block rounded-xl px-4 py-3 text-lg font-semibold transition-all duration-300 ' +
      (isActive
        ? 'text-white bg-white/10 border-l-4 border-[#F57C00]'
        : 'text-white/80 hover:bg-white/5 hover:text-white')
    )
  }

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' +
          (scrolled || open
            ? 'bg-[#0B1023] border-b border-white/10 py-3'
            : 'bg-transparent py-5')
        }
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo.png"
              alt="Digi Hooks"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10 transition group-hover:ring-[#F57C00]/40 sm:h-11 sm:w-11"
            />

            <span className="hidden font-display text-lg font-bold tracking-tight sm:block">
              <span className="text-[#34208E]">DIGI</span>
              <span className="text-[#F57C00]"> HOOKS</span>
            </span>
          </NavLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button to="/contact" variant="primary">
              Free Strategy Call
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-[1001] rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[999] bg-[#0B1023] lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24">
              <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
                <img
                  src="/logo.png"
                  alt="Digi Hooks"
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-display text-xl font-bold">
                    <span className="text-[#34208E]">DIGI</span>
                    <span className="text-[#F57C00]"> HOOKS</span>
                  </h2>

                  <p className="text-sm text-white/60">
                    Digital Growth Engine
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      end={link.href === '/'}
                      onClick={() => setOpen(false)}
                      className={mobileLinkClass}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  to="/contact"
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Free Strategy Call
                </Button>

                <a
                  href="https://wa.me/917015218840"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex h-12 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 font-medium text-green-400 transition hover:bg-green-500/20"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}