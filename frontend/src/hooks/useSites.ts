import { useQuery, queryOptions } from '@tanstack/react-query'
import type { Site, SiteFilters } from '@/types'

// El catálogo siempre usa los datos mock locales (70+ sitios bolivianos).
// El backend NestJS tiene su propio catálogo limitado de 13 sitios;
// mientras no esté sincronizado con el mock completo, forzamos mock aquí.
import { getSites as getSitesFn, getSiteById as getSiteByIdFn } from '@/services/mock/sites'

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
