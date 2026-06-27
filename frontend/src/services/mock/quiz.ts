import type {
  QuizQuestion,
  QuizRecommendationPayload,
  QuizRecommendation,
  QuizAnswer,
  QuizTip,
  QuizPresupuesto,
  ItinerarioDia,
  Site,
} from '@/types'
import { QUIZ_QUESTIONS } from '@/data/quizQuestions.mock'
import { SITES_MOCK } from '@/data/sites.mock'
import { mockDelay } from '@/lib/utils'

// ─── Guía personalizada: constantes y helpers compartidos con el backend ────

const REGION_SEQUENCE = [
  'la paz', 'oruro', 'cochabamba', 'chuquisaca',
  'potosi', 'tarija', 'santa cruz', 'beni', 'pando',
]

function normalizeRegion(dep: string): string {
  return dep.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function regionIndex(dep: string): number {
  const i = REGION_SEQUENCE.indexOf(normalizeRegion(dep))
  return i === -1 ? 99 : i
}

const DAY_THEMES: Record<string, string> = {
  arqueologia: 'Raíces milenarias',
  historia: 'Huellas del pasado',
  patrimonio_unesco: 'Patrimonio de la humanidad',
  naturaleza: 'Naturaleza en estado puro',
  paisaje: 'Paisajes de otro planeta',
  unico_en_el_mundo: 'Lo único en el mundo',
  fotografia: 'En busca de la toma perfecta',
  aventura: 'Aventura en el altiplano',
  espiritualidad: 'Conexión espiritual',
  cultura_aymara: 'Sabiduría aymara',
  festividad: 'Color y folklore',
  danza: 'Ritmo y tradición',
  folklore: 'Alma del folklore',
  gastronomia: 'Sabores de Bolivia',
  cultura: 'Inmersión cultural',
}

const DAY_TIPS: Record<string, string> = {
  altiplano: 'Estás a gran altura: hidratate, caminá despacio y tené a mano mate de coca.',
  arqueologia: 'Contratá un guía local certificado: el contexto histórico transforma la visita.',
  fotografia: 'La luz del amanecer y el atardecer (hora dorada) regala las mejores tomas.',
  naturaleza: 'Llevá protector solar, gafas y ropa en capas: el clima andino cambia rápido.',
  festividad: 'Confirmá fechas de festividades con anticipación: definen el ambiente del día.',
  gastronomia: 'Animate a comer en mercados locales: es barato, auténtico y delicioso.',
  espiritualidad: 'Pedí permiso antes de fotografiar ceremonias y respetá los espacios sagrados.',
}

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

function countEtiquetas(respuestas: QuizAnswer[]): Record<string, number> {
  return respuestas
    .flatMap((r) => r.etiquetas)
    .reduce<Record<string, number>>((acc, e) => {
      acc[e] = (acc[e] ?? 0) + 1
      return acc
    }, {})
}

/** Itinerario optimizado: ordena por región y enlaza comida/experiencia por día. */
function buildItinerario(
  backbone: Site[],
  gastroPool: Site[],
  expPool: Site[],
  etiquetaCounts: Record<string, number>
): ItinerarioDia[] {
  const ordered = [...backbone].sort(
    (a, b) => regionIndex(a.departamento) - regionIndex(b.departamento)
  )

  const usedGastro = new Set<string>()
  const usedExp = new Set<string>()

  const pick = (pool: Site[], region: string, used: Set<string>): Site | undefined => {
    const norm = normalizeRegion(region)
    const sameRegion = pool.find((s) => normalizeRegion(s.departamento) === norm && !used.has(s.id))
    const chosen = sameRegion ?? pool.find((s) => !used.has(s.id)) ?? pool[0]
    if (chosen) used.add(chosen.id)
    return chosen
  }

  return ordered.map((site, idx) => {
    const primaryTag =
      [...site.etiquetas].sort(
        (a, b) => (etiquetaCounts[b] ?? 0) - (etiquetaCounts[a] ?? 0)
      )[0] ?? ''

    const comidaSite = pick(gastroPool, site.departamento, usedGastro)
    const expSite = pick(expPool, site.departamento, usedExp)

    const dia: ItinerarioDia = {
      dia: idx + 1,
      titulo: DAY_THEMES[primaryTag] ?? 'Día de descubrimiento',
      region: site.departamento,
      siteId: site.id,
      nombreSitio: site.nombre,
      imagenUrl: site.imagenUrl,
      descripcion: site.descripcionCorta,
    }
    if (comidaSite) dia.comida = `Probá ${comidaSite.nombre}: ${comidaSite.descripcionCorta}`
    if (expSite) dia.experiencia = `No te pierdas ${expSite.nombre}.`
    const consejo = DAY_TIPS[primaryTag]
    if (consejo) dia.consejo = consejo
    return dia
  })
}

function buildPresupuesto(respuestas: QuizAnswer[]): QuizPresupuesto {
  const ans = respuestas.find((r) => r.questionId === 'q6')
  const map: Record<string, QuizPresupuesto> = {
    'q6-a': {
      nivel: 'Económico',
      rangoDiarioUsd: 'Hasta $30 USD/día',
      descripcion:
        'Hostales, transporte público y comida de mercado. Bolivia es uno de los destinos más accesibles de Sudamérica.',
    },
    'q6-b': {
      nivel: 'Moderado',
      rangoDiarioUsd: '$30–$80 USD/día',
      descripcion:
        'Hoteles cómodos, tours grupales y restaurantes locales. El equilibrio ideal entre precio y experiencia.',
    },
    'q6-c': {
      nivel: 'Cómodo',
      rangoDiarioUsd: '$80–$150 USD/día',
      descripcion: 'Hoteles boutique, tours privados y la mejor gastronomía, sin extravagancias.',
    },
    'q6-d': {
      nivel: 'Premium',
      rangoDiarioUsd: 'Más de $150 USD/día',
      descripcion:
        'Hoteles de sal de lujo, vuelos internos y guías privados certificados. La experiencia más exclusiva.',
    },
  }
  return map[ans?.selectedOptionId ?? ''] ?? map['q6-b']!
}

function buildMejorEpoca(respuestas: QuizAnswer[], etiquetaCounts: Record<string, number>): string {
  const ans = respuestas.find((r) => r.questionId === 'q9')
  const map: Record<string, string> = {
    'q9-a': 'Diciembre–Marzo · temporada de lluvias, el Salar se vuelve un espejo perfecto',
    'q9-b': 'Junio–Agosto · temporada seca, cielos despejados ideales para el altiplano',
    'q9-c': 'Febrero · Carnaval de Oruro, el mayor espectáculo folclórico del país',
    'q9-d': 'Todo el año · cada temporada ofrece su propia magia',
  }
  if (ans && map[ans.selectedOptionId]) return map[ans.selectedOptionId]!

  const has = (t: string) => (etiquetaCounts[t] ?? 0) > 0
  if (has('carnaval') || has('festividad') || has('danza'))
    return 'Febrero · Carnaval de Oruro, el mayor espectáculo folclórico del país'
  if (has('fotografia') || has('unico_en_el_mundo'))
    return 'Enero–Abril · el Salar de Uyuni con su famoso efecto espejo'
  if (has('aventura') || has('arqueologia'))
    return 'Mayo–Octubre · temporada seca, ideal para senderismo y altiplano'
  return 'Todo el año · cada temporada ofrece su propia magia'
}

function buildResumenPerfil(topTags: string[], dias: number): string {
  const labels: Record<string, string> = {
    aventura: 'la aventura', naturaleza: 'la naturaleza', fotografia: 'la fotografía',
    historia: 'la historia', arqueologia: 'la arqueología', gastronomia: 'la gastronomía',
    festividad: 'las festividades', danza: 'el folklore', espiritualidad: 'la espiritualidad',
    paisaje: 'los paisajes', cultura: 'la cultura viva', altiplano: 'el altiplano',
  }
  const intereses = topTags.map((t) => labels[t]).filter(Boolean).slice(0, 3)
  const lista =
    intereses.length > 1
      ? `${intereses.slice(0, -1).join(', ')} y ${intereses[intereses.length - 1]}`
      : (intereses[0] ?? 'descubrir Bolivia')
  return `Diseñamos para vos una guía de ${dias} ${dias === 1 ? 'día' : 'días'} centrada en ${lista}, optimizada para recorrer Bolivia con el menor traslado posible.`
}

export async function getQuizRecommendation(
  payload: QuizRecommendationPayload
): Promise<QuizRecommendation> {
  await mockDelay(1200)

  const etiquetasPerfil = payload.respuestas.flatMap((r) => r.etiquetas)
  const etiquetaCounts = countEtiquetas(payload.respuestas)

  const sitiosTuristicos = SITES_MOCK.filter((s) => s.categoria === 'sitio_turistico')
  const gastronomiaSites = SITES_MOCK.filter((s) => s.categoria === 'gastronomia')
  const experienciasSites = SITES_MOCK.filter(
    (s) => s.categoria === 'danza' || s.categoria === 'tradicion_festividad'
  )

  const rankFull = (sites: Site[]) =>
    [...sites]
      .map((s) => ({ site: s, score: scoreMatching(etiquetasPerfil, s.etiquetas) }))
      .sort((a, b) => b.score - a.score)

  const lugaresRanked = rankFull(sitiosTuristicos)
  const gastroRanked = rankFull(gastronomiaSites)
  const expRanked = rankFull(experienciasSites)

  const lugares = lugaresRanked.slice(0, 3).map((x) => x.site)
  const gastronomia = gastroRanked.slice(0, 3).map((x) => x.site)
  const experiencias = expRanked.slice(0, 3).map((x) => x.site)

  // Backbone del itinerario: hasta 4 lugares con afinidad (score > 0); respaldo a destacados
  let backbone = lugaresRanked.filter((x) => x.score > 0).slice(0, 4).map((x) => x.site)
  if (backbone.length === 0) {
    backbone = [...sitiosTuristicos]
      .sort((a, b) => Number(b.destacado ?? false) - Number(a.destacado ?? false))
      .slice(0, 3)
  }

  const itinerario = buildItinerario(
    backbone,
    gastroRanked.map((x) => x.site),
    expRanked.map((x) => x.site),
    etiquetaCounts
  )

  const topTags = Object.entries(etiquetaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([e]) => e)

  return {
    lugares,
    gastronomia,
    experiencias,
    perfilViajero: buildPerfilText(payload.respuestas),
    tips: buildTips(payload.respuestas),
    resumenPerfil: buildResumenPerfil(topTags, itinerario.length),
    intereses: topTags,
    duracionSugeridaDias: itinerario.length,
    mejorEpoca: buildMejorEpoca(payload.respuestas, etiquetaCounts),
    presupuesto: buildPresupuesto(payload.respuestas),
    itinerario,
  }
}
