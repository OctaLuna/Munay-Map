# Munay Map — Progreso del Proyecto

> Última actualización: 26 de junio de 2026 (sesión 2 — rediseño visual + fix hero)
> Estado general: **Frontend completo · Backend NestJS completo · Deploy pendiente**
> Nombre del proyecto: **Munay Map** (renombrado desde BoliviaIA el 26/06/2026)

---

## Visión del producto

**Guía Turística Multiidioma con IA** — App donde el turista explora un catálogo cultural de Bolivia, toma una foto a un sitio u objeto para recibir una explicación generada por IA en su idioma, y responde un quiz para recibir una recomendación de viaje personalizada.

### Arquitectura de alto nivel

```
[Turista] → [Frontend React/Vite] → [Backend NestJS]
                                          ↓
                                   [Google Vision AI]
                                   [Google Gemini]
                                   [Google TTS]
                                   [Cloud Run]
```

---

## Estado por capa

| Capa | Estado | Notas |
|---|---|---|
| **Frontend** | ✅ Completo | Todos los componentes, páginas y animaciones |
| **Backend NestJS** | ✅ Completo | 7 endpoints, 35 tests Playwright, mock/real toggle |
| **Base de datos** | 🔲 Pendiente | Esquema implícito en los tipos TypeScript |
| **IA (Vision AI + Gemini)** | ✅ Completo | Implementación real + mock, intercambiables por GOOGLE_CLOUD_MOCK_MODE |
| **TTS (Text-to-Speech)** | ✅ Completo | Implementación real + mock, devuelve MP3 en base64 |
| **Deploy (Cloud Run)** | 🔲 Pendiente | vite-plugin-pwa configurado para producción |

---

## Frontend — Completado el 26 de junio de 2026

> **Actualización 26/06/2026 (sesión 1):** Renombrado a Munay Map + efecto de scroll con silueta real de Bolivia implementado.
> **Actualización 26/06/2026 (sesión 2):** Rediseño visual del Home, Navbar y secciones + fix definitivo del efecto de silueta con SVG 16:9.

### Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Vite | 8.1.0 | Bundler y servidor de desarrollo |
| React | 19.2.7 | UI library |
| TypeScript | 6.0.2 | Tipado estricto (`strict: true`) |
| TailwindCSS | 3.4.19 | Sistema de diseño con tokens bolivianos |
| GSAP | 3.15.0 | Motor de animación (12 patrones) |
| TanStack Query | 5.101.1 | Estado servidor, caché, fetching |
| React Router DOM | 7.18.0 | Enrutamiento SPA |
| Vitest | 4.1.9 | Tests unitarios |
| vite-plugin-pwa | 1.3.0 | Progressive Web App |

### Sistema de diseño — Tokens de color

| Token | Hex | Uso |
|---|---|---|
| `primary` (Verde Tiwanaku) | `#3B5D43` | Marca, navbar, botones primarios |
| `background` (Beige Altiplano) | `#F4E8D3` | Fondo general |
| `surface` (Crema Pergamino) | `#FBF6EC` | Tarjetas sobre el fondo |
| `accent` (Vino Tierra) | `#7A2E32` | CTAs secundarios, hover de links |
| `gold` (Dorado Inti) | `#D4A24C` | Highlights, badges, contadores |
| `neutral` (Tierra Russet) | `#6E4A3F` | Texto secundario, bordes |
| `dark` (Carbón Andino) | `#221C18` | Texto principal, secciones oscuras |

**Fuentes:**
- Titulares: `Fraunces` (serif editorial, Google Fonts)
- Cuerpo: `Inter` (sans-serif, Google Fonts)
- Fallback no-latino: `"Noto Sans"`, `"Noto Serif"` (para japonés, árabe, etc.)

---

### Estructura de carpetas (`frontend/src/`)

