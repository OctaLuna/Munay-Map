import { useState, useCallback } from 'react'
import type { RecognizeResponse } from '@/types'
import { DEMO_RESULTS } from '@/data/demoRecognize'
import { mockDelay } from '@/lib/utils'

export interface UseImageAnalysisReturn {
  analyze: (imageBase64: string, idioma: string) => Promise<RecognizeResponse>
  isLoading: boolean
  error: string | null
  reset: () => void
}

/**
 * Índice del resultado demo que se mostrará en esta sesión de página.
 * Se incrementa globalmente para que cada carga de página alterne entre
 * Puerta del Sol (índice 0) y Salar de Uyuni (índice 1).
 */
let demoIndex = 0

/**
 * useImageAnalysis — flujo demo hardcodeado.
 * Alterna entre Puerta del Sol y Salar de Uyuni en cada carga de página,
 * simulando el tiempo de respuesta real de Vision AI + Gemini.
 */
export function useImageAnalysis(): UseImageAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setError(null)
    setIsLoading(false)
  }, [])

  const analyze = useCallback(
    async (_imageBase64: string, _idioma: string): Promise<RecognizeResponse> => {
      setIsLoading(true)
      setError(null)

      try {
        // Simular el tiempo de procesamiento de Vision AI + Gemini (~2.5 s)
        await mockDelay(2500)

        // Seleccionar el resultado demo y avanzar el índice para la próxima llamada
        const result = DEMO_RESULTS[demoIndex % DEMO_RESULTS.length]!
        demoIndex++

        return result
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error desconocido'
        setError(msg)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { analyze, isLoading, error, reset }
}
