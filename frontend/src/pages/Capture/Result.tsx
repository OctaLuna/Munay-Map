import { useCallback } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { RecognizeResponse } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { ClipRevealImage } from '@/components/motion/ClipRevealImage'
import { AudioPlayer } from '@/components/camera/AudioPlayer'
import { useTts } from '@/hooks/useTts'
import { useLanguage } from '@/context/LanguageContext'

interface LocationState {
  result: RecognizeResponse
  imagePreview?: string
}

// ── Sección de lista con ícono ───────────────────────────────────────────────

interface InfoSectionProps {
  title: string
  icon: React.ReactNode
  items: string[]
  accent?: string
}

function InfoSection({ title, icon, items, accent = 'border-primary' }: InfoSectionProps) {
  return (
    <RevealOnScroll className="mb-6">
      <div className={`rounded-xl border-l-4 ${accent} bg-surface p-5`}>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary font-sans">
            {title}
          </p>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-dark font-sans leading-snug">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </RevealOnScroll>
  )
}

// ── Ícono: ubicación ─────────────────────────────────────────────────────────

const IconLocation = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145 13.5 13.5 0 003.985-4.228c1.52-2.473 2.15-4.926 1.712-7.108C15.753 4.923 13.156 3 10 3s-5.753 1.923-6.312 4.45c-.438 2.182.192 4.635 1.712 7.108a13.5 13.5 0 003.985 4.228 5.741 5.741 0 00.281.145l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
)

const IconInfo = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
  </svg>
)

const IconStar = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>
)

const IconCalendar = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
  </svg>
)

const IconTicket = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.33.576z" />
    <path fillRule="evenodd" d="M1 4a1 1 0 00-1 1v.01a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1H1zm0 2.99a1 1 0 00-1 1V15a1 1 0 001 1h18a1 1 0 001-1V7.99a1 1 0 00-1-1H1zm9.25.011a4.5 4.5 0 11.5 8.978V17h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75v-.021A4.5 4.5 0 0110.25 7z" clipRule="evenodd" />
  </svg>
)

// ── Componente principal ─────────────────────────────────────────────────────

export default function RecognizeResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const tts = useTts()
  const state = location.state as LocationState | null

  const handleSpeak = useCallback(() => {
    if (!state?.result?.explicacion) return
    void tts.speak(state.result.explicacion, language.code)
  }, [state?.result?.explicacion, language.code, tts])

  if (!state?.result?.site) {
    navigate('/camara', { replace: true })
    return null
  }

  const { result } = state
  const {
    site,
    explicacion,
    confianza,
    ubicacion,
    datosImportantes,
    datosCuriosos,
    mejorEpoca,
    entrada,
  } = result

  if (!site) return null

  const confianzaPct = Math.round(confianza * 100)

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-2xl px-4 py-10 md:px-8">

        {/* ── Imagen ── */}
        <ClipRevealImage
          src={site.imagenUrl}
          alt={`Imagen de ${site.nombre}`}
          direction="up"
          className="mb-6 h-72 w-full rounded-2xl"
        />

        {/* ── Badges ── */}
        <RevealOnScroll className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="md">{site.departamento}</Badge>
          {site.categoria === 'sitio_turistico' && (
            <Badge variant="gold" size="md">Sitio turístico</Badge>
          )}
          <Badge variant="gold" size="md">{confianzaPct}% confianza</Badge>
        </RevealOnScroll>

        {/* ── Título ── */}
        <RevealOnScroll>
          <h1 className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-2">
            {site.nombre}
          </h1>
          {ubicacion && (
            <p className="mb-6 flex items-center gap-1.5 text-sm text-neutral font-sans">
              {IconLocation}
              {ubicacion.descripcion}
            </p>
          )}
        </RevealOnScroll>

        {/* ── Explicación IA ── */}
        <RevealOnScroll delay={0.04}>
          <div className="mb-6 rounded-xl border-l-4 border-primary bg-surface p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary font-sans">
              Explicación generada por IA
            </p>
            {explicacion.split('\n\n').map((para, i) => (
              <p key={i} className="mb-3 last:mb-0 font-sans text-base leading-relaxed text-dark [text-wrap:pretty]">
                {para}
              </p>
            ))}
          </div>
        </RevealOnScroll>

        {/* ── Audio TTS ── */}
        <RevealOnScroll delay={0.06} className="mb-6">
          <AudioPlayer
            status={tts.status}
            onSpeak={handleSpeak}
            onTogglePause={tts.togglePause}
            onStop={tts.stop}
            languageName={language.nombreEs}
          />
        </RevealOnScroll>

        {/* ── Datos importantes ── */}
        {datosImportantes && datosImportantes.length > 0 && (
          <InfoSection
            title="Datos importantes"
            icon={IconInfo}
            items={datosImportantes}
            accent="border-primary"
          />
        )}

        {/* ── Datos curiosos ── */}
        {datosCuriosos && datosCuriosos.length > 0 && (
          <InfoSection
            title="Datos curiosos"
            icon={IconStar}
            items={datosCuriosos}
            accent="border-gold"
          />
        )}

        {/* ── Cómo llegar ── */}
        {ubicacion && (
          <RevealOnScroll className="mb-6">
            <div className="rounded-xl border-l-4 border-accent/60 bg-surface p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-accent">{IconLocation}</span>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent font-sans">
                  Cómo llegar
                </p>
              </div>
              <p className="text-sm text-dark font-sans leading-relaxed">{ubicacion.comoLlegar}</p>
              {ubicacion.altitudMetros && (
                <p className="mt-2 text-xs text-neutral font-sans">
                  Altitud: {ubicacion.altitudMetros.toLocaleString()} m s.n.m.
                  {ubicacion.distanciaLaPaz ? ` · Desde La Paz: ${ubicacion.distanciaLaPaz}` : ''}
                </p>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* ── Mejor época ── */}
        {mejorEpoca && (
          <RevealOnScroll className="mb-6">
            <div className="rounded-xl border-l-4 border-gold bg-surface p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-gold">{IconCalendar}</span>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                  Mejor época para visitar
                </p>
              </div>
              <p className="mb-1 font-semibold text-sm text-dark font-sans">{mejorEpoca.meses}</p>
              <p className="text-sm text-dark font-sans leading-relaxed">{mejorEpoca.descripcion}</p>
            </div>
          </RevealOnScroll>
        )}

        {/* ── Entrada y horario ── */}
        {entrada && (
          <RevealOnScroll className="mb-8">
            <div className="rounded-xl border border-neutral/15 bg-surface p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-neutral">{IconTicket}</span>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral font-sans">
                  Entrada y horario
                </p>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                <div>
                  <p className="text-xs text-neutral font-sans uppercase tracking-wide mb-0.5">Precio</p>
                  <p className="text-sm font-medium text-dark font-sans">{entrada.precio}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral font-sans uppercase tracking-wide mb-0.5">Horario</p>
                  <p className="text-sm font-medium text-dark font-sans">{entrada.horario}</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* ── Acciones ── */}
        <RevealOnScroll className="flex flex-col gap-3 sm:flex-row">
          <Link to={`/biblioteca/${site.id}`}>
            <Button variant="primary" size="md">Ver ficha completa</Button>
          </Link>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/camara')}
          >
            Analizar otra imagen
          </Button>
          <Link to="/biblioteca">
            <Button variant="ghost" size="md">Explorar más sitios</Button>
          </Link>
        </RevealOnScroll>
      </div>
    </main>
  )
}
