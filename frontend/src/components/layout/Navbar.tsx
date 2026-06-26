import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'

const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/biblioteca', label: 'Biblioteca', end: false },
  { to: '/quiz', label: 'Quiz', end: false },
]

/**
 * Navbar — layout global
 * Mobile-first: hamburger en pantallas < md
 * Sticky con fondo semitransparente al hacer scroll
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú mobile al cambiar ruta
  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      role="banner"
      className={cn(
        'fixed inset-x-0 top-0 z-[200] transition-all duration-300',
        scrolled
          ? 'bg-surface/95 shadow-[0_1px_8px_rgba(34,28,24,0.10)] backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
      >
        {/* Links izquierda — desktop */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={closeMobile}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-dark hover:bg-neutral/10 hover:text-primary'
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logo centro */}
        <Link
          to="/"
          aria-label="Guía Turística Bolivia IA — Inicio"
          className="absolute left-1/2 -translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="flex items-center gap-2">
            {/* Logo SVG — silueta mínima de Bolivia como marca */}
            <svg
              aria-hidden="true"
              className="h-8 w-8"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19" fill="#3B5D43" />
              <path
                d="M14 12 C18 10 25 11 28 15 C31 19 30 25 26 28 C22 31 16 30 13 27 C10 24 10 17 14 12 Z"
                fill="#F4E8D3"
                opacity="0.9"
              />
              <circle cx="20" cy="20" r="3" fill="#D4A24C" />
            </svg>
            <span className="hidden font-serif text-lg font-semibold text-dark sm:block">
              Bolivia<span className="text-primary">IA</span>
            </span>
          </div>
        </Link>

        {/* Derecha — selector idioma + CTA */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => (window.location.href = '/camara')}
          >
            Probar la cámara
          </Button>
          {/* Hamburger — mobile */}
          <button
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-dark hover:bg-neutral/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú mobile */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Menú mobile"
          className="border-t border-neutral/15 bg-surface/98 px-4 pb-4 pt-2 md:hidden"
        >
          <ul role="list" className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-dark hover:bg-neutral/10'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Button
                size="sm"
                className="mt-2 w-full"
                onClick={() => {
                  closeMobile()
                  window.location.href = '/camara'
                }}
              >
                Probar la cámara
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
