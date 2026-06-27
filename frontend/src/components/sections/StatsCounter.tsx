import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { CounterUp } from '@/components/motion/CounterUp'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { useT } from '@/context/LanguageContext'

const STATS = [
  { target: 200, suffix: '+', labelKey: 'stats.sites', prefix: '' },
  { target: 9, suffix: '', labelKey: 'stats.depts', prefix: '' },
  { target: 40, suffix: '+', labelKey: 'stats.langs', prefix: '' },
  { target: 2000, suffix: '+', labelKey: 'stats.years', prefix: '' },
] as const

// Foto del altiplano boliviano — Salar de Uyuni al atardecer
const BG_IMAGE =
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80'

/**
 * StatsCounter — patron 6
 * Contadores animados sobre foto de fondo real (altiplano).
 * Overlay oscuro para legibilidad del texto en blanco.
 */
export function StatsCounter() {
  const t = useT()
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
      className="relative py-24 px-4 md:px-8"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay oscuro para contraste — los numeros en blanco/dorado sobre foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dark/65"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealOnScroll>
          <h2 id="stats-heading" className="sr-only">
            {t('stats.aria')}
          </h2>
        </RevealOnScroll>

        <div
          ref={lineRef}
          aria-hidden="true"
          className="mb-14 h-px w-full bg-surface/20"
        />

        <dl className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <dt className="order-2 mt-2 text-sm font-medium text-surface/60 font-sans uppercase tracking-[0.08em]">
                {t(stat.labelKey)}
              </dt>
              <dd className="order-1 font-serif text-display-lg font-bold text-gold">
                <CounterUp
                  target={stat.target}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2.5}
                  label={`${stat.target}${stat.suffix} ${t(stat.labelKey)}`}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}