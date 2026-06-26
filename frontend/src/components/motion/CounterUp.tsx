import { useCounterUp } from '@/hooks/gsap/useGsapAnimations'
import { cn } from '@/lib/utils'

interface CounterUpProps {
  target: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
  label?: string
}

/**
 * CounterUp — patrón 6
 * Número que se anima de 0 a `target` al entrar en viewport.
 */
export function CounterUp({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className,
  label,
}: CounterUpProps) {
  const ref = useCounterUp({ target, suffix, prefix, decimals, duration })

  return (
    <span
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as React.RefObject<any>}
      aria-label={label ?? `${prefix}${target}${suffix}`}
      className={cn(className)}
    >
      {prefix}0{suffix}
    </span>
  )
}
