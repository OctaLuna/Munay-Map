import { useRef, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCamera } from '@/hooks/useCamera'
import { useImageAnalysis } from '@/hooks/useImageAnalysis'
import { useLanguage } from '@/context/LanguageContext'
import { CameraViewfinder } from '@/components/camera/CameraViewfinder'
import { ImagePreview } from '@/components/camera/ImagePreview'
import { CategoryBadges } from '@/components/camera/CategoryBadges'
import { CaptureButton } from '@/components/camera/CaptureButton'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Button } from '@/components/ui/Button'

/** Pantalla activa del flujo de cámara */
type CameraMode = 'select' | 'camera' | 'preview'

/**
 * Redimensiona y comprime una imagen a máximo 1024px de ancho/alto y calidad 0.8.
 * Devuelve { previewUrl, base64 } — base64 sin el prefijo data:...
 */
function compressImage(dataUrl: string, maxPx = 1024, quality = 0.8): Promise<{ previewUrl: string; base64: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('canvas context unavailable'))
      ctx.drawImage(img, 0, 0, w, h)
      const compressed = canvas.toDataURL('image/jpeg', quality)
      resolve({ previewUrl: compressed, base64: compressed.split(',')[1] ?? '' })
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

/**
 * CameraPage — flujo unificado de reconocimiento cultural con IA.
 *
 * Flujo:
 *   select → camera (getUserMedia) → preview → analizar → /camara/result | /camara/not-found
 *   select → upload (FileReader)    → preview → analizar → idem
 *
 * Ruta: /camara
 */
