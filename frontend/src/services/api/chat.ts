import type { AskGuidePayload, AskGuideResponse } from '@/types'
import { apiClient } from './client'

/**
 * Implementación API real del servicio de chat con guía IA
 * [PENDIENTE] Implementar cuando el backend NestJS esté listo
 *
 * Endpoint: POST /chat/ask
 */

export async function askGuide(payload: AskGuidePayload): Promise<AskGuideResponse> {
  return apiClient.post<AskGuideResponse>('/chat/ask', payload)
}
