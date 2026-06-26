import { useSplitTextReveal } from '@/hooks/gsap/useGsapAnimations'
import { cn } from '@/lib/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface SplitHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  children: string
  className?: string
  stagger?: number
  delay?: number
}

/**
 * SplitHeading — patrón 3
 * Revela el titular palabra por palabra con stagger GSAP.
 */
export function SplitHeading({
  as: Tag = 'h2',
  children,
  className,
  stagger = 0.05,
  delay = 0,
  ...rest
}: SplitHeadingProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useSplitTextReveal({ stagger, delay }) as React.RefObject<any>

  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
      {children}
    </Tag>
  )
}