export default function CameraPage() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Estado del flujo
  const [mode, setMode] = useState<CameraMode>('select')
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Hook de cámara
  const camera = useCamera()

  // Hook de análisis
  const { analyze, isLoading: isAnalyzing, error: analysisError, reset: resetAnalysis } = useImageAnalysis()

  // ─── Handlers: modo cámara ──────────────────────────────────────────────

  const handleOpenCamera = useCallback(async () => {
    setUploadError(null)
    resetAnalysis()
    setMode('camera')
    await camera.startCamera()
  }, [camera, resetAnalysis])

  const handleCapture = useCallback(async () => {
    const base64Raw = camera.capturePhoto()
    if (!base64Raw) return

    try {
      const dataUrl = `data:image/jpeg;base64,${base64Raw}`
      const { previewUrl: compressed, base64 } = await compressImage(dataUrl)
      setPhotoBase64(base64)
      setPreviewUrl(compressed)
    } catch {
      // Si la compresión falla, usar la imagen original
      const dataUrl = `data:image/jpeg;base64,${base64Raw}`
      setPhotoBase64(base64Raw)
      setPreviewUrl(dataUrl)
    }
    camera.stopCamera()
    setMode('preview')
  }, [camera])

  const handleCloseCamera = useCallback(() => {
    camera.stopCamera()
    setMode('select')
  }, [camera])

  // ─── Handlers: subida de archivo ────────────────────────────────────────

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    resetAnalysis()

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setUploadError('Formato no válido. Usá JPG, PNG o WebP.')
      // Limpiar el input para permitir volver a seleccionar el mismo archivo
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('La imagen es muy grande. Máximo 10 MB.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string
      try {
        const { previewUrl: compressed, base64 } = await compressImage(dataUrl)
        setPreviewUrl(compressed)
        setPhotoBase64(base64)
      } catch {
        // Fallback: usar la imagen sin comprimir
        setPreviewUrl(dataUrl)
        setPhotoBase64(dataUrl.split(',')[1] ?? null)
      }
      setMode('preview')
    }
    reader.readAsDataURL(file)
  }, [resetAnalysis])

  const handleUploadClick = useCallback(() => {
    setUploadError(null)
    resetAnalysis()
    fileInputRef.current?.click()
  }, [resetAnalysis])

  // ─── Handler: analizar imagen ────────────────────────────────────────────

  const handleAnalyze = useCallback(async () => {
    if (!photoBase64) return

    try {
      const result = await analyze(photoBase64, language.code)

      if (result.site && result.confianza >= 0.6) {
        navigate('/camara/result', {
          state: { result, imagePreview: previewUrl },
        })
      } else {
        navigate('/camara/not-found', {
          state: { result, imagePreview: previewUrl },
        })
      }
    } catch {
      // El error ya está en analysisError; permanecemos en /preview para reintentar
    }
  }, [photoBase64, previewUrl, analyze, language.code, navigate])

  const handleRetryAnalysis = useCallback(() => {
    resetAnalysis()
    // Mantenemos la imagen y volvemos a preview limpio
  }, [resetAnalysis])

  const handleBackToSelect = useCallback(() => {
    camera.stopCamera()
    setPhotoBase64(null)
    setPreviewUrl(null)
    setUploadError(null)
    resetAnalysis()
    setMode('select')
  }, [camera, resetAnalysis])

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-background pt-16">
      {/* ── MODO: SELECCIÓN INICIAL ─────────────────────────────────────── */}
      {mode === 'select' && (
        <div className="mx-auto flex w-full max-w-md flex-col px-5 py-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
            >
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="4" y="8" width="24" height="18" rx="3" />
                <circle cx="16" cy="17" r="5" />
                <path d="M11 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-dark mb-2">
              Identificar cultura boliviana
            </h1>
            <p className="text-sm text-neutral font-sans leading-relaxed">
              Fotografiá o subí una imagen de un sitio, plato, danza o tradición boliviana para
              recibir una explicación en tu idioma.
            </p>
          </div>

          {/* Opciones principales */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            {/* Tomar foto */}
            <button
              type="button"
              onClick={handleOpenCamera}
              className="flex flex-col items-center gap-3 rounded-2xl border-2 border-primary/20 bg-surface px-4 py-6 text-center transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
              >
                {/* Camera icon */}
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-dark font-sans">Tomar foto</span>
              <span className="text-xs text-neutral font-sans">Con la cámara del dispositivo</span>
            </button>

            {/* Subir imagen */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex flex-col items-center gap-3 rounded-2xl border-2 border-primary/20 bg-surface px-4 py-6 text-center transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
              >
                {/* Upload / image icon */}
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-dark font-sans">Subir imagen</span>
              <span className="text-xs text-neutral font-sans">JPG, PNG o WebP · Máx. 10 MB</span>
            </button>
          </div>

          {/* Input de archivo oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            onChange={handleFileChange}
            data-testid="file-input"
          />

          {/* Error de subida */}
          {uploadError && (
            <div className="mb-6">
              <ErrorMessage
                message={uploadError}
                onRetry={handleUploadClick}
                retryLabel="Elegir otra imagen"
              />
            </div>
          )}

          {/* Separador */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral/20" />
            <span className="text-xs font-medium uppercase tracking-wider text-neutral/50 font-sans">
              o explorar
            </span>
            <div className="h-px flex-1 bg-neutral/20" />
          </div>

          {/* Explorar manualmente */}
          <Link to="/biblioteca" className="block">
            <Button variant="secondary" size="md" className="w-full">
              Buscar sitio manualmente
            </Button>
          </Link>
        </div>
      )}

      {/* ── MODO: CÁMARA ACTIVA ─────────────────────────────────────────── */}
      {mode === 'camera' && (
        <div className="flex flex-1 flex-col bg-dark">
          {/* Barra superior */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={handleCloseCamera}
              aria-label="Cerrar cámara"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
            <p className="text-sm font-medium text-white/80 font-sans">
              Apuntá a un sitio, plato o danza boliviana
            </p>
            {/* Placeholder para simetría */}
            <div className="h-10 w-10" aria-hidden="true" />
          </div>

          {/* Error de cámara */}
          {camera.error && (
            <div className="px-4 py-2">
              <ErrorMessage
                message={camera.error}
                onRetry={camera.permissionDenied ? undefined : camera.startCamera}
                retryLabel="Reintentar"
                onSecondary={camera.permissionDenied ? handleUploadClick : undefined}
                secondaryLabel={camera.permissionDenied ? 'Subir imagen' : undefined}
              />
            </div>
          )}

          {/* Viewfinder */}
          {!camera.error && (
            <div className="relative flex-1 overflow-hidden">
              <CameraViewfinder
                videoRef={camera.videoRef}
                canvasRef={camera.canvasRef}
              />
            </div>
          )}

          {/* Controles de captura */}
          <div className="flex items-center justify-center py-8 bg-dark">
            <CaptureButton
              onClick={handleCapture}
              disabled={!camera.isActive || !!camera.error}
            />
          </div>
        </div>
      )}

      {/* ── MODO: PREVIEW ───────────────────────────────────────────────── */}
      {mode === 'preview' && previewUrl && (
        <div className="mx-auto flex w-full max-w-md flex-col px-5 py-6">
          {/* Botón volver */}
          <button
            type="button"
            onClick={handleBackToSelect}
            className="mb-5 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M9.78 4.22a.75.75 0 010 1.06L7.06 8l2.72 2.72a.75.75 0 11-1.06 1.06L5.47 8.53a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Volver a tomar
          </button>

          {/* Preview con overlay de análisis */}
          <div className="mb-6">
            <ImagePreview src={previewUrl} isAnalyzing={isAnalyzing} />
          </div>

          {/* Error de análisis */}
          {analysisError && !isAnalyzing && (
            <div className="mb-4">
              <ErrorMessage
                message={analysisError}
                onRetry={handleRetryAnalysis}
                retryLabel="Reintentar"
              />
            </div>
          )}

          {/* Botón analizar */}
          <Button
            variant="primary"
            size="lg"
            loading={isAnalyzing}
            onClick={handleAnalyze}
            className="mb-6 w-full"
            aria-label="Analizar imagen con la IA"
          >
            {isAnalyzing ? (
              'Analizando...'
            ) : (
              <>
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                </svg>
                Analizar imagen
              </>
            )}
          </Button>

          {/* Categorías detectables */}
          <CategoryBadges />
        </div>
      )}
    </main>
  )
}
