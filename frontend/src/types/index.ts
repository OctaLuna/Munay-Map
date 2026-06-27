/**
 * types/index.ts — Tipos centrales del dominio
 *
 * Estas interfaces están alineadas con los contratos del backend NestJS futuro.
 * Al conectar el backend real, los tipos no deberían cambiar — solo las
 * implementaciones en services/api/.
 */

// ---------------------------------------------------------------------------
// Catálogo de sitios y patrimonio
// ---------------------------------------------------------------------------

export type SiteTipo = 'sitio' | 'patrimonio_inmaterial'

export type SiteCategoria =
  | 'sitio_turistico'
  | 'gastronomia'
  | 'danza'
  | 'tradicion_festividad'

export type Departamento =
  | 'La Paz'
  | 'Oruro'
  | 'Potosí'
  | 'Cochabamba'
  | 'Santa Cruz'
  | 'Beni'
  | 'Pando'
  | 'Tarija'
  | 'Chuquisaca'

export interface Coordenadas {
  lat: number
  lng: number
}

export interface Site {
  id: string
  tipo: SiteTipo
  categoria: SiteCategoria
  nombre: string
  departamento: Departamento
  coordenadas?: Coordenadas
  descripcionBaseEs: string
  descripcionCorta: string
  imagenUrl: string
  etiquetas: string[]
  destacado?: boolean
}

export interface CulturalAsset {
  id: string
  siteId: string
  tipo: 'imagen' | 'audio' | 'video'
  url: string
  altText?: string
  duracionSegundos?: number
}

// ---------------------------------------------------------------------------
// Filtros de búsqueda
// ---------------------------------------------------------------------------

export interface SiteFilters {
  departamento?: Departamento | 'todos'
  categoria?: SiteCategoria | 'todas'
  busqueda?: string
}

// ---------------------------------------------------------------------------
// Reconocimiento de imágenes (flujo Cámara)
// ---------------------------------------------------------------------------

export interface RecognizePayload {
  imageBase64: string
  idioma: string // Código BCP-47, ej. 'es', 'en', 'ja'
}

export interface RecognizeResponse {
  site: Site | null
  explicacion: string
  idioma: string
  audioUrl: string | null
  confianza: number // 0–1, para decidir si mostrar NotRecognized
}

// ---------------------------------------------------------------------------
// Chat / guía conversacional
// ---------------------------------------------------------------------------

export interface AskGuidePayload {
  pregunta: string
  idioma: string
  siteId?: string // contexto opcional si se pregunta sobre un sitio específico
}

export interface AskGuideResponse {
  respuesta: string
  idioma: string
  audioUrl: string | null
}

export interface ChatMessage {
  id: string
  rol: 'usuario' | 'guia'
  contenido: string
  timestamp: Date
}

// ---------------------------------------------------------------------------
// Quiz de recomendación
// ---------------------------------------------------------------------------

export type QuizOptionId = string

export interface QuizOption {
  id: QuizOptionId
  texto: string
  etiquetas: string[] // etiquetas que se suman al perfil del viajero
}

export interface QuizQuestion {
  id: string
  orden: number
  pregunta: string
  opciones: QuizOption[]
}

export interface QuizAnswer {
  questionId: string
  selectedOptionId: QuizOptionId
  etiquetas: string[] // etiquetas de la opción seleccionada
}

export interface QuizRecommendationPayload {
  respuestas: QuizAnswer[]
  idioma: string
}

export interface QuizTip {
  titulo: string
  descripcion: string
}

export interface QuizRecommendation {
  lugares: Site[]       // sitios turísticos que coinciden con el perfil
  gastronomia: Site[]   // experiencias gastronómicas recomendadas
  experiencias: Site[]  // danzas, festividades y tradiciones recomendadas
  perfilViajero: string // descripción textual del perfil detectado
  tips: QuizTip[]       // consejos prácticos personalizados según el perfil
}

// ---------------------------------------------------------------------------
// Idiomas
// ---------------------------------------------------------------------------

export interface Language {
  code: string   // BCP-47, ej. 'es', 'en', 'ja', 'pt-BR'
  nombre: string // Nombre en el idioma nativo
  nombreEs: string // Nombre en español para el selector
  bandera?: string // Emoji de bandera
}
