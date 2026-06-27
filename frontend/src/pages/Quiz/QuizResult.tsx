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
  const {
    lugares,
    gastronomia,
    experiencias,
    perfilViajero,
    tips,
    resumenPerfil,
    intereses,
    duracionSugeridaDias,
    mejorEpoca,
    presupuesto,
    itinerario,
  } = recommendation

  const hasItinerario = Array.isArray(itinerario) && itinerario.length > 0

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      {/* Header de resultado */}
      <section
        aria-labelledby="quiz-result-heading"
        className="bg-primary px-4 py-16 md:px-8 text-center"
      >
        <RevealOnScroll>
          <p className="mb-2 font-sans text-sm font-medium uppercase tracking-wider text-surface/60">
            Tu guía personalizada
          </p>
          <SplitHeading
            as="h1"
            id="quiz-result-heading"
            className="font-serif text-display-lg font-bold text-surface [text-wrap:balance] mb-4"
          >
            {perfilViajero}
          </SplitHeading>
          <p className="mx-auto max-w-xl font-sans text-surface/80">
            {resumenPerfil ??
              'Basándome en tus respuestas, esta es la Bolivia hecha a tu medida.'}
          </p>

          {/* Chips de intereses */}
          {intereses && intereses.length > 0 && (
            <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Tus intereses">
              {intereses.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-surface/30 bg-surface/10 px-3 py-1 font-sans text-xs uppercase tracking-[0.08em] text-surface/90"
                >
                  {tag.replace(/_/g, ' ')}
                </li>
              ))}
            </ul>
          )}

          {/* Acción: imprimir / guardar guía */}
          <div className="mt-8">
            <Button
              variant="secondary"
              size="md"
              onClick={() => window.print()}
              className="border-surface/40 bg-surface/10 text-surface hover:bg-surface/20 rounded-full uppercase tracking-[0.06em] text-xs"
            >
              Imprimir / guardar mi guía
            </Button>
          </div>
        </RevealOnScroll>
      </section>

      {/* Resumen del viaje — duración, época, presupuesto */}
      {(duracionSugeridaDias || mejorEpoca || presupuesto) && (
        <section
          aria-label="Resumen del viaje"
          className="border-b border-neutral/15 bg-surface px-4 py-10 md:px-8"
        >
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {duracionSugeridaDias ? (
              <RevealOnScroll className="text-center">
                <p className="font-serif text-display-md font-bold text-primary">
                  {duracionSugeridaDias}
                  <span className="ml-1 text-lg font-semibold">
                    {duracionSugeridaDias === 1 ? 'día' : 'días'}
                  </span>
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-neutral">
                  Duración sugerida
                </p>
              </RevealOnScroll>
            ) : null}

            {mejorEpoca ? (
              <RevealOnScroll delay={0.08} className="text-center">
                <p className="font-serif text-lg font-semibold text-dark [text-wrap:balance]">
                  {mejorEpoca.split('·')[0]}
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-neutral">
                  Mejor época
                </p>
                {mejorEpoca.includes('·') && (
                  <p className="mt-2 font-sans text-xs leading-relaxed text-neutral/80">
                    {mejorEpoca.split('·').slice(1).join('·').trim()}
                  </p>
                )}
              </RevealOnScroll>
            ) : null}

            {presupuesto ? (
              <RevealOnScroll delay={0.16} className="text-center">
                <p className="font-serif text-lg font-semibold text-dark">
                  {presupuesto.nivel}
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-neutral">
                  {presupuesto.rangoDiarioUsd}
                </p>
                <p className="mt-2 font-sans text-xs leading-relaxed text-neutral/80">
                  {presupuesto.descripcion}
                </p>
              </RevealOnScroll>
            ) : null}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 space-y-16">
        {/* Itinerario día por día — centro de la guía */}
        {hasItinerario && (
          <section aria-labelledby="itinerario-heading">
            <RevealOnScroll>
              <h2
                id="itinerario-heading"
                className="font-serif text-display-md font-bold text-dark mb-2 [text-wrap:balance]"
              >
                Tu itinerario optimizado
              </h2>
              <p className="mb-10 font-sans text-neutral">
                Un recorrido día por día pensado para tu perfil, ordenado para minimizar
                traslados entre regiones.
              </p>
            </RevealOnScroll>

            <ol className="relative space-y-8 border-l-2 border-gold/30 pl-6 md:pl-10">
              {itinerario.map((dia, i) => (
                <RevealOnScroll as="li" key={`${dia.dia}-${dia.siteId}`} delay={i * 0.05}>
                  {/* Marcador de día sobre la línea */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.05rem] flex h-8 w-8 items-center justify-center rounded-full bg-gold font-serif text-xs font-bold text-dark shadow md:-left-[1.3rem]"
                  >
                    {dia.dia}
                  </span>

                  <article className="overflow-hidden rounded-2xl border border-neutral/12 bg-surface shadow-[0_2px_16px_rgba(34,28,24,0.06)]">
                    <div className="md:flex">
                      {/* Imagen */}
                      <Link
                        to={`/biblioteca/${dia.siteId}`}
                        className="group block md:w-2/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Ver ${dia.nombreSitio} en la biblioteca`}
                      >
                        <div
                          className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 md:h-full"
                          style={{ backgroundImage: `url(${dia.imagenUrl})` }}
                        />
                      </Link>

                      {/* Contenido */}
                      <div className="flex-1 p-6 md:p-7">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="gold">Día {dia.dia}</Badge>
                          <Badge variant="neutral">{dia.region}</Badge>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-dark">{dia.titulo}</h3>
                        <Link
                          to={`/biblioteca/${dia.siteId}`}
                          className="font-sans text-sm font-medium text-primary hover:underline"
                        >
                          {dia.nombreSitio}
                        </Link>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-neutral">
                          {dia.descripcion}
                        </p>

                        {/* Sub-filas: comida / experiencia / consejo */}
                        <dl className="mt-4 space-y-2.5">
                          {dia.comida && (
                            <ItineraryRow
                              label="Para comer"
                              icon={
                                <path d="M6 2v6a2 2 0 002 2h0V2M6 6h4M16 2c-1.5 0-3 1.5-3 4s1.5 4 3 4v6M9 14v4" />
                              }
                              text={dia.comida}
                            />
                          )}
                          {dia.experiencia && (
                            <ItineraryRow
                              label="Para vivir"
                              icon={<path d="M10 2l2.4 5 5.6.5-4.2 3.7 1.3 5.6L10 19l-5.1 2.8 1.3-5.6L2 12.5l5.6-.5L10 2z" />}
                              text={dia.experiencia}
                            />
                          )}
                          {dia.consejo && (
                            <ItineraryRow
                              label="Consejo"
                              icon={<path d="M10 2a6 6 0 00-3 11v2a1 1 0 001 1h4a1 1 0 001-1v-2a6 6 0 00-3-11zM8 19h4" />}
                              text={dia.consejo}
                            />
                          )}
                        </dl>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </ol>
          </section>
        )}

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

/** Fila de detalle dentro de una tarjeta de día del itinerario. */
function ItineraryRow({
  label,
  icon,
  text,
}: {
  label: string
  icon: React.ReactNode
  text: string
}) {
  return (
    <div className="flex gap-3">
      <dt className="flex-shrink-0">
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10"
        >
          <svg
            className="h-3.5 w-3.5 text-primary"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon}
          </svg>
        </span>
      </dt>
      <dd className="font-sans text-sm leading-relaxed text-neutral">
        <span className="font-semibold text-dark">{label}: </span>
        {text}
      </dd>
    </div>
  )
}
