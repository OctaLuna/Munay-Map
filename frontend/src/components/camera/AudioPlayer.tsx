import { cn } from '@/lib/utils'
import type { TtsStatus } from '@/hooks/useTts'

interface AudioPlayerProps {
  status: TtsStatus
  onSpeak: () => void
  onTogglePause: () => void
  onStop: () => void
  languageName?: string
  className?: string
}

/**
 * AudioPlayer — control de síntesis de voz para el resultado de cámara.
 * Muestra botones de escuchar / pausar / detener según el estado TTS.
 */
export function AudioPlayer({
  status,
  onSpeak,
  onTogglePause,
  onStop,
  languageName,
  className,
}: AudioPlayerProps) {
  const isIdle = status === 'idle'
  const isLoading = status === 'loading'
  const isPlaying = status === 'playing'
  const isPaused = status === 'paused'
  const isError = status === 'error'
  const isActive = isPlaying || isPaused

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border border-neutral/15 bg-surface px-4 py-3',
        className
      )}
      role="region"
      aria-label="Reproductor de audio"
    >
      {/* Ícono de altavoz */}
      <div
        aria-hidden="true"
        className={cn(
          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors',
          isActive ? 'bg-primary text-surface' : 'bg-primary/10 text-primary'
        )}
      >
        {isLoading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5"
              strokeDasharray="28 29" strokeDashoffset="14" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.5 3.75a.75.75 0 00-1.264-.546L5.203 7H2.667a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 001.264-.546V3.75zM13.78 7.22a.75.75 0 10-1.06 1.06A2.5 2.5 0 0113.5 10a2.5 2.5 0 01-.78 1.78.75.75 0 101.06 1.06A4 4 0 0015 10a4 4 0 00-1.22-2.78zM16.06 4.94a.75.75 0 10-1.06 1.06A6.5 6.5 0 0116.5 10a6.5 6.5 0 01-1.5 4.06.75.75 0 001.06 1.06A8 8 0 0018 10a8 8 0 00-1.94-5.06z" />
          </svg>
        )}
      </div>

      {/* Texto y estado */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-dark font-sans">
          {isLoading && 'Generando audio...'}
          {isPlaying && 'Reproduciendo'}
          {isPaused && 'Pausado'}
          {(isIdle || isError) && 'Escuchar explicación'}
        </p>
        {languageName && (
          <p className="text-xs text-neutral font-sans">
            {isError ? 'Usando voz del navegador' : `Idioma: ${languageName}`}
          </p>
        )}
      </div>

      {/* Botones de control */}
      <div className="flex items-center gap-1.5">
        {/* Botón principal: escuchar / pausar / reanudar */}
        {(isIdle || isError) ? (
          <button
            type="button"
            onClick={onSpeak}
            aria-label="Escuchar explicación en audio"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-surface transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            {/* Play */}
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        ) : isLoading ? null : (
          <>
            {/* Pausar / reanudar */}
            <button
              type="button"
              onClick={onTogglePause}
              aria-label={isPaused ? 'Reanudar' : 'Pausar'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              {isPaused ? (
                /* Play */
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              ) : (
                /* Pause */
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                </svg>
              )}
            </button>

            {/* Detener */}
            <button
              type="button"
              onClick={onStop}
              aria-label="Detener audio"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral/10 text-neutral transition-colors hover:bg-neutral/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral focus-visible:ring-offset-1"
            >
              {/* Stop */}
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.5 4.5A.5.5 0 015 4h10a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5v-10z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
