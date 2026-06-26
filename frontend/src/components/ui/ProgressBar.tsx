import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0–100
  label?: string
  showValue?: boolean
  animate?: boolean
  className?: string
  variant?: 'primary' | 'gold' | 'accent'
}

const variantClasses = {
  primary: 'bg-primary',
  gold: 'bg-gold',
  accent: 'bg-accent',
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  animate = true,
  className,
  variant = 'primary',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-neutral font-sans">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-dark font-sans" aria-hidden="true">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-neutral/15"
      >
        <div
          className={cn(
            'h-full rounded-full',
            animate && 'transition-all duration-500 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
