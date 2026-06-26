import type { QuizQuestion, QuizRecommendationPayload, QuizRecommendation } from '@/types'
import { apiClient } from './client'

/**
 * Implementación API real del servicio de quiz
 * [PENDIENTE] Implementar cuando el backend NestJS esté listo
 *
 * Endpoints:
 *   GET /quiz/questions
 *   POST /quiz/recommendation
 */

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  return apiClient.get<QuizQuestion[]>('/quiz/questions')
}

export async function getQuizRecommendation(
  payload: QuizRecommendationPayload
): Promise<QuizRecommendation> {
  return apiClient.post<QuizRecommendation>('/quiz/recommendation', payload)
}