```
src/
├── pages/
│   ├── Home/index.tsx                  ← Página principal (9 secciones)
│   ├── Library/index.tsx               ← Catálogo con filtros
│   ├── Library/SiteDetail.tsx          ← Ficha detallada de sitio
│   ├── About/index.tsx                 ← Sobre el proyecto + FAQ
│   ├── Capture/
│   │   ├── CameraIntro.tsx             ← Introducción al flujo
│   │   ├── CameraView.tsx              ← getUserMedia + captura
│   │   ├── Processing.tsx              ← Loading IA
│   │   ├── Result.tsx                  ← Resultado del reconocimiento
│   │   └── NotRecognized.tsx           ← Fallback + sugerencias
│   └── Quiz/
│       ├── QuizFlow.tsx                ← 6 preguntas de perfil
│       └── QuizResult.tsx              ← Recomendaciones personalizadas
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  ← Sticky, mobile-first, hamburger
│   │   ├── Footer.tsx                  ← Links, créditos, tecnologías
│   │   └── LanguageSwitcher.tsx        ← Dropdown buscable, 40 idiomas
│   ├── ui/
│   │   ├── Button.tsx                  ← 4 variantes, loading state
│   │   ├── Card.tsx                    ← Card + CardBody + CardImage
│   │   ├── Chip.tsx                    ← Filtros seleccionables + ChipGroup
│   │   ├── Badge.tsx                   ← 5 variantes de color
│   │   ├── Modal.tsx                   ← <dialog> nativo (escape stacking context)
│   │   ├── ProgressBar.tsx             ← Con animación y aria-valuenow
│   │   ├── Accordion.tsx               ← GSAP height animate (patrón 7)
│   │   └── Marquee.tsx                 ← GSAP xPercent infinito (patrón 8)
   │   ├── sections/
│   │   ├── CountryMaskHero.tsx         ← Hero sticky+scrub con silueta real de Bolivia
│   │   ├── JourneySteps.tsx            ← Scroll pineado 4 pasos (patrón 5)
│   │   ├── StatsCounter.tsx            ← Contadores animados (patrón 6)
│   │   ├── TwoColumnsRagged.tsx        ← Borde irregular SVG (patrón 4)
│   │   └── TestimonialSlider.tsx       ← Drag/swipe con GSAP (patrón 9)
│   └── motion/
│       ├── RevealOnScroll.tsx          ← Wrapper fade+y en viewport
│       ├── SplitHeading.tsx            ← Titular palabra por palabra
│       ├── CounterUp.tsx               ← Número animado en viewport
│       ├── ClipRevealImage.tsx         ← Imagen con clip-path reveal
│       └── ParallaxLayer.tsx           ← Capa con parallax al scroll
├── services/
│   ├── mock/                           ← Implementaciones activas (USE_MOCK_DATA=true)
│   │   ├── sites.ts                    ← getSites(), getSiteById()
│   │   ├── recognize.ts                ← recognizeImage()
│   │   ├── quiz.ts                     ← getQuizQuestions(), getQuizRecommendation()
│   │   └── chat.ts                     ← askGuide()
│   └── api/                            ← Esqueletos para backend NestJS
│       ├── client.ts                   ← Fetch wrapper base con ApiError
│       ├── sites.ts                    ← Firma idéntica al mock
│       ├── recognize.ts                ← Firma idéntica al mock
│       ├── quiz.ts                     ← Firma idéntica al mock
│       └── chat.ts                     ← Firma idéntica al mock
├── hooks/
│   ├── useSites.ts                     ← useQuery + queryOptions tipados
│   ├── useRecognizeImage.ts            ← useMutation
│   ├── useQuiz.ts                      ← useQuizQuestions + useQuizRecommendation
│   ├── useAskGuide.ts                  ← useMutation
│   └── gsap/
│       └── useGsapAnimations.ts        ← useGsapReveal, useSplitTextReveal,
│                                           useParallaxLayer, useCounterUp,
│                                           useClipPathReveal
├── data/
│   ├── sites.mock.ts                   ← 8 registros culturales bolivianos
│   ├── quizQuestions.mock.ts           ← 6 preguntas con etiquetas de matching
│   ├── languages.mock.ts               ← 40 idiomas con códigos BCP-47
│   └── culturalAssets.mock.ts          ← Assets multimedia por sitio
├── types/index.ts                      ← Site, RecognizeResponse, QuizAnswer, etc.
├── context/LanguageContext.tsx         ← Idioma seleccionado (global)
├── lib/
│   ├── gsap.ts                         ← Registro de plugins GSAP
│   ├── featureFlags.ts                 ← USE_MOCK_DATA (único punto de switch)
│   └── utils.ts                        ← cn(), mockDelay(), normalizeForSearch(), etc.
├── assets/masks/boliviaMask.ts         ← Path SVG real de Bolivia (extraído de docs/image/Subtract.svg)
├── styles/
│   ├── globals.css                     ← Tailwind base + skip-link + reduced-motion
│   └── fonts.css                       ← Google Fonts (Fraunces + Inter)
├── test/
│   ├── setup.ts                        ← @testing-library/jest-dom
│   ├── recognize.test.ts               ← 3 tests del servicio de reconocimiento
│   ├── quizMatching.test.ts            ← 3 tests del tag-matching del quiz
│   └── libraryFilters.test.ts          ← 9 tests de los filtros de biblioteca
├── App.tsx                             ← Rutas + layout global
└── main.tsx                            ← Punto de entrada, QueryClient, providers
```

---

### Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Página principal con hero, pasos, stats |
| `/biblioteca` | `Library` | Catálogo con filtros por departamento/categoría/búsqueda |
| `/biblioteca/:id` | `SiteDetail` | Ficha completa de un sitio cultural |
| `/sobre-nosotros` | `About` | Misión + grid de tarjetas + FAQ con acordeón |
| `/camara` | `CameraIntro` | Explicación del flujo de reconocimiento |
| `/camara/view` | `CameraView` | Viewfinder con `getUserMedia`, botón captura |
| `/camara/processing` | `Processing` | Loading animado mientras procesa la IA |
| `/camara/result` | `Result` | Resultado: ficha + explicación IA + audio placeholder |
| `/camara/not-found` | `NotRecognized` | Fallback con sugerencias de la Biblioteca |
| `/quiz` | `QuizFlow` | 6 preguntas de perfil con ProgressBar |
| `/quiz/resultado` | `QuizResult` | 3 secciones: Lugares / Probar / Vivir |

---

### Datos mock incluidos

**8 sitios culturales bolivianos** (`src/data/sites.mock.ts`):

| ID | Nombre | Tipo | Categoría | Departamento |
|---|---|---|---|---|
| `tiwanaku` | Tiwanaku | sitio | sitio_turistico | La Paz |
| `salar-uyuni` | Salar de Uyuni | sitio | sitio_turistico | Potosí |
| `lago-titicaca` | Lago Titicaca e Isla del Sol | sitio | sitio_turistico | La Paz |
| `potosi-cerro-rico` | Potosí y el Cerro Rico | sitio | sitio_turistico | Potosí |
| `chuño` | Chuño y la papa deshidratada andina | patrimonio_inmaterial | gastronomia | La Paz |
| `morenada` | Morenada | patrimonio_inmaterial | danza | Oruro |
| `diablada` | Diablada | patrimonio_inmaterial | danza | Oruro |
| `alasitas` | Feria de Alasitas | patrimonio_inmaterial | tradicion_festividad | La Paz |

**Quiz:** 6 preguntas con 3–4 opciones cada una, etiquetadas para tag-matching con los sitios.

**Idiomas:** 40 idiomas con códigos BCP-47, nombres nativos, nombres en español y emojis de bandera.

---

### Patrones de animación GSAP (12/12 implementados)

| # | Patrón | Implementación | Componente |
|---|---|---|---|
| 1 | Scroll sticky + scrub silueta de país | `useGSAP` + `scale: 3, opacity: 0, scrub: true` | `CountryMaskHero` |
| 2 | Fade del contenido del hero en scroll | `gsap.to(contentRef, { opacity: 0, scrub: true })` | `CountryMaskHero` |
| 3 | Reveal titular palabra por palabra | Split manual + stagger `y: 110%→0` | `SplitHeading` |
| 4 | Borde irregular "papel rasgado" | SVG `<path>` + `gsap.from(attr.d)` | `TwoColumnsRagged` |
| 5 | Scroll pineado tarjetas cascada | `ScrollTrigger({ pin: true })` + stagger | `JourneySteps` |
| 6 | Contadores animados | `gsap.to(obj, { value: target })` en viewport | `StatsCounter` + `CounterUp` |
| 7 | Acordeón GSAP height | `gsap.to(body, { height, opacity })` | `Accordion` |
| 8 | Marquee infinito | `gsap.to(track, { xPercent: -50, repeat: -1 })` | `Marquee` |
| 9 | Slider testimonios drag | `gsap.to(track, { xPercent })` + pointer events | `TestimonialSlider` |
| 10 | Grid bloques alternados | `RevealOnScroll` por tarjeta | `About` cards grid |
| 11 | Badge circular flotante | Logo SVG en Navbar con hover scale | `Navbar` |
| 12 | Fondo líneas de mapa | `bg-map-lines` (SVG inline en Tailwind) | `JourneySteps`, `Hero` |

