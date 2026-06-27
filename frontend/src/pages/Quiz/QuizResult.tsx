import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { QuizRecommendation } from '@/types'
import { Card, CardBody, CardImage } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SplitHeading } from '@/components/motion/SplitHeading'

interface LocationState {
  recommendation: QuizRecommendation | null
}

export default function QuizResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null

  if (!state?.recommendation) {
    navigate('/quiz', { replace: true })
    return null
  }

  const { recommendation } = state
  const { lugares, gastronomia, experiencias, perfilViajero, tips } = recommendation

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      {/* Header de resultado */}
      <section
        aria-labelledby="quiz-result-heading"
        className="bg-primary px-4 py-16 md:px-8 text-center"
      >
        <RevealOnScroll>
          <p className="mb-2 font-sans text-sm font-medium uppercase tracking-wider text-surface/60">
            Tu perfil de viajero
          </p>
          <SplitHeading
            as="h1"
            id="quiz-result-heading"
            className="font-serif text-display-lg font-bold text-surface [text-wrap:balance] mb-4"
          >
            {perfilViajero}
          </SplitHeading>
          <p className="mx-auto max-w-lg font-sans text-surface/80">
            Basándome en tus respuestas, estas son las experiencias de Bolivia que van con vos.
          </p>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 space-y-16">
        {/* Sección 1 — Lugares para ti */}
        {lugares.length > 0 && (
          <section aria-labelledby="lugares-heading">
            <RevealOnScroll>
              <h2
                id="lugares-heading"
                className="font-serif text-display-md font-bold text-dark mb-2 [text-wrap:balance]"
              >
                Lugares para vos
              </h2>
              <p className="mb-8 font-sans text-neutral">
                Sitios turísticos que coinciden con tu estilo de viaje
              </p>
            </RevealOnScroll>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lugares.map((site, i) => (
                <RevealOnScroll key={site.id} delay={i * 0.08}>
                  <Link
                    to={`/biblioteca/${site.id}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  >
                    <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <CardImage
                        src={site.imagenUrl}
                        alt={`Imagen de ${site.nombre}`}
                        aspectRatio="3/2"
                        className="group-hover:scale-105"
                      />
                      <CardBody>
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          <Badge variant="neutral">{site.departamento}</Badge>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-dark mb-1">
                          {site.nombre}
                        </h3>
                        <p className="text-sm text-neutral font-sans line-clamp-2">
                          {site.descripcionCorta}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {/* Sección 2 — Qué tenés que probar */}
        {gastronomia.length > 0 && (
          <section aria-labelledby="gastronomia-heading">
            <RevealOnScroll>
              <h2
                id="gastronomia-heading"
                className="font-serif text-display-md font-bold text-dark mb-2 [text-wrap:balance]"
              >
                Qué tenés que probar
              </h2>
              <p className="mb-8 font-sans text-neutral">
                La gastronomía boliviana que vas a adorar
              </p>
            </RevealOnScroll>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gastronomia.map((site, i) => (
                <RevealOnScroll key={site.id} delay={i * 0.08}>
                  <Link
                    to={`/biblioteca/${site.id}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
                  >
                    <Card variant="elevated" className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <CardImage
                        src={site.imagenUrl}
                        alt={`Imagen de ${site.nombre}`}
                        aspectRatio="3/2"
                        className="group-hover:scale-105"
                      />
                      <CardBody>
                        <Badge variant="gold" className="mb-2">Gastronomía</Badge>
                        <h3 className="font-serif text-lg font-semibold text-dark mb-1">
                          {site.nombre}
                        </h3>
                        <p className="text-sm text-neutral font-sans line-clamp-2">
                          {site.descripcionCorta}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {/* Sección 3 — Qué tenés que vivir */}
        {experiencias.length > 0 && (
          <section aria-labelledby="experiencias-heading">
            <RevealOnScroll>
              <h2
                id="experiencias-heading"
                className="font-serif text-display-md font-bold text-dark mb-2 [text-wrap:balance]"
              >
                Qué tenés que vivir
              </h2>
              <p className="mb-8 font-sans text-neutral">
                Danzas, festivales y tradiciones que van con tu espíritu
              </p>
            </RevealOnScroll>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {experiencias.map((site, i) => (
                <RevealOnScroll key={site.id} delay={i * 0.08}>
                  <Link
                    to={`/biblioteca/${site.id}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                  >
                    <Card variant="dark" className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <CardImage
                        src={site.imagenUrl}
                        alt={`Imagen de ${site.nombre}`}
                        aspectRatio="3/2"
                        className="group-hover:scale-105 opacity-80"
                      />
                      <CardBody>
                        <Badge variant="surface" className="mb-2">
                          {site.categoria === 'danza' ? 'Danza' : 'Festividad'}
                        </Badge>
                        <h3 className="font-serif text-lg font-semibold text-surface mb-1">
                          {site.nombre}
                        </h3>
                        <p className="text-sm text-surface/70 font-sans line-clamp-2">
                          {site.descripcionCorta}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {/* Sección 4 — Tips y consejos personalizados */}
        {tips && tips.length > 0 && (
          <section aria-labelledby="tips-heading">
            <RevealOnScroll>
              <h2
                id="tips-heading"
                className="font-serif text-display-md font-bold text-dark mb-2 [text-wrap:balance]"
              >
                Consejos para tu viaje
              </h2>
              <p className="mb-8 font-sans text-neutral">
                Tips prácticos seleccionados especialmente para tu perfil
              </p>
            </RevealOnScroll>
            <div className="grid gap-4 sm:grid-cols-2">
              {tips.map((tip, i) => (
                <RevealOnScroll key={tip.titulo} delay={i * 0.07}>
                  <article className="rounded-2xl border border-gold/25 bg-surface p-6 shadow-sm">
                    {/* Ícono decorativo */}
                    <div
                      aria-hidden="true"
                      className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold/15"
                    >
                      <svg
                        className="h-4 w-4 text-gold"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 font-serif text-base font-semibold text-dark">
                      {tip.titulo}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-neutral">
                      {tip.descripcion}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {/* CTAs finales */}
        <RevealOnScroll className="border-t border-neutral/15 pt-12 text-center">
          <p className="mb-6 font-sans text-neutral">
            ¿Querés explorar más opciones o repetir el quiz?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/biblioteca">
              <Button variant="primary" size="lg">Explorar la Biblioteca completa</Button>
            </Link>
            <Button variant="secondary" size="lg" onClick={() => navigate('/quiz')}>
              Repetir el quiz
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </main>
  )
}
