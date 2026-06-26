import { cn } from '@/lib/utils'

type BadgeVariant = 'gold' | 'neutral' | 'accent' | 'primary' | 'surface'
type BadgeSize = 'sm' | 'md'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-gold/15 text-gold border border-gold/30',
  neutral: 'bg-neutral/10 text-neutral border border-neutral/20',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  primary: 'bg-primary/10 text-primary border border-primary/20',
  surface: 'bg-surface/20 text-surface border border-surface/30',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export function Badge({ variant = 'neutral', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium font-sans',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
