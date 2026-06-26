# BoliviaIA — Progreso del Proyecto

> Última actualización: 26 de junio de 2026
> Estado general: **Frontend completo · Backend pendiente**

---

## Visión del producto

**Guía Turística Multiidioma con IA** — App donde el turista explora un catálogo cultural de Bolivia, toma una foto a un sitio u objeto para recibir una explicación generada por IA en su idioma, y responde un quiz para recibir una recomendación de viaje personalizada.

### Arquitectura de alto nivel

```
[Turista] → [Frontend React/Vite] → [Backend NestJS (pendiente)]
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
| **Backend NestJS** | 🔲 Pendiente | Estructura de endpoints definida, lista para implementar |
| **Base de datos** | 🔲 Pendiente | Esquema implícito en los tipos TypeScript |
| **IA (Vision AI + Gemini)** | 🔲 Pendiente | Integración mock lista para swap |
| **TTS (Text-to-Speech)** | 🔲 Pendiente | audioUrl reservada en RecognizeResponse |
| **Deploy (Cloud Run)** | 🔲 Pendiente | vite-plugin-pwa configurado para producción |

---

## Frontend — Completado el 26 de junio de 2026

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
│   │   ├── CountryMaskHero.tsx         ← Hero con silueta SVG de Bolivia (patrones 1+2)
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
├── assets/masks/boliviaMask.ts         ← Path SVG placeholder de Bolivia
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
| 1 | Parallax 2 capas de imagen | `gsap.to(layer, { yPercent, scrub })` | `CountryMaskHero` |
| 2 | Clip-path silueta de país | `stroke-dasharray` draw + reveal | `CountryMaskHero` |
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
dist/assets/index-Dh7X5oIW.js       466.01 kB │ gzip: 150.96 kB
dist/assets/index-BAip8wdX.css        27.59 kB │ gzip:   6.28 kB
dist/sw.js                            (PWA Service Worker)
dist/workbox-*.js                     (Workbox runtime)
```

107 módulos transformados. Build limpio sin warnings de TypeScript.

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
| `src/assets/masks/boliviaMask.ts` | SVG real del contorno de Bolivia |
| `src/pages/Capture/Result.tsx` | Mapa interactivo con coordenadas |
| `src/pages/Library/SiteDetail.tsx` | Mapa interactivo con coordenadas |
| `src/services/api/*.ts` | Implementación completa cuando backend esté listo |
| `public/pwa-192x192.png` | Ícono real de la app para PWA |
| `public/pwa-512x512.png` | Ícono real de la app para PWA |
| `src/pages/About/index.tsx` FAQ | Modelo de negocio / pricing definitivo |

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
