import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resetNavigationScroll } from '../lib/scroll'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    resetNavigationScroll()
  }, [pathname])

  return null
}
