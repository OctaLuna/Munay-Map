import { cn } from '@/lib/utils'
import { useGsapReveal } from '@/hooks/gsap/useGsapAnimations'

interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  y?: number
  as?: React.ElementType
}

/**
 * RevealOnScroll — patrón 3/10
 * Wrapper que aplica fade+y al entrar en viewport.
 * El contenido siempre es visible en el DOM (accesibilidad y SSR).
 */
export function RevealOnScroll({
  children,
  delay = 0,
  y = 32,
  as: Tag = 'div',
  className,
  ...props
}: RevealOnScrollProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useGsapReveal({ y, delay }) as React.RefObject<any>

  return (
    <Tag ref={ref} className={cn(className)} {...props}>
      {children}
    </Tag>
  )
}
