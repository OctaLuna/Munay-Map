import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { ClipRevealImage } from '@/components/motion/ClipRevealImage'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

/**
 * TwoColumnsRagged — patrón 4
 * Dos columnas con borde irregular tipo "papel rasgado" entre ellas.
 * SVG path irregular como separador visual.
 */
export function TwoColumnsRagged() {
  const dividerRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = dividerRef.current
    if (!path || prefersReducedMotion()) return

    gsap.from(path, {
      attr: { d: 'M 0 0 L 0 0 L 0 600 L 0 600 Z' },
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: path,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section
      aria-labelledby="two-columns-heading"
      className="relative overflow-hidden bg-background py-24"
    >
      <h2 id="two-columns-heading" className="sr-only">
        Lugares y sabores de Bolivia
      </h2>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative grid items-center gap-0 md:grid-cols-2">
          {/* Columna 1 — Lugares */}
          <div className="relative z-10 py-8 pr-0 md:pr-16">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Sitios turísticos
            </span>
            <SplitHeading
              as="h3"
              className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-6"
            >
              Lugares para explorar
            </SplitHeading>
            <p className="mb-8 max-w-prose-narrow font-sans text-base leading-relaxed text-neutral [text-wrap:pretty]">
              Desde las ruinas milenarias de Tiwanaku hasta el infinito Salar de Uyuni, 
              Bolivia concentra paisajes que van desde los 4.000 metros del altiplano 
              hasta las selvas amazónicas del Beni.
            </p>
            <Link to="/biblioteca?categoria=sitio_turistico">
              <Button variant="primary" size="md">
                Ver todos los sitios
              </Button>
            </Link>
          </div>

          {/* Divisor SVG irregular — patrón 4 */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 z-20 hidden w-24 -translate-x-1/2 md:block"
          >
            <svg viewBox="0 0 100 600" preserveAspectRatio="none" className="h-full w-full">
              <path
                ref={dividerRef}
                d="M 50 0 C 35 40, 65 80, 45 120 C 30 160, 60 200, 50 240 C 38 280, 62 320, 48 360 C 35 400, 65 440, 52 480 C 40 520, 58 560, 50 600 L 100 600 L 100 0 Z"
                fill="#F4E8D3"
              />
            </svg>
          </div>

          {/* Columna 2 — Sabores */}
          <div className="relative z-10 py-8 pl-0 md:pl-16">
            <ClipRevealImage
              src="https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80"
              alt="Plato tradicional boliviano con chuño y papas"
              direction="right"
              className="mb-8 h-64 w-full rounded-xl"
            />
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Gastronomía
            </span>
            <SplitHeading
              as="h3"
              className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-6"
              delay={0.1}
            >
              Sabores para descubrir
            </SplitHeading>
            <p className="mb-8 max-w-prose-narrow font-sans text-base leading-relaxed text-neutral [text-wrap:pretty]">
              El chuño lleva 2.000 años conservado por el frío andino. 
              El silpancho cochabambino, el salteño paceño, el tucumán cruceño — 
              cada región tiene su identidad gastronómica única.
            </p>
            <Link to="/biblioteca?categoria=gastronomia">
              <Button variant="secondary" size="md">
                Explorar gastronomía
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
