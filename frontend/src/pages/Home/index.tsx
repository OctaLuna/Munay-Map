import { Link } from 'react-router-dom'
import { CountryMaskHero } from '@/components/sections/CountryMaskHero'
import { CinematicSky } from '@/components/sections/CinematicSky'
import { JourneySteps } from '@/components/sections/JourneySteps'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { TwoColumnsRagged } from '@/components/sections/TwoColumnsRagged'
import { EditorialText } from '@/components/sections/EditorialText'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { Marquee } from '@/components/ui/Marquee'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { useT } from '@/context/LanguageContext'

const TECH_ITEMS = [
  { name: 'Vision AI', descKey: 'home.tech.vision' },
  { name: 'Gemini', descKey: 'home.tech.gemini' },
  { name: 'Text-to-Speech', descKey: 'home.tech.tts' },
  { name: 'Cloud Run', descKey: 'home.tech.cloud' },
]

const DEPARTMENTS = [
  'La Paz', 'Oruro', 'Potosi', 'Cochabamba',
  'Santa Cruz', 'Beni', 'Pando', 'Tarija', 'Chuquisaca',
]

export default function HomePage() {
  const t = useT()
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
              {t('home.problem.title')}
            </SplitHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-base leading-relaxed text-neutral font-sans [text-wrap:pretty]">
              {t('home.problem.body')}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. Seccion cinematografica — atardecer andino + ala de condor, texto claro */}
      <div data-nav-theme="dark">
        <CinematicSky />
      </div>

      {/* 4. JourneySteps — fondo beige con silueta de Bolivia, texto oscuro */}
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
        aria-label={t('home.tech.aria')}
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
              <span className="font-sans text-sm text-neutral">{t(item.descKey)}</span>
            </div>
          )}
        />
      </section>

      {/* Marquee de departamentos — fondo oscuro, texto claro */}
      <section
        data-nav-theme="dark"
        aria-label={t('home.depts.aria')}
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
              {t('home.cta.title')}
            </SplitHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mb-10 text-lg text-surface/80 font-sans">
              {t('home.cta.body')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <Link to="/quiz">
              <Button
                size="lg"
                className="bg-surface text-primary hover:bg-surface/90 focus-visible:ring-surface rounded-full px-10 uppercase tracking-[0.08em] text-sm"
              >
                {t('home.cta.button')}
              </Button>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  )
}