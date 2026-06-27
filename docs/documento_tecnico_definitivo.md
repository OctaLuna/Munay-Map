# Guía turística multiidioma con IA
## Documento técnico de arquitectura — versión definitiva

**Estado:** Definitivo — Fase 1 (MVP)
**Stack confirmado:** NestJS (backend) + React (frontend) + Vision AI + Gemini API + Text-to-Speech + Cloud Run

---

## 1. Resumen ejecutivo

Bolivia pierde ingresos turísticos por la falta de guías accesibles para turistas no hispanohablantes. La solución es una aplicación donde el turista apunta la cámara a un sitio u objeto y recibe, en su propio idioma, una explicación cultural/histórica generada por IA y narrada en voz.

**Tecnologías de fase 1:**

| Tecnología | Rol en el proyecto |
|---|---|
| Vision AI | Reconoce el sitio u objeto en la foto |
| Gemini API | Genera la explicación cultural/histórica y la traduce |
| Text-to-Speech | Convierte la explicación en audio |
| Cloud Run | Aloja y orquesta todo el backend |

Quedan reservadas para fases posteriores: Vertex AI, Agent Builder, Speech-to-Text y BigQuery.

---

## 2. Stack tecnológico definitivo

| Capa | Tecnología | Por qué |
|---|---|---|
| Backend | **NestJS** (TypeScript) | Arquitectura modular con inyección de dependencias, ideal para aislar cada integración (Vision AI, Gemini, TTS) en su propio módulo, y con soporte nativo para Docker/Cloud Run |
| Frontend | **React + Vite** (TypeScript) | Build rápido, ecosistema maduro, fácil de convertir en PWA instalable |
| PWA | `vite-plugin-pwa` | Permite instalar la app desde el navegador y acceso a cámara sin pasar por tiendas de apps |
| Validación de datos | `class-validator` + `class-transformer` (DTOs en NestJS) | Garantiza que cada request a Vision AI/Gemini/TTS llegue bien formada |
| Documentación de API | `@nestjs/swagger` | Genera documentación OpenAPI automáticamente a partir de los DTOs |
| Manejo de configuración/secretos | `@nestjs/config` + Google Secret Manager | Las API keys de Google Cloud nunca quedan hardcodeadas ni en el repositorio |
| Estado y llamadas a la API (frontend) | TanStack Query (React Query) | Maneja caché, reintentos y estados de carga de forma estándar |
| Estilos (frontend) | Tailwind CSS | Velocidad de desarrollo y consistencia visual |
| Monorepo | pnpm workspaces + Turborepo | Backend y frontend comparten tipos TypeScript sin duplicar código |
| Contenedores | Docker (multi-stage build) | Requisito para desplegar en Cloud Run |
| CI/CD | GitHub Actions | Build, test y despliegue automático a Cloud Run |

---

## 3. Arquitectura técnica (fase 1)

Flujo de una interacción completa:

1. **App del turista** (React + Vite, PWA) — selecciona idioma, toma la foto con la cámara
2. **Backend NestJS en Cloud Run** — recibe la petición en el endpoint `/recognize`, valida el payload y orquesta el resto del proceso entre sus módulos internos
3. **VisionModule + CatalogModule** — envía la imagen a Vision AI (landmarks, etiquetas genéricas, texto en letreros) y cruza el resultado contra el catálogo de sitios
4. **GeminiModule** — construye el prompt con el contexto del sitio identificado y el idioma del turista, llama a la Gemini API y recibe la explicación generada y traducida
5. **TtsModule** — envía el texto generado a Text-to-Speech y recibe el audio en el idioma correspondiente
6. **Respuesta al turista** — el frontend recibe texto + audio en su idioma y los muestra/reproduce

### 3.1 Estructura del monorepo

```
guia-turistica-ia/
├── apps/
│   ├── backend/                 # NestJS
│   │   ├── src/
│   │   │   ├── catalog/         # CatalogModule (JSON en fase 1)
│   │   │   ├── vision/          # VisionModule (Google Vision AI)
│   │   │   ├── gemini/          # GeminiModule (Gemini API)
│   │   │   ├── tts/             # TtsModule (Text-to-Speech)
│   │   │   ├── chat/            # ChatModule (modo "pregúntale")
│   │   │   └── main.ts
│   │   └── Dockerfile
│   └── frontend/                # React + Vite
│       ├── src/
│       │   ├── pages/           # Onboarding, Camara, Resultado, Explorar, Chat
│       │   ├── components/
│       │   ├── services/        # cliente HTTP hacia el backend
│       │   └── main.tsx
│       └── vite.config.ts
├── packages/
│   └── shared-types/            # interfaces TS compartidas entre backend y frontend
└── catalogo/
    └── sitios.json               # catálogo piloto, fase 1
```