**Nota:** Todos los patrones respetan `prefers-reduced-motion`. Si el usuario tiene activada la preferencia del sistema, las animaciones se omiten o se reducen a fade sin movimiento.

---

### Tests

**15/15 tests pasan** (`npm run test`):

| Suite | Tests | Qué verifica |
|---|---|---|
| `recognize.test.ts` | 3 | Confianza > 0.5, idioma correcto, audioUrl null en mock, texto japonés con caracteres Unicode |
| `quizMatching.test.ts` | 3 | Devuelve 3 secciones, Salar aparece para perfil aventurero/fotógrafo, máximo 3 por sección |
| `libraryFilters.test.ts` | 9 | Todos los filtros: sin filtro, departamento, categoría, búsqueda texto, acentos, sin resultados, combinado, "todos" |

---

### Configuración de calidad

| Herramienta | Config | Estado |
|---|---|---|
| TypeScript | `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` | ✅ |
| ESLint | `@typescript-eslint` + `react-hooks` + `jsx-a11y` + `prettier` | ✅ |
| Prettier | `singleQuote`, `trailingComma: 'es5'`, `printWidth: 100` | ✅ |
| Vitest | jsdom, `@testing-library/jest-dom` | ✅ |
| PWA | Manifest + Service Worker + Workbox (pre-cache estático + runtime cache Unsplash/Fonts) | ✅ |

---

### Build de producción

```
dist/index.html                       1.18 kB │ gzip:   0.59 kB
dist/assets/index-Ct4P1lTk.js       517.41 kB │ gzip: 175.12 kB
dist/assets/index-C-e1V8za.css       27.24 kB │ gzip:   6.29 kB
dist/sw.js                            (PWA Service Worker)
dist/workbox-*.js                     (Workbox runtime)
```

108 módulos transformados. Build limpio sin errores de TypeScript.

> Nota: el chunk principal creció ~51KB respecto al build anterior debido al path SVG real
> de Bolivia (~51KB sin comprimir, ~12KB gzip). Es comportamiento esperado y aceptable.

---

## Próximos pasos — Backend NestJS

El frontend está completamente desacoplado del backend mediante el patrón `USE_MOCK_DATA`. Cuando el backend esté listo, el proceso de conexión es mínimo:

### Endpoints a implementar

| Endpoint | Método | Descripción | Servicio frontend |
|---|---|---|---|
| `/catalog/sites` | GET | Lista de sitios con filtros opcionales | `services/api/sites.ts` → `getSites()` |
| `/catalog/sites/:id` | GET | Sitio por ID | `services/api/sites.ts` → `getSiteById()` |
| `/recognize` | POST | Reconocimiento de imagen con Vision AI + Gemini | `services/api/recognize.ts` → `recognizeImage()` |
| `/quiz/questions` | GET | Preguntas del quiz | `services/api/quiz.ts` → `getQuizQuestions()` |
| `/quiz/recommendation` | POST | Recomendación basada en respuestas | `services/api/quiz.ts` → `getQuizRecommendation()` |
| `/chat/ask` | POST | Pregunta al guía IA | `services/api/chat.ts` → `askGuide()` |

### Proceso de migración (3 pasos)

1. Cambiar `USE_MOCK_DATA = false` en `src/lib/featureFlags.ts`
2. Configurar `VITE_API_BASE_URL` en `.env.local`
3. Implementar las funciones en `services/api/` (las firmas ya están definidas)

### Tipos a implementar en el backend

Los contratos de datos están definidos en `frontend/src/types/index.ts`. El backend debe respetar:

```typescript
// Respuesta de /recognize
interface RecognizeResponse {
  site: Site | null
  explicacion: string    // Texto generado por Gemini en el idioma solicitado
  idioma: string         // Código BCP-47
  audioUrl: string | null // URL del audio TTS generado
  confianza: number      // 0–1 (umbral de 0.6 para mostrar resultado vs not-found)
}

// Respuesta de /quiz/recommendation
interface QuizRecommendation {
  lugares: Site[]
  gastronomia: Site[]
  experiencias: Site[]
  perfilViajero: string  // Descripción textual del perfil
}
```

---

## Pendientes identificados en el código

Los siguientes elementos están marcados con `// [PENDIENTE]` en el código fuente y requieren completarse antes de producción:

| Ubicación | Pendiente |
|---|---|
| `src/pages/About/index.tsx` | Texto definitivo de la misión |
| `src/pages/Home/index.tsx` | Texto definitivo de "qué resolvemos" |
| `src/components/layout/Footer.tsx` | Información legal (términos, privacidad, contacto, nombre legal) |
| `src/components/sections/TestimonialSlider.tsx` | Testimoniales reales de usuarios |
| `src/pages/Capture/Result.tsx` | Mapa interactivo con coordenadas |
| `src/pages/Library/SiteDetail.tsx` | Mapa interactivo con coordenadas |
| `src/services/api/*.ts` | Implementación completa cuando backend esté listo |
| `public/pwa-192x192.png` | Ícono real de la app para PWA |
| `public/pwa-512x512.png` | Ícono real de la app para PWA |
| `src/pages/About/index.tsx` FAQ | Modelo de negocio / pricing definitivo |

> `src/assets/masks/boliviaMask.ts` — **resuelto el 26/06/2026**: ya contiene el path SVG real extraído de `docs/image/Subtract.svg`.

---

