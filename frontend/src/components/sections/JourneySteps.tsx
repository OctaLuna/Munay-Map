import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { BOLIVIA_MASK_PATH, MASK_VIEWBOX } from '@/assets/masks/boliviaMask'

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

// Curva serpenteante que conecta los 4 pasos (escalonados 2x2).
const JOURNEY_PATH =
  'M120,90 C360,60 640,150 880,110 C980,95 1010,180 940,235 C860,300 520,250 300,300 C150,335 110,400 250,455 C420,520 760,470 980,520'

/**
 * JourneySteps — seccion "Como funciona" al estilo Flyward "How We Support".
 *
 * Cuatro pasos en grilla 2x2 escalonada (pasos 2 y 4 desplazados hacia abajo),
 * conectados por una curva dorada dibujada a mano que se traza con el scroll
 * (stroke-dashoffset + getTotalLength). Los numeros aparecen con rebote
 * (back.out) y cada tarjeta se revela al entrar al viewport. De fondo, la
 * silueta de Bolivia a muy baja opacidad funciona como textura.
 *
 * prefers-reduced-motion: todo visible, sin trazos ni rebotes.
 */
export function JourneySteps() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const steps = stepsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!section) return

    const reduced = prefersReducedMotion()

    if (reduced) {
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 })
      }
      return
    }

    const ctx = gsap.context(() => {
      // Camino dorado: se dibuja ligado al progreso del scroll.
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1.5,
          },
        })
      }

      // Cada paso: reveal + numero con rebote elastico.
      steps.forEach((step) => {
        const num = step.querySelector<HTMLElement>('.step-num')

        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 88%', toggleActions: 'play none none none' },
          }
        )

        if (num) {
          gsap.fromTo(
            num,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.8)',
              scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' },
            }
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="steps-heading"
      className="relative overflow-hidden bg-background py-28 px-4 md:px-8"
    >
      {/* Fondo: silueta de Bolivia como textura ultra sutil */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        viewBox={MASK_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={BOLIVIA_MASK_PATH} fill="#6E4A3F" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <SplitHeading
            as="h2"
            id="steps-heading"
            className="mb-4 font-serif text-display-lg font-bold uppercase tracking-[0.04em] text-dark [text-wrap:balance]"
          >
            Como funciona
          </SplitHeading>
          <p className="mx-auto max-w-xl font-sans text-neutral">
            Cuatro pasos para convertir cualquier rincon de Bolivia en una experiencia de aprendizaje.
          </p>
        </div>

        {/* Contenedor de la grilla + camino dibujado */}
        <div className="relative">
          {/* Camino dorado — solo desktop, detras de las tarjetas */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1100 600"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              id="journey-path"
              d={JOURNEY_PATH}
              fill="none"
              stroke="#D4A24C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
            {STEPS.map((step, i) => (
              <div
                key={step.numero}
                ref={(el) => {
                  stepsRef.current[i] = el
                }}
                className={[
                  'relative rounded-2xl bg-surface p-8 shadow-[0_2px_16px_rgba(34,28,24,0.08)]',
                  i % 2 === 1 ? 'md:mt-16' : '',
                ].join(' ')}
              >
                {/* Numero con rebote */}
                <div
                  className="step-num mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary font-serif text-sm font-bold text-surface"
                  style={{ willChange: 'transform' }}
                  aria-hidden="true"
                >
                  {step.numero}
                </div>

                <div className="mb-5 text-primary">{step.icono}</div>

                <h3 className="mb-3 font-serif text-lg font-semibold text-dark">{step.titulo}</h3>
                <p className="font-sans text-sm leading-relaxed text-neutral">{step.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
