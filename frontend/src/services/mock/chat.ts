import type { AskGuidePayload, AskGuideResponse } from '@/types'
import { mockDelay } from '@/lib/utils'

/**
 * Implementación MOCK del servicio de chat con el guía IA
 * Endpoint real futuro: POST /chat/ask
 */

const RESPUESTAS_MOCK: string[] = [
  'El Salar de Uyuni es especialmente impresionante en la época de lluvias (diciembre a abril), cuando una fina capa de agua lo convierte en el espejo más grande del mundo. ¡Es una experiencia única que vale la pena planificar!',
  'Para visitar Tiwanaku te recomiendo ir temprano en la mañana para evitar el sol intenso del altiplano. La entrada al complejo arqueológico incluye el Museo Lítico donde está la monolito Bennett, ¡mide 7,3 metros!',
  'La mejor época para el Carnaval de Oruro es en febrero. Es recomendable conseguir boletos con anticipación ya que atrae a más de 400.000 visitantes. La entrada oficial a la Fraternidad cuesta alrededor de 150 bolivianos.',
  'Para subir al Salar, la temperatura puede bajar a -10°C de noche en época seca (mayo-noviembre). Llevá ropa de abrigo, bloqueador solar de alto FPS (el reflejo de la sal quema mucho) y gafas de sol.',
  'El chuño se puede probar en cualquier mercado de La Paz. El Mercado de las Brujas en la calle Linares es ideal para conocer la cultura aymara y probar productos tradicionales.',
]

export async function askGuide(payload: AskGuidePayload): Promise<AskGuideResponse> {
  // Simula tiempo de respuesta de LLM
  await mockDelay(1500)

  // Mock: devuelve una respuesta aleatoria de las predefinidas
  const index = Math.floor(Math.random() * RESPUESTAS_MOCK.length)
  const respuesta = RESPUESTAS_MOCK[index] ?? RESPUESTAS_MOCK[0] ?? ''

  return {
    respuesta,
    idioma: payload.idioma,
    // [PENDIENTE] Audio generado por TTS
    audioUrl: null,
  }
}
