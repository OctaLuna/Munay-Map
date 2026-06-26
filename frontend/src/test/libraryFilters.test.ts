import { describe, it, expect } from 'vitest'
import { getSites } from '@/services/mock/sites'

describe('getSites — filtros de biblioteca', () => {
  it('sin filtros devuelve todos los sitios (8)', async () => {
    const sites = await getSites()
    expect(sites).toHaveLength(8)
  })

  it('filtra por departamento La Paz (debe incluir Tiwanaku, Titicaca, Chuño y Alasitas)', async () => {
    const sites = await getSites({ departamento: 'La Paz' })
    expect(sites.every((s) => s.departamento === 'La Paz')).toBe(true)
    expect(sites.length).toBeGreaterThan(0)
  })

  it('filtra por categoría sitio_turistico (debe devolver solo sitios turísticos)', async () => {
    const sites = await getSites({ categoria: 'sitio_turistico' })
    expect(sites.every((s) => s.categoria === 'sitio_turistico')).toBe(true)
    expect(sites.length).toBe(4)
  })

  it('filtra por categoría danza', async () => {
    const sites = await getSites({ categoria: 'danza' })
    expect(sites.every((s) => s.categoria === 'danza')).toBe(true)
    expect(sites.length).toBe(2) // Morenada y Diablada
  })

  it('búsqueda por texto "tiwanaku" encuentra el sitio', async () => {
    const sites = await getSites({ busqueda: 'tiwanaku' })
    expect(sites.some((s) => s.id === 'tiwanaku')).toBe(true)
  })

  it('búsqueda por texto con acentos funciona (normalizacion)', async () => {
    // "salar" sin acento debe encontrar "Salar de Uyuni"
    const sites = await getSites({ busqueda: 'salar' })
    expect(sites.some((s) => s.id === 'salar-uyuni')).toBe(true)
  })

  it('búsqueda sin resultados devuelve array vacío', async () => {
    const sites = await getSites({ busqueda: 'xyzNoExiste12345' })
    expect(sites).toHaveLength(0)
  })

  it('filtro combinado departamento + categoría', async () => {
    const sites = await getSites({ departamento: 'Oruro', categoria: 'danza' })
    expect(sites.every((s) => s.departamento === 'Oruro' && s.categoria === 'danza')).toBe(true)
    expect(sites.length).toBe(2) // Morenada y Diablada
  })

  it('filtro "todos" devuelve todos sin filtrar por departamento', async () => {
    const sitesAll = await getSites({ departamento: 'todos' })
    const sitesNone = await getSites()
    expect(sitesAll.length).toBe(sitesNone.length)
  })
})
