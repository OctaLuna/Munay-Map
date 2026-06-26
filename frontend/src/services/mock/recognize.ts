import type { RecognizePayload, RecognizeResponse } from '@/types'
import { SITES_MOCK } from '@/data/sites.mock'
import { mockDelay } from '@/lib/utils'

/**
 * Implementación MOCK del servicio de reconocimiento de imágenes
 * Endpoint real futuro: POST /recognize
 */

export async function recognizeImage(payload: RecognizePayload): Promise<RecognizeResponse> {
  // Simula tiempo de procesamiento de IA (más largo, es reconocimiento)
  await mockDelay(1800)

  // Mock: devuelve Tiwanaku con 80% de confianza cuando hay imagen válida
  // En la app real, la IA identifica el sitio a partir de la foto
  const mockSite = SITES_MOCK.find((s) => s.id === 'tiwanaku')

  if (!mockSite) {
    return {
      site: null,
      explicacion: '',
      idioma: payload.idioma,
      audioUrl: null,
      confianza: 0,
    }
  }

  const explicaciones: Record<string, string> = {
    es: `Estás frente a **${mockSite.nombre}**, una de las civilizaciones más fascinantes del mundo andino. ${mockSite.descripcionBaseEs}`,
    en: `You are standing before **${mockSite.nombre}**, one of the most fascinating civilizations in the Andean world. This UNESCO World Heritage site reached its peak between 300 and 1000 AD.`,
    ja: `あなたは**${mockSite.nombre}**の前に立っています。これはアンデス世界で最も魅力的な文明の一つです。ユネスコ世界遺産に登録されており、300年から1000年にかけて最盛期を迎えました。`,
    fr: `Vous vous trouvez devant **${mockSite.nombre}**, l'une des civilisations les plus fascinantes du monde andin. Ce site du patrimoine mondial de l'UNESCO a atteint son apogée entre 300 et 1000 après J.-C.`,
    de: `Sie stehen vor **${mockSite.nombre}**, einer der faszinierendsten Zivilisationen der andinen Welt. Diese UNESCO-Welterbestätte erlebte ihre Blütezeit zwischen 300 und 1000 n. Chr.`,
    pt: `Você está diante de **${mockSite.nombre}**, uma das civilizações mais fascinantes do mundo andino. Este Patrimônio Mundial da UNESCO atingiu seu apogeu entre 300 e 1000 d.C.`,
  }

  const explicacion =
    (payload.idioma in explicaciones
      ? explicaciones[payload.idioma as keyof typeof explicaciones]
      : explicaciones['es']) ?? explicaciones['es'] ?? ''

  return {
    site: mockSite,
    explicacion,
    idioma: payload.idioma,
    // [PENDIENTE] URL de audio real generado por TTS — por ahora null
    audioUrl: null,
    confianza: 0.82,
  }
}