### 3.2 Diseño de la API (endpoints principales)

| Método | Endpoint | Función |
|---|---|---|
| `POST` | `/recognize` | Recibe foto + idioma, devuelve sitio identificado + explicación + audio |
| `GET` | `/catalog/sites` | Lista los sitios del catálogo (exploración manual) |
| `GET` | `/catalog/sites/:id` | Detalle de un sitio específico |
| `POST` | `/chat/ask` | Modo "pregúntale": preguntas sobre patrimonio inmaterial |
| `GET` | `/health` | Healthcheck requerido por Cloud Run |

### 3.3 Tipos compartidos (TypeScript)

```typescript
export interface Site {
  id: string;
  tipo: 'sitio' | 'patrimonio_inmaterial';
  nombre: string;
  departamento: string;
  categoria: string;
  coordenadas?: { lat: number; lng: number };
  etiquetasVisionAI?: string[];
  descripcionBaseEs: string;
  idiomasSoportados: string[];
}

export interface RecognizeResponse {
  site: Site | null;
  explicacion: string;
  idioma: string;
  audioUrl: string;
}
```

Estos tipos viven en `packages/shared-types` y son consumidos tanto por los DTOs de NestJS como por los servicios de React, garantizando consistencia end-to-end sin duplicar definiciones.

---

## 4. Decisiones clave de diseño

### 4.1 Dónde vive el catálogo (sin agregar una 5ta tecnología)

Vision AI, Gemini, TTS y Cloud Run procesan información, pero ninguno la almacena. Para la fase 1, el catálogo de los Módulos 1 y 2 (sitios + patrimonio inmaterial) vive como un archivo JSON cargado en memoria dentro del `CatalogModule` de NestJS, desplegado junto al resto del backend en Cloud Run. Esto evita sumar infraestructura nueva.

Cuando el catálogo crezca o se necesite editar sin re-desplegar la app, esa data se migra a **BigQuery** (ya está en la lista de 8 tecnologías del ecosistema, solo se adelantaría su uso). El uso "real" de BigQuery como motor de analítica (sitios más visitados, idiomas más usados) se reserva para la fase 3.

### 4.2 Riesgo: Vision AI y sitios bolivianos específicos

La detección de landmarks de Vision AI está entrenada para reconocer sitios mundialmente famosos con coordenadas asociadas (tipo Arco del Triunfo, Ópera de Sídney). Es probable que reconozca sitios muy icónicos (Salar de Uyuni, Tiwanaku), pero no necesariamente atractivos regionales menos conocidos.

**Mitigación dentro del mismo stack (sin tecnología nueva):**

- Vision AI aporta igual valor con etiquetas genéricas (ruinas, formación rocosa, arquitectura colonial, texto OCR en letreros)
- Esas etiquetas + GPS se cruzan contra el catálogo propio en el `CatalogModule`
- Gemini también acepta imágenes directamente (es multimodal): si Vision AI no da una identificación confiable, el `GeminiModule` puede ayudar a inferir el sitio combinando la imagen + las etiquetas + el catálogo
- Fallback de UX: selector manual por departamento/sitio (`/explorar`) si la cámara no reconoce nada

### 4.3 Idiomas soportados

Text-to-Speech cubre más de 40 idiomas y 220+ voces, así que inglés, alemán, francés y japonés están cubiertos sin problema. Gemini se encarga de la traducción de la explicación antes de pasarla a TTS — no hace falta pre-traducir el catálogo a mano, el texto base puede estar solo en español.

---

## 5. Módulos funcionales de la app

