import type {
  QuizQuestion,
  QuizRecommendationPayload,
  QuizRecommendation,
  QuizAnswer,
  QuizTip,
} from '@/types'
import { QUIZ_QUESTIONS } from '@/data/quizQuestions.mock'
import { SITES_MOCK } from '@/data/sites.mock'
import { mockDelay } from '@/lib/utils'

/**
 * Implementación MOCK del servicio de quiz
 * Endpoints reales:
 *   GET /quiz/questions
 *   POST /quiz/recommendation
 *   POST /quiz/resultado
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
  const hasPhoto = allTags.some((t) => ['fotografia', 'unico_en_el_mundo'].includes(t))

  if (hasHistory && hasAdventure) return 'Explorador cultural con espíritu aventurero'
  if (hasPhoto && hasAdventure) return 'Fotógrafo viajero y aventurero'
  if (hasHistory) return 'Viajero histórico y cultural'
  if (hasAdventure) return 'Aventurero de la naturaleza'
  if (hasGastro) return 'Explorador gastronómico'
  if (hasFestival) return 'Amante del folklore y las festividades'
  return 'Viajero curioso y ecléctico'
}

function buildTips(respuestas: QuizAnswer[]): QuizTip[] {
  const allTags = respuestas.flatMap((r) => r.etiquetas)
  const has = (tag: string) => allTags.includes(tag)
  const tips: QuizTip[] = []

  if (has('altiplano') || has('arqueologia')) {
    tips.push({
      titulo: 'Aclimatate antes de explorar',
      descripcion:
        'La Paz y el altiplano están a más de 3.600 m.s.n.m. Reservá las primeras 24–48 horas para aclimatarte. El mate de coca es tu mejor aliado contra el mal de altura.',
    })
  }

  if (has('fotografia') || has('unico_en_el_mundo')) {
    tips.push({
      titulo: 'Fotografía en el Salar',
      descripcion:
        'Para el efecto espejo en el Salar de Uyuni, viajá entre enero y abril. Llevá botas de goma — el agua puede llegar a los 30 cm. La hora azul al amanecer da las mejores tomas.',
    })
  }

  if (has('gastronomia') || has('cocina_andina') || has('picante')) {
    tips.push({
      titulo: 'Desayuná como boliviano',
      descripcion:
        'La salteña se come exclusivamente por la mañana (hasta las 11:00). En La Paz, el Mercado Lanza y el Mercado de las Brujas son paradas obligatorias para probar comida local a precios accesibles.',
    })
  }

  if (has('festividad') || has('carnaval') || has('danza')) {
    tips.push({
      titulo: 'Reservá con anticipación en Carnaval',
      descripcion:
        'El Carnaval de Oruro (febrero) es el mayor espectáculo folclórico de Bolivia. Los hoteles se agotan con 6 meses de anticipación. Si llegás sin reserva, hospedáte en ciudades cercanas.',
    })
  }

  if (has('historia') || has('patrimonio_unesco')) {
    tips.push({
      titulo: 'Pasaporte de sitios UNESCO',
      descripcion:
        'Bolivia tiene 7 sitios Patrimonio de la Humanidad. Tiwanaku, Sucre, Potosí y el Carnaval de Oruro son los más accesibles. Los guías locales certificados enriquecen enormemente la visita.',
    })
  }

  // Tips universales de relleno
  if (tips.length < 2) {
    tips.push({
      titulo: 'Temperatura: siempre llevá capas',
      descripcion:
        'Bolivia tiene climas extremos según la altitud. En el altiplano puede hacer 25°C al mediodía y bajar a -5°C de noche. Vestite en capas y llevá siempre una chaqueta impermeable.',
    })
    tips.push({
      titulo: 'Moneda y pagos',
      descripcion:
        'El boliviano (BOB) es la moneda local. En mercados y sitios rurales es imprescindible el efectivo. Los cajeros en aeropuertos y centros comerciales cobran menos comisión.',
    })
  }

  return tips.slice(0, 4)
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
    tips: buildTips(payload.respuestas),
  }
}
