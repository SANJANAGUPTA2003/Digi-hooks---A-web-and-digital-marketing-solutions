import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-line text-ink transition-colors duration-[250ms] hover:bg-surface ${className}`}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
      {showLabel && (
        <span className="text-sm font-medium">{isDark ? 'Light mode' : 'Dark mode'}</span>
      )}
    </button>
  )
}