## Decisiones de arquitectura tomadas

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| `USE_MOCK_DATA` como constante (no env var) | `VITE_USE_MOCK=true` | Tree-shaking: TypeScript elimina el código no usado en build de producción |
| `<dialog>` nativo para Modal y LanguageSwitcher | `div` con `position: fixed` | Escapa correctamente stacking contexts de `overflow: hidden` |
| Split de texto manual para SplitText | GSAP SplitText premium | Evita dependencia de plugin de pago; misma funcionalidad para este caso de uso |
| Servicios en dos carpetas (`mock/` y `api/`) con firmas idénticas | Un solo archivo con condicional | Permite cambiar de implementación en tiempo de build, no en runtime |
| TanStack Query v5 con `queryOptions` helper | Queries inline en componentes | Type-safety completa, reutilización de query configs, prefetching simplificado |
| Tailwind v3 (no v4) | Tailwind v4 | v4 no tiene CLI independiente ni `init -p`; v3 es estable y compatible con el ecosistema actual |
| Hero con `h-[200vh]` sticky + scrub | Animación one-shot al cargar | El scrub liga la animación al scroll en ambas direcciones sin lógica de reversa |
| `clipPathUnits="userSpaceOnUse"` en el clipPath de Bolivia | `objectBoundingBox` | El path real usa coordenadas absolutas (1000×1000); userSpaceOnUse evita normalización manual |
| `useGSAP` de `@gsap/react` en CountryMaskHero | `useEffect` manual con `gsap.context` | Limpieza automática de ScrollTriggers, mejor integración con React 19 StrictMode |

---

## Cambios del 26/06/2026

### 1. Renombrado a Munay Map

El proyecto fue renombrado de **BoliviaIA** a **Munay Map**. Archivos actualizados:

| Archivo | Cambio |
|---|---|
| `frontend/index.html` | `<title>` y `og:title` |
| `frontend/README.md` | Título h1 |
| `frontend/vite.config.ts` | `name` y `short_name` del PWA manifest |
| `frontend/src/components/layout/Navbar.tsx` | Logo text + `aria-label` |
| `frontend/src/components/layout/Footer.tsx` | Logo text + copyright |
| `frontend/src/pages/Home/index.tsx` | Texto del body |
| `frontend/src/pages/About/index.tsx` | Subtítulo h1 + cuerpo de texto |
| `docs/progress.md` | Título h1 |
| `.gitignore` | Comentario de cabecera |

Verificado con `grep` — 0 ocurrencias de "BoliviaIA" en el repositorio.

### 2. Efecto de scroll del hero — arquitectura final

#### `src/assets/masks/boliviaMask.ts`

Actualizado dos veces durante la sesión — estado final:

- `MASK_VIEWBOX`: `'0 0 1000 700'` → `'0 0 1000 1000'` → **`'0 0 1920 1080'`** (SVG 16:9 final)
- `BOLIVIA_SUBTRACT_PATH`: compound path = rectángulo `1920×1080` + silueta de Bolivia (usar con `fillRule="evenodd"` para crear el agujero)
- `BOLIVIA_MASK_PATH`: solo la silueta, sin el rectángulo exterior
- **Fuente:** `docs/image/Subtract (1).svg` — viewBox `0 0 1920 1080`, proporción 16:9

> El SVG original `Subtract.svg` era cuadrado `1000×1000`. En pantallas rectangulares (16:9) la máscara nunca cubría el viewport completo, dejando ver la foto directamente por las franjas no cubiertas.

#### `src/components/sections/CountryMaskHero.tsx`

Arquitectura final del componente:

```
<section ref={heroSectionRef} h-[200vh] bg-background>
  <div sticky top-0 h-screen bg-background>          ← fondo beige continuo
    <div imagen-de-fondo />                           ← foto siempre visible detrás
    <svg viewBox="0 0 1920 1080"
         preserveAspectRatio="xMidYMid slice">        ← cubre todo el viewport
      <g ref={maskGroupRef}>                          ← ANIMADO por GSAP: scale + opacity
        <path BOLIVIA_SUBTRACT_PATH
              fill="#F4E8D3"
              fillRule="evenodd" />                   ← fillRule="evenodd" crea el hueco Bolivia
      </g>
    </svg>
    <div ref={contentRef}>                            ← texto, desaparece en 35% del scroll
  </div>
</section>
```

**Animación GSAP (sobre el `<g>` SVG, no sobre un `<div>`):**
```typescript
gsap.to(maskGroupRef, {
  scale: 4, opacity: 0, ease: 'none',
  transformOrigin: '960px 540px',   // centro del viewBox 1920x1080 en coordenadas SVG
  scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
})
gsap.to(contentRef, {
  opacity: 0, y: -24, ease: 'none',
  scrollTrigger: { trigger: hero, start: 'top top', end: '35% top', scrub: true }
})
```

**Comportamiento:**
- Estado inicial: fondo beige con silueta de Bolivia centrada, foto visible a través del hueco
- Scroll hacia abajo: silueta crece (scale 1→4) y desaparece, revelando la foto completa
- Scroll hacia arriba: efecto se revierte en sincronía exacta con el scroll (`scrub: true`)
- `prefers-reduced-motion`: máscara oculta directamente (opacity 0) sin animar

**Tres bugs resueltos (sesión 2):**

| Bug | Causa | Fix |
|---|---|---|
| SVG no cubre el viewport | `Subtract.svg` era `1000×1000` cuadrado | Nuevo `Subtract (1).svg` `1920×1080` 16:9 |
| Franjas transparentes laterales | `preserveAspectRatio="meet"` escala sin cubrir | Cambiado a `"slice"` |
| Máscara se renderiza sólido sin hueco | Faltaba `fillRule="evenodd"` en `<path>` | Agregado `fillRule="evenodd"` |

### 3. Verificación post-sesión 1 (26/06/2026)

- **Build:** 108 módulos transformados, 0 errores TypeScript
- **Tests:** 15/15 pasando sin cambios


---

## Cambios del 26/06/2026 — Sesión 2: Rediseño visual + fix hero

### 1. Rediseño visual del Home — Navbar, secciones y tipografía

**Objetivo:** alinear el estilo con la referencia visual de Flyward — navbar transparente, tipografía editorial, secciones con mayor impacto visual.

#### `Navbar.tsx` — rediseño completo

| Aspecto | Antes | Después |
|---|---|---|
| Fondo | Transparente → `bg-surface/95` al scroll | Siempre transparente |
| Links | `text-sm font-medium` | MAYÚSCULA + `tracking-[0.1em]` + `text-[13px]` |
| Logo | SVG circular verde + "Munay `text-primary` Map" | Solo `font-serif uppercase tracking-[0.12em]`, color único |
| Botón CTA | `rounded-lg` | `rounded-full` (píldora) + uppercase + tracking |
| Tema de texto | Siempre oscuro | Adaptativo: `IntersectionObserver` sobre `data-nav-theme="light|dark"` |

