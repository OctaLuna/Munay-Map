import { cn } from '@/lib/utils'

interface CameraViewfinderProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  /** Callback para cuando el video está listo para reproducirse */
  onReady?: () => void
}

/**
 * CameraViewfinder — muestra el feed de vídeo de getUserMedia con un guía de encuadre.
 * El canvas oculto se usa para capturar el frame al disparar la foto.
 */
export function CameraViewfinder({ videoRef, canvasRef, onReady }: CameraViewfinderProps) {
  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '4/3' }}>
      {/* Stream de vídeo */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onCanPlay={onReady}
        className="h-full w-full object-cover"
        aria-label="Vista de la cámara"
      />

      {/* Guía de encuadre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* Esquinas del visor */}
        <div
          className={cn(
            'relative h-52 w-52',
            'before:absolute before:left-0 before:top-0 before:h-8 before:w-8',
            'before:border-l-2 before:border-t-2 before:border-white/70 before:rounded-tl',
            'after:absolute after:right-0 after:top-0 after:h-8 after:w-8',
            'after:border-r-2 after:border-t-2 after:border-white/70 after:rounded-tr'
          )}
        >
          {/* Esquinas inferiores (pseudo-elementos no alcanzan para 4 esquinas, usamos divs) */}
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/70 rounded-bl" />
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-white/70 rounded-br" />
        </div>
      </div>

      {/* Instrucción flotante */}
      <p className="absolute bottom-4 left-0 right-0 text-center">
        <span className="rounded-full bg-black/50 px-4 py-1.5 text-xs text-white/80 font-sans backdrop-blur-sm">
          Encuadrá el objeto en el visor
        </span>
      </p>

      {/* Canvas oculto para captura */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  )
}
