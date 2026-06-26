import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

interface MarqueeProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  speed?: number // px por segundo
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  className?: string
  trackClassName?: string
}

/**
 * Marquee infinito — patrón 8
 * gsap.to(track, { xPercent: -100, repeat: -1, ease: 'none' })
 * Duplica el contenido para scroll sin saltos.
 */
export function Marquee<T>({
  items,
  renderItem,
  speed = 50,
  pauseOnHover = true,
  direction = 'left',
  className,
  trackClassName,
}: MarqueeProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    if (prefersReducedMotion()) return

    const trackWidth = track.offsetWidth / 2 // mitad porque está duplicado

    // Duración basada en velocidad deseada
    const duration = trackWidth / speed

    tweenRef.current = gsap.to(track, {
      xPercent: direction === 'left' ? -50 : 50,
      duration,
      ease: 'none',
      repeat: -1,
      // Para RTL (direction right), empezamos desde -50%
      ...(direction === 'right' && { xPercent: 0, startAt: { xPercent: -50 } }),
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [speed, direction])

  const handleMouseEnter = () => {
    if (pauseOnHover) tweenRef.current?.pause()
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) tweenRef.current?.play()
  }

  return (
    <div
      ref={wrapperRef}
      className={cn('overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true" // decorativo — no aporta información nueva al lector
    >
      <div
        ref={trackRef}
        className={cn('flex w-max items-center', trackClassName)}
      >
        {/* Copia original + duplicado para scroll sin saltos */}
        {items.map((item, i) => (
          <div key={`original-${i}`} className="flex-shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`clone-${i}`} aria-hidden="true" className="flex-shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  )
}
