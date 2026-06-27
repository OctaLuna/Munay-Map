interface ImagePreviewProps {
  src: string
  /** Overlay de análisis (spinner) mientras la IA procesa */
  isAnalyzing?: boolean
}

/**
 * ImagePreview — muestra la imagen capturada o subida antes de enviarla al backend.
 * Cuando isAnalyzing=true, aplica un overlay semitransparente con spinner.
 */
export function ImagePreview({ src, isAnalyzing = false }: ImagePreviewProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-neutral/10">
      <img
        src={src}
        alt="Vista previa de la imagen a analizar"
        className="w-full object-cover"
        style={{ maxHeight: '60vh' }}
      />

      {/* Overlay de análisis */}
      {isAnalyzing && (
        <div
          role="status"
          aria-label="Analizando imagen"
          className="absolute inset-0 flex flex-col items-center justify-center bg-dark/70 backdrop-blur-sm"
        >
          {/* Spinner */}
          <svg
            aria-hidden="true"
            className="mb-4 h-12 w-12 animate-spin text-gold"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="62 63"
              strokeDashoffset="31"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-serif text-base font-semibold text-surface">Analizando...</p>
          <p className="mt-1 text-xs text-surface/70 font-sans">
            La IA está identificando el contenido boliviano
          </p>
        </div>
      )}
    </div>
  )
}
