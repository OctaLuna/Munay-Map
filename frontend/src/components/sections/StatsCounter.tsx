import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { CounterUp } from '@/components/motion/CounterUp'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

const STATS = [
  { target: 200, suffix: '+', label: 'Sitios catalogados', prefix: '' },
  { target: 9, suffix: '', label: 'Departamentos', prefix: '' },
  { target: 40, suffix: '+', label: 'Idiomas disponibles', prefix: '' },
  { target: 2000, suffix: '+', label: 'Años de historia', prefix: '' },
]

/**
 * StatsCounter — patrón 6
 * Contadores animados que se disparan al entrar en viewport.
 */
export function StatsCounter() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line || prefersReducedMotion()) return

    gsap.from(line, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-primary py-20 px-4 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <h2 id="stats-heading" className="sr-only">
            Estadísticas del proyecto
          </h2>
        </RevealOnScroll>

        <div
          ref={lineRef}
          aria-hidden="true"
          className="mb-12 h-px w-full bg-surface/20"
        />

        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="order-2 mt-2 text-sm font-medium text-surface/70 font-sans">
                {stat.label}
              </dt>
              <dd className="order-1 font-serif text-display-lg font-bold text-gold">
                <CounterUp
                  target={stat.target}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2.5}
                  label={`${stat.target}${stat.suffix} ${stat.label}`}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
