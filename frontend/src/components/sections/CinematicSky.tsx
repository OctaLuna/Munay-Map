import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { useT } from '@/context/LanguageContext'

/**
 * CinematicSky — equivalente boliviano de la seccion "Travel Simple" de Flyward.
 *
 * Composicion por capas (de atras hacia adelante):
 *   z0  .cs-bg     fondo Carbon Andino solido (bg-dark)
 *   z1  .cs-sky    cielo de atardecer altiplanico con clip-path de cordillera
 *   z2  .cs-wing   ala de condor (dos poligonos oscuros superpuestos)
 *   z3  .cs-route  ruta de vuelo dibujada con stroke-dashoffset al hacer scroll
 *   z4  .cs-ghost  texto fantasma decorativo (baja opacidad)
 *   z5  contenido  eyebrow + titulo + parrafo
 *
 * Paleta: Dorado Inti -> Vino Tierra -> Carbon Andino (atardecer andino real).
 * Tecnicas Flyward: parallax con scrub, clip-path: polygon (siluetas),
 * stroke-dashoffset + getTotalLength (dibujo de ruta), borde de papel rasgado.
 *
 * prefers-reduced-motion: sin parallax y la ruta se muestra ya dibujada.
 */
export function CinematicSky() {
  const t = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sky = skyRef.current
    const ghost = ghostRef.current
    const route = routeRef.current
    if (!section || !route) return

    const reduced = prefersReducedMotion()

    // Ruta de vuelo: dibujo progresivo con stroke-dashoffset.
    const length = route.getTotalLength()
    if (reduced) {
      gsap.set(route, { strokeDasharray: length, strokeDashoffset: 0 })
    } else {
      gsap.set(route, { strokeDasharray: length, strokeDashoffset: length })
    }

    if (reduced) return

    const ctx = gsap.context(() => {
      // Cielo: sube mas lento que el contenido -> sensacion de profundidad.
      if (sky) {
        gsap.to(sky, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Texto fantasma: se desplaza en sentido contrario, mas marcado.
      if (ghost) {
        gsap.to(ghost, {
          xPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Ruta: se traza de principio a fin ligada al progreso del scroll.
      gsap.to(route, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 1.5,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cinematic-heading"
      className="relative h-[105vh] min-h-[620px] overflow-hidden bg-dark"
    >
      {/* z1 — Cielo de atardecer con silueta de cordillera (clip-path) */}
      <div
        ref={skyRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[78%]"
        style={{
          background:
            'linear-gradient(178deg, #E6B85C 0%, #D4A24C 18%, #C77B3A 38%, #9A3F38 58%, #7A2E32 72%, #3A2018 88%, #221C18 100%)',
          clipPath:
            'polygon(0 0, 100% 0, 100% 80%, 93% 70%, 86% 85%, 79% 63%, 71% 81%, 63% 57%, 55% 79%, 47% 60%, 39% 83%, 31% 65%, 23% 84%, 15% 69%, 7% 86%, 0 71%)',
        }}
      />

      {/* z1b — resplandor solar bajo, refuerza el foco calido */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[32%] h-[40vh] w-[40vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(245,224,150,0.55) 0%, rgba(212,162,76,0.18) 45%, transparent 70%)',
        }}
      />

      {/* z2 — Ala de condor: dos poligonos oscuros superpuestos (esquina sup. izq.) */}
      <svg
        aria-hidden="true"
        className="absolute left-0 top-0 z-[2] h-1/2 w-[55%]"
        viewBox="0 0 700 380"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 700,0 700,120 400,250 0,380" fill="#1A1209" />
        <polygon points="0,0 580,0 640,60 380,200 0,330" fill="#0d0a06" />
      </svg>

      {/* z3 — Ruta de vuelo dibujada (derecha), con paradas */}
      <svg
        aria-hidden="true"
        className="absolute right-[4%] top-0 z-[3] hidden h-full w-[320px] md:block"
        viewBox="0 0 400 900"
        fill="none"
      >
        <path
          ref={routeRef}
          d="M350,60 C360,160 250,230 280,340 C305,430 200,470 210,580 C218,675 120,720 150,840"
          stroke="#D4A24C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <g fill="#221C18" stroke="#D4A24C" strokeWidth="2.5">
          <circle cx="350" cy="60" r="5" />
          <circle cx="280" cy="340" r="5" />
          <circle cx="210" cy="580" r="5" />
          <circle cx="150" cy="840" r="5" />
        </g>
      </svg>

      {/* z4 — Texto fantasma decorativo */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[16%] left-0 z-[4] w-full whitespace-nowrap font-serif font-semibold uppercase leading-none"
        style={{
          fontSize: 'clamp(3rem, 11vw, 9rem)',
          color: 'rgba(251,246,236,0.07)',
          letterSpacing: '0.12em',
        }}
      >
        {t('cinematic.ghost')}
      </div>

      {/* z5 — Contenido */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.22em] text-gold">
            {t('cinematic.eyebrow')}
          </p>
          <SplitHeading
            as="h2"
            id="cinematic-heading"
            className="font-serif text-display-xl font-semibold leading-[1.05] text-surface [text-wrap:balance]"
            stagger={0.06}
          >
            {t('cinematic.title')}
          </SplitHeading>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-surface/70 [text-wrap:pretty]">
            {t('cinematic.body')}
          </p>
        </div>
      </div>

      {/* Borde de papel rasgado: transicion hacia la seccion clara siguiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-[70px]"
        style={{
          background: '#F4E8D3',
          clipPath:
            'polygon(0 100%, 0 55%, 3% 32%, 6% 58%, 9% 28%, 12% 52%, 15% 22%, 18% 48%, 21% 18%, 24% 44%, 27% 14%, 30% 40%, 33% 16%, 36% 46%, 39% 10%, 42% 38%, 45% 18%, 48% 44%, 51% 14%, 54% 40%, 57% 8%, 60% 34%, 63% 12%, 66% 42%, 69% 10%, 72% 38%, 75% 16%, 78% 46%, 81% 18%, 84% 40%, 87% 12%, 90% 38%, 93% 10%, 96% 34%, 100% 52%, 100% 100%)',
        }}
      />
    </section>
  )
}
