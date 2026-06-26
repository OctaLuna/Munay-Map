import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Biblioteca', to: '/biblioteca' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Sobre nosotros', to: '/sobre-nosotros' },
  { label: 'Probar cámara', to: '/camara' },
]

const TECH_ITEMS = ['Vision AI', 'Gemini', 'Text-to-Speech', 'Cloud Run']

export function Footer() {
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
                Bolivia<span className="text-primary">IA</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-surface/60">
              Guía turística multiidioma potenciada por inteligencia artificial.
              Explorá Bolivia como nunca antes.
            </p>
            <p className="mt-3 text-xs text-surface/40">
              {/* [PENDIENTE] Completar información legal y de contacto */}
              [PENDIENTE] Información legal · Contacto
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-surface/40">
              Navegación
            </h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-surface/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tecnología */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-surface/40">
              Potenciado por
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
            © {new Date().getFullYear()} BoliviaIA · {/* [PENDIENTE] Nombre legal definitivo */}
            Proyecto académico
          </p>
          <p className="text-xs text-surface/30">
            Hecho con cariño para los 9 departamentos de Bolivia
          </p>
        </div>
      </div>
    </footer>
  )
}
