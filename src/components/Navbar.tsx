import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../lib/constants'
import { LogoWordmark } from './LogoWordmark'
import { Button } from './ui/Button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-[250ms] ${
      isActive ? 'text-ink' : 'text-secondary hover:text-ink'
    }`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-[250ms] ${
      isActive ? 'text-ink bg-surface' : 'text-secondary hover:text-ink hover:bg-surface/60'
    }`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled || open
            ? 'border-line bg-canvas/95 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            end
            className="flex items-center justify-self-start"
            onClick={() => setOpen(false)}
          >
            <LogoWordmark className="h-7 max-w-[7.25rem] sm:max-w-[9.5rem]" />
          </NavLink>

          <ul className="hidden items-center gap-1 justify-self-center lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} end={link.href === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center justify-self-end lg:flex">
            <Button to="/contact" variant="primary" data-cursor="hover">
              Free Strategy Call
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-[1001] flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center justify-self-end rounded-lg text-ink hover:bg-surface lg:hidden"
            onClick={() => setOpen((c) => !c)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[999] bg-canvas lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24">
              <LogoWordmark className="h-7 mb-9" />
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
                <Button to="/contact" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                  Free Strategy Call
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
