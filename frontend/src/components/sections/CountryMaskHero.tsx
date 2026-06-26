import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BOLIVIA_MASK_PATH, MASK_VIEWBOX } from '@/assets/masks/boliviaMask'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

interface CountryMaskHeroProps {
  /**
   * Imagen principal que se muestra dentro de la silueta de Bolivia.
   * Placeholder: Salar de Uyuni desde Unsplash.
   * Para usar la foto real: pasar la URL definitiva.
   */
  backgroundImageSrc?: string
  /**
   * Segunda imagen para el efecto parallax de 2 capas (patrón 1).
   * Se mueve más lento que la capa principal para crear profundidad.
   * Opcional — si no se proporciona, solo hay 1 capa.
   */
  foregroundImageSrc?: string
}

const DEFAULT_BG =
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80'

/**
 * CountryMaskHero — patrones 1 y 2
 *
 * Patrón 1: Parallax de 2 capas (fondo se mueve más rápido que primer plano)
 * Patrón 2: Imagen recortada dentro de la silueta SVG de Bolivia con reveal al scroll
 *
 * Para reemplazar la silueta de Bolivia:
 *   → Editar src/assets/masks/boliviaMask.ts
 *   → No tocar este componente
 */
export function CountryMaskHero({
  backgroundImageSrc = DEFAULT_BG,
  foregroundImageSrc,
}: CountryMaskHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const bgLayerRef = useRef<HTMLDivElement>(null)
  const fgLayerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const bg = bgLayerRef.current
    const fg = fgLayerRef.current
    const svgPath = svgRef.current

    if (!hero) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Patrón 1 — parallax capa de fondo (se mueve más rápido)
      if (bg) {
        gsap.to(bg, {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Patrón 1 — parallax capa de primer plano (más lenta)
      if (fg && foregroundImageSrc) {
        gsap.to(fg, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }

      // Patrón 2 — reveal del clip-path SVG al entrar en viewport
      if (svgPath) {
        // La máscara aparece con un draw effect usando stroke-dasharray
        const length = svgPath.getTotalLength?.() ?? 2000
        gsap.set(svgPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
          stroke: '#D4A24C',
          strokeWidth: 2,
          fill: 'none',
        })
        gsap.to(svgPath, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power3.out',
          delay: 0.5,
          onComplete: () => {
            // Una vez dibujado el contorno, rellenar con la imagen
            gsap.to(svgPath, { fill: '#F4E8D3', duration: 0.3 })
          },
        })
      }
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === hero) st.kill()
      })
    }
  }, [foregroundImageSrc])

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative min-h-screen overflow-hidden bg-dark"
    >
      {/* Fondo decorativo — líneas de mapa (patrón 12) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-map-lines opacity-20"
      />

      {/* Capa de imagen de fondo — parallax rápida */}
      <div
        ref={bgLayerRef}
        aria-hidden="true"
        className="absolute inset-0 scale-125 will-change-transform"
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay gradiente */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/70"
      />

      {/* Silueta SVG de Bolivia con imagen interior */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox={MASK_VIEWBOX}
          className="h-full w-full max-w-4xl"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <clipPath id="country-mask" clipPathUnits="userSpaceOnUse">
              <path d={BOLIVIA_MASK_PATH} />
            </clipPath>
          </defs>

          {/* Imagen recortada dentro de la silueta */}
          <image
            href={backgroundImageSrc}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#country-mask)"
            className="opacity-60"
          />

          {/* Segunda capa de imagen (foreground) — si se provee */}
          {foregroundImageSrc && (
            <image
              href={foregroundImageSrc}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#country-mask)"
              className="opacity-40"
            />
          )}

          {/* Path de la silueta — se anima con stroke-dasharray */}
          <path
            ref={svgRef}
            d={BOLIVIA_MASK_PATH}
            fill="none"
            stroke="#D4A24C"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Capa de primer plano — parallax lenta (si hay foreground) */}
      {foregroundImageSrc && (
        <div
          ref={fgLayerRef}
          aria-hidden="true"
          className="absolute inset-0 scale-110 will-change-transform"
          style={{
            backgroundImage: `url(${foregroundImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
      )}

      {/* Contenido del hero */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            <span aria-hidden="true">✦</span>
            Guía turística con IA · 9 departamentos
          </span>

          {/* Titular — SplitText reveal (patrón 3) */}
          <SplitHeading
            as="h1"
            id="hero-heading"
            className="font-serif text-display-xl font-bold leading-tight text-surface [text-wrap:balance] mb-6"
            stagger={0.04}
            delay={0.3}
          >
            Bolivia tiene mil historias que contar. Te ayudamos a entenderlas.
          </SplitHeading>

          <p className="mx-auto mb-10 max-w-xl text-lg text-surface/70 font-sans leading-relaxed">
            Tomá una foto a cualquier sitio cultural, recibí la historia en tu idioma y 
            descubrí el viaje que fue hecho para vos.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/camara">
              <Button size="lg" variant="primary">
                Probar reconocimiento
              </Button>
            </Link>
            <Link to="/quiz">
              <Button size="lg" variant="secondary" className="border-surface/40 text-surface hover:bg-surface/10">
                Hacer el quiz de viaje
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-surface/40"
        >
          <span className="text-xs font-sans tracking-widest uppercase">Explorar</span>
          <svg className="h-5 w-5 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
