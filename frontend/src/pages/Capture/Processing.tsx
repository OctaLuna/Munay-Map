import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Processing — pantalla de carga mientras la IA procesa la imagen.
 * Si el usuario llega directamente sin datos, redirige a /camara.
 */
export default function Processing() {
  const navigate = useNavigate()

  // Timeout de seguridad — si la mutación tarda más de 30s, redirigir
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/camara/not-found')
    }, 30000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-dark px-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="text-center">
        {/* Spinner animado con la silueta Bolivia */}
        <div
          aria-hidden="true"
          className="relative mx-auto mb-8 h-24 w-24"
        >
          {/* Anillo exterior giratorio */}
          <svg
            className="absolute inset-0 animate-spin h-24 w-24"
            viewBox="0 0 96 96"
            fill="none"
          >
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="#D4A24C"
              strokeWidth="2"
              strokeDasharray="138 138"
              strokeDashoffset="69"
              strokeLinecap="round"
            />
          </svg>
          {/* Logo centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-12 w-12" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" fill="#3B5D43" />
              <path
                d="M14 12 C18 10 25 11 28 15 C31 19 30 25 26 28 C22 31 16 30 13 27 C10 24 10 17 14 12 Z"
                fill="#F4E8D3"
                opacity="0.9"
              />
              <circle cx="20" cy="20" r="3" fill="#D4A24C" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-2xl font-bold text-surface mb-3">
          Analizando la imagen...
        </h1>
        <p className="max-w-xs font-sans text-sm text-surface/60 leading-relaxed">
          Nuestra IA está identificando el sitio cultural y preparando tu explicación personalizada.
        </p>

        {/* Pasos en progreso */}
        <div className="mt-8 space-y-3">
          {[
            'Procesando la imagen',
            'Identificando el sitio cultural',
            'Generando la explicación',
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-surface/60 font-sans"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div
                className="h-2 w-2 rounded-full bg-gold animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
                aria-hidden="true"
              />
              {step}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
