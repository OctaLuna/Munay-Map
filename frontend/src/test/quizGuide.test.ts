import { describe, it, expect } from 'vitest'
import { getQuizRecommendation } from '@/services/mock/quiz'
import type { QuizAnswer } from '@/types'

const adventurer: QuizAnswer[] = [
  { questionId: 'q1', selectedOptionId: 'q1-d', etiquetas: ['paisaje', 'fotografia', 'unico_en_el_mundo'] },
  { questionId: 'q2', selectedOptionId: 'q2-d', etiquetas: ['aventura', 'ecoturismo', 'naturaleza'] },
  { questionId: 'q3', selectedOptionId: 'q3-c', etiquetas: ['unico_en_el_mundo', 'aventura', 'fotografia'] },
  { questionId: 'q4', selectedOptionId: 'q4-b', etiquetas: ['fotografia', 'paisaje', 'unico_en_el_mundo'] },
  { questionId: 'q5', selectedOptionId: 'q5-b', etiquetas: ['paisaje', 'relax', 'unico_en_el_mundo'] },
  { questionId: 'q6', selectedOptionId: 'q6-d', etiquetas: ['unico_en_el_mundo', 'relax', 'fotografia'] },
  { questionId: 'q7', selectedOptionId: 'q7-a', etiquetas: ['fotografia', 'naturaleza', 'altiplano'] },
  { questionId: 'q8', selectedOptionId: 'q8-c', etiquetas: ['gastronomia', 'aventura', 'mercado'] },
  { questionId: 'q9', selectedOptionId: 'q9-c', etiquetas: ['carnaval', 'danza', 'festividad'] },
]

describe('getQuizRecommendation — guía personalizada completa', () => {
  it('genera un itinerario coherente con la duración sugerida', async () => {
    const r = await getQuizRecommendation({ respuestas: adventurer, idioma: 'es' })

    expect(Array.isArray(r.itinerario)).toBe(true)
    expect(r.itinerario!.length).toBeGreaterThan(0)
    expect(r.duracionSugeridaDias).toBe(r.itinerario!.length)

    r.itinerario!.forEach((dia, i) => {
      expect(dia.dia).toBe(i + 1)
      expect(dia.siteId.length).toBeGreaterThan(0)
      expect(dia.nombreSitio.length).toBeGreaterThan(0)
      expect(dia.titulo.length).toBeGreaterThan(0)
      expect(dia.region.length).toBeGreaterThan(0)
    })
  })

  it('los días del itinerario respetan el orden geográfico (menor traslado)', async () => {
    const r = await getQuizRecommendation({ respuestas: adventurer, idioma: 'es' })
    const order = ['la paz', 'oruro', 'cochabamba', 'chuquisaca', 'potosi', 'tarija', 'santa cruz', 'beni', 'pando']
    const idx = (region: string) =>
      order.indexOf(region.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    const indices = r.itinerario!.map((d) => idx(d.region))
    const sorted = [...indices].sort((a, b) => a - b)
    expect(indices).toEqual(sorted)
  })

  it('deriva el presupuesto de la respuesta q6 (q6-d → Premium)', async () => {
    const r = await getQuizRecommendation({ respuestas: adventurer, idioma: 'es' })
    expect(r.presupuesto?.nivel).toBe('Premium')
    expect(r.presupuesto?.rangoDiarioUsd.length).toBeGreaterThan(0)
  })

  it('deriva la mejor época de la respuesta q9 (q9-c → Carnaval)', async () => {
    const r = await getQuizRecommendation({ respuestas: adventurer, idioma: 'es' })
    expect(r.mejorEpoca).toMatch(/Carnaval/i)
  })

  it('expone los intereses dominantes y un resumen de perfil', async () => {
    const r = await getQuizRecommendation({ respuestas: adventurer, idioma: 'es' })
    expect(Array.isArray(r.intereses)).toBe(true)
    expect(r.intereses!.length).toBeGreaterThan(0)
    expect(typeof r.resumenPerfil).toBe('string')
    expect(r.resumenPerfil!.length).toBeGreaterThan(0)
  })

  it('mantiene compatibilidad: lugares, gastronomía, experiencias y tips siguen presentes', async () => {
    const r = await getQuizRecommendation({ respuestas: adventurer, idioma: 'es' })
    expect(r.lugares.length).toBeGreaterThan(0)
    expect(r.gastronomia.length).toBeGreaterThan(0)
    expect(r.experiencias.length).toBeGreaterThan(0)
    expect(r.tips.length).toBeGreaterThan(0)
  })
})
