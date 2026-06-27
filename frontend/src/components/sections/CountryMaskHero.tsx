import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BOLIVIA_SUBTRACT_PATH, MASK_VIEWBOX } from '@/assets/masks/boliviaMask'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

interface CountryMaskHeroProps {
  backgroundImageSrc?: string
  maskColor?: string
}

const DEFAULT_BG =
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80'

/**
 * CountryMaskHero — Efecto Flyward
 *
 * Una sola foto. Estado inicial: fondo beige con la silueta de Bolivia como
 * mascara invertida encima (BOLIVIA_SUBTRACT_PATH = rect lleno + hueco Bolivia),
 * la foto se ve a traves de la silueta.
 *
 * Al scrollear: el <g> SVG que contiene la mascara crece desde el centro
 * geometrico del viewBox (500,500) y se desvanece, revelando la foto completa.
 *
 * transformOrigin en coordenadas SVG (500px 500px) evita el problema de
 * transform-origin incorrecto que ocurria al animar un <div> absolute inset-0.
 *
 * prefers-reduced-motion: oculta directamente la mascara sin animar.
 */
export function CountryMaskHero({
  backgroundImageSrc = DEFAULT_BG,
  maskColor = '#F4E8D3',
}: CountryMaskHeroProps) {
  const heroSectionRef = useRef<HTMLElement>(null)
  const maskGroupRef = useRef<SVGGElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const hero = heroSectionRef.current
      const maskGroup = maskGroupRef.current
      const content = contentRef.current

      if (!hero || !maskGroup || !content) return

      if (prefersReducedMotion()) {
        gsap.set(maskGroup, { opacity: 0 })
        return
      }

      // Mascara SVG: crece desde el centro geometrico del viewBox (500,500)
      // y desaparece. scale: 4 hace que la silueta salga por todos los bordes
      // antes de llegar a opacity 0, sin corte abrupto.
      gsap.to(maskGroup, {
        scale: 4,
        opacity: 0,
        ease: 'none',
        transformOrigin: '960px 540px', // coordenadas SVG userspace, no CSS
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Texto: desaparece en el primer 35% del recorrido
      gsap.to(content, {
        opacity: 0,
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '35% top',
          scrub: true,
        },
      })

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === hero) st.kill()
        })
      }
    },
    { scope: heroSectionRef }
  )

  return (
    <section
      ref={heroSectionRef}
      aria-labelledby="hero-heading"
      className="relative h-[200vh]"
      style={{ backgroundColor: maskColor }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: maskColor }}
      >
        {/* CAPA 1: foto de fondo siempre visible detras de la mascara */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/*
         * CAPA 2: SVG unico — ocupa exactamente el viewport
         *
         * viewBox="0 0 1000 1000" + preserveAspectRatio="xMidYMid slice":
         *   el contenido cuadrado se centra con letterboxing lateral en
         *   pantallas rectangulares. Las franjas quedan del color maskColor
         *   del sticky wrapper, invisibles contra el fondo de la section.
         *
         * El <g> es lo que GSAP anima. transformOrigin en coordenadas SVG
         * (500px 500px) es el centro geometrico del viewBox, no del DOM.
         * Esto asegura que la silueta escale simetricamente hacia afuera
         * en todas las direcciones, sin deriva.
         */}
        <svg
          viewBox={MASK_VIEWBOX}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g
            ref={maskGroupRef}
            style={{ willChange: 'transform, opacity' }}
          >
            {/*
             * BOLIVIA_SUBTRACT_PATH = compound path:
             *   1. M1000 1000H0V0H1000V1000Z   → rectangulo lleno (fondo maskColor)
             *   2. M376.399 45.25...Z           → silueta de Bolivia (hueco transparente)
             * El <path> con fill=maskColor tapa todo EXCEPTO la forma de Bolivia,
             * por donde se ve la foto de CAPA 1 detras.
             */}
            <path d={BOLIVIA_SUBTRACT_PATH} fill={maskColor} fillRule="evenodd" />
          </g>
        </svg>

        {/* CAPA 3: texto centrado sobre la silueta */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="max-w-2xl">
            <SplitHeading
              as="h1"
              id="hero-heading"
              className="font-serif text-display-xl font-bold leading-tight text-dark [text-wrap:balance] mb-5"
              stagger={0.04}
              delay={0.2}
            >
              Bolivia tiene mil historias que contar.
            </SplitHeading>

            <p className="mx-auto mb-8 max-w-md text-base text-dark/60 font-sans leading-relaxed">
              Explorá su patrimonio cultural con inteligencia artificial.
              Reconocé sitios, entendé su historia en tu idioma y descubrí tu viaje ideal.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/camara">
                <Button
                  size="lg"
                  className="bg-dark text-surface hover:bg-dark/80 border-dark rounded-full px-8"
                >
                  Descubrir
                </Button>
              </Link>
              <Link to="/quiz">
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-dark/30 text-dark hover:bg-dark/5 rounded-full px-8"
                >
                  Hacer el quiz
                </Button>
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-dark/30"
          >
            <span className="text-xs font-sans tracking-widest uppercase">Explorar</span>
            <svg
              className="h-5 w-5 animate-bounce"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}