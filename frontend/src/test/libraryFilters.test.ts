import { describe, it, expect } from 'vitest'
import { getSites } from '@/services/mock/sites'
import { SITES_MOCK } from '@/data/sites.mock'

describe('getSites — filtros de biblioteca', () => {
  it('sin filtros devuelve todos los sitios', async () => {
    const sites = await getSites()
    expect(sites.length).toBe(SITES_MOCK.length)
    expect(sites.length).toBeGreaterThan(8)
  })

  it('filtra por departamento La Paz (debe incluir Tiwanaku, Titicaca y sitios de La Paz)', async () => {
    const sites = await getSites({ departamento: 'La Paz' })
    // Con el filtro inclusivo, incluye 'Todo Bolivia' y compuestos con 'La Paz'
    expect(sites.length).toBeGreaterThan(0)
    // Todos los resultados deben ser de La Paz, compuestos o 'Todo Bolivia'
    expect(sites.every((s) =>
      s.departamento === 'La Paz' ||
      s.departamento === 'Todo Bolivia' ||
      s.departamento.includes('La Paz')
    )).toBe(true)
    expect(sites.some((s) => s.id === 'tiwanaku')).toBe(true)
  })

  it('filtra por categoría sitio_turistico (debe devolver solo sitios turísticos)', async () => {
    const sites = await getSites({ categoria: 'sitio_turistico' })
    expect(sites.every((s) => s.categoria === 'sitio_turistico')).toBe(true)
    expect(sites.length).toBeGreaterThan(4)
  })

  it('filtra por categoría danza_folklore', async () => {
    const sites = await getSites({ categoria: 'danza_folklore' })
    expect(sites.every((s) => s.categoria === 'danza_folklore')).toBe(true)
    expect(sites.length).toBeGreaterThan(2)
  })

  it('búsqueda por texto "tiwanaku" encuentra el sitio', async () => {
    const sites = await getSites({ busqueda: 'tiwanaku' })
    expect(sites.some((s) => s.id === 'tiwanaku')).toBe(true)
  })

  it('búsqueda por texto con acentos funciona (normalizacion)', async () => {
    // "salar" sin acento debe encontrar "Salar de Uyuni"
    const sites = await getSites({ busqueda: 'salar' })
    expect(sites.some((s) => s.id === 'salar-de-uyuni')).toBe(true)
  })

  it('búsqueda sin resultados devuelve array vacío', async () => {
    const sites = await getSites({ busqueda: 'xyzNoExiste12345' })
    expect(sites).toHaveLength(0)
  })

  it('filtro combinado departamento + categoría', async () => {
    const sites = await getSites({ departamento: 'Oruro', categoria: 'tradicion_festividad' })
    expect(sites.length).toBeGreaterThan(0)
    expect(sites.every((s) =>
      (s.departamento === 'Oruro' ||
       s.departamento === 'Todo Bolivia' ||
       s.departamento.includes('Oruro')) &&
      s.categoria === 'tradicion_festividad'
    )).toBe(true)
  })

  it('filtro "todos" devuelve todos sin filtrar por departamento', async () => {
    const sitesAll = await getSites({ departamento: 'todos' })
    const sitesNone = await getSites()
    expect(sitesAll.length).toBe(sitesNone.length)
  })

  it('filtro combinado departamento + categoría exacta sin compuestos', async () => {
    const sites = await getSites({ departamento: 'Tarija', categoria: 'sitio_turistico' })
    expect(sites.length).toBeGreaterThan(0)
    expect(sites.every((s) =>
      (s.departamento === 'Tarija' || s.departamento === 'Todo Bolivia' || s.departamento.includes('Tarija')) &&
      s.categoria === 'sitio_turistico'
    )).toBe(true)
  })
})
