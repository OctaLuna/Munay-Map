import { cn } from '@/lib/utils'

interface CaptureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Si está cargando (capturando), deshabilita y muestra el estado ocupado */
  isCapturing?: boolean
}

/**
 * CaptureButton — botón circular de disparo para la cámara.
 * Diseño: anillo exterior blanco + disco interior blanco, efecto activo.
 */
export function CaptureButton({ isCapturing = false, className, ...props }: CaptureButtonProps) {
  return (
    <button
      type="button"
      aria-label="Tomar foto"
      aria-busy={isCapturing}
      disabled={isCapturing}
      className={cn(
        'flex h-20 w-20 items-center justify-center rounded-full',
        'border-4 border-white/90',
        'bg-white/10 backdrop-blur-sm',
        'transition-transform duration-150',
        'active:scale-90 hover:bg-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {isCapturing ? (
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="28 29"
            strokeDashoffset="14"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <div className="h-14 w-14 rounded-full bg-white" aria-hidden="true" />
      )}
    </button>
  )
}
