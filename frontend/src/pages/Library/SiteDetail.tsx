import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSiteById } from '@/hooks/useSites'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ClipRevealImage } from '@/components/motion/ClipRevealImage'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

const CATEGORIA_LABEL: Record<string, string> = {
  sitio_turistico: 'Sitio turístico',
  gastronomia: 'Gastronomía',
  danza: 'Danza',
  tradicion_festividad: 'Tradición y festividad',
}

export default function SiteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: site, isLoading, isError } = useSiteById(id ?? '')

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-20" aria-busy="true">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-64 rounded-xl bg-surface/60" />
            <div className="h-8 w-2/3 rounded bg-surface/60" />
            <div className="h-4 rounded bg-surface/60" />
            <div className="h-4 w-4/5 rounded bg-surface/60" />
          </div>
        </div>
        <span className="sr-only">Cargando información del sitio...</span>
      </main>
    )
  }

  if (isError || !site) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="font-serif text-display-md font-bold text-dark mb-4">
            Sitio no encontrado
          </h1>
          <p className="mb-8 text-neutral font-sans">
            No pudimos encontrar el sitio que buscás.
          </p>
          <Button onClick={() => navigate('/biblioteca')}>
            Volver a la Biblioteca
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <nav aria-label="Ubicación en el sitio" className="bg-surface/50 px-4 py-3 md:px-8">
        <ol className="mx-auto flex max-w-3xl items-center gap-2 text-sm text-neutral font-sans">
          <li>
            <Link to="/" className="hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/biblioteca" className="hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">
              Biblioteca
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-dark font-medium truncate max-w-[200px]">
            {site.nombre}
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        {/* Imagen */}
        <ClipRevealImage
          src={site.imagenUrl}
          alt={`Imagen de ${site.nombre}`}
          direction="up"
          className="mb-8 h-72 w-full rounded-2xl md:h-96"
        />

        {/* Badges */}
        <RevealOnScroll className="mb-4 flex flex-wrap gap-2">
          <Badge variant="neutral" size="md">{site.departamento}</Badge>
          <Badge variant="primary" size="md">{CATEGORIA_LABEL[site.categoria] ?? site.categoria}</Badge>
          {site.destacado && <Badge variant="gold" size="md">Destacado</Badge>}
        </RevealOnScroll>

        {/* Título */}
        <RevealOnScroll>
          <h1 className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-6">
            {site.nombre}
          </h1>
        </RevealOnScroll>

        {/* Descripción */}
        <RevealOnScroll delay={0.05}>
          <p className="font-sans text-base leading-relaxed text-dark [text-wrap:pretty] mb-8">
            {site.descripcionBaseEs}
          </p>
        </RevealOnScroll>

        {/* Etiquetas */}
        {site.etiquetas.length > 0 && (
          <RevealOnScroll delay={0.1} className="mb-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral font-sans">
              Etiquetas
            </h2>
            <div className="flex flex-wrap gap-2">
              {site.etiquetas.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral/10 px-3 py-1 text-xs text-neutral font-sans"
                >
                  {tag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* Coordenadas */}
        {site.coordenadas && (
          <RevealOnScroll delay={0.15} className="mb-8 rounded-xl border border-neutral/15 bg-surface p-4">
            <h2 className="mb-2 text-sm font-semibold text-dark font-sans">Ubicación</h2>
            <p className="text-sm text-neutral font-sans">
              Lat: {site.coordenadas.lat.toFixed(4)} · Lng: {site.coordenadas.lng.toFixed(4)}
            </p>
            <p className="mt-1 text-xs text-neutral/60 font-sans">
              {/* [PENDIENTE] Integrar mapa real cuando el backend esté listo */}
              [PENDIENTE] Mapa interactivo · Coordenadas reales
            </p>
          </RevealOnScroll>
        )}

        {/* CTAs */}
        <RevealOnScroll delay={0.2} className="flex flex-col gap-3 sm:flex-row">
          <Link to="/camara">
            <Button variant="primary" size="md">
              Reconocer con la cámara
            </Button>
          </Link>
          <Button variant="secondary" size="md" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </RevealOnScroll>
      </article>
    </main>
  )
}