| Módulo | Qué hace | Vista / ruta (React) |
|---|---|---|
| Onboarding | Selección de idioma, permisos de cámara/ubicación | `/onboarding` |
| Modo cámara | Captura foto, la envía al backend, muestra estado "procesando" | `/camara` |
| Ficha de resultado | Nombre del sitio, texto explicativo, botón de reproducir audio, mapa/coordenadas | `/resultado/:siteId` |
| Exploración manual | Buscador/listado por departamento — fallback si la cámara no reconoce nada | `/explorar` |
| Modo "pregúntale" | Chat de texto/voz para dudas puntuales (gastronomía, festividades, danzas) | `/chat` |
| Historial (opcional) | Sitios visitados durante el viaje | `/historial` |

---

## 6. Seguridad y buenas prácticas

- Validación estricta de entrada con DTOs (`class-validator`): tamaño máximo de imagen, formato permitido, idioma dentro de la lista soportada
- Rate limiting con `@nestjs/throttler` para evitar abuso de las APIs de pago (Vision AI, Gemini, TTS)
- CORS restringido al dominio del frontend
- API keys de Google Cloud gestionadas con Google Secret Manager, nunca hardcodeadas en el repositorio
- HTTPS end-to-end (provisto por defecto en Cloud Run)
- Las fotos del turista se procesan en memoria y se descartan — no se persisten, por privacidad

---

## 7. Calidad y testing

| Capa | Herramienta |
|---|---|
| Backend | Jest (unit tests por módulo + e2e tests de los endpoints principales) |
| Frontend | Vitest + React Testing Library |
| Linting/formato | ESLint + Prettier compartidos en el monorepo |
| Type-safety | TypeScript end-to-end vía `packages/shared-types` |

---

## 8. Despliegue (DevOps)

1. Cada app (`backend`, `frontend`) tiene su propio `Dockerfile` con build multi-stage
2. GitHub Actions ejecuta: build → tests → build de imagen Docker → push a Artifact Registry → deploy a Cloud Run
3. Ambientes separados: `dev`, `staging`, `prod`, cada uno como su propio servicio de Cloud Run
4. Observabilidad con Cloud Logging y Cloud Monitoring para métricas, errores y trazas

### 8.1 Costos y límites gratuitos (referencia)

| Servicio | Free tier aproximado |
|---|---|
| Cloud Run | ~2 millones de solicitudes/mes gratis + cuota de cómputo gratuita |
| Vision AI | ~1.000 unidades de análisis/mes gratis |
| Gemini API | Modelos Flash/Flash-Lite con nivel gratuito (Pro es de pago desde abril 2026) |
| Text-to-Speech | Nivel gratuito mensual + 40+ idiomas / 220+ voces |

*Cifras aproximadas según documentación pública de Google Cloud a mediados de 2026 — confirmar en la consola antes de presupuestar con precisión.*

---

## 9. Roadmap por fases

| Fase | Contenido |
|---|---|
| 0 | Estructurar el catálogo (Módulos 1 y 2) en JSON, 10–15 sitios piloto |
| 1 (MVP) | Backend NestJS en Cloud Run, Vision AI + fallback manual, Gemini multiidioma, TTS para audio, frontend React (PWA) |
| 2 | Reconocimiento mejorado (Vertex AI custom), preguntas por voz (Speech-to-Text), agente conversacional (Agent Builder) |
| 3 | Analítica con BigQuery (sitios más visitados, idiomas más usados) para reportes de impacto turístico |

---

## 10. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Vision AI no reconoce sitios poco conocidos | Etiquetas genéricas + GPS + apoyo de Gemini multimodal + selector manual |
| Conectividad débil en sitios remotos | PWA ligera; evaluar precarga de contenido en fase futura |
| Errores en el contenido cultural/histórico | Validación humana del catálogo antes de publicarlo |
| Costos al escalar | Monitorear cuotas gratuitas, definir límites de instancias en Cloud Run |

---

## 11. Checklist de arranque inmediato

1. Inicializar el monorepo (pnpm workspaces + Turborepo)
2. Generar el proyecto backend: `nest new apps/backend`
3. Generar el proyecto frontend: `npm create vite@latest apps/frontend -- --template react-ts`
4. Configurar Docker, variables de entorno y Google Secret Manager
5. Definir el catálogo piloto (10–15 sitios) en `catalogo/sitios.json`
6. Implementar `VisionModule` + endpoint `/recognize` contra el catálogo piloto
7. Conectar `GeminiModule` y `TtsModule` al mismo flujo
8. Construir las vistas de React: cámara y ficha de resultado
9. Configurar CI/CD con GitHub Actions hacia Cloud Run
