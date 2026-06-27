import { Link } from 'react-router-dom'
import { useT } from '@/context/LanguageContext'

const FOOTER_LINKS = [
  { labelKey: 'footer.link.home', to: '/' },
  { labelKey: 'footer.link.library', to: '/biblioteca' },
  { labelKey: 'footer.link.quiz', to: '/quiz' },
  { labelKey: 'footer.link.about', to: '/sobre-nosotros' },
  { labelKey: 'footer.link.camera', to: '/camara' },
] as const

const TECH_ITEMS = ['Vision AI', 'Gemini', 'Text-to-Speech', 'Cloud Run']

export function Footer() {
  const t = useT()
  return (
    <footer role="contentinfo" className="bg-dark text-surface/80">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="mb-3 flex items-center gap-2">
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
              <span className="font-serif text-lg font-semibold text-surface">
                Munay <span className="text-primary">Map</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-surface/60">
              {t('footer.tagline')}
            </p>
            <p className="mt-3 text-xs text-surface/40">
              {/* [PENDIENTE] Completar información legal y de contacto */}
              {t('footer.legal')}
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label={t('footer.aria.nav')}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-surface/40">
              {t('footer.navHeading')}
            </h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-surface/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tecnología */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-surface/40">
              {t('footer.poweredBy')}
            </h3>
            <ul className="space-y-2" role="list">
              {TECH_ITEMS.map((tech) => (
                <li key={tech} className="flex items-center gap-2 text-sm text-surface/70">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-surface/10 pt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-surface/40">
            © {new Date().getFullYear()} Munay Map · {/* [PENDIENTE] Nombre legal definitivo */}
            {t('footer.copyright')}
          </p>
          <p className="text-xs text-surface/30">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  )
}
