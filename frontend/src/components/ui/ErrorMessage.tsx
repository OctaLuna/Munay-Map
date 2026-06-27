import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  /** Texto del error a mostrar */
  message: string
  /** Acción principal (ej: reintentar) */
  onRetry?: () => void
  /** Texto del botón de acción principal */
  retryLabel?: string
  /** Acción secundaria (ej: subir imagen cuando no hay cámara) */
  onSecondary?: () => void
  /** Texto del botón secundario */
  secondaryLabel?: string
  className?: string
}

/**
 * ErrorMessage — componente reutilizable para mostrar errores con acciones.
 * Incluye rol="alert" para accesibilidad (anuncio automático por lectores de pantalla).
 */
export function ErrorMessage({
  message,
  onRetry,
  retryLabel = 'Intentar de nuevo',
  onSecondary,
  secondaryLabel,
  className,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'rounded-xl border border-accent/30 bg-accent/5 px-4 py-4',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Ícono de advertencia */}
        <svg
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>

        <div className="flex-1">
          <p className="text-sm font-medium text-dark font-sans leading-snug">{message}</p>

          {(onRetry ?? onSecondary) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-lg border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-surface transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 font-sans"
                >
                  {retryLabel}
                </button>
              )}
              {onSecondary && secondaryLabel && (
                <button
                  type="button"
                  onClick={onSecondary}
                  className="rounded-lg border border-primary/40 bg-transparent px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 font-sans"
                >
                  {secondaryLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
