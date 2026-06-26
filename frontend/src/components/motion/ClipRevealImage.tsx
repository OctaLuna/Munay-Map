import { useClipPathReveal } from '@/hooks/gsap/useGsapAnimations'
import { cn } from '@/lib/utils'

interface ClipRevealImageProps {
  src: string
  alt: string
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  className?: string
  imgClassName?: string
  start?: string
}

/**
 * ClipRevealImage — patrón 2
 * Imagen que se revela con clip-path animado desde el borde indicado.
 */
export function ClipRevealImage({
  src,
  alt,
  direction = 'up',
  duration = 1.2,
  className,
  imgClassName,
  start,
}: ClipRevealImageProps) {
  const ref = useClipPathReveal({ direction, duration, start })

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as React.RefObject<any>}
      className={cn('overflow-hidden', className)}
    >
      <img src={src} alt={alt} className={cn('h-full w-full object-cover', imgClassName)} />
    </div>
  )
}
