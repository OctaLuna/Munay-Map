import { useQuery, queryOptions } from '@tanstack/react-query'
import type { Site, SiteFilters } from '@/types'
import { USE_MOCK_DATA } from '@/lib/featureFlags'

// Importa la implementación correcta según el flag
const { getSites: getSitesFn, getSiteById: getSiteByIdFn } = USE_MOCK_DATA
  ? await import('@/services/mock/sites')
  : await import('@/services/api/sites')

// ─── Query Options (type-safe, reutilizables) ─────────────────────────────

export const sitesQueryOptions = (filters?: SiteFilters) =>
  queryOptions<Site[]>({
    queryKey: ['sites', filters ?? {}],
    queryFn: () => getSitesFn(filters),
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

export const siteByIdQueryOptions = (id: string) =>
  queryOptions<Site | null>({
    queryKey: ['sites', id],
    queryFn: () => getSiteByIdFn(id),
    staleTime: 1000 * 60 * 10, // 10 minutos
    enabled: Boolean(id),
  })

// ─── Hooks ────────────────────────────────────────────────────────────────

/** Lista de sitios con filtros opcionales (departamento, categoría, búsqueda) */
export function useSites(filters?: SiteFilters) {
  return useQuery(sitesQueryOptions(filters))
}

/** Sitio individual por ID */
export function useSiteById(id: string) {
  return useQuery(siteByIdQueryOptions(id))
}
