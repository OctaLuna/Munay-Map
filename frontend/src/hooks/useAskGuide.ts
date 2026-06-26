import { useMutation } from '@tanstack/react-query'
import type { AskGuidePayload, AskGuideResponse } from '@/types'
import { USE_MOCK_DATA } from '@/lib/featureFlags'

const { askGuide: askGuideFn } = USE_MOCK_DATA
  ? await import('@/services/mock/chat')
  : await import('@/services/api/chat')

/**
 * Mutación para preguntar al guía IA
 * Devuelve una respuesta generada en el idioma seleccionado
 */
export function useAskGuide() {
  return useMutation<AskGuideResponse, Error, AskGuidePayload>({
    mutationFn: askGuideFn,
  })
}
