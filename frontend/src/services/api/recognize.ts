import type { RecognizePayload, RecognizeResponse } from '@/types'
import { apiClient } from './client'

/**
 * Implementación API real del servicio de reconocimiento
 * [PENDIENTE] Implementar cuando el backend NestJS esté listo
 *
 * Endpoint: POST /recognize
 */

export async function recognizeImage(payload: RecognizePayload): Promise<RecognizeResponse> {
  return apiClient.post<RecognizeResponse>('/recognize', payload)
}
