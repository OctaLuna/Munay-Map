import type { Site, SiteFilters } from '@/types'
import { apiClient } from './client'

/**
 * Implementación API real de servicios de catálogo
 * [PENDIENTE] Implementar cuando el backend NestJS esté listo
 *
 * Endpoints:
 *   GET /catalog/sites?departamento=&categoria=&busqueda=
 *   GET /catalog/sites/:id
 */

export async function getSites(filters?: SiteFilters): Promise<Site[]> {
  const params = new URLSearchParams()
  if (filters?.departamento && filters.departamento !== 'todos') {
    params.set('departamento', filters.departamento)
  }
  if (filters?.categoria && filters.categoria !== 'todas') {
    params.set('categoria', filters.categoria)
  }
  if (filters?.busqueda) {
    params.set('busqueda', filters.busqueda)
  }
  const qs = params.toString()
  return apiClient.get<Site[]>(`/catalog/sites${qs ? `?${qs}` : ''}`)
}

export async function getSiteById(id: string): Promise<Site | null> {
  return apiClient.get<Site | null>(`/catalog/sites/${id}`)
}
