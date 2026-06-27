import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BOLIVIA_SUBTRACT_PATH, BOLIVIA_MASK_PATH, MASK_VIEWBOX } from '@/assets/masks/boliviaMask'
import { BOLIVIA_DEPARTMENTS, DEPT_FIT_TRANSFORM } from '@/assets/masks/boliviaDepartments'
import { prefersReducedMotion } from '@/lib/utils'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { useT } from '@/context/LanguageContext'
import beniTexture from '@/assets/departments/beni.jpg'
import cochabambaTexture from '@/assets/departments/cochabamba.jpg'
import lapazTexture from '@/assets/departments/lapaz.jpg'
import oruroTexture from '@/assets/departments/oruro.jpg'
import pandoTexture from '@/assets/departments/pando.jpg'
import potosiTexture from '@/assets/departments/potosi.jpg'
import santacruzTexture from '@/assets/departments/santacruz.jpg'
import sucreTexture from '@/assets/departments/sucre.jpg'
import tarijaTexture from '@/assets/departments/tarija.jpeg'

interface CountryMaskHeroProps {
  backgroundImageSrc?: string
  maskColor?: string
}

const DEPARTMENT_TEXTURES: Record<string, string> = {
  BOB: beniTexture,
  BOC: cochabambaTexture,
  BOH: sucreTexture,
  BOL: lapazTexture,
  BON: pandoTexture,
  BOO: oruroTexture,
  BOP: potosiTexture,
  BOS: santacruzTexture,
  BOT: tarijaTexture,
}

const DEFAULT_DEPARTMENT_ID = 'BOL'

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
  backgroundImageSrc,
  maskColor = '#F4E8D3',
}: CountryMaskHeroProps) {
  const t = useT()
  const [activeDepartmentId, setActiveDepartmentId] = useState(DEFAULT_DEPARTMENT_ID)
  const [isAtHeroTop, setIsAtHeroTop] = useState(true)
  const heroSectionRef = useRef<HTMLElement>(null)
  const maskGroupRef = useRef<SVGGElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const activeTexture =
    DEPARTMENT_TEXTURES[activeDepartmentId] ??
    backgroundImageSrc ??
    DEPARTMENT_TEXTURES[DEFAULT_DEPARTMENT_ID]

  useEffect(() => {
    const updateTopState = () => setIsAtHeroTop(window.scrollY <= 0)

    updateTopState()
    window.addEventListener('scroll', updateTopState, { passive: true })
    return () => window.removeEventListener('scroll', updateTopState)
  }, [])

  const handleDepartmentEnter = (departmentId: string) => {
    if (!isAtHeroTop) return
    setActiveDepartmentId(departmentId)
  }

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

      // Mascara SVG: crece desde el CENTRO DE LA SILUETA y desaparece. scale: 4
      // hace que la silueta salga por todos los bordes antes de opacity 0.
      // El origen se ancla en el centro de la silueta (1019.5, 540) — no en el
      // centro del viewBox (960, 540) — para que crezca EN EL LUGAR, sin derivar
      // hacia un costado. (El tamano en reposo se hornea en boliviaMask.ts.)
      gsap.to(maskGroup, {
        scale: 4,
        opacity: 0,
        ease: 'none',
        transformOrigin: '1019.5px 540px', // centro de la silueta en coords SVG
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
          className="absolute inset-0 transition-[filter] duration-500"
          style={{
            backgroundImage: `url(${activeTexture})`,
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
          {/*
           * clipPath con la silueta de Bolivia (mismo path que el hueco de la
           * mascara). userSpaceOnUse: se evalua en el espacio del <g> que lo
           * referencia — dentro del maskGroup animado — por lo que la capa de
           * departamentos se recorta EXACTAMENTE a la silueta visible, incluso
           * mientras la mascara escala/desvanece. Nada se sale de la forma.
           */}
          <defs>
            <clipPath id="bolivia-clip" clipPathUnits="userSpaceOnUse">
              <path d={BOLIVIA_MASK_PATH} />
            </clipPath>
          </defs>

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

            {/*
             * Capa interactiva de departamentos (aditiva, no toca la mascara).
             * - Recortada a la silueta con clip-path → nunca desborda.
             * - DEPT_FIT_TRANSFORM mapea el espacio 1000x1000 del SVG de origen
             *   al bbox de la silueta en 1920x1080 → alineacion exacta.
             * - vector-effect non-scaling-stroke mantiene el grosor del borde
             *   constante aunque el grupo escale con la animacion del hero.
             * - El brillo al hover se maneja con CSS (.dept-region:hover).
             */}
            <g
              clipPath="url(#bolivia-clip)"
              className={isAtHeroTop ? undefined : 'pointer-events-none'}
            >
              <g transform={DEPT_FIT_TRANSFORM}>
                {BOLIVIA_DEPARTMENTS.map((dept) => (
                  <path
                    key={dept.id}
                    d={dept.d}
                    className={`dept-region ${dept.id === activeDepartmentId ? 'is-active' : ''}`}
                    vectorEffect="non-scaling-stroke"
                    onPointerEnter={() => handleDepartmentEnter(dept.id)}
                  >
                    <title>{dept.nombre}</title>
                  </path>
                ))}
              </g>
            </g>
          </g>
        </svg>

        {/* CAPA 3: texto centrado sobre la silueta */}
        <div
          ref={contentRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="mx-auto flex max-w-[calc(100vw-2rem)] flex-col items-center">
            <SplitHeading
              as="h1"
              id="hero-heading"
              className="hero-title-veil mb-5 inline-block max-w-full px-5 py-3 font-serif text-[clamp(2.25rem,4.4vw,4.75rem)] font-bold leading-tight text-dark [text-wrap:balance] sm:px-8 sm:py-4 min-[1280px]:whitespace-nowrap"
              stagger={0.04}
              delay={0.2}
            >
              {t('hero.title')}
            </SplitHeading>

          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-dark/30"
          >
            <span className="text-xs font-sans tracking-widest uppercase">{t('hero.scroll')}</span>
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
