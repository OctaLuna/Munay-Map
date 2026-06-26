import { useQuery, useMutation, queryOptions } from '@tanstack/react-query'
import type { QuizQuestion, QuizRecommendationPayload, QuizRecommendation } from '@/types'
import { USE_MOCK_DATA } from '@/lib/featureFlags'

const { getQuizQuestions: getQuizQuestionsFn, getQuizRecommendation: getQuizRecommendationFn } =
  USE_MOCK_DATA
    ? await import('@/services/mock/quiz')
    : await import('@/services/api/quiz')

// ─── Query Options ────────────────────────────────────────────────────────

export const quizQuestionsQueryOptions = queryOptions<QuizQuestion[]>({
  queryKey: ['quiz-questions'],
  queryFn: getQuizQuestionsFn,
  staleTime: Infinity, // Las preguntas no cambian durante la sesión
})

// ─── Hooks ────────────────────────────────────────────────────────────────

/** Obtiene las preguntas del quiz */
export function useQuizQuestions() {
  return useQuery(quizQuestionsQueryOptions)
}

/** Envía las respuestas y obtiene la recomendación personalizada */
export function useQuizRecommendation() {
  return useMutation<QuizRecommendation, Error, QuizRecommendationPayload>({
    mutationFn: getQuizRecommendationFn,
  })
}
