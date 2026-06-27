# Skill: Toggle Mock/Real de servicios externos en Munay Map Backend

## Cuándo usar esta skill

Usar cuando necesitás:
- Cambiar de modo mock a modo real (o viceversa) para uno o todos los servicios de Google Cloud
- Debuggear por qué el modo real no funciona
- Agregar un nuevo servicio y entender cómo funciona el toggle

---

## Variable de control

```
GOOGLE_CLOUD_MOCK_MODE=true    # Desarrollo / CI — sin credenciales necesarias
GOOGLE_CLOUD_MOCK_MODE=false   # Producción / staging — usa Google Cloud real
```

Esta variable se lee **en tiempo de carga del módulo** (no en tiempo de request), así que requiere reiniciar el servidor para cambiar de modo.

---

## Cómo funciona el toggle

En cada `*.module.ts` de servicio externo:

```typescript
const isMock = process.env.GOOGLE_CLOUD_MOCK_MODE === 'true';

@Module({
  providers: [
    {
      provide: 'VisionServicePort',   // token string = nombre del Port
      useClass: isMock ? VisionServiceMock : VisionService,
    },
  ],
  exports: ['VisionServicePort'],
})
export class VisionModule {}
```

El módulo selecciona la clase **una sola vez al arrancar**. No hay overhead en tiempo de request.

---

## Modo mock (`GOOGLE_CLOUD_MOCK_MODE=true`)

**Activo por defecto.** No se necesita ninguna credencial.

Los mocks devuelven:

| Servicio | Mock devuelve |
|---|---|
| **Vision** | `labels: ['ruinas antiguas', ...]` + `landmark: { name: 'Tiwanaku', lat: -16.5547, lng: -68.6733 }` |
| **Gemini** | `[MOCK] Tiwanaku es un importante sitio... (explicacion en idioma X)` |
| **TTS** | Audio MP3 silencioso en base64 |

Los mocks están en:
- `src/vision/vision.service.mock.ts`
- `src/gemini/gemini.service.mock.ts`
- `src/tts/tts.service.mock.ts`

---

## Modo real (`GOOGLE_CLOUD_MOCK_MODE=false`)

Requiere:

```env
GOOGLE_CLOUD_MOCK_MODE=false

# Vision AI + TTS
GOOGLE_CLOUD_PROJECT_ID=tu-gcp-project-id
GOOGLE_APPLICATION_CREDENTIALS=/ruta/absoluta/service-account.json

# Gemini
GEMINI_API_KEY=tu-gemini-api-key
```

**Cómo obtener las credenciales:**

1. **Service Account (Vision AI + TTS):**
   - GCP Console → IAM → Service Accounts → Crear
   - Roles: `Cloud Vision API User`, `Cloud Text-to-Speech API User`
   - Bajar JSON → guardar en ruta local, NUNCA commitear

2. **Gemini API Key:**
   - https://aistudio.google.com/apikey
   - Copiar la key al `.env`

---

## Pasos para pasar a modo real

```bash
# 1. Copiar .env.example
cp backend/.env.example backend/.env

# 2. Editar backend/.env
GOOGLE_CLOUD_MOCK_MODE=false
GOOGLE_CLOUD_PROJECT_ID=mi-proyecto
GOOGLE_APPLICATION_CREDENTIALS=/ruta/a/credentials.json
GEMINI_API_KEY=AIza...

# 3. Reiniciar el servidor
cd backend && npm run start:dev
```

---

## Verificación

El endpoint `GET /health` siempre indica el modo actual:

```json
{ "status": "ok", "mockMode": true }   // mock activo
{ "status": "ok", "mockMode": false }  // modo real
```

---

## Troubleshooting modo real

| Error | Causa probable | Solución |
|---|---|---|
| `GEMINI_API_KEY is required` | La variable no está definida | Agregarla al `.env` |
| `GOOGLE_APPLICATION_CREDENTIALS` error | Path incorrecto o archivo no existe | Verificar la ruta absoluta |
| `Permission denied` en Vision/TTS | Service account sin roles | Agregar roles en GCP IAM |
| `Quota exceeded` | Se agotó la cuota gratuita | Habilitá billing en GCP |
| Throttler `429 Too Many Requests` | Más de 60 req/min | Normal — es el limite de seguridad |

---

## Cloud Run (producción)

En Cloud Run, **no** se usa `GOOGLE_APPLICATION_CREDENTIALS` — se usa la identidad de la Service Account del contenedor:

```bash
# Deploy con Workload Identity (recomendado)
gcloud run deploy munay-map-backend \
  --image gcr.io/TU_PROYECTO/munay-map-backend \
  --service-account tu-service-account@TU_PROYECTO.iam.gserviceaccount.com \
  --set-env-vars "GOOGLE_CLOUD_MOCK_MODE=false,GEMINI_API_KEY=AIza..." \
  --port 8080
```

El `PORT=8080` ya está configurado por defecto en el `Dockerfile`.