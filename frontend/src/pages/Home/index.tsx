import { Link } from 'react-router-dom'
import { CountryMaskHero } from '@/components/sections/CountryMaskHero'
import { JourneySteps } from '@/components/sections/JourneySteps'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { TwoColumnsRagged } from '@/components/sections/TwoColumnsRagged'
import { EditorialText } from '@/components/sections/EditorialText'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { Marquee } from '@/components/ui/Marquee'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'

const TECH_ITEMS = [
  { name: 'Vision AI', desc: 'Reconocimiento de imagenes' },
  { name: 'Gemini', desc: 'Explicaciones generadas por IA' },
  { name: 'Text-to-Speech', desc: 'Audio en tu idioma' },
  { name: 'Cloud Run', desc: 'Infraestructura en la nube' },
]

const DEPARTMENTS = [
  'La Paz', 'Oruro', 'Potosi', 'Cochabamba',
  'Santa Cruz', 'Beni', 'Pando', 'Tarija', 'Chuquisaca',
]

export default function HomePage() {
  return (
    <main id="main-content">
      {/* 1. Hero — data-nav-theme="light": fondo beige, texto oscuro */}
      <div data-nav-theme="light">
        <CountryMaskHero />
      </div>

      {/* 2. Que resolvemos — fondo beige, texto oscuro */}
      <section
        data-nav-theme="light"
        aria-labelledby="what-we-solve-heading"
        className="bg-background py-24 px-4 md:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <SplitHeading
              as="h2"
              id="what-we-solve-heading"
              className="font-serif text-display-lg font-bold uppercase tracking-[0.04em] text-dark [text-wrap:balance] mb-6"
            >
              El problema que resolvemos
            </SplitHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-base leading-relaxed text-neutral font-sans [text-wrap:pretty]">
              Bolivia tiene un patrimonio cultural inmenso, pero la barrera del idioma y la 
              falta de guias especializados impiden que los turistas internacionales accedan 
              a la riqueza de cada lugar. Munay Map elimina esa barrera: 
              cualquier turista, en cualquier idioma, puede entender la historia 
              que tiene frente a sus ojos.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. JourneySteps — fondo beige con lineas de mapa, texto oscuro */}
      <div data-nav-theme="light">
        <JourneySteps />
      </div>

      {/* 4. Dos columnas rasgadas full-bleed con fotos — texto sobre foto oscura */}
      <div data-nav-theme="dark">
        <TwoColumnsRagged />
      </div>

      {/* 5. StatsCounter — foto de fondo oscura, texto blanco */}
      <div data-nav-theme="dark">
        <StatsCounter />
      </div>

      {/* 6. Marquee de tecnologias — fondo surface (crema), texto oscuro */}
      <section
        data-nav-theme="light"
        aria-label="Tecnologias utilizadas"
        className="border-y border-neutral/15 bg-surface py-8"
      >
        <Marquee
          items={TECH_ITEMS}
          speed={40}
          className="py-2"
          trackClassName="gap-16"
          renderItem={(item) => (
            <div className="flex items-center gap-3 px-8">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span className="font-serif text-lg font-semibold text-dark">{item.name}</span>
              <span className="font-sans text-sm text-neutral">{item.desc}</span>
            </div>
          )}
        />
      </section>

      {/* Marquee de departamentos — fondo oscuro, texto claro */}
      <section
        data-nav-theme="dark"
        aria-label="Departamentos de Bolivia"
        className="bg-dark py-5"
      >
        <Marquee
          items={DEPARTMENTS}
          speed={30}
          direction="right"
          className="py-1"
          trackClassName="gap-12"
          renderItem={(dept) => (
            <span className="px-6 font-serif text-base font-medium text-surface/50 uppercase tracking-widest">
              {dept}
            </span>
          )}
        />
      </section>

      {/* 7. Seccion editorial asimetrica — fondo beige, texto oscuro */}
      <div data-nav-theme="light">
        <EditorialText />
      </div>

      {/* 8. TestimonialSlider — fondo surface (crema), texto oscuro */}
      <div data-nav-theme="light">
        <TestimonialSlider />
      </div>

      {/* 9. CTA final — fondo primary (verde oscuro), texto claro */}
      <section
        data-nav-theme="dark"
        aria-labelledby="quiz-cta-heading"
        className="bg-primary py-24 px-4 md:px-8 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <RevealOnScroll>
            <SplitHeading
              as="h2"
              id="quiz-cta-heading"
              className="font-serif text-display-lg font-bold uppercase tracking-[0.04em] text-surface [text-wrap:balance] mb-6"
            >
              No sabes por donde empezar
            </SplitHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mb-10 text-lg text-surface/80 font-sans">
              Responde 6 preguntas y recibis un itinerario personalizado con 
              los sitios, sabores y experiencias que van con tu estilo de viaje.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <Link to="/quiz">
              <Button
                size="lg"
                className="bg-surface text-primary hover:bg-surface/90 focus-visible:ring-surface rounded-full px-10 uppercase tracking-[0.08em] text-sm"
              >
                Empezar el quiz — 2 minutos
              </Button>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  )
}