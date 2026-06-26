import { cn } from '@/lib/utils'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  selected?: boolean
  onRemove?: () => void
}

export function Chip({ label, selected = false, onRemove, className, ...props }: ChipProps) {
  return (
    <button
      role="option"
      aria-selected={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        'border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        selected
          ? 'border-primary bg-primary text-surface'
          : 'border-neutral/30 bg-surface text-neutral hover:border-primary hover:text-primary',
        className
      )}
      {...props}
    >
      {label}
      {onRemove && (
        <span
          role="button"
          aria-label={`Quitar filtro ${label}`}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-0.5 cursor-pointer rounded-full p-0.5 hover:bg-surface/20"
        >
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 4.586L2.707 1.293 1.293 2.707 4.586 6 1.293 9.293l1.414 1.414L6 7.414l3.293 3.293 1.414-1.414L7.414 6l3.293-3.293-1.414-1.414L6 4.586z" />
          </svg>
        </span>
      )}
    </button>
  )
}

/** Contenedor para un grupo de Chips con soporte de listbox */
interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

export function ChipGroup({ label, children, className, ...props }: ChipGroupProps) {
  return (
    <div
      role="listbox"
      aria-label={label}
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}
