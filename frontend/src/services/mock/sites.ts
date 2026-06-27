import type { Site, SiteFilters } from '@/types'
import { SITES_MOCK } from '@/data/sites.mock'
import { mockDelay, normalizeForSearch } from '@/lib/utils'

/**
 * Implementación MOCK de servicios de catálogo
 * Endpoint real futuro: GET /catalog/sites, GET /catalog/sites/:id
 */

export async function getSites(filters?: SiteFilters): Promise<Site[]> {
  await mockDelay()
  let results = [...SITES_MOCK]

  if (filters?.departamento && filters.departamento !== 'todos') {
    // Entries like 'Oruro / La Paz' or 'Todo Bolivia' should appear in any of their departments
    results = results.filter((s) =>
      s.departamento === filters.departamento ||
      s.departamento === 'Todo Bolivia' ||
      s.departamento.includes(filters.departamento as string)
    )
  }

  if (filters?.categoria && filters.categoria !== 'todas') {
    results = results.filter((s) => s.categoria === filters.categoria)
  }

  if (filters?.busqueda && filters.busqueda.trim() !== '') {
    const q = normalizeForSearch(filters.busqueda)
    results = results.filter(
      (s) =>
        normalizeForSearch(s.nombre).includes(q) ||
        normalizeForSearch(s.descripcionCorta).includes(q) ||
        normalizeForSearch(s.departamento).includes(q) ||
        s.etiquetas.some((t) => normalizeForSearch(t).includes(q))
    )
  }

  return results
}

export async function getSiteById(id: string): Promise<Site | null> {
  await mockDelay(300)
  return SITES_MOCK.find((s) => s.id === id) ?? null
}
