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



  const linkClass = ({ isActive }: { isActive: boolean }) =>

    `rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/5 hover:text-white ${

      isActive ? 'text-white bg-white/5' : 'text-white/70'

    }`



  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>

    `block rounded-xl px-4 py-3 font-medium hover:bg-white/5 ${

      isActive ? 'text-white bg-white/5' : 'text-white/80'

    }`



  return (

    <header

      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${

        scrolled ? 'glass border-b border-white/10 py-3' : 'bg-transparent py-5'

      }`}

    >

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <NavLink to="/" className="group flex items-center gap-3">

          <img

            src="/logo.png"

            alt="Digi Hooks"

            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10 transition group-hover:ring-orange/40 sm:h-11 sm:w-11"

          />

          <span className="hidden font-display text-lg font-bold tracking-tight sm:block">

            <span className="text-purple">DIGI</span>

            <span className="text-orange"> HOOKS</span>

          </span>

        </NavLink>



        <ul className="hidden items-center gap-1 lg:flex">

          {NAV_LINKS.map((link) => (

            <li key={link.href}>

              <NavLink to={link.href} end={link.href === '/'} className={linkClass}>

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

          className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"

          onClick={() => setOpen(!open)}

        >

          {open ? <X size={24} /> : <Menu size={24} />}

        </button>

      </nav>



      <AnimatePresence>

        {open && (

          <motion.div

            initial={{ opacity: 0, height: 0 }}

            animate={{ opacity: 1, height: 'auto' }}

            exit={{ opacity: 0, height: 0 }}

            className="glass-strong border-t border-white/10 lg:hidden"

          >

            <ul className="flex flex-col gap-1 px-4 py-4">

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

              <li className="pt-2">

                <Button to="/contact" variant="primary" className="w-full">

                  Free Strategy Call

                </Button>

              </li>

            </ul>

          </motion.div>

        )}

      </AnimatePresence>

    </header>

  )

}