Mecanismo del tema adaptativo: cada sección del Home tiene un `data-nav-theme="light"` o `"dark"` según su fondo.
El Navbar observa qué sección ocupa el top del viewport y cambia el color del texto (`text-dark` vs `text-surface`) con transición de 300ms.

#### `JourneySteps.tsx`

- Título `h2`: uppercase + `tracking-[0.04em]` + `text-display-lg`
- Padding de tarjetas: `p-6` → `p-8`, `rounded-xl` → `rounded-2xl`, `gap-6` → `gap-8`

#### `TwoColumnsRagged.tsx` — rediseño completo

Antes: texto + imagen pequeña side-by-side. Después: dos columnas full-bleed `h-[70vh]` con fotos de fondo reales:

- Columna izquierda: foto de Tiwanaku (Lugares para explorar)
- Columna derecha: foto de la Diablada (Sabores para descubrir)
- Overlay gradiente `from-dark/80 via-dark/30` para legibilidad
- Títulos `h3` en uppercase blanco superpuestos sobre las fotos
- Botones Explorar en píldora `rounded-full` en cada columna
- Divisor SVG rasgado animado con `ScrollTrigger` al entrar en viewport

#### `StatsCounter.tsx`

- Antes: fondo `bg-primary` (verde sólido)
- Después: foto de altiplano (Salar de Uyuni) con `background-attachment: fixed` + overlay `bg-dark/65`
- Labels con `uppercase tracking-[0.08em]`

#### `EditorialText.tsx` — componente nuevo

Nueva sección entre `StatsCounter` y `TestimonialSlider`:

- Fondo `bg-surface` (crema) con `bg-map-lines opacity-30`
- Grilla de 12 columnas asimétrica: título H2 uppercase (4 cols) + párrafos desplazados (8 cols)
- Cita editorial con borde dorado izquierdo (`border-l-2 border-gold`)
- `RevealOnScroll` con delays escalonados por elemento

#### `Home/index.tsx`

- Integra `EditorialText` entre `StatsCounter` y `TestimonialSlider`
- Cada sección envuelta en `<div data-nav-theme="light|dark">` para el navbar adaptativo
- Títulos `h2`: `uppercase tracking-[0.04em] text-display-lg`

### 2. Fix definitivo del efecto de silueta de Bolivia

Documentado en la sección `### 2. Efecto de scroll del hero — arquitectura final` arriba.

### 3. Verificación post-sesión 2 (26/06/2026)

- **Build:** 109 módulos transformados (108 + `EditorialText`), 0 errores TypeScript
- **Tests:** 15/15 pasando sin cambios
- **Archivo nuevo:** `docs/image/Subtract (1).svg` — SVG `1920×1080` 16:9 agregado a la carpeta de assets de documentación


---

## Cambios del 27/06/2026 — Sesión 3: Técnicas cinematográficas Flyward

**Objetivo:** llevar el Home más cerca del lenguaje visual de Flyward, manteniendo
la paleta Munay Map y la silueta real de Bolivia (`Subtract (1).svg`).

### 1. `CinematicSky.tsx` — sección nueva (equivalente a "Travel Simple")

Sección full-viewport (`h-[105vh]`) con composición por capas, insertada en el Home
entre "El problema que resolvemos" y `JourneySteps` (`data-nav-theme="dark"`).

| Capa | Técnica | Detalle |
|---|---|---|
| Cielo | `linear-gradient` + `clip-path: polygon` | Atardecer andino (Dorado Inti → Vino Tierra → Carbón) con borde inferior de cordillera |
| Resplandor solar | `radial-gradient` | Foco cálido bajo, centrado |
| Ala de cóndor | 2 `<polygon>` SVG superpuestos | Reemplaza el "ala de avión" de Flyward por un motivo andino |
| Ruta de vuelo | `stroke-dashoffset` + `getTotalLength()` | Curva bézier dibujada ligada al scroll (`scrub: 1.5`), con paradas |
| Texto fantasma | `clamp()` + opacidad 0.07 + parallax `xPercent` | "Patrimonio vivo" decorativo |
| Borde inferior | `clip-path: polygon` (papel rasgado) | Transición al fondo beige de la sección siguiente |

Parallax del cielo (`yPercent: -14`, `scrub: 1`). Todo respeta `prefers-reduced-motion`
(sin parallax; la ruta aparece ya dibujada).

### 2. `JourneySteps.tsx` — rediseño al patrón "How We Support"

Reemplazado el scroll pineado por la grilla 2×2 escalonada de Flyward (pasos 2 y 4 con
`md:mt-16`), conectada por un **camino dorado dibujado a mano** (`#journey-path`):

- `getTotalLength()` + `strokeDasharray`/`strokeDashoffset` animado con `scrub: 1.5`.
- Números de paso con rebote elástico `ease: 'back.out(1.8)'` (`scale 0→1`).
- Reveal por tarjeta (`power2.out`, `toggleActions: 'play none none none'`).
- Fondo: silueta real de Bolivia (`BOLIVIA_MASK_PATH`) a opacidad `0.05` como textura.
- Camino oculto en mobile (`hidden md:block`); grilla colapsa a una columna.

### 3. Verificación post-sesión 3 (27/06/2026)

- **Typecheck:** `tsc -b` exit 0
- **Build:** producción limpia, 0 errores TypeScript
- **Tests:** 16/16 pasando (sin cambios en suites)
- **Verificación visual:** Playwright (1440×900) — hero, sección cinematográfica y pasos
  confirmados sin errores de consola
- **Lint:** los `no-undef` de tipos DOM (`HTMLElement`, `SVGPathElement`) son un hueco
  preexistente de la config de ESLint (afecta también a `CountryMaskHero`/`StatsCounter`),
  no una regresión de esta sesión


---

## Cambios del 27/06/2026 — Sesión 4: DevOps (CI/CD + contenedores)

**Objetivo:** cerrar la sección 8 (Despliegue/DevOps) del documento técnico definitivo,
que estaba documentada pero sin implementar en el repo.

### Estado de conformidad con el documento técnico definitivo

Auditado el backend contra el documento: **ya conforma la arquitectura modular** descrita.
Presentes y cableados en `app.module.ts`: `HealthModule`, `CatalogModule`, `VisionModule`,
`GeminiModule`, `TtsModule`, `RecognizeModule`, `ChatModule`, `QuizModule`, `ThrottlerModule`
(rate limiting 60/min) y `ConfigModule`. Cada servicio externo tiene par mock/real.

