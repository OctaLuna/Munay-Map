import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

const TORN_PATH =
  'M 52 0 C 38 35, 64 70, 46 110 C 32 145, 60 185, 50 225 C 38 268, 63 308, 48 348 C 35 385, 62 425, 50 465 C 38 505, 61 545, 52 585 C 44 620, 55 640, 52 660 L 100 660 L 100 0 Z'

/**
 * TwoColumnsRagged — patron 4 rediseñado
 *
 * Dos columnas full-bleed con fotos de fondo reales, separadas por un
 * borde irregular tipo "papel rasgado" (SVG path).
 * Cada columna tiene un titulo grande en mayuscula superpuesto y un CTA.
 *
 * En mobile: columnas apiladas verticalmente, sin divisor SVG.
 */
export function TwoColumnsRagged() {
  const dividerRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const path = dividerRef.current
    const section = sectionRef.current
    if (!path || !section || prefersReducedMotion()) return

    gsap.from(path, {
      attr: { d: 'M 50 0 L 50 0 L 50 660 L 50 660 Z' },
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="two-columns-heading"
      className="relative h-[70vh] min-h-[520px] overflow-hidden"
    >
      <h2 id="two-columns-heading" className="sr-only">
        Lugares y sabores de Bolivia
      </h2>

      {/* Columna izquierda — foto de Tiwanaku/salar, Lugares */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 md:w-1/2"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1589650381083-5d08a59f49cf?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay oscuro para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <SplitHeading
            as="h3"
            className="font-serif text-display-md font-bold uppercase tracking-[0.05em] text-surface [text-wrap:balance] mb-3"
          >
            Lugares para explorar
          </SplitHeading>
          <p className="mb-6 max-w-xs font-sans text-sm leading-relaxed text-surface/80 hidden md:block">
            Desde las ruinas milenarias de Tiwanaku hasta el infinito Salar de Uyuni.
          </p>
          <Link to="/biblioteca?categoria=sitio_turistico">
            <Button
              size="sm"
              className="rounded-full bg-surface text-dark hover:bg-surface/90 uppercase tracking-[0.06em] text-[12px] px-6 w-fit"
            >
              Explorar
            </Button>
          </Link>
        </div>
      </div>

      {/* Columna derecha — foto de gastronomia/festividad, Sabores */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 md:w-1/2"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <SplitHeading
            as="h3"
            className="font-serif text-display-md font-bold uppercase tracking-[0.05em] text-surface [text-wrap:balance] mb-3"
            delay={0.1}
          >
            Sabores para descubrir
          </SplitHeading>
          <p className="mb-6 max-w-xs font-sans text-sm leading-relaxed text-surface/80 hidden md:block">
            El chuño lleva 2.000 años en el altiplano. El salteño, el silpancho, el tucuman.
          </p>
          <Link to="/biblioteca?categoria=gastronomia">
            <Button
              size="sm"
              className="rounded-full bg-surface text-dark hover:bg-surface/90 uppercase tracking-[0.06em] text-[12px] px-6 w-fit"
            >
              Explorar
            </Button>
          </Link>
        </div>
      </div>

      {/*
       * Divisor SVG — borde irregular tipo papel rasgado
       * Solo visible en md+. Posicionado exactamente en el center.
       * El path TORN_PATH define la forma irregular que divide las dos columnas.
       * GSAP lo anima desde una linea recta al entrar en viewport.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden -translate-x-1/2 w-[100px] md:block"
      >
        <svg
          viewBox="0 0 100 660"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            ref={dividerRef}
            d={TORN_PATH}
            fill="#F4E8D3"
            opacity="0.15"
          />
        </svg>
      </div>
    </section>
  )
}