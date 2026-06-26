import type {
  QuizQuestion,
  QuizRecommendationPayload,
  QuizRecommendation,
  QuizAnswer,
} from '@/types'
import { QUIZ_QUESTIONS } from '@/data/quizQuestions.mock'
import { SITES_MOCK } from '@/data/sites.mock'
import { mockDelay } from '@/lib/utils'

/**
 * Implementación MOCK del servicio de quiz
 * Endpoints reales futuros:
 *   GET /quiz/questions
 *   POST /quiz/recommendation
 */

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  await mockDelay(200)
  return QUIZ_QUESTIONS
}

/**
 * Tag-matching: acumula las etiquetas de todas las respuestas y
 * puntúa cada sitio según cuántas etiquetas comparte con el perfil del viajero.
 */
function scoreMatching(etiquetasPerfil: string[], siteEtiquetas: string[]): number {
  return siteEtiquetas.filter((t) => etiquetasPerfil.includes(t)).length
}

function buildPerfilText(respuestas: QuizAnswer[]): string {
  const allTags = respuestas.flatMap((r) => r.etiquetas)
  const hasHistory = allTags.some((t) =>
    ['historia', 'arqueologia', 'patrimonio_unesco'].includes(t)
  )
  const hasAdventure = allTags.some((t) => ['aventura', 'naturaleza'].includes(t))
  const hasGastro = allTags.some((t) => ['gastronomia', 'cocina_andina'].includes(t))
  const hasFestival = allTags.some((t) => ['festividad', 'danza', 'folklore'].includes(t))

  if (hasHistory && hasAdventure) return 'Explorador cultural con espíritu aventurero'
  if (hasHistory) return 'Viajero histórico y cultural'
  if (hasAdventure) return 'Aventurero de la naturaleza'
  if (hasGastro) return 'Explorador gastronómico'
  if (hasFestival) return 'Amante del folklore y las festividades'
  return 'Viajero curioso y ecléctico'
}

export async function getQuizRecommendation(
  payload: QuizRecommendationPayload
): Promise<QuizRecommendation> {
  await mockDelay(1200)

  const etiquetasPerfil = payload.respuestas.flatMap((r) => r.etiquetas)

  const sitiosTuristicos = SITES_MOCK.filter((s) => s.categoria === 'sitio_turistico')
  const gastronomia = SITES_MOCK.filter((s) => s.categoria === 'gastronomia')
  const experiencias = SITES_MOCK.filter(
    (s) => s.categoria === 'danza' || s.categoria === 'tradicion_festividad'
  )

  const rank = (sites: typeof SITES_MOCK) =>
    [...sites]
      .map((s) => ({ site: s, score: scoreMatching(etiquetasPerfil, s.etiquetas) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.site)

  return {
    lugares: rank(sitiosTuristicos),
    gastronomia: rank(gastronomia),
    experiencias: rank(experiencias),
    perfilViajero: buildPerfilText(payload.respuestas),
  }
}
