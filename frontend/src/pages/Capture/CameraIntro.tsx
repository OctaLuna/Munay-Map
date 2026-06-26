import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export default function CameraIntro() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-background px-4 pt-20">
      <RevealOnScroll className="mx-auto max-w-lg text-center">
        {/* Ícono */}
        <div
          aria-hidden="true"
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <svg className="h-10 w-10 text-primary" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="8" width="24" height="18" rx="3" />
            <circle cx="16" cy="17" r="5" />
            <path d="M11 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          </svg>
        </div>

        <h1 className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-4">
          Reconocimiento cultural con IA
        </h1>

        <p className="mb-4 font-sans text-base text-neutral leading-relaxed [text-wrap:pretty]">
          Apuntá tu cámara a un sitio turístico, monumento, plato típico o elemento 
          de una festividad boliviana y nuestra IA te explicará su historia en tu idioma.
        </p>

        <ul className="mb-8 space-y-2 text-sm text-neutral font-sans text-left inline-block">
          {[
            'Apuntá la cámara al objeto o sitio',
            'Esperá mientras la IA analiza la imagen',
            'Recibí la explicación en tu idioma',
            'Escuchá el audio narrado',
          ].map((step, i) => (
            <li key={i} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/camara/view">
            <Button size="lg" variant="primary">
              Abrir la cámara
            </Button>
          </Link>
          <Link to="/biblioteca">
            <Button size="lg" variant="secondary">
              Explorar sin cámara
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-neutral/60 font-sans">
          La app pedirá permiso para acceder a la cámara de tu dispositivo.
          Ninguna foto se almacena sin tu consentimiento.
        </p>
      </RevealOnScroll>
    </main>
  )
}
