import { useState, useCallback } from 'react'
import type { RecognizeResponse } from '@/types'
import { USE_MOCK_DATA } from '@/lib/featureFlags'

export interface UseImageAnalysisReturn {
  analyze: (imageBase64: string, idioma: string) => Promise<RecognizeResponse>
  isLoading: boolean
  error: string | null
  reset: () => void
}

/**
 * useImageAnalysis — llama al endpoint /recognize y gestiona el estado de carga/error.
 *
 * Respeta el flag USE_MOCK_DATA: en modo mock usa el servicio local,
 * en producción llama al backend NestJS.
 */
export function useImageAnalysis(): UseImageAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setError(null)
    setIsLoading(false)
  }, [])

  const analyze = useCallback(
    async (imageBase64: string, idioma: string): Promise<RecognizeResponse> => {
      setIsLoading(true)
      setError(null)

      try {
        let result: RecognizeResponse

        if (USE_MOCK_DATA) {
          // En modo mock importamos el servicio local (sin red)
          const { recognizeImage } = await import('@/services/mock/recognize')
          result = await recognizeImage({ imageBase64, idioma })
        } else {
          // BASE_URL vacío → same-origin (Vite proxy en dev, misma URL en prod)
          const BASE_URL =
            (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? ''

          const response = await fetch(`${BASE_URL}/recognize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64, idioma }),
          })

          if (!response.ok) {
            if (response.status >= 500) {
              throw new Error('server')
            }
            throw new Error(`http_${response.status}`)
          }

          result = (await response.json()) as RecognizeResponse
        }

        return result
      } catch (err) {
        let msg: string

        if (err instanceof TypeError && err.message.includes('fetch')) {
          // TypeError de fetch suele indicar sin conexión / CORS
          msg = 'Sin conexión. Verificá tu internet e intentá de nuevo.'
        } else if (err instanceof Error && err.message === 'server') {
          msg = 'No se pudo analizar la imagen. Intentá de nuevo.'
        } else {
          msg = 'No se pudo analizar la imagen. Verificá tu conexión e intentá de nuevo.'
        }

        setError(msg)
        throw new Error(msg)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { analyze, isLoading, error, reset }
}
