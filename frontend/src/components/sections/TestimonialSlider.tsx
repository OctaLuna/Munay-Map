import { useRef, useState, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

const TESTIMONIALS = [
  {
    id: 't1',
    texto:
      '"Llegué a Tiwanaku sin saber nada sobre el lugar. Tomé una foto con la app y en segundos tenía toda la historia en japonés. Increíble."',
    nombre: 'Kenji T.',
    pais: 'Japón',
    bandera: '🇯🇵',
  },
  {
    id: 't2',
    texto:
      '"El quiz me recomendó el Salar de Uyuni y el Carnaval de Oruro. Hice los dos y fue el viaje más memorable de mi vida."',
    nombre: 'Laura M.',
    pais: 'Argentina',
    bandera: '🇦🇷',
  },
  {
    id: 't3',
    texto:
      '"Viajé con mi familia y los chicos quedaron fascinados escuchando las historias en su idioma. La herramienta es perfecta para turistas con niños."',
    nombre: 'Hans K.',
    pais: 'Alemania',
    bandera: '🇩🇪',
  },
]

/**
 * TestimonialSlider — patrón 9
 * Slider de testimonios con swipe/drag y snap.
 * [PENDIENTE] Testimoniales reales — los actuales son placeholders.
 */
export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(TESTIMONIALS.length - 1, index))
    setCurrent(clamped)

    if (trackRef.current && !prefersReducedMotion()) {
      gsap.to(trackRef.current, {
        xPercent: -clamped * 100,
        duration: 0.5,
        ease: 'power3.out',
      })
    } else if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${clamped * 100}%)`
    }
  }

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  // Touch/drag support
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
    trackRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const delta = e.clientX - startX.current
    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev()
    }
  }

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-surface py-20 px-4 md:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll className="mb-12 text-center">
          <h2
            id="testimonials-heading"
            className="font-serif text-display-md font-bold text-dark [text-wrap:balance]"
          >
            Lo que dicen los viajeros
          </h2>
          <p className="mt-3 text-neutral font-sans text-sm">
            {/* [PENDIENTE] Testimoniales reales de usuarios */}
            [PENDIENTE] Testimoniales reales · Placeholders actuales
          </p>
        </RevealOnScroll>

        <div
          className="relative overflow-hidden rounded-2xl"
          role="region"
          aria-label="Carrusel de testimoniales"
          aria-live="polite"
        >
          <div
            ref={trackRef}
            className="flex touch-pan-y"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            style={{ cursor: 'grab' }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="w-full flex-shrink-0 px-4 py-12 text-center bg-background rounded-2xl"
                aria-label={`Testimonio de ${t.nombre}`}
              >
                <blockquote className="mx-auto max-w-prose">
                  <p className="font-serif text-xl italic text-dark leading-relaxed [text-wrap:pretty]">
                    {t.texto}
                  </p>
                  <footer className="mt-6">
                    <span aria-hidden="true" className="text-3xl">{t.bandera}</span>
                    <cite className="mt-2 block font-sans text-sm font-semibold text-neutral not-italic">
                      {t.nombre} · {t.pais}
                    </cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Testimonio anterior"
            disabled={current === 0}
            className="rounded-full p-2 text-neutral hover:bg-neutral/10 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dots */}
          <div role="tablist" aria-label="Navegar entre testimonios" className="flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonio ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i === current ? 'w-6 bg-primary' : 'w-2 bg-neutral/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            disabled={current === TESTIMONIALS.length - 1}
            className="rounded-full p-2 text-neutral hover:bg-neutral/10 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
