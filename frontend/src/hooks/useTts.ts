import { useState, useCallback, useRef } from 'react'

export type TtsStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

export interface UseTtsReturn {
  status: TtsStatus
  /** Inicia la síntesis y reproducción del texto dado en el idioma dado */
  speak: (text: string, languageCode: string) => Promise<void>
  /** Pausa / reanuda la reproducción */
  togglePause: () => void
  /** Detiene y resetea */
  stop: () => void
  /** URL de objeto del audio MP3 descargado (si fue Google TTS) */
  audioUrl: string | null
  error: string | null
}

/**
 * useTts — Síntesis de voz multiidioma.
 *
 * Estrategia:
 *  1. Llama a POST /tts/synthesize en el backend (Google Cloud TTS).
 *     Devuelve un MP3 en base64 que se reproduce con HTMLAudioElement.
 *  2. Si el backend falla (sin credenciales GCP, red, etc.),
 *     cae automáticamente a Web Speech API (SpeechSynthesis nativa del navegador).
 *     Esta soporta ES, EN, DE, FR, JA y más sin configuración adicional.
 */
export function useTts(): UseTtsReturn {
  const [status, setStatus] = useState<TtsStatus>('idle')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // ── Limpieza ──────────────────────────────────────────────────────────────

  const stopAll = useCallback(() => {
    // Detener HTMLAudio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    // Detener Web Speech
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
  }, [audioUrl])

  const stop = useCallback(() => {
    stopAll()
    setStatus('idle')
    setError(null)
  }, [stopAll])

  // ── Fallback: Web Speech API ──────────────────────────────────────────────

  const speakWithWebSpeech = useCallback((text: string, languageCode: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setError('Tu navegador no soporta síntesis de voz.')
      setStatus('error')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = languageCode
    utterance.rate = 0.95
    utterance.pitch = 1

    // Intentar seleccionar una voz del idioma solicitado
    const voices = window.speechSynthesis.getVoices()
    const match = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(languageCode.toLowerCase().split('-')[0] ?? '') &&
        !v.name.includes('Google')
    ) ?? voices.find((v) =>
      v.lang.toLowerCase().startsWith(languageCode.toLowerCase().split('-')[0] ?? '')
    )
    if (match) utterance.voice = match

    utterance.onstart = () => setStatus('playing')
    utterance.onend = () => setStatus('idle')
    utterance.onerror = () => {
      setStatus('error')
      setError('Error al sintetizar el audio.')
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setStatus('playing')
  }, [])

  // ── Principal: Google TTS via backend ─────────────────────────────────────

  const speak = useCallback(
    async (text: string, languageCode: string) => {
      stopAll()
      setStatus('loading')
      setError(null)

      try {
        const BASE_URL = (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? ''
        const response = await fetch(`${BASE_URL}/tts/synthesize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, languageCode }),
        })

        if (!response.ok) throw new Error(`tts_${response.status}`)

        const data = (await response.json()) as { audioBase64: string }

        // Convertir base64 → Blob → ObjectURL
        const bytes = atob(data.audioBase64)
        const buffer = new Uint8Array(bytes.length)
        for (let i = 0; i < bytes.length; i++) {
          buffer[i] = bytes.charCodeAt(i)
        }
        const blob = new Blob([buffer], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)

        const audio = new Audio(url)
        audioRef.current = audio

        audio.onplay = () => setStatus('playing')
        audio.onpause = () => setStatus('paused')
        audio.onended = () => setStatus('idle')
        audio.onerror = () => {
          // Si el MP3 no reproduce (mock TTS devuelve audio silencioso inválido),
          // caer a Web Speech
          speakWithWebSpeech(text, languageCode)
        }

        await audio.play()
      } catch {
        // Backend TTS no disponible → Web Speech API
        speakWithWebSpeech(text, languageCode)
      }
    },
    [stopAll, speakWithWebSpeech]
  )

  // ── Pausa / reanuda ───────────────────────────────────────────────────────

  const togglePause = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        void audioRef.current.play()
        setStatus('playing')
      } else {
        audioRef.current.pause()
        setStatus('paused')
      }
      return
    }
    // Web Speech pause/resume
    if (window.speechSynthesis) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
        setStatus('playing')
      } else {
        window.speechSynthesis.pause()
        setStatus('paused')
      }
    }
  }, [])

  return { status, speak, togglePause, stop, audioUrl, error }
}
