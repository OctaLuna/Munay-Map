import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { useT } from '@/context/LanguageContext'

/**
 * EditorialText — seccion de texto largo con grilla asimetrica
 *
 * Layout: fondo crema (bg-surface) con lineas de mapa muy sutiles.
 * Titulo grande uppercase a la izquierda, dos columnas de parrafos
 * con alturas diferentes creando una composicion asimetrica editorial.
 *
 * Inspirado en Flyward: texto como elemento de diseno, no solo contenido.
 */
export function EditorialText() {
  const t = useT()
  return (
    <section
      aria-labelledby="editorial-heading"
      className="relative bg-surface py-28 px-4 md:px-8 overflow-hidden"
    >
      {/* Fondo de lineas de mapa — muy sutil para no competir con el texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-map-lines opacity-30 pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Linea decorativa horizontal */}
        <RevealOnScroll>
          <div className="mb-16 h-px w-24 bg-neutral/30" />
        </RevealOnScroll>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Columna izquierda: titulo grande — ocupa 4 cols */}
          <div className="md:col-span-4">
            <RevealOnScroll>
              <SplitHeading
                as="h2"
                id="editorial-heading"
                className="font-serif text-display-lg font-bold uppercase tracking-[0.04em] text-dark [text-wrap:balance] leading-tight"
              >
                {t('editorial.title')}
              </SplitHeading>
            </RevealOnScroll>
          </div>

          {/* Columnas derechas: texto en grilla asimetrica — 8 cols divididas en 5+3 */}
          <div className="md:col-span-8 grid gap-10 md:grid-cols-12">
            {/* Parrafo 1 — col 1-7 */}
            <RevealOnScroll className="md:col-span-7" delay={0.1}>
              <p className="font-sans text-base leading-relaxed text-neutral [text-wrap:pretty]">
                {t('editorial.p1')}
              </p>
            </RevealOnScroll>

            {/* Parrafo 2 — col 4-12 (desplazado hacia la derecha) */}
            <RevealOnScroll className="md:col-span-8 md:col-start-5" delay={0.2}>
              <p className="font-sans text-base leading-relaxed text-neutral [text-wrap:pretty]">
                {t('editorial.p2')}
              </p>
            </RevealOnScroll>

            {/* Cita destacada — alineada a la derecha */}
            <RevealOnScroll className="md:col-span-6 md:col-start-7" delay={0.3}>
              <blockquote className="border-l-2 border-gold pl-5">
                <p className="font-serif text-lg italic text-dark/70 leading-relaxed">
                  {t('editorial.quote')}
                </p>
              </blockquote>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}