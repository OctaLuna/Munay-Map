import { describe, it, expect } from 'vitest'
import { getQuizRecommendation } from '@/services/mock/quiz'
import type { QuizAnswer } from '@/types'

describe('getQuizRecommendation — tag matching', () => {
  it('devuelve lugares, gastronomía, experiencias y tips para un viajero aventurero', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1', selectedOptionId: 'q1-a', etiquetas: ['altiplano', 'naturaleza', 'paisaje'] },
      { questionId: 'q2', selectedOptionId: 'q2-d', etiquetas: ['aventura', 'ecoturismo', 'naturaleza'] },
      { questionId: 'q3', selectedOptionId: 'q3-c', etiquetas: ['unico_en_el_mundo', 'aventura', 'fotografia'] },
      { questionId: 'q4', selectedOptionId: 'q4-a', etiquetas: ['aventura', 'naturaleza', 'ecoturismo'] },
      { questionId: 'q5', selectedOptionId: 'q5-a', etiquetas: ['aventura', 'espiritualidad', 'fotografia'] },
      { questionId: 'q6', selectedOptionId: 'q6-b', etiquetas: ['cultura', 'gastronomia', 'aventura'] },
      { questionId: 'q7', selectedOptionId: 'q7-a', etiquetas: ['fotografia', 'naturaleza', 'altiplano'] },
      { questionId: 'q8', selectedOptionId: 'q8-c', etiquetas: ['gastronomia', 'aventura', 'mercado'] },
      { questionId: 'q9', selectedOptionId: 'q9-b', etiquetas: ['arqueologia', 'altiplano', 'aventura'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    expect(result.lugares.length).toBeGreaterThan(0)
    expect(result.gastronomia.length).toBeGreaterThan(0)
    expect(result.experiencias.length).toBeGreaterThan(0)
    expect(result.perfilViajero.length).toBeGreaterThan(0)
    expect(Array.isArray(result.tips)).toBe(true)
    expect(result.tips.length).toBeGreaterThan(0)
  })

  it('el Salar de Uyuni aparece entre los lugares recomendados para un viajero fotógrafo/aventurero', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1', selectedOptionId: 'q1-d', etiquetas: ['paisaje', 'fotografia', 'unico_en_el_mundo'] },
      { questionId: 'q2', selectedOptionId: 'q2-d', etiquetas: ['aventura', 'ecoturismo', 'naturaleza'] },
      { questionId: 'q3', selectedOptionId: 'q3-c', etiquetas: ['unico_en_el_mundo', 'aventura', 'fotografia'] },
      { questionId: 'q4', selectedOptionId: 'q4-b', etiquetas: ['fotografia', 'paisaje', 'unico_en_el_mundo'] },
      { questionId: 'q5', selectedOptionId: 'q5-b', etiquetas: ['paisaje', 'relax', 'unico_en_el_mundo'] },
      { questionId: 'q6', selectedOptionId: 'q6-d', etiquetas: ['unico_en_el_mundo', 'relax', 'fotografia'] },
      { questionId: 'q7', selectedOptionId: 'q7-a', etiquetas: ['fotografia', 'naturaleza', 'altiplano'] },
      { questionId: 'q8', selectedOptionId: 'q8-c', etiquetas: ['gastronomia', 'aventura', 'mercado'] },
      { questionId: 'q9', selectedOptionId: 'q9-a', etiquetas: ['naturaleza', 'paisaje', 'fotografia'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    const salarEnLugares = result.lugares.some((s) => s.id === 'salar-de-uyuni')
    expect(salarEnLugares).toBe(true)
  })

  it('devuelve máximo 3 resultados por sección', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1', selectedOptionId: 'q1-c', etiquetas: ['historia', 'arquitectura', 'ciudad'] },
      { questionId: 'q2', selectedOptionId: 'q2-a', etiquetas: ['arqueologia', 'historia', 'cultura'] },
      { questionId: 'q3', selectedOptionId: 'q3-a', etiquetas: ['historia', 'cultura', 'patrimonio_unesco'] },
      { questionId: 'q4', selectedOptionId: 'q4-c', etiquetas: ['cultura', 'historia', 'patrimonio_unesco'] },
      { questionId: 'q5', selectedOptionId: 'q5-c', etiquetas: ['cultura', 'historia', 'festividad'] },
      { questionId: 'q6', selectedOptionId: 'q6-c', etiquetas: ['paisaje', 'historia', 'arqueologia'] },
      { questionId: 'q7', selectedOptionId: 'q7-b', etiquetas: ['aventura', 'arqueologia', 'historia'] },
      { questionId: 'q8', selectedOptionId: 'q8-a', etiquetas: ['cocina_andina', 'gastronomia', 'tradicion'] },
      { questionId: 'q9', selectedOptionId: 'q9-d', etiquetas: ['cultura', 'historia', 'relax'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    expect(result.lugares.length).toBeLessThanOrEqual(3)
    expect(result.gastronomia.length).toBeLessThanOrEqual(3)
    expect(result.experiencias.length).toBeLessThanOrEqual(3)
  })

  it('los tips tienen titulo y descripcion válidos', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1', selectedOptionId: 'q1-a', etiquetas: ['altiplano', 'naturaleza', 'paisaje'] },
      { questionId: 'q2', selectedOptionId: 'q2-b', etiquetas: ['gastronomia', 'cocina_andina', 'picante'] },
      { questionId: 'q3', selectedOptionId: 'q3-d', etiquetas: ['espiritualidad', 'cultura_aymara', 'tradicion'] },
      { questionId: 'q4', selectedOptionId: 'q4-d', etiquetas: ['gastronomia', 'tradicion', 'cocina_andina'] },
      { questionId: 'q5', selectedOptionId: 'q5-a', etiquetas: ['aventura', 'espiritualidad', 'fotografia'] },
      { questionId: 'q6', selectedOptionId: 'q6-a', etiquetas: ['mercado', 'tradicion', 'naturaleza'] },
      { questionId: 'q7', selectedOptionId: 'q7-c', etiquetas: ['relax', 'paisaje', 'unico_en_el_mundo'] },
      { questionId: 'q8', selectedOptionId: 'q8-a', etiquetas: ['cocina_andina', 'gastronomia', 'tradicion'] },
      { questionId: 'q9', selectedOptionId: 'q9-b', etiquetas: ['arqueologia', 'altiplano', 'aventura'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    expect(result.tips.length).toBeGreaterThan(0)
    expect(result.tips.length).toBeLessThanOrEqual(4)
    result.tips.forEach((tip) => {
      expect(typeof tip.titulo).toBe('string')
      expect(tip.titulo.length).toBeGreaterThan(0)
      expect(typeof tip.descripcion).toBe('string')
      expect(tip.descripcion.length).toBeGreaterThan(0)
    })
  })
})
