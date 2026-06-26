import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecognizeImage } from '@/hooks/useRecognizeImage'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/Button'

/**
 * CameraView — accede a getUserMedia, muestra el viewfinder y captura la foto.
 * Al capturar, llama a recognizeImage y navega a /camara/processing.
 */
export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const navigate = useNavigate()
  const { language } = useLanguage()
  const recognize = useRecognizeImage()

  const startCamera = useCallback(async () => {
    try {
      // Detener stream anterior si existe
      stream?.getTracks().forEach((t) => t.stop())

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
      setError(null)
    } catch (err) {
      const e = err as Error
      if (e.name === 'NotAllowedError') {
        setError('Permiso de cámara denegado. Habilitá el acceso en la configuración de tu navegador.')
      } else if (e.name === 'NotFoundError') {
        setError('No se encontró una cámara en este dispositivo.')
      } else {
        setError('No se pudo acceder a la cámara. Verificá que no esté en uso por otra app.')
      }
    }
  }, [facingMode]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    startCamera()
    return () => {
      stream?.getTracks().forEach((t) => t.stop())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode])

  const capture = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx?.drawImage(video, 0, 0)

    const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1] ?? ''

    // Navegar a procesando antes de esperar resultado
    navigate('/camara/processing')

    recognize.mutate(
      { imageBase64: base64, idioma: language.code },
      {
        onSuccess: (data) => {
          if (data.site && data.confianza >= 0.6) {
            navigate('/camara/result', { state: { result: data } })
          } else {
            navigate('/camara/not-found', { state: { result: data } })
          }
        },
        onError: () => {
          navigate('/camara/not-found')
        },
      }
    )
  }

  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-dark pt-20">
      {error ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div role="alert" className="mx-auto max-w-sm">
            <svg aria-hidden="true" className="mx-auto mb-4 h-12 w-12 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h1 className="font-serif text-xl font-semibold text-surface mb-3">
              Sin acceso a la cámara
            </h1>
            <p className="mb-6 text-sm text-surface/70 font-sans leading-relaxed">{error}</p>
            <Button onClick={startCamera} variant="secondary" className="border-surface/30 text-surface">
              Intentar nuevamente
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-1 flex-col">
          {/* Viewfinder */}
          <div className="relative flex-1 overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              aria-label="Vista de la cámara"
            />

            {/* Overlay con guía de encuadre */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-64 w-64 rounded-2xl border-2 border-white/40 opacity-70" />
            </div>

            {/* Instrucción */}
            <div
              aria-live="polite"
              className="absolute bottom-24 left-0 right-0 text-center"
            >
              <span className="rounded-full bg-dark/60 px-4 py-2 text-sm text-surface/80 font-sans backdrop-blur-sm">
                Encuadrá el objeto en el recuadro
              </span>
            </div>
          </div>

          {/* Canvas oculto para captura */}
          <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

          {/* Controles */}
          <div className="safe-area-bottom flex items-center justify-center gap-8 bg-dark px-8 py-6">
            {/* Cambiar cámara */}
            <button
              onClick={() => setFacingMode((m) => (m === 'environment' ? 'user' : 'environment'))}
              aria-label="Cambiar entre cámara frontal y trasera"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/10 text-surface hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.93 1.31a41.401 41.401 0 0110.14 0C16.255 1.485 17 2.353 17 3.36V8.5a.75.75 0 01-1.5 0V3.36a.272.272 0 00-.233-.27 39.901 39.901 0 00-9.534 0 .272.272 0 00-.233.27v13.28c0 .139.101.256.233.27a39.9 39.9 0 005.395.284.75.75 0 010 1.5 41.4 41.4 0 01-5.533-.292A1.772 1.772 0 013.5 16.64V3.36c0-1.007.746-1.875 1.43-2.05z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Botón de captura */}
            <button
              onClick={capture}
              aria-label="Capturar foto"
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-surface bg-surface/10 transition-transform active:scale-90 hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <div className="h-14 w-14 rounded-full bg-surface" />
            </button>

            {/* Placeholder para simetría */}
            <div className="h-12 w-12" aria-hidden="true" />
          </div>
        </div>
      )}
    </main>
  )
}
