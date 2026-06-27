# Munay Map — Guía Turística Multiidioma con IA

Frontend production-grade para una app de turismo cultural boliviano con reconocimiento de imágenes, explicaciones generadas por IA en 40+ idiomas y recomendaciones de viaje personalizadas.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Vite + React 19 + TypeScript 6 | Base del proyecto |
| TailwindCSS v3 | Sistema de diseño con tokens de color bolivianos |
| GSAP + ScrollTrigger | 12 patrones de animación |
| TanStack Query v5 | Manejo de estado servidor |
| React Router DOM v7 | Enrutamiento SPA |
| Vitest + RTL | Tests unitarios |
| vite-plugin-pwa | Progressive Web App |

---

## Correr el proyecto en desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## Comandos disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción (TypeScript + Vite)
npm run preview      # Preview del build de producción
npm run test         # Tests unitarios (una sola vez)
npm run test:watch   # Tests en modo watch
npm run lint         # ESLint con reglas de accesibilidad
npm run format       # Prettier sobre src/
```

---

## Estructura de carpetas

```
frontend/src/
├── pages/           # Rutas de la aplicación
│   ├── Home/        # Página principal con hero, pasos, stats, etc.
│   ├── Library/     # Catálogo + detalle de sitios
│   ├── About/       # Sobre el proyecto + FAQ
│   ├── Capture/     # Flujo de cámara (5 pantallas)
│   └── Quiz/        # Quiz + resultado con recomendaciones
├── components/
│   ├── layout/      # Navbar, Footer, LanguageSwitcher
│   ├── ui/          # Button, Card, Chip, Badge, Modal, ProgressBar, Accordion, Marquee
│   ├── sections/    # CountryMaskHero, JourneySteps, StatsCounter, TwoColumnsRagged, TestimonialSlider
│   └── motion/      # RevealOnScroll, SplitHeading, CounterUp, ClipRevealImage, ParallaxLayer
├── services/
│   ├── mock/        # Implementaciones mock (activas por defecto)
│   └── api/         # Esqueletos para el backend NestJS real
├── hooks/           # useSites, useRecognizeImage, useQuiz, useAskGuide
│   └── gsap/        # useGsapReveal, useSplitTextReveal, useParallaxLayer, useCounterUp, useClipPathReveal
├── data/            # Mocks de datos (8 sitios, quiz, idiomas, assets)
├── types/           # Tipos TypeScript del dominio
├── context/         # LanguageContext (idioma seleccionado)
├── lib/             # gsap.ts, featureFlags.ts, utils.ts
└── assets/masks/    # boliviaMask.ts (silueta SVG del hero)
```

---

## Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Página principal con hero, pasos, stats |
| `/biblioteca` | `Library` | Catálogo con filtros |
| `/biblioteca/:id` | `SiteDetail` | Detalle de un sitio cultural |
| `/sobre-nosotros` | `About` | Misión + FAQ |
| `/camara` | `CameraIntro` | Introducción al reconocimiento |
| `/camara/view` | `CameraView` | Viewfinder con getUserMedia |
| `/camara/processing` | `Processing` | Loading mientras procesa la IA |
| `/camara/result` | `Result` | Resultado del reconocimiento |
| `/camara/not-found` | `NotRecognized` | Fallback + sugerencias |
| `/quiz` | `QuizFlow` | 6 preguntas de perfil de viajero |
| `/quiz/resultado` | `QuizResult` | Recomendaciones personalizadas |

---

## Migrar de datos mock al backend real (NestJS)

Cuando el backend NestJS esté listo, el proceso de migración es de **un solo cambio**:

### Paso 1 — Editar `src/lib/featureFlags.ts`

```typescript
// Cambiar de:
export const USE_MOCK_DATA = true

