import { useMutation } from '@tanstack/react-query'
import type { RecognizePayload, RecognizeResponse } from '@/types'
import { USE_MOCK_DATA } from '@/lib/featureFlags'

const { recognizeImage: recognizeImageFn } = USE_MOCK_DATA
  ? await import('@/services/mock/recognize')
  : await import('@/services/api/recognize')

/**
 * Mutación para reconocimiento de imagen con IA
 * Usado en el flujo de Cámara: CameraView → Processing → Result
 */
export function useRecognizeImage() {
  return useMutation<RecognizeResponse, Error, RecognizePayload>({
    mutationFn: recognizeImageFn,
  })
}
