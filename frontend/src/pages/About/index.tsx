import { Accordion } from '@/components/ui/Accordion'
import { Marquee } from '@/components/ui/Marquee'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SplitHeading } from '@/components/motion/SplitHeading'
import type { AccordionItem } from '@/components/ui/Accordion'

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'faq-1',
    titulo: '¿Cómo funciona el reconocimiento de imágenes?',
    contenido:
      'Usamos Google Vision AI para analizar la fotografía que tomás y compararla con nuestra base de datos de patrimonio cultural boliviano. El sistema identifica el sitio, monumento, plato o elemento cultural y devuelve una explicación generada por Gemini en tu idioma.',
  },
  {
    id: 'faq-2',
    titulo: '¿Cuántos idiomas están disponibles?',
    contenido:
      'La app soporta 40 idiomas, desde español e inglés hasta japonés, árabe, hindi y muchos más. Las explicaciones se generan directamente en el idioma seleccionado usando IA generativa, por lo que el resultado es natural, no una traducción literal.',
  },
  {
    id: 'faq-3',
    titulo: '¿Qué pasa si la IA no reconoce lo que fotografié?',
    contenido:
      'Si la imagen no coincide con ningún sitio de nuestra base de datos (confianza inferior al 60%), te mostramos una pantalla de "No reconocido" con sugerencias de sitios similares de la Biblioteca. También podés usar el buscador para encontrar el lugar manualmente.',
  },
  {
    id: 'faq-4',
    titulo: '¿Cómo funciona el quiz de recomendación?',
    contenido:
      'El quiz de 6 preguntas analiza tu perfil de viajero y hace un matching entre tus preferencias y las etiquetas de los sitios de la base de datos. El resultado te muestra los sitios turísticos, experiencias gastronómicas y festividades que mejor se adaptan a tu estilo.',
  },
  {
    id: 'faq-5',
    titulo: '¿Mis fotos se guardan o se comparten?',
    contenido:
      '[PENDIENTE] Política de privacidad definitiva. Las fotos se procesan en tiempo real para el reconocimiento y no se almacenan en servidores sin tu consentimiento explícito.',
  },
  {
    id: 'faq-6',
    titulo: '¿La app funciona sin conexión a internet?',
    contenido:
      'La app es una Progressive Web App (PWA) que puede instalarse en tu dispositivo. El catálogo básico puede funcionar offline, pero el reconocimiento de imágenes y las explicaciones generadas por IA requieren conexión.',
  },
  {
    id: 'faq-7',
    titulo: '¿Cómo puedo contribuir con información cultural?',
    contenido:
      '[PENDIENTE] Sistema de contribuciones de la comunidad. Si sos experto en patrimonio boliviano y querés contribuir con información o corregir datos, contactanos a través del formulario de contacto.',
  },
  {
    id: 'faq-8',
    titulo: '¿La app tiene costo?',
    contenido:
      '[PENDIENTE] Modelo de negocio definitivo. La versión básica de la app es gratuita. Las funciones avanzadas y el uso ilimitado del reconocimiento estarán disponibles en una versión premium.',
  },
]

const TECH_LOGOS = [
  { name: 'Vision AI', icon: '👁️' },
  { name: 'Gemini', icon: '✨' },
  { name: 'Text-to-Speech', icon: '🔊' },
  { name: 'Cloud Run', icon: '☁️' },
]

const ABOUT_CARDS = [
  {
    id: 'mision',
    titulo: 'Nuestra misión',
    contenido:
      'Democratizar el acceso al patrimonio cultural de Bolivia eliminando la barrera del idioma. Creemos que cada turista, sin importar su lengua, merece entender la riqueza histórica y cultural de los lugares que visita.',
    dark: false,
  },
  {
    id: 'por-que',
    titulo: '¿Por qué este proyecto?',
    contenido:
      'Bolivia tiene uno de los patrimonios culturales más ricos de Sudamérica, pero enfrenta un déficit severo de guías multiidioma. BoliviaIA no reemplaza a los guías humanos — los amplifica, llega donde ellos no pueden.',
    dark: true,
  },
  {
    id: 'tecnologia',
    titulo: 'Tecnología de vanguardia',
    contenido:
      'Combinamos Google Vision AI para reconocimiento visual, Gemini para generación de explicaciones culturales contextualizadas, Text-to-Speech para narración en 40+ idiomas y Cloud Run para infraestructura escalable.',
    dark: false,
    hasTechMarquee: true,
  },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      {/* Hero simple */}
      <section
        aria-labelledby="about-heading"
        className="bg-dark px-4 py-20 md:px-8 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <RevealOnScroll>
            <SplitHeading
              as="h1"
              id="about-heading"
              className="font-serif text-display-lg font-bold text-surface [text-wrap:balance] mb-6"
            >
              Sobre BoliviaIA
            </SplitHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-lg font-sans text-surface/70 leading-relaxed [text-wrap:pretty]">
              Un puente entre el turista y el patrimonio cultural boliviano,
              construido con inteligencia artificial y amor por Bolivia.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid de 3 cards — patrón 10 */}
      <section
        aria-labelledby="about-cards-heading"
        className="px-4 py-20 md:px-8"
      >
        <h2 id="about-cards-heading" className="sr-only">Información sobre el proyecto</h2>
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          {ABOUT_CARDS.map((card, i) => (
            <RevealOnScroll key={card.id} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-8 h-full ${
                  card.dark ? 'bg-dark text-surface' : 'bg-surface text-dark border border-neutral/15'
                }`}
              >
                <h3 className={`font-serif text-xl font-bold mb-4 ${card.dark ? 'text-gold' : 'text-primary'}`}>
                  {card.titulo}
                </h3>
                <p className={`font-sans text-sm leading-relaxed [text-wrap:pretty] ${card.dark ? 'text-surface/80' : 'text-neutral'}`}>
                  {card.contenido}
                </p>
                {card.hasTechMarquee && (
                  <div className="mt-6">
                    <Marquee
                      items={TECH_LOGOS}
                      speed={30}
                      className="overflow-hidden"
                      trackClassName="gap-8"
                      renderItem={(item) => (
                        <span className="flex items-center gap-2 px-4 text-sm font-medium text-neutral">
                          <span aria-hidden="true">{item.icon}</span>
                          {item.name}
                        </span>
                      )}
                    />
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* FAQ — Accordion (patrón 7) */}
      <section
        aria-labelledby="faq-heading"
        className="px-4 py-16 md:px-8 bg-surface"
      >
        <div className="mx-auto max-w-3xl">
          <RevealOnScroll className="mb-12 text-center">
            <SplitHeading
              as="h2"
              id="faq-heading"
              className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-4"
            >
              Preguntas frecuentes
            </SplitHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Accordion items={FAQ_ITEMS} multiple />
          </RevealOnScroll>
        </div>
      </section>
    </main>
  )
}
