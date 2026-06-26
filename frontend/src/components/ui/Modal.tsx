import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-[95vw] max-h-[95vh]',
}

/**
 * Modal usando <dialog> nativo para escapar correctamente los stacking contexts.
 * Soporta cierre con Escape y click en backdrop.
 */
export function Modal({ open, onClose, title, description, children, className, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  // Cerrar al hacer click fuera del contenido
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    const outside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    if (outside) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      className={cn(
        'rounded-2xl bg-surface p-0 text-dark backdrop:bg-dark/50 backdrop:backdrop-blur-sm',
        'open:animate-fade-in',
        'w-full',
        sizeClasses[size],
        className
      )}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col">
        {/* Header */}
        {(title != null || onClose != null) && (
          <div className="flex items-center justify-between border-b border-neutral/15 px-6 py-4">
            {title && (
              <h2 id="modal-title" className="font-serif text-xl font-semibold text-dark">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="ml-auto rounded-lg p-1.5 text-neutral hover:bg-neutral/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}

        {/* Description */}
        {description && (
          <p id="modal-description" className="sr-only">
            {description}
          </p>
        )}

        {/* Body */}
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </dialog>
  )
}
