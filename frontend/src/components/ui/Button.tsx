import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  /** Renderiza el botón como un elemento hijo (para composición con Link, etc.) */
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-surface hover:bg-primary/90 focus-visible:ring-primary active:scale-[0.98]',
  secondary:
    'bg-transparent border border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary active:scale-[0.98]',
  ghost:
    'bg-transparent text-dark hover:bg-neutral/10 focus-visible:ring-neutral active:scale-[0.98]',
  danger:
    'bg-accent text-surface hover:bg-accent/90 focus-visible:ring-accent active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          // Base
          'inline-flex items-center justify-center rounded-lg font-sans font-medium',
          'transition-all duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            aria-hidden="true"
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
