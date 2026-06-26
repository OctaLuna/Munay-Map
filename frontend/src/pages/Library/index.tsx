import { useState } from 'react'
import { useSites } from '@/hooks/useSites'
import { type SiteFilters, type Departamento, type SiteCategoria } from '@/types'
import { Card, CardBody, CardImage } from '@/components/ui/Card'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { Badge } from '@/components/ui/Badge'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Link, useSearchParams } from 'react-router-dom'

const DEPARTAMENTOS: Array<{ value: Departamento | 'todos'; label: string }> = [
  { value: 'todos', label: 'Todos' },
  { value: 'La Paz', label: 'La Paz' },
  { value: 'Oruro', label: 'Oruro' },
  { value: 'Potosí', label: 'Potosí' },
  { value: 'Cochabamba', label: 'Cochabamba' },
  { value: 'Santa Cruz', label: 'Santa Cruz' },
  { value: 'Beni', label: 'Beni' },
  { value: 'Pando', label: 'Pando' },
  { value: 'Tarija', label: 'Tarija' },
  { value: 'Chuquisaca', label: 'Chuquisaca' },
]

const CATEGORIAS: Array<{ value: SiteCategoria | 'todas'; label: string }> = [
  { value: 'todas', label: 'Todas las categorías' },
  { value: 'sitio_turistico', label: 'Sitios turísticos' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'danza', label: 'Danzas' },
  { value: 'tradicion_festividad', label: 'Tradiciones y festividades' },
]

const CATEGORIA_LABEL: Record<string, string> = {
  sitio_turistico: 'Sitio turístico',
  gastronomia: 'Gastronomía',
  danza: 'Danza',
  tradicion_festividad: 'Tradición',
}

export default function LibraryPage() {
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState<SiteFilters>({
    departamento: (searchParams.get('departamento') as Departamento) ?? 'todos',
    categoria: (searchParams.get('categoria') as SiteCategoria) ?? 'todas',
    busqueda: '',
  })

  const { data: sites, isLoading, isError } = useSites(filters)

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="bg-dark px-4 py-16 md:px-8 text-center">
        <RevealOnScroll>
          <h1 className="font-serif text-display-lg font-bold text-surface [text-wrap:balance] mb-4">
            Biblioteca Cultural
          </h1>
          <p className="mx-auto max-w-xl font-sans text-surface/70">
            Explorá el patrimonio de Bolivia: sitios turísticos, gastronomía, danzas y tradiciones de los 9 departamentos.
          </p>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {/* Filtros */}
        <div
          className="mb-8 rounded-xl border border-neutral/15 bg-surface p-5 space-y-5"
          role="search"
          aria-label="Filtros de búsqueda"
        >
          {/* Buscador */}
          <div>
            <label htmlFor="busqueda" className="sr-only">Buscar por nombre, descripción o etiqueta</label>
            <div className="relative">
              <svg aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral/50" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input
                id="busqueda"
                type="search"
                value={filters.busqueda}
                onChange={(e) => setFilters((f) => ({ ...f, busqueda: e.target.value }))}
                placeholder="Buscar sitios, gastronomía, danzas..."
                className="w-full rounded-lg border border-neutral/20 bg-background py-2.5 pl-9 pr-4 text-sm text-dark placeholder:text-neutral/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Departamento */}
          <ChipGroup label="Filtrar por departamento">
            {DEPARTAMENTOS.map((d) => (
              <Chip
                key={d.value}
                label={d.label}
                selected={filters.departamento === d.value}
                onClick={() => setFilters((f) => ({ ...f, departamento: d.value }))}
              />
            ))}
          </ChipGroup>

          {/* Categoría */}
          <ChipGroup label="Filtrar por categoría">
            {CATEGORIAS.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                selected={filters.categoria === c.value}
                onClick={() => setFilters((f) => ({ ...f, categoria: c.value }))}
              />
            ))}
          </ChipGroup>
        </div>

        {/* Resultados */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-surface/60 h-72" />
            ))}
            <span className="sr-only">Cargando sitios...</span>
          </div>
        )}

        {isError && (
          <div role="alert" className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
            <p className="font-sans text-accent">Error al cargar los sitios. Por favor intentá nuevamente.</p>
          </div>
        )}

        {!isLoading && !isError && sites && (
          <>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="mb-6 text-sm text-neutral font-sans"
            >
              {sites.length} {sites.length === 1 ? 'resultado' : 'resultados'}
            </p>

            {sites.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-neutral">
                  No encontramos resultados para tu búsqueda.
                </p>
                <button
                  onClick={() => setFilters({ departamento: 'todos', categoria: 'todas', busqueda: '' })}
                  className="mt-4 text-sm text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sites.map((site, i) => (
                  <RevealOnScroll key={site.id} delay={i * 0.05}>
                    <Link
                      to={`/biblioteca/${site.id}`}
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                    >
                      <Card variant="default" className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                        <CardImage
                          src={site.imagenUrl}
                          alt={`Imagen de ${site.nombre}`}
                          aspectRatio="3/2"
                          className="group-hover:scale-105"
                        />
                        <CardBody>
                          <div className="mb-2 flex flex-wrap gap-1.5">
                            <Badge variant="neutral">{site.departamento}</Badge>
                            <Badge variant="primary">{CATEGORIA_LABEL[site.categoria] ?? site.categoria}</Badge>
                          </div>
                          <h2 className="font-serif text-lg font-semibold text-dark leading-snug mb-2">
                            {site.nombre}
                          </h2>
                          <p className="text-sm leading-relaxed text-neutral font-sans line-clamp-3">
                            {site.descripcionCorta}
                          </p>
                        </CardBody>
                      </Card>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