### Archivos nuevos

| Archivo | Rol |
|---|---|
| `frontend/Dockerfile` | Build multi-stage (node:20-alpine → nginx:1.27-alpine), Cloud Run-aware (`${PORT}`) |
| `frontend/nginx.conf.template` | Config SPA: fallback a `index.html`, `sw.js` sin caché, assets con caché inmutable, gzip |
| `frontend/.dockerignore` | Excluye `node_modules`, `dist`, `.env`, etc. del contexto de build |
| `.github/workflows/ci.yml` | CI: build + tests de backend (Jest) y frontend (Vitest) en push/PR |
| `.github/workflows/deploy-cloudrun.yml` | Deploy manual a Cloud Run vía Artifact Registry + Workload Identity Federation |

### Decisiones

- **Monorepo (pnpm + Turborepo + `packages/shared-types`):** el documento lo describe como
  estructura objetivo, pero el repo usa carpetas separadas `frontend/` y `backend/`. **No se
  forzó** la migración en esta sesión: es una reestructuración mayor y de alto riesgo que no
  fue solicitada explícitamente. Divergencia consciente, documentada aquí.
- **Workload Identity Federation** en el deploy en lugar de clave JSON en el repo, alineado con
  la sección 6 ("API keys ... nunca hardcodeadas en el repositorio").
- **Frontend con nginx** (no servidor Node): la PWA compila a estáticos; nginx + `envsubst` del
  `${PORT}` es el patrón estándar y liviano para Cloud Run.

### Verificación post-sesión 4 (27/06/2026)

- **Backend:** `nest build` exit 0 · **Jest 27/27** tests pasando
- **Frontend:** `vite build` limpio · **Vitest 16/16** pasando
- **Workflows:** YAML válido (parseado con `js-yaml`)
- **Docker:** **no validado en esta sesión** — el daemon de Docker Desktop no estaba corriendo
  (solo respondía el cliente). El `frontend/Dockerfile` sigue el patrón multi-stage ya verificado
  del `backend/Dockerfile` + el mecanismo estándar de plantillas de `nginx:alpine`. Pendiente:
  `docker build ./frontend` y smoke test (`-e PORT=8080`) cuando el daemon esté disponible
- **Seguridad:** `backend/.env` confirmado fuera de git (`.gitignore:22`); contiene secretos
  locales reales — **no commitear**. Pendiente real: mover a Google Secret Manager en deploy.


---

## Cambios del 27/06/2026 — Sesión 5: Guía turística personalizada (quiz → itinerario)

**Objetivo:** convertir el quiz existente (perfil + recomendaciones por categoría) en una
**guía de turismo completa y optimizada**: un itinerario día por día adaptado a los gustos
del viajero, además de duración, mejor época y presupuesto sugeridos.

### Enfoque

El quiz ya existía (9 preguntas en `/quiz`, ruta "Tu Guía Personalizada"). En vez de duplicarlo,
se **extendió** el contrato `QuizRecommendation` con campos **aditivos** (no rompe los tests de
contrato existentes) y se redibujó la pantalla de resultado.

### Campos nuevos en `QuizRecommendation` (frontend `types/index.ts` + backend)

| Campo | Qué aporta |
|---|---|
| `itinerario: ItinerarioDia[]` | Recorrido día por día, **ordenado por región** para minimizar traslados |
| `duracionSugeridaDias` | Igual al nº de días del itinerario |
| `mejorEpoca` | Derivada de la respuesta de temporada (q9), con respaldo por intereses |
| `presupuesto` | Nivel + rango USD/día, derivado de la respuesta de presupuesto (q6) |
| `resumenPerfil` | Narrativa breve del perfil |
| `intereses` | Etiquetas dominantes (chips) |

Cada `ItinerarioDia` enlaza un sitio (`siteId` → `/biblioteca/:id`), un tema, y filas
**Para comer / Para vivir / Consejo** (gastronomía + danza/festividad + micro-tip por región).

### Archivos

| Archivo | Cambio |
|---|---|
| `backend/src/quiz/quiz.service.ts` | **Ruta activa** (`USE_MOCK_DATA=false`): builder de itinerario, presupuesto, época, resumen |
| `frontend/src/services/mock/quiz.ts` | Mismo builder (paridad de contrato y tests sin backend) |
| `frontend/src/types/index.ts` | Tipos `ItinerarioDia`, `QuizPresupuesto` + extensión de `QuizRecommendation` |
| `frontend/src/pages/Quiz/QuizResult.tsx` | Rediseño: hero de perfil + chips, banda resumen (duración/época/presupuesto), **timeline de itinerario**, botón Imprimir/Guardar, secciones por categoría + tips |
| `frontend/src/test/quizGuide.test.ts` | **Nuevo** — 6 tests (itinerario, orden geográfico, presupuesto q6, época q9, intereses, compatibilidad) |
| `backend/src/quiz/quiz.service.spec.ts` | +2 tests (itinerario numerado, presupuesto/época/intereses) |

### Verificación post-sesión 5 (27/06/2026)

- **Frontend:** `tsc -b` exit 0 · **Vitest 22/22** (16 previos + 6 nuevos)
- **Backend:** `nest build` exit 0 · **Jest 29/29** (27 previos + 2 nuevos)
- **End-to-end:** frontend + backend NestJS real (mock mode) levantados; quiz completado en
  navegador (Playwright) → `/quiz/resultado` renderiza la guía con itinerario de 3 días
  ordenado por región, presupuesto y época derivados, **sin errores de consola**

### Fix de integración: base URL del cliente (`/api` → sin prefijo) — 27/06/2026

**Síntoma:** `GET http://localhost:3000/api/quiz/questions → 404` al cargar el quiz.

**Causa:** el cliente del frontend usaba base `http://localhost:3000/api`, pero el backend
expone las rutas **sin prefijo** (`/quiz/...`, `/catalog/...`, `/health`). Esto es lo intencional:
los 35 tests Playwright del backend usan `baseURL: http://localhost:3000` y llaman `/quiz/...`
sin `/api`, el healthcheck es `/health`, y el documento técnico lista las rutas sin `/api`.
Agregar `setGlobalPrefix('api')` habría roto esos 35 tests y el healthcheck.

