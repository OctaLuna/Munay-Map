import { useParallaxLayer } from '@/hooks/gsap/useGsapAnimations'
import { cn } from '@/lib/utils'

interface ParallaxLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  yPercent?: number
  scrub?: number | boolean
  as?: React.ElementType
}

/**
 * ParallaxLayer — patrón 1
 * Capa con desplazamiento vertical ligado al scroll.
 * Se combina con CountryMaskHero para crear efecto de 2 capas de profundidad.
 */
export function ParallaxLayer({
  children,
  yPercent = -20,
  scrub = 1,
  as: Tag = 'div',
  className,
  ...props
}: ParallaxLayerProps) {
  const ref = useParallaxLayer({ yPercent, scrub })

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as React.RefObject<any>}
      className={cn('will-change-transform', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
