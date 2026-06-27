import { useRef, useState, useCallback, useEffect } from 'react'

export interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isActive: boolean
  startCamera: () => Promise<void>
  stopCamera: () => void
  capturePhoto: () => string | null // devuelve base64 sin prefijo data:...
  permissionDenied: boolean
  error: string | null
}

/**
 * useCamera — gestiona getUserMedia, captura de frames y limpieza del stream.
 *
 * - Usa cámara trasera por defecto (facingMode: 'environment').
 * - Limpia el stream al desmontar el componente.
 * - Distingue error de permiso denegado vs. cámara no disponible.
 */
export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [isActive, setIsActive] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsActive(false)
  }, [])

  const startCamera = useCallback(async () => {
    // Limpiar estado previo
    setError(null)
    setPermissionDenied(false)

    // Detener stream anterior si existe
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      }

      const newStream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = newStream

      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }

      setIsActive(true)
    } catch (err) {
      const e = err as Error
      setIsActive(false)

      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        setPermissionDenied(true)
        setError(
          'Necesitamos acceso a la cámara. Actívalo en la configuración del navegador.'
        )
      } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
        setError('No se encontró una cámara en este dispositivo.')
      } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError') {
        setError('La cámara está en uso por otra aplicación. Cerrala e intentá de nuevo.')
      } else {
        setError('No se pudo acceder a la cámara. Verificá los permisos del navegador.')
      }
    }
  }, [])

  /**
   * Captura el frame actual del video y devuelve la imagen en base64 (sin prefijo).
   * Devuelve null si el video o canvas no están disponibles.
   */
  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return null

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(video, 0, 0)

    // quality 0.8 para balance tamaño/calidad
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
    // Eliminar el prefijo "data:image/jpeg;base64,"
    return dataUrl.split(',')[1] ?? null
  }, [])

  // Cleanup al desmontar: liberar la cámara
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [])

  return {
    videoRef,
    canvasRef,
    isActive,
    startCamera,
    stopCamera,
    capturePhoto,
    permissionDenied,
    error,
  }
}
