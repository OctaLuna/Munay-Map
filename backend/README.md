# Munay Map — Backend NestJS

Backend API para [Munay Map](../frontend/README.md), la guia turistica multiidioma con IA para Bolivia.

## Stack

- **NestJS 11** — Framework
- **TypeScript 5 (strict)** — Tipado
- **@nestjs/config** — Variables de entorno
- **@nestjs/swagger** — Documentacion OpenAPI
- **@nestjs/throttler** — Rate limiting (60 req/min)
- **class-validator / class-transformer** — Validacion de DTOs
- **@google-cloud/vision** — Vision AI
- **@google/genai** — Gemini 2.5 Flash
- **@google-cloud/text-to-speech** — TTS
- **Playwright** — Tests de API

---

## Requisitos

- Node.js >= 20
- npm >= 10

---

## Setup rapido

```bash
# 1. Instalar dependencias
cd backend
npm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Iniciar en modo desarrollo (mock — sin credenciales Google necesarias)
npm run start:dev
```

El servidor arranca en `http://localhost:3000`.

---

## Endpoints

| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/health` | Health check + modo mock |
| `GET` | `/catalog/sites` | Catalogo con filtros opcionales |
| `GET` | `/catalog/sites/:id` | Sitio por ID |
| `POST` | `/recognize` | Reconocimiento de imagen (Vision + Gemini + TTS) |
| `POST` | `/chat/ask` | Chat con el guia turistico IA |
| `GET` | `/quiz/questions` | Preguntas del quiz de perfil |
| `POST` | `/quiz/recommendation` | Recomendacion personalizada |

### Filtros del catalogo

```
GET /catalog/sites?departamento=Oruro&categoria=danza
GET /catalog/sites?busqueda=tiwanaku
GET /catalog/sites?departamento=La+Paz
```

---

## Documentacion Swagger

Con el servidor corriendo, abrir:

```
http://localhost:3000/api/docs
```

---

## Tests

Los tests usan Playwright como cliente HTTP (sin browser) contra el servidor real en modo mock.

```bash
# Correr todos los tests de API
npm run test:pw

# Correr tests de NestJS (unitarios)
npm test
```

Resultados esperados: **35/35 Playwright tests pasando**.

---

## Variables de entorno

Ver `.env.example` para la lista completa.

| Variable | Default | Descripcion |
|---|---|---|
| `PORT` | `3000` | Puerto del servidor |
| `CORS_ORIGIN` | `http://localhost:5173` | Origen permitido (frontend) |
| `GOOGLE_CLOUD_MOCK_MODE` | `true` | `true` = sin credenciales; `false` = real |
| `GOOGLE_CLOUD_PROJECT_ID` | — | Solo si `MOCK_MODE=false` |
| `GOOGLE_APPLICATION_CREDENTIALS` | — | Solo si `MOCK_MODE=false` |
| `GEMINI_API_KEY` | — | Solo si `MOCK_MODE=false` |

---

## Modo real (Google Cloud)

Para usar los servicios reales:

1. Configurar credenciales en `.env`:
   ```
   GOOGLE_CLOUD_MOCK_MODE=false
   GOOGLE_CLOUD_PROJECT_ID=tu-proyecto
   GOOGLE_APPLICATION_CREDENTIALS=/ruta/a/service-account.json
   GEMINI_API_KEY=tu-key
   ```

2. La API en `/health` confirma: `{ "mockMode": false }`

Ver [skill mock-real-toggle](./../.agents/skills/mock-real-toggle/SKILL.md) para detalle completo.

---

## Estructura del proyecto

```
backend/
├── src/
│   ├── health/           # GET /health
│   ├── catalog/          # GET /catalog/sites, GET /catalog/sites/:id
│   ├── vision/           # Vision AI (real + mock)
│   ├── gemini/           # Gemini API (real + mock)
│   ├── tts/              # Text-to-Speech (real + mock)
│   ├── recognize/        # POST /recognize (orquestador)
│   ├── chat/             # POST /chat/ask
│   ├── quiz/             # GET /quiz/questions, POST /quiz/recommendation
│   └── common/           # Filtros + interceptores globales
├── data/
│   ├── sites.json        # 13 sitios culturales bolivianos
│   └── quizQuestions.json # 6 preguntas del quiz
├── test/
│   ├── health.pw.ts
│   ├── catalog.pw.ts
│   ├── recognize.pw.ts
│   ├── chat.pw.ts
│   ├── quiz.pw.ts
│   └── vision.pw.ts
├── Dockerfile            # Multi-stage build para Cloud Run
├── playwright.config.ts
└── .env.example
```

---

## Docker / Cloud Run

```bash
# Build local
docker build -t munay-map-backend .

# Run local
docker run -p 3000:8080 \
  -e GOOGLE_CLOUD_MOCK_MODE=true \
  munay-map-backend

# Deploy a Cloud Run
gcloud run deploy munay-map-backend \
  --image gcr.io/TU_PROYECTO/munay-map-backend \
  --port 8080 \
  --set-env-vars "GOOGLE_CLOUD_MOCK_MODE=false,GEMINI_API_KEY=AIza..."
```

---

## Conectar con el frontend

Cuando el backend este listo:

1. En `frontend/.env.local`:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

2. En `frontend/src/lib/featureFlags.ts`:
   ```typescript
   export const USE_MOCK_DATA = false;
   ```

Las firmas de los servicios en `frontend/src/services/api/` ya coinciden con los endpoints de este backend.