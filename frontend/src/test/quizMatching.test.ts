import { describe, it, expect } from 'vitest'
import { getQuizRecommendation } from '@/services/mock/quiz'
import type { QuizAnswer } from '@/types'

describe('getQuizRecommendation — tag matching', () => {
  it('devuelve lugares, gastronomía y experiencias para un viajero aventurero', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1-tipo-viajero', selectedOptionId: 'aventurero', etiquetas: ['aventura', 'naturaleza', 'fotografia'] },
      { questionId: 'q2-tiempo', selectedOptionId: '4-7-dias', etiquetas: ['historia', 'naturaleza', 'aventura'] },
      { questionId: 'q3-clima', selectedOptionId: 'frio-altura', etiquetas: ['altiplano', 'arqueologia', 'fotografia'] },
      { questionId: 'q4-comida', selectedOptionId: 'todo', etiquetas: ['gastronomia', 'mercado', 'tradicion'] },
      { questionId: 'q5-actividad', selectedOptionId: 'naturaleza-extrema', etiquetas: ['aventura', 'naturaleza', 'unico_en_el_mundo'] },
      { questionId: 'q6-compania', selectedOptionId: 'solo', etiquetas: ['aventura', 'espiritualidad', 'fotografia'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    expect(result.lugares.length).toBeGreaterThan(0)
    expect(result.gastronomia.length).toBeGreaterThan(0)
    expect(result.experiencias.length).toBeGreaterThan(0)
    expect(result.perfilViajero.length).toBeGreaterThan(0)
  })

  it('el Salar de Uyuni aparece entre los lugares recomendados para un viajero aventurero/fotógrafo', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1', selectedOptionId: 'aventurero', etiquetas: ['aventura', 'naturaleza', 'fotografia'] },
      { questionId: 'q2', selectedOptionId: 'mas-semana', etiquetas: ['arqueologia', 'patrimonio_unesco', 'paisaje', 'unico_en_el_mundo'] },
      { questionId: 'q3', selectedOptionId: 'frio-altura', etiquetas: ['altiplano', 'arqueologia', 'fotografia'] },
      { questionId: 'q4', selectedOptionId: 'todo', etiquetas: ['gastronomia', 'mercado', 'tradicion'] },
      { questionId: 'q5', selectedOptionId: 'naturaleza-extrema', etiquetas: ['aventura', 'naturaleza', 'unico_en_el_mundo'] },
      { questionId: 'q6', selectedOptionId: 'pareja', etiquetas: ['paisaje', 'relax', 'unico_en_el_mundo'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    const salarEnLugares = result.lugares.some((s) => s.id === 'salar-uyuni')
    expect(salarEnLugares).toBe(true)
  })

  it('devuelve máximo 3 resultados por sección', async () => {
    const respuestas: QuizAnswer[] = [
      { questionId: 'q1', selectedOptionId: 'cultural', etiquetas: ['historia', 'cultura', 'arqueologia', 'patrimonio_unesco'] },
      { questionId: 'q2', selectedOptionId: 'mas-semana', etiquetas: ['arqueologia', 'patrimonio_unesco', 'paisaje', 'unico_en_el_mundo'] },
      { questionId: 'q3', selectedOptionId: 'templado', etiquetas: ['cultura', 'historia', 'gastronomia'] },
      { questionId: 'q4', selectedOptionId: 'andina-tradicional', etiquetas: ['gastronomia', 'cocina_andina', 'tradicion', 'cultura_aymara'] },
      { questionId: 'q5', selectedOptionId: 'ruinas', etiquetas: ['arqueologia', 'historia', 'patrimonio_unesco', 'altiplano'] },
      { questionId: 'q6', selectedOptionId: 'familia', etiquetas: ['cultura', 'historia', 'festividad'] },
    ]

    const result = await getQuizRecommendation({ respuestas, idioma: 'es' })

    expect(result.lugares.length).toBeLessThanOrEqual(3)
    expect(result.gastronomia.length).toBeLessThanOrEqual(3)
    expect(result.experiencias.length).toBeLessThanOrEqual(3)
  })
})
