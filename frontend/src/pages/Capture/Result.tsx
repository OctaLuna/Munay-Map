import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { RecognizeResponse } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { ClipRevealImage } from '@/components/motion/ClipRevealImage'

interface LocationState {
  result: RecognizeResponse
}

export default function RecognizeResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null

  // Si llegó sin datos (navegación directa), redirigir
  if (!state?.result?.site) {
    navigate('/camara', { replace: true })
    return null
  }

  const { result } = state
  const { site, explicacion, audioUrl, confianza } = result

  if (!site) return null

  const confianzaPct = Math.round(confianza * 100)

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-2xl px-4 py-10 md:px-8">
        {/* Imagen del sitio */}
        <ClipRevealImage
          src={site.imagenUrl}
          alt={`Imagen de ${site.nombre}`}
          direction="up"
          className="mb-8 h-64 w-full rounded-2xl"
        />

        {/* Badges */}
        <RevealOnScroll className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="md">{site.departamento}</Badge>
          <Badge variant="gold" size="md">
            {confianzaPct}% de confianza
          </Badge>
        </RevealOnScroll>

        {/* Título */}
        <RevealOnScroll>
          <h1 className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-6">
            {site.nombre}
          </h1>
        </RevealOnScroll>

        {/* Explicación generada por IA */}
        <RevealOnScroll delay={0.05}>
          <div className="mb-6 rounded-xl border-l-4 border-primary bg-surface p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary font-sans">
              Explicación generada por IA
            </p>
            <p className="font-sans text-base leading-relaxed text-dark [text-wrap:pretty]">
              {explicacion}
            </p>
          </div>
        </RevealOnScroll>

        {/* Audio — [PENDIENTE] cuando TTS esté disponible */}
        {audioUrl ? (
          <RevealOnScroll delay={0.1} className="mb-6">
            <div className="rounded-xl border border-neutral/15 bg-surface p-4">
              <p className="mb-2 text-sm font-semibold text-dark font-sans">
                Escuchar la explicación
              </p>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio controls src={audioUrl} className="w-full">
                Tu navegador no soporta el reproductor de audio.
              </audio>
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll delay={0.1}>
            <div className="mb-6 rounded-xl border border-neutral/15 bg-surface p-4">
              <p className="text-sm text-neutral/60 font-sans">
                🔊 Audio narrado — [PENDIENTE] disponible cuando el backend TTS esté activo
              </p>
            </div>
          </RevealOnScroll>
        )}

        {/* Coordenadas — [PENDIENTE] mapa interactivo */}
        {site.coordenadas && (
          <RevealOnScroll delay={0.15} className="mb-6 rounded-xl border border-neutral/15 bg-surface p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral font-sans">
              Ubicación
            </p>
            <p className="text-sm text-dark font-sans">
              {site.departamento} · {site.coordenadas.lat.toFixed(4)}, {site.coordenadas.lng.toFixed(4)}
            </p>
            <p className="mt-1 text-xs text-neutral/50 font-sans">
              [PENDIENTE] Mapa interactivo
            </p>
          </RevealOnScroll>
        )}

        {/* Acciones */}
        <RevealOnScroll delay={0.2} className="flex flex-col gap-3 sm:flex-row">
          <Link to={`/biblioteca/${site.id}`}>
            <Button variant="primary" size="md">Ver ficha completa</Button>
          </Link>
          <Button variant="secondary" size="md" onClick={() => navigate('/camara/view')}>
            Fotografiar otro sitio
          </Button>
          <Link to="/biblioteca">
            <Button variant="ghost" size="md">Ver más sitios</Button>
          </Link>
        </RevealOnScroll>
      </div>
    </main>
  )
}
