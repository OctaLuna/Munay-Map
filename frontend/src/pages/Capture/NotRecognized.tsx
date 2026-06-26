import { Link, useNavigate } from 'react-router-dom'
import { useSites } from '@/hooks/useSites'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardImage } from '@/components/ui/Card'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

/**
 * NotRecognized — fallback cuando la IA no identifica el sitio.
 * Muestra sugerencias de la Biblioteca filtradas por "destacado".
 */
export default function NotRecognized() {
  const navigate = useNavigate()
  const { data: suggestions } = useSites({})

  const highlighted = suggestions?.filter((s) => s.destacado).slice(0, 4) ?? []

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        {/* Estado vacío */}
        <RevealOnScroll className="mb-12 text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral/10"
          >
            <svg className="h-10 w-10 text-neutral" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="16" cy="16" r="12" />
              <path d="M12 12l8 8M20 12l-8 8" />
            </svg>
          </div>

          <h1 className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-4">
            No reconocimos este sitio
          </h1>
          <p className="mx-auto max-w-md font-sans text-neutral leading-relaxed [text-wrap:pretty]">
            La imagen no coincidió con ningún sitio de nuestra base de datos. 
            Probá con mejor iluminación, encuadrando mejor el objeto principal, 
            o explorá la Biblioteca para encontrarlo manualmente.
          </p>
        </RevealOnScroll>

        {/* Acciones */}
        <RevealOnScroll delay={0.1} className="mb-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => navigate('/camara/view')} variant="primary" size="md">
            Intentar nuevamente
          </Button>
          <Link to="/biblioteca">
            <Button variant="secondary" size="md">Explorar la Biblioteca</Button>
          </Link>
        </RevealOnScroll>

        {/* Sugerencias */}
        {highlighted.length > 0 && (
          <section aria-labelledby="suggestions-heading">
            <RevealOnScroll>
              <h2
                id="suggestions-heading"
                className="mb-6 font-serif text-xl font-semibold text-dark"
              >
                Quizás estás buscando uno de estos
              </h2>
            </RevealOnScroll>
            <div className="grid gap-4 sm:grid-cols-2">
              {highlighted.map((site, i) => (
                <RevealOnScroll key={site.id} delay={i * 0.08}>
                  <Link
                    to={`/biblioteca/${site.id}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  >
                    <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <CardImage
                        src={site.imagenUrl}
                        alt={`Imagen de ${site.nombre}`}
                        aspectRatio="16/9"
                        className="group-hover:scale-105"
                      />
                      <CardBody>
                        <p className="text-xs font-medium text-neutral font-sans mb-1">{site.departamento}</p>
                        <h3 className="font-serif text-base font-semibold text-dark">{site.nombre}</h3>
                      </CardBody>
                    </Card>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
