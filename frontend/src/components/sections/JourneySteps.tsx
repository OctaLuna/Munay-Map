import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'

const STEPS = [
  {
    numero: '01',
    titulo: 'Tomas una foto',
    descripcion:
      'Apunta tu camara a cualquier sitio cultural, monumento, plato tipico o elemento de una festividad boliviana.',
    icono: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="4" y="8" width="24" height="18" rx="3" />
        <circle cx="16" cy="17" r="5" />
        <path d="M11 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    numero: '02',
    titulo: 'Identificamos el lugar',
    descripcion:
      'Nuestra IA analiza la imagen en segundos y la compara con nuestra base de datos cultural boliviana.',
    icono: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20l6 6" />
        <path d="M11 14h6M14 11v6" />
      </svg>
    ),
  },
  {
    numero: '03',
    titulo: 'Te explicamos su historia',
    descripcion:
      'Recibis una explicacion detallada generada por IA: origen, significado cultural, datos curiosos y recomendaciones.',
    icono: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 4h14l6 6v18H6V4z" />
        <path d="M20 4v6h6" />
        <path d="M10 14h12M10 18h8M10 22h10" />
      </svg>
    ),
  },
  {
    numero: '04',
    titulo: 'Lo escuchas en tu idioma',
    descripcion:
      'La explicacion se traduce y narra en tu idioma preferido entre 40 disponibles. Tecnologia Text-to-Speech de Google Cloud.',
    icono: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 12h6l4-8v24l-4-8H4z" />
        <path d="M22 10a6 6 0 010 12" />
        <path d="M26 6a12 12 0 010 20" />
      </svg>
    ),
  },
]

/**
 * JourneySteps — patron 5 + patron 12
 * Scroll pineado con las 4 tarjetas apareciendo en cascada.
 * Fondo decorativo de lineas de mapa (patron 12).
 * Titulos en mayuscula con letter-spacing.
 */
export function JourneySteps() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinnerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const pinner = pinnerRef.current
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !pinner || cards.length === 0) return
    if (prefersReducedMotion()) {
      cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }))
      return
    }

    gsap.set(cards, { opacity: 0, y: 60 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${cards.length * 300}`,
        pin: pinner,
        onUpdate: (self) => {
          const progress = self.progress
          cards.forEach((card, i) => {
            const threshold = i / cards.length
            if (progress >= threshold) {
              gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
            }
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="steps-heading"
      className="relative"
    >
      {/* Fondo de lineas de mapa — patron 12 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background bg-map-lines opacity-60"
      />

      <div ref={pinnerRef} className="relative z-10 py-28 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <SplitHeading
              as="h2"
              id="steps-heading"
              className="font-serif text-display-lg font-bold uppercase tracking-[0.04em] text-dark [text-wrap:balance] mb-4"
            >
              Como funciona
            </SplitHeading>
            <p className="mx-auto max-w-xl text-neutral font-sans">
              Cuatro pasos para convertir cualquier rincon de Bolivia en una experiencia de aprendizaje.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.numero}
                ref={(el) => { cardsRef.current[i] = el }}
                className="relative rounded-2xl bg-surface p-8 shadow-[0_2px_16px_rgba(34,28,24,0.08)]"
              >
                {/* Numero decorativo */}
                <div
                  aria-hidden="true"
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-serif font-bold text-sm"
                >
                  {step.numero}
                </div>

                {/* Icono */}
                <div className="mb-5 text-primary">{step.icono}</div>

                <h3 className="mb-3 font-serif text-lg font-semibold text-dark">
                  {step.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-neutral font-sans">
                  {step.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}