**Fix (lado frontend):**
- `frontend/src/services/api/client.ts` — base por defecto `http://localhost:3000` (sin `/api`)
- `frontend/.env.example` — `VITE_API_BASE_URL=http://localhost:3000`
- `frontend/src/lib/featureFlags.ts` — comentario actualizado

**Verificación:** contra el backend vivo en `:3000`, `GET /quiz/questions → 200` y
`GET /api/quiz/questions → 404` (el error original). `tsc -b` exit 0 · Vitest 22/22.


---

## Cambios del 27/06/2026 — Sesión 6: Internacionalización (i18n) de la UI

**Objetivo:** que seleccionar un idioma en el selector del Navbar cambie el idioma de
**toda la web**. Antes el selector solo guardaba el idioma en contexto (se pasaba como
`idioma` a la IA), pero el texto de la UI estaba hardcodeado en español.

### Enfoque (decisión del usuario: "Infra + ES/EN, resto pluggable")

Motor i18n propio, ligero y sin dependencias. Traducción completa de **ES (origen) + EN**;
los otros 38 idiomas del selector caen con elegancia a EN, y agregar uno nuevo es soltar
un archivo en `src/i18n/locales/`.

### Archivos nuevos

| Archivo | Rol |
|---|---|
| `src/i18n/index.ts` | Motor: `makeT()` con interpolación `{var}`, cadena de fallback (locale → en → es → clave), resolución de código (`pt-BR`→`pt`→`en`), `dirFor()` (RTL: ar/he/fa/ur), `isFullyTranslated()` |
| `src/i18n/locales/es.ts` | Diccionario de origen (Español) — ~150 claves |
| `src/i18n/locales/en.ts` | Diccionario Inglés (fallback universal) |

### Cambios clave

- **`src/context/LanguageContext.tsx`** — ahora expone `t` y `dir`; persiste el idioma en
  `localStorage('munay-lang')`; sincroniza `<html lang>` y `<html dir>` en cada cambio.
  Atajo `useT()` para componentes que solo traducen.
- **`src/App.tsx`** — el subárbol se envuelve en `<Fragment key={language.code}>`: al cambiar
  de idioma se hace **remount limpio** (re-evalúa `t()`, re-divide los `SplitHeading` y
  re-inicializa GSAP, evitando el conflicto entre la manipulación manual del DOM y React).
- **Componentes refactorizados a `t()`:** Navbar, LanguageSwitcher, Footer, Home + sus
  secciones (CountryMaskHero, CinematicSky, JourneySteps, TwoColumnsRagged, StatsCounter,
  EditorialText, TestimonialSlider), QuizFlow y QuizResult, y la página 404.

### Alcance / límites (consistente con la opción elegida)

- **Contenido dinámico del backend** (preguntas del quiz, `perfilViajero`, textos del
  itinerario, tips) sigue viniendo en español del NestJS — esa traducción es responsabilidad
  del mecanismo `idioma`/Gemini, no de la i18n de la UI. La **UI/chrome** sí cambia por completo.
- **Páginas Library/About/Camera (cuerpos):** su Navbar/Footer ya traduce; los textos internos
  siguen el mismo patrón `useT()` y se agregan con sus claves cuando se prioricen.

### Verificación post-sesión 6 (27/06/2026)

- **Typecheck:** `tsc -b` exit 0 · **Vitest 22/22** · `vite build` limpio
- **Navegador (Playwright):** ES→EN cambia Navbar/Footer/Home por completo; `<html lang>`
  pasa de `es` a `en`; **persistencia** confirmada tras recargar (`localStorage`);
  **RTL** confirmado (Árabe → `dir=rtl`, con fallback de texto a EN); **sin errores de consola**


---

## Cambios del 27/06/2026 — Sesión 7: Mapa departamental interactivo en el hero

**Objetivo:** que la silueta de Bolivia del hero muestre los límites de los 9 departamentos
y que cada uno brille levemente al hacer hover — sin tocar la animación de recorte ni los estilos.

### Diagnóstico (confirmado con el usuario)

- `docs/image/Subtract (1).svg` (el que usa el hero) es **un único `<path>` unificado**, sin
  divisiones. No servía para hover por departamento.
- El usuario aportó `docs/image/bolivia.svg`: viewBox `0 0 1000 1000`, **9 `<path>`** con id ISO
  y nombres en `label_points` (BOL=La Paz, BOO=Oruro, BOP=Potosí, BOT=Tarija, BOS=Santa Cruz,
  BOH=Chuquisaca, BON=Pando, BOB=Beni, BOC=Cochabamba).

### Implementación

| Archivo | Cambio |
|---|---|
| `src/assets/masks/boliviaDepartments.ts` | **Nuevo** (autogenerado): los 9 paths + `DEPT_FIT_TRANSFORM` que mapea el espacio 1000×1000 al bbox de `BOLIVIA_MASK_PATH` en 1920×1080 |
| `src/components/sections/CountryMaskHero.tsx` | `<clipPath id="bolivia-clip">` (silueta) + capa `<g>` de departamentos **dentro** del `maskGroup` animado, recortada a la silueta; capa de texto a `pointer-events-none` y botones a `pointer-events-auto` |
| `src/styles/globals.css` | `.dept-region` (bordes visibles) + `.dept-region:hover` (brillo dorado translúcido), respetando `prefers-reduced-motion` |

**Claves técnicas:**
- **Alineación exacta:** el `transform` se calculó ajustando el *bounding box* de la unión de los
  9 departamentos al de la silueta (medidos con `getBBox` en headless). La verificación visual
  mostró que `bolivia.svg` es el origen real de la silueta → los bordes calzan perfecto.
- **Sin interferencia:** no se modificó `BOLIVIA_SUBTRACT_PATH`, ni la animación `scale/opacity`,
  ni la paleta. La capa va **dentro** del `maskGroup`, así escala/desvanece en sincronía con el
  recorte; `vector-effect="non-scaling-stroke"` mantiene el grosor del borde constante; el
  `clipPath` (userSpaceOnUse) garantiza que nada se salga de la silueta.
- **Hover:** puro CSS (`fill` dorado al `:hover` + transición), un solo departamento a la vez.

### Verificación post-sesión 7 (27/06/2026)