// A:
export const USE_MOCK_DATA = false
```

### Paso 2 — Configurar la URL del backend en `.env.local`

```bash
VITE_API_BASE_URL=https://tu-backend.cloud.run.app/api
```

### Paso 3 — Implementar los servicios en `src/services/api/`

Los archivos ya existen con las firmas correctas. Solo hay que completar la lógica (actualmente son wrappers sobre `apiClient`):

| Archivo | Endpoint correspondiente |
|---|---|
| `services/api/sites.ts` | `GET /catalog/sites`, `GET /catalog/sites/:id` |
| `services/api/recognize.ts` | `POST /recognize` |
| `services/api/quiz.ts` | `GET /quiz/questions`, `POST /quiz/recommendation` |
| `services/api/chat.ts` | `POST /chat/ask` |

Los hooks (`useSites`, `useRecognizeImage`, etc.) ya están escritos para importar de la implementación correcta según `USE_MOCK_DATA`. **No hay nada más que cambiar.**

---

## Reemplazar la silueta de Bolivia en el hero

El hero usa un path SVG placeholder. Para usar el contorno real de Bolivia:

### Paso 1 — Obtener el SVG real

Obtener un SVG oficial del contorno de Bolivia (por ejemplo de [Natural Earth](https://www.naturalearthdata.com/) o de un servicio de shapes geográficos).

### Paso 2 — Extraer el path

Abrir el SVG en un editor de texto o Figma/Inkscape y copiar el atributo `d` del elemento `<path>` principal.

### Paso 3 — Actualizar `src/assets/masks/boliviaMask.ts`

```typescript
export const MASK_VIEWBOX = '0 0 ANCHO ALTO'  // Ajustar al viewBox real del SVG
export const BOLIVIA_MASK_PATH = 'M ... Z'    // Pegar el path real aquí
```

**No hay que tocar ningún componente.** `CountryMaskHero` lee estas constantes directamente.

---

## Patrones de animación GSAP implementados

| # | Patrón | Componente | Ubicación |
|---|---|---|---|
| 1 | Parallax 2 capas | `CountryMaskHero` | Home hero |
| 2 | Clip-path silueta país | `CountryMaskHero` | Home hero |
| 3 | SplitText reveal palabra/línea | `SplitHeading` | Todos los H1/H2 |
| 4 | Borde irregular "papel rasgado" | `TwoColumnsRagged` | Home sección 4 |
| 5 | Scroll pineado tarjetas cascada | `JourneySteps` | Home sección 3 |
| 6 | Contadores animados | `StatsCounter` | Home sección 5 |
| 7 | Acordeón GSAP height | `Accordion` | About FAQ |
| 8 | Marquee infinito | `Marquee` | Home tecnologías/departamentos, About |
| 9 | Slider testimonios drag | `TestimonialSlider` | Home sección 7 |
| 10 | Grid bloques alternados | `AboutGrid` | About |
| 11 | Badge circular flotante | Logo SVG | Navbar |
| 12 | Fondo líneas de mapa | `MapLinesBg` | JourneySteps, Hero |

Todos respetan `prefers-reduced-motion`: si el usuario tiene activada la preferencia, las animaciones se saltean o se reducen a fade simple.

---

## Accesibilidad

- Roles ARIA en todos los componentes interactivos
- `aria-live` en resultados dinámicos (búsqueda, cámara, quiz)
- Skip link al contenido principal
- Navegación por teclado completa
- Contraste verificado (AA mínimo en todos los tokens de color)
- Fallback de fuentes para caracteres no latinos (`Noto Sans`, `Noto Serif`)
- Imágenes con `alt` descriptivo

---

## Variables de entorno

| Variable | Descripción | Requerida para |
|---|---|---|
| `VITE_API_BASE_URL` | URL base del backend NestJS | Solo cuando `USE_MOCK_DATA = false` |

---

## Tests

```bash
npm run test
```

Cobertura de tests unitarios:

| Test | Archivo | Qué verifica |
|---|---|---|
| Reconocimiento mock | `recognize.test.ts` | Confianza, idioma, audioUrl |
| Quiz matching | `quizMatching.test.ts` | Tag-matching, límite de resultados |
| Filtros biblioteca | `libraryFilters.test.ts` | Departamento, categoría, búsqueda, normalización |

---

## [PENDIENTE] Antes de producción

Los siguientes elementos están marcados como `[PENDIENTE]` en el código y requieren completarse:

- [ ] Texto definitivo de la misión en `About` y `Home`
- [ ] Información legal (términos, privacidad, contacto) en `Footer`
- [ ] Testimoniales reales de usuarios en `TestimonialSlider`
- [ ] SVG real del contorno de Bolivia en `boliviaMask.ts`
- [ ] Mapa interactivo en `SiteDetail` y `Result`
- [ ] Implementación de servicios en `services/api/` cuando el backend esté listo
- [ ] Iconos PWA reales (`pwa-192x192.png`, `pwa-512x512.png`)
- [ ] Modelo de negocio / pricing en FAQ
