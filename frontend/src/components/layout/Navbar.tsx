import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'

const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/biblioteca', label: 'Biblioteca', end: false },
  { to: '/quiz', label: 'Tu Guía Personalizada', end: false },
]

/**
 * Navbar — estilo Flyward
 *
 * Siempre transparente. El color del texto se adapta segun la seccion
 * que ocupa el top del viewport:
 *   - Secciones claras (beige, crema): texto dark
 *   - Secciones oscuras (bg-dark, fotos con overlay): texto surface (blanco)
 *
 * Mecanismo: IntersectionObserver sobre elementos con data-nav-theme="light|dark".
 * Cuando ninguno esta visible (entre secciones), conserva el ultimo tema.
 *
 * Links: MAYUSCULA, tracking amplio, 13px — igual que Flyward.
 * Logo: serif, tracking, un solo color — sin SVG decorativo.
 * CTA: rounded-full (pildora), misma tipografia que los links.
 */
export function Navbar() {
  // 'dark' = texto claro (sobre fotos/secciones oscuras)
  // 'light' = texto oscuro (sobre fondo beige/crema)
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light')
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    // Observar todos los elementos con data-nav-theme en la pagina
    const targets = document.querySelectorAll<HTMLElement>('[data-nav-theme]')
    if (targets.length === 0) return

    // Guardamos el ultimo tema visible para no "parpadear" entre secciones
    let lastTheme: 'light' | 'dark' = 'light'

    const observer = new IntersectionObserver(
      (entries) => {
        // De los elementos que estan intersectando, tomar el que esta mas arriba
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          const theme = (visible[0]!.target as HTMLElement).dataset.navTheme as
            | 'light'
            | 'dark'
          lastTheme = theme
          setNavTheme(theme)
        } else {
          // Ninguna seccion visible en el umbral: conservar el ultimo
          setNavTheme(lastTheme)
        }
      },
      {
        // El umbral es el top del viewport (0px a 80px desde arriba)
        // Cuando una seccion entra o sale por esa franja, actualiza el tema
        rootMargin: '-0px 0px -85% 0px',
        threshold: 0,
      }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const isLight = navTheme === 'light'

  // Clases de color para texto segun tema
  const textColor = isLight ? 'text-dark/80' : 'text-surface/90'
  const textColorActive = isLight ? 'text-dark' : 'text-surface'
  const textColorHover = isLight ? 'hover:text-dark' : 'hover:text-surface'

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[200] transition-colors duration-300"
    >
      {/*
       * Gradiente sutil en el top: ayuda a leer el texto sobre fotos brillantes
       * sin introducir una barra de fondo visible. Se invierte segun el tema.
       */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          isLight
            ? 'bg-gradient-to-b from-background/30 to-transparent opacity-100'
            : 'bg-gradient-to-b from-dark/30 to-transparent opacity-100'
        )}
      />

      <nav
        aria-label="Navegacion principal"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
      >
        {/* Links izquierda — desktop */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={closeMobile}
                className={({ isActive }) =>
                  cn(
                    'text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-200',
                    isActive
                      ? textColorActive
                      : cn(textColor, textColorHover)
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logo centro — solo tipografia, sin icono elaborado */}
        <Link
          to="/"
          aria-label="Munay Map — Inicio"
          onClick={closeMobile}
          className={cn(
            'absolute left-1/2 -translate-x-1/2 rounded-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            isLight ? 'focus-visible:ring-dark' : 'focus-visible:ring-surface'
          )}
        >
          <span
            className={cn(
              'font-serif text-base font-semibold uppercase tracking-[0.12em] transition-colors duration-200',
              textColorActive
            )}
          >
            Munay Map
          </span>
        </Link>

        {/* Derecha — selector idioma + CTA */}
        <div className="flex items-center gap-3">
          {/* LanguageSwitcher con tema adaptativo */}
          <div className={cn('transition-colors duration-200', textColor)}>
            <LanguageSwitcher />
          </div>
          <Button
            size="sm"
            className={cn(
              'hidden sm:inline-flex rounded-full px-5',
              'text-[12px] font-medium uppercase tracking-[0.08em]',
              isLight
                ? 'bg-dark text-surface hover:bg-dark/80'
                : 'bg-surface text-dark hover:bg-surface/90'
            )}
            onClick={() => (window.location.href = '/camara')}
          >
            Probar la camara
          </Button>
          {/* Hamburger — mobile */}
          <button
            aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              'rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 md:hidden',
              isLight
                ? 'text-dark hover:bg-dark/10 focus-visible:ring-dark'
                : 'text-surface hover:bg-surface/10 focus-visible:ring-surface'
            )}
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

      {/* Menu mobile — fondo beige consistente con el resto de la UI */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Menu mobile"
          className="border-t border-dark/10 bg-background/98 px-6 pb-5 pt-3 backdrop-blur-sm md:hidden"
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
                      'block rounded-lg px-3 py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-colors',
                      isActive
                        ? 'text-dark'
                        : 'text-dark/60 hover:text-dark'
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
                className="mt-2 w-full rounded-full text-[12px] uppercase tracking-[0.08em]"
                onClick={() => {
                  closeMobile()
                  window.location.href = '/camara'
                }}
              >
                Probar la camara
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}