- **Typecheck:** `tsc -b` exit 0 · `vite build` limpio · **Vitest 22/22**
- **Navegador (Playwright, 1440×900):** 9 `.dept-region` presentes; bordes visibles; al hover
  solo el departamento apuntado toma `fill rgba(212,162,76,0.34)`; al hacer scroll la silueta
  **sigue escalando/desvaneciéndose** (animación intacta) con los departamentos en sincronía;
  **sin errores de consola**


---

## Cambios del 27/06/2026 — Sesión 8: Reducción del tamaño del mapa del hero

**Objetivo:** el mapa de Bolivia del hero estaba muy grande (tapaba el navbar y desbordaba el
borde inferior). Reducirlo levemente **sin tocar la animación de recorte ni los estilos**.

### Enfoque (decisión técnica)

Se evaluó escalar el grupo animado con una escala base < 1, pero GSAP calcula `transformOrigin`
**relativo al bounding box**, y agrandar el rect (para no revelar la foto en los bordes) corría
el bbox y descentraba la animación. En lugar de pelear con el origen de GSAP, se **horneó la
reducción en la geometría**, dejando la animación exactamente como estaba.

### Implementación

- `src/assets/masks/boliviaMask.ts` — `BOLIVIA_MASK_PATH` y la silueta de `BOLIVIA_SUBTRACT_PATH`
  escaladas a **0.86 sobre su propio centro** (bbox nueva: x 574→1465, y 90→990 en 1920×1080 →
  ~90px de margen arriba y abajo). El **rect se mantiene a 1920×1080** para que el fondo beige
  cubra el viewport y la animación `scale 1→4` siga centrada en (960,540).
- `src/assets/masks/boliviaDepartments.ts` — `DEPT_FIT_TRANSFORM` recalculado para ajustar los 9
  departamentos a la **nueva silueta más chica** (alineación mantenida).
- `src/components/sections/CountryMaskHero.tsx` — **sin cambios funcionales**: la animación volvió
  a su forma original (`gsap.to`, `transformOrigin '960px 540px'`). El overlay de departamentos y
  su hover quedan intactos.

### Verificación post-sesión 8 (27/06/2026)

- **Typecheck:** `tsc -b` exit 0 · `vite build` limpio · **Vitest 22/22**
- **Navegador (Playwright):** a 1920×1080 y 1366×768 el mapa queda más chico, con **margen sobre
  el navbar y el borde inferior**; el fondo beige cubre todo (sin foto en los bordes); el `transform`
  en reposo vuelve a ser identidad `matrix(1,0,0,1,0,0)`; **hover por departamento** sigue
  funcionando; la **animación de recorte** crece desde el centro igual que antes; **sin errores**


---

## Backend NestJS — Completado el 26 de junio de 2026

### Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| NestJS | 11.0.1 | Framework backend |
| TypeScript | 5.7.3 (strict) | Tipado |
| @nestjs/config | 4.0.4 | Variables de entorno |
| @nestjs/swagger | 11.4.4 | Documentación OpenAPI en /api/docs |
| @nestjs/throttler | 6.5.0 | Rate limiting (60 req/min) |
| class-validator | 0.15.1 | Validación de DTOs |
| @google-cloud/vision | 5.3.7 | Vision AI |
| @google/genai | 2.10.0 | Gemini 2.5 Flash |
| @google-cloud/text-to-speech | 6.4.1 | TTS — MP3 en base64 |
| Playwright | 1.61.1 | Tests de API (sin browser) |

### Endpoints implementados

| Método | Endpoint | Módulo | Tests |
|---|---|---|---|
| `GET` | `/health` | `HealthModule` | 2 |
| `GET` | `/catalog/sites` | `CatalogModule` | 5 |
| `GET` | `/catalog/sites/:id` | `CatalogModule` | 3 |
| `POST` | `/recognize` | `RecognizeModule` | 7 |
| `POST` | `/chat/ask` | `ChatModule` | 7 |
| `GET` | `/quiz/questions` | `QuizModule` | 3 |
| `POST` | `/quiz/recommendation` | `QuizModule` | 6 |

**Total: 35/35 tests Playwright pasando**

### Catálogo de datos (`data/sites.json`)

13 sitios culturales bolivianos:

| ID | Nombre | Tipo | Departamento |
|---|---|---|---|
| `tiwanaku` | Tiwanaku | sitio_turistico | La Paz |
| `salar-uyuni` | Salar de Uyuni | sitio_turistico | Potosí |
| `lago-titicaca` | Lago Titicaca e Isla del Sol | sitio_turistico | La Paz |
| `potosi-cerro-rico` | Potosí y el Cerro Rico | sitio_turistico | Potosí |
| `sucre-ciudad-blanca` | Sucre, la Ciudad Blanca | sitio_turistico | Chuquisaca |
| `parque-madidi` | Parque Nacional Madidi | sitio_turistico | La Paz |
| `samaipata` | El Fuerte de Samaipata | sitio_turistico | Santa Cruz |
| `chuño` | Chuño y la papa deshidratada andina | gastronomia | La Paz |
| `morenada` | Morenada | danza | Oruro |
| `diablada` | Diablada | danza | Oruro |
| `alasitas` | Feria de Alasitas | tradicion_festividad | La Paz |
| `carnaval-oruro` | Carnaval de Oruro | tradicion_festividad | Oruro |
| `salteña` | Salteña | gastronomia | Chuquisaca |

### Patrón mock/real

Cada servicio externo tiene:
- `*.service.interface.ts` — Port TypeScript puro
- `*.service.ts` — Implementación real (usa SDK)
- `*.service.mock.ts` — Mock (datos hardcodeados, sin red)
- `*.module.ts` — Selección por `GOOGLE_CLOUD_MOCK_MODE` env var

### Skills creadas

| Skill | Documenta |
|---|---|
| `add-google-cloud-module` | Cómo agregar un módulo de integración Google Cloud con patrón mock/real |
| `playwright-api-test` | Cómo escribir tests de API con Playwright para este backend |
| `mock-real-toggle` | Cómo cambiar entre modo mock y modo real, credenciales, troubleshooting |

### Próximo paso: Conexión frontend ↔ backend

1. En `frontend/.env.local`: `VITE_API_BASE_URL=http://localhost:3000/api`
2. En `frontend/src/lib/featureFlags.ts`: `USE_MOCK_DATA = false`
3. Las firmas en `frontend/src/services/api/` ya coinciden con los endpoints — implementación mínima